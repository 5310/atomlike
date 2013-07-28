Crafty.c('Emitter', {
	
	emitter_radiusMax: undefined,
	emitter_radiusInner: undefined,
	
	emitter_health: undefined,
	emitter_healthMax: undefined,
	
	emitter_emit: undefined,
	
	init: function() {
		
		this.requires('2D, PIXI');
		if ( Crafty.world.particles ) this.pixi_setContainer(Crafty.world.particles);
		
		this.emitter_radiusMax = 50;
		this.emitter_radiusInner = 20;
		
		this.emitter_health = this.emitter_healthMax = 50;
		
		this.emitter_emit = 1*60;
		
		this.emitter_setGraphics();
		
		this.bind( 'Remove', this.emitter_destroy );
		this.bind( 'WorldEnterFrame', this.emitter_createParticle );
		
	},
	
	emitter_setGraphics: function() {
		
		var graphics = new PIXI.Graphics();		
		
		var	lineColor = 0xc8c8c8;
		
		graphics.lineStyle( 2, lineColor );
		graphics.drawCircle( 0, 0, this.emitter_radiusInner );	
		graphics.lineStyle( 1, lineColor, 0.5 );
		graphics.drawCircle( 0, 0, this.emitter_radiusInner + (this.emitter_radiusMax-this.emitter_radiusInner)*this.emitter_health/this.emitter_healthMax );	
		
		this.pixi_setGraphics(graphics);
		
	},
	
	emitter_createParticle: function(data) {
		
		if ( (data.frame+this[0])%this.emitter_emit == 0 && Math.random() <= this.emitter_health/this.emitter_healthMax ) {
			
			var margin = 5;
			var radius = this.emitter_radiusInner + (this.emitter_radiusMax-this.emitter_radiusInner)*this.emitter_health/this.emitter_healthMax;
			var area = new Crafty.circle( this.x, this.y, radius );
			var capacity = radius*this.emitter_health/this.emitter_healthMax;
			
			if ( capacity <= 0 ) return;
			Crafty("Particle").each(function() {
				if ( capacity <= 0 ) return;
				if ( area.containsPoint( this.x, this.y ) ) capacity--;
			});
			
			if ( capacity > 0 ) {
			
				var r = Math.random()*Math.PI*2;
				var d = this.emitter_radiusInner+margin + Math.random()*(radius-this.emitter_radiusInner-margin);
				
				var particle = Crafty.e("2D, PIXI, Boid, Particle, Nascent").attr({ x: this.x+Math.cos(r)*d, y: this.x-Math.sin(r)*d });
				
				Crafty.world.overlay.lineStyle( 1, 0xc8c8c8, 0.8 );									
				Crafty.world.overlay.moveTo( this.x, this.y );
				Crafty.world.overlay.lineTo( particle.x, particle.y );
				Crafty.world.overlay.lineStyle(0);
				Crafty.world.overlay.moveTo(0,0);
				
			}
			
		}
		
	},
	
	emitter_damage: function(damage) {
		this.emitter_health -= damage;
		this.emitter_setGraphics();
		if ( this.emitter_health <= 0 ) this.destroy();
	},
	emitter_destroy: function() {
		Crafty.world.overlay.beginFill(0xff0000);
		Crafty.world.overlay.drawCircle( this.x, this.y, 20 );
		Crafty.world.overlay.endFill();
	},
	
});
