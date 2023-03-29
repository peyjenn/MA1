
class level2 extends Phaser.Scene {
    constructor() {
        super({ key: 'level2' });
    }

    preload() {
        this.load.tilemapTiledJSON("world2", "assets/kitchen.tmj")
    }

    create() {

        console.log("animationScene")

        //Step 3 - Create the map from main
        let map = this.make.tilemap({key: "world2"});

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
        this.floor = map.createLayer("floor",tilesArray, 0,0);
        this.walls = map.createLayer("walls",tilesArray, 0,0);
        this.itemLayer1 = map.createLayer("itemLayer1",tilesArray, 0,0);
        this.itemLayer = map.createLayer("itemLayer",tilesArray, 0,0);
        this.itemLayer2 = map.createLayer("itemLayer2",tilesArray, 0,0);

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

     this.itemLayer.setCollisionByProperty({ kitchenTable:true });

     // this.player will collide with the level tiles
     this.physics.add.collider(this.itemLayer, this.player);
     
    } // end of create //

    update () {
        if (this.player.x > 600 && this.player.x < 700 &&
            this.player.y < 900)
            {
               this.level1()
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

    }// end of update // 

//jump to room 1 
     level1(){
        console.log("entering level1");
        this.scene.start("level1");
     }


}