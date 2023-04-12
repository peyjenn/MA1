
class level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'level1' });
    }

    preload() {
        this.load.tilemapTiledJSON("world", "assets/bakery.tmj")

        //mp3
        this.load.audio('bgmusic', 'assets/bgmusic.mp3');
        this.load.audio("hitSnd", "assets/hit.mp3")
        this.load.audio("collect", "assets/collect.mp3")
        this.load.audio('winmusic','assets/win.mp3');
        this.load.audio("gameoverSnd", "assets/gameover.mp3")

        // obstacle animation
        this.load.image('heart', 'assets/life.png');

        // load strawberrycake, pancake, bread, bagel 
        this.load.image("strawberrycake", "assets/strawberrycake.png");
        this.load.image("pancake", "assets/pancake.png");
        this.load.image("bread", "assets/bread.png");
        this.load.image("bagel", "assets/bagel.png"); //wrong item
    }

    create() {

        // music

        this.hitSnd = this.sound.add('hitSnd');
        this.collectSnd = this.sound.add('collect');
        this.gameoverSnd = this.sound.add('gameoverSnd')

        // window.count1 = this.bgmusicSnd;

        // window.count1.loop = true;

        console.log("animationScene")

        //Step 3 - Create the map from main
        let map = this.make.tilemap({ key: "world" });

        // Step 4 
        // 1st parameter is name in Tiled,    
        // 2nd parameter is key in Preload  
        let kitchenTiles = map.addTilesetImage("12_Kitchen_32x32", "kitchen");
        let groceryStoreTiles = map.addTilesetImage("16_Grocery_store_32x32", "groceryStore")
        let roomBuilderTiles = map.addTilesetImage("Room_Builder_32x32", "roomBuilder")
        let tileAndStoneTiles = map.addTilesetImage("TileAndStone", "tileAndStone")
        let woodTiles = map.addTilesetImage("Wood", "wood")
        let LivingRoomTiles = map.addTilesetImage("2_LivingRoom_32x32", "LivingRoom")
        let GenericTiles = map.addTilesetImage("1_Generic_32x32", "Generic")
        let iceCreamTiles = map.addTilesetImage("24_Ice_Cream_Shop_32x32", "iceCream")

        //Step 5 create and array of tiles
        let tilesArray = [
            kitchenTiles,
            groceryStoreTiles,
            roomBuilderTiles,
            tileAndStoneTiles,
            woodTiles,
            LivingRoomTiles,
            GenericTiles,
            iceCreamTiles
        ];

        // Step 6 Load in layers by layers    
        this.floorLayer = map.createLayer("floorLayer", tilesArray, 0, 0);
        this.wallsLayer = map.createLayer("wallsLayer", tilesArray, 0, 0);
        this.itemLayer = map.createLayer("itemLayer", tilesArray, 0, 0);
        this.decoLayer = map.createLayer("decoLayer", tilesArray, 0, 0);
        this.deco2Layer = map.createLayer("deco2Layer", tilesArray, 0, 0);

        var start = map.findObject("objectLayer", obj => obj.name === "start");

        this.player = this.physics.add.sprite(start.x, start.y, 'gen');
        this.rat = this.physics.add.sprite(90, 100, "rat")
        //this.rat2 = this.physics.add.sprite(100, 200, "rat")

        // collect items
        this.strawberrycake = this.physics.add.image(200, 500, 'strawberrycake')
        this.pancake = this.physics.add.image(800, 300, 'pancake')
        this.bread = this.physics.add.image(900, 160, 'bread')
        this.bagel = this.physics.add.image(600, 500, 'bagel')//wrong item

        //enemy overlap
        this.physics.add.overlap(
            this.player, //player
            [this.rat], //enemy
            this.overlapRat, //function to call
            null,
            this
        );

        //items overlap
        this.physics.add.overlap(
            this.player, //player
            [this.strawberrycake, this.pancake, this.bread],
            this.collectItems,
            null,
            this
        );

        this.physics.add.overlap(
            this.player, //player
            [this.bagel],
            this.collectWrongItems,
            null,
            this
        );

        // this.player.setCollideWorldBounds(true); //don't go out of room

        //debug for player
        window.player = this.player;

        this.tweens.add({
            targets: this.rat,
            x: 700,
            flipX: true,
            yoyo: true,
            duration: 4000,
            repeat: -1
        })

        // camera follows the player 
        this.cameras.main.startFollow(this.player);

        // this.add.sprite(100, 100, 'gen').play('gen-up').setScale(2)
        // this.add.sprite(250, 100, 'gen').play('gen-left').setScale(2)
        // this.add.sprite(400, 100, 'gen').play('gen-down').setScale(2)
        // this.add.sprite(550, 100, 'gen').play('gen-right').setScale(2)

        this.cursors = this.input.keyboard.createCursorKeys();

        //collision tilemaps
        this.decoLayer.setCollisionByProperty({ shelf2: true });
        this.decoLayer.setCollisionByProperty({ shelf1: true });
        this.decoLayer.setCollisionByProperty({ glass1: true });
        this.decoLayer.setCollisionByProperty({ fireplace: true });
        this.decoLayer.setCollisionByProperty({ donut1: true });
        this.deco2Layer.setCollisionByProperty({ glass1: true });
        this.itemLayer.setCollisionByProperty({ breadTrolley: true });
        this.itemLayer.setCollisionByProperty({ breadTrolley2: true });
        this.itemLayer.setCollisionByProperty({ table1: true });
        this.itemLayer.setCollisionByProperty({ shelf1: true });
        this.itemLayer.setCollisionByProperty({ shelf2: true });
        this.itemLayer.setCollisionByProperty({ firewood: true });
        this.itemLayer.setCollisionByProperty({ whiteborder1: true });
        this.wallsLayer.setCollisionByProperty({ walls: true });
        this.wallsLayer.setCollisionByProperty({ wall: true });
        this.wallsLayer.setCollisionByProperty({ whiteborder: true });

        // this.player will collide with the level tiles
        this.physics.add.collider(this.decoLayer, this.player);
        this.physics.add.collider(this.itemLayer, this.player);
        this.physics.add.collider(this.deco2Layer, this.player);
        this.physics.add.collider(this.wallsLayer, this.player);

        // this.time.addEvent({
        // delay: 2000,
        // callback: this.moveRightLeft,
        // callbackScope: this,
        // loop: false,
        // });

        // create life
        this.heart1 = this.add.image(50, 530, 'heart').setScrollFactor(0);
        this.heart2 = this.add.image(120, 530, 'heart').setScrollFactor(0);
        this.heart3 = this.add.image(190, 530, 'heart').setScrollFactor(0);

        if (window.heart === 3) {
            this.heart1.setVisible(true);
            this.heart2.setVisible(true);
            this.heart3.setVisible(true);

        } else if (window.heart === 2) {
            this.heart1.setVisible(true);
            this.heart2.setVisible(true);
            this.heart3.setVisible(false);

        } else if (window.heart === 1) {
            this.heart1.setVisible(true);
            this.heart2.setVisible(false);
            this.heart3.setVisible(false);

        } else if (window.heart === 0) {
            this.heart1.setVisible(false);
            this.heart2.setVisible(false);
            this.heart3.setVisible(false);

        }
    } // end of create //

    update() {

        if (this.player.x > 384 && this.player.x < 450 &&
            this.player.y < 100) //&& window.level1food == 3)************
        {
            if (window.level1food >= 3) {
                this.level2()
            }
        }
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('gen-left', true);
        }
        else if (this.cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('gen-right', true);

        }
        else if (this.cursors.down.isDown) {
            this.player.setVelocityY(160);

            this.player.anims.play('gen-down', true);
        }
        else if (this.cursors.up.isDown) {
            this.player.setVelocityY(-160);

            this.player.anims.play('gen-up', true);
        } else {
            this.player.setVelocity(0);
            this.player.anims.stop();
        }
    }
    // end of update // 

    overlapRat(player, enemy) {
        console.log("***Player overlap rat");

        // disable enemy after overlap
        enemy.disableBody(true, true);

        //Play a sound
        this.hitSnd.play();

        // shake the screen 
        this.cameras.main.shake(200);

        window.heart--
        console.log(window.heart)

        if (window.heart === 3) {
            this.heart1.setVisible(true);
            this.heart2.setVisible(true);
            this.heart3.setVisible(true);

        } else if (window.heart === 2) {
            this.heart1.setVisible(true);
            this.heart2.setVisible(true);
            this.heart3.setVisible(false);

        } else if (window.heart === 1) {
            this.heart1.setVisible(true);
            this.heart2.setVisible(false);
            this.heart3.setVisible(false);

        } else if (window.key === 0) {
            this.heart1.setVisible(false);
            this.heart2.setVisible(false);
            this.heart3.setVisible(false);
        }

        if (window.heart == 0) {
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

        window.level1food++
    }

    collectWrongItems(player, items) {
        console.log("***Player overlap food");

        // disable items after overlap
        items.disableBody(true, true);

        this.scene.start("gameoverScene");
    }

    moveRightLeft() {
        console.log("moveDownUp");
        this.tweens.timeline({
            targets: this.rat,
            loop: -1, // loop forever
            ease: "Linear",
            duration: 4000,
            tweens: [
                {
                    x: 700,
                },
                {
                    x: 700,
                },
            ],
        });
    }

    level2() {
        console.log("entering level2");
        this.scene.start("listScene2");
    }
}