/**
 * Created by franklinhc on 9/26/15.
 */

function Box2DDistantJoin ( world, obj1,  obj2,  freq, damp) {
    this.body1 = obj1.Object.GetBody();
    this.body2 = obj2.Object.GetBody();
    this.joint = new b2DistanceJointDef();
    this.joint.Initialize(this.body1, this.body2, this.body1.GetWorldCenter(), this.body2.GetWorldCenter());
    this.joint.frequencyHz = freq;
    this.joint.dampingRatio = damp;
    world.CreateJoint(this.joint);
    this.myColor = "rgba(51, 190, 0, 0.9)";

    this.draw = function(ctx) {
        //obj1.draw(ctx);
        //obj2.draw(ctx);
        this.drawLine(ctx, obj1.miX, obj1.miY, obj2.miX, obj2.miY, this.myColor);
    };

     this.drawLine = function (ctx, x1, y1, x2, y2, col) {
        ctx.strokeStyle = col;
        //ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }; // end function drawLine()
}