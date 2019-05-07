class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload', active: false });
    }

    init() {

    }

    preload() {
        // Show the loading progress
        this.createLoadingBar();

        // Load the databases and level information
        this.load.json('db1', 'assets/json/database.json');

        this.load.json('lvl0', 'assets/json/levels/lvl0.json');
        this.load.json('lvl1', 'assets/json/levels/lvl1.json');
        this.load.json('lvl2', 'assets/json/levels/lvl2.json');
        this.load.json('lvl3', 'assets/json/levels/lvl3.json');
        this.load.json('lvl4', 'assets/json/levels/lvl4.json');
        this.load.json('lvlF', 'assets/json/levels/lvlF.json');

        // Load the texts (introductions, tips, etc.)
        this.load.json('texts', 'assets/json/texts.json');

        // #region Cake sprites

        // Load the cake sprites
        this.load.image('cake1-01', 'assets/images/cake/cake1-01 (Aangepast).png');
        this.load.image('cake1-02', 'assets/images/cake/cake1-02 (Aangepast).png');
        this.load.image('cake1-03', 'assets/images/cake/cake1-03 (Aangepast).png');
        this.load.image('cake1-04', 'assets/images/cake/cake1-04 (Aangepast).png');
        this.load.image('cake1-05', 'assets/images/cake/cake1-05 (Aangepast).png');
        this.load.image('cake1-06', 'assets/images/cake/cake1-06 (Aangepast).png');
        this.load.image('cake1-07', 'assets/images/cake/cake1-07 (Aangepast).png');
        this.load.image('cake1-08', 'assets/images/cake/cake1-08 (Aangepast).png');
        this.load.image('cake1-09', 'assets/images/cake/cake1-09 (Aangepast).png');
        this.load.image('cake1-10', 'assets/images/cake/cake1-10 (Aangepast).png');
        this.load.image('cake1-11', 'assets/images/cake/cake1-11 (Aangepast).png');
        this.load.image('cake1-12', 'assets/images/cake/cake1-12 (Aangepast).png');
        this.load.image('cake1-13', 'assets/images/cake/cake1-13 (Aangepast).png');
        this.load.image('cake1-14', 'assets/images/cake/cake1-14 (Aangepast).png');
        this.load.image('cake1-15', 'assets/images/cake/cake1-15 (Aangepast).png');
        this.load.image('cake1-16', 'assets/images/cake/cake1-16 (Aangepast).png');

        this.load.image('cake2-01', 'assets/images/cake/cake2-01 (Aangepast).png');
        this.load.image('cake2-02', 'assets/images/cake/cake2-02 (Aangepast).png');
        this.load.image('cake2-03', 'assets/images/cake/cake2-03 (Aangepast).png');
        this.load.image('cake2-04', 'assets/images/cake/cake2-04 (Aangepast).png');
        this.load.image('cake2-05', 'assets/images/cake/cake2-05 (Aangepast).png');
        this.load.image('cake2-06', 'assets/images/cake/cake2-06 (Aangepast).png');
        this.load.image('cake2-07', 'assets/images/cake/cake2-07 (Aangepast).png');
        this.load.image('cake2-08', 'assets/images/cake/cake2-08 (Aangepast).png');
        this.load.image('cake2-09', 'assets/images/cake/cake2-09 (Aangepast).png');
        this.load.image('cake2-10', 'assets/images/cake/cake2-10 (Aangepast).png');
        this.load.image('cake2-11', 'assets/images/cake/cake2-11 (Aangepast).png');
        this.load.image('cake2-12', 'assets/images/cake/cake2-12 (Aangepast).png');
        this.load.image('cake2-13', 'assets/images/cake/cake2-13 (Aangepast).png');
        this.load.image('cake2-14', 'assets/images/cake/cake2-14 (Aangepast).png');
        this.load.image('cake2-15', 'assets/images/cake/cake2-15 (Aangepast).png');
        this.load.image('cake2-16', 'assets/images/cake/cake2-16 (Aangepast).png');

        this.load.image('cake3-01', 'assets/images/cake/cake3-01 (Aangepast).png');
        this.load.image('cake3-02', 'assets/images/cake/cake3-02 (Aangepast).png');
        this.load.image('cake3-03', 'assets/images/cake/cake3-03 (Aangepast).png');
        this.load.image('cake3-04', 'assets/images/cake/cake3-04 (Aangepast).png');
        this.load.image('cake3-05', 'assets/images/cake/cake3-05 (Aangepast).png');
        this.load.image('cake3-06', 'assets/images/cake/cake3-06 (Aangepast).png');
        this.load.image('cake3-07', 'assets/images/cake/cake3-07 (Aangepast).png');
        this.load.image('cake3-08', 'assets/images/cake/cake3-08 (Aangepast).png');
        this.load.image('cake3-09', 'assets/images/cake/cake3-09 (Aangepast).png');
        this.load.image('cake3-10', 'assets/images/cake/cake3-10 (Aangepast).png');
        this.load.image('cake3-11', 'assets/images/cake/cake3-11 (Aangepast).png');
        this.load.image('cake3-12', 'assets/images/cake/cake3-12 (Aangepast).png');
        this.load.image('cake3-13', 'assets/images/cake/cake3-13 (Aangepast).png');
        this.load.image('cake3-14', 'assets/images/cake/cake3-14 (Aangepast).png');
        this.load.image('cake3-15', 'assets/images/cake/cake3-15 (Aangepast).png');
        this.load.image('cake3-16', 'assets/images/cake/cake3-16 (Aangepast).png');

        this.load.image('cake4-01', 'assets/images/cake/cake4-01 (Aangepast).png');
        this.load.image('cake4-02', 'assets/images/cake/cake4-02 (Aangepast).png');
        this.load.image('cake4-03', 'assets/images/cake/cake4-03 (Aangepast).png');
        this.load.image('cake4-04', 'assets/images/cake/cake4-04 (Aangepast).png');
        this.load.image('cake4-05', 'assets/images/cake/cake4-05 (Aangepast).png');
        this.load.image('cake4-06', 'assets/images/cake/cake4-06 (Aangepast).png');
        this.load.image('cake4-07', 'assets/images/cake/cake4-07 (Aangepast).png');
        this.load.image('cake4-08', 'assets/images/cake/cake4-08 (Aangepast).png');
        this.load.image('cake4-09', 'assets/images/cake/cake4-09 (Aangepast).png');
        this.load.image('cake4-10', 'assets/images/cake/cake4-10 (Aangepast).png');
        this.load.image('cake4-11', 'assets/images/cake/cake4-11 (Aangepast).png');
        this.load.image('cake4-12', 'assets/images/cake/cake4-12 (Aangepast).png');
        this.load.image('cake4-13', 'assets/images/cake/cake4-13 (Aangepast).png');
        this.load.image('cake4-14', 'assets/images/cake/cake4-14 (Aangepast).png');
        this.load.image('cake4-15', 'assets/images/cake/cake4-15 (Aangepast).png');
        this.load.image('cake4-16', 'assets/images/cake/cake4-16 (Aangepast).png');

        this.load.image('cake5-01', 'assets/images/cake/cake5-01 (Aangepast).png');
        this.load.image('cake5-02', 'assets/images/cake/cake5-02 (Aangepast).png');
        this.load.image('cake5-03', 'assets/images/cake/cake5-03 (Aangepast).png');
        this.load.image('cake5-04', 'assets/images/cake/cake5-04 (Aangepast).png');
        this.load.image('cake5-05', 'assets/images/cake/cake5-05 (Aangepast).png');
        this.load.image('cake5-06', 'assets/images/cake/cake5-06 (Aangepast).png');
        this.load.image('cake5-07', 'assets/images/cake/cake5-07 (Aangepast).png');
        this.load.image('cake5-08', 'assets/images/cake/cake5-08 (Aangepast).png');
        this.load.image('cake5-09', 'assets/images/cake/cake5-09 (Aangepast).png');
        this.load.image('cake5-10', 'assets/images/cake/cake5-10 (Aangepast).png');
        this.load.image('cake5-11', 'assets/images/cake/cake5-11 (Aangepast).png');
        this.load.image('cake5-12', 'assets/images/cake/cake5-12 (Aangepast).png');
        this.load.image('cake5-13', 'assets/images/cake/cake5-13 (Aangepast).png');
        this.load.image('cake5-14', 'assets/images/cake/cake5-14 (Aangepast).png');
        this.load.image('cake5-15', 'assets/images/cake/cake5-15 (Aangepast).png');
        this.load.image('cake5-16', 'assets/images/cake/cake5-16 (Aangepast).png');

        // #endregion

        // #region Cream sprites

        // Load the cream sprites
        this.load.image('icing1-01', 'assets/images/cream/icing1-01 (Aangepast).png');
        this.load.image('icing1-02', 'assets/images/cream/icing1-02 (Aangepast).png');
        this.load.image('icing1-03', 'assets/images/cream/icing1-03 (Aangepast).png');
        this.load.image('icing1-04', 'assets/images/cream/icing1-04 (Aangepast).png');
        this.load.image('icing1-05', 'assets/images/cream/icing1-05 (Aangepast).png');
        this.load.image('icing1-06', 'assets/images/cream/icing1-06 (Aangepast).png');
        this.load.image('icing1-07', 'assets/images/cream/icing1-07 (Aangepast).png');
        this.load.image('icing1-08', 'assets/images/cream/icing1-08 (Aangepast).png');
        this.load.image('icing1-09', 'assets/images/cream/icing1-09 (Aangepast).png');
        this.load.image('icing1-10', 'assets/images/cream/icing1-10 (Aangepast).png');
        this.load.image('icing1-11', 'assets/images/cream/icing1-11 (Aangepast).png');
        this.load.image('icing1-12', 'assets/images/cream/icing1-12 (Aangepast).png');
        this.load.image('icing1-13', 'assets/images/cream/icing1-13 (Aangepast).png');
        this.load.image('icing1-14', 'assets/images/cream/icing1-14 (Aangepast).png');
        this.load.image('icing1-15', 'assets/images/cream/icing1-15 (Aangepast).png');
        this.load.image('icing1-16', 'assets/images/cream/icing1-16 (Aangepast).png');

        this.load.image('icing2-01', 'assets/images/cream/icing2-01 (Aangepast).png');
        this.load.image('icing2-02', 'assets/images/cream/icing2-02 (Aangepast).png');
        this.load.image('icing2-03', 'assets/images/cream/icing2-03 (Aangepast).png');
        this.load.image('icing2-04', 'assets/images/cream/icing2-04 (Aangepast).png');
        this.load.image('icing2-05', 'assets/images/cream/icing2-05 (Aangepast).png');
        this.load.image('icing2-06', 'assets/images/cream/icing2-06 (Aangepast).png');
        this.load.image('icing2-07', 'assets/images/cream/icing2-07 (Aangepast).png');
        this.load.image('icing2-08', 'assets/images/cream/icing2-08 (Aangepast).png');
        this.load.image('icing2-09', 'assets/images/cream/icing2-09 (Aangepast).png');
        this.load.image('icing2-10', 'assets/images/cream/icing2-10 (Aangepast).png');
        this.load.image('icing2-11', 'assets/images/cream/icing2-11 (Aangepast).png');
        this.load.image('icing2-12', 'assets/images/cream/icing2-12 (Aangepast).png');
        this.load.image('icing2-13', 'assets/images/cream/icing2-13 (Aangepast).png');
        this.load.image('icing2-14', 'assets/images/cream/icing2-14 (Aangepast).png');
        this.load.image('icing2-15', 'assets/images/cream/icing2-15 (Aangepast).png');
        this.load.image('icing2-16', 'assets/images/cream/icing2-16 (Aangepast).png');

        this.load.image('icing3-01', 'assets/images/cream/icing3-01 (Aangepast).png');
        this.load.image('icing3-02', 'assets/images/cream/icing3-02 (Aangepast).png');
        this.load.image('icing3-03', 'assets/images/cream/icing3-03 (Aangepast).png');
        this.load.image('icing3-04', 'assets/images/cream/icing3-04 (Aangepast).png');
        this.load.image('icing3-05', 'assets/images/cream/icing3-05 (Aangepast).png');
        this.load.image('icing3-06', 'assets/images/cream/icing3-06 (Aangepast).png');
        this.load.image('icing3-07', 'assets/images/cream/icing3-07 (Aangepast).png');
        this.load.image('icing3-08', 'assets/images/cream/icing3-08 (Aangepast).png');
        this.load.image('icing3-09', 'assets/images/cream/icing3-09 (Aangepast).png');
        this.load.image('icing3-10', 'assets/images/cream/icing3-10 (Aangepast).png');
        this.load.image('icing3-11', 'assets/images/cream/icing3-11 (Aangepast).png');
        this.load.image('icing3-12', 'assets/images/cream/icing3-12 (Aangepast).png');
        this.load.image('icing3-13', 'assets/images/cream/icing3-13 (Aangepast).png');
        this.load.image('icing3-14', 'assets/images/cream/icing3-14 (Aangepast).png');
        this.load.image('icing3-15', 'assets/images/cream/icing3-15 (Aangepast).png');
        this.load.image('icing3-16', 'assets/images/cream/icing3-16 (Aangepast).png');

        this.load.image('icing4-01', 'assets/images/cream/icing4-01 (Aangepast).png');
        this.load.image('icing4-02', 'assets/images/cream/icing4-02 (Aangepast).png');
        this.load.image('icing4-03', 'assets/images/cream/icing4-03 (Aangepast).png');
        this.load.image('icing4-04', 'assets/images/cream/icing4-04 (Aangepast).png');
        this.load.image('icing4-05', 'assets/images/cream/icing4-05 (Aangepast).png');
        this.load.image('icing4-06', 'assets/images/cream/icing4-06 (Aangepast).png');
        this.load.image('icing4-07', 'assets/images/cream/icing4-07 (Aangepast).png');
        this.load.image('icing4-08', 'assets/images/cream/icing4-08 (Aangepast).png');
        this.load.image('icing4-09', 'assets/images/cream/icing4-09 (Aangepast).png');
        this.load.image('icing4-10', 'assets/images/cream/icing4-10 (Aangepast).png');
        this.load.image('icing4-11', 'assets/images/cream/icing4-11 (Aangepast).png');
        this.load.image('icing4-12', 'assets/images/cream/icing4-12 (Aangepast).png');
        this.load.image('icing4-13', 'assets/images/cream/icing4-13 (Aangepast).png');
        this.load.image('icing4-14', 'assets/images/cream/icing4-14 (Aangepast).png');
        this.load.image('icing4-15', 'assets/images/cream/icing4-15 (Aangepast).png');
        this.load.image('icing4-16', 'assets/images/cream/icing4-16 (Aangepast).png');

        this.load.image('icing5-01', 'assets/images/cream/icing5-01 (Aangepast).png');
        this.load.image('icing5-02', 'assets/images/cream/icing5-02 (Aangepast).png');
        this.load.image('icing5-03', 'assets/images/cream/icing5-03 (Aangepast).png');
        this.load.image('icing5-04', 'assets/images/cream/icing5-04 (Aangepast).png');
        this.load.image('icing5-05', 'assets/images/cream/icing5-05 (Aangepast).png');
        this.load.image('icing5-06', 'assets/images/cream/icing5-06 (Aangepast).png');
        this.load.image('icing5-07', 'assets/images/cream/icing5-07 (Aangepast).png');
        this.load.image('icing5-08', 'assets/images/cream/icing5-08 (Aangepast).png');
        this.load.image('icing5-09', 'assets/images/cream/icing5-09 (Aangepast).png');
        this.load.image('icing5-10', 'assets/images/cream/icing5-10 (Aangepast).png');
        this.load.image('icing5-11', 'assets/images/cream/icing5-11 (Aangepast).png');
        this.load.image('icing5-12', 'assets/images/cream/icing5-12 (Aangepast).png');
        this.load.image('icing5-13', 'assets/images/cream/icing5-13 (Aangepast).png');
        this.load.image('icing5-14', 'assets/images/cream/icing5-14 (Aangepast).png');
        this.load.image('icing5-15', 'assets/images/cream/icing5-15 (Aangepast).png');
        this.load.image('icing5-16', 'assets/images/cream/icing5-16 (Aangepast).png');

        // #endregion

        // #region Decoration sprites

        // Load the decoration sprites
        this.load.image('deco1-01', 'assets/images/deco/deco1-01 (Aangepast).png');
        this.load.image('deco1-02', 'assets/images/deco/deco1-02 (Aangepast).png');
        this.load.image('deco1-03', 'assets/images/deco/deco1-03 (Aangepast).png');
        this.load.image('deco1-04', 'assets/images/deco/deco1-04 (Aangepast).png');
        this.load.image('deco1-05', 'assets/images/deco/deco1-05 (Aangepast).png');
        this.load.image('deco1-06', 'assets/images/deco/deco1-06 (Aangepast).png');
        this.load.image('deco1-07', 'assets/images/deco/deco1-07 (Aangepast).png');
        this.load.image('deco1-08', 'assets/images/deco/deco1-08 (Aangepast).png');
        this.load.image('deco1-09', 'assets/images/deco/deco1-09 (Aangepast).png');
        this.load.image('deco1-10', 'assets/images/deco/deco1-10 (Aangepast).png');
        this.load.image('deco1-11', 'assets/images/deco/deco1-11 (Aangepast).png');
        this.load.image('deco1-12', 'assets/images/deco/deco1-12 (Aangepast).png');

        this.load.image('deco2-01', 'assets/images/deco/deco2-01 (Aangepast).png');
        this.load.image('deco2-02', 'assets/images/deco/deco2-02 (Aangepast).png');
        this.load.image('deco2-03', 'assets/images/deco/deco2-03 (Aangepast).png');
        this.load.image('deco2-04', 'assets/images/deco/deco2-04 (Aangepast).png');
        this.load.image('deco2-05', 'assets/images/deco/deco2-05 (Aangepast).png');
        this.load.image('deco2-06', 'assets/images/deco/deco2-06 (Aangepast).png');
        this.load.image('deco2-07', 'assets/images/deco/deco2-07 (Aangepast).png');
        this.load.image('deco2-08', 'assets/images/deco/deco2-08 (Aangepast).png');
        this.load.image('deco2-09', 'assets/images/deco/deco2-09 (Aangepast).png');
        this.load.image('deco2-10', 'assets/images/deco/deco2-10 (Aangepast).png');
        this.load.image('deco2-11', 'assets/images/deco/deco2-11 (Aangepast).png');
        this.load.image('deco2-12', 'assets/images/deco/deco2-12 (Aangepast).png');

        this.load.image('deco3-01', 'assets/images/deco/deco3-01 (Aangepast).png');
        this.load.image('deco3-02', 'assets/images/deco/deco3-02 (Aangepast).png');
        this.load.image('deco3-03', 'assets/images/deco/deco3-03 (Aangepast).png');
        this.load.image('deco3-04', 'assets/images/deco/deco3-04 (Aangepast).png');
        this.load.image('deco3-05', 'assets/images/deco/deco3-05 (Aangepast).png');
        this.load.image('deco3-06', 'assets/images/deco/deco3-06 (Aangepast).png');
        this.load.image('deco3-07', 'assets/images/deco/deco3-07 (Aangepast).png');
        this.load.image('deco3-08', 'assets/images/deco/deco3-08 (Aangepast).png');
        this.load.image('deco3-09', 'assets/images/deco/deco3-09 (Aangepast).png');
        this.load.image('deco3-10', 'assets/images/deco/deco3-10 (Aangepast).png');
        this.load.image('deco3-11', 'assets/images/deco/deco3-11 (Aangepast).png');
        this.load.image('deco3-12', 'assets/images/deco/deco3-12 (Aangepast).png');

        this.load.image('deco4-01', 'assets/images/deco/deco4-01 (Aangepast).png');
        this.load.image('deco4-02', 'assets/images/deco/deco4-02 (Aangepast).png');
        this.load.image('deco4-03', 'assets/images/deco/deco4-03 (Aangepast).png');
        this.load.image('deco4-04', 'assets/images/deco/deco4-04 (Aangepast).png');
        this.load.image('deco4-05', 'assets/images/deco/deco4-05 (Aangepast).png');
        this.load.image('deco4-06', 'assets/images/deco/deco4-06 (Aangepast).png');
        this.load.image('deco4-07', 'assets/images/deco/deco4-07 (Aangepast).png');
        this.load.image('deco4-08', 'assets/images/deco/deco4-08 (Aangepast).png');
        this.load.image('deco4-09', 'assets/images/deco/deco4-09 (Aangepast).png');
        this.load.image('deco4-10', 'assets/images/deco/deco4-10 (Aangepast).png');
        this.load.image('deco4-11', 'assets/images/deco/deco4-11 (Aangepast).png');
        this.load.image('deco4-12', 'assets/images/deco/deco4-12 (Aangepast).png');

        this.load.image('deco5-01', 'assets/images/deco/deco5-01 (Aangepast).png');
        this.load.image('deco5-02', 'assets/images/deco/deco5-02 (Aangepast).png');
        this.load.image('deco5-03', 'assets/images/deco/deco5-03 (Aangepast).png');
        this.load.image('deco5-04', 'assets/images/deco/deco5-04 (Aangepast).png');
        this.load.image('deco5-05', 'assets/images/deco/deco5-05 (Aangepast).png');
        this.load.image('deco5-06', 'assets/images/deco/deco5-06 (Aangepast).png');
        this.load.image('deco5-07', 'assets/images/deco/deco5-07 (Aangepast).png');
        this.load.image('deco5-08', 'assets/images/deco/deco5-08 (Aangepast).png');
        this.load.image('deco5-09', 'assets/images/deco/deco5-09 (Aangepast).png');
        this.load.image('deco5-10', 'assets/images/deco/deco5-10 (Aangepast).png');
        this.load.image('deco5-11', 'assets/images/deco/deco5-11 (Aangepast).png');
        this.load.image('deco5-12', 'assets/images/deco/deco5-12 (Aangepast).png');

        // #endregion

        // #region Icon sprites

        // Load the icon sprites
        this.load.image('icon1-1', 'assets/images/icons/icon1-1 copy.png');
        this.load.image('icon1-2', 'assets/images/icons/icon1-2 copy.png');
        this.load.image('icon1-3', 'assets/images/icons/icon1-3 copy.png');
        this.load.image('icon1-4', 'assets/images/icons/icon1-4 copy.png');
        this.load.image('icon1-5', 'assets/images/icons/icon1-5 copy.png');
        this.load.image('icon2-1', 'assets/images/icons/icon2-1 copy.png');
        this.load.image('icon2-2', 'assets/images/icons/icon2-2 copy.png');
        this.load.image('icon2-3', 'assets/images/icons/icon2-3 copy.png');
        this.load.image('icon2-4', 'assets/images/icons/icon2-4 copy.png');
        this.load.image('icon2-5', 'assets/images/icons/icon2-5 copy.png');
        this.load.image('icon3-1', 'assets/images/icons/icon3-1 copy.png');
        this.load.image('icon3-2', 'assets/images/icons/icon3-2 copy.png');
        this.load.image('icon3-3', 'assets/images/icons/icon3-3 copy.png');
        this.load.image('icon3-4', 'assets/images/icons/icon3-4 copy.png');
        this.load.image('icon3-5', 'assets/images/icons/icon3-5 copy.png');

        // #endregion

        // Load the plate sprite
        this.load.image('plate', 'assets/images/plate (Aangepast) (4).png');

        // Load the background images
        this.load.image('background1', 'assets/images/background1 (Aangepast).jpg');
        this.load.image('background2', 'assets/images/background2 (Aangepast).jpg');
        this.load.image('background3', 'assets/images/background3 (Aangepast).jpg');

        // Load the ice cream temp sprites
        this.load.image('cupcake', 'assets/images/cupCake.png');
        this.load.image('cream3', 'assets/images/creamPink.png');
        this.load.image('deco3', 'assets/images/cherry.png');

        // Load the particles
        this.load.atlas('flares', 'assets/images/flares.png', 'assets/json/flares.json');

        // Load the audio files
        this.load.audio('correct', 'assets/audio/correct.wav');
        this.load.audio('wrong', 'assets/audio/wrong.wav');
        this.load.audio('thud', 'assets/audio/thud.wav');
        this.load.audio('thud2', 'assets/audio/thud2.wav');
        this.load.audio('thump', 'assets/audio/thump.wav');
        this.load.audio('thump2', 'assets/audio/thump2.wav');
        this.load.audio('drip', 'assets/audio/drip.wav');
        this.load.audio('jingle1', 'assets/audio/jingle1.mp3');
        this.load.audio('jingle2', 'assets/audio/jingle2.mp3');

        this.load.audio('song1', 'assets/audio/Whimsical-Popsicle.mp3');
    }

    create() {
        // Get the database(s) and level information from the json files
        var db1 = this.cache.json.get('db1');
        databases.push(db1);

        var texts = this.cache.json.get('texts');
        intros = texts['Introductions'];
        tips = texts['Tips'];

        var l0 = this.cache.json.get('lvl0');
        var l1 = this.cache.json.get('lvl1');
        var l2 = this.cache.json.get('lvl2');
        var l3 = this.cache.json.get('lvl3');
        var l4 = this.cache.json.get('lvl4');
        var lF = this.cache.json.get('lvlF');

        lvl0 = l0[0];
        lvl1 = l1[0];
        lvl2 = l2[0];
        lvl3 = l3[0];
        lvl4 = l4[0];
        lvlF = lF[0];

        this.initializeAnimations();

        this.doneLoading();
        console.log('Preload');
    }

    createLoadingBar() {
        // Title
        this.title = this.add.text(
            window.innerWidth / 2, // x-coordinate
            window.innerHeight / 5, // y-coordinate
            'Loading Game', // string to write
            {
                fontFamily: 'Dosis',
                fontSize: 24,
                fill: '#000000'
            }
        );
        this.title.setOrigin(0.5, 0.5);

        // Progress text
        this.txt_progress = this.add.text(
            window.innerWidth / 2,
            2 * window.innerHeight / 5,
            'Loading...',
            {
                fontFamily: 'Dosis',
                fontSize: 24,
                fill: '#000000'
            }
        );
        this.txt_progress.setOrigin(0.5, 0.5);

        let x = 10;
        let y = window.innerHeight / 2;

        this.pr = this.add.graphics({ x: x, y: y });
        this.border = this.add.graphics({ x: x, y: y });

        this.load.on('progress', this.onProgress, this);
    }

    onProgress(val) {
        // Width of progress bar
        let w = window.innerWidth - 2 * this.pr.x;
        let h = 18;

        this.pr.clear();
        this.pr.fillStyle('0xFFFFFF', 1);
        this.pr.fillRect(0, 0, w * val, h);

        this.border.clear();
        this.border.lineStyle(2, '#000000', 1);
        this.border.strokeRect(0, 0, w * val, h);

        // Percentage in progress text
        this.txt_progress.setText(Math.round(val * 100) + '%');
    }

    doneLoading() {
        this.time.delayedCall(1500, function () { this.scene.start('Menu'); }, [], this);
    }


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
