Lettris.Game = function (game) {
};

Lettris.Game.prototype = {
    create: function (game) {
	this.game.add.sprite(0, 0, 'sprites', 'background');

	// Physics stuff
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.setBoundsToWorld(true, true, false, true)
	game.physics.p2.gravity.y = 300;
	game.physics.p2.restitution = 0.05

	game.world.setBounds(0, 0, game.width, game.height-80);

	this.gameData = {score: 0,
			 karma: 0,
			 tiles_droped: 0,
			 tiles_cleared: 0,
			 best_word : {score: 0, word: ""}}

	this.gui = new GUI(game, this.gameData)
	this.bag = new Bag(game)

	this.boxes = game.add.group();

	this.fill_bottom(2)

	// Start box-droping loop
	this.spawn_box()
    },

    fill_bottom: function( layers ) {
	for (row = 0; row < layers; row++) {
	    for (col = 0; col < 6; col++) {
		var box = this.bag.placeBox(20+(col*40), 300-(40*row))
		box.clicked.add(this.gui.box_clicked, this.gui)
		this.boxes.add(box)
	    }
	}
    },

    spawn_box: function () {
	// check if any box is stuck above screen => game over
	this.boxes.forEach(function(box) {
	    if( box.y < 0){
		this.state.start('GameOver', true, false, this.gameData);
		return;
	    }
	}, this);

	var box = this.bag.dropBox(this.gameData.karma)
	box.clicked.add(this.gui.box_clicked, this.gui)
	this.boxes.add(box)

	this.gameData.karma = 0
	this.gameData.tiles_droped++

	var spawnTime = this.spawn_time(this.gameData.tiles_cleared)
	this.game.time.events.add(spawnTime,
				  this.spawn_box,
				  this);
    },

    spawn_time: function(tiles){
	var initTime = 3.5
	var spawnTime = initTime * Math.pow(0.9, Math.trunc(tiles/10))
	return spawnTime * Phaser.Timer.SECOND
    }
};
