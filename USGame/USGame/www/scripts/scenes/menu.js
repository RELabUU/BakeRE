class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu', active: false });
    }

    init()
    {

    }

    create()
    {
        var background = this.add.image(window.innerWidth / 2, window.innerHeight / 4, 'background');
        background.setTint(0x36627b, 0x36627b, 0xf4ab2b, 0xf4ab2b);

        // Start the background music
        //song1 = this.sound.add('song1', { loop: true, volume: 0.5 });
        //song1.play();

        //#region Texts

        // Game Title
        this.title = this.add.text(
            window.innerWidth / 2, 
            window.innerHeight / 5, 
            'BakeRE', 
            {
                fontFamily: 'Dosis',
                fontSize: 48,
                fill: '#000000'
            }
        );
        this.title.setStroke('#FFFFFF', 16);
        this.title.setShadow(2, 2, '#333333', 2, true, false);
        this.title.setOrigin(0.5, 0.5);

        // Subtitle
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
        this.txt_progress.setStroke('#FFFFFF', 12);
        this.txt_progress.setOrigin(0.5, 0.5);

        //#endregion
        
        var type = 0;
        var menuGroup = [];

        this.input.on('pointerdown', function (pointer) {
            //document.documentElement.requestFullscreen();
            this.createMenu(menuGroup, type);
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
                        progress[0] = lvl0;
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
            this.txt_progress.text = "Select your database";
            l = databases.length;
        }
        else {
            this.txt_progress.text = "Pick a level";
            l = 5; 
        }

        for (var i = 0; i < l; i++) {
            graphics = this.add.graphics();
            graphics.fillStyle(0xffffff, 1);
            graphics.fillRoundedRect(0, 0, squareSize, squareSize, 12);
            
            graphics.lineStyle(2, 0x000000, 1);
            graphics.strokeRoundedRect(0, 0, squareSize, squareSize, 12);

            if (type === 0) {
                txt = databases[i]['Title'];
            }
            else {
                txt = 'Level ' + i;
            }

            var t = this.add.text(
                squareSize / 2,
                squareSize / 2,
                txt,
                {
                    fontFamily: 'Dosis',
                    fontSize: 12,
                    fill: '#000000',
                    wordWrap: { width: squareSize - w / 36, useAdvancedWrap: true },
                    align: 'center'
                }
            );
            t.setOrigin(0.5, 0.5);

            container = this.add.container(i * (w / 6 + w / 36) + w / 36, 2 * h / 3 - squareSize / 2);
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