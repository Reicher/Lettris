Bag = function (game) {
    this.game = game
    this.tiles = []
    this.id = 0

    var file = game.cache.getJSON('let')
    this.json = file.letters
}

Bag.prototype.fill = function () {
    for (var key in this.json)
	for( i = 0; i < this.json[key].tiles; ++i)
	    this.tiles.push({letter: key.toUpperCase(),
			     points: this.json[key].points})
}


Bag.prototype.placeBox = function (x, y) {
    if( this.tiles.length < 1 )
	this.fill()

    var tile = Phaser.ArrayUtils.removeRandomItem(this.tiles)
    return new StandardBox(this.game, this.id++, tile, x, y)
}

Bag.prototype.dropBox = function (karma) {
    if( this.tiles.length < 1 )
	this.fill()

    var tile = Phaser.ArrayUtils.removeRandomItem(this.tiles)

    // Good Boxes
    if ( karma > 3 )
	return new MultiBox(this.game, this.id++, 2)
    // else if ( karma > 8 )
    // 	return new GoldBox(this.game, this.id++, tile)
    // else if ( karma > 7 )
    // 	return 	new SilverBox(this.game, this.id++, tile)

    // Bad Boxes
    if(this.game.rnd.integer()%8 == 0)
	return new BigBox(this.game, this.id++, tile)
    else if (this.game.rnd.integer()%8 == 1)
	return new WideBox(this.game, this.id++, tile)
    else if (this.game.rnd.integer()%8 == 2)
	return new BallBox(this.game, this.id++, tile)

    return new StandardBox(this.game, this.id++, tile)
}
