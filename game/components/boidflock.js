Crafty.c('Boid', {
	
	boid_velocity: undefined,
	
	init: function() {
		
		this.requires('2D');
		
		this.boid_velocity = {x: 0, y: 0};
		
	},
	
});

Crafty.c('Flock', {
	
	flock_boids: undefined,
	
	flock_speed: undefined,
	
	flock_goal: undefined,
	flock_separation: undefined,
	flock_alignment: undefined,
	
	flock_bearing_weight: undefined,
	flock_goal_weight: undefined,
	flock_separation_weight: undefined,
	flock_alignment_weight: undefined,
	flock_cohesion_weight: undefined,
	
	init: function() {
		
		this.flock_boids = [];
		
		this.flock_speed = 2;
		
		this.flock_goal = {x: 100, y: 100};
		this.flock_separation = 10;
		this.flock_alignment = 40;
		
		this.flock_bearing_weight = 0.5;
		this.flock_goal_weight = 0.02;
		this.flock_separation_weight = 0.05;
		this.flock_alignment_weight = 0.03;
		this.flock_cohesion_weight = 0.04;
		
		this.bind('EnterFrame', this.flock_updateBoids);
		
	},
	
	flock_addBoid: function(boid) {
		this.flock_boids.push(boid);
	},
	
	flock_updateBoids: function() {
		
		var center = { x: 0, y: 0 };
		for ( var i in this.flock_boids ) {
			center = Math.vecAdd( center, this.flock_boids[i] );
		}
		center = Math.vecMul( center, 1/this.flock_boids.length );
		
		for ( var i in this.flock_boids ) {
			
			var boid = this.flock_boids[i];
			var position = { x: boid.x, y: boid.y };
			
			var goal = Math.vecMul( Math.vecSub( this.flock_goal, position ), this.flock_goal_weight );
			var separation = { x: 0, y: 0 };
			var alignment = { x: 0, y: 0 };
			var cohesion = Math.vecMul( Math.vecSub( center, position ), this.flock_cohesion_weight );
			
			boid.boid_velocity = Math.vecMul( boid.boid_velocity, this.flock_bearing_weight );
			
			boid.boid_velocity = Math.vecAdd( boid.boid_velocity, goal );
			boid.boid_velocity = Math.vecAdd( boid.boid_velocity, separation );
			boid.boid_velocity = Math.vecAdd( boid.boid_velocity, alignment );
			boid.boid_velocity = Math.vecAdd( boid.boid_velocity, cohesion );
			
			var m = Math.vecMag(boid.boid_velocity);
			if ( m > this.flock_speed ) {
				boid.boid_velocity = Math.vecMul( boid.boid_velocity, this.flock_speed/m );
			}
			
		}
		
		for ( var i in this.flock_boids ) {
			var boid = this.flock_boids[i];
			boid.x += boid.boid_velocity.x;
			boid.y += boid.boid_velocity.y;
		}
		
	}
	
});
