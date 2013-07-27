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
	flock_orbit: undefined,
	flock_obstacle: undefined,
	
	flock_goal_weight: undefined,
	flock_separation_weight: undefined,
	flock_orbit_weight: undefined,
	flock_obstacle_weight: undefined,
	
	flock_inertia: undefined,
	
	init: function() {
		
		this.flock_boids = [];
		
		this.flock_speed = 2;
		
		this.flock_goal = { x: 400, y: 240 };
		this.flock_separation = 20;
		this.flock_orbit = 50;
		this.flock_obstacle = 50;
		
		this.flock_goal_weight = 0.1;
		this.flock_separation_weight = 1;
		this.flock_orbit_weight = 0;
		this.flock_obstacle_weight = 5;
		
		this.flock_inertia = 5;
		
		this.bind( 'WorldEnterFrame', this.flock_updateBoids );
		this.bind( 'Remove', this.flock_destroy );
		
	},
	
	flock_addBoid: function(boid) {
		if ( this.flock_boids.indexOf(boid) < 0 ) {
			this.flock_boids.push(boid);
			return true;
		} else {
			return false;
		}
	},
	
	flock_removeBoid: function(boid) {
		if ( this.flock_boids.indexOf(boid) >= 0 ) {
			this.flock_boids.splice(this.flock_boids.indexOf(boid), 1);	
			return true;	
		} else {
			return false;
		}
	},
	
	flock_updateBoids: function() {
		
		for ( var i in this.flock_boids ) {
			
			// Local iteration variables.
			var boid = this.flock_boids[i];
			var position = { x: boid.x, y: boid.y };
			
			// Calculating rule vectors.
			
			var goal = { x: 0, y: 0 };
			if ( this.flock_goal_weight ) {
				goal = Math.vecSub( this.flock_goal, position );
				goal = Math.vecMul( goal, this.flock_goal_weight/Math.vecMag(goal) );
			}
			
			var separation = { x: 0, y: 0 };
			if ( this.flock_separation_weight ) {
				separation = { x: 0, y: 0 };
				for ( var j in this.flock_boids ) {
					var otherPosition = { x: this.flock_boids[j].x, y: this.flock_boids[j].y };
					var distanceVector = Math.vecSub( otherPosition, position );
					var distance = Math.vecMag(distanceVector);
					if ( j != i && distance <= this.flock_separation ) {
						distanceVector = Math.vecMul( distanceVector, Math.pow((this.flock_separation/distance)/distance, 2) );
						separation = Math.vecSub( separation, distanceVector );
					}
				}
				separation = Math.vecMul( separation, this.flock_separation_weight );
			}
			
			var orbit = { x: 0, y: 0 };
			if ( this.flock_orbit_weight ) {
				orbit = { x: goal.x, y: goal.y };
				if ( orbit.x*orbit.y>0 ) {
					orbit = { x: -orbit.x, y: orbit.y };
				} else {
					orbit = { x: orbit.x, y: -orbit.y };
				}
				if ( Math.vecMag(goal) >= this.flock_orbit*this.flock_goal_weight ) {
					orbit = Math.vecMul( orbit, 0 );
				}
				orbit = Math.vecMul( orbit, this.flock_orbit_weight );
				//if ( Math.random() > 0.5 ) orbit = Math.vecMul( orbit, -1 );
			}
			
			var obstacle_ = { x: 0, y: 0 };
			if ( this.flock_obstacle_weight ) {
				obstacle = { x: 0, y: 0 };
				var self = this;
				Crafty("Barrier").each(function() {
					var raycast = this.polyk_raycast( boid.x, boid.y, boid.boid_velocity.x, boid.boid_velocity.y);
					if ( raycast && raycast.dist <= self.flock_obstacle ) {
						obstacle = Math.vecAdd( obstacle, Math.vecMul( raycast.refl, self.flock_speed*self.flock_obstacle_weight*Math.pow((1-(raycast.dist/self.flock_obstacle)), 2) ) );
					}
				});
			}
			
			// Aggregating rule vectors.
			
			/*boid.boid_velocity = Math.vecMul( boid.boid_velocity, this.flock_inertia );
			
			boid.boid_velocity = Math.vecAdd( boid.boid_velocity, goal );
			boid.boid_velocity = Math.vecAdd( boid.boid_velocity, separation );
			boid.boid_velocity = Math.vecAdd( boid.boid_velocity, cohesion );
			boid.boid_velocity = Math.vecAdd( boid.boid_velocity, orbit );
			boid.boid_velocity = Math.vecAdd( boid.boid_velocity, obstacle );*/
			
			var newVelocity = { x: 0, y: 0 };
			newVelocity = Math.vecAdd( newVelocity, goal );
			newVelocity = Math.vecAdd( newVelocity, separation );
			newVelocity = Math.vecAdd( newVelocity, orbit );
			newVelocity = Math.vecAdd( newVelocity, obstacle );
			
			// Applying rule vectors to boid.
			
			boid.boid_velocity = Math.vecAdd( boid.boid_velocity, newVelocity );
			
			// Applying rule vectors to boid by polar interpolation steering.
			/*var newVelocityPolar = Math.toPolar(newVelocity);
			var velocityPolar = Math.toPolar(boid.boid_velocity);
			//velocityPolar.r = ( ((((newVelocityPolar.r-velocityPolar.r) % (Math.PI*2)) + (Math.PI*3)) % (Math.PI*2)) - Math.PI ) * this.flock_inertia;
			velocityPolar.r = velocityPolar.r + (newVelocityPolar.r-velocityPolar.r)*this.flock_inertia;
			velocityPolar.d = velocityPolar.d + (newVelocityPolar.d-velocityPolar.d)*this.flock_inertia;
			//boid.boid_velocity = Math.toCart(newVelocityPolar);
			boid.boid_velocity = Math.toCart(velocityPolar);*/
			
			// Limiting boid speed.
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
		
	},
	
	flock_destroy: function() {
		while( this.flock_boids.length ) {
			this.flock_boids[0].destroy();
		}
	},
	
});
