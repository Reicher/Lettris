Grid = function (game, columns) {
    this.game = game // is this ugly?
    this.box_size = game.width / columns
    this.columns = columns
    this.rows = Math.floor(game.height / this.box_size)

    this.cell = []
    for(var i = 0; i < columns; i++) {
    	this.cell[i] = []
    	for(var j = 0; j < this.rows; j++) {
    	    // var box = new Box(this.game, 20 + i * 40, 20 + j * 40);
    	    this.cell[i][j] = null
    	    // this.boxes.add(box)
    	}
    }
}

Grid.prototype.addBox = function (column) {

    for(var row = this.rows; row >= 0; row--)
	if( !this.cell[column][row] )
	    break;

    var x = this.box_size/2 + column * this.box_size
    var y = this.box_size * row - this.box_size/2
    var dist = y + this.box_size/2

    var box = new Box(this.game, x, y)
    this.cell[column][row] = box
    var tween = this.game.add.tween(box).
	from( { y: -this.box_size/2 }, dist * 3).start()

    return box
}
