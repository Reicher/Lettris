MultiBox = function (game, id, multi, x, y) {
    Box.call(this, game, id, 'multi-box', "x" + multi, 0, x, y)
    this.point_text.destroy()
    this.text.fontSize = "20px"
    this.multi = multi

    // Create a new prism shape, specified from bottom right, counter-clockwise (?!)
    this.body.clearShapes();
    this.body.addPolygon( {} , [ [38, 19]  ,  [19, 0],  [0, 19]  ,  [19, 38] ]);

    this.anchor.setTo(0.5) // anchor gets fucked up after clear shape
}

MultiBox.prototype = Object.create(Box.prototype);
MultiBox.prototype.constructor = MultiBox;
