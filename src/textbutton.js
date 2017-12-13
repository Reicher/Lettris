TextButton = function (game, text, x, y, func, ctx) {
    Phaser.Group.call(this, game);

    var btn = this.game.add.button(x,
				   y,
				   'sprites',
				   func,
				   ctx,
				   'button',
				   'button',
				   'button-pressed')
    btn.anchor.setTo(0.5)
    this.button = btn
    this.add(btn)

    var style = { font: "30px Verdana",
		  fontWeight: 'bold',
		  stroke: '#000000',
		  strokeThickness: 2,
		  fill: "#EEEEEE",
		  align: "center"};
    var text = this.game.add.text(x, y, text, style)
    text.anchor.setTo(0.5)
    this.text = text
    this.add(text);
}

TextButton.prototype = Object.create(Phaser.Group.prototype)
TextButton.prototype.constructor = TextButton

TextButton.prototype.enable = function(enable = true) {
    if(!enable){
	this.button.tint = 0x999999
	this.button.inputEnabled = false
    }
    else {
	this.button.tint = 0xFFFFFF
	this.button.inputEnabled = true
    }
}
