Lettris.Game = function (game) {
};

Lettris.Game.prototype = {
    create: function (game) {

	this.markSignal = new Phaser.Signal()
	this.markSignal.add(this.mark_logic, this);
	this.markedList = []

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
	this.markedList.push(box.text.text) // todo: should store box
    },

    spawn_random_box: function () {
	var pos = this.game.rnd.integer()%6

	this.boxes.add(new Box(this.game,
			       pos*40,
			       this.markSignal))
    },

    update: function () {
	this.word.text = this.markedList.join()
    },
};
