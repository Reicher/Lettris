GUI = function (game, boxClicked) {
    Phaser.Group.call(this, game);

    // Upper Panel

    // Lower Panel
    var lower_panel = this.create(0, game.height-120, 'lower_panel')
    this.word = game.add.text(lower_panel.width/2,
    			      game.height-120+lower_panel.height/2)
    this.word.anchor.setTo(0.5)
    this.add(this.word)

    boxClicked.add(this.handle_box_click, this);
    this.markedList = []
}

GUI.prototype = Object.create(Phaser.Group.prototype);
GUI.prototype.constructor = GUI;

GUI.prototype.update = function () {

}

GUI.prototype.handle_box_click = function (box) {
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
}
