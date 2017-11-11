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
    if ( karma >  99999 )
	return 'x2'
    else if ( karma >  4 )
	return 'gold-box'
    else if ( karma > 2 )
	return 'silver-box'
    else if ( karma == 0 && this.game.rnd.integer()%5 == 0)
	return this.game.rnd.pick(['big-box', 'wide-box', 'ball-box'])
    else if (karma < 0 )
	return this.game.rnd.pick(['big-box', 'wide-box', 'ball-box'])

    return 'box'
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
