//Global variables
const size = 10;
var board = [];
//class Block, each block of the board is a class with 3 atributes: The number of bombs around it, if it should show itself or not, if it has bomb.
class Block {

    constructor(){

        this.number = 0;
        this.show = false;
        this.bomb = false;
        this.flag = false
    }

    get numberGet(){
        return this.number;
    }

    get showGet(){
        return this.show;
    }

    get bombGet(){
        return this.bomb;
    }

    get flagGet(){
        return this.flag;
    }

    set numberSet(n){
        this.number = n;
    }

    set showSet(s){
        this.show = s;
    }

    set bombSet(b){
        this.bomb = b;
    }

    set flagSet(f){
        this.flag = f;
    }
}

//Create the Board, but dont put the bomb's yet
function createBoard(){

    for(let r = 0; r < size; r++){

        var row = [];

        for(let c = 0; c < size; c++){

            var b = new Block();
            row.push(b);

        }

        board.push(row);

    }

    return board;
}

//Put the bombs on the board
function putBomb (){

    var v = 0;

    while(v<10){

        
        var r = Math.floor(Math.random()*size);
        var c = Math.floor(Math.random()*size);
        
        if(board[r][c].bombGet==false){
            board[r][c].bombSet = true;
            v++;
        }
    }

    return board;
}

//Do the count of each block, here is where the blocks get their number based on the number of bomb's around it, if bombGet is true the number does not matter 
function count(r, c){

    var counter = 0;

    for(let l=r-1; l<r+2; l++){

        for(let d=c-1; d<c+2; d++){

            if((l>=0 && d>=0)&&(l<size && d<size)){

                if(board[l][d].bombGet==true){
                    counter++;
                }
            }
        }
    }
    

    board[r][c].numberSet = counter;
    return board;
}

//Here we travel block by block in sending it to the function count to number the blocks, we only send the block with no bomb's on itself
function analyse(){

    for(let r = 0; r <size; r++){

        for(let c = 0; c < size; c++){

            if(board[r][c].bombGet == false){

                board = count(r, c);

            }

        }
    }

    return board;
}

//Here we show the board, it will be used every time after using the fuction useMouse
function showBoard(){

    var onBoard = [];

    for(let r = 0; r < size; r++){

        var row = '';

        for(let c = 0; c < size; c++){

            if(board[r][c].showGet==false){

                row+= '🔲';

            }
            else if(board[r][c].bombGet==true){
                row+= "💣";
            }
            else if(board[r][c].numberGet==0){
                row+= "   ";
            }
            else{

                row+= ` ${board[r][c].numberGet} `;

            }

        }

        onBoard.push(row);

    }

    console.log(onBoard);
}

//Here it happen the cleaning process when you click in a place with no bombs around it or in itself
function clean(r,c){

    for(let l=r-1; l<r+2; l++){

        for(let d=c-1; d<c+2; d++){

            if((l>=0 && d>=0)&&(l<size && d<size)){

                if(board[l][d].bombGet==false){
                    if(board[l][d].numberGet>0){
                        board[l][d].showSet = true;
                    }
                    else{
                        board = clean(l,d)
                    }
                }
            }
        }
    }

    return board;
}

//gameOver function
function youLose(){

    for(let i=0; i<size; i++){
        for(let c=0; c<size; c++){
            if(board[i][c].bombGet==true){
                board[i][c].showSet = true;
            }
        }
    }

    
    return board;
}

//function when you click
function clickHere(r,c){

    if(board[r][c].bombGet==true){
        board = youLose();
    }
    else if(board[r][c].numberGet>0){
        board[r][c].showSet = true;
    }
    else{
        board = clean();
    }

    return board;
}

board = createBoard();
board = putBomb();
board = analyse();
/*
for(let i=0; i<size; i++){
    for(let c=0; c<size; c++){
        board[i][c].showSet = true;
    }
}
*/

//board = clickHere(1,3);

showBoard();
//console.log(board)
