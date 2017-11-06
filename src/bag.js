Bag = function (game, lang) {
    this.game = game
    this.letters = []
    this.id = 0

    this.json = game.cache.getJSON(lang).letters
}

Bag.prototype.fill = function () {
    for (var key in this.json) {
	var times = this.json[key].tiles
	for( i = 0; i < times; ++i)
	    this.letters.push(key)
    }
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

    var letter =  Phaser.ArrayUtils.removeRandomItem(this.letters)
    var points = this.json[letter].points

    var box = new Box(this.game,
		      this.id++,
		      this.getTypeYouDeserve(karma),
		      letter,
		      points)

    return box
}
