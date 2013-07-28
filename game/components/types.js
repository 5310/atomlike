Crafty.c('Anti', {
	
	type: undefined,
	
	init: function() {
		
		this.type = 'Anti';
		
		if ( this.has('Nucleon') )	{
			
			this.nucleon_property = {
				speed: PROPERTY.SPEED.MIN,
				flavor: PROPERTY.FLAVOR.CONCISE,
				capacity: PROPERTY.CAPACITY.MIN,
				entanglement: PROPERTY.ENTANGLEMENT.MIN,
				damage: 2,
				range: PROPERTY.RANGE.MIN,
				health: PROPERTY.HEALTH.MIN,
			};
			this.nucleon_setProperty();
			
			this.nucleon_style = {
				color: 0x333333,
				radius: 10,
				lineWeight: 2,
				attackColor: 0xff0000,
			};
			this.nucleon_setGraphics();
			
		}	
		
		if ( this.has('Wave') )	{
			
			this.wave_hostileComponent = 'Standard';
			
			this.bind( 'WaveAddingParticle', function(data) {
				data.removeComponent(data.type);
				data.addComponent('Anti');
			} );
			
			this.bind( 'WaveRemovingParticle', function(data) {
				data.removeComponent('Anti');
				data.addComponent('Nascent');
			} );
			
			this.bind( 'WorldEnterFrame', function(data) {
				
			} );
			
		}
		
	},	
	
});

Crafty.c('Standard', {
	
	type: undefined,
	
	init: function() {
		
		this.type = 'Standard';
		
		if ( this.has('Nucleon') )	{
			
			this.nucleon_property = {
				speed: PROPERTY.SPEED.MIN,
				flavor: PROPERTY.FLAVOR.CONCISE,
				capacity: PROPERTY.CAPACITY.MAX,
				entanglement: PROPERTY.ENTANGLEMENT.MIN,
				damage: PROPERTY.DAMAGE.MIN,
				range: PROPERTY.RANGE.MIN,
				health: 2,
			};
			this.nucleon_setProperty();
			
			this.nucleon_style = {
				color: 0x6baff5,
				radius: 10,
				lineWeight: 2,
				attackColor: 0xff0000,
			};
			this.nucleon_setGraphics();
			
		}	
		
		if ( this.has('Wave') )	{
			
			this.wave_hostileComponent = 'Anti';
			
			this.bind( 'WaveAddingParticle', function(data) {
				data.removeComponent(data.type);
				data.addComponent('Standard');
			} );
			
			this.bind( 'WaveRemovingParticle', function(data) {
				data.removeComponent('Standard');
				data.addComponent('Nascent');
			} );
			
			this.bind( 'WorldEnterFrame', function(data) {
				
			} );
			
		}	
		
	},	
	
});

Crafty.c('Nascent', {
	
	type: undefined,
	
	init: function() {
		
		this.type = 'Nascent';
		
	},	
	
});
