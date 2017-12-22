Lettris.Game = function (game) {
};

Lettris.Game.prototype = {
    create: function (game) {

	game.stage.disableVisibilityChange = true;

	this.back = this.game.add.tileSprite(0, 0,
					     game.width, game.height,
					     'sprites', 'background');

	// Physics stuff
	game.physics.startSystem(Phaser.Physics.P2JS);
	game.physics.p2.setBoundsToWorld(true, true, false, true)
	game.physics.p2.gravity.y = 250;
	game.physics.p2.restitution = 0.05

	game.world.setBounds(0, 0, game.width, game.height-200);

	this.gameData = {score: 0,
			 level: 1,
			 karma: 0,
			 tiles_dropped: 0,
			 tiles_cleared: 0,
			 best_word : {score: 0, word: ""}}

	this.gui = new GUI(game, this.gameData)

	this.boxes = game.add.group();
	this.bag = new Bag(game, this.boxes)

	this.fill_bottom(1)

	// Start box-droping loop
	this.spawn_box()
    },
    fill_bottom: function( layers ) {
	var boxSize = 80 // ugly
	var max_col = Math.floor(this.game.width / boxSize)
	for (row = 0; row < layers; row++) {
	    for (col = 0; col < max_col; col++) {
		var box = this.bag.placeBox(boxSize/2+(col*boxSize),
					    560-(boxSize*row))
		box.clicked.add(this.gui.box_clicked, this.gui)
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

	var box = this.bag.dropBox(this.gameData)
	box.body.moveDown(this.gameData.tiles_cleared)
	box.clicked.add(this.gui.box_clicked, this.gui)

	this.gameData.karma = 0

	this.gameData.tiles_dropped++

	var spawnTime = this.spawn_time(this.gameData.tiles_cleared)
	this.game.time.events.add(spawnTime,
				  this.spawn_box,
				  this);
    },

    spawn_time: function(tiles){
	console.log(tiles)
	var min_speed = 0.5
	var start_speed = 3.2
	this.speed = min_speed +
	    ((start_speed - min_speed) *
	     Math.pow(0.9, Math.trunc(tiles/5)))
	console.log(this.speed)
	return this.speed * Phaser.Timer.SECOND
    },
    update: function(){
	this.back.tilePosition.y += 3.5 / this.speed;
    }
};
