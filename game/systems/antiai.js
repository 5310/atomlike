Crafty.extend({antiai: {

	limit: undefined,
	age: undefined,
	pause: undefined,
	
	init: function() {
		
		Crafty.antiai.limit = 6;
		Crafty.antiai.age = 0;
		Crafty.antiai.pause = 1;
	
		Crafty.bind( 'WorldEnterFrame', function(data) {
			if ( data.frame%(60*Crafty.antiai.pause) == 0 ) {
				Crafty.antiai.age++;
				if ( Crafty.antiai.age > 0 && Crafty.antiai.age <= 10 ) {
					Crafty.antiai.create( Crafty.antiai.age, 1 );
				} else if ( Crafty.antiai.age > 10 && Crafty.antiai.age <= 30 ) {
					Crafty.antiai.create( 5+Math.floor((Crafty.antiai.age-10)/2), 1 );
					Crafty.antiai.create( 5+Math.floor((Crafty.antiai.age-10)/2), 1 );
				} else if ( Crafty.antiai.age > 30 && Crafty.antiai.age <= 60 )  {
					for ( var i = Math.floor(Crafty.antiai.age/10); i > 0 ; i-- ) {
						Crafty.antiai.create( 5 + Crafty.antiai.age - Math.floor(Crafty.antiai.age/10)*10, 1 );						
					}
				} else {
					for ( var i = Math.floor(Crafty.antiai.age/10); i > 0 ; i-- ) {
						Crafty.antiai.create( 15, 1 );						
					}
				}
			}
			if ( data.frame%(60*Crafty.antiai.pause*3) == 0 ) {
				Crafty.antiai.retarget();
			}
		} );
		
		Crafty.bind( 'EmitterDestroyed', function() {
			Crafty.antiai.retarget();
		} );
	
	},
	
	create: function( c, s ) {
		
		if ( Crafty('Nucleon Anti').length >= Crafty.antiai.limit ) return;
		
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
		nucleon.nucleon_property.damage = 2;
		nucleon.nucleon_property.speed = s;
		nucleon.nucleon_property.capacity = c;
		nucleon.nucleon_setProperty();
		nucleon.nucleon_style.radius = 0;
		nucleon.nucleon_style.lineWeight = 0;
		nucleon.nucleon_setGraphics();
		nucleon.nucleon_fillWave();
		
		var emitters = Crafty('Emitter');
		
		if ( emitters.length > 1 ) {
			var emitter = Crafty(emitters[Math.floor(Math.random()*emitters.length)]);
			x = emitter.x;
			y = emitter.y;
		} else if ( emitters.length == 1 ) {
			x = emitters.x;
			y = emitters.y;
		}
		
		nucleon.attr({x:x,y:y});
		
	},
	
	retarget: function() {
		Crafty('Nucleon Anti').each(function() {
			
		var emitters = Crafty('Emitter');
		
			var x = 0;
			var y = 0;
		
			if ( emitters.length > 1 ) {
				var emitter = Crafty(emitters[Math.floor(Math.random()*emitters.length)]);
				x = emitter.x;
				y = emitter.y;
			} else if ( emitters.length == 1 ) {
				x = emitters.x;
				y = emitters.y;
			}
			
			this.attr({x:x,y:y}); 
			
		});
	},
	
}});
