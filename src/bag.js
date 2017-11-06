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
    var n = this.game.rnd.integer()%100

    if ( n <= (100 + karma) )
	return 'box'

    return this.game.rnd.pick( ['big-box', 'wide-box'])
}

Bag.prototype.dropBox = function (karma) {
    if( this.letters.length < 1 )
	this.fill()

    var letter = Phaser.ArrayUtils.removeRandomItem(this.letters)
    var box = new Box(this.game,
		      this.id++,
		      this.getTypeYouDeserve(karma),
		      letter,
		      this.json[letter].points)

    return box
}
