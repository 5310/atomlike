Crafty.c('PolyK', {
	
	polyk_polygon: undefined,
	polyk_auto: undefined,
	
	init: function() {
		
		this.requires('2D');
		
		this.polyk_polygon = [];
		this.polyk_auto = true;
		this.polyk_setPolygon();
		
	},
	
	polyk_setPolygon: function( polygon ) {
		
		if ( polygon ) {
			
			this.polyk_polygon = polygon;
			this.polyk_auto = false;
			
		} else {
			
			this.polyk_auto = true;
			this.polyk_polygon = [
				-this.w/2, -this.h/2, 
				-this.w/2, this.h/2, 
				this.w/2, this.h/2, 
				this.w/2, -this.h/2
			];
			
		}
	},
	
	polyk_transformedPolygon: function() {
		
		if ( this.poly_auto ) this.polyk_setPolygon();
		
		var polygon = Crafty.clone(this.polyk_polygon);
		
		var s = Math.sin(Math.toRad(this.rotation));
		var c = Math.cos(Math.toRad(this.rotation));
		for ( var i = 0; i < polygon.length; i += 2 ) {
			var x = polygon[i] * c - polygon[i+1] * s;
			var y = polygon[i] * s + polygon[i+1] * c;
			x += this.x;
			y += this.y;
			polygon[i] = x;
			polygon[i+1] = y;
		}
		
		return polygon;
	},
	
	polyk_containsPoint: function( x, y ) {		
		return PolyK.ContainsPoint( this.polyk_transformedPolygon(), x, y );	
	},
	
	polyk_raycast: function( x, y, dx, dy ) {
		return PolyK.Raycast( this.polyk_transformedPolygon(), x, y, dx, dy );		
	},
	
	polyk_closestEdge: function( x, y ) {
		return PolyK.ClosestEdge( this.polyk_transformedPolygon(), x, y );
	},
	
});
