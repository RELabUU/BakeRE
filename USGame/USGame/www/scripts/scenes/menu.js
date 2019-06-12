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
            menuType = "level";
            menuGroup = [];
            this.privacyStatement();
            this.createMenu();
        }
        else {
            if (menuType === "privacy") {
                this.privacyStatement();

                this.input.on('pointerdown', function (pointer) {
                    if (menuType === "privacy") {
                        this.handlePrivacyStatement();
                    }
                    this.createMenu();
                }, this);
            }
        }

        this.input.on('gameobjectdown', function (pointer, gameobject) {
            if (menuType === "privacy") {
                this.handlePrivacyStatement();
            }
            /*else if (menuType === "participant") {
                // Name input
                var n = gameobject.list[0].text;
                this.addLetters(n);
            }*/
            else if (menuType === "name") {
                // Name input
                var char = gameobject.list[0].text;
                this.addLetters(char);
            }
            else if (menuType === "database") {

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
                menuType = "level";

                this.createMenu();
            }
            else if (menuType === "level") {
                if (gameobject === menBG || gameobject.type === "Text") {
                    this.handlePrivacyStatement();
                }
                else {
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

        if (menuType === "database") {
            txt_progress.text = "Select your database";
            l = databases.length;
        }
        else if (menuType === "level") {
            this.createCreditMenu();
            txt_progress.text = "Pick a level";
            l = 5; 

            var sText = this.make.text(textconfigScore);
            sText.x = w / 40;
            sText.y = h / 20;
            sText.text = "Score: " + progress.pointsPerLevel.reduce(function (a, b) { return a + b; }, 0);
        }
        else if (menuType === "name") {
            txt_progress.text = "Name: " + progress.player.join("");
            this.createTextMenu();
        }
        /*else if (menuType === "participant") {
            txt_progress.text = "Participant ID: " + progress.id.join("");
            this.createNumberMenu();
        }*/

        if (menuType === "database" || menuType === "level") {
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

            if (menuType === "level") {
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

            if (menuType === "level") {
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

            if (menuType === "database") {
                txt = databases[i]['Title'];
            }
            else if (menuType === "level" && i === 0) {
                txt = "Tutorial";
            }
            else if (menuType === "level") {
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
            if (menuType === "database" || unlocked === true) {
                container.setInteractive(new Phaser.Geom.Rectangle(0, 0, squareSize, squareSize), Phaser.Geom.Rectangle.Contains);
            }
            container.add(g);
            container.add(t);
            menuGroup.push(container);
        }
    }

    createNumberMenu() {
        var w = window.innerWidth;
        var h = window.innerHeight;

        var textButton;
        var container;
        var nrs = [];
        var numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
        var buttons = ['↶', '↷'];
        
        for (var i = 0; i < numbers.length; i++) {
            textButton = this.make.text(textconfigMenuHeader);
            textButton.x = 0;
            textButton.y = 0;
            textButton.setDepth(10);
            textButton.text = numbers[i];
            textButton.setStroke('#FFFFFF', 12);

            container = this.add.container((i + 1) * w / 12, 4 * h / 6);
            container.setInteractive(new Phaser.Geom.Rectangle(0, 0, textButton.width, textButton.height), Phaser.Geom.Rectangle.Contains);
            container.add(textButton);

            menuGroup.push(container);
        }

        for (var j = 0; j < buttons.length; j++) {
            textButton = this.make.text(textconfigMenuHeader);
            textButton.x = 0;
            textButton.y = 0;
            textButton.setDepth(10);
            textButton.text = buttons[j];
            textButton.setStroke('#FFFFFF', 12);

            container = this.add.container((j + 9) * w / 12, 5 * h / 6);
            container.setInteractive(new Phaser.Geom.Rectangle(0, 0, textButton.width, textButton.height), Phaser.Geom.Rectangle.Contains);
            container.add(textButton);

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
        if (menuType === "name") {
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
        /*else if (menuType === "participant") {
            if (char === "↶") {
                if (progress.id.length > 0) {
                    progress.id.pop();
                }
            }
            else if (char === "↷") {
                this.checkID();
            }
            else {
                progress.id.push(char);
            }
        }*/
    }

    privacyStatement() {
        var w = window.innerWidth;
        var h = window.innerHeight;

        mbg = this.add.graphics();
        mbg.fillStyle(0x000000, 0.3);

        menBG = this.add.graphics();
        menBG.fillStyle(0xFFFFFF, 1);

        mbg.fillRect(0, 0, w, h);
        mbg.setDepth(99);

        var orderWidth = 9 * w / 10;
        var orderHeight = 9 * h / 10;
        var orderX = w / 2;
        var orderY = h / 2;

        menBG.fillRoundedRect(orderX - orderWidth / 2, orderY - orderHeight / 2, orderWidth, orderHeight, 32);
        menBG.setDepth(100);

        header = this.make.text(textconfigMenuHeader);
        header.setOrigin(0.5, 0);
        header.x = w / 2;
        header.y = h / 7;
        header.text = "Privacy Statement";
        header.setDepth(101);

        mText = this.make.text(textconfigMenuOrder2);
        mText.setOrigin(0.5, 0.5);
        mText.x = orderX;
        mText.y = orderY;
        mText.text = [
            "By playing this game, I consent to the anonymous collection of my progress data and learning analytics for research purposes.",
            "",
            "I understand that this data includes scores, times and survey data, and can not be traced back to me in any way, shape or form."
        ];
        mText.setDepth(101);

        menBG.setInteractive(new Phaser.Geom.Rectangle(0, 0, w, h), Phaser.Geom.Rectangle.Contains);

        mbg.visible = false;
        menBG.visible = false;
        mText.visible = false;
        header.visible = false;
    }

    handlePrivacyStatement() {
        if (menuOpen === false) {
            if (creditsShown === true) {
                menuOpen = true;

                mbg.visible = true;
                menBG.visible = true;
                mText.visible = true;
                mText.text = page1;
                header.visible = true;
                header.text = "Credits";
            }
            else {
                menuOpen = true;

                mbg.visible = true;
                menBG.visible = true;
                mText.visible = true;
                header.visible = true;
            }
        }
        else {
            if (creditsShown === true) {
                if (currentPage === 1) {
                    mText.text = page2;
                    currentPage = 2;
                }
                else {
                    menuOpen = false;
                    currentPage = 1;

                    mbg.visible = false;
                    menBG.visible = false;
                    mText.visible = false;
                    header.visible = false;
                }
            }
            else {
                menuOpen = false;

                mbg.visible = false;
                menBG.visible = false;
                mText.visible = false;
                header.visible = false;

                //menuType = "participant";
                menuType = "name";
                creditsShown = true;
            }
        }
    }

    createCreditMenu() {
        var creditText;

        var w = window.innerWidth;
        var h = window.innerHeight;

        page1 = [
            "Coding and Assets: Merle Delen",
            "Fonts: Dosis (Google webfont)",
            "Menu Buttons: Platformer Art - Candy (www.kenney.nl)",
            "Particle Effects: Phaser 3 (www.phaser.io/phaser3)",
            "Audio assets: see next page (www.freesound.org)"
        ];

        page2 = [
            "Gotitem.mp3: Kastenfrosch",
            "successfull.mp3: Kastenfrosch",
            "Correct.wav: Eponn",
            "harppu2.wav: dreamoron",
            "Drip2.wav: Neotone",
            "Thump 1.wav: TicTacShutUp",
            "Thump 3.wav: TicTacShutUp"
        ];

        creditText = this.make.text(textconfigScore);
        creditText.x = 3 * w / 4;
        creditText.y = h / 20;
        creditText.setDepth(10);
        creditText.text = "Credits";
        
        creditText.setInteractive(new Phaser.Geom.Rectangle(0, 0, creditText.width, creditText.height), Phaser.Geom.Rectangle.Contains);
        creditText.on('pointerup', function (pointer) {
            this.handlePrivacyStatement();
        }, this);
    }

    checkName() {
        var name = "";
        var n = progress.player.join("");
        var players = [];
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
                menuType = "database";
                this.createMenu();
            }
        }.bind(this);

        xhttp.send();
    }

    /*checkID() {
        var id = "";
        var ids = [];
        var i = progress.id.join("");
        var url = "http://www.bakere.tech/getid.php";

        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', url);
        xhttp.responseType = 'text';

        xhttp.onload = function () {
            id = xhttp.response;
            ids = id.split("@");

            if (ids.includes(i)) {
                txt_progress.text = "Participant ID is already in use!";
            }
            else if (progress.id.length !== 2) {
                txt_progress.text = "Participant ID should be two digits long!";
            }
            else {
                menuGroup.forEach(function (item) {
                    item.list[0].text = "";
                });

                this.sendName();

                menuGroup = [];
                menuType = "name";
                this.createMenu();
            }
        }.bind(this);

        xhttp.send();
    }*/

    sendName() {
        var scorestr = "";
        var scorestring = "";

        for (var k = 1; k <= progress.pointsPerLevel.length; k++) {
            scorestr = "&score" + k + "=" + progress.pointsPerLevel[k - 1];
            scorestring = scorestring + scorestr;
        }

        var timestr = "";
        var timestring = "";

        for (var j = 0; j <= 4; j++) {
            var times = progress.totalTime[j];
            for (var i = 1; i <= times.length; i++) {
                timestr = "&time" + j + i + "=" + times[i - 1];
                timestring = timestring + timestr;
            }
        }

        //var id = progress.id.join("");
        var name = "%27" + progress.player.join("") + "%27";
        var url = "http://www.bakere.tech/addscore.php?uniqueID=" /*+ id */ + "&name=" + name + "&score=0" + scorestring + timestring;

        var xhttp = new XMLHttpRequest();
        xhttp.open('GET', url, true);
        xhttp.send();
    }
}