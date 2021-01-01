
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {UtilService} from '../services/util.service';
import { ModalController } from '@ionic/angular';
import { MyModalPage } from '../popup/my-modal/my-modal.page';
import { Socket } from 'ngx-socket-io';
import {BoardData} from '../board/board-data';
import {Rook} from '../model/Rook';
import {Bishop} from '../model/Bishop';
import {Pawn} from '../model/Pawn';
import {Knight} from '../model/Knight';
import {King} from '../model/King';
import {Queen} from '../model/Queen';



@Component({
  selector: 'app-board',
  templateUrl: './board.page.html',
  styleUrls: ['./board.page.scss'],
  providers: [BoardData]
})

export class BoardPage {

  gameId:any;
  gamePlayer:any = {};
  opponentPlayer:any = {};
  serverGame:any;
  userCapturedPieces = [];
  opponentCapturedPieces = [];
  lastMoveSquares:any;
  


  charObj = {
    "a":0,"b":1,"c":2,"d":3,"e":4,"f":5,"g":6,"h":7
  }

  constructor(private socket: Socket,private boardData:BoardData , private utils: UtilService,
    private router: Router, private modalController: ModalController) {
    
  }

  public  boardSize: number;
  public  squareSize: number;
  private movement: Movement;

  game: any;
  joinedGame:any;
  joinedGameId:any;
  myColor:number;
  private highlightedSquare: any;
  private kingHighlightedSquare: any;

  userTimer ={
      timeLeft: 300,
      timeLeftSeconds:"00",
      timeLeftMinutes:5
  }   
  userInterval;
  
  enemyTimer ={
      timeLeft: 300,
      timeLeftSeconds:"00",
      timeLeftMinutes:5
  }
  enemyInterval;

  battleTimer = 30;

  ngOnInit() {

    this.userCapturedPieces =["bP","bR","bN","bQ","bB"];
    this.game = {};
    this.game.board = {};
    this.game.board.rows = JSON.parse(JSON.stringify(this.boardData.rows));
    this.movement = { position1: {x: null, y: null}, position2: {x: null, y: null} };
    this.game.turnColor = 0;

    //this.openModal("Battle Starts In","timer");
    let clientGame = this.utils.clientGame;
    if(!!clientGame){
      this.gameId = clientGame.gameId;
      this.gamePlayer = clientGame.player;
      this.opponentPlayer = clientGame.opponent;
    }

    setTimeout(() => {
      console.log("GP");
      //this.gamePlayer.color = 'w';
      if(!!clientGame){
          if(this.gamePlayer.color == 'w'){
            this.myColor = 0;
          }else{
            console.log("Black");
            this.myColor = 1;
            this.invertBoard(this.game.board);
          }

          console.log("emit");
          console.log("gameId");
          console.log(this.gameId);
          // ADD POP UP for Batlle Start Timer Here
          this.openModal("Battle Starts In","timer");
    }else{
      this.router.navigateByUrl("game-selection");
    }
    
    
  },1000);
    

  this.socket.fromEvent('piece-capture').subscribe((player:any) => {
    console.log("piece-captured");
    if(player.color == this.gamePlayer.color){
      this.userCapturedPieces = player.capturedPieces;
    }
    if(player.color == this.opponentPlayer.color){
      this.opponentCapturedPieces = player.capturedPieces;
    }
  });
  
  


  this.resize();


  this.socket.fromEvent('complete-move').subscribe(message => {
    console.log("Complete Move");
    console.log(message);
    this.completeMovement(message);
  });

  this.socket.fromEvent('game-over').subscribe((gameOverObj:any) => {
    console.log("game-Over");
    console.log(gameOverObj);
    if(gameOverObj.winColor == this.gamePlayer.color){
      gameOverObj.winner = true;
      gameOverObj.winningPlayer = this.gamePlayer;
    }else{
      gameOverObj.winner = false;
      gameOverObj.winningPlayer = this.opponentPlayer;
    }
    setTimeout(() => {
      this.router.navigateByUrl("win-lose");
    },800);

  }); 

    

    /** this.socket.on('gameStart',(game) =>{
      console.log("gameStarted");
      this.serverGame = game;
      console.log(game);
    });
      
    setTimeout(() => {
      let move={
        "from":"d2",
        "to":"d4",
        "color":"w"
      }
      this.completeMovement(move); 
    },400);   **/

  }


  joinGame(id){
    this.socket.emit('resumegame', id);
    //this.socket.emit('invite',id);
  }

  resize() {
    this.boardSize = Math.min(window.innerHeight-40, window.innerWidth);
    this.squareSize = this.boardSize/8;
  }


  click(x, y) {
    if (this.game.status == 2) {
      return;
    }
    setTimeout(() => {
      this.resetColors();
      setTimeout(() => {
          //console.log("clicked square");
          //console.log(this.game.board.rows[y].squares[x]);
          if(this.game.board.rows[y].squares[x].piece && this.game.board.rows[y].squares[x].piece.color == this.myColor) {
            this.startMovement(x, y);
          }else if (this.movement.position1.x != null) {
            this.sendMovement(x, y);
          }
      },200);
    },200);

  }

  startMovement(x: number, y: number) {
    //console.log("start Move",x,y);
    if (this.game.turnColor != this.myColor) {
      return;
    }
    this.game.board.rows[y].squares[x].highlightColor= "rgb(111, 123, 124)";

    this.highlightedSquare = {x:x,y:y};

    let movement = { position1: {x: x, y: y}, position2: {x: null, y: null} };

    console.log(this.game.board.rows[movement.position1.y].squares[movement.position1.x]);
    let squares =JSON.parse(JSON.stringify(this.game.board.rows[movement.position1.y].squares[movement.position1.x]));

    let board =  JSON.parse(JSON.stringify(this.game.board));

    let legalmoves = this.getLegalMoves(squares,board);

    console.log(legalmoves);
    this.processLegalMoves(legalmoves);
    
    /** if (this.myColor == 1) {
      movement = { position1: {x: 7-x, y: 7-y}, position2: {x: null, y: null} };
    } */
    this.movement = movement;
  }


  getLegalMoves(square:any,board:any){
    let legalmoves = [];
    if(square.piece != null){
      if(square.piece.type == 'bP' || square.piece.type == 'wP'){
        let piece:Pawn = new Pawn();
        legalmoves = piece.generatePossibleMoves(square,board);
      }
      if(square.piece.type == 'bB' || square.piece.type == 'wB'){
        let piece:Bishop = new Bishop();
        legalmoves = piece.generatePossibleMoves(square,board);
      }
      if(square.piece.type == 'bN' || square.piece.type == 'wN'){
        let piece:Knight = new Knight();
        legalmoves = piece.generatePossibleMoves(square,board);
      }
      if(square.piece.type == 'bR' || square.piece.type == 'wR'){
        let piece:Rook = new Rook();
        legalmoves = piece.generatePossibleMoves(square,board);
      }
      if(square.piece.type == 'bK' || square.piece.type == 'wK'){
        let piece:King = new King();
        legalmoves = piece.generatePossibleMoves(square,board);
      }
      if(square.piece.type == 'bQ' || square.piece.type == 'wQ'){
        let piece:Queen = new Queen();
        legalmoves = piece.generatePossibleMoves(square,board);
      }

    }
    return legalmoves;

  }

  processLegalMoves(moves: any) {

    for (let movement of moves) {
      if (this.myColor == 1) {
        movement.position.x = 7-movement.position.x;
        movement.position.y = 7-movement.position.y;
      } 
      //console.log("legal move Pos" + this.game.board.rows[movement.position.y].squares[movement.position.x].position.position);
      this.game.board.rows[movement.position.y].squares[movement.position.x].border = "8px solid black";
    }
   
  }

  resetColors() {

    if(this.highlightedSquare!=null){

      let y = this.highlightedSquare.y;
      let x = this.highlightedSquare.x;
      this.game.board.rows[y].squares[x].highlightColor= "";

     for (let x=0; x<=7; x++) {
       for (let y=0; y<=7; y++) {
        if(this.game.board.rows[y].squares[x].border != null){
        this.game.board.rows[y].squares[x].border = null;
        }
       }
     }
     
    }
  }

  getKingSquare(color) {

    let pieceType = color +"K";
    console.log(pieceType);
    let square;
    for (let x=0; x<=7; x++) {
      for (let y=0; y<=7; y++) {
        if(!!this.game.board.rows[y].squares[x].piece){
          if(this.game.board.rows[y].squares[x].piece.type == pieceType){
            square  ={x:x,y:y};
            break;
          }
        }
      }
    }

    return square;
  }
  

  sendMovement(x: number, y: number) {
    console.log("send Move",x,y);

    this.movement.position2.x = x;
    this.movement.position2.y = y;
    /** if (this.myColor == 1) {
      this.movement.position2.x = 7-x;
      this.movement.position2.y = 7-y;
    } */
    let sq1 = JSON.parse(JSON.stringify(this.game.board.rows[this.movement.position1.y].squares[this.movement.position1.x]));
    let sq2 = JSON.parse(JSON.stringify(this.game.board.rows[this.movement.position2.y].squares[this.movement.position2.x]));
    console.log("From" + sq1.position.pos);
    console.log("To" + sq2.position.pos);
    

    let move = {from: sq1.position.pos,to: sq2.position.pos};
    
    /** if(this.myColor == 1){
       move = {from: sq2.position.pos,to: sq1.position.pos};
    } **/

    let data ={
      "id":this.gameId,
      "move":move
    }
    
    //this.completeMovement(move);
    this.socket.emit('new-move',data);
    //Reset movement
    this.movement = { position1: {x: null, y: null}, position2: {x: null, y: null} };
  }

  completeMovement(move) {
    console.log("complete move");
    
    let from = move.from;
    console.log(from);
    
    /* let x1 = this.charObj[from.charAt(0)];
    let y1 = Number(from.charAt(1));
    //x1 = 8-x1;
    y1 = 8-y1;

   /**  if(move.color == "w"){
      x1 = 8-x1;
      y1 = 8-y1;
    } //

    if (this.myColor == 1) {
      x1 = 7-x1;
      y1 = 7-y1;
    } 
    let sq1 = this.game.board.rows[y1].squares[x1];
    */
    let coordinates = this.getMoveCoOrdinatesFromPosition(from); 
    let sq1 = this.game.board.rows[coordinates.y].squares[coordinates.x];
    console.log(sq1);

    let to = move.to;
    console.log(to);

    let coordinates2 = this.getMoveCoOrdinatesFromPosition(to); 
    let sq2 = this.game.board.rows[coordinates2.y].squares[coordinates2.x];
    console.log(sq2);
    
   /**  let x2 = this.charObj[to.charAt(0)];
    let y2 = Number(to.charAt(1));

    y2 = 8-y2;
  
    if (this.myColor == 1) {
      x2 = 7-x2;
      y2 = 7-y2;
    } 

    let sq2 = this.game.board.rows[y2].squares[x2];

    console.log(sq2);
    */

    this.playBeep(move.flags);

    let piece = sq1.piece;
    sq2.piece = piece;
    sq1.piece = null;

    let castleMove;

    // Check for Castle Move
    if(move.flags == 'k'){
      if(move.color == 'w'){
        castleMove = {"from":"h1","to":"f1"};
      }else{
        castleMove = {"from":"h8","to":"f8"};
      }
    }
    if(move.flags == 'q'){
      if(move.color == 'w'){
        castleMove = {"from":"a1","to":"d1"};
      }else{
        castleMove = {"from":"a8","to":"d8"};
      }
    }

    if(!!castleMove){

      console.log("Performing Castle Rook Move");
      let ccoordinates = this.getMoveCoOrdinatesFromPosition(castleMove.from); 
      let csq1 = this.game.board.rows[ccoordinates.y].squares[ccoordinates.x];
      console.log(csq1);
  
  
      let ccoordinates2 = this.getMoveCoOrdinatesFromPosition(castleMove.to); 
      let csq2 = this.game.board.rows[ccoordinates2.y].squares[ccoordinates2.x];
      console.log(csq2);

      let cpiece = csq1.piece;
      csq2.piece = cpiece;
      csq1.piece = null;

      castleMove = undefined;
    }

    

    //Highlight Square after Move

    if(!!this.lastMoveSquares){
      this.game.board.rows[this.lastMoveSquares.from.y].squares[this.lastMoveSquares.from.x].highlightColor = "";
      this.game.board.rows[this.lastMoveSquares.to.y].squares[this.lastMoveSquares.to.x].highlightColor = "";
    }
    this.lastMoveSquares = {"from":{x:coordinates.x,y:coordinates.y},"to":{x:coordinates2.x,y:coordinates2.y}};

    sq1.highlightColor= "rgb(235, 233, 81)";
    sq2.highlightColor= "rgb(235, 233, 81)";



    //Change timer after move
    if (move.color == this.gamePlayer.color){
      clearInterval(this.userInterval);
      this.startEnemyTimer();
    }else if (move.color != this.gamePlayer.color){
      clearInterval(this.enemyInterval);
      this.startUserTimer();  
    }

    if(move.color == "w"){
      this.game.turnColor = 1;
    }else{
      this.game.turnColor = 0;
    }

    if(move.flags == "ch"){
      //Get King pos & highlight King for check
      let kingColor = "";
      if(move.color == "w"){
        kingColor = "b";
      }else{
        kingColor = "w";
      }
      let square = this.getKingSquare(kingColor);
      console.log("king sq" + this.opponentPlayer.color + square.x + square.y);

      this.game.board.rows[square.y].squares[square.x].highlightColor= "rgb(219, 66, 66)";

      this.kingHighlightedSquare = square;

    }else{

      if(this.kingHighlightedSquare!= undefined){
        this.game.board.rows[this.kingHighlightedSquare.y].squares[this.kingHighlightedSquare.x].highlightColor = "";
        this.kingHighlightedSquare = undefined;
      }
    }
  }



  getMoveCoOrdinatesFromPosition(position:any){
    let x1 = this.charObj[position.charAt(0)];
    let y1 = Number(position.charAt(1));
    //x1 = 8-x1;
    y1 = 8-y1;

   /**  if(move.color == "w"){
      x1 = 8-x1;
      y1 = 8-y1;
    } */

    if (this.myColor == 1) {
      x1 = 7-x1;
      y1 = 7-y1;
    }
    
    let cordinates ={x:x1,y:y1};
    return cordinates;
  }

  invertBoard(board) {
    console.log("IB");
    board.rows = board.rows.slice().reverse();
    for (let row of board.rows) {
      row.squares = row.squares.slice().reverse();
    }
    return board;
  }

  startBattleTimer(){
    setInterval(() => {
      this.battleTimer--;
    },1000);
  }

  startUserTimer() {
    this.userInterval = setInterval(() => {
        if (this.userTimer.timeLeft > 0) {
        this.userTimer.timeLeft--;
        this.userTimer.timeLeftMinutes = Math.floor(this.userTimer.timeLeft/60);
        var seconds = this.userTimer.timeLeft - this.userTimer.timeLeftMinutes * 60;
        this.userTimer.timeLeftSeconds = ("0" +  seconds).slice(-2);
    }
    },1000)
  }
  
  startEnemyTimer() {
    this.enemyInterval = setInterval(() => {
        if (this.enemyTimer.timeLeft > 0) {
        this.enemyTimer.timeLeft--;
        this.enemyTimer.timeLeftMinutes = Math.floor(this.enemyTimer.timeLeft/60);
        var seconds = this.enemyTimer.timeLeft - this.enemyTimer.timeLeftMinutes * 60;
        this.enemyTimer.timeLeftSeconds = ("0" +  seconds).slice(-2);
      } 
    },1000)
  }

  dataReturned:any;
  async openModal(message,type) {
    const modal = await this.modalController.create({
      component: MyModalPage,
      cssClass:"modal-class",
      componentProps: {
        "paramID": 123,
        "paramMessage": message,
        "type":type
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }

  playBeep(type) {
    let audio = new Audio();
    if(type == 'n' || type == 'b'){
      audio.src = "../assets/Music/move-1.mp3";
    }
    if(type == 'c'|| type == 'e'){
      audio.src = "../assets/Music/capture.mp3";
    }
    if(type == 'ch'){
      audio.src = "../assets/Music/Check.mp3";
    }

    if(type == 'k' || type == 'q'){
      audio.src = "../assets/Music/move.wav";
    }
    audio.load();
    audio.play();
  }

}

interface Movement {
  position1: Position;
  position2: Position;
}

interface Position {
  x: number;
  y: number;
}

