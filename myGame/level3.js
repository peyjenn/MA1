class level3 extends Phaser.Scene {
    constructor() {
        super({ key: 'level3' });
    }

    preload() {
        this.load.tilemapTiledJSON("world3", "assets/storeRoom.tmj")

        //mp3
        this.load.audio('bgmusic', 'assets/bgmusic.mp3');
        this.load.audio("hitSnd", "assets/hit.mp3")
        this.load.audio("collect", "assets/collect.mp3")
        this.load.audio('winmusic','assets/win.mp3');
        this.load.audio("gameoverSnd", "assets/gameover.mp3")

        // obstacle animation
        this.load.image('heart', 'assets/life.png');

        // load pudding, apple pie, garlicbread, donut, lemonpie, cookies 
        this.load.image("pudding", "assets/pudding.png");
        this.load.image("applepie", "assets/applepie.png");
        this.load.image("garlicbread", "assets/garlicbread.png");
        this.load.image("donut", "assets/donut.png"); //wrong item
        this.load.image("lemonpie", "assets/lemonpie.png"); //wrong item
        this.load.image("cookies", "assets/cookies.png"); //wrong item
    }

    create() {

        console.log("animationScene")

    // music
      
    this.hitSnd = this.sound.add('hitSnd');
    this.collectSnd = this.sound.add('collect');
    this.gameoverSnd = this.sound.add('gameoverSnd')

    // this.collectSnd = this.sound.add('collect');
    // this.bgmusicSnd = this.sound.add('bgmusic',{loop: true}).setVolume(0.03);

    // window.music1 = this.bgmusicSnd;

    // window.music1.play();

    // window.music1.loop = true;  
 

        //Step 3 - Create the map from main
        let map = this.make.tilemap({key: "world3"});

        // Step 4 
         // 1st parameter is name in Tiled,    
         // 2nd parameter is key in Preload  
        let groceryStoreTiles = map.addTilesetImage("16_Grocery_store_32x32", "groceryStore")
        let bathroomTiles = map.addTilesetImage("3_Bathroom_32x32", "bathroom")
        let roomBuilderTiles = map.addTilesetImage("Room_Builder_32x32", "roomBuilder")
        let woodTiles = map.addTilesetImage("Wood", "wood")
        let GenericTiles = map.addTilesetImage("1_Generic_32x32", "Generic")

        //Step 5 create and array of tiles
        let tilesArray = [
            groceryStoreTiles,
            bathroomTiles,
            roomBuilderTiles,
            woodTiles,
            GenericTiles,
        ];

        // Step 6 Load in layers by layers    
        this.floorLayer = map.createLayer("floorLayer",tilesArray, 0,0);
        this.wallLayer = map.createLayer("wallLayer",tilesArray, 0,0);
        this.itemLayer = map.createLayer("itemLayer",tilesArray, 0,0);
        this.itemLayer2 = map.createLayer("itemLayer2",tilesArray, 0,0);
        this.itemLayer3 = map.createLayer("itemLayer3",tilesArray, 0,0);

        var start = map.findObject("objectLayer", obj => obj.name === "start");

        this.player = this.physics.add.sprite(start.x, start.y, 'gen');
        this.rat = this.physics.add.sprite(100,100, "rat")
        this.rat2 = this.physics.add.sprite(100,500, "rat")
        this.rat3 = this.physics.add.sprite(1100,200, "rat")
        this.rat4 = this.physics.add.sprite(100,600, "rat")

        // collect items
        this.pudding = this.physics.add.image(256, 421, 'pudding')
        this.pudding2 = this.physics.add.image(282, 650, 'pudding')
        this.applepie = this.physics.add.image(933, 96, 'applepie')
        this.applepie2 = this.physics.add.image(321, 198, 'applepie')
        this.applepie3 = this.physics.add.image(960, 282, 'applepie')
        this.garlicbread = this.physics.add.image(640, 288, 'garlicbread')
        this.donut = this.physics.add.image(1215, 608, 'donut')//wrong item
        this.lemonpie = this.physics.add.image(448, 288, 'lemonpie')//wrong item
        this.cookies = this.physics.add.image(1031, 666, 'cookies')//wrong item

        //enemy overlap
        this.physics.add.overlap(
        this.player, //player
        [this.rat, this.rat2, this.rat3, this.rat4], //enemy
        this.overlapRat, //function to call
        null,
        this
        );

        //items overlap
        this.physics.add.overlap(
            this.player, //player
            [this.pudding, this.pudding2, this.applepie, this.applepie2, this.applepie3, this.garlicbread],
            this.collectItems,
            null,
            this
        );

        this.physics.add.overlap(
            this.player, //player
            [this.donut, this.lemonpie, this.cookies],
            this.collectWrongItems,
            null,
            this
        );

        //this.player.setCollideWorldBounds(true); don't go out of room

        //debug for player
        window.player = this.player;

        //enemy rat
        this.tweens.add({
            targets:this.rat,
            x: 800,
            flipX: true,
            yoyo: true,
            duration: 2500,
            repeat: -1
        })

        this.tweens.add({
            targets:this.rat2,
            x: 900,
            flipX: true,
            yoyo: true,
            duration: 2000,
            repeat: -1
        })

        this.tweens.add({
            targets:this.rat3,
            x: 900,
            flipX: true,
            yoyo: true,
            duration: 2000,
            repeat: -1
        })

        this.tweens.add({
            targets:this.rat4,
            x: 900,
            flipX: true,
            yoyo: true,
            duration: 2500,
            repeat: -1
        })

        this.cameras.main.startFollow(this.player);

        // this.add.sprite(100, 100, 'gen').play('gen-up').setScale(2)
        // this.add.sprite(250, 100, 'gen').play('gen-left').setScale(2)
        // this.add.sprite(400, 100, 'gen').play('gen-down').setScale(2)
        // this.add.sprite(550, 100, 'gen').play('gen-right').setScale(2)

        this.cursors = this.input.keyboard.createCursorKeys();

    //  this.decoLayer.setCollisionByProperty({ shelf2:true });
    //  this.decoLayer.setCollisionByProperty({ shelf1:true });
    //  this.itemLayer.setCollisionByProperty({ breadTrolley:true });
    //  this.itemLayer.setCollisionByProperty({ table1:true });

     // this.playerwill collide with the level tiles
     this.itemLayer.setCollisionByExclusion(-1, true)
     this.physics.add.collider(this.itemLayer, this.player);
     this.itemLayer2.setCollisionByExclusion(-1, true)
     this.physics.add.collider(this.itemLayer2, this.player);
     this.itemLayer3.setCollisionByExclusion(-1, true)
     this.physics.add.collider(this.itemLayer3, this.player);
     this.wallLayer.setCollisionByExclusion(-1, true)
     this.physics.add.collider(this.wallLayer, this.player);


    // this.time.addEvent({
    // delay: 3000,
    // callback: this.moveRightLeft,
    // callbackScope: this,
    // loop: false,
    // });

     // create life
     this.heart1 = this.add.image(50,530, 'heart').setScrollFactor(0);
     this.heart2 = this.add.image(120,530,'heart').setScrollFactor(0);
     this.heart3 = this.add.image(190,530,'heart').setScrollFactor(0);

    if ( window.heart === 3) {
        this.heart1.setVisible(true);
        this.heart2.setVisible(true);
        this.heart3.setVisible(true);
  
    } else if ( window.heart === 2) {
      this.heart1.setVisible(true);
      this.heart2.setVisible(true);
      this.heart3.setVisible(false);
  
    } else if ( window.heart === 1) {
        this.heart1.setVisible(true);
        this.heart2.setVisible(false);
        this.heart3.setVisible(false);
      
    } else if (window.key === 0) {
        this.heart1.setVisible(false);
        this.heart2.setVisible(false);
        this.heart3.setVisible(false);
  
    }
    } // end of create //

update () {
        {
        if (window.level3food >= 6) 
            this.winScene()
    }

        if (this.cursors.left.isDown)
     {
         this.player.setVelocityX(-160);
         this.player.anims.play('gen-left', true);
     }
     else if (this.cursors.right.isDown)
     {
         this.player.setVelocityX(160);
         this.player.anims.play('gen-right', true);
 
     } 
     else if (this.cursors.down.isDown)
     {
         this.player.setVelocityY(160);
 
         this.player.anims.play('gen-down', true);
     }
    else if (this.cursors.up.isDown)
     {
         this.player.setVelocityY(-160);
 
         this.player.anims.play('gen-up', true);
     } else {
         this.player.setVelocity(0);
         this.player.anims.stop();
     }

    }
    // end of update // 
    overlapRat(player, enemy){
        console.log("***Player overlap rat");
    
        // disable enemy after overlap
        enemy.disableBody(true, true);
    
        //Play a sound
        this.hitSnd.play();
    
        // shake the screen 
        this.cameras.main.shake(200);

        window.heart--
        console.log(window.heart)

        if ( window.heart === 3) {
            this.heart1.setVisible(true);
            this.heart2.setVisible(true);
            this.heart3.setVisible(true);
      
        } else if ( window.heart === 2) {
          this.heart1.setVisible(true);
          this.heart2.setVisible(true);
          this.heart3.setVisible(false);
      
        } else if ( window.heart === 1) {
            this.heart1.setVisible(true);
            this.heart2.setVisible(false);
            this.heart3.setVisible(false);
          
        } else if (window.key === 0) {
            this.heart1.setVisible(false);
            this.heart2.setVisible(false);
            this.heart3.setVisible(false);
        }
  
        if (window.heart == 0){
        this.scene.start("gameoverScene");
        //this.loseSnd.play();
  
        }
    }

    collectItems(player, items) {
        console.log("***Player overlap food");

        // disable items after overlap
        items.disableBody(true, true);

        //Play a sound
        this.collectSnd.play();

        window.level3food++
    }

    collectWrongItems(player, items) {
        console.log("***Player overlap food");

        // disable items after overlap
        items.disableBody(true, true);

        //Play a sound
        //this.gameoverSnd.play();

        this.scene.start("gameoverScene");
    }

     
    moveRightLeft() {
        console.log("moveDownUp");
        this.tweens.timeline({
          targets: this.rat,
          loop: -1, // loop forever
          ease: "Linear",
          duration: 2000,
          tweens: [
            {
              x: 800,
            },
            {
              x: 800,
            },
          ],
        });
    }
     
    winScene(){
    console.log("YOU WON");
    this.scene.start("winScene");
    }

}