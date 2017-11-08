Bag = function (game, lang) {
    this.game = game
    this.letters = []
    this.id = 0

    this.json = game.cache.getJSON(lang).letters
}

Bag.prototype.fill = function () {
    for (var key in this.json)
	for( i = 0; i < this.json[key].tiles; ++i)
	    this.letters.push(key)
}

Bag.prototype.getTypeYouDeserve = function (karma) {
    if ( karma >  99999 )
	return 'x2'
    else if ( karma >  3 )
	return 'gold-box'
    else if ( karma > 1 )
	return 'silver-box'
    else if ( karma < 0 )
	return this.game.rnd.pick( ['big-box', 'wide-box'])

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
