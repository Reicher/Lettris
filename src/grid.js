Grid = function (game, columns, width, height) {
    this.size = width / columns
    this.columns = columns
    this.rows = Math.floor(height / this.size)

    this.cell = []
    for(var i = 0; i < columns; i++) {
    	this.cell[i] = []
    	for(var j = 0; j < this.rows; j++)
    	    this.cell[i][j] = null
    }
}

Grid.prototype.fallTo = function (column, row) {
    var dist = row
    for( row += 1; row <= this.rows; ++row)
	dist += !this.cell[column][row]

    return dist
}
