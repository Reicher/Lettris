MultiBox = function (game, id, multi, x, y) {
    Box.call(this, game, id, 'multi-box', "x" + multi, 0, x, y)
    this.point_text.destroy()
    this.text.fontSize = "20px"
    this.multi = multi

    //this.body.clearShapes();

    //	You can specify the addition of a new polygon to a body in 3 different ways:
    // contra.body.addPolygon( {} ,    10, 191  ,  26, 158  ,  25, 186  ,  13, 204  );
    // contra.body.addPolygon( {} , [   10, 191  ,  26, 158  ,  25, 186  ,  13, 204  ]);
    // contra.body.addPolygon( {} , [   [10, 191]  ,  [26, 158]  ,  [25, 186]  ,  [13, 204]  ]);
}

MultiBox.prototype = Object.create(Box.prototype);
MultiBox.prototype.constructor = MultiBox;
