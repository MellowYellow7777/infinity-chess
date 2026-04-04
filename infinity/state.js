'use strict';

function createGame() {
excludedSquares = [];

rookLines = [
[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,10,28,46,64],
[18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,9,27,45,63],
[36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,8,26,44,62],
[54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,7,25,43,61],

[0,18,36,54],[1,19,37,55],[2,20,38,56],[3,21,39,57],[4,22,40,58],[5,23,41,59],[6,24,42,60],
[11,29,47,65],[12,30,48,66],[13,31,49,67],[14,32,50,68],[15,33,51,69],[16,34,52,70],[17,35,53,71],
];

bishopLines = [

[57,40,23,6,71,52,33,14],
[57,38,19,0,65,48,31,14],

[58,41,24,7,53,34,15],
[58,39,20,1],[15,32,49,66],
[56,37,18,64,47,30,13],
[56,39,22,5],[13,32,51,70],

[59,42,25,8,35,16],
[59,40,21,2],[16,33,50,67],
[55,36,63,46,29,12],
[55,38,21,4],[12,31,50,69],

[3,22,41,60,54,37,20],
[68,51,34,17,11,30,49],
[60,43,26,9,17],
[54,62,45,28,11],

[5,24,43,62,18,1],
[70,53,9,28,47,66],

[4,23,42,61,36,19,2],
[69,52,35,10,29,48,67],
[61,44,27,10],

[6,25,44,63,0],
[71,8,27,46,65],
[7,26,45,64],

]


knightOffsets = [
[37,66,62,20,47,45],
[38,36,21,65,63],
[39,37,22,18],
[40,38,23,19],
[41,39,24,20],
[42,40,25,71,21],
[43,70,41,26,53,22],
[44,52,42,27,35,23],
[45,34,43,70,24,28,17],
[44,52,29,25,71,46,16],
//10
[47,45,34,30,26,53],
[48,31,27,35,46,16],
[49,47,32,28,17],
[50,48,33,29],
[51,49,34,30],
[52,50,35,31],
[53,51,32,9,11],
[52,29,27,33,8,12],
[55,65,61,38,2,46,44],
[56,54,39,3,64,62],
//20
[57,55,40,4,36,0],
[58,56,41,5,37,1],
[59,57,42,6,38,2],
[60,58,43,7,39,3],
[71,59,44,8,40,4,61],
[62,53,60,41,5,45,9],
[71,46,10,42,6,63,61,35],
[64,17,62,53,47,11,43,7],
[48,44,65,63,35,12,8],
[66,64,17,49,13,45,9],
//30
[67,65,50,14,46,10],
[68,66,51,15,47,11],
[69,67,52,16,48,12],
[70,68,53,17,49,13],
[71,69,10,8,50,14],
[11,7,70,51,15,26,28],
[1,64,60,56,20,43,45],
[2,0,57,21,63,61],
[3,1,58,22,54,18],
[4,2,59,23,55,19],
//40
[5,3,60,24,56,20],
[6,4,25,57,21,61],
[54,7,5,58,22,62,26],
[6,63,27,59,23,36,8],
[18,9,54,7,28,60,24],
[65,61,36,0,10,8,29,25],
[66,62,30,26,18,11,9],
[12,0,10,67,31,63,27],
[13,11,68,32,64,28],
[14,12,69,33,65,29],
//50
[15,13,70,34,66,30],
[16,14,71,35,67,31],
[17,15,9,7,68,32],
[10,6,16,27,25,69,33],
[19,59,38,44,42,63],
[20,18,39,62,60],
[21,19,40,36],
[22,20,41,37],
[23,21,42,38],
[24,22,39,43,54],
//60
[23,36,44,40,25,55],
[37,26,24,18,45,41],
[0,55,19,27,25,46,42],
[54,47,43,37,1,28,26],
[36,48,44,19,29,27],
[30,1,28,49,18,45],
[31,29,50,0,46],
[32,30,51,47],
[33,31,52,48],
[34,32,53,49],
//70
[35,33,8,6,50],
[9,5,34,26,24,51],
]

kingOffsets = [
[1,19,18,63,64,65],
[2,20,19,18,0],
[3,21,20,19,1],
[4,22,21,20,2],
[5,23,22,21,3],
[6,24,23,22,4],
[71,7,25,24,23,5],
[71,53,8,26,25,24,6],
[71,53,35,9,27,26,25,7],
[53,35,17,10,28,27,26,8],
[35,17,11,29,28,27,9],
[17,10,28,29,30,12],
[11,29,30,31,13],
[12,30,31,32,14],
[13,31,32,33,15],
[14,32,33,34,16],
[15,33,34,35,17],
[16,34,35,9,10,11],
//18:
[19,37,36,62,63,64,0,1],
[20,38,37,36,18,0,1,2],
[21,39,38,37,19,1,2,3],
[22,40,39,38,20,2,3,4],
[23,41,40,39,21,3,4,5],
[24,42,41,40,22,4,5,6],
[25,43,42,41,23,5,6,7],
[26,44,43,42,24,6,7,8],
[27,45,44,43,25,7,8,9],
[28,46,45,44,26,8,9,10],
[29,47,46,45,27,9,10,11],
[30,48,47,46,28,10,11,12],
[31,49,48,47,29,11,12,13],
[32,50,49,48,30,12,13,14],
[33,51,50,49,31,13,14,15],
[34,52,51,50,32,14,15,16],
[35,53,52,51,33,15,16,17],
[9,8,53,52,34,16,17,10],
//36:
[37,55,54,61,62,63,18,19],
[38,56,55,54,36,18,19,20],
[39,57,56,55,37,19,20,21],
[40,58,57,56,38,20,21,22],
[41,59,58,57,39,21,22,23],
[42,60,59,58,40,22,23,24],
[43,61,60,59,41,23,24,25],
[44,62,61,60,42,24,25,26],
[45,63,62,61,43,25,26,27],
[46,64,63,62,44,26,27,28],
[47,65,64,63,45,27,28,29],
[48,66,65,64,46,28,29,30],
[49,67,66,65,47,29,30,31],
[50,68,67,66,48,30,31,32],
[51,69,68,67,49,31,32,33],
[52,70,69,68,50,32,33,34],
[53,71,70,69,51,33,34,35],
[8,7,71,70,52,34,35,9],
//54:
[60,61,62,36,37,55],
[54,36,37,38,56],
[55,37,38,39,57],
[56,38,39,40,58],
[57,39,40,41,59],
[58,40,41,42,60],
[59,41,42,43,61,54],
[60,42,43,44,62,36,54],
[61,43,44,45,63,18,36,54],
[62,44,45,46,64,0,18,36],
[63,45,46,47,65,0,18],
[64,46,47,48,66,0],
[65,47,48,49,67],
[66,48,49,50,68],
[67,49,50,51,69],
[68,50,51,52,70],
[69,51,52,53,71],
[70,52,53,8,7,6],
];

whitePawnLines = [
[2,1,0,64,46,28,10,17,16],
[20,19,18,63,45,27,9,35,34],
[38,37,36,62,44,26,8,53,52],
[56,55,54,61,43,25,7,71,70],
[58,59,60,61,62,63,64,65,66],
[40,41,42,43,44,45,46,47,48],
[22,23,24,25,26,27,28,29,30],
[4,5,6,7,8,9,10,11,12],
];

blackPawnLines = [
[15,16,17,10,28,46,64,0,1],
[33,34,35,9,27,45,63,18,19],
[51,52,53,8,26,44,62,36,37],
[69,70,71,7,25,43,61,54,55],
[67,66,65,64,63,62,61,60,59],
[49,48,47,46,45,44,43,42,41],
[31,30,29,28,27,26,25,24,23],
[13,12,11,10,9,8,7,6,5],
];

whitePawnCaptures = [
[63,65],[18],[19],[20],[23],[24],[25,71],[26,53],[27,35,71],[28,17,53],[29,35],[30],[31],[32],[],[],[33],[34],
[62,64],[36,0],[37,1],[38,2],[41,5],[42,6],[43,7],[44,8],[45,9,7],[46,10,8],[47,11,9],[48,12],[49,13],[50,14],[],[],[51,15],[52,16],
[61,63],[54,18],[55,19],[56,20],[59,23],[60,24],[61,25],[62,26],[63,27,25],[64,28,26],[65,29,27],[66,30],[67,31],[68,32],[],[],[69,33],[70,34],
[62],[36],[37],[38],[41],[42],[43],[44],[45,43],[46,44],[47,45],[48],[49],[50],[],[],[51],[52],
];

blackPawnCaptures = [
[19],[20],[21],[],[],[22],[23],[24,26],[25,27],[26,28],[27],[28],[29],[30],[33],[34],[35],[9],
[1,37],[2,38],[3,39],[],[],[4,40],[5,41],[6,42,44],[7,43,45],[8,44,46],[9,45],[10,46],[11,47],[12,48],[51,15],[52,16],[53,17],[8,10],
[19,55],[20,56],[21,57],[],[],[22,58],[23,59],[24,60,62],[25,61,63],[26,62,64],[27,63],[28,64],[29,65],[30,66],[33,69],[34,70],[35,71],[9,7],
[37],[38],[39],[],[],[40],[41],[42,36],[43,54,18],[44,36,0],[45,18],[46,0],[47],[48],[51],[52],[53],[8,6],
];

castleSquares = [[39,21],[31,49]];

whiteBackRank = [58,40,22,4,3,21,39,57];
blackBackRank = [14,32,50,68,67,49,31,13];






class Piece {
  static all = [];

  static wk = -1;
  static bk = -1;

  static wrs = [-1,-1];
  static brs = [-1,-1];

  constructor(color,type,square) {
    if (Piece.at(square))
      throw `cannot create a piece on an occupied square`;
    this.color = color;
    this.type = type;
    this.square = square;
    if (type === 'king') {
      if (color === 'white') Piece.wk = square;
      if (color === 'black') Piece.bk = square;
    }
    this.move0 = true;
    Piece.all.push(this);
  }

  static clear() {
    Piece.all.length = 0;
    Piece.wrs.length = 0;
    Piece.brs.length = 0;
    Piece.wrs.push(-1,-1);
    Piece.brs.push(-1,-1);
    Piece.wk = -1;
    Piece.bk = -1;
  }

  static create(color,type,square) {
    switch (type) {
      case 'pawn': return new Pawn(color,square);
      case 'knight': return new Knight(color,square);
      case 'bishop': return new Bishop(color,square);
      case 'rook': return new Rook(color,square);
      case 'queen': return new Queen(color,square);
      case 'king': return new King(color,square);
    }
  }

  static at(square) {
    return Piece.all.find(piece => piece.square === square);
  }

  delete() {
    var all = Piece.all;
    var index = all.indexOf(this);
    if (index > -1) all.splice(index,1);
  }

  getMoves() {
    return [];
  }

}


class Pawn extends Piece {
  constructor(color,square) {
    super(color,'pawn',square);
  }

}

class Knight extends Piece {
  constructor(color,square) {
    super(color,'knight',square);
  }
}

class Bishop extends Piece {
  constructor(color,square) {
    super(color,'bishop',square);
  }
}

class Rook extends Piece {
  constructor(color,square) {
    super(color,'rook',square);
  }
}

class Queen extends Piece {
  constructor(color,square) {
    super(color,'queen',square);
  }
}

class King extends Piece {
  constructor(color,square) {
    super(color,'king',square);
  }
}

function newGame() {
  Piece.clear();
  Piece.create('white','pawn',59);
  Piece.create('white','pawn',41);
  Piece.create('white','pawn',23);
  Piece.create('white','pawn',5);
  Piece.create('white','pawn',1);
  Piece.create('white','pawn',19);
  Piece.create('white','pawn',37);
  Piece.create('white','pawn',55);
  Piece.create('white','rook',2);
  Piece.create('white','knight',20);
  Piece.create('white','bishop',39);
  Piece.create('white','queen',21);
  Piece.create('white','king',3);
  Piece.create('white','bishop',57);
  Piece.create('white','knight',22);
  Piece.create('white','rook',4);
  Piece.create('black','pawn',16);
  Piece.create('black','pawn',34);
  Piece.create('black','pawn',52);
  Piece.create('black','pawn',70);
  Piece.create('black','pawn',66);
  Piece.create('black','pawn',48);
  Piece.create('black','pawn',30);
  Piece.create('black','pawn',12);
  Piece.create('black','rook',67);
  Piece.create('black','knight',49);
  Piece.create('black','bishop',14);
  Piece.create('black','queen',50);
  Piece.create('black','king',68);
  Piece.create('black','bishop',32);
  Piece.create('black','knight',51);
  Piece.create('black','rook',69);
}

newGame();

var gameState = {
  turn:          'white',
  epSquare:      -1,
  epPawn:        -1,
};

var opp  = c => c === 'white' ? 'black' : 'white';
var excl = sq => excludedSquares.includes(sq);

var whitePromoSet = new Set(whitePawnLines.map(l => l[l.length-1]));
var blackPromoSet = new Set(blackPawnLines.map(l => l[l.length-1]));

var isCyclic = line => new Set(line).size < line.length;

function slideMoves(sq, color, lines) {
  var out = new Set();
  for (var line of lines) {
    var n = line.length;
    var cyclic = isCyclic(line);

    var occurrences = [];
    for (var k = 0; k < n; k++)
      if (line[k] === sq) occurrences.push(k);
    if (occurrences.length === 0) continue;

    for (var idx of occurrences) {
      for (var dir of [1, -1]) {
        for (var i = 1; i < n; i++) {
          var raw = idx + dir * i;
          if (!cyclic && (raw < 0 || raw >= n)) break;
          var t = line[((raw % n) + n) % n];
          if (excl(t)) break;
          var p = Piece.at(t);
          if (p) { if (p.color !== color) out.add(t); break; }
          out.add(t);
        }
      }
    }
  }
  return [...out];
}

function jumpSqs(sq, color, table) {
  return (table[sq] || []).filter(t =>
    !excl(t) && (!Piece.at(t) || Piece.at(t).color !== color));
}


function isAttacked(sq, byColor) {
  for (var p of Piece.all) {
    if (p.color !== byColor) continue;
    switch (p.type) {
      case 'pawn': {
        var caps = byColor==='white' ? whitePawnCaptures : blackPawnCaptures;
        if ((caps[p.square]||[]).includes(sq)) return true;
        break;
      }
      case 'knight':
        if ((knightOffsets[p.square]||[]).includes(sq)) return true; break;
      case 'king':
        if ((kingOffsets[p.square]||[]).includes(sq)) return true; break;
      case 'bishop':
        if (slideMoves(p.square,byColor,bishopLines).includes(sq)) return true; break;
      case 'rook':
        if (slideMoves(p.square,byColor,rookLines).includes(sq)) return true; break;
      case 'queen':
        if (slideMoves(p.square,byColor,rookLines).includes(sq) ||
            slideMoves(p.square,byColor,bishopLines).includes(sq)) return true; break;
    }
  }
  return false;
}

function inCheck(color) {
  var ks = color==='white' ? Piece.wk : Piece.bk;
  return ks !== -1 && isAttacked(ks, opp(color));
}


function isLegal(mover, to, epRemoveSq) {
  var from  = mover.square;
  var snap  = Piece.all.slice();
  var oldWk = Piece.wk, oldBk = Piece.bk;

  if (epRemoveSq !== undefined && epRemoveSq !== -1) {
    var ep = Piece.at(epRemoveSq);
    if (ep) Piece.all.splice(Piece.all.indexOf(ep), 1);
  }
  var cap = Piece.at(to);
  if (cap) Piece.all.splice(Piece.all.indexOf(cap), 1);

  mover.square = to;
  if (mover.type==='king') { if (mover.color==='white') Piece.wk=to; else Piece.bk=to; }

  var ok = !inCheck(mover.color);


  Piece.all.length = 0; for (var p of snap) Piece.all.push(p);
  mover.square = from; Piece.wk = oldWk; Piece.bk = oldBk;
  return ok;
}


Pawn.prototype.getMoves = function() {
  var moves = [], sq = this.square, color = this.color;
  var lines  = color==='white' ? whitePawnLines    : blackPawnLines;
  var caps   = color==='white' ? whitePawnCaptures : blackPawnCaptures;
  var promos = color==='white' ? whitePromoSet     : blackPromoSet;

var matchingLines = [];
for (var l of lines) { var i = l.indexOf(sq); if (i > 0) matchingLines.push([l, i]); }
if (matchingLines.length === 0) return [];

for (var [line, idx] of matchingLines) {


  if (idx+1 < line.length) {
    var to = line[idx+1];
    if (!excl(to) && !Piece.at(to) && isLegal(this, to)) {
      if (promos.has(to)) {
        for (var pt of ['queen','rook','bishop','knight'])
          moves.push({from:sq, to, type:'promo', promo:pt});
      } else {
        moves.push({from:sq, to, type:'normal'});
        if (idx===1 && idx+2 < line.length) {
          var to2 = line[idx+2];
          if (!excl(to2) && !Piece.at(to2) && isLegal(this, to2))
            moves.push({from:sq, to:to2, type:'double', epSq:line[idx+1]});
        }
      }
    }
  }


  for (var to of (caps[sq]||[])) {
    if (excl(to)) continue;
    var target = Piece.at(to);
    if (target && target.color !== color && isLegal(this, to))
      if (promos.has(to)) {
        for (var pt of ['queen','rook','bishop','knight'])
          moves.push({from:sq, to, type:'promo', promo:pt});
      } else {
        moves.push({from:sq, to, type:'capture'});
      }
    if (to === gameState.epSquare) {
      var epP = Piece.at(gameState.epPawn);
      if (epP && epP.color !== color && isLegal(this, to, gameState.epPawn)) {
        if (promos.has(to)) {
          for (var pt of ['queen','rook','bishop','knight'])
            moves.push({from:sq, to, type:'enpassant_promo', promo:pt, epPawn:gameState.epPawn});
        } else {
          moves.push({from:sq, to, type:'enpassant', epPawn:gameState.epPawn});
        }
      }
    }
  }

}

  return moves;
};


Knight.prototype.getMoves = function() {
  var sq=this.square, c=this.color;
  return jumpSqs(sq, c, knightOffsets)
    .filter(to => isLegal(this, to))
    .map(to => ({from:sq, to, type:'normal'}));
};


Bishop.prototype.getMoves = function() {
  var sq=this.square, c=this.color;
  return slideMoves(sq, c, bishopLines)
    .filter(to => isLegal(this, to))
    .map(to => ({from:sq, to, type:'normal'}));
};


Rook.prototype.getMoves = function() {
  var sq=this.square, c=this.color;
  return slideMoves(sq, c, rookLines)
    .filter(to => isLegal(this, to))
    .map(to => ({from:sq, to, type:'normal'}));
};


Queen.prototype.getMoves = function() {
  var sq=this.square, c=this.color;
  return [...slideMoves(sq,c,rookLines), ...slideMoves(sq,c,bishopLines)]
    .filter(to => isLegal(this, to))
    .map(to => ({from:sq, to, type:'normal'}));
};

King.prototype.getMoves = function() {
  var sq=this.square, color=this.color;
  var moves = jumpSqs(sq, color, kingOffsets)
    .filter(to => isLegal(this, to))
    .map(to => ({from:sq, to, type:'normal'}));
  return moves;
};

function makeMove(move) {
  var piece = Piece.at(move.from);
  if (!piece) return;

  gameState.epSquare = -1;
  gameState.epPawn   = -1;

  switch (move.type) {
    case 'castle': {
      var rook = Piece.at(move.rookFrom);
      if (rook) { rook.square = move.rookTo; rook.move0 = false; }
      if (piece.color==='white') Piece.wk=move.to; else Piece.bk=move.to;
      piece.square = move.to; piece.move0 = false;
      break;
    }
    case 'enpassant': {
      var ep = Piece.at(move.epPawn); if (ep) ep.delete();
      piece.square = move.to; piece.move0 = false;
      break;
    }
    case 'promo': {
      var cap = Piece.at(move.to); if (cap) cap.delete();
      var col = piece.color; piece.delete();
      Piece.create(col, move.promo, move.to);
      break;
    }
    case 'enpassant_promo': {
      var ep = Piece.at(move.epPawn); if (ep) ep.delete();
      var col = piece.color; piece.delete();
      Piece.create(col, move.promo, move.to);
      break;
    }
    case 'double': {
      piece.square = move.to; piece.move0 = false;
      gameState.epSquare = move.epSq;
      gameState.epPawn   = move.to;
      break;
    }
    default: {
      var cap = Piece.at(move.to); if (cap) cap.delete();
      if (piece.type==='king') {
        if (piece.color==='white') Piece.wk=move.to; else Piece.bk=move.to;
      }
      piece.square = move.to; piece.move0 = false;
    }
  }

  gameState.turn = opp(gameState.turn);
}

  function getState(extra) {
    return Object.assign({
      pieces:   Piece.all.map(p => ({ color: p.color, type: p.type, square: p.square, move0: p.move0 })),
      turn:     gameState.turn,
      epSquare: gameState.epSquare,
      epPawn:   gameState.epPawn,
      status:   null,
    }, extra || {});
  }

  function checkGameOver() {
    var color = gameState.turn;
    for (var p of Piece.all) if (p.color === color && p.getMoves().length > 0) return null;
    return inCheck(color) ? opp(color) + '_wins' : 'draw';
  }

  function applyMoveRequest(req) {
    if (gameState.turn !== req.color) return false;
    var piece = Piece.at(req.from);
    if (!piece || piece.color !== req.color) return false;
    var moves = piece.getMoves();
    var move;
    if (req.promo) {
      move = moves.find(m => m.to === req.to && m.promo === req.promo);
    } else {
      // auto-queen promos
      move = moves.find(m => m.to === req.to && (m.promo === 'queen' || !m.promo));
    }
    if (!move) return false;
    makeMove(move);
    return true;
  }

  return { newGame, applyMoveRequest, getState, checkGameOver };
}

module.exports = { createGame };