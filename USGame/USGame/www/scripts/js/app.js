const App = function () {
    'use strict';
};

App.prototype.start = function () {
    'use strict';

    // Load the scenes included in the game
    let scenes = [];
    scenes.push(Boot);
    scenes.push(Preload);
    scenes.push(Menu);
    scenes.push(Play);

    const config = {
        type: Phaser.AUTO,
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: '#6495ed',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
        audio: {
            disableWebAudio: false
        },
        scene: scenes
    };

    let game = new Phaser.Game(config);
};


