Lettris.Stats = function(game){

};
Lettris.Stats.prototype = {
    create: function(){
	this.game.add.sprite(0, 0, 'sprites', 'background');

	this.logo = this.game.add.sprite(this.game.width/2, 140, 'sprites', 'logo')
	this.logo.anchor.setTo(0.5)

	var style = { font: "25px Arial", fill: "#EEEEEE", wordWrap: true, wordWrapWidth: this.game.world.width - 40 };
	var header = this.game.add.text(this.game.world.centerX, 270, "Word               Count", style)
	header.fontSize = '26pt'
	header.anchor.setTo(0.5)
	let underline = this.game.add.graphics(header.left, header.bottom -3);
	underline.lineStyle(2, 0xEEEEEE);
	underline.moveTo(0, 0);
	underline.lineTo(header.width, 0);

	var most = this.getTop(10, this.game.language)
	for(i = 0; i < most.length; ++i){
	    this.game.add.text(this.game.world.centerX-130, 300 + i * 30, most[i][0], style)
	    this.game.add.text(this.game.world.centerX+130, 300 + i * 30, most[i][1], style)
	}


	new TextButton(this.game, "Back",
		       this.game.world.centerX,
		       this.game.height-50,
		       this.back,
		       this)
    },
    getTop: function(n, lang) {
	var raw = JSON.parse(localStorage.getItem('Stats-' + lang));
	var compiled = []
	for (var i = 0; i < raw.length; i++) {
	    if(compiled[raw[i]] == undefined)
		compiled[raw[i]] = 1
	    else
		compiled[raw[i]]++
	}

	var  top = Object.keys(compiled).map(function(key) {
	    return [key, compiled[key]];
	});

	top.sort(function(first, second) {
	    return second[1] - first[1];
	});

	top = top.slice(0, n);

	return top
    },
    category: function(y, title, names) {
	var header_style = { font: "30px Verdana",
			     fontWeight: 'bold',
			     stroke: '#000000',
			     strokeThickness: 2,
			     fill: "#EEEEEE",
			     align: "center"};

	var name_style = { font: "25px Verdana",
			     fontWeight: 'italic',
			     stroke: '#000000',
			     strokeThickness: 2,
			     fill: "#EEEEEE",
			   align: "center"};

	var header = this.game.add.text(this.game.world.centerX,
					y,
					title,
					header_style)
	header.anchor.setTo(0.5)

	for(i = 0; i < names.length; ++i){
	    var cast = this.game.add.text(this.game.world.centerX,
					  header.bottom + 20 + i * 30,
					  names[i],
					  name_style)
	    cast.anchor.setTo(0.5)
	}

    },
    back: function() {
	this.state.start('MainMenu');
    }
};
