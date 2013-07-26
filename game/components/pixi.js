Crafty.c('PIXI', {
	
	pixi_object: undefined,
	
	pixi_graphics: undefined,
	pixi_color: undefined,
	
	pixi_pressed: undefined,
	pixi_upTimer: undefined,
	pixi_downTimer: undefined,
	
	init: function() {
		
		this.requires('2D');
		
		this.pixi_object = new PIXI.DisplayObjectContainer();
		this.pixi_setContainer();
		
		this.pixi_color = 0x000000;
		
		this.bind( 'Move', this.pixi_move );
		this.bind( 'Rotate', this.pixi_rotate );
		
		this.pixi_pressed = false;
		this.pixi_upTimer = 0;
		this.pixi_downTimer = 0;
		this.bind( 'EnterFrame', function(data) {
			if ( this.pixi_pressed && this.pixi_downTimer >= 0 ) this.pixi_downTimer++ ;
			if ( !this.pixi_pressed ) this.pixi_upTimer++ ;
			if ( this.pixi_downTimer >= 1*60  ) {
				this.trigger('PixiLongPress');
				this.pixi_downTimer = -1;
			}
		} );
		var self = this;
		this.pixi_object.mousedown = this.pixi_object.touchstart = function(data)  {
			self.trigger('PixiDown', data);
			self.pixi_pressed = true;
			self.pixi_downTimer = 0;
		};
		this.pixi_object.mouseup = this.pixi_object.touchend = function(data)  {
			self.trigger('PixiUp', data);
			self.pixi_pressed = false;
			if ( self.pixi_downTimer > 0 ) {
				if ( self.pixi_upTimer <= 0.3 * 60 ) {
					self.trigger('PixiDoubleClick', data);
				} else {
					self.trigger('PixiClick', data);
				}
			}
			console.log(self.pixi_upTimer);
			self.pixi_upTimer = 0;
		};
		this.pixi_object.mousemove = this.pixi_object.touchmove = function(data)  {
			if ( self.pixi_pressed ) {
				self.trigger('PixiDrag', data);
				self.pixi_downTimer = -1;
			}
		};
		
		/*this.bind('PixiLongPress', function(){console.log('PixiLongPress');});
		this.bind('PixiDrag', function(){console.log('PixiDrag');});
		this.bind('PixiClick', function(){console.log('PixiClick');});
		this.bind('PixiDoubleClick', function(){console.log('PixiDoubleClick');});*/
		
	},
	
	pixi_setContainer: function(container) {
		var container = container ? container : Crafty.pixi.container;
		if ( this.pixi_object.parent !== container ) {
			if ( this.pixi_object.parent !== null ) this.pixi_object.parent.removeChild(this.pixi_object);
			container.addChild(this.pixi_object);
		}
	},
	
	pixi_setGraphics: function(graphics) {
		if ( !graphics ) {
			if ( this.pixi_object.children.length ) this.pixi_object.removeChild(this.pixi_graphics);
			this.pixi_graphics = new PIXI.Graphics();
			this.pixi_graphics.beginFill(this.pixi_color);
			this.pixi_graphics.drawRect( -this.w/2, -this.h/2, this.w, this.h );		
			this.pixi_graphics.endFill();
			this.pixi_object.addChild(this.pixi_graphics);
		} else {
			if ( this.pixi_object.children.length ) this.pixi_object.removeChild(this.pixi_graphics);
			this.pixi_graphics = graphics;
			this.pixi_object.addChild(this.pixi_graphics);
		}
	},
	
	pixi_setInteractive: function( interactive, buttonMode ) {
		this.pixi_object.interactive = !!interactive;
		this.pixi_object.buttonMode = !!buttonMode;
	},
	pixi_setHitArea: function( hitArea ) {
		if ( !hitArea ) {
			this.pixi_object.hitArea = new PIXI.Rectangle( -this.w/2, -this.h/2, this.w, this.h );
		} else {
			this.pixi_object.hitArea = hitArea;
		}
	},
	
	pixi_move: function(data) {
		
		this.pixi_object.position.x = this.x;
		this.pixi_object.position.y = this.y;
		
	},
	
	pixi_rotate: function(data) {
		this.pixi_object.rotation -= data.rad;	
	},
	
});
