Lettris.LangMenu = function (game) {};

Lettris.LangMenu.prototype = {
    create: function () {
	console.log('LangMenu!')

	this.game.add.sprite(0, 0, 'sprites', 'background');

	this.boxes = 0

	this.addLangBox('English', 'eng')
	var swe = this.addLangBox('Svenska', 'swe')

	// TODO enable swedish by removing when dic is ready
	swe.inputEnabled = false;
	swe.tint = 0x777777
    },
    addLangBox: function(text, lang) {
	var b = this.game.add.button(this.game.world.centerX,
				     100 + (this.boxes * 100),
				     'sprites',
				     this.startGame,
				     this,
				     'lang-box',
				     'lang-box',
				     'lang-box')
	b.anchor.setTo(0.5)
	b.lang = lang

	var style = { font: "25px Arial",
		      align: "center" };
	var label = this.game.add.text(0, 0, text, style)
	label.anchor.setTo(0.5)
	b.addChild(label)

	this.boxes++

	return b
    },
    startGame: function (b) {
	this.state.start('Splash', true, false, b.lang);
    }
};
