Bag = function (game, lang, boxClicked) {
    this.game = game
    this.letters = []
    this.boxClicked = boxClicked

    this.json = game.cache.getJSON(lang).letters
}

Bag.prototype.fill = function () {
    for (var key in this.json) {
	var times = this.json[key].tiles
	for( i = 0; i < times; ++i)
	    this.letters.push(key)
    }
}

Bag.prototype.dropBox = function (pos) {
    if( this.letters.length < 1 )
	this.fill()

    var letter =  Phaser.ArrayUtils.removeRandomItem(this.letters)
    var points = this.json[letter].points

    return new Box(this.game,
		   pos,
		   letter,
		   points,
		   this.boxClicked)
}
