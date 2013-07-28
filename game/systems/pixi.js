Crafty.extend({pixi: {
	
	renderer: undefined,
	
	stage: undefined,
	
	container: undefined,
	
	init: function( width, height ) {
		
		var self = this;
		
		self.stage = new PIXI.Stage(0xABCDEF, true);
		
		self.renderer = PIXI.autoDetectRenderer(width, height, null, true);
		document.getElementById('px-stage').appendChild(self.renderer.view);
		
		requestAnimFrame( animate );
		function animate() {
			requestAnimFrame( animate );
			self.renderer.render(self.stage);
		}
		
		self.container = new PIXI.DisplayObjectContainer();
		self.stage.addChild(self.container);
		
		Crafty.pixi.center();
		
	},
	
	center: function() {
		
		var container = document.getElementById("px-stage");
		var canvas = Crafty.pixi.renderer.view;
		canvas.style.marginLeft = (( container.offsetWidth - canvas.offsetWidth )/2)+"px";
		canvas.style.marginTop = (( container.offsetHeight - canvas.offsetHeight )/2)+"px";
		window.onresize = Crafty.pixi.center;
		
	},
	
}});
