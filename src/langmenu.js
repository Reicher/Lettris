Lettris.LangMenu = function (game) {};

Lettris.LangMenu.prototype = {
    create: function () {
	this.game.add.sprite(0, 0, 'sprites', 'background');

	this.boxes = 0

	this.addLangBox('ENGLISH', 'eng')
	this.addLangBox('SVENSKA', 'swe')
    },
    addLangBox: function(text, lang) {
	var b = this.game.add.button(this.game.world.centerX,
				     150 + (this.boxes * 150),
				     'sprites',
				     this.loadLang,
				     this,
				     'button',
				     'button',
				     'button-pressed')
	b.anchor.setTo(0.5)
	b.lang = lang

	var style = { font: "35px Verdana",
		      fill: "#EEEEEE",
		      align: "center" };
	var label = this.game.add.text(0, 0, text, style)
	label.fontWeight = 'bold';
	label.stroke = '#000000';
	label.strokeThickness = 2;
	label.anchor.setTo(0.5)
	b.addChild(label)

	this.boxes++

    },
    loadLang: function (b) {
	var path = 'assets/lang/' + b.lang + '/'
	this.game.load.json('let', path + 'letters.json')
	this.game.load.json('dic', path + 'dictionary.json')

	this.game.lang = b.lang
	this.game.language = b.children[0].text
	b.children[0].text = "Loading"

	this.game.load.start()
	this.game.load.onLoadComplete.add(this.start, this);
    },
    start: function() {
	this.state.start('MainMenu');
    }
};
