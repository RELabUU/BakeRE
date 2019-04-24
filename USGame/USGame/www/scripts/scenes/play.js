class Play extends Phaser.Scene {
  
    constructor() {
        super({ key: 'Play', active: false });
    }

    init() {

    }

    preload() {

    }

    create() {
        var background = this.add.image(window.innerWidth / 2, window.innerHeight / 4, 'background');
        background.setTint(0x36627b, 0x36627b, 0xf4ab2b, 0xf4ab2b);

        // Initialize sounds
        correctSound = this.sound.add('correct');
        wrongSound = this.sound.add('wrong');
        thudSound = this.sound.add('thud');
        thud2Sound = this.sound.add('thud2');
        thumpSound = this.sound.add('thump', { volume: 2.5 });
        thump2Sound = this.sound.add('thump2', { volume: 2.5 });
        dripSound = this.sound.add('drip', { volume: 0.4 });
        jingleSound = this.sound.add('jingle1');
        jingle2Sound = this.sound.add('jingle2');

        // Initialize menu backgrounds
        menuBG = this.add.graphics();
        orderBG = this.add.graphics();
        usBG = this.add.graphics();
        bg = this.add.graphics();

        // Create groups for creams (actions) & decorations (benefits)
        roles = this.physics.add.group();
        actions = this.physics.add.group();
        benefits = this.physics.add.group();

        // Save screenwidth and -height for easier readability
        var w = window.innerWidth;
        var h = window.innerHeight;

        this.createLevel(0);

        roleMenu = this.add.sprite(37 * w / 40, h / 6, 'cupcake').setScale(0.75).setDepth(3);
        actionMenu = this.add.sprite(37 * w / 40, 3 * h / 6 - h / 20, 'cream3').setScale(0.75).setDepth(3);
        benefitMenu = this.add.sprite(37 * w / 40, 5 * h / 6 - h / 10, 'deco3').setScale(0.75).setDepth(3);
        
        this.initializeAnimations();

        var children;
        var l;
        var i;

        // Switch between menu states; None = closed, Roles = roles, Actions = actions & Benefits = benefits
        roleMenu.on('pointerup', function (pointer, gameObject) {
            this.menuManager(roles, actions, benefits, roleMenu.width, roleMenu.height, w, h, "Roles");
        }, this);

        actionMenu.on('pointerup', function (pointer, gameObject) {
            this.menuManager(actions, roles, benefits, roleMenu.width, roleMenu.height, w, h, "Actions");
        }, this);

        benefitMenu.on('pointerup', function (pointer, gameObject) {
            this.menuManager(benefits, roles, actions, roleMenu.width, roleMenu.height, w, h, "Benefits");
        }, this);

        // Create the UI
        this.createUI(w, h, roleMenu, actionMenu, benefitMenu, roleMenu.width, roleMenu.height, uss);

        var initialX = 0;
        var initialY = 0;

        // Take care of the different types of textslides that could be on the screen (Introduction, Context & Debriefing)
        orderBG.on('pointerup', function (pointer, gameobject) {
            this.toggleContext();
        }, this);

        // #region Dropzone
        var zoneWidth = 3 * w / 7;
        var zoneHeight = 8 * h / 9 - h / 20;
        var zoneX = zoneWidth / 2 + w / 40;
        var zoneY = h / 2 - h / 80;

        var zone = this.add.zone(zoneX, zoneY, zoneWidth, zoneHeight).setRectangleDropZone(zoneWidth, zoneHeight);
        var graphics = this.add.graphics();
        graphics.fillStyle(0xFFFFFF);
        graphics.setDepth(0);
        graphics.setAlpha(0);
        graphics.fillRoundedRect(zone.x - zone.input.hitArea.width / 2, zone.y - zone.input.hitArea.height / 2 - h / 20, zone.input.hitArea.width, zone.input.hitArea.height, 45);
        this.tweens.add({
            targets: graphics,
            alpha: { value: 0.3, duration: 1500, ease: 'Power1' },
            yoyo: true,
            loop: -1
        });
        graphics.visible = false;
        // #endregion

        // #region Drag and Drop logic
        // The drag & drop logic
        this.input.on('dragstart', function (pointer, gameObject) {
            dragging = true;
            initialX = gameObject.x;
            initialY = gameObject.y;
        });
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        });
        this.input.on('dragenter', function (pointer, gameObject, dropZone) { graphics.visible = true; });
        this.input.on('dragleave', function (pointer, gameObject, dropZone) { graphics.visible = false; });
        this.input.on('drop', function (pointer, gameObject, dropZone) {
            graphics.visible = false;

            var key = gameObject.list[1].texture.key;
            if (key.includes('icon1')) {
                thumpSound.play();
                this.scene.dropManager(roleBuild, roles, rolesEmptied, gameObject, dropZone, 0);
            }
            else if (key.includes('icon2')) {
                dripSound.play();
                this.scene.dropManager(actionBuild, actions, actionsEmptied, gameObject, dropZone, 1);
            }
            else if (key.includes('icon3')) {
                thump2Sound.play();
                this.scene.dropManager(benefitBuild, benefits, benefitsEmptied, gameObject, dropZone, 2);
            }
            else {
                console.log("How did you get here");
            }
           
            gameObject.input.enabled = false;
        });
        this.input.on('dragend', function (pointer, gameObject, dropped) {
            if (!dropped) {
                dragging = false;
                gameObject.x = initialX;
                gameObject.y = initialY;
            }
        });

        // #endregion

        // #region Particle configs

        // The particle settings (code from "labs.phaser.io")
        particles = this.add.particles('flares');
        particles.setDepth(5);
        emitter = particles.createEmitter({
            frame: ['red', 'blue', 'green', 'yellow'],
            x: zone.x,
            y: zone.y,
            speed: 200,
            lifespan: 3000,
            on: false,
            maxParticles: 30,
            blendMode: 'ADD'
        });

        firework1 = particles.createEmitter({
            frame: ['red', 'blue', 'green', 'yellow'],
            x: window.innerWidth / 3,
            y: window.innerHeight / 3,
            speed: 200,
            lifespan: 1000,
            on: false,
            maxParticles: 15,
            blendMode: 'ADD'
        });

        firework2 = particles.createEmitter({
            frame: ['red', 'blue', 'green', 'yellow'],
            x: window.innerWidth / 2,
            y: 3 * window.innerHeight / 4,
            speed: 200,
            lifespan: 1000,
            on: false,
            maxParticles: 15,
            blendMode: 'ADD'
        });

        firework3 = particles.createEmitter({
            frame: ['red', 'blue', 'green', 'yellow'],
            x: 3 * window.innerWidth / 4,
            y: window.innerHeight / 2,
            speed: 200,
            lifespan: 1000,
            on: false,
            maxParticles: 15,
            blendMode: 'ADD'
        });

        // #endregion

        //#region Text

        titleText = this.make.text(textconfigTitle);
        titleText.x = window.innerWidth / 2;
        titleText.y = window.innerHeight / 2;
        titleText.setStroke('#FFFFFF', 16);
        titleText.setShadow(2, 2, '#333333', 2, true, false);
        titleText.setOrigin(0.5, 0.5);
        titleText.visible = false;

        scoreText = this.make.text(textconfigScore);
        scoreText.x = w / 40;
        scoreText.y = h / 20;
        scoreText.text = "Score: " + score;

        timeText = this.make.text(textconfigScore);
        timeText.x = 7 * w / 24;
        timeText.y = h / 20;
        timeText.text = "Time: " + countDown;

        //#endregion

        this.add.image(zoneX, zoneY, 'plate').setScale(1.4);

        skipDatabaseSelect = true;
        console.log('Play');
    }

    update() {
        if (roleText !== formerR || actionText !== formerA || benefitText !== formerB) {
            formerR = roleText;
            formerA = actionText;
            formerB = benefitText;

            this.setUserStoryText();
            this.checkGameOver();
        }

        if (orderBG.visible === false) {
            if (progress[0] === lvl0) {
                this.checkTutorialTasks();
                if (this.startTime !== undefined) {
                    this.updateTimer();
                }
            }
            else {
                this.updateTimer();
            }
        }
    }

    // --------------------------------------------------------------------------- //

    // #region Timers

    startTimer() {
        this.startTime = new Date();
        this.totalTime = uss.length * 45;
        this.timeElapsed = 0;
    }

    updateTimer() {
        var currentTime = new Date();
        var timeDifference = this.startTime.getTime() - currentTime.getTime();

        //Time elapsed in seconds
        this.timeElapsed = Math.abs(timeDifference / 1000);
        time = Math.round(this.timeElapsed);
        countDown = 45 - time;
        if (countDown < 0) {
            countDown = 0;
        }
        timeText.text = "Time: " + countDown;
    }

    //#endregion

    // --------------------------------------------------------------------------- //

    // #region Level creation and epic/userstory/mistake management

    createLevel(epNr) {
        var order;

        this.pickEpics(progress[0]);
        order = eps[epNr];
        this.pickUserStories(order);

        if (progress[0] === lvl0) {
            this.tutorialUI();
        }

        if (progress[0] === lvl4) {
            orderText = "As a " + order['Role'] + " I want to " + order['Action'] + " so that " + order['Benefit'];
        }
        else {
            orderText = order['Epic Text'];
        }
        
        console.log(progress[0]['Name']);
    }

    pickEpics(level) {
        var epNr = level['Epics'];
        var keys = level['Keys'];
        var lvlContent = level['Content'];
        var epicgroup = [];
        var amount;

        if (level === lvl4) {
            var ep = accTests['Acceptance Tests'][0]['Epic Title'];
            var usc = userstories['Userstories'];
            var usc2 = [];
            for (var l = 0; l < usc.length; l++) {
                if (usc[l]['Epic Title'] === ep) {
                    usc2.push(usc[l]);
                }
            }
            epicgroup = usc2;
            amount = epicgroup.length;
        }
        else {
            epicgroup = epics['Epics List'];
            amount = epics['Number'];
        }

        if (keys === "" && level !== lvl4) {
            var nrs = this.generateRandomNumbers(0, amount - 1, epNr);
            for (var i = 0; i < epNr; i++) {
                eps.push(epicgroup[nrs[i]]);
            }
        }
        else if (keys !== "" && level !== lvl4)  {
            for (var j = 1; j <= epNr; j++) {
                var curr = lvlContent[j];
                var key = curr['usKey'];
                eps.push(epicgroup[key - 1]);
            }
        }
        else {
            eps = epicgroup;
        }
    }

    // Choose the userstories currently visible within the game
    pickUserStories(startEp) {
        var usContent = [];
        var usNr;
        var screenNr;

        if (progress[0] === lvl4) {
            for (var k = 0; k < accTests['Number']; k++) {
                if (startEp["Role"] === accTests['Acceptance Tests'][k]["Role"] && startEp["Action"] === accTests['Acceptance Tests'][k]["Action"] && startEp["Benefit"] === accTests['Acceptance Tests'][k]["Benefit"]) {
                    usContent.push(accTests['Acceptance Tests'][k]);
                }
            }
            usNr = 3;
        }
        else {
            var usc = userstories['Userstories'];
            var usc2 = [];
            for (var l = 0; l < usc.length; l++) {
                if (usc[l]['Epic Title'] === startEp['Epic Title']) {
                    usc2.push(usc[l]);
                }
            }
            usContent = usc2;
            usNr = 5;
        }

        var level = progress[0];
        var cont = level['Content'];
        var curr = cont[progress[1]];
        var n = curr['nr'];

        // No more than n userstories should be shown on screen, n is never more than 5
        if (usNr >= n) {
            screenNr = n;
        }
        else {
            screenNr = usNr;
        }

        // Pick a predefined number of userstories to show (and scramble them)
        var nrs = this.generateRandomNumbers(0, usContent.length - 1, screenNr);
        for (var i = 0; i < screenNr; i++) {
            uss.push(usContent[nrs[i]]);
        }

        progress[2] = uss;
        progress[5][0] = this.generateRandomNumbers(1, 5, uss.length);
        progress[5][1] = this.generateRandomNumbers(1, 5, uss.length);
        progress[5][2] = this.generateRandomNumbers(1, 5, uss.length);
    }

    pickMistakes() {
        var level = progress[0];

        var cont = level['Content'];
        var curr = cont[progress[1]];

        var n = curr['nrMistakes'];
        var typeOfM = curr['typeMistakes'];
        var types = typeOfM.split("&");

        var msnrs = [];
        var mistTuple = [];

        // Pick some userstories to replace by bad userstories
        var nrs = this.generateRandomNumbers(0, uss.length - 1, n);

        // Decide on the types of mistakes to use
        var randomNrs = this.generateRandomNumbers(0, types.length - 1, n);
        for (var j = 0; j < n; j++) {
            msnrs.push(types[randomNrs[j]]);
        }

        // Decide on the mistakes to use
        for (var k = 0; k < n; k++) {
            var typeContent = mistakes[msnrs[k]];
            var epic = uss[0]['Epic Title'];
            var toUse = [];

            mistTuple[0] = msnrs[k];

            for (var l = 0; l < typeContent.length; l++) {
                if (typeContent[l]['Epic Title'] === epic) {
                    toUse.push(typeContent[l]);
                }
            }

            if (toUse.length === 1) {
                mss.push(toUse[0]);
                mistTuple[1] = toUse[0];
                tups.push(mistTuple);
            }
            else {
                var r = this.generateRandomNumbers(0, 1, 1);
                mss.push(toUse[r[0]]);
                mistTuple[1] = toUse[r[0]];
                tups.push(mistTuple);
            }
        }

        // Put the mistakes in place of the correct userstories
        for (var a = 0; a < nrs.length; a++) {
            uss[nrs[a]] = mss[a];
        }

        progress[2] = uss;
        progress[3] = mss;
    }

    // #endregion

    // --------------------------------------------------------------------------- //

    dropManager(build, group, empty, gameObject, dropZone, nr) {
        var children;

        if (typeof build !== 'undefined') {
            switch (build) {
                case roleBuild:
                    roles.add(building[nr]);
                    strsr.push(building[nr].list[2].text);
                    roleBuild.destroy();
                    break;
                case actionBuild:
                    actions.add(building[nr]);
                    strsa.push(building[nr].list[2].text);
                    actionBuild.destroy();
                    break;
                case benefitBuild:
                    benefits.add(building[nr]);
                    strsb.push(building[nr].list[2].text);
                    benefitBuild.destroy();
                    break;
                default:
                    break;
            }
        }

        children = group.getChildren();
        group.remove(gameObject);

        children.forEach(function (c) {
            c.disableInteractive();
            c.visible = false;
        });

        var key = gameObject.list[1].texture.key; 
        var counter = 0;
        var loopDone = false;

        switch (nr) {
            case 0:
                roleText = gameObject.list[2].text;
                strsr.forEach(function (s) {
                    if (loopDone === false) {
                        if (s === gameObject.list[2].text) {
                            strsr.splice(counter, 1);
                            loopDone = true;
                        }
                    }
                    counter++;
                });

                switch (key) {
                    case 'icon1-1':
                        roleBuild = this.add.sprite(dropZone.x, dropZone.y, 'cake1-01').play('cake1').setScale(1.4).setDepth(1);
                        break;
                    case 'icon1-2':
                        roleBuild = this.add.sprite(dropZone.x, dropZone.y, 'cake2-01').play('cake2').setScale(1.4).setDepth(1);
                        break;
                    case 'icon1-3':
                        roleBuild = this.add.sprite(dropZone.x, dropZone.y, 'cake3-01').play('cake3').setScale(1.4).setDepth(1);
                        break;
                    case 'icon1-4':
                        roleBuild = this.add.sprite(dropZone.x, dropZone.y, 'cake4-01').play('cake4').setScale(1.4).setDepth(1);
                        break;
                    case 'icon1-5':
                        roleBuild = this.add.sprite(dropZone.x, dropZone.y, 'cake5-01').play('cake5').setScale(1.4).setDepth(1);
                        break;
                    default:
                        break;
                }

                if (children.length === 0) {
                    rolesEmptied = true;
                }

                break;
            case 1:
                actionText = gameObject.list[2].text;
                strsa.forEach(function (s) {
                    if (loopDone === false) {
                        if (s === gameObject.list[2].text) {
                            strsa.splice(counter, 1);
                            loopDone = true;
                        }
                    }
                    counter++;
                });

                switch (key) {
                    case 'icon2-1':
                        actionBuild = this.add.sprite(dropZone.x, dropZone.y, 'icing1-01').play('icing1').setScale(1.4).setDepth(2);
                        break;
                    case 'icon2-2':
                        actionBuild = this.add.sprite(dropZone.x, dropZone.y, 'icing2-01').play('icing2').setScale(1.4).setDepth(2);
                        break;
                    case 'icon2-3':
                        actionBuild = this.add.sprite(dropZone.x, dropZone.y, 'icing3-01').play('icing3').setScale(1.4).setDepth(2);
                        break;
                    case 'icon2-4':
                        actionBuild = this.add.sprite(dropZone.x, dropZone.y, 'icing4-01').play('icing4').setScale(1.4).setDepth(2);
                        break;
                    case 'icon2-5':
                        actionBuild = this.add.sprite(dropZone.x, dropZone.y, 'icing5-01').play('icing5').setScale(1.4).setDepth(2);
                        break;
                    default:
                        break;
                }

                if (children.length === 0) {
                    actionsEmptied = true;
                }
                break;
            case 2:
                benefitText = gameObject.list[2].text;
                strsb.forEach(function (s) {
                    if (loopDone === false) {
                        if (s === gameObject.list[2].text) {
                            strsb.splice(counter, 1);
                            loopDone = true;
                        }
                    }
                    counter++;
                });

                switch (key) {
                    case 'icon3-1':
                        benefitBuild = this.add.sprite(dropZone.x, dropZone.y, 'deco1-01').play('deco1').setScale(1.4).setDepth(3);
                        break;
                    case 'icon3-2':
                        benefitBuild = this.add.sprite(dropZone.x, dropZone.y, 'deco2-01').play('deco2').setScale(1.4).setDepth(3);
                        break;
                    case 'icon3-3':
                        benefitBuild = this.add.sprite(dropZone.x, dropZone.y, 'deco3-01').play('deco3').setScale(1.4).setDepth(3);
                        break;
                    case 'icon3-4':
                        benefitBuild = this.add.sprite(dropZone.x, dropZone.y, 'deco4-01').play('deco4').setScale(1.4).setDepth(3);
                        break;
                    case 'icon3-5':
                        benefitBuild = this.add.sprite(dropZone.x, dropZone.y, 'deco5-01').play('deco5').setScale(1.4).setDepth(3);
                        break;
                    default:
                        break;
                }
                
                if (children.length === 0) {
                    benefitsEmptied = true;
                }
                break;
            default:
                break;
        }

        this.textsFalse();
        this.createMenuText();

        this.updateMenu(group, 70, 70, window.innerWidth, window.innerHeight);
        this.textsTrue();

        building[nr] = gameObject;

        gameObject.list[0].visible = false;
        gameObject.list[1].visible = false;
        gameObject.list[2].visible = false;
    }

    // --------------------------------------------------------------------------- //

    // #region Debriefing

    debriefing() {
        // Contains: 
        // - Score per level (score)
        // - Total score of game (progress[4])
        // - Time spent on level (progress[6])
        // - Tip (mistakesMade)
        // - Top (?)

        orderBG.visible = true;
        bg.visible = true;

        var sc = score;
        var total = 0;
        var t = progress[6];
        var mistakeText = "";

        for (var i = 0; i < progress[4].length; i++) {
            total = total + progress[4][i];
        }

        if (mistakesMade.length === 0) {
            mistakeText = "You have made 0 mistakes in this level! Well done!";
        }
        else {
            var tip = this.gatherMistakes();
            var tipType = tip[0];
            var tipText = tip[1];
            mistakeText = "You made the most mistakes in the category " + tipType + ". " + tipText;
        }

        var content = [
            "Your score for this level is " + score + ". This brings your total score to " + total + ".",
            "Your time for this level is " + t + ".",
            "",
            mistakeText
        ];

        debrief = this.make.text(textconfigMenuOrder);
        debrief.x = window.innerWidth / 2;
        debrief.y = window.innerHeight / 2;
        debrief.setOrigin(0.5, 0.5);
        debrief.setDepth(105);
        debrief.text = content;
        debrief.visible = true;

        this.time.delayedCall(4500, function () {
            orderBG.setInteractive(new Phaser.Geom.Rectangle(0, 0, window.innerWidth, window.innerHeight), Phaser.Geom.Rectangle.Contains);
        }, [], this);
    }

    gatherMistakes() {
        var types = [];
        
        for (var i = 0; i < mistakesMade.length; i++) {
            types.push(mistakesMade[i][0]);
        }

        types.sort();

        var a = [];
        var indexa = 0;
        var indexb = 1;

        for (var j = 0; j < types.length; j++) {
            if (j === 0) {
                a[indexa] = types[j];
                a[indexb] = 1;
            }
            else if (types[j] === a[indexa]) {
                a[indexb] = a[indexb] + 1;
            }
            else {
                indexa = indexa + 2;
                indexb = indexb + 2;
                a[indexa] = types[j];
                a[indexb] = 1;
            }
        }

        var first = "";
        var biggest = 0;

        for (var k = 0; k < a.length; k++) {
            if (k % 2 !== 0) {
                if (a[k] > biggest) {
                    first = a[k - 1];
                    biggest = a[k];
                }
            }
        }

        var tipText = "";

        if (first !== "") {
            tipText = tips[first];
        }

        var tup = [];
        tup[0] = first;
        tup[1] = tipText;

        return tup;
    }

    // #endregion

    // --------------------------------------------------------------------------- //

    //#region Helper functions

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    generateRandomNumbers(lwbound, upbound, amount) {
        var options = [];

        for (var j = lwbound; j <= upbound; j++) {
            options.push(j);
        }

        var n;
        var r = [];
        for (n = 1; n <= amount; n++) {
            var i = Math.floor(Math.random() * options.length);
            r.push(options[i]);
            options.splice(i, 1);
        }

        return r;
    }

    //#endregion

    // --------------------------------------------------------------------------- //

    // #region Menu updating

    menuManager(group, othergroup1, othergroup2, spriteWidth, spriteHeight, w, h, name) {
        var l;
        var i;
        var children;

        // Switch between menu states
        switch (menuVisible) {
            case "None": // If the current menu state is closed
                menuVisible = name;
                menuBG.visible = true;
                this.updateMenu(group, spriteWidth, spriteHeight, w, h);
                this.textsTrue();
                break;
            default: // If the current menu state already has something open
                if (name === menuVisible) {
                    menuVisible = "None";
                    menuBG.visible = false;
                    children = group.getChildren();
                    l = group.getChildren().length;

                    for (i = 0; i < l; i++) {
                        children[i].disableInteractive();
                        children[i].visible = false;
                    }

                    this.createMenuText();
                    this.textsFalse();
                }
                else {
                    menuVisible = name;
                    if (othergroup1.getChildren().length !== null) {
                        children = othergroup1.getChildren();
                        l = othergroup1.getChildren().length;

                        for (i = 0; i < l; i++) {
                            children[i].disableInteractive();
                            children[i].visible = false;
                        }

                        this.createMenuText();
                        this.textsFalse();
                    }

                    if (othergroup2.getChildren().length !== null) {
                        children = othergroup2.getChildren();
                        l = othergroup2.getChildren().length;

                        for (i = 0; i < l; i++) {
                            children[i].disableInteractive();
                            children[i].visible = false;
                        }

                        this.createMenuText();
                        this.textsFalse();
                    }

                    this.updateMenu(group, spriteWidth, spriteHeight, w, h);
                    this.textsTrue();
                }
                break;
        }
    }

    updateMenu(group, spriteWidth, spriteHeight, w, h) {
        var l = 0;
        var str = '';
        var strs = [];
        var us = [];
        var children = group.getChildren();
        var checkEmpty;

        switch (group) {
            case roles:
                strs = strsr;
                checkEmpty = rolesEmptied;
                if (progress[0] === lvl4) {
                    str = 'Given';
                }
                else {
                    str = 'Role';
                }
                break;
            case actions:
                strs = strsa;
                checkEmpty = actionsEmptied;
                if (progress[0] === lvl4) {
                    str = 'When';
                }
                else {
                    str = 'Action';
                }
                break;
            case benefits:
                strs = strsb;
                checkEmpty = benefitsEmptied;
                if (progress[0] === lvl4) {
                    str = 'Then';
                }
                else {
                    str = 'Benefit';
                }
                break;
            default:
                break;
        }

        if (checkEmpty === false) {
            if (children.length < uss.length && children.length !== 0) {
                for (var i = 0; i < children.length; i++) {
                    us.push(children[i].list);
                }
            }
            else {
                us = uss;
            }
        }
        else {
            us = [];
        }

        if (strs.length === 0) {
            us.forEach(function (u) {
                if (u[0] === undefined) {
                    strs.push(u[str]);
                }
                else if (u.length === 1) {
                    strs.push(u[0].text);
                }
                else {
                    strs.push(u[1].text);
                }
            });
            this.shuffleArray(strs);
        }

        mText1.text = strs[0];
        mText2.text = strs[1];
        mText3.text = strs[2];
        mText4.text = strs[3];
        mText5.text = strs[4];

        l = strs.length;
              

        this.initializeCreams(group, uss, w, h, spriteWidth, spriteHeight, l);
    }

    createMenuText() {
        var menu = [];

        mText1 = this.make.text(textconfigMenu);
        mText2 = this.make.text(textconfigMenu);
        mText3 = this.make.text(textconfigMenu);
        mText4 = this.make.text(textconfigMenu);
        mText5 = this.make.text(textconfigMenu);

        menu.push(mText1);
        menu.push(mText2);
        menu.push(mText3);
        menu.push(mText4);
        menu.push(mText5);

        var i = 1;

        menu.forEach(function (m) {
            m.x = 0;
            m.y = 0;
            m.setDepth(1);
            m.visible = false;
            i++;
        });
    }

    enableMenuButtons() {
        roleMenu.setInteractive();
        actionMenu.setInteractive();
        benefitMenu.setInteractive();
    }

    disableMenuButtons() {
        roleMenu.disableInteractive();
        actionMenu.disableInteractive();
        benefitMenu.disableInteractive();
    }

    textsTrue() {
        mText1.visible = true;
        mText2.visible = true;
        mText3.visible = true;
        mText4.visible = true;
        mText5.visible = true;
    }

    textsFalse() {
        mText1.visible = false;
        mText2.visible = false;
        mText3.visible = false;
        mText4.visible = false;
        mText5.visible = false;
    }

    // #endregion

    // --------------------------------------------------------------------------- //

    // #region UI

    // Initialize all UI elements in order

    createUI(w, h, sprite1, sprite2, sprite3, spriteWidth, spriteHeight, us) {
        this.createCircleBG(w, h, sprite1);
        this.createCircleBG(w, h, sprite2);
        this.createCircleBG(w, h, sprite3);

        this.createMenuBG(w, h, spriteWidth, us);
        this.createOrderBG(w, h, orderText);
        this.createUserStoryLine();
        this.updateProgressBar(progress[0]);
    }

    createCircleBG(w, h, sprite) {
        var circle = this.add.graphics();
        circle.fillStyle(0xFFFFFF, 1);
        circle.fillCircle(sprite.x, sprite.y, sprite.width / 2);
        circle.setDepth(2);
    }

    createMenuBG(w, h, spriteWidth, spriteHeight, us) {
        menuBG.fillStyle(0xFFFFFF, 1);

        var menuWidth = 3 * w / 7;
        var menuHeight = 8 * h / 9 - h / 20;
        var menuX = 15 * w / 20;
        var menuY = h / 2 - h / 80;
        menuBG.fillRoundedRect(menuX - menuWidth / 2 - spriteWidth / 2, menuY - menuHeight / 2 - h / 20, menuWidth, menuHeight, 45);

        this.createMenuText();

        menuBG.visible = false;
    }

    createOrderBG(w, h, orderText) {
        bg.fillStyle(0x000000, 0.3);
        orderBG.fillStyle(0xFFFFFF, 1);

        bg.fillRect(0, 0, w, h);
        bg.setDepth(99);

        var orderWidth = 9 * w / 10;
        var orderHeight = 9 * h / 10;
        var orderX = w / 2;
        var orderY = h / 2;

        orderBG.fillRoundedRect(orderX - orderWidth / 2, orderY - orderHeight / 2, orderWidth, orderHeight, 32);
        orderBG.setDepth(100);

        oText = this.make.text(textconfigMenuOrder);
        oText.setOrigin(0.5, 0.5);
        oText.x = orderX;
        oText.y = orderY;
        oText.text = orderText;
        oText.setDepth(101);
        oText.visible = false;

        conText = this.make.text(textconfigMenuHeader);
        conText.setOrigin(0.5, 0.5);
        conText.x = window.innerWidth / 2;
        conText.y = window.innerHeight / 4;
        conText.text = "Context";
        conText.setDepth(101);
        conText.visible = false;

        this.loadIntroductions();
        this.toggleIntroduction(intr[0]);
    }

    updateProgressBar(level) {
        var pc = progressCircles.length;
        var pr = progressRects.length;

        for (var c = 0; c < pc; c++) {
            progressCircles[c].destroy();
        }
        for (var r = 0; r < pr; r++) {
            progressRects[r].destroy();
        }

        progressCircles = [];
        progressRects = [];

        var w = window.innerWidth;
        var h = window.innerHeight;
        var height = 3 * h / 5;
        var distance = height / Number(level['Epics']);
        var offset = h / 5;

        var circle;
        var rect;
        var rct;

        var nrInBatch;
        var mistInBatch;

        // Progress bar (inner) --> how many do you need to complete the batch?
        if (progress[1] <= level['Epics']) {
            nrInBatch = level['Content'][progress[1]]['nr'];
            mistInBatch = level['Content'][progress[1]]['nrMistakes'];
        }
        else {
            nrInBatch = level['Content'][progress[1] - 1]['nr'];
            mistInBatch = level['Content'][progress[1] - 1]['nrMistakes'];
        }

        if (mistInBatch === "") {
            mistInBatch = 0;
        }
        else {
            mistInBatch = Number(mistInBatch);
        }

        var ul = nrInBatch - mistInBatch;
        var us = ul - uss.length + mistInBatch;
        var dist = distance / ul;
        console.log('Userstories in batch: ' + us + '/' + ul);

        for (var j = 0; j < Number(level['Epics']); j++) {
            for (var k = 0; k < ul; k++) {
                rect = this.add.graphics();
                
                if (j > Number(level['Epics']) - progress[1]) {
                    rect.fillStyle(0x36627b, 1); // blue: 0x36627b
                }
                else if (j === Number(level['Epics']) - progress[1]) {
                    if (k >= ul - us) {
                        rect.fillStyle(0x36627b, 1);
                    }
                    else {
                        rect.fillStyle(0xffffff, 1);
                    }
                }
                else {
                    rect.fillStyle(0xffffff, 1);
                }

                var index = j * ul + k;

                rect.fillRect(w / 40 + 3, index * dist + offset, 6, dist);
                progressRects.push(rect);
            }
        }

        // Progress bar (outer) --> batch (epic) 2/6 (how many batches in a level?)
        console.log('Batches in level: ' + progress[1] + '/' + level['Epics']);

        for (var i = 0; i <= Number(level['Epics']); i++) { 
            circle = this.add.graphics();
            if (i > Number(level['Epics']) - progress[1]) {
                circle.fillStyle(0xf4ab2b, 1); // orange: 0xf4ab2b
            }
            else {
                circle.fillStyle(0xFFFFFF, 1);  
            }
            circle.fillCircle(w / 40 + 6, i * distance + offset, 6);
            progressCircles.push(circle);
        }
    }

    setUserStoryText() {
        if (progress[0] === lvl4) {
            usText.text = 'Given ' + roleText + ' When ' + actionText + ' Then ' + benefitText + '.';
        }
        else {
            usText.text = 'As a ' + roleText + ' I want to ' + actionText + ' so that ' + benefitText + '.';
        }
    }

    toggleContext() {
        if (introText.visible === true) {
            // Either skip to the next intro slide or close the introduction and start the game
            if (introText.text === intr[intr.length - 1]) {
                introText.visible = false;
                this.openContext();
            }
            else {
                for (var i = 0; i < intr.length; i++) {
                    if (intr[i] === introText.text) {
                        introText.text = intr[i + 1];
                        if (introText.text === "#1" || introText.text === "#2" || introText.text === "#3" || introText.text === "#4" || introText.text === "#5" || introText.text === "#6") {
                            tutorialProgress = introText.text;
                            this.tutorialManager();
                        }
                        break;
                    }
                }
            }
        }
        else if (debrief !== undefined && orderBG.visible === true) {
            // When closing the debriefing, return to level select.
            if (debrief.visible === true) {
                this.closeContext();
                debrief.visible = false;

                this.nextLevel();
            }
            else {
                // Close the context slide
                this.closeContext();
                this.startTimer();
                this.enableMenuButtons();

                orderBG.disableInteractive();
            }
        }
        else {
            if (orderBG.visible === true) {
                // Close the context slide
                this.closeContext();
                this.startTimer();
                this.enableMenuButtons();

                orderBG.disableInteractive();
            }
            else {
                // Open the context slide
                this.openContext();
            }
        }
    }

    toggleIntroduction(txt) {
        jingle2Sound.play();

        orderBG.visible = true;
        bg.visible = true;

        introText = this.make.text(textconfigMenuOrder);
        introText.x = window.innerWidth / 2;
        introText.y = window.innerHeight / 2;
        introText.setOrigin(0.5, 0.5);
        introText.setDepth(105);

        introText.text = txt;

        this.time.delayedCall(2000, function () {
            orderBG.setInteractive(new Phaser.Geom.Rectangle(0, 0, window.innerWidth, window.innerHeight), Phaser.Geom.Rectangle.Contains);
        }, [], this);
    }

    loadIntroductions() {
        intr = intros[progress[0]['Name']][0].split("@");
    }

    closeContext() {
        orderBG.visible = false;
        bg.visible = false;
        conText.visible = false;
        oText.visible = false;
        introText.visible = false;
    }

    openContext() {
        orderBG.visible = true;
        bg.visible = true;
        conText.visible = true;
        oText.visible = true;

        jingleSound.play();

        this.time.delayedCall(4500, function () {
            orderBG.setInteractive(new Phaser.Geom.Rectangle(0, 0, window.innerWidth, window.innerHeight), Phaser.Geom.Rectangle.Contains);
        }, [], this);
    }

    createUserStoryLine() {
        usBG.fillStyle(0xFFFFFF, 1);

        var w = window.innerWidth;
        var h = window.innerHeight;

        var usWidth = 19 * w / 20;
        var usHeight = h / 8;
        var usX = w / 2;
        var usY = 9 * h / 10;

        usBG.fillRoundedRect(usX - usWidth / 2, usY - usHeight / 4, usWidth, usHeight, 12);

        usText = this.make.text(textconfigMenuUserStory);
        usText.x = w / 20;
        usText.y = usY - h / 80;
        usText.setDepth(1);

        this.setUserStoryText();
    }

    initializeCreams(creams, uss, w, h, spriteWidth, spriteHeight, nr) {
        creams.clear();

        var menuWidth = 3 * w / 7;
        var menuHeight = 8 * h / 9 - h / 20;
        var menuX = 15 * w / 20;
        var menuY = h / 2;

        var x;
        var y;
        var indices = [];

        var strs = [];
        var str = '';
        var icon = '';
        var n;

        switch (menuVisible) {
            case 'Roles':
                strs = strsr;
                if (progress[0] === lvl4) {
                    str = 'Given';
                }
                else {
                    str = 'Role';
                }
                icon = 'icon1-';
                n = 0;
                break;
            case 'Actions':
                strs = strsa;
                if (progress[0] === lvl4) {
                    str = 'When';
                }
                else {
                    str = 'Action';
                }
                icon = 'icon2-';
                n = 1;
                break;
            case 'Benefits':
                strs = strsb;
                if (progress[0] === lvl4) {
                    str = 'Then';
                }
                else {
                    str = 'Benefit';
                }
                icon = 'icon3-';
                n = 2;
                break;
            default:
                break;
        }

        for (x = 0; x < strs.length; x++) {
            for (y = 0; y < uss.length; y++) {
                if (strs[x] === uss[y][str]) {
                    indices.push(y);
                    break;
                }
            }
        }

        for (var i = 0; i < nr; i++) {
            var cream; 
            var container;
            var cont;

            cream = this.add.sprite(spriteWidth / 2, 11 * spriteHeight / 32, icon + progress[5][n][indices[i]]).setScale(0.25);

            cont = this.add.graphics();
            cont.fillStyle(0xf2f2f2);
            cont.fillRoundedRect(spriteWidth / 8, 0, 2 * w / 5, h / 7, 25);

            container = this.add.container(menuX - menuWidth / 2 - spriteWidth / 2, menuY - menuHeight / 2 - menuHeight / 20 + i * h / 6);
            container.setInteractive(new Phaser.Geom.Rectangle(0, 0, spriteWidth * 3, spriteHeight / 2), Phaser.Geom.Rectangle.Contains);

            container.add(cont);
            container.add(cream);

            switch (i) {
                case 0:
                    mText1.x = spriteWidth;
                    mText1.y = 0;
                    container.add(mText1);
                    break;
                case 1:
                    mText2.x = spriteWidth;
                    mText2.y = 0;
                    container.add(mText2);
                    break;
                case 2:
                    mText3.x = spriteWidth;
                    mText3.y = 0;
                    container.add(mText3);
                    break;
                case 3:
                    mText4.x = spriteWidth;
                    mText4.y = 0;
                    container.add(mText4);
                    break;
                case 4:
                    mText5.x = spriteWidth;
                    mText5.y = 0;
                    container.add(mText5);
                    break;
                default:
                    break;
            }
            
            this.input.setDraggable(container);
            creams.add(container);
        }
    }

    // #endregion

    // --------------------------------------------------------------------------- //

    // #region Batch/Level/Game-Over check
    checkGameOver() {
        var counter;
        var donezo = false;
        var mistakeFound = false;
        var loopDone = false;

        for (var i = 0; i < uss.length; i++) {
            if (progress[0] === lvl4) {
                // Check if the created userstory exists
                if (roleText === uss[i]["Given"] && actionText === uss[i]["When"] && benefitText === uss[i]["Then"]) {
                    // Userstory exists
                    donezo = true;
                    this.userStoryExists(i);
                    return;
                }
            }
            else {
                // Check if the created userstory exists
                if (roleText === uss[i]["Role"] && actionText === uss[i]["Action"] && benefitText === uss[i]["Benefit"]) {

                    // If we're in a level with mistakes, also check if the found userstory is in the mistake list
                    if (progress[3].length !== 0) {
                        for (var j = 0; j < progress[3].length; j++) {
                            if (roleText === progress[3][j]["Role"] && actionText === progress[3][j]["Action"] && benefitText === progress[3][j]["Benefit"]) {

                                // Userstory exists, but a mistake has been made
                                mistakeFound = true;
                                for (var y = 0; y < tups.length; y++) {
                                    if (tups[y][1]["Role"] === roleText && tups[y][1]["Action"] === actionText && tups[y][1]["Benefit"]) {

                                        // Add to the list of mistakes made for the debriefing at the end of the level
                                        mistakesMade.push(tups[y]);
                                    }
                                }
                                this.userStoryDoesNotExist();
                                return;
                            }
                            else {
                                // Userstory exists
                                donezo = true;
                                this.userStoryExists(i);
                                return;
                            }
                        }
                    }
                    else {
                        // Userstory exists
                        donezo = true;
                        this.userStoryExists(i);
                        return;
                    }

                }
            }
        }
        if (donezo === false && mistakeFound === false) {
            if (roleText !== '<???>' && actionText !== '<???>' && benefitText !== '<???>') {
                // Userstory does not exist
                var tup = [];
                var us = {
                    Role: roleText,
                    Action: actionText,
                    Benefit: benefitText
                };
                tup[0] = "Well Formed";
                tup[1] = us;
                mistakesMade.push(tup);
                this.userStoryDoesNotExist();
            }
        }
    }

    putStuffBack(correct) {
        // Put everything back
        roleText = "<???>";
        actionText = "<???>";
        benefitText = "<???>";
        formerR = "<???>";
        formerA = "<???>";
        formerB = "<???>";

        roleBuild.destroy();
        actionBuild.destroy();
        benefitBuild.destroy();

        roleBuild = undefined;
        actionBuild = undefined;
        benefitBuild = undefined;

        rolesEmptied = false;
        actionsEmptied = false;
        benefitsEmptied = false;

        building[0] = "";
        building[1] = "";
        building[2] = "";

        if (correct === true) {
            this.calculateScore(true);
        }
        else {
            this.calculateScore(false);
        }

        this.startTimer();
    }

    emptyMenu() {
        menuVisible = "None";
        menuBG.visible = false;

        var r = roles.getChildren();
        var a = actions.getChildren();
        var b = benefits.getChildren();

        if (r.length !== 0) {
            var rl = r.length;
            for (var i = 0; i < rl; i++) {
                r[0].disableInteractive();
                r[0].destroy();
            }
        }
        if (a.length !== 0) {
            var al = a.length;
            for (var j = 0; j < al; j++) {
                a[0].disableInteractive();
                a[0].destroy();
            }
        }
        if (b.length !== 0) {
            var bl = b.length;
            for (var k = 0; k < bl; k++) {
                b[0].disableInteractive();
                b[0].destroy();
            }
        }
        this.createMenuText();
        this.textsFalse();
    }

    calculateScore(correct) {
        var timePerUserstory = 45;
        var c = 200 / Math.pow(timePerUserstory, 2);
        var x = Math.pow(time, 2);
        var s = Math.round(200 - c * x);

        progress[6] = progress[6] + time;

        if (s < 0) {
            s = 0;
        }

        if (correct === true) {
            score = score + s;
        }
        else {
            score = score - s;
            if (score < 0) {
                score = 0;
            }
        }

        scoreText.text = "Score: " + score;
    }

    userStoryExists(index) {
        this.emptyMenu();

        uss.splice(index, 1);
        progress[5][0].splice(index, 1);
        progress[5][1].splice(index, 1);
        progress[5][2].splice(index, 1);
        this.updateProgressBar(progress[0]);

        // Congratulate player
        emitter.on = true;
        correctSound.play();
        console.log("Valid userstory! :)");

        this.disableMenuButtons();

        var level = progress[0];
        var lvlNr;
        switch (level) {
            case lvl0:
                lvlNr = 0;
                break;
            case lvl1:
                lvlNr = 1;
                break;
            case lvl2:
                lvlNr = 2;
                break;
            case lvl3:
                lvlNr = 3;
                break;
            case lvl4:
                lvlNr = 4;
                break;
            default:
                break;
        }

        this.time.delayedCall(1500, function () {
            this.putStuffBack(true);

            if (uss.length - mss.length === 0) {
                uss = [];
                var ep = progress[1];
                progress[1] = ep + 1;
                var epic = eps[progress[1] - 1];

                if (progress[1] > level['Epics']) {
                    if (lvlNr !== 0) {
                        progress[4][lvlNr] = score;
                    }
                    progress[7][lvlNr] = true;
                    
                    this.fireworks();

                    var pc = progressCircles.length;
                    var pr = progressRects.length;

                    for (var c = 0; c < pc; c++) {
                        progressCircles[c].destroy();
                    }
                    for (var r = 0; r < pr; r++) {
                        progressRects[r].destroy();
                    }

                    progressCircles = [];
                    progressRects = [];
                }
                else {
                    this.pickUserStories(epic);
                    if (mss !== []) {
                        mss = [];
                        strsr = [];
                        strsa = [];
                        strsb = [];
                        this.pickMistakes();
                    }
                    this.updateProgressBar(progress[0]);

                    if (progress[0] === lvl4) {
                        orderText = "As a " + epic['Role'] + " I want to " + epic['Action'] + " so that " + epic['Benefit'];
                    }
                    else {
                        orderText = epic['Epic Text'];
                    }

                    oText.text = orderText;
                    this.toggleContext();
                }
            }
            else {
                this.enableMenuButtons();
            }
            this.setUserStoryText();
            emitter.on = false;
        }, [], this);
    }

    userStoryDoesNotExist() {
        // Tell player they made a mistake
        wrongSound.play();
        console.log("Not a valid userstory :(");

        this.emptyMenu();

        this.disableMenuButtons();

        this.time.delayedCall(1500, function () {
            strsr.push(roleText);
            strsa.push(actionText);
            strsb.push(benefitText);

            this.putStuffBack(false);
            this.setUserStoryText();

            this.enableMenuButtons();
        }, [], this);
    }

    nextLevel() {
        progress[6] = 0;
        score = 0;
        scoreText.text = "Score: " + score;

        eps = [];
        uss = [];
        mss = [];
        
        //this.createLevel(0);
        //this.toggleIntroduction();
        //this.updateProgressBar(progress[0]);
        //oText.text = orderText;

        this.scene.start('Menu');
    }

    fireworks() {
        strsr = [];
        strsa = [];
        strsb = [];

        progress[1] = 1;

        jingle2Sound.play();
        firework1.on = true;
        this.time.delayedCall(800, function () {
            firework2.on = true;
            this.time.delayedCall(800, function () {
                firework3.on = true;
            }, [], this);
        }, [], this);

        titleText.text = "Completed level!";
        titleText.visible = true;

        this.time.delayedCall(5000, function () {
            titleText.visible = false;
            firework1.on = false;
            firework2.on = false;
            firework3.on = false;
            this.debriefing();
            //this.nextLevel();
            // or
            //this.restartGame();
        }, [], this);
    }

    emptyLevel() {
        roleText = "<???>";
        actionText = "<???>";
        benefitText = "<???>";
        formerR = "<???>";
        formerA = "<???>";
        formerB = "<???>";

        roles.clear();
        actions.clear();
        benefits.clear();

        roleMenu.destroy();
        actionMenu.destroy();
        benefitMenu.destroy();

        eps = [];
        uss = [];
        mss = [];

        menuVisible = 0;
        menuBG.destroy();
        orderBG.destroy();
        usBG.destroy();
        bg.destroy();

        // Menu text
        mTitle = "";
        mText1 = "";
        mText2 = "";
        mText3 = "";
        mText4 = "";
        mText5 = "";
        orderText = "";
    }

    restartGame() {
        this.emptyLevel();

        // Set the progress array to the start conditions; tutorial at epic 1. 
        progress[0] = lvl0;
        progress[1] = 1;
        progress[2] = [];
        progress[3] = [];
        progress[4] = 0;
        progress[5] = [];
        progress[6] = 0;

        building = [];

        this.scene.restart();
    }

    // #endregion

    // --------------------------------------------------------------------------- //

    // #region Tutorial

    tutorialManager() {
        this.disableMenuButtons();
        this.closeFlashingSigns();

        switch (tutorialProgress) {
            case "#1":
                //progressbar
                //currentTask = wait or tap screen
                progressFlash.visible = true;
                break;
            case "#2":
                //menu
                menuFlash.visible = true;
                break;
            case "#3":
                //rolemenu
                //currentTask = wait or tap screen
                menuButton1Flash.visible = true;
                roleMenu.setInteractive();
                break;
            case "#4":
                //drag cake to middle
                //currentTask = open role menu, drag role to middle
                this.enableMenuButtons();
                break;
            case "#5":
                //userstoryline
                //currentTask = wait or tap screen
                userstoryFlash.visible = true;
                break;
            case "#6":
                //points and time
                //currentTask = wait or tap screen
                scoreTimeFlash.visible = true;
                break;
            default:
                //tutorial is done, no more intro, move on to the context screen
                break;
        }

        //update manages the checktutorialtasks as long as context is closed.
        this.closeContext();
    }

    checkTutorialTasks() {
        // if currentTask === completed, 
        // this.toggleintroduction again, at the correct part in the tutorial
        for (var i = 0; i < intr.length; i++) {
            if (intr[i] === introText.text) {
                this.toggleIntroduction(intr[i + 1]);
                break;
            }
        }
    }

    tutorialUI() {
        var w = window.innerWidth;
        var h = window.innerHeight;

        scoreTimeFlash = this.add.graphics();
        scoreTimeFlash.fillStyle(0xf4ab2b);
        scoreTimeFlash.setDepth(150);
        scoreTimeFlash.setAlpha(0);
        scoreTimeFlash.setBlendMode(Phaser.BlendModes.ADD);
        scoreTimeFlash.fillRoundedRect(w / 80, h / 20, 11 * w / 24, h / 10, 12);

        progressFlash = this.add.graphics();
        progressFlash.fillStyle(0xf4ab2b);
        progressFlash.setDepth(150);
        progressFlash.setAlpha(0);
        progressFlash.setBlendMode(Phaser.BlendModes.ADD);
        progressFlash.fillRoundedRect(w / 80, h / 5 - h / 40, w / 20, 3 * h / 5 + h / 20, 12);

        userstoryFlash = this.add.graphics();
        userstoryFlash.fillStyle(0xf4ab2b);
        userstoryFlash.setDepth(150);
        userstoryFlash.setAlpha(0);
        userstoryFlash.setBlendMode(Phaser.BlendModes.ADD);
        userstoryFlash.fillRoundedRect(w / 80, 7 * h / 8, 39 * w / 40, h / 8, 12);

        menuFlash = this.add.graphics();
        menuFlash.fillStyle(0xf4ab2b);
        menuFlash.setDepth(150);
        menuFlash.setAlpha(0);
        menuFlash.setBlendMode(Phaser.BlendModes.ADD);
        menuFlash.fillRoundedRect(17 * w / 20, h / 20, 3 * w / 20, 4 * h / 5, 12);
        
        menuButton1Flash = this.add.graphics();
        menuButton1Flash.fillStyle(0xf4ab2b);
        menuButton1Flash.setDepth(150);
        menuButton1Flash.setAlpha(0);
        menuButton1Flash.setBlendMode(Phaser.BlendModes.ADD);
        menuButton1Flash.fillRoundedRect(17 * w / 20, h / 20, 3 * w / 20, 3 * h / 10, 12);

        menuButton2Flash = this.add.graphics();
        menuButton2Flash.fillStyle(0xf4ab2b);
        menuButton2Flash.setDepth(150);
        menuButton2Flash.setAlpha(0);
        menuButton2Flash.setBlendMode(Phaser.BlendModes.ADD);
        menuButton2Flash.fillRoundedRect(17 * w / 20, h / 20 + h / 5, 3 * w / 20, 3 * h / 10, 12);

        menuButton3Flash = this.add.graphics();
        menuButton3Flash.fillStyle(0xf4ab2b);
        menuButton3Flash.setDepth(150);
        menuButton3Flash.setAlpha(0);
        menuButton3Flash.setBlendMode(Phaser.BlendModes.ADD);
        menuButton3Flash.fillRoundedRect(17 * w / 20, h / 20 + 2 * h / 5, 3 * w / 20, 3 * h / 10, 12);

        this.tweens.add({
            targets: [scoreTimeFlash, progressFlash, userstoryFlash, menuFlash, menuButton1Flash, menuButton2Flash, menuButton3Flash],
            alpha: { value: 0.5, duration: 1500, ease: 'Power1' },
            yoyo: true,
            loop: -1
        });

        this.closeFlashingSigns();
    }

    closeFlashingSigns() {

        scoreTimeFlash.visible = false;
        progressFlash.visible = false;
        userstoryFlash.visible = false;
        menuFlash.visible = false;
        menuButton1Flash.visible = false;
        menuButton2Flash.visible = false;
        menuButton3Flash.visible = false;

    }

    // #endregion

    // --------------------------------------------------------------------------- //

    initializeAnimations() {
        this.anims.create({
            key: 'cake1',
            frames: [
                { key: 'cake1-01' },
                { key: 'cake1-02' },
                { key: 'cake1-03' },
                { key: 'cake1-04' },
                { key: 'cake1-05' },
                { key: 'cake1-06' },
                { key: 'cake1-07' },
                { key: 'cake1-08' },
                { key: 'cake1-09' },
                { key: 'cake1-10' },
                { key: 'cake1-11' },
                { key: 'cake1-12' },
                { key: 'cake1-13' },
                { key: 'cake1-14' },
                { key: 'cake1-15' },
                { key: 'cake1-16', duration: 50 }
            ],
            frameRate: 32,
            repeat: 0
        });

        this.anims.create({
            key: 'cake2',
            frames: [
                { key: 'cake2-01' },
                { key: 'cake2-02' },
                { key: 'cake2-03' },
                { key: 'cake2-04' },
                { key: 'cake2-05' },
                { key: 'cake2-06' },
                { key: 'cake2-07' },
                { key: 'cake2-08' },
                { key: 'cake2-09' },
                { key: 'cake2-10' },
                { key: 'cake2-11' },
                { key: 'cake2-12' },
                { key: 'cake2-13' },
                { key: 'cake2-14' },
                { key: 'cake2-15' },
                { key: 'cake2-16', duration: 50 }
            ],
            frameRate: 32,
            repeat: 0
        });

        this.anims.create({
            key: 'cake3',
            frames: [
                { key: 'cake3-01' },
                { key: 'cake3-02' },
                { key: 'cake3-03' },
                { key: 'cake3-04' },
                { key: 'cake3-05' },
                { key: 'cake3-06' },
                { key: 'cake3-07' },
                { key: 'cake3-08' },
                { key: 'cake3-09' },
                { key: 'cake3-10' },
                { key: 'cake3-11' },
                { key: 'cake3-12' },
                { key: 'cake3-13' },
                { key: 'cake3-14' },
                { key: 'cake3-15' },
                { key: 'cake3-16', duration: 50 }
            ],
            frameRate: 32,
            repeat: 0
        });

        this.anims.create({
            key: 'cake4',
            frames: [
                { key: 'cake4-01' },
                { key: 'cake4-02' },
                { key: 'cake4-03' },
                { key: 'cake4-04' },
                { key: 'cake4-05' },
                { key: 'cake4-06' },
                { key: 'cake4-07' },
                { key: 'cake4-08' },
                { key: 'cake4-09' },
                { key: 'cake4-10' },
                { key: 'cake4-11' },
                { key: 'cake4-12' },
                { key: 'cake4-13' },
                { key: 'cake4-14' },
                { key: 'cake4-15' },
                { key: 'cake4-16', duration: 50 }
            ],
            frameRate: 32,
            repeat: 0
        });

        this.anims.create({
            key: 'cake5',
            frames: [
                { key: 'cake5-01' },
                { key: 'cake5-02' },
                { key: 'cake5-03' },
                { key: 'cake5-04' },
                { key: 'cake5-05' },
                { key: 'cake5-06' },
                { key: 'cake5-07' },
                { key: 'cake5-08' },
                { key: 'cake5-09' },
                { key: 'cake5-10' },
                { key: 'cake5-11' },
                { key: 'cake5-12' },
                { key: 'cake5-13' },
                { key: 'cake5-14' },
                { key: 'cake5-15' },
                { key: 'cake5-16', duration: 50 }
            ],
            frameRate: 32,
            repeat: 0
        });

        this.anims.create({
            key: 'icing1',
            frames: [
                { key: 'icing1-01' },
                { key: 'icing1-02' },
                { key: 'icing1-03' },
                { key: 'icing1-04' },
                { key: 'icing1-05' },
                { key: 'icing1-06' },
                { key: 'icing1-07' },
                { key: 'icing1-08' },
                { key: 'icing1-09' },
                { key: 'icing1-10' },
                { key: 'icing1-11' },
                { key: 'icing1-12' },
                { key: 'icing1-13' },
                { key: 'icing1-14' },
                { key: 'icing1-15' },
                { key: 'icing1-16', duration: 50 }
            ],
            frameRate: 32,
            repeat: 0
        });

        this.anims.create({
            key: 'icing2',
            frames: [
                { key: 'icing2-01' },
                { key: 'icing2-02' },
                { key: 'icing2-03' },
                { key: 'icing2-04' },
                { key: 'icing2-05' },
                { key: 'icing2-06' },
                { key: 'icing2-07' },
                { key: 'icing2-08' },
                { key: 'icing2-09' },
                { key: 'icing2-10' },
                { key: 'icing2-11' },
                { key: 'icing2-12' },
                { key: 'icing2-13' },
                { key: 'icing2-14' },
                { key: 'icing2-15' },
                { key: 'icing2-16', duration: 50 }
            ],
            frameRate: 32,
            repeat: 0
        });

        this.anims.create({
            key: 'icing3',
            frames: [
                { key: 'icing3-01' },
                { key: 'icing3-02' },
                { key: 'icing3-03' },
                { key: 'icing3-04' },
                { key: 'icing3-05' },
                { key: 'icing3-06' },
                { key: 'icing3-07' },
                { key: 'icing3-08' },
                { key: 'icing3-09' },
                { key: 'icing3-10' },
                { key: 'icing3-11' },
                { key: 'icing3-12' },
                { key: 'icing3-13' },
                { key: 'icing3-14' },
                { key: 'icing3-15' },
                { key: 'icing3-16', duration: 50 }
            ],
            frameRate: 32,
            repeat: 0
        });

        this.anims.create({
            key: 'icing4',
            frames: [
                { key: 'icing4-01' },
                { key: 'icing4-02' },
                { key: 'icing4-03' },
                { key: 'icing4-04' },
                { key: 'icing4-05' },
                { key: 'icing4-06' },
                { key: 'icing4-07' },
                { key: 'icing4-08' },
                { key: 'icing4-09' },
                { key: 'icing4-10' },
                { key: 'icing4-11' },
                { key: 'icing4-12' },
                { key: 'icing4-13' },
                { key: 'icing4-14' },
                { key: 'icing4-15' },
                { key: 'icing4-16', duration: 50 }
            ],
            frameRate: 32,
            repeat: 0
        });

        this.anims.create({
            key: 'icing5',
            frames: [
                { key: 'icing5-01' },
                { key: 'icing5-02' },
                { key: 'icing5-03' },
                { key: 'icing5-04' },
                { key: 'icing5-05' },
                { key: 'icing5-06' },
                { key: 'icing5-07' },
                { key: 'icing5-08' },
                { key: 'icing5-09' },
                { key: 'icing5-10' },
                { key: 'icing5-11' },
                { key: 'icing5-12' },
                { key: 'icing5-13' },
                { key: 'icing5-14' },
                { key: 'icing5-15' },
                { key: 'icing5-16', duration: 50 }
            ],
            frameRate: 32,
            repeat: 0
        });

        this.anims.create({
            key: 'deco1',
            frames: [
                { key: 'deco1-01' },
                { key: 'deco1-02' },
                { key: 'deco1-03' },
                { key: 'deco1-04' },
                { key: 'deco1-05' },
                { key: 'deco1-06' },
                { key: 'deco1-07' },
                { key: 'deco1-08' },
                { key: 'deco1-09' },
                { key: 'deco1-10' },
                { key: 'deco1-11' },
                { key: 'deco1-12', duration: 50 }
            ],
            frameRate: 32,
            repeat: 0
        });
        this.anims.create({
            key: 'deco2',
            frames: [
                { key: 'deco2-01' },
                { key: 'deco2-02' },
                { key: 'deco2-03' },
                { key: 'deco2-04' },
                { key: 'deco2-05' },
                { key: 'deco2-06' },
                { key: 'deco2-07' },
                { key: 'deco2-08' },
                { key: 'deco2-09' },
                { key: 'deco2-10' },
                { key: 'deco2-11' },
                { key: 'deco2-12', duration: 50 }
            ],
            frameRate: 32,
            repeat: 0
        });
        this.anims.create({
            key: 'deco3',
            frames: [
                { key: 'deco3-01' },
                { key: 'deco3-02' },
                { key: 'deco3-03' },
                { key: 'deco3-04' },
                { key: 'deco3-05' },
                { key: 'deco3-06' },
                { key: 'deco3-07' },
                { key: 'deco3-08' },
                { key: 'deco3-09' },
                { key: 'deco3-10' },
                { key: 'deco3-11' },
                { key: 'deco3-12', duration: 50 }
            ],
            frameRate: 32,
            repeat: 0
        });
        this.anims.create({
            key: 'deco4',
            frames: [
                { key: 'deco4-01' },
                { key: 'deco4-02' },
                { key: 'deco4-03' },
                { key: 'deco4-04' },
                { key: 'deco4-05' },
                { key: 'deco4-06' },
                { key: 'deco4-07' },
                { key: 'deco4-08' },
                { key: 'deco4-09' },
                { key: 'deco4-10' },
                { key: 'deco4-11' },
                { key: 'deco4-12', duration: 50 }
            ],
            frameRate: 32,
            repeat: 0
        });

        this.anims.create({
            key: 'deco5',
            frames: [
                { key: 'deco5-01' },
                { key: 'deco5-02' },
                { key: 'deco5-03' },
                { key: 'deco5-04' },
                { key: 'deco5-05' },
                { key: 'deco5-06' },
                { key: 'deco5-07' },
                { key: 'deco5-08' },
                { key: 'deco5-09' },
                { key: 'deco5-10' },
                { key: 'deco5-11' },
                { key: 'deco5-12', duration: 50 }
            ],
            frameRate: 32,
            repeat: 0
        });
    }
}