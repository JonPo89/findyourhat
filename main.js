const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    constructor(field) {
        this.field = field;
        this.characterLocation = {x: 0, y: 0};
        this.winLocation = {x: 3, y: 3};
        this.holeLocationsList = [];
        this.hitBorder = false;
    }
    
    get print() {
        this.field[this.characterLocation.y][this.characterLocation.x] = pathCharacter;
        console.log(this.field.map(arr => arr.join(' ')).join('\n'));
        if (this.isWin) {
            console.log("Congratulations! You've found your hat!");
            process.exit(0);
        } else if (this.isHole) {
            console.log("Woops! You fell in a hole!")
            process.exit(0);
        } else if (this.hitBorder) {
            console.log("Woops, you hit the border!");
            this.hitBorder = false;
            this.move;
        } else {
            this.move;
        }
    }

    get isWin() {
        return this.characterLocation.x === this.winLocation.x && this.characterLocation.y === this.winLocation.y;
    }

    get isHole() {
        return this.holeLocationsList.some(holeLoc => 
            holeLoc.x === this.characterLocation.x && holeLoc.y === this.characterLocation.y
        )
    }

    get move() {
        console.log("Please input the direction you wish to move \n(w: up, s: down, a: left, b: right, q: quit)"); 
        let direction = "";
        let userInput = prompt("Which direction? ").toLowerCase();
            direction = userInput.toString().toLowerCase().trim();
            switch (direction) {
                case 'w':
                    if (this.characterLocation.y > 0) {
                        this.characterLocation.y -= 1;
                        this.print;
                        console.log("Which direction?");
                    } else {
                        this.hitBorder = true;
                        this.print;
                    }
                    break;

                case 's':
                    if (this.characterLocation.y < (this.field.length-1)) {
                        this.characterLocation.y += 1;

                        this.print;
                        console.log("Which direction?");
                    } else {
                        this.hitBorder = true;
                        this.print;
                    }
                    break;

                case 'a':
                    if (this.characterLocation.x > 0) {
                        this.characterLocation.x -= 1;

                        this.print;
                        console.log("Which direction?");
                    } else {
                        this.hitBorder = true;
                        this.print;
                    }
                    break;

                case 'd':
                    if (this.characterLocation.x < (this.field[this.characterLocation.y].length -1)){
                        this.characterLocation.x += 1;

                        this.print;
                        console.log("Which direction?");
                    } else {
                        this.hitBorder = true;
                        this.print;
                    }
                    break;

                case 'quit':
                case 'exit':
                case 'q':
                    process.exit(0);
                    break;

                default:
                    console.log("Invalid direction, please try again");
                    break;
            }
        

        
        return this.characterLocation;
    }

    get generateField() {
        this.field = [];
        let width = prompt("What width would you like the field to be? ");
        if (width > 3 && width < 11) {
            width = Math.floor(width.toString().trim());  
        } else {
            console.log("Invalid width, please insert a number between 4 and 10");
            width = prompt("What width would you like the field to be? ")
        }
        let height = prompt("What height would you like the field to be? ");
        if (height > 3 && height < 11) {
            height = Math.floor(height.toString().trim());
        } else {
            console.log("Invalid height, please insert a number between 4 and 10")
            height = prompt("What height would you like the field to be? ")
        }
        for (let i = 0; i<(height); i++){
            let row =[];
            let holeQuantity = Math.floor(Math.random() * (width/2)+1);
            let hatLocation = Math.floor(Math.random() * (width));
            let holeLocation = [];
            for (let k = 0; k < holeQuantity; k++) {
             holeLocation.push(Math.floor(Math.random() * (width)))   
            }
            this.winLocation = {x: hatLocation, y: height-1};

            for (let j = 0; j<(width); j++){
                if (i===height-1 && j === hatLocation) {
                    row.push(hat);
                } else if (i===0 && j>1 && holeLocation.some(holeLoc => holeLoc ===j)){
                    row.push(hole)
                    this.holeLocationsList.push({x: j, y: i});
                } else if (i>0 && holeLocation.some(holeLoc => holeLoc === j)) {
                    row.push(hole)
                    this.holeLocationsList.push({x: j, y: i});
                } else {
                    row.push(fieldCharacter);
                }
            };
            this.field.push(row);
        }
        this.print;
        this.move;
    }

}

const myField = new Field([
    ['░', '░', '░', '░', '░'],
    ['░', hat, 'O', '░', '░'],
    ['░', '░', '░', '░', '░'],
]);

const array1 = [1,2,3,4];

myField.generateField;