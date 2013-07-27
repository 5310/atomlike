Crafty.c('Particle', {
	
	particle_wave: undefined,
	
	particle_health: undefined,
	
	init: function() {
		
		this.requires('2D, PIXI, Boid');
		if ( Crafty.world.particles ) this.pixi_setContainer(Crafty.world.particles);
		
		this.particle_wave = null,
		
		this.particle_health = 1,
		
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
		Crafty.world.overlay.beginFill(0xff0000);
		Crafty.world.overlay.drawCircle( this.x, this.y, 5 );
		Crafty.world.overlay.endFill();
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
	
	wave_hostile: undefined,

	init: function() {
		
		this.requires('Flock');
		
		this.wave_health = 0;
		
		this.wave_property = {
			speed: PROPERTY.SPEED.MIN,
			flavor: PROPERTY.FLAVOR.DIFFUSE,
			capacity: PROPERTY.CAPACITY.MIN,
			damage: PROPERTY.DAMAGE.MIN,
			range: PROPERTY.RANGE.MIN,
		};
		
		this.wave_style = {
			fillColor: 0x333333,
			lineColor: 0x333333, 
			lineAlpha: 0.5, 
			lineWeight: 1.5,
		}
		
		this.wave_hostile = true;
		
		this.bind( 'WaveDead', this.destroy );
		
		this.bind( 'WorldEnterFrame', this.wave_attack );
		
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
		if ( this.wave_health <= 0 ) this.trigger('WaveDead');
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
		
	wave_attack: function(data) {

		if ( this.wave_hostile && (data.frame+this[0])%10 == 0 ) {
			
			if ( this.wave_property.flavor === PROPERTY.FLAVOR.CONCISE ) {
				
				var self = this;
				Crafty("Nucleon").each(function() {
					
					try {
						if ( this !== self ){
							
							if ( this.flock_boids.length >= Math.random()*PROPERTY.CAPACITY.MAX ) {
								
								var i = self.flock_boids[Math.floor(Math.random()*self.flock_boids.length)];
								var j = this.flock_boids[Math.floor(Math.random()*this.flock_boids.length)];
								
								var dist = Math.vecMag(Math.vecSub( [i.x,i.y], [j.x,j.y] ));
								if ( dist <= self.wave_property.range ) {
									
									var m = { x: (i.x+j.x)/2+((Math.random()-0.5)*dist/2), y: (i.y+j.y)/2+((Math.random()-0.5)*dist/2) };
									var n = { x: (m.x+j.x)/2+((Math.random()-0.5)*dist/4), y: (m.y+j.y)/2+((Math.random()-0.5)*dist/4) };
									
									Crafty.world.overlay.lineStyle( 2, 0xff0000 );									
									Crafty.world.overlay.moveTo( i.x, i.y );
									Crafty.world.overlay.lineTo( m.x, m.y );
									Crafty.world.overlay.moveTo( m.x, m.y );
									Crafty.world.overlay.lineTo( n.x, n.y );
									Crafty.world.overlay.moveTo( n.x, n.y );
									Crafty.world.overlay.lineTo( j.x, j.y );
									Crafty.world.overlay.lineStyle(0);
									Crafty.world.overlay.moveTo(0,0);
									
									j.particle_damage(self.wave_property.damage);
									
								}
								
							}
							
						}
					} catch (e) {}
					
				});
			} else if ( this.wave_property.flavor === PROPERTY.FLAVOR.DIFFUSE ) {
				//TODO: melee attack
			}
		}
	}
	
	
});
