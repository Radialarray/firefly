function BranchParts(x1, y1, x2, y2) {
    var screenX1 = x1;
    var screenY1 = y1;
    var screenX2 = x2;
    var screenY2 = y2;

    // changing to box2D coordinates
    var Box2Dx1 = x1 / SCALE;
    var Box2Dy1 = y1 / SCALE;
    var Box2Dx2 = x2 / SCALE;
    var Box2Dy2 = y2 / SCALE;

    var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    var b2BodyDef = Box2D.Dynamics.b2BodyDef;
    var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    var b2Body = Box2D.Dynamics.b2Body;
    var b2Vec2 = Box2D.Common.Math.b2Vec2;

    this.fixDef = new b2FixtureDef;
    this.fixDef.density = 1.0;
    this.fixDef.friction = 0.5;
    this.fixDef.restitution = 0.2;

    this.bodyDef = new b2BodyDef;
    this.bodyDef.type = b2Body.b2_staticBody;
    this.fixDef.shape = new b2PolygonShape;

    var punto1 = new b2Vec2(Box2Dx1, Box2Dy1);
    var punto2 = new b2Vec2(Box2Dx2, Box2Dy2);
    this.fixDef.shape.SetAsEdge(punto1, punto2);

    this.setCoordinates = function(x1, y1, x2, y2) {
      punto1.b2Vec2.Set((punto1.x + x1),(punto1.y+y1));
      punto2.b2Vec2.Set((punto2.x + x2),(punto2.y+y2));
    }

    this.returnCoordinates = function(){
      return punto1;
    }


    this.Object = world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);
    //console.log("screenX1 = " + screenX1 + "   screenY1 = " + screenY1);
    this.Object.GetBody().SetUserData(this);

    this.draw = function(ctx) {
        var alpha = 0.8;
        ctx.save();
        ctx.strokeStyle = "rgba(50, 50, 251, " + alpha + ")";

        ctx.beginPath();
        ctx.moveTo(screenX1, screenY1);
        ctx.lineTo(screenX2, screenY2);
        ctx.closePath();

        ctx.stroke();
        ctx.restore();

    };
}
