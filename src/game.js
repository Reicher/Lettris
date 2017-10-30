Lettris.Game = function (game) {
};

Lettris.Game.prototype = {
    create: function (game) {

	this.markSignal = new Phaser.Signal()
	this.markSignal.add(this.mark_logic, this);
	this.markedList = []
	this.word = ""

	game.world.setBounds(0, -40, game.width, game.height-80);

	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.gravity.y = 300;
	game.physics.p2.restitution = 0.5

	this.boxes = game.add.group();
	this.gui = game.add.group();

	this.gui.create(0, game.height-120, 'lower_panel')
	this.word = this.game.add.text(game.width/2, game.height-60)
	this.word.anchor.setTo(0.5)
	this.gui.addChild(this.word)

	game.time.events.loop(Phaser.Timer.SECOND * 2,
			      this.spawn_random_box,
			      this)
    },

    mark_logic: function(box) {
	var id = this.markedList.findIndex(i => (i.x == box.x && i.y == box.y))
	if( id == -1 )
	    this.markedList.push(box)
	else
	    this.markedList.splice(id, 1)


	var newText = ""
	this.markedList.forEach(function(b) {
	    newText += b.text.text
	}, this);
	this.word.setText(newText)
    },

    spawn_random_box: function () {
	var pos = this.game.rnd.integer()%6

	this.boxes.add(new Box(this.game,
			       pos*40,
			       this.markSignal))
    },

    update: function () {
    },
};
