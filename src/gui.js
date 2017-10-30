GUI = function (game, boxClicked) {
    Phaser.Group.call(this, game);

    // Upper Panel

    // Lower Panel
    var lower_panel = this.create(0, game.height-120, 'lower_panel')
    this.word = game.add.text(game.world.centerX,
    			      game.height-120+lower_panel.height/2)
    this.word.anchor.setTo(0.5)
    this.word.inputEnabled = true;
    this.word.events.onInputDown.add(this.handle_word_click, this);
    this.add(this.word)

    boxClicked.add(this.handle_box_click, this);
    this.markedList = []
}

GUI.prototype = Object.create(Phaser.Group.prototype);
GUI.prototype.constructor = GUI;

GUI.prototype.update = function () {

}

GUI.prototype.handle_word_click = function (box) {
    this.markedList.forEach(function(box) {
	box.destroy()
    }, this);
    this.markedList = []
    this.word.text = ""
}

GUI.prototype.handle_box_click = function (box) {
    // A little ugly to check x/y positions? but it works :D
    var id = this.markedList.findIndex(b => (b.x == box.x &&
					     b.y == box.y))
    if( id == -1 )
	this.markedList.push(box)
    else
	this.markedList.splice(id, 1)

    this.word.text = ""
    this.markedList.forEach(function(b) {
	this.word.text += b.text.text
    }, this);
}
