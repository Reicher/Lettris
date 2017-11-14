Box = function (game, id, key, letter, points) {

    this.base_tint = 0xffffff
    switch(key){
    case 'silver-box':
	points *= 2
	break
    case 'gold-box':
	points *= 3
	break;
    case 'x2':
	key = 'box'
	letter = 'x2'
	points = 0
	break;
    }

    Phaser.Sprite.call(this, game, 0, 0, 'sprites', key)
    this.tint = this.base_tint

    this.x = game.rnd.integerInRange(this.width/2 + 1,
				     game.width - this.width/2 - 1)
    this.y = -this.width/2
    this.anchor.setTo(0.5)

    this.id = id
    this.marked = false
    this.points = points

    // Physics
    game.physics.p2.enable(this);
    this.body.collideWorldBounds = true
    if( key == 'ball-box' )
	this.body.setCircle(this.width/2);

    // letter text
    var style = { font: "30px Verdana", fill: "#000000" }
    this.text = this.game.add.text(0, 2, letter.toUpperCase(), style)
    this.text.anchor.setTo(0.5)
    this.addChild(this.text)

    // points text
    var style = { font: "10px Arial", fill: "#000000" }
    var point_text = this.game.add.text(17, 21, this.points, style)
    point_text.anchor.setTo(1)
    this.text.addChild(point_text)

    // Interaction
    this.inputEnabled = true;
    this.events.onInputDown.add(this.click, this)
    this.clicked = new Phaser.Signal()
}

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.click = function () {
    this.mark( !this.marked )

    this.clicked.dispatch(this)
}

Box.prototype.mark = function (mark) {
    if( mark )
	this.tint = 0x00FF00
    else
	this.tint = this.base_tint

    this.marked = mark
}

Box.prototype.remove = function () {
    // TODO: Add a cool sound, -BOP!-
    var shrink = this.game.add.tween(this.scale).to({x: 0, y: 0},
						    400,
						    Phaser.Easing.Quadratic.In,
						    true);
    shrink.onComplete.addOnce(function() {
	this.destroy()
    }, this);
}
