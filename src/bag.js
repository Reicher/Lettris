Bag = function (game, lang, gameData, boxClicked) {
    this.game = game
    this.letters = []
    this.gameData = gameData
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

Bag.prototype.getTypeYouDeserve = function () {
    var n = this.game.rnd.integer()%100

    if ( n <= (100 + this.gameData.karma) )
	return 'box'

    this.gameData.karma += 5
    return this.game.rnd.pick( ['big-box', 'wide-box'])
}

Bag.prototype.dropBox = function (pos) {
    if( this.letters.length < 1 )
	this.fill()

    var letter =  Phaser.ArrayUtils.removeRandomItem(this.letters)
    var points = this.json[letter].points

    return new Box(this.game,
		   pos,
		   this.getTypeYouDeserve(),
		   letter,
		   points,
		   this.boxClicked)
}
