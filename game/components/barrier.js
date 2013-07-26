Crafty.c('Barrier', {
	
	init: function() {
		
		this.requires('2D, PIXI, PolyK');
		if ( Crafty.pixi.barriers ) this.pixi_setContainer(Crafty.pixi.barriers);
		
		this.pixi_color = 0xdddddd;
		this.pixi_setGraphics();
		
		this.polyk_setPolygon();
		
		this.bind( 'Move', function(data) {
			if ( data._w != this.w || data._h != this.h ) {
				this.pixi_setGraphics();
				this.polyk_setPolygon();
			}
		} );
		
	}
	
});
