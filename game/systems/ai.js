Crafty.extend({ai: {

	limit: undefined,
	age: undefined,
	pause: undefined,
	pauseMax: undefined,

	score: undefined,
	end: undefined,
	
	init: function() {
		
		Crafty.ai.limit = 6;
		Crafty.ai.age = 0;
		Crafty.ai.pause = 4;
		Crafty.ai.pauseMax = 60;
		
		Crafty.ai.score = 0,
	
		Crafty.bind( 'WorldEnterFrame', function(data) {
				if ( data.frame%(60*Crafty.ai.pause) == 0 ) {
					Crafty.ai.age++;
					Crafty.ai_pause+=2; Crafty.ai_pause%=(Crafty.ai.pauseMax+1);
					Crafty.ai.score+=Crafty.ai.age*10;
					if ( Crafty.ai.age > 0 && Crafty.ai.age <= 10 ) {
						Crafty.ai.create( Math.floor(Crafty.ai.age/2), 1 );
					} else if ( Crafty.ai.age > 10 && Crafty.ai.age <= 30 ) {
						Crafty.ai.create( 5+Math.floor((Crafty.ai.age-10)/2), 1 );
						Crafty.ai.create( 5+Math.floor((Crafty.ai.age-10)/2), 1 );
					} else if ( Crafty.ai.age > 30 && Crafty.ai.age <= 60 )  {
						for ( var i = Math.floor(Crafty.ai.age/10); i > 0 ; i-- ) {
							Crafty.ai.create( 5 + Crafty.ai.age - Math.floor(Crafty.ai.age/10)*10, 1 );						
						}
					} else {
						for ( var i = Math.floor(Crafty.ai.age/10); i > 0 ; i-- ) {
							Crafty.ai.create( 15, 1 );						
						}
					}
				}
				if ( data.frame%(60*Crafty.ai.pauseMax/2) == 0 ) {
					Crafty.ai.retarget();
					if ( Crafty('Nucleon Standard').length <= 0 ) Crafty.trigger('AIEnd');
				}
		} );
		
		Crafty.bind( 'EmitterDestroyed', function() {
			Crafty.ai.retarget();
		} );
		
		Crafty.bind( 'AIEnd', Crafty.ai.end );
	
	},
	
	create: function( c, s ) {
		
		if ( Crafty('Nucleon Anti').length >= Crafty.ai.limit ) return;
		
		var x = 0;
		var y = 0;
		var margin = 100;
		var side = Math.floor(Math.random()*4);
		switch(side) {
			case 0:
				x = Math.random()*Crafty.world.w;
				y = 0-Math.random()*margin;
				break;
			case 1:
				x = 0-Math.random()*margin;
				y = Math.random()*Crafty.world.h;
				break;
			case 2:
				x = Math.random()*Crafty.world.w;
				y = Crafty.world.h+Math.random()*margin;
				break;
			case 3:
				x = Crafty.world.w+Math.random()*margin;
				y = Math.random()*Crafty.world.h;
				break;
		}
		
		var nucleon = Crafty.e("2D, PIXI, Nucleon, Anti").attr({x:x,y:y})
		//nucleon.nucleon_property.damage = 2;
		nucleon.nucleon_property.speed = s;
		nucleon.nucleon_property.capacity = c;
		nucleon.nucleon_setProperty();
		nucleon.nucleon_fillWave();
		
		var emitters = Crafty('Emitter');
		
		if ( emitters.length > 1 ) {
			var emitter = Crafty(emitters[Math.floor(Math.random()*emitters.length)]);
			x = emitter.x;
			y = emitter.y;
		} else if ( emitters.length == 1 ) {
			x = emitters.x;
			y = emitters.y;
		} else {
				Crafty.trigger('AIEnd');
			}
		
		nucleon.attr({x:x,y:y});
		
	},
	
	retarget: function() {
		Crafty('Nucleon Anti').each(function() {
			
		var emitters = Crafty('Emitter');
		
			var x = Crafty.pixi.renderer.width/2;
			var y = Crafty.pixi.renderer.height/2;
		
			if ( Math.random() <= 0.25 ) {
				x = Math.random()*Crafty.world.w;
				y = Math.random()*Crafty.world.h;
			} else {
				if ( emitters.length > 1 ) {
					var emitter = Crafty(emitters[Math.floor(Math.random()*emitters.length)]);
					x = emitter.x;
					y = emitter.y;
				} else if ( emitters.length == 1 ) {
					x = emitters.x;
					y = emitters.y;
				} else {
					Crafty.trigger('AIEnd');
				}
			}
			
			this.attr({x:x,y:y}); 
			
		});
	},
	
	end: function() {
		var text = "Game Over: You've scored "+Math.ceil(Crafty.ai.score)+"points!";
		console.log(text);
		alert(text);
		Crafty.pause();
	}
	
}});
