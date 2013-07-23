Crafty.c('PIXI', {
	
	pixi_object: undefined,
	
	init: function() {
		
		this.requires('2D');
		
		this.pixi_object = new PIXI.DisplayObjectContainer();
		Crafty.pixi.container.addChild(this.pixi_object);
		
		this.pixi_object.interaction = true;
		this.pixi_object.hitArea = new PIXI.Rectangle(0, 0, this.w, this.h);
		
		this.bind( 'Move', this.pixi_move );
		this.bind( 'Rotate', this.pixi_rotate );
		
		this.pixi_graphics = new PIXI.Graphics();
		this.pixi_graphics.beginFill(0xAAAA00);
		this.pixi_graphics.drawRect(0, 0, 10, 10);		
		this.pixi_graphics.endFill();
		this.pixi_object.addChild(this.pixi_graphics);
		
	},
	
	pixi_move: function(data) {
		
		this.pixi_object.position.x = this.x;
		this.pixi_object.position.y = this.y;
		
		this.pixi_object.hitArea.width = this.w;
		this.pixi_object.hitArea.height = this.h;
		this.origin("center");
		
	},
	
	pixi_rotate: function(data) {
		
		console.log(data);
		this.pixi_object.rotation -= data.rad;
		
	},
	
});
