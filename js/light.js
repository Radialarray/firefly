function Light(x, y, r) {
    var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    var b2BodyDef = Box2D.Dynamics.b2BodyDef;
    var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    var b2Body = Box2D.Dynamics.b2Body;
    var b2Vec2 = Box2D.Common.Math.b2Vec2;

    var groupFireflies = -1;

    this.rad = r;
    this.miX = 0;
    this.miY = 0;

    this.fixDef = new b2FixtureDef;
    this.fixDef.density = 1.0;
    this.fixDef.friction = 0.5;
    this.fixDef.restitution = 0.2;
    this.bodyDef = new b2BodyDef;
    this.bodyDef.type = b2Body.b2_staticBody;
    this.fixDef.shape = new b2CircleShape(r / SCALE);
    this.bodyDef.position.x = x / SCALE;
    this.bodyDef.position.y = y / SCALE;
    this.alpha = 0.3;

    this.fixDef.filter.groupIndex = groupFireflies;

    this.light = new Image();
    this.light.src = "img/lightbulb.png";

    this.Object = world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);

    this.Object.GetBody().SetUserData(this);

    this.update = function() {
        this.miX = this.Object.GetBody().GetPosition().x * SCALE;
        this.miY = this.Object.GetBody().GetPosition().y * SCALE;
        //console.log("miX = " + miX + "   miY = " + miY);
    };

    this.applyImpulse = function(degrees, power) {
        this.Object.GetBody().ApplyImpulse(
            new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power, Math.sin(degrees * (Math.PI / 180)) * power),
            this.Object.GetBody().GetWorldCenter());
    };

    this.attraction = function(x, y) {
        var target = new b2Vec2(x / SCALE, y / SCALE);
        var applyPoint = this.Object.GetBody().GetPosition();
        target.x -= applyPoint.x;
        target.y -= applyPoint.y;

        target.Normalize();

        var force = 0.1;
        target.x *= force;
        target.y *= force;

        this.Object.GetBody().ApplyImpulse(target, applyPoint);
    };

    this.draw = function(ctx) {
        this.update();

        ctx.drawImage(this.light, this.miX-this.light.width/2, this.miY-this.light.height/2, this.light.width, this.light.height);
    };

    this.contains = function(mousePVec) {
        return (this.fixDef.shape.TestPoint(this.Object.GetBody().GetTransform(), mousePVec));
    };

    this.removeBody = function() {
        world.DestroyBody(this.Object.GetBody());
    };

    this.done = function() {
        //console.log("miX = "+ miX +"   miY = "+ miY);
        if (this.miY > canvas.height + r || this.miX < -r || this.miX > canvas.width + r) {
            //if (miY > canvas.height + r) {
            world.DestroyBody(this.Object.GetBody());
            return true;
        }
        return false;
    };
} // end Box2DCircle
