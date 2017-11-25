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

Bag.prototype.getTile = function () {
    if( this.tiles.length < 1 )
	this.fill()

    return Phaser.ArrayUtils.removeRandomItem(this.tiles)
}

Bag.prototype.placeBox = function (x, y) {
    var tile = this.getTile()
    return new StandardBox(this.game, this.id++, tile, x, y)
}

Bag.prototype.dropBox = function (karma) {

    // Super Nice boxes
    if ( karma > 10 )
	return new MultiBox(this.game, this.id++, 3)
    else if ( karma > 8 )
	return new MultiBox(this.game, this.id++, 2)

    // Nice boxes
    var tile = this.getTile()
    if ( karma > 6 )
    	return new GoldBox(this.game, this.id++, tile)
    else if ( karma > 5 )
    	return 	new SilverBox(this.game, this.id++, tile)

    // Bad Boxes
    var dice = this.game.rnd.integer()%9
    if(dice == 0)
	return new BigBox(this.game, this.id++, tile)
    else if (dice == 1)
	return new WideBox(this.game, this.id++, tile)
    else if (dice == 2)
	return new BallBox(this.game, this.id++, tile)

    // Standard Box
    return new StandardBox(this.game, this.id++, tile)
}
