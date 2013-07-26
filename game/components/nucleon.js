Crafty.c('Nucleon', {
	
	nucleon_color: undefined,
	
	init: function() {
		
		this.requires('2D, PIXI, Wave');
		this.attr({ w: 10, h: 10});
		this.pixi_setInteractive( true, true );
		this.pixi_setHitArea();
		
		this.nucleon_color = 0x6baff5;
		
		this.nucleon_setGraphics();
		
		this.bind( 'Move', function(data) {
			if ( data._x != this.x || data._y != this.y ) {
				this.wave_setGoal( this.y, this.y );
			}
		} );
		
	},
	
	nucleon_setGraphics: function() {	
		
		var graphics = new PIXI.Graphics();		
			
		var	lineColor = this.nucleon_color;
		var	lineAlpha = 1;		
		var	lineWeight = 3;	
		var	radius = 6;
		
		graphics.lineStyle( lineWeight, lineColor, lineAlpha );
		graphics.drawCircle( 0, 0, radius );	
		
		this.pixi_setGraphics(graphics);
		
	},
	
});
