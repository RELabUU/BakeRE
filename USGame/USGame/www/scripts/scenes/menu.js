class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu', active: false });
    }

    init()
    {

    }

    create()
    {
        var background = this.add.image(window.innerWidth / 2, window.innerHeight / 4, 'background1');
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

        if (skipDatabaseSelect === true) {
            menuType = 2;
            menuGroup = [];
            this.createMenu();
        }
        else {
            if (menuType === 0) {
                this.input.on('pointerdown', function (pointer) {
                    this.createMenu();
                }, this);
            }
        }

        this.input.on('gameobjectdown', function (pointer, gameobject) {
            if (menuType === 0) {
                var char = gameobject.list[0].text;
                this.addLetters(char);
            }
            else if (menuType === 1) {

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
                menuType = 2;
                this.createMenu();
            }
            else if (menuType === 2) {
                // Level selection
                var name = gameobject.list[1].text;

                if (name.includes("Level 1")) {
                    progress[0] = lvl1;
                }
                else if (name.includes("Level 2")) {
                    progress[0] = lvl2;
                }
                else if (name.includes("Level 3")) {
                    progress[0] = lvl3;
                }
                else if (name.includes("Level 4")) {
                    progress[0] = lvl4;
                }
                else {
                    // Tutorial
                    progress[0] = lvl0;
                }

                this.startGame();
            }
        }, this);

        console.log('Menu');
    }

    startGame() {
        this.scene.start('Play');
    }

    createMenu() {
        var graphics;
        var txt;
        var container;
        var ptsNeeded = this.pointsNextLevel();
        var points = 0;
        var totalPoints = 0;

        var l = 0;
        var w = window.innerWidth;
        var h = window.innerHeight;
        var squareSize = window.innerWidth / 6;

        if (menuType === 1) {
            this.txt_progress.text = "Select your database";
            l = databases.length;
        }
        else if (menuType === 2) {
            this.txt_progress.text = "Pick a level";
            l = 5; 

            var sText = this.make.text(textconfigScore);
            sText.x = window.innerWidth / 40;
            sText.y = window.innerHeight / 20;
            sText.text = "Score: " + progress[4].reduce(function (a, b) { return a + b; }, 0);
        }
        else {
            this.txt_progress.text = "Name: " + progress[8].join("");
            this.createTextMenu();
        }

        if (menuType === 1 || menuType === 2) {
            for (var i = 0; i < l; i++) {
                var unlocked;
                points = ptsNeeded[i];
                totalPoints = progress[4].reduce(function (a, b) { return a + b; }, 0);
                if (menuType === 2) {
                    if (i === 0) {
                        unlocked = true;
                    }
                    else if (totalPoints >= points && progress[7][i - 1] === true) {
                        unlocked = true;
                    }
                    else {
                        unlocked = false;
                    }
                }

                graphics = this.add.graphics();

                if (menuType === 2) {
                    if (unlocked === true) {
                        graphics.fillStyle(0xffffff, 1);
                    }
                    else {
                        graphics.fillStyle(0xa4a4a4, 1);
                    }
                }
                else {
                    graphics.fillStyle(0xf2f2f2, 1);
                }

                graphics.fillRoundedRect(0, 0, squareSize, squareSize, 12);
            
                graphics.lineStyle(2, 0x000000, 1);
                graphics.strokeRoundedRect(0, 0, squareSize, squareSize, 12);

                if (menuType === 1) {
                    txt = databases[i]['Title'];
                }
                else if (menuType === 2 && i === 0) {
                    txt = "Tutorial";
                }
                else if (menuType === 2) {
                    txt = [
                        "Level " + i,
                        "",
                        "Points needed: " + points
                    ];
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
                if (menuType === 1 || unlocked === true) {
                    container.setInteractive(new Phaser.Geom.Rectangle(0, 0, squareSize, squareSize), Phaser.Geom.Rectangle.Contains);
                }
                container.add(graphics);
                container.add(t);
                menuGroup.push(container);
            }
        }
    }

    separateDatabase() {
        // Separate the parts of the database into usable objects
        epics = database['Epics'];
        userstories = database['Userstories'];
        mistakes = database['Mistakes'];
        accTests = database['Acceptance Tests'];
    }

    pointsNextLevel() {
        var pts = [];
        
        var lvl1to2;
        var lvl2to3;
        var lvl3to4;

        // The points threshold you get for completing a userstory in 25 seconds (out of 45)
        var timePerUserstory = 45;
        var timeToSucceed = 25;
        var c = 200 / Math.pow(timePerUserstory, 2);
        var x = Math.pow(timeToSucceed, 2);
        var s = Math.round(200 - c * x);

        var nr1 = this.getNrOfUserstories(lvl1);
        var nr2 = this.getNrOfUserstories(lvl2);
        var nr3 = this.getNrOfUserstories(lvl3);

        lvl1to2 = nr1 * s;
        lvl2to3 = nr2 * s + lvl1to2;
        lvl3to4 = nr3 * s + lvl2to3;

        pts.push(0);
        pts.push(0);
        pts.push(lvl1to2);
        pts.push(lvl2to3);
        pts.push(lvl3to4);

        return pts;
    }

    getNrOfUserstories(level) {
        var ep = level['Epics'];
        var cont = level['Content'];
        var nr = 0;

        for (var i = 1; i <= ep; i++) {
            if (level === lvl1 || level === lvl4) {
                nr = nr + Number(cont[i]['nr']);
            }
            else {
                nr = nr + (Number(cont[i]['nr']) - Number(cont[1]['nrMistakes']));
            }
        }

        return nr;
    }

    createTextMenu() {
        var w = window.innerWidth;
        var h = window.innerHeight;

        var textButton;
        var container;
        var letters = [];
        var alphabet = [
            ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
            ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'],
            ['U', 'V', 'W', 'X', 'Y', 'Z', '-', ' ', '↶', '↷']
        ];

        for (var i = 0; i < alphabet.length; i++) {
            for (var j = 0; j < alphabet[i].length; j++) {
                textButton = this.make.text(textconfigMenuHeader);
                textButton.x = 0;
                textButton.y = 0;
                textButton.setDepth(10);
                textButton.text = alphabet[i][j];
                textButton.setStroke('#FFFFFF', 12);
                container = this.add.container((j + 1) * w / 12, (i + 3) * h / 6);
                container.setInteractive(new Phaser.Geom.Rectangle(0, 0, textButton.width, textButton.height), Phaser.Geom.Rectangle.Contains);
                container.add(textButton);

                menuGroup.push(container);
            }
        }
    }

    addLetters(char) {
        if (char === "↶") {
            if (progress[8].length > 0) {
                progress[8].pop();
            } 
        }
        else if (char === "↷") {
            menuGroup.forEach(function (item) {
                item.list[0].text = "";
            });
            this.sendName();
            menuGroup = [];
            menuType = 1;
            this.createMenu();
        }
        else {
            progress[8].push(char);
        }
    }

    sendName() {
        var name = "%27" + progress[8].join("") + "%27";
        var url = "http://www.bakere.tech/addscore.php?name=" + name + "&score=0";

        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', url, true);
        xhttp.send();
    }
}