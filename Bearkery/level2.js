
class level2 extends Phaser.Scene {
    constructor() {
        super({ key: 'level2' });
    }

    preload() {
        this.load.tilemapTiledJSON("world2", "assets/kitchen.tmj")

        //mp3
        this.load.audio('bgmusic', 'assets/bgmusic.mp3');
        this.load.audio("hitSnd", "assets/hit.mp3")
        this.load.audio("collect", "assets/collect.mp3")
        this.load.audio('winmusic','assets/win.mp3');
        this.load.audio("gameoverSnd", "assets/gameover.mp3")

        // obstacle animation
        this.load.image('heart', 'assets/life.png');

    }

    create() {

        console.log("animationScene")

        // music

        this.hitSnd = this.sound.add('hitSnd');
        this.collectSnd = this.sound.add('collect');
        this.gameoverSnd = this.sound.add('gameoverSnd')

        // this.bgmusicSnd = this.sound.add('bgmusic', { loop: true }).setVolume(0.03);

        // this.bgmusicSnd.play();

        // window.count1 = this.bgmusicSnd;

        // window.count1.loop = true;


        //Step 3 - Create the map from main
        let map = this.make.tilemap({ key: "world2" });

        // Step 4 
        // 1st parameter is name in Tiled,    
        // 2nd parameter is key in Preload  
        let kitchenTiles = map.addTilesetImage("12_Kitchen_32x32", "kitchen");
        let groceryStoreTiles = map.addTilesetImage("16_Grocery_store_32x32", "groceryStore")
        let roomBuilderTiles = map.addTilesetImage("Room_Builder_32x32", "roomBuilder")
        let GenericTiles = map.addTilesetImage("1_Generic_32x32", "Generic")

        //Step 5 create and array of tiles
        let tilesArray = [
            kitchenTiles,
            groceryStoreTiles,
            roomBuilderTiles,
            GenericTiles,
        ];

        // Step 6 Load in layers by layers    
        this.floor = map.createLayer("floor", tilesArray, 0, 0);
        this.walls = map.createLayer("walls", tilesArray, 0, 0);
        this.itemLayer1 = map.createLayer("itemLayer1", tilesArray, 0, 0);
        this.itemLayer = map.createLayer("itemLayer", tilesArray, 0, 0);
        this.itemLayer2 = map.createLayer("itemLayer2", tilesArray, 0, 0);

        var start = map.findObject("objectLayer", obj => obj.name === "start");

        this.player = this.physics.add.sprite(start.x, start.y, 'gen');
        this.rat = this.physics.add.sprite(150, 130, "rat")
        this.rat2 = this.physics.add.sprite(100, 320, "rat")

        // collect items
        this.cheesecake = this.physics.add.image(200, 500, 'cheesecake')
        this.cheesecake2 = this.physics.add.image(88, 546, 'cheesecake')
        this.waffle = this.physics.add.image(778, 234, 'waffle')
        this.loaf = this.physics.add.image(896, 160, 'loaf')
        this.loaf2 = this.physics.add.image(600, 200, 'loaf')
        this.chococake = this.physics.add.image(160, 200, 'chococake')//wrong item
        this.sandwich = this.physics.add.image(807, 448, 'sandwich')//wrong item

        //enemy overlap
        this.physics.add.overlap(
            this.player, //player
            [this.rat, this.rat2], //enemy
            this.overlapRat, //function to call
            null,
            this
        );

        //items overlap
        this.physics.add.overlap(
            this.player, //player
            [this.cheesecake, this.cheesecake2, this.waffle, this.loaf, this.loaf2],
            this.collectItems,
            null,
            this
        );

        this.physics.add.overlap(
            this.player, //player
            [this.chococake, this.sandwich],
            this.collectWrongItems,
            null,
            this
        );

        //this.player.setCollideWorldBounds(true); don't go out of room

        //debug for player
        window.player = this.player;

        this.tweens.add({
            targets: this.rat,
            x: 600,
            flipX: true,
            yoyo: true,
            duration: 3000,
            repeat: -1
        })


        this.tweens.add({
            targets: this.rat2,
            x: 800,
            flipX: true,
            yoyo: true,
            duration: 3000,
            repeat: -1
        })

        this.cameras.main.startFollow(this.player);

        // this.add.sprite(100, 100, 'gen').play('gen-up').setScale(2)
        // this.add.sprite(250, 100, 'gen').play('gen-left').setScale(2)
        // this.add.sprite(400, 100, 'gen').play('gen-down').setScale(2)
        // this.add.sprite(550, 100, 'gen').play('gen-right').setScale(2)

        this.cursors = this.input.keyboard.createCursorKeys();

        //collision tilemaps
        this.itemLayer.setCollisionByProperty({ brownborder: true });
        this.itemLayer.setCollisionByProperty({ woodtable: true });
        this.itemLayer.setCollisionByProperty({ bakingtools: true });
        this.itemLayer.setCollisionByProperty({ kitchenTable: true });
        this.itemLayer1.setCollisionByProperty({ kitchenTable: true });
        this.itemLayer1.setCollisionByProperty({ walls2: true });
        this.itemLayer2.setCollisionByProperty({ kitchenTable: true });
        this.walls.setCollisionByProperty({ brownborder: true });
        this.walls.setCollisionByProperty({ walls: true });
        this.walls.setCollisionByProperty({ walls2: true });

        // this.player will collide with the level tiles
        this.physics.add.collider(this.itemLayer, this.player);
        this.physics.add.collider(this.itemLayer1, this.player);
        this.physics.add.collider(this.itemLayer2, this.player);
        this.physics.add.collider(this.walls, this.player);

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

        } else if (window.key === 0) {
            this.heart1.setVisible(false);
            this.heart2.setVisible(false);
            this.heart3.setVisible(false);

        }

    } // end of create //

    update() {
        if (this.player.x > 576 && this.player.x < 640 &&
            this.player.y < 132) 
            {
            if (window.level2food >= 5) 
                this.level3()
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

    //jump to room 3

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

        window.level2food++
    }

    collectWrongItems(player, items) {
        console.log("***Player overlap food");

        // disable items after overlap
        items.disableBody(true, true);

        //Play a sound
        // this.gameoverSnd.play();

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

    level3() {
        console.log("entering level3");
        this.scene.start("listScene3");
    }


}