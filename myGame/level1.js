
class level1 extends Phaser.Scene {
    constructor() {
        super({ key: 'level1' });
    }

    preload() {
        this.load.tilemapTiledJSON("world", "assets/bakery.tmj")
    }

    create() {

        console.log("animationScene")

        //Step 3 - Create the map from main
        let map = this.make.tilemap({key: "world"});

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
        this.floorLayer = map.createLayer("floorLayer",tilesArray, 0,0);
        this.wallsLayer = map.createLayer("wallsLayer",tilesArray, 0,0);
        this.itemLayer = map.createLayer("itemLayer",tilesArray, 0,0);
        this.decoLayer = map.createLayer("decoLayer",tilesArray, 0,0);
        this.deco2Layer = map.createLayer("deco2Layer",tilesArray, 0,0);

        var start = map.findObject("objectLayer", obj => obj.name === "start");


        this.player = this.physics.add.sprite(start.x, start.y, 'gen');
        this.rat = this.physics.add.sprite(800,100, "rat").setScale(1);

        //this.player.setCollideWorldBounds(true); don't go out of room

        //debug for player
        window.player = this.player;

        this.cameras.main.startFollow(this.player);

        // this.add.sprite(100, 100, 'gen').play('gen-up').setScale(2)
        // this.add.sprite(250, 100, 'gen').play('gen-left').setScale(2)
        // this.add.sprite(400, 100, 'gen').play('gen-down').setScale(2)
        // this.add.sprite(550, 100, 'gen').play('gen-right').setScale(2)

        this.cursors = this.input.keyboard.createCursorKeys();

    this.decoLayer.setCollisionByProperty({ shelf2:true });
     this.decoLayer.setCollisionByProperty({ shelf1:true });
     this.itemLayer.setCollisionByProperty({ breadTrolley:true });
     this.itemLayer.setCollisionByProperty({ table1:true });

     // this.playerwill collide with the level tiles
     this.physics.add.collider(this.decoLayer, this.player);
     this.physics.add.collider(this.itemLayer, this.player);

    this.time.addEvent({
    delay: 3000,
    callback: this.moveRightLeft,
    callbackScope: this,
    loop: false,
    });

    moveRightLeft() {
        console.log("moveDownUp");
        this.tweens.timeline({
          targets: this.cleric,
          loop: -1, // loop forever
          ease: "Linear",
          duration: 2000,
          tweens: [
            {
              x: 600,
            },
            {
              x: 300,
            },
          ],
        });
      }
     
    } // end of create //

update () {

 if (this.player.x > 396 && this.player.x < 444 &&
    this.player.y < 78)
    {
       this.level2()
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

    level2(){
        console.log("entering level2");
        this.scene.start("level2");
     }

}