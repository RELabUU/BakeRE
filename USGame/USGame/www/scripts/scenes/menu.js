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
        txt_progress = this.add.text(
            window.innerWidth / 2,
            2 * window.innerHeight / 5,
            'Click to Play',
            {
                fontFamily: 'Dosis',
                fontSize: 24,
                fill: '#000000'
            }
        );
        txt_progress.setStroke('#FFFFFF', 12);
        txt_progress.setOrigin(0.5, 0.5);

        

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

                // Name input
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
                    item.destroy();
                });

                menuGroup = [];
                menuType = 2;

                this.createMenu();
            }
            else if (menuType === 2) {

                // Level selection
                var name = gameobject.list[1].text;
                var levels = [lvl0, lvl1, lvl2, lvl3, lvl4];

                for (var x = 1; x <= 5; x++) {
                    if (name.includes("Level " + x)) {
                        progress.currentLevel = levels[x];
                        break;
                    }
                    else if (x === 5) {
                        progress.currentLevel = levels[0];
                        break;
                    }
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
        var l;
        var w = window.innerWidth;
        var h = window.innerHeight;

        if (menuType === 1) {
            txt_progress.text = "Select your database";
            l = databases.length;
        }
        else if (menuType === 2) {
            txt_progress.text = "Pick a level";
            l = 5; 

            var sText = this.make.text(textconfigScore);
            sText.x = w / 40;
            sText.y = h / 20;
            sText.text = "Score: " + progress.pointsPerLevel.reduce(function (a, b) { return a + b; }, 0);
        }
        else {
            txt_progress.text = "Name: " + progress.player.join("");
            this.createTextMenu();
        }

        if (menuType === 1 || menuType === 2) {
            this.createButtons(l);
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
        var lvl1to2min;
        var lvl2to3min;
        var lvl3to4min;

        // The points threshold you get for completing a userstory in 25 seconds (out of 45)
        var timePerUserstory = 45;
        var timeToSucceed = 30;
        var b = 200 / Math.pow(timePerUserstory, 2);
        var c = 150 / Math.pow(timePerUserstory, 2);
        var x = Math.pow(timeToSucceed, 2);
        var splus = Math.round(200 - b * x);
        var smin = Math.round(150 - c * x);

        var nr1 = this.getNrOfUserstories(lvl1);
        var nr2 = this.getNrOfUserstories(lvl2);
        var nr3 = this.getNrOfUserstories(lvl3);

        var nr1min = Math.round(nr1 / 5);
        var nr2min = Math.round(nr2 / 5);
        var nr3min = Math.round(nr3 / 5);

        lvl1to2min = nr1min * smin;
        lvl2to3min = nr2min * smin;
        lvl3to4min = nr3min * smin;

        lvl1to2 = nr1 * splus - lvl1to2min;
        lvl2to3 = nr2 * splus + lvl1to2 - lvl2to3min;
        lvl3to4 = nr3 * splus + lvl2to3 - lvl3to4min;

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
                nr = nr + (Number(cont[i]['nr']) - Number(cont[i]['nrMistakes']));
            }
        }

        return nr;
    }

    createButtons(l) {
        var txt;
        var container;
        var ptsNeeded = this.pointsNextLevel();
        var points = 0;
        var totalPoints = 0;

        var w = window.innerWidth;
        var h = window.innerHeight;
        var squareSize = w / 6;

        for (var i = 0; i < l; i++) {
            var unlocked;
            points = ptsNeeded[i];
            totalPoints = progress.pointsPerLevel.reduce(function (a, b) { return a + b; }, 0);

            if (menuType === 2) {
                if (i === 0) {
                    unlocked = true;
                }
                else if (totalPoints >= points && progress.completedLevels[i - 1] === true) {
                    unlocked = true;
                }
                else {
                    unlocked = false;
                }
            }

            var g = this.add.graphics();

            if (menuType === 2) {
                if (unlocked === true) {
                    g.fillStyle(0xffffff, 1);
                }
                else {
                    g.fillStyle(0xa4a4a4, 1);
                }
            }
            else {
                g.fillStyle(0xf2f2f2, 1);
            }

            g.fillRoundedRect(0, 0, squareSize, squareSize, 12);

            g.lineStyle(2, 0x000000, 1);
            g.strokeRoundedRect(0, 0, squareSize, squareSize, 12);

            if (menuType === 1) {
                txt = databases[i]['Title'];
            }
            else if (menuType === 2 && i === 0) {
                txt = "Tutorial";
            }
            else if (menuType === 2) {
                if (unlocked === true) {
                    txt = [
                        "Level " + i,
                        "",
                        "Current points: " + progress.pointsPerLevel[i]
                    ];
                }
                else {
                    txt = [
                        "Level " + i,
                        "",
                        "Points needed: " + points
                    ];
                }
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
            container.add(g);
            container.add(t);
            menuGroup.push(container);
        }
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
            if (progress.player.length > 0) {
                progress.player.pop();
            } 
        }
        else if (char === "↷") {
            this.checkName();
        }
        else {
            progress.player.push(char);
        }
    }

    checkName() {
        var name = "";
        var n = progress.player.join("");
        var url = "http://www.bakere.tech/getname.php";

        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', url);
        xhttp.responseType = 'text';

        xhttp.onload = function () {
            name = xhttp.response;
            players = name.split("@");

            if (players.includes(n)) {
                txt_progress.text = "Name is already in use! Pick something else";
            }
            else {
                menuGroup.forEach(function (item) {
                    item.list[0].text = "";
                });
                
                this.sendName();

                menuGroup = [];
                menuType = 1;
                this.createMenu();
            }
        }.bind(this);

        xhttp.send();
    }

    sendName() {
        var timestr = "";
        var timestring = "";

        for (var j = 0; j <= 4; j++) {
            var times = progress.totalTime[j];
            for (var i = 1; i <= times.length; i++) {
                timestr = "&time" + j + i + "=" + times[i - 1];
                timestring = timestring + timestr;
            }
        }

        var name = "%27" + progress.player.join("") + "%27";
        var url = "http://www.bakere.tech/addscore.php?name=" + name + "&score=0" + timestring;

        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', url, true);
        xhttp.send();
    }
}