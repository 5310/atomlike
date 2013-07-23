Crafty.c('PIXI', {
	
	pixi_object: undefined,
	pixi_graphics: undefined,
	
	init: function() {
		
		this.requires('2D');
		
		this.pixi_object = new PIXI.DisplayObjectContainer();
		Crafty.pixi.container.addChild(this.pixi_object);
		
		this.bind( 'Move', this.pixi_move );
		this.bind( 'Rotate', this.pixi_rotate );
		
		this.pixi_object.interaction = true;
		this.pixi_object.hitArea = new PIXI.Rectangle(0, 0, this.w, this.h);
		
	},
	
	pixi_setGraphics: function(graphics) {
		if ( !graphics ) {
			if ( this.pixi_object.children.length ) this.pixi_object.removeChild(this.pixi_graphics);
			this.pixi_graphics = new PIXI.Graphics();
			this.pixi_graphics.beginFill(0x000000);
			this.pixi_graphics.drawRect( -this.w/2, -this.h/2, this.w, this.h );		
			this.pixi_graphics.endFill();
			this.pixi_object.addChild(this.pixi_graphics);
		} else {
			if ( this.pixi_object.children.length ) this.pixi_object.removeChild(this.pixi_graphics);
			this.pixi_graphics = graphics;
			this.pixi_object.addChild(this.pixi_graphics);
		}
	},
	
	pixi_move: function(data) {
		
		this.pixi_object.position.x = this.x;
		this.pixi_object.position.y = this.y;
		
		this.pixi_object.hitArea.width = this.w;
		this.pixi_object.hitArea.height = this.h;
		
	},
	
	pixi_rotate: function(data) {
		this.pixi_object.rotation -= data.rad;	
	},
	
});
