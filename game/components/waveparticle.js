Crafty.c('Particle', {
	
	particle_wave: undefined,
	
	particle_health: undefined,
	
	init: function() {
		
		this.requires('2D, PIXI, Boid');
		if ( Crafty.pixi.particles ) this.pixi_setContainer(Crafty.pixi.particles);
		
		this.particle_wave = null,
		
		this.particle_health = 10,
		
		this.particle_setGraphics();
		
		this.bind( 'Remove', this.particle_destroy );
		
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
	
	particle_damage: function(damage) {
		this.particle_health -= damage;
		if ( this.particle_health <= 0 ) this.destroy();
	},
	
	particle_destroy: function() {
		if ( this.particle_wave ) {
			this.particle_wave.wave_removeParticle(this);
		}
		//TODO: Effects.
	},
	
});

Crafty.c('Wave', {
	
	wave_health: undefined,
	
	wave_property: {
		speed: undefined,
		flavor: undefined,
		capacity: undefined,
	},
	
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
		
		this.wave_health = 0;
		
		this.wave_property = {
			speed: PROPERTY.SPEED.MIN,
			flavor: PROPERTY.SPEED.DIFFUSE,
			capacity: PROPERTY.CAPACITY.MIN,
		};
		
		this.wave_style = {
			fillColor: 0x333333,
			lineColor: 0x333333, 
			lineAlpha: 0.5, 
			lineWeight: 1.5,
		}
		
	},
	
	wave_setProperty: function() {
		this.flock_speed = this.wave_property.speed;
	},
	
	wave_addParticle: function(particle) {
		if ( this.flock_boids.length < this.wave_property.capacity ) {
			this.flock_addBoid(particle);
			if ( particle.particle_wave ) particle.particle_wave.removeParticle(particle);
			particle.particle_wave = this;
			particle.particle_setGraphics();
			this.wave_calculateHealth();
		}
	},
	wave_removeParticle: function(particle) {
		this.flock_removeBoid(particle);
		particle.particle_wave = null;
		particle.particle_setGraphics();
		this.wave_calculateHealth();
	},
	
	wave_setCapacity: function(capacity) {
		if (capacity) this.wave_property.capacity = capacity;
		this.wave_calculateHealth();
	},
	wave_calculateHealth: function() {
		this.wave_health = this.wave_property.capacity ? this.flock_boids.length / this.wave_property.capacity : 0;
		this.trigger('WaveHealthChanged');
	},
	
	wave_setGoal: function( x, y ) {
		this.flock_goal.x = x;
		this.flock_goal.y = y;
	},
	
	wave_setGraphics: function() {
		for ( var i in this.flock_boids ) {
			this.flock_boids[i].particle_setGraphics();
		}
	},
	
});
