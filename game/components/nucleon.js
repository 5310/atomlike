Crafty.c('Nucleon', {
	
	nucleon_color: undefined,
	
	init: function() {
		
		this.requires('2D, PIXI, Wave');
		this.attr({ w: 16, h: 16});
		this.pixi_setInteractive( true, true );
		this.pixi_setHitArea();
		
		this.nucleon_drag = false;
		
		this.nucleon_color = 0x6baff5;
		this.nucleon_setGraphics();
		
		this.bind( 'Move', function(data) {
			if ( data._x != this.x || data._y != this.y ) {
				this.wave_setGoal( this.x, this.y );
			}
		} );
		
		this.bind( 'PixiDrag', function(data) {
			var localPosition = data.getLocalPosition(this.pixi_object);
			this.x += localPosition.x;
			this.y += localPosition.y;
			//BUG: Movement is very jittery. Something inside PIXI responsible.
			//TODO: Get frame from map dimensions.
			var left = 50; if ( this.x < left ) this.x = left;
			var right = 750; if ( this.x > right ) this.x = right;
			var top = 50; if ( this.y < top ) this.y = top;
			var bottom = 430; if ( this.y > bottom ) this.y = bottom;
		} );
		
	},
	
	nucleon_setGraphics: function() {	
		
		var graphics = new PIXI.Graphics();		
		
		var	lineColor = this.nucleon_color;
		var	lineAlpha = 1;		
		var	lineWeight = 4;	
		var	radius = 10;
		
		graphics.lineStyle( lineWeight*2, 0xffffff, 1 );
		graphics.drawCircle( 0, 0, radius );	
		graphics.lineStyle( lineWeight, lineColor, lineAlpha );
		graphics.drawCircle( 0, 0, radius );	
		
		this.pixi_setGraphics(graphics);
		
	},
	
});
