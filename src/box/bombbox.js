BombBox = function (game, id, tile, boxes, x, y) {
    Box.call(this, game, id, 'bomb-box1', tile.letter, 0, 1, 1, x, y)
    this.point_text.destroy()
    this.boxes = boxes

    var frames = Phaser.Animation.generateFrameNames('bomb-box', 1, 2)
    this.animations.add('pulse', frames, 5, true);
    this.animations.play('pulse');

    Box.prototype.setCoolRemove.call(this, "bomb-box-break", 3, ['screw1'])
}

BombBox.prototype = Object.create(Box.prototype);
BombBox.prototype.constructor = BombBox;

BombBox.prototype.remove = function (boom = true) {
    if(boom)
	this.BOOM()

    Box.prototype.remove.call(this, false)
}

BombBox.prototype.BOOM = function (){
    for(var i=0;i<this.boxes.children.length;i++){
	var box = this.boxes.children[i]
	if(this.id == box.id)
	   continue

        var angle = this.position.angle(box);
	var dist = this.position.distance(box);
	var force = 15000 / Math.pow(dist, 2)

	if( dist < 100){
	    box.mark(true)
	    box.remove(false)
	}

	box.body.applyImpulseLocal([Math.cos(angle)*force*box.body.mass,
				    Math.sin(angle)*force*box.body.mass],
				   box.x,
				   box.y)

	// For screen shake
	// var t = this.game.time.create(true)
	// t.repeat(20,10,this.shake,this);
	// t.start();
	// t.onComplete.addOnce(this.resetCam,this);
    }

    BombBox.prototype.resetCam = function(){
        //Reset camera after shake
        this.game.camera.x = 2;
        this.game.camera.y = 2;
    }

    BombBox.prototype.shake = function(){
        var min = -2;
        var max = 2;
        this.game.camera.x+= Math.floor(Math.random() * (max - min + 1)) + min;
        this.game.camera.y+= Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
