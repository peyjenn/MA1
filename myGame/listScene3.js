class listScene3 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'listScene3' });
    }

    preload() {
        this.load.image('list_3','assets/list3.png');

        //mp3
        this.load.audio('bgmusic', 'assets/bgmusic.mp3');

    }

    create () {

        this.add.image(0, 0, 'list_3').setOrigin(0, 0);

           // music
        //    this.time_Snd = this.sound.add('bgmusic',{loop: true}).setVolume(0.03);
        //    this.time_Snd.play();
        //    window.count3 = this.time_Snd;
        //    window.count3.loop = true;

        this.timedEvent = this.time.addEvent({ delay: 5000, callback: this.delay5Seconds, callbackScope: this, loop: false });

    }

    delay5Seconds(){

        console.log("after 5 secs");
        // window.count3.stop();
        this.scene.stop("listScene3");
        this.scene.start("level3");
        }  

}
