MiniPanel = function (game, text, x, y) {
    Phaser.Group.call(this, game);

    text = "TESTING"

    var style = { font: "25px Arial", align: "center" };
    this.label = game.add.text(x, y, text, style)
    this.label.anchor.setTo(0.5)

    var middle = this.game.add.tileSprite(x, y, this.label.width-50,
					  50, 'sprites',
					  'best-word-frame-middle');
    middle.anchor.setTo(0.5)
    this.add(middle)
    var left  = this.create(x+1-middle.width/2, y, 'sprites', 'best-word-frame-left')
    left.anchor.setTo(1, 0.5)
    var right  = this.create(x-1+middle.width/2, y, 'sprites', 'best-word-frame-right')
    right.anchor.setTo(0, 0.5)

    this.add(this.label)
}

MiniPanel.prototype = Object.create(Phaser.Group.prototype)
MiniPanel.prototype.constructor = MiniPanel

MiniPanel.prototype.remove = function() {
    this.game.add.tween(this).to({alpha: 0},
    				 3000,
    				 Phaser.Easing.Quadratic.In,
    				 true);
}

MiniPanel.prototype.update = function(text) {
}
