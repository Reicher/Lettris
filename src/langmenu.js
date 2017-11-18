Lettris.LangMenu = function (game) {};

Lettris.LangMenu.prototype = {
    create: function () {
	this.game.add.sprite(0, 0, 'sprites', 'background');

	this.boxes = 0

	this.addLangBox('English', 'eng')
	this.addLangBox('Svenska', 'swe')
    },
    addLangBox: function(text, lang) {
	var b = this.game.add.button(this.game.world.centerX,
				     100 + (this.boxes * 100),
				     'sprites',
				     this.loadLang,
				     this,
				     'lang-box',
				     'lang-box',
				     'lang-box')
	b.anchor.setTo(0.5)
	b.lang = lang

	var style = { font: "25px Verdana",
		      align: "center" };
	var label = this.game.add.text(0, 0, text, style)
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
