Crafty.c('Nucleon', {
	
	nucleon_color: undefined,
	
	init: function() {
		
		this.requires('2D, PIXI, Wave');
		this.attr({ w: 16, h: 16});
		this.pixi_setInteractive( true, true );
		this.pixi_setHitArea();
		if ( Crafty.pixi.nucleons ) this.pixi_setContainer(Crafty.pixi.nucleons);
		
		this.nucleon_color = 0x6baff5;
		this.nucleon_setGraphics();
		
		this.bind( 'Move', function(data) {
			if ( data._x != this.x || data._y != this.y ) {
				this.wave_setGoal( this.x, this.y );
			}
		} );
		
		this.bind( 'PixiDrag', function(data) {
			
			this.x = data.global.x;
			this.y = data.global.y;
			//BUG: Ok, global is smoother, but does not work with any transformation on parent. Even if I assume only root container is transformed, have to calculate for position scale and rotations. If this is what the PIXI provided utility funciton does and is jittery because of, I think I can optimize but setting the container itself to getGlocal()!
			
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
	
	nucleon_fillWave: function() {
		for ( var i = this.flock_boids.length; i < this.wave_capacity; i++ ) {
			var particle = Crafty.e("2D, PIXI, Boid, Particle").attr({ x: this.x+Math.random(), y: this.y+Math.random() }); //NOTE: Random needed, othewise won't spawn, for some reason.
			this.wave_addParticle(particle);
		}
	},
	
});
