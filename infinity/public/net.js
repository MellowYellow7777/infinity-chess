(function () {
  'use strict';

  var overlay = document.createElement('div');
  overlay.style.cssText = [
    'position:fixed', 'inset:0', 'background:rgba(0,0,0,.72)',
    'display:flex', 'flex-direction:column', 'align-items:center',
    'justify-content:center', 'font:bold 18px/1.5 sans-serif',
    'color:#fff', 'z-index:999', 'gap:14px', 'padding:24px',
    'box-sizing:border-box', 'text-align:center',
  ].join(';');
  document.body.appendChild(overlay);

  function setOverlay(html, show) {
    overlay.innerHTML = html;
    overlay.style.display = show === false ? 'none' : 'flex';
  }

  function btn(label, id) {
    return `<button id="${id}" style="padding:10px 28px;font-size:16px;font-weight:bold;
border:none;border-radius:8px;background:#e8c55a;color:#222;cursor:pointer">${label}</button>`;
  }

  function input(placeholder, id) {
    return `<input id="${id}" maxlength="4" placeholder="${placeholder}"
style="padding:10px 18px;font-size:18px;text-align:center;letter-spacing:4px;text-transform:uppercase;
border-radius:8px;border:none;width:140px">`;
  }

  function showLobby() {
    setOverlay(`
      <div style="font-size:22px;margin-bottom:4px">Infinity Chess</div>
      ${btn('Play Random', 'btn-random')}
      <div style="font-size:14px;opacity:.7;margin-top:4px">or use a room code</div>
      ${input('CODE', 'code-input')}
      ${btn('Create / Join Room', 'btn-code')}
      ${btn('Play Offline', 'btn-offline')}
    `);
    document.getElementById('btn-random').onclick = () => ws_join({ random: true });
    document.getElementById('btn-code').onclick = () => {
      var code = document.getElementById('code-input').value.trim().toUpperCase();
      ws_join({ code: code || genLocalCode() });
    };
    document.getElementById('code-input').onkeydown = e => {
      if (e.key === 'Enter') document.getElementById('btn-code').click();
    };
    document.getElementById('btn-offline').onclick = () => {
      location.href='../local/index.html';
    };
  }

  function genLocalCode() {
    return Math.random().toString(36).slice(2,6).toUpperCase();
  }

  var ws;
  var myColor = null;

  function connect() {
    var proto = location.protocol === 'https:' ? 'wss' : 'ws';
    ws = new WebSocket('wss://infinity-chess-production-7c4b.up.railway.app');

    ws.onopen = () => showLobby();

    ws.onmessage = function (e) {
      var msg = JSON.parse(e.data);

      if (msg.type === 'waiting') {
        setOverlay(`
          <div>Waiting for opponent...</div>
          ${msg.code ? `
            <div style="font-size:14px;opacity:.8">Share this code with a friend:</div>
            <div style="font-size:36px;letter-spacing:8px;background:#fff2;padding:10px 20px;border-radius:8px">
              ${msg.code}
            </div>
          ` : ''}
          ${btn('Back to Lobby', 'btn-lobby')}
        `);
        document.getElementById('btn-lobby').onclick = () => location.reload();
        return;
      }

      if (msg.type === 'start') {
        myColor = msg.color;
        window.myColor = myColor;
        var colorLabel = myColor === 'white' ? '⬜ White' : '⬛ Black';
        setOverlay(`<div>Game starting!</div><div style="font-size:15px">You are playing as <b>${colorLabel}</b></div>`, false);
        setTimeout(() => setOverlay('', false), 1800);
        return;
      }

      if (msg.type === 'state') {
        window.applyServerState(msg);
        if (msg.status) showGameOver(msg.status);
        return;
      }

      if (msg.type === 'rematchOffer') {
        setOverlay(`
          <div>Opponent wants a rematch!</div>
          ${btn('Accept', 'btn-rematch-yes')}
          ${btn('Decline', 'btn-rematch-no')}
        `);
        document.getElementById('btn-rematch-yes').onclick = () => {
          ws.send(JSON.stringify({ type: 'rematch' }));
          setOverlay('<div>Waiting for rematch...</div>');
        };
        document.getElementById('btn-rematch-no').onclick = () => setOverlay('', false);
        return;
      }

      if (msg.type === 'opponentDisconnected') {
        setOverlay(`
          <div>Opponent disconnected.</div>
          ${btn('Back to Lobby', 'btn-lobby')}
        `);
        document.getElementById('btn-lobby').onclick = () => {
          myColor = null; window.myColor = null;
          showLobby();
        };
        return;
      }

      if (msg.type === 'error') {
        setOverlay(`
          <div style="color:#f88">${msg.message}</div>
          ${btn('Back', 'btn-back')}
        `);
        document.getElementById('btn-back').onclick = showLobby;
        return;
      }
    };

    ws.onclose = () => {
      if (overlay.style.display === 'none') {
        setOverlay(`
          <div>Connection lost.</div>
          ${btn('Reconnect', 'btn-reconnect')}
        `);
        document.getElementById('btn-reconnect').onclick = () => { myColor = null; window.myColor = null; connect(); };
      }
    };
  }

  function ws_join({ random = false, code = null } = {}) {
    if (random) {
      setOverlay('<div>Connecting...</div>'); // no code shown
      ws.send(JSON.stringify({ type: 'join', random: true }));
    } else {
      setOverlay('<div>Connecting...</div>');
      ws.send(JSON.stringify({ type: 'join', code }));
    }
  }

  function showGameOver(status) {
    var msg;
    if (status === 'draw')            msg = "Its a draw";
    else if (status === 'white_wins') msg = myColor === 'white' ? 'You win' : 'You lost';
    else                              msg = myColor === 'black' ? 'You win' : 'You lost';

    setOverlay(`
      <div style="font-size:24px">${msg}</div>
      ${btn('Rematch', 'btn-rematch')}
      ${btn('Back to Lobby', 'btn-lobby')}
    `);
    document.getElementById('btn-rematch').onclick = () => {
      ws.send(JSON.stringify({ type: 'rematch' }));
      setOverlay('<div>Waiting for opponent to accept...</div>');
    };
    document.getElementById('btn-lobby').onclick = () => {
      myColor = null; window.myColor = null;
      showLobby();
    };
  }

  window._netMove = function (move) {
    if (!ws || ws.readyState !== WebSocket.OPEN) return;
    if (!myColor) return;
    ws.send(JSON.stringify({
      type:  'moveRequest',
      from:  move.from,
      to:    move.to,
      promo: move.promo || null,
    }));
  };

  connect();
})();
