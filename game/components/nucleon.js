PROPERTY = {
	SPEED: {
		MIN: 1,
		MAX: 5,
	},
	FLAVOR: {
		CONCISE: 1,
		DIFFUSE: 2,
	},
	CAPACITY: {
		MIN: 5,
		MAX: 25,
	},
	ENTANGLEMENT: {
		MIN: 1,
		MAX: 10,
	},
	DAMAGE: {
		MIN: 1,
		MAX: 10,
	},
	RANGE: {
		MIN: 100,
		MAX: 500,
	},
	HEALTH: {
		MIN: 1,
		MAX: 10,
	},
};

Crafty.c('Nucleon', {
	
	nucleon_property: {
		speed: undefined,
		flavor: undefined,
		capacity: undefined,
		entanglement: undefined,
		range: undefined,
		damage: undefined,
		haelth: undefined,
	},
	
	nucleon_style: {
		color: undefined,
		radius: undefined,
		lineWeight: undefined,
		attackColor: undefined,
	},
	
	nucleon_type: undefined,
	
	nucleon_hostileRadius: undefined,
	
	init: function() {
		
		this.requires('2D, PIXI, Wave');
		if ( Crafty.world.nucleons ) this.pixi_setContainer(Crafty.world.nucleons);
		
		this.nucleon_property = Crafty.clone({
			speed: PROPERTY.SPEED.MIN,
			flavor: PROPERTY.FLAVOR.CONCISE,
			capacity: PROPERTY.CAPACITY.MIN,
			entanglement: PROPERTY.ENTANGLEMENT.MIN,
			damage: PROPERTY.DAMAGE.MIN,
			range: PROPERTY.RANGE.MIN,
			health: PROPERTY.HEALTH.MIN,
		});
		this.nucleon_setProperty();
		
		this.nucleon_style = Crafty.clone({
			color: 0xc8c8c8,
			radius: 10,
			lineWeight: 2,
			attackColor: 0xff0044,
		});
		this.nucleon_setGraphics();
		
		this.pixi_setInteractive( true, true );
		this.attr({ w: this.nucleon_style.radius*1.5, h: this.nucleon_style.radius*1.5});
		this.pixi_setHitArea();
		
		this.bind( 'Move', function(data) {
			if ( data._x != this.x || data._y != this.y ) {
				this.wave_setGoal( this.x, this.y );
				this.wave_setHostileArea( this.x, this.y );
			}
		} );
		
		this.bind( 'PixiDrag', function(data) {
			
			var localPosition = data.getLocalPosition(this.pixi_object.parent);
			this.x = localPosition.x;
			this.y = localPosition.y;
			
			var left = 0; if ( this.x < left ) this.x = left;
			var right = Crafty.world.w; if ( this.x > right ) this.x = right;
			var top = 0; if ( this.y < top ) this.y = top;
			var bottom = Crafty.world.h; if ( this.y > bottom ) this.y = bottom;
			
		} );
		
		this.bind( 'WaveHealthChanged', function() { 
			this.nucleon_setGraphics();
		} );
		
		this.bind( 'WaveDead', this.destroy );
		this.bind( 'WorldZoomChanged', this.nucleon_setZoom );
		
	},
	
	nucleon_setProperty: function() {
		this.wave_property = {
			speed: this.nucleon_property.speed,
			flavor: this.nucleon_property.flavor,
			capacity: this.nucleon_property.capacity,
			damage: this.nucleon_property.damage,
			range: this.nucleon_property.range,
			health: this.nucleon_property.health,
		};
		this.wave_setProperty();
	},
	
	nucleon_setGraphics: function() {	
		
		var graphics = new PIXI.Graphics();
		
		graphics.beginFill(0xffffff);
		graphics.drawCircle( 0, 0, this.nucleon_style.radius+this.nucleon_style.lineWeight );	
		graphics.beginFill(this.nucleon_style.color);
		graphics.drawCircle( 0, 0, this.nucleon_style.radius );
		graphics.beginFill(0xffffff);
		graphics.drawCircle( 0, 0, this.nucleon_style.radius*(1-this.wave_health) );
		graphics.endFill();		
		
		this.pixi_setGraphics(graphics);
		
		this.nucleon_setZoom();
		
		this.wave_style.lineColor = this.nucleon_style.color;
		this.wave_style.fillColor = this.nucleon_style.color;
		this.wave_style.attackColor = this.nucleon_style.attackColor;
		this.wave_setGraphics();
		
	},
	nucleon_setZoom: function(data) {
		var zoom = data ? 1/data.zoom : 1/Crafty.world.getZoom();
		this.pixi_graphics.scale.x = this.pixi_graphics.scale.y = zoom;
		this.attr({ w: this.nucleon_style.radius*1.5*zoom, h: this.nucleon_style.radius*1.5*zoom});
		this.pixi_setHitArea();		
	},
	
	nucleon_fillWave: function() {
		for ( var i = this.flock_boids.length; i < this.wave_property.capacity; i++ ) {
			var particle = Crafty.e("2D, PIXI, Boid, Particle").attr({ x: this.x+Math.random(), y: this.y+Math.random() }); //NOTE: Random needed, othewise won't spawn, for some reason.
			this.wave_addParticle(particle);
		}
	},

});
