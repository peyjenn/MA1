class gameoverScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'gameoverScene' });
    }

    preload() {
        this.load.image('gameover','assets/gameover.png');

        this.load.audio('gameoverSnd', 'assets/gameover.mp3');

    }

    create () {

        window.heart = 3
        window.level1food = 0

        this.add.image(0, 0, 'gameover').setOrigin(0, 0);

        this.gameoverSnd = this.sound.add('gameoverSnd').setVolume(0.03);
        this.gameoverSnd.play();

        console.log("This is gameoverScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        var aDown = this.input.keyboard.addKey('A');

        
        spaceDown.on('down', function(){
        // console.log("Spacebar pressed, replay game");
        this.scene.stop("gameoverScene");
        this.scene.start("level1");
        }, this );

        aDown.on('down', function(){
            // console.log("A pressed (main menu)");
            this.scene.stop("gameoverScene");
            this.scene.start("mainScene");
            }, this );

    }

}
