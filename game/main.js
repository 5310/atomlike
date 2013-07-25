window.onload = function() {
	
    // Start Crafty.
    Crafty.init(800, 480);
    
    // Start Pixi.
    Crafty.pixi.init(800, 480);
    
    // Tests.
    
    f = Crafty.e("Flock");
    
    for ( var c = 100; c > 0; c-- ) {
        var b = Crafty.e("2D, PIXI, Boid");
        b.attr({ w: 4, h: 4 });
        b.attr({ x: Math.random()*800, y: Math.random()*480 });
        b.pixi_setGraphics();
        f.flock_addBoid(b);
    }
    
    /*e = Crafty.e("2D, PIXI, PolyK").attr({x: 100, y: 100, w: 100, h: 50, rotation: 30});
    e.pixi_setGraphics();
    e.pixi_setInteractive( true, true );
    e.pixi_setHitArea();
    e.polyk_setPolygon();
    //console.log(e.polyk_polygon);
    //console.log(e.polyk_transformedPolygon());*/
    
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
