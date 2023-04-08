import { Scene } from "phaser";

export default class GameOver extends Scene{

    points;
    select;
    playerSelection;

    constructor(){
        super('game-over');
    }

    //função para pegar importar variavel de outra classe
    init = function (points){
        this.points = points.score;
        this.select = points.selection;
    }

    create(){

        //fundo
        this.add.image(144, 256, 'background');

        //base
        this.add.image(144, 520, 'base');

        //player
        if (this.select) {
            this.playerSelection = this.physics.add.image(144, 280, 'playerZeroM');
        }else{
            this.playerSelection = this.physics.add.image(144, 280, 'playerZeroF');
        }
        

        //gameover
        this.add.image(144, 150, 'gameOver').setScale(0.2);
 
        
        //texto de pontuação
        this. pointsText = this.add.text(144, 230, 'Score: ' + this.points, {
            fontSize: 20,
        }).setOrigin(0.5, 0.5);

        //texto  de novo jogo
        this.add.text(80, 400, 'Space - New Game', {
            color: 'black',
        });


        //jogar de novo
        this.input.keyboard.once('keydown-SPACE', () =>{
            this.scene.start('level');
        })
    }

    update(time, delta){

        let velocity = this.playerSelection.body.velocity.y;
        let position = this.playerSelection.body.y;

        if(position > 300){
            this.playerSelection.body.setVelocityY(-200);
        }

        if(velocity < 0){
            if(this.select){ 
                this.playerSelection.setTexture('playerUpM');
            }else{
                this.playerSelection.setTexture('playerUpF');
            }
        }else if (velocity > 0){
            if(this.select){ 
                this.playerSelection.setTexture('playerDownM');
            }else{
                this.playerSelection.setTexture('playerDownF');
            }
        }
            
    }
}