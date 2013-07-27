Crafty.extend({world: {
	
	w: undefined,
	h: undefined,
	
	background: undefined,
	
	particles: undefined,
	barriers: undefined,
	nucleons: undefined,
	
	overlay: undefined,
	
	pressed: undefined,
	mouseXOld: undefined,
	mouseYOld: undefined,
	
	init: function( width, height, x, y ) {
		
		if ( width !== undefined ) this.w = width; else this.w = Crafty.pixi.renderer.width;
		if ( height !== undefined ) this.h = height; else this.h = Crafty.pixi.renderer.height;
		if ( x !== undefined ) Crafty.pixi.container.position.x = x;
		if ( y !== undefined ) Crafty.pixi.container.position.y = y;
		
		this.background = new PIXI.Graphics(); Crafty.pixi.container.addChild(this.background);
		
		var self = this;
		self.background.beginFill(0xffffff);
		self.background.drawRect( 0, 0, self.w, self.h );
		self.background.endFill();
		
		this.background.interactive = true;
		this.background.hitArea = new PIXI.Rectangle( 0, 0, this.w, this.h );
		this.pressed = false;
		this.background.mousedown = this.background.touchstart = function(data)  {
			self.pressed = true;
			var localPosition = data.getLocalPosition(Crafty.pixi.stage);
			self.mouseXOld = localPosition.x;
			self.mouseYOld = localPosition.y;
		};
		this.background.mouseup = this.background.mouseupoutside = this.background.touchend = function(data)  {
			self.pressed = false;
		};
		this.background.mousemove = this.background.touchmove = function(data)  {
			if ( self.pressed ) {
				var localPosition = data.getLocalPosition(Crafty.pixi.stage);
				Crafty.pixi.container.position.x += localPosition.x-self.mouseXOld;
				Crafty.pixi.container.position.y += localPosition.y-self.mouseYOld;
				self.mouseXOld = localPosition.x;
				self.mouseYOld = localPosition.y;
			}
		};
		
		this.particles = new PIXI.DisplayObjectContainer(); Crafty.pixi.container.addChild(this.particles);
		this.barriers = new PIXI.DisplayObjectContainer(); Crafty.pixi.container.addChild(this.barriers);
		this.nucleons = new PIXI.DisplayObjectContainer(); Crafty.pixi.container.addChild(this.nucleons);
		
		this.overlay = new PIXI.Graphics(); Crafty.pixi.container.addChild(this.overlay);
		
		Crafty.bind( 'EnterFrame', function(data) {
			self.overlay.clear();
			Crafty.trigger('WorldEnterFrame', data);
		} );
		
		window.onscroll = function(data) {
			
		};
		
	},
	
	setZoom: function( f, centerX, centerY ) {
		var cx = centerX !== undefined ? centerX : Crafty.pixi.renderer.width/2;
		var cy = centerY !== undefined ? centerY : Crafty.pixi.renderer.height/2
		var dist = Math.vecSub( [ cx, cy ], [ Crafty.pixi.container.position.x, Crafty.pixi.container.position.y ] );
		var d = Math.vecMag(dist)/Crafty.pixi.container.scale.x*f;
		var r = Math.atan2( dist[0], dist[1] );
		var x = cx - Math.sin(r)*d;
		var y = cy - Math.cos(r)*d;
		Crafty.pixi.container.position.x = x;
		Crafty.pixi.container.position.y = y;
		Crafty.pixi.container.scale.x = Crafty.pixi.container.scale.y = f;
	},
	getZoom: function() {
		return Crafty.pixi.container.scale.x;
	},
	
}});
