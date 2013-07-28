window.onload = function() {
	
    // Start Systems.
    Crafty.init(800, 480);
    Crafty.pixi.init(800, 480);
    Crafty.world.init( 1200, 1200); Crafty.world.setZoom(0.5); Crafty.pixi.container.position.y = -60;
    Crafty.ai.init();
    
    
    // Create barriers.
    Crafty.e('Barrier').attr({x: 225, y: 1075, w: 250, h: 50, rotation: 0});
    Crafty.e('Barrier').attr({x: 125, y: 975, w: 50, h: 250, rotation: 0});
    
    Crafty.e('Barrier').attr({x: 975, y: 1075, w: 250, h: 50, rotation: 0});
    Crafty.e('Barrier').attr({x: 1075, y: 975, w: 50, h: 250, rotation: 0});
    
    Crafty.e('Barrier').attr({x: 225, y: 125, w: 250, h: 50, rotation: 0});
    Crafty.e('Barrier').attr({x: 125, y: 225, w: 50, h: 250, rotation: 0});
    
    Crafty.e('Barrier').attr({x: 975, y: 125, w: 250, h: 50, rotation: 0});
    Crafty.e('Barrier').attr({x: 1075, y: 225, w: 50, h: 250, rotation: 0});
    
    Crafty.e('Barrier').attr({x: 250, y: 600, w: 140, h: 140, rotation: 45});
    Crafty.e('Barrier').attr({x: 950, y: 600, w: 140, h: 140, rotation: 45});
    
    Crafty.e('Barrier').attr({x: 600, y: 600, w: 40, h: 40, rotation: 45});
    
    Crafty.e('Barrier').attr({x: 500, y: 700, w: 150, h: 50, rotation: -45});
    Crafty.e('Barrier').attr({x: 700, y: 700, w: 150, h: 50, rotation: 45});
    Crafty.e('Barrier').attr({x: 500, y: 500, w: 150, h: 50, rotation: 45});
    Crafty.e('Barrier').attr({x: 700, y: 500, w: 150, h: 50, rotation: -45});
    
    Crafty.e('Barrier').attr({x: 550, y: 975, w: 300, h: 50, rotation: 45});
    Crafty.e('Barrier').attr({x: 650, y: 225, w: 300, h: 50, rotation: 45});
    
    
    // Create emitters.
    
    Crafty.e('Emitter').attr({x: 250, y: 250, emitter_radiusMax: 75}).emitter_setGraphics();
    Crafty.e('Emitter').attr({x: 250, y: 950, emitter_radiusMax: 75}).emitter_setGraphics();
    Crafty.e('Emitter').attr({x: 950, y: 250, emitter_radiusMax: 75}).emitter_setGraphics();
    Crafty.e('Emitter').attr({x: 950, y: 950, emitter_radiusMax: 75}).emitter_setGraphics();
    
    Crafty.e('Emitter').attr({x: 600, y: 750, emitter_radiusMax: 50}).emitter_setGraphics();
    Crafty.e('Emitter').attr({x: 600, y: 450, emitter_radiusMax: 50}).emitter_setGraphics();
    Crafty.e('Emitter').attr({x: 750, y: 600, emitter_radiusMax: 50}).emitter_setGraphics();
    Crafty.e('Emitter').attr({x: 450, y: 600, emitter_radiusMax: 50}).emitter_setGraphics();
    
    
    // Create nucleons.
    
    Crafty.e('Nucleon, Standard').attr({x: 400, y: 400}).nucleon_fillWave();
    Crafty.e('Nucleon, Standard').attr({x: 400, y: 800}).nucleon_fillWave();
    Crafty.e('Nucleon, Standard').attr({x: 800, y: 400}).nucleon_fillWave();
    Crafty.e('Nucleon, Standard').attr({x: 800, y: 800}).nucleon_fillWave();

};
    
Math.toPolar = function(cart) {
    var polar = { r: 0, d: 0 };
    polar.r = Math.atan2( cart.y, cart.x );
    polar.d = Math.vecMag(cart);
    return polar;
}
Math.toCart = function(polar) {
    var cart = { x: 0, y: 0 };
    cart.x = polar.d*Math.cos(polar.r);
    cart.y = polar.d*Math.sin(polar.r);
    return cart;
}
Math.toRad = function(deg) {
    return deg*(Math.PI/180);
}
Math.toDeg = function(rad) {
    return rad*(180/Math.PI);
}
Math.vecMul = function( a, x ) {
    var c = [];
    for ( var i in a ) {
        c[i] = a[i]*x;
    }
    return c;
};
Math.vecAdd = function ( a, b ) {
    var c = [];
    for ( var i in a ) {
        c[i] = a[i] + b[i];
    }
    return c;
};
Math.vecSub = function ( a, b ) {
    var c = [];
    for ( var i in a ) {
        c[i] = a[i] - b[i];
    }
    return c;
};
Math.vecMag = function (a) {
    var m = 0;
    for ( var i in a ) {
        m += Math.pow( a[i], 2 );
    }
    return Math.sqrt(m);
};
