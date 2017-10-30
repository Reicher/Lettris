Lettris.Game = function (game) {
};

Lettris.Game.prototype = {
    create: function (game) {

	this.boxClicked = new Phaser.Signal()
	this.boxClicked.add(this.handle_box_click, this);
	this.markedList = []

	game.world.setBounds(0, -40, game.width, game.height-80);

	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.gravity.y = 300;
	game.physics.p2.restitution = 0.5

	this.boxes = game.add.group();
	this.gui = game.add.group();

	// Create GUI
	this.gui.create(0, game.height-120, 'lower_panel')
	this.word = this.game.add.text(game.width/2, game.height-70)
	this.word.anchor.setTo(0.5)
	this.gui.addChild(this.word)

	// Start box-droping loop
	game.time.events.loop(Phaser.Timer.SECOND * 2,
			      this.spawn_random_box,
			      this)
    },

    handle_box_click: function(box) {
	// A little ugly to check x/y positions? but it works :D
	var id = this.markedList.findIndex(i => (i.x == box.x &&
						 i.y == box.y))
	if( id == -1 )
	    this.markedList.push(box)
	else
	    this.markedList.splice(id, 1)

	this.word.text = ""
	this.markedList.forEach(function(b) {
	    this.word.text += b.text.text
	}, this);
    },

    spawn_random_box: function () {
	var pos = this.game.rnd.integer()%6

	this.boxes.add(new Box(this.game,
			       pos*40,
			       this.boxClicked))
    },

    update: function () {
    },
};
