
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },

    scale: {
        mode: Phaser.Scale.NONE,
        //mode: Phaser.Scale.Fit,
        //autoCenter: Phaser.Scale.CENTER_BOTH
    },
    //backgroundColor: '#000000',
    scene: [preloadScene, level1, level2]
};

let game = new Phaser.Game(config);

