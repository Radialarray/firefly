/**
 * Created by franklinhc on 9/5/15.
 */

function MainCharacterPartsKinematic(x, y, r, button) {
    var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    var b2BodyDef = Box2D.Dynamics.b2BodyDef;
    var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    var b2Body = Box2D.Dynamics.b2Body;
    var b2Vec2 = Box2D.Common.Math.b2Vec2;

    var groupFireflies = -1;
    var collisionContact = false;


    this.miX = 0;
    this.miY = 0;

    this.posX = 0;
    this.posY = 0;

    this.fixDef = new b2FixtureDef;
    this.fixDef.density = 0.1;
    this.fixDef.friction = 0.1;
    this.fixDef.restitution = 0.5;
    this.fixDef.filter.groupIndex = groupFireflies;


    this.bodyDef = new b2BodyDef;
    this.bodyDef.type = b2Body.b2_kinematicBody;
    this.fixDef.shape = new b2CircleShape(r / SCALE);
    this.bodyDef.position.x = x / SCALE;
    this.bodyDef.position.y = y / SCALE;

    this.Object = world.CreateBody(this.bodyDef).CreateFixture(this.fixDef);
    this.Object.GetBody().SetUserData(this);

    this.update = function() {
        this.miX = posX;
        this.miY = posY;

        // don't let player leaves the world's boundary
        if (this.miX > canvas.width) {
            this.miX = canvas.width;
        }
        if (this.miX < 0) {
            this.miX = 0;
        }

/*
        if (this.miY < canvas.height / 4) {
            this.miY = canvas.height / 4;
            var vel = b2Vec2.Make(0, 1);
            this.SetLinearVelocity(vel);
            //console.log(this.GetLinearVelocity());
            //console.log("miX = " + this.miX + "   miY = " + this.miY);
        }
*/
    };



    this.spielerPosition = function() {

        if (this.miX > canvas.width) {
            this.miX = canvas.width;
        }
        if (this.miX < 0) {
            this.miX = 0;
        }
/*
        if (this.miY < canvas.height / 4) {
            this.miY = canvas.height / 4;
            console.log()
        }*/
        /*
        this.velocity = new b2Vec2(0 ,0);
        this.SetLinearVelocity(this.velocity);
        */

    this.posX = this.miX;
    this.posY = this.miY;
    //console.log("posX: " + posX + " posY: " + posY);
    return [this.posX, this.posY];
};


this.applyImpulse = function(degrees, power) {
    this.Object.GetBody().ApplyImpulse(
        new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power, Math.sin(degrees * (Math.PI / 180)) * power),
        this.Object.GetBody().GetWorldCenter());
};

this.draw = function(ctx) {
    this.update();
    var alpha = 0.8;
    ctx.fillStyle = "rgba(207, 210, 47, 0.73)";
    ctx.beginPath();
    ctx.arc(this.miX, this.miY, r, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
};

this.contains = function(mousePVec) {
    return (this.fixDef.shape.TestPoint(this.Object.GetBody().GetTransform(), mousePVec));
};


this.setLocation = function(xA, yA) {
    var posAhora = new b2Vec2(xA / SCALE, yA / SCALE);
    this.Object.GetBody().SetPosition(posAhora);
};

this.SetAngularVelocity = function(a) {
    this.Object.GetBody().SetAngularVelocity(a);
};

this.SetLinearVelocity = function(vec) {
    this.Object.GetBody().SetLinearVelocity(vec);
};

this.GetLinearVelocity = function() {
    return this.Object.GetBody().GetLinearVelocity();
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
}
