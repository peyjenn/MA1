
let config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },

    scale: {
        mode: Phaser.Scale.NONE,
        //mode: Phaser.Scale.Fit,
        //autoCenter: Phaser.Scale.CENTER_BOTH
    },
    //backgroundColor: '#000000',
    scene: [mainScene, storyScene, instructions1, rulesPage, listScene, listScene2, listScene3, gameoverScene, winScene, level1, level2, level3]
};

let game = new Phaser.Game(config);

window.heart = 3
window.level1food = 0
window.level2food = 0
window.level3food = 0
