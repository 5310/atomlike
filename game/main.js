window.onload = function() {
	
	// Start Crafty.
	Crafty.init(800, 480);
	
	// Start Pixi.
	Crafty.pixi.init(800, 480);
	
    /*var graphics = new PIXI.Graphics();
	graphics.beginFill(0xAA0000);
	graphics.moveTo(0,0);
	graphics.lineTo(-50, 100);
	graphics.lineTo(50, 100);
	graphics.endFill();
	Crafty.pixi.container.addChild(graphics);*/
	
	e = Crafty.e("2D, PIXI");//.attr({x: 0, y: 0, w: 10, h: 10});
	
};
