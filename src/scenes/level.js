import { GameObjects, Math, NONE, Scene } from "phaser";

export default class level extends Scene{
    

    player;

    /**@type{Phaser.Physics.Arcade.Sprite} */
    playerMasc;

    /**@type{Phaser.Physics.Arcade.Sprite} */
    playerFem;

    /**@type{Phaser.Physics.Arcade.Sprite} */
    playerSelection;

    /**@type{Phaser.Physics.Arcade.StaticGroup} */ 
    pipesUp;

    /**@type{Phaser.Physics.Arcade.StaticGroup} */ 
    pipesDown;

    /**@type{Phaser.Types.Input.Keyboard.CursorKeys} */
    cursors;

    /** @type{Phaser.Types.GameObjects.Text} */
    pointsText;

    points;

    pipeX;

    base;

    PositionY;
    

    constructor(){
        super('level');
    }

    //função para pegar importar variavel de outra classe
    init = function (player){
        this.player = player.selection;
    }


    create(){
        this.points = 0;

        // background
        this.add.image(144, 256, 'background').
        setScrollFactor(0);


        // canos
        this.pipesUp = this.physics.add.staticGroup();
        this.pipesDown = this.physics.add.staticGroup();

        for (let i = 2; i < 5 ; i++) {
            const x = 210 * i;
            const y = Math.Between(-80, 145)

            this.pipesUp.create(x, y, 'pipeDown');
            this.pipesDown.create(x, y + 450, 'pipeUp');
        }


        //base
        this.base = this.physics.add.staticGroup();
        for (let i = 0; i < 2 ; i++) {
            const x = 168 * i
            this.base.create(x, 520, 'base');  
        }
        

        //player
        if (this.player) {
            this.playerSelection = this.physics.add.image(144, 256, 'playerUpM');        
        }else{
            this.playerSelection = this.physics.add.image(144, 256, 'playerUpF');      
        }
        


        //adicionar colisão
        this.physics.add.collider(this.playerSelection, this.pipesUp);
        this.physics.add.collider(this.playerSelection, this.base);
        this.physics.add.collider(this.playerSelection, this.pipesDown);
        

        //camera
        this.cameras.main.startFollow(this.playerSelection);
        this.cameras.main.setBounds(0, 0, Infinity, 0);

        //cursores
        this.cursors = this.input.keyboard.createCursorKeys();   

        //texto de pontuação
        const style = { color: '#000', fontSize: 18};
        this.pointsText = this.add.text(146, 10, 'Score: 0', style);
        this.pointsText.setScrollFactor(0);
        this.pointsText.setOrigin(0.5, 0);

        console.log(this.player);

    }

    update(time, delta){

        //verificando se o player passa entre os canos
        const position = (this.playerSelection.body.x / 1.7).toFixed(0);
        const pipePosition = (this.findFirstPipe().x / 1.7).toFixed(0);

        if(position == pipePosition){
            this.handlePassingPipe();
        }
    

        //verificanndo se o player toca algo
        const touchingDown = this.playerSelection.body.touching.down;
        const touchingRight = this.playerSelection.body.touching.right;
        const touchingUp = this.playerSelection.body.touching.up;
        const touchingSky = this.playerSelection.body.y;

        if(touchingDown || touchingRight || touchingUp || touchingSky <= 12){
           
            this.playerSelection.body.setVelocityX(0);
            this.scene.start('game-over', {score: this.points, selection: this.player});
        
        }        

        //definindo a tecla para pular
        if(this.cursors.space.isDown){
            this.playerSelection.setVelocity(105, -200); 
        }

        //Reutilizando os canos de cima
        this.pipesUp.children.iterate(child => {
            /** @type{Phaser.Physics.Arcade.Sprite} */
            const pipe = child;

            const scrollX = this.cameras.main.scrollX;
            if (pipe.x <= scrollX - 26) {
                pipe.x = scrollX + 610;
                pipe.y = Math.Between(-80, 145);
                pipe.body.updateFromGameObject();
                this.PositionY = pipe.y;
            }
        })

        //Reutilizando os canos de baixo
        this.pipesDown.children.iterate(child => {
            /** @type{Phaser.Physics.Arcade.Sprite} */
            const pipe = child;

            const scrollX = this.cameras.main.scrollX;
            if (pipe.x <= scrollX - 26) {
                pipe.x = scrollX + 610;
                pipe.y = this.PositionY + 445;
                pipe.body.updateFromGameObject();
            }
        })

        //Reutilizando a base
        this.base.children.iterate(child => {
            /** @type{Phaser.Physics.Arcade.Sprite} */
            const base = child;

            const scrollX = this.cameras.main.scrollX;
            if(base.x <= scrollX){
                base.x = scrollX + 336;
                base.y = 520;
                base.body.updateFromGameObject();
            }
        })

        //alterando a textura do player e a rotação
        const velocity = this.playerSelection.body.velocity.y;
        //pegando o angulo de inclinação do player
        let spin = this.playerSelection.body.rotation;

        if (velocity < 40 && velocity > -40) {
            if (this.player) {
                this.playerSelection.setTexture('playerZeroM');
            }else{
                this.playerSelection.setTexture('playerZeroF');
            }
            
            
        }else{
            if (velocity < 0) {

                if (this.player) {
                    this.playerSelection.setTexture('playerUpM');
                }else{
                    this.playerSelection.setTexture('playerUpF');
                }

                this.playerSelection.body.setAngularVelocity(-500);

                if (spin <= -25) {
                    this.playerSelection.body.setAngularVelocity(0);
                }
            }
            if(velocity > 0){

                if (this.player) {
                    this.playerSelection.setTexture('playerDownM');
                }else{
                    this.playerSelection.setTexture('playerDownF');
                }
                
                this.playerSelection.body.setAngularVelocity(200);
                if (spin >= 20) {
                    this.playerSelection.body.setAngularVelocity(0);
                }
            }
        }   

    }

    //procura a plataforma mais baixa
    findFirstPipe(){
        let pipes = this.pipesDown.getChildren();
        let firstPipe = pipes[0];

        for (let i = 1; i < pipes.length; i++) {
            let pipe = pipes[i];

            if(pipe.x < firstPipe.x){
                firstPipe = pipe;
            }

            
        }
        return firstPipe;
    }

    handlePassingPipe(){
        
        this.points++;
        this.pointsText.text = 'Score: ' + this.points;
        
    }
    
}