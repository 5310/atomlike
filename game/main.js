window.onload = function() {
	
	// Start Crafty.
	Crafty.init(800, 480);
	
	// Start Pixi.
	Crafty.pixi.init(800, 480);
	
	e = Crafty.e("2D, PIXI").attr({x: 100, y: 100, w: 100, h: 50});
	e.pixi_setGraphics();
	e.pixi_setInteractive(true);
	e.pixi_setHitArea();
	
	/*graphics = new PIXI.Graphics();
	Crafty.pixi.container.addChild(graphics);
	graphics.beginFill(0xAA0000);
	graphics.drawCircle(100, 100, 200);
	graphics.interactive = true;
	graphics.hitArea = new PIXI.Rectangle(-100, -100, 200, 200);
	graphics.drag = false;
	graphics.mousedown = graphics.touchstart = function(data) {
	    console.log(data);
	};*/
	
};
