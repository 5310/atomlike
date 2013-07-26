window.onload = function() {
	
    // Start Crafty.
    Crafty.init(800, 480);
    
    // Start Pixi.
    Crafty.pixi.init(800, 480);
    
    // Tests.
    
    f = Crafty.e("Flock");
    for ( var c = 50; c > 0; c-- ) {
        var b = Crafty.e("2D, PIXI, Boid, Particle");
        b.attr({ x: Math.random()*800, y: Math.random()*480 });
        f.flock_addBoid(b);
        /*var eg = new PIXI.Graphics();
        eg.lineStyle(2, 0xc8c8c8);
        eg.drawCircle( 0, 0, 5 );
        b.pixi_setGraphics(eg);*/
    }
    
    e = Crafty.e("2D, PIXI, PolyK").attr({x: 300, y: 240, w: 200, h: 20, rotation: 90});
    e.pixi_setGraphics();
    e.pixi_setInteractive( true, true );
    e.pixi_setHitArea();
    e.polyk_setPolygon();
    
    d = Crafty.e("2D, PIXI, PolyK, Barrier").attr({x: 500, y: 240, w: 200, h: 20, rotation: 90});
    
    c = Crafty.e("2D, PIXI, PolyK, Barrier").attr({x: 500, y: 240, w: 100, h: 100, rotation: 45});
    
    /*graphics = new PIXI.Graphics();
    Crafty.pixi.container.addChild(graphics);
    graphics.beginFill(0xAA0000);
    graphics.drawCircle(100, 100, 200);
    graphics.interactive = true;
    graphics.hitArea = new PIXI.Rectangle(-100, -100, 200, 200);
    graphics.drag = false;
    graphics.mousedown = graphics.touchstart = function(data) {
	console.log(data);
    };*/
	
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
