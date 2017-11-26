BombBox = function (game, id, tile, boxes, x, y) {
    Box.call(this, game, id, 'bomb-box1', tile.letter, 0, x, y)
    this.point_text.destroy()
    this.boxes = boxes

    var frames = Phaser.Animation.generateFrameNames('bomb-box', 1, 3)
    this.animations.add('pulse', frames, 5, true);

    this.animations.play('pulse');
}

BombBox.prototype = Object.create(Box.prototype);
BombBox.prototype.constructor = BombBox;

BombBox.prototype.remove = function () {
    this.BOOM()
    var expand = this.game.add.tween(this.scale).to({x: 1.2, y: 1.2},
						    200,
						    Phaser.Easing.Quadratic.In,
						    true);
    expand.onComplete.addOnce(function() {
	this.destroy()
    }, this);
}

BombBox.prototype.BOOM = function (){
    for(var i=0;i<this.boxes.children.length;i++){
	console.log("BOX")

	var box = this.boxes.children[i]
	if(this.id == box.id)
	   continue

        var angle = this.position.angle(box);
	var dist = this.position.distance(box);
        //Set the velocity to the angle multiplied by force and the mass
        //We can also check the distance and multiply with that factor, so near objects have greater velocity
        //and farther objects have lower velocity

	var force = 2000 / Math.pow(dist, 2)

	box.body.applyImpulseLocal([Math.cos(angle)*force*box.body.mass,
				    Math.sin(angle)*force*box.body.mass],
				   box.x,
				   box.y)
    }
    //Additional logic for moving the crates can be applied here if required..

    //For screen shake
    // var t = game.time.create(true)
    // t.repeat(20,10,shake,this);
    // t.start();
    // t.onComplete.addOnce(resetCam,this);
}
