Crafty.c('Particle', {
	
	particle_wave: undefined,
	
	init: function() {
		
		this.requires('2D, PIXI, Boid');
		
		this.particle_setGraphics();
		
	},
	
	particle_setGraphics: function() {	
		
		var graphics = new PIXI.Graphics();
		
		var fillColor, fillAlpha;
		var lineColor, lineAlpha, lineWeight;
		var radius;	
		
		if ( this.particle_wave ) {
			fillColor = this.particle_wave.wave_fillColor;
			fillAlpha = this.particle_wave.wave_fillAlpha;			
			lineColor = this.particle_wave.wave_lineColor;
			lineAlpha = this.particle_wave.wave_lineAlpha;		
			lineWeight = this.particle_wave.wave_lineWeight;
			radius = this.particle_wave.wave_radius;
		} else {
			fillColor = 0xffffff;
			fillAlpha = 0;			
			lineColor = 0xc8c8c8;
			lineAlpha = 1;		
			lineWeight = 1;	
			radius = 2;	
		}
		
		graphics.beginFill( fillColor, fillAlpha );
		graphics.lineStyle( lineWeight, lineColor, lineAlpha );
		graphics.drawCircle( 0, 0, radius );	
		graphics.endFill();
		
		this.pixi_setGraphics(graphics);
		
	},
	
});

Crafty.c('Wave', {


	init: function() {
		
		this.requires('Flock');
		
	}
	
});
