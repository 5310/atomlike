Crafty.c('Particle', {
	
	particle_wave: undefined,
	
	init: function() {
		
		this.requires('2D, PIXI, Boid');
		
		this.particle_wave = null,
		
		this.particle_setGraphics();
		
	},
	
	particle_setGraphics: function() {	
		
		var graphics = new PIXI.Graphics();		
		
		var	fillColor = 0xffffff;	
		var	lineColor = 0xc8c8c8;
		var	lineAlpha = 1;		
		var	lineWeight = 1;	
		var	radius = 2;	
		
		if ( this.particle_wave ) {
			fillColor = this.particle_wave.wave_style.fillColor === undefined ? fillColor : this.particle_wave.wave_style.fillColor;			
			lineColor = this.particle_wave.wave_style.lineColor === undefined ? lineColor : this.particle_wave.wave_style.lineColor;	
			lineAlpha = this.particle_wave.wave_style.lineAlpha === undefined ? lineAlpha : this.particle_wave.wave_style.lineAlpha;	
			lineWeight = this.particle_wave.wave_style.lineWeight === undefined ? lineWeight : this.particle_wave.wave_style.lineWeight;	
			radius = this.particle_wave.wave_style.radius === undefined ? radius : this.particle_wave.wave_style.radius;	
		}
		
		graphics.beginFill(fillColor);
		graphics.lineStyle( lineWeight, lineColor, lineAlpha );
		graphics.drawCircle( 0, 0, radius );	
		graphics.endFill();
		
		this.pixi_setGraphics(graphics);
		
	},
	
});

Crafty.c('Wave', {

	wave_capacity: undefined,
	
	wave_style: {
		fillColor: undefined,
		lineColor: undefined, 
		lineAlpha: undefined, 
		lineWeight: undefined,
		radius: undefined,	
	},
	
	wave_properties: undefined,

	init: function() {
		
		this.requires('Flock');
		
		this.wave_capacity = 50;
		
		this.wave_style = {
			fillColor: 0x6baff5,
			lineColor: 0x6baff5, 
			lineAlpha: 0.5, 
			lineWeight: 1.5,
		}
		
	},
	
	wave_addParticle: function(particle) {
		if ( this.flock_boids.length < this.wave_capacity ) {
			this.flock_addBoid(particle);
			if ( particle.particle_wave ) particle.particle_wave.removeParticle(particle);
			particle.particle_wave = this;
			particle.particle_setGraphics();
		}
	},
	wave_removeParticle: function(particle) {
		this.flock_removeBoid(particle);
		particle.particle_wave = null;
		particle.particle_setGraphics();
	},
	
	wave_setGoal: function( x, y ) {
		this.flock_goal.x = x;
		this.flock_goal.y = y;
	},
	
	wave_updateStyle: function() {
		for ( var i in this.flock_boids ) {
			this.flock_boids[i].particle_setGraphics();
		}
	}
	
});
