class preloadScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'preloadScene' });
    }
    preload() {

        //level 1 (bakery)
        // Step 1, load JSON

        // Step 2 : Preload any images here
        this.load.image("kitchen", "assets/12_Kitchen_32x32.png");
        this.load.image("groceryStore", "assets/16_Grocery_store_32x32.png");
        this.load.image("roomBuilder", "assets/Room_Builder_32x32.png");
        this.load.image("tileAndStone", "assets/TileAndStone.png");
        this.load.image("wood", "assets/Wood.png");
        this.load.image("LivingRoom", "assets/2_LivingRoom_32x32.png");
        this.load.image("Generic", "assets/1_Generic_32x32.png");
        this.load.image("iceCream", "assets/24_Ice_Cream_Shop_32x32.png")

        // Employee is 64x64 9 frames per animation
        this.load.spritesheet('gen', 'assets/employee.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('rat', 'assets/pixelMouse.png', { frameWidth: 64, frameHeight: 64 });

        //level 2 (kitchen)
        // Step 1, load JSON

        // Step 2 : Preload any images here
        this.load.image("kitchen", "assets/12_Kitchen_32x32.png");
        this.load.image("groceryStore", "assets/16_Grocery_store_32x32.png");
        this.load.image("roomBuilder", "assets/Room_Builder_32x32.png");
        this.load.image("LivingRoom", "assets/2_LivingRoom_32x32.png");
        this.load.image("Generic", "assets/1_Generic_32x32.png");

        // Employee is 64x64 9 frames per animation
        this.load.spritesheet('gen', 'assets/employee.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('rat', 'assets/pixelMouse.png', { frameWidth: 64, frameHeight: 64 });

    } // end of preload //

    create () {

        console.log("preloadScene")
        this.add.text(10,500, 'Animation labs, press spacebar to continue', 
            { font: '24px Courier', fill: '#ffffff' });
            this.anims.create({
                key: 'gen-cast-up',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 0, end: 6 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-cast-left',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 13, end: 19 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-cast-down',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 26, end: 32 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-cast-right',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 39, end: 45 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-spear-up',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 52, end: 59 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-spear-left',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 65, end: 72 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-spear-down',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 78, end: 85 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-spear-right',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 91, end: 98 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-shoot-up',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 208, end: 220 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-shoot-left',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 221, end: 233 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-shoot-down',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 234, end: 246 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-shoot-right',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 247, end: 259 }),
                frameRate: 5,
                repeat: -1
            });
    
    
            this.anims.create({
                key: 'gen-attack-up',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 156, end: 161 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-attack-left',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 169, end: 174 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-attack-down',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 182, end: 187 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-attack-right',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 195, end: 200 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-up',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 105, end: 112 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-left',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 118, end: 125 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-down',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 131, end: 138 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'gen-right',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 144, end: 151 }),
                frameRate: 5,
                repeat: -1
            });

            this.anims.create({
                key: 'rat-up',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 105, end: 112 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'rat-left',
                frames: this.anims.generateFrameNumbers('gen',
                    { start: 118, end: 125 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'rat-down',
                frames: this.anims.generateFrameNumbers('rat',
                    { start: 131, end: 138 }),
                frameRate: 5,
                repeat: -1
            });
    
            this.anims.create({
                key: 'rat-right',
                frames: this.anims.generateFrameNumbers('rat',
                    { start: 144, end: 151 }),
                frameRate: 5,
                repeat: -1
            });


        //this.input.once('pointerdown', function(){
            var spaceDown = this.input.keyboard.addKey('SPACE');
            var key1 = this.input.keyboard.addKey(49);
            var key2 = this.input.keyboard.addKey(50);

        spaceDown.on('down', function(){
            this.scene.start("level1");
            }, this );

            key1.on('down', function(){
                this.scene.stop("mainScene");
                this.scene.start("level1");
                }, this );
    
            key2.on('down', function(){
                this.scene.stop("mainScene");
                this.scene.start("level2");
                }, this );

    }

}
