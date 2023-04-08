import { Scene  } from "phaser";

export default class First extends Scene{


    /**@type{Phaser.Physics.Arcade.Sprite} */
    playerMasc;
    
    /**@type{Phaser.Physics.Arcade.Sprite} */
    playerFem;

    mascText;

    femText;

    select = true;    

    constructor(){
        super('First');
    }

    preload(){
        this.load.image('background', '/assets/bg.png');
        this.load.image('base', '/assets/base.png');
        this.load.image('playerDownM', '/assets/bird1M.png');
        this.load.image('playerDownF', '/assets/bird1F.png');
        this.load.image('playerUpM', '/assets/bird2M.png');
        this.load.image('playerUpF', '/assets/bird2F.png');
        this.load.image('playerZeroM', '/assets/bird3M.png');
        this.load.image('playerZeroF', '/assets/bird3F.png');
        this.load.image('pipeUp', '/assets/pipeUp.png');
        this.load.image('pipeDown', '/assets/pipeDown.png');
        this.load.image('gameOver', '/assets/gameover.png');
        this.load.image('logo', '/assets/logo.png');
        this.load.image('getReady', '/assets/getReady.png');
    }

    create(){

        // backgound e base
        this.add.image(144, 256, 'background');
        this.add.image(144, 520, 'base');

        //logo
        this.add.image(144, 90, 'logo').setScale(0.15); 

        //get Ready
        this.add.image(144, 170, 'getReady').setScale(0.8); 


        //texto escolha de personagem
        this.add.text(144, 230, 'Escolha seu Personagem', {
            fontSize: 18,
        }).setOrigin(0.5,0.5)

        //player Masculino
        this.playerMasc = this.physics.add.image(96, 280, 'playerZeroM');

        //player Feminino
        this.playerFem = this.physics.add.image(192, 280, 'playerZeroF');

        //texto  de novo jogo
        this.add.text(80, 400, 'Space - Start', {
            color: 'black',
        });
        
        this.input.keyboard.once('keydown-SPACE', () =>{
            this.scene.start('level', {selection: this.select});
        })
    }
    
    update(time, delta){


        let velocityMasc = this.playerMasc.body.velocity.y;
        let velocityFem = this.playerMasc.body.velocity.y;
        let positionMasc = this.playerMasc.body.y;
        let positionFem = this.playerMasc.body.y;

        if(positionMasc > 300){
            this.playerMasc.body.setVelocityY(-200);
        }

        if(positionFem > 300){
            this.playerFem.body.setVelocityY(-200);
        }

        if(velocityMasc < 0){
            this.playerMasc.setTexture('playerUpM');
        }else if (velocityMasc > 0){
            this.playerMasc.setTexture('playerDownM');
        }

        if(velocityFem < 0){
            this.playerFem.setTexture('playerUpF');
        }else if (velocityFem > 0){
            this.playerFem.setTexture('playerDownF');
        }


        //escolhendo o personagem
        this.input.keyboard.once('keydown-M', () =>{
            this.select = true;
        })

        this.input.keyboard.once('keydown-F', () =>{
            this.select = false;
        })
        console.log(this.select);

        if (this.select) {
            this.mascText = this.add.text(96, 340,'(M)', {color: 'red', fontSize: 18}).setOrigin(0.5, 0.5);
            this.femText = this.add.text(192, 340,'(F)', {color: 'black', fontSize: 18}).setOrigin(0.5, 0.5);
            
        }else if (!this.select){
            this.mascText = this.add.text(96, 340,'(M)', {color: 'black', fontSize: 18}).setOrigin(0.5, 0.5);
            this.femText = this.add.text(192, 340,'(F)', {color: 'red', fontSize: 18}).setOrigin(0.5, 0.5);
        }      
    }

}