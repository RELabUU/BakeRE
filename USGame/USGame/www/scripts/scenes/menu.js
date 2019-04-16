class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu', active: false });
    }

    init()
    {

    }

    create()
    {
        // Start the background music
        song1 = this.sound.add('song1', { loop: true, volume: 0.5 });
        //song1.play();

        //#region Texts

        // Game Title
        this.title = this.add.text(
            window.innerWidth / 2, 
            window.innerHeight / 5, 
            'BakeRE', 
            {
                fontFamily: 'Dosis',
                fontSize: 36,
                fill: '#000000'
            }
        );
        this.title.setOrigin(0.5, 0.5);

        // Click to Play
        this.txt_progress = this.add.text(
            window.innerWidth / 2,
            2 * window.innerHeight / 5,
            'Click to Play',
            {
                fontFamily: 'Dosis',
                fontSize: 24,
                fill: '#000000'
            }
        );
        this.txt_progress.setOrigin(0.5, 0.5);

        //#endregion
        
        var type = 0;
        var menuGroup = [];

        this.input.on('pointerdown', function (pointer) {
            //document.documentElement.requestFullscreen();
            this.createMenu(menuGroup, type);
            this.txt_progress.visible = false;
        }, this);


        this.input.on('gameobjectdown', function (pointer, gameobject) {
            if (type === 0) {

                // Database selection
                for (var i = 0; i < databases.length; i++) {
                    if (databases[i]['Title'] === gameobject.list[1].text) {
                        database = databases[i];
                        break;
                    }
                }

                this.separateDatabase();

                menuGroup.forEach(function (item) {
                    item.list[0].visible = false;
                    item.list[1].visible = false;
                });
                menuGroup = [];
                type = 1;
                this.createMenu(menuGroup, type);
            }
            else {

                // Level selection
                switch (gameobject.list[1].text) {
                    case 'Level 0':
                        // TODO
                        //progress[0] = lvl0;
                        break;
                    case 'Level 1':
                        progress[0] = lvl1;
                        break;
                    case 'Level 2':
                        progress[0] = lvl2;
                        break;
                    case 'Level 3':
                        progress[0] = lvl3;
                        break;
                    case 'Level 4':
                        progress[0] = lvl4;
                        break;
                    default:
                        break;
                }

                this.startGame();
            }
        }, this);

        console.log('Menu');
    }

    startGame() {
        this.scene.start('Play');
    }

    createMenu(menuGroup, type) {
        var graphics;
        var txt;
        var container;

        var l = 0;
        var w = window.innerWidth;
        var h = window.innerHeight;
        var squareSize = window.innerWidth / 6;

        if (type === 0) {
            l = databases.length;
        }
        else {
            l = 4; // Nr. of levels, will become 5 when tutorial is added
        }

        for (var i = 1; i <= l; i++) {
            graphics = this.add.graphics();
            graphics.fillStyle(0xffff00, 1);
            graphics.fillRoundedRect(0, 0, squareSize, squareSize, 12);

            if (type === 0) {
                txt = databases[i - 1]['Title'];
            }
            else {
                txt = 'Level ' + i;
            }

            var t = this.add.text(
                0,
                0,
                txt,
                {
                    fontFamily: 'Dosis',
                    fontSize: 12,
                    fill: '#000000'
                }
            );
            t.setOrigin(0.5, 0.5);

            container = this.add.container(i * w / 5 - squareSize / 2, 2 * h / 3 - squareSize / 2);
            container.setInteractive(new Phaser.Geom.Rectangle(0, 0, squareSize, squareSize), Phaser.Geom.Rectangle.Contains);
            container.add(graphics);
            container.add(t);
            menuGroup.push(container);
        }
    }

    separateDatabase() {
        // Separate the parts of the database into usable objects
        epics = database['Epics'];
        userstories = database['Userstories'];
        mistakes = database['Mistakes'];
        accTests = database['Acceptance Tests'];
    }
}