Bag = function (game) {
    this.game = game
    this.letters = []
    this.id = 0

    var file = game.cache.getJSON('let')
    this.json = file.letters
}

Bag.prototype.fill = function () {
    for (var key in this.json)
	for( i = 0; i < this.json[key].tiles; ++i)
	    this.letters.push(key)
}

Bag.prototype.getTypeYouDeserve = function (karma) {
    if ( karma >  999 )
	return 'x2'
    else if ( karma >  4 )
	return 'gold-box'
    else if ( karma > 2 )
	return 'silver-box'
    else if(this.game.rnd.integer()%5 == 0)
	return this.game.rnd.pick(['big-box', 'wide-box', 'ball-box'])

    return 'box'
}

Bag.prototype.placeBox = function (x, y) {
    if( this.letters.length < 1 )
	this.fill()

    var letter = Phaser.ArrayUtils.removeRandomItem(this.letters)
    var box = new Box(this.game,
		      this.id++,
		      'box',
		      letter,
		      this.json[letter].points,
		      x,
		      y)

    return box
}

Bag.prototype.dropBox = function (karma) {
    if( this.letters.length < 1 )
	this.fill()

    var box_type =  this.getTypeYouDeserve(karma)

    var letter = Phaser.ArrayUtils.removeRandomItem(this.letters)
    var box = new Box(this.game,
		      this.id++,
		      box_type,
		      letter,
		      this.json[letter].points)

    return box
}
