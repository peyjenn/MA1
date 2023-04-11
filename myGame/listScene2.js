class listScene2 extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'listScene2' });
    }

    preload() {
        this.load.image('list_2','assets/list2.png');

        //mp3
        this.load.audio('bgmusic', 'assets/bgmusic.mp3');

    }
     

    create () {

        this.add.image(0, 0, 'list_2').setOrigin(0, 0);
        
        // music
        // this.time_Snd = this.sound.add('bgmusic',{loop: true}).setVolume(0.03);
        // this.time_Snd.play();
        // window.count1 = this.time_Snd;
        // window.count1.loop = true;

        this.timedEvent = this.time.addEvent({ delay: 5000, callback: this.delay5Seconds, callbackScope: this, loop: false });

    }

    

    delay5Seconds(){
    
    // this.timeSnd.play();
    console.log("after 5 secs");
    // window.count1.stop();
    this.scene.stop("listScene2");
    this.scene.start("level2");
    }

}