/**
 * Created by franklinhc on 9/5/15.
 */

function Box2DCircle(x, y, r) {
    var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    var b2BodyDef = Box2D.Dynamics.b2BodyDef;
    var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    var b2Body = Box2D.Dynamics.b2Body;
    var b2Vec2 = Box2D.Common.Math.b2Vec2;

    var attractMainCharacter = false;
    var collisionContact = false;
    var alreadyMultiplied = false;
    var dead = false;

    var groupFireflies = -1;

    this.attractMainCharacter = false;
    this.collisionContact = false;
    this.alreadyMultiplied = false;
    this.dead = false;
    this.miX = 0;
    this.miY = 0;

    this.fixDef = new b2FixtureDef;
    this.fixDef.density = 0.2;
    this.fixDef.friction = 0.05;
    this.fixDef.restitution = 0.2;
    this.fixDef.filter.groupIndex = groupFireflies;


    this.bodyDef = new b2BodyDef;
    this.bodyDef.type = b2Body.b2_dynamicBody;
    this.fixDef.shape = new b2CircleShape(r / SCALE);
    this.bodyDef.position.x = x / SCALE;
    this.bodyDef.position.y = y / SCALE;
    this.alpha = 0.3;


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

        //target.Normalize();

        var force = 0.05;
        target.x *= force;
        target.y *= force;

        this.Object.GetBody().ApplyImpulse(target, applyPoint);
    };


    this.damping = function(x, y) {
        var target = new b2Vec2(x / SCALE, y / SCALE);
        var applyPoint = this.Object.GetBody().GetPosition();

        target.x -= applyPoint.x;
        target.y -= applyPoint.y;
        target.Normalize();
        var force = -0.05;
        target.x *= force;
        target.y *= force;

        this.Object.GetBody().ApplyForce(target, applyPoint);
    };


    this.draw = function(ctx) {
        this.update();
        ctx.fillStyle = "rgba(197, 224, 28, 0.89)";
        ctx.beginPath();
        ctx.arc(this.miX, this.miY, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
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
