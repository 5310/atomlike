Crafty.c('Nucleon', {
	
	nucleon_style: {
		color: undefined,
		radius: undefined,
		lineEeight: undefined,
	},
	
	init: function() {
		
		this.requires('2D, PIXI, Wave');
		this.attr({ w: 16, h: 16});
		this.pixi_setInteractive( true, true );
		this.pixi_setHitArea();
		if ( Crafty.pixi.nucleons ) this.pixi_setContainer(Crafty.pixi.nucleons);
		
		this.wave_health = 1;
		
		this.nucleon_style.color = 0x333333;
		this.nucleon_style.radius = 10;
		this.nucleon_style.lineWeight = 2;
		this.nucleon_setGraphics();
		
		this.bind( 'Move', function(data) {
			if ( data._x != this.x || data._y != this.y ) {
				this.wave_setGoal( this.x, this.y );
			}
		} );
		
		this.bind( 'PixiDrag', function(data) {
			
			var localPosition = data.getLocalPosition(this.pixi_object.parent);
			this.x = localPosition.x;
			this.y = localPosition.y;
			
			//TODO: Get frame from map dimensions.
			var left = 50; if ( this.x < left ) this.x = left;
			var right = 750; if ( this.x > right ) this.x = right;
			var top = 50; if ( this.y < top ) this.y = top;
			var bottom = 430; if ( this.y > bottom ) this.y = bottom;
			
		} );
		
		this.bind( 'WaveHealthChanged', function() { 
			this.nucleon_setGraphics();
		} );
		
	},
	
	nucleon_setGraphics: function() {	
		
		var graphics = new PIXI.Graphics();
		
		graphics.beginFill(0xffffff);
		graphics.drawCircle( 0, 0, this.nucleon_style.radius+this.nucleon_style.lineWeight );	
		graphics.beginFill(this.nucleon_style.color);
		graphics.drawCircle( 0, 0, this.nucleon_style.radius );
		graphics.beginFill(0xffffff);
		graphics.drawCircle( 0, 0, this.nucleon_style.radius*(1-this.wave_health) );
		console.log(this.nucleon_style.radius*(1-this.wave_health));
		graphics.endFill();		
		
		this.pixi_setGraphics(graphics);
		
		this.wave_style.lineColor = this.nucleon_style.color;
		this.wave_style.fillColor = this.nucleon_style.color;
		this.wave_setGraphics();
		
	},
	
	nucleon_fillWave: function() {
		for ( var i = this.flock_boids.length; i < this.wave_capacity; i++ ) {
			var particle = Crafty.e("2D, PIXI, Boid, Particle").attr({ x: this.x+Math.random(), y: this.y+Math.random() }); //NOTE: Random needed, othewise won't spawn, for some reason.
			this.wave_addParticle(particle);
		}
	},
	
});
