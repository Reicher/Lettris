Lettris.Game = function (game) {
};

Lettris.Game.prototype = {
    create: function (game) {
	game.add.sprite(0, 0, 'sprites', 'background');

	// Physics stuff
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.setBoundsToWorld(true, true, false, true)
	game.physics.p2.gravity.y = 300;
	game.physics.p2.restitution = 0.05

	game.world.setBounds(0, 0, game.width, game.height-80);

	this.gameData = {score: 0, karma: 0}

	this.gui = new GUI(game, this.gameData)
	this.bag = new Bag(game, 'let-eng-std')

	this.boxes = game.add.group();

	// Start box-droping loop
	game.time.events.loop(Phaser.Timer.SECOND * 2,
			      this.spawn_box, this)
    },

    spawn_box: function () {
	// check if any box is stuck above screen => game over
	this.boxes.forEach(function(box) {
	    if( box.y < 0)
		this.state.start('GameOver', true, false, this.gameData.score);
	}, this);

	var box = this.bag.dropBox(this.gameData.karma)
	box.clicked.add(this.gui.box_clicked, this.gui)
	this.gameData.karma = 0
	this.boxes.add(box)
    },
};
