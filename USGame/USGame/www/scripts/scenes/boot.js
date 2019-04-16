class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot', active: true });
    }

    init() {

    }

    preload() {

    }

    create() {
        console.log('Boot');
        this.scene.start('Preload');
    }
}