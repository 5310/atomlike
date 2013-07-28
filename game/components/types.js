Crafty.c('Anti', {
	
	type: undefined,
	
	init: function() {
		
		this.type = 'Anti';
		
		if ( this.has('Nucleon') )	{
			
			this.nucleon_property = Crafty.clone({
				speed: PROPERTY.SPEED.MIN,
				flavor: PROPERTY.FLAVOR.CONCISE,
				capacity: 1,
				entanglement: 0,
				damage: 2,
				range: PROPERTY.RANGE.MIN,
				health: PROPERTY.HEALTH.MIN,
			});
			this.nucleon_setProperty();
			
			this.nucleon_style = Crafty.clone({
				color: 0x333333,
				radius: 0,
				lineWeight: 0,
				attackColor: 0xff0000,
			});
			this.nucleon_setGraphics();
			
		}	
		
		if ( this.has('Wave') )	{
			
			this.wave_hostileComponent = 'Standard';
			
			this.bind( 'WaveAddingParticle', function(data) {
				data.removeComponent(data.type);
				data.addComponent('Anti');
			} );
			
			this.bind( 'WaveRemovingParticle', function(data) {
				data.removeComponent('Anti');
				data.addComponent('Nascent');
			} );
			
			this.bind( 'WorldEnterFrame', function(data) {
				
				if ( this.wave_hostile && (data.frame+this[0])%15 == 0 ) {
							
					try {
						
						var emitters;
						var emitter;
						var attempts = 10;
						do {
							emitters = Crafty("Emitter");
							emitter = Crafty(emitters[Math.floor(Math.random()*emitters.length)]);
							attempts--;
						} while ( attempts >= 0 && this.wave_hostileArea && !this.wave_hostileArea.containsPoint( emitter.x, emitter.y ) )
							
						var i = this.flock_boids[Math.floor(Math.random()*this.flock_boids.length)];
						var j = emitter;
						
						var dist = Math.vecMag(Math.vecSub( [i.x,i.y], [j.x,j.y] ));
						if ( dist <= this.wave_property.range ) {
							
							var m = { x: (i.x+j.x)/2+((Math.random()-0.5)*dist/2), y: (i.y+j.y)/2+((Math.random()-0.5)*dist/2) };
							var n = { x: (m.x+j.x)/2+((Math.random()-0.5)*dist/4), y: (m.y+j.y)/2+((Math.random()-0.5)*dist/4) };
							
							Crafty.world.overlay.lineStyle( 2, this.wave_style.attackColor );									
							Crafty.world.overlay.moveTo( i.x, i.y );
							Crafty.world.overlay.lineTo( m.x, m.y );
							Crafty.world.overlay.moveTo( m.x, m.y );
							Crafty.world.overlay.lineTo( n.x, n.y );
							Crafty.world.overlay.moveTo( n.x, n.y );
							Crafty.world.overlay.lineTo( j.x, j.y );
							Crafty.world.overlay.lineStyle(0);
							Crafty.world.overlay.moveTo(0,0);
							
							j.emitter_damage(this.wave_property.damage/5);
							
						}
							
					} catch (e) {}

				}

			} );
			
		}
		
	},	
	
});

Crafty.c('Standard', {
	
	type: undefined,
	
	init: function() {
		
		this.type = 'Standard';
		
		if ( this.has('Nucleon') )	{
			
			this.nucleon_property = Crafty.clone({
				speed: 2,
				flavor: PROPERTY.FLAVOR.CONCISE,
				capacity: 10,
				entanglement: PROPERTY.ENTANGLEMENT.MIN,
				damage: PROPERTY.DAMAGE.MIN,
				range: 100,
				health: 2,
			});
			this.nucleon_setProperty();
			
			this.nucleon_style = Crafty.clone({
				color: 0x6baff5,
				radius: 10,
				lineWeight: 2,
				attackColor: 0xff0000,
			});
			this.nucleon_setGraphics();
			
		}	
		
		if ( this.has('Wave') )	{
			
			this.wave_hostileComponent = 'Anti';
			
			this.bind( 'WaveAddingParticle', function(data) {
				data.removeComponent(data.type);
				data.addComponent('Standard');
			} );
			
			this.bind( 'WaveRemovingParticle', function(data) {
				data.removeComponent('Standard');
				data.addComponent('Nascent');
			} );
			
			this.bind( 'WorldEnterFrame', function(data) {
				
				if ( this.wave_hostileArea && (data.frame+this[0])%this.nucleon_property.entanglement == 0 && this.flock_boids.length < this.wave_property.capacity ) {
					
					try {
						
						var particles;
						var particle;
						var attempts = 10;
						//var area = new Crafty.circle( this.wave_hostileArea.x, this.wave_hostileArea.y, 50 );
						var area = new Crafty.circle( this.flock_center.x, this.flock_center.y, 100 );
						do {
							particles = Crafty('Particle Nascent');
							particle = Crafty(particles[Math.floor(Math.random()*particles.length)]);
							attempts--;
							var inrange = area.containsPoint( particle.x, particle.y );
						} while ( attempts >= 0 && !inrange )
						
						if ( inrange ) {
						
							this.wave_addParticle(particle);
							
							Crafty.world.overlay.lineStyle( 2, this.wave_style.lineColor, 0.8 );							
							Crafty.world.overlay.moveTo( this.wave_hostileArea.x, this.wave_hostileArea.y );
							Crafty.world.overlay.lineTo( particle.x, particle.y );
							Crafty.world.overlay.lineStyle(0);
							Crafty.world.overlay.moveTo(0,0);	
												
						}
						
					} catch (e) {}
					
				}
				
			} );
			
		}	
		
	},	
	
});

Crafty.c('Nascent', {
	
	type: undefined,
	
	init: function() {
		
		this.type = 'Nascent';
		
	},	
	
});
