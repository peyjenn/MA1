class winScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'winScene' });
    }

    preload() {
        this.load.image('win','assets/winningScene.png');

        this.load.audio('winmusic','assets/win.mp3');

    }

    create () {

        this.add.image(0, 0, 'win').setOrigin(0, 0);

        this.winmusic_Snd = this.sound.add('winmusic').setVolume(0.06);
        this.winmusic_Snd.play();
        
        // this.add.text(0,580, 'Press Spacebar to continue', { font: '24px Courier', fill: '#000000' });

        console.log("This is winScene");

        //this.input.once('pointerdown', function(){
        var spaceDown = this.input.keyboard.addKey('SPACE');
        // var aDown = this.input.keyboard.addKey('A');

        
        spaceDown.on('down', function(){
        // console.log("Spacebar pressed, replay game");
        this.scene.stop("winScene");
        this.scene.start("mainScene");
        }, this );

        // aDown.on('down', function(){
        //     // console.log("A pressed (main menu)");
        //     this.scene.stop("failScene2");
        //     this.scene.start("mainScene");
        //     }, this );

    }

}
