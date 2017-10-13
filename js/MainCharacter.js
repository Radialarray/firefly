/**
 * Created by franklinhc on 3/20/16.
 */

function MainCharacter ( x, y, p, r, button, myWidth) {
    var numFireflies = p;
    var myHeight = y;
    var step =  myWidth/numFireflies;
    var myX = x;

    var myMainCharacter = [];

    for (var i = 0; i < numFireflies+1; i++) {
        // First and last particles are fixed     x, y, r, button
        var currentStep;
        if (i == 0) currentStep = new MainCharacterParts(i+myX,myHeight,r,button);
        // else currentStep = new MainCharacterPartsKinematic(i+myX,myHeight,r/(i+0.1),button);
        myMainCharacter.push(currentStep);

/*
        // Connect the particles with a distance joint
        if (i > 0) {
            var ball1 = myMainCharacter[i-1];
            var ball2 = myMainCharacter[i];
            var myDistJoin = new Box2DDistantJoin (world, ball1, ball2, 24, 10);
        }

*/

    }

    this.update = function(pos) {
        myMainCharacter[0].miX = myMainCharacter[0].Object.GetBody().GetPosition().x * SCALE;
        myMainCharacter[0].miY = myMainCharacter[0].Object.GetBody().GetPosition().y * SCALE;


        // don't let player leaves the world's boundary
        if (myMainCharacter[0].miX+r > canvas.width) {
            myMainCharacter[0].miX = canvas.width-r;
        }
        if (myMainCharacter[0].miX-r < 0) {
            myMainCharacter[0].miX = 0+r;
        }

    /*
        if (this.myMainCharacter[0].miY < canvas.height / 4) {
            this.myMainCharacter[0].miY = canvas.height / 4;
            var vel = b2Vec2.Make(0, 1);
            this.myMainCharacter[0].SetLinearVelocity(vel);
            //console.log(this.GetLinearVelocity());
            //console.log("miX = " + this.miX + "   miY = " + this.miY);
        }
    */
    };



    this.spielerPosition = function() {

        if (myMainCharacter[0].miX+r > canvas.width) {
            myMainCharacter[0].miX = canvas.width-r;
        }
        if (myMainCharacter[0].miX-r < 0) {
            myMainCharacter[0].miX = 0+r;
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

    myMainCharacter[0].posX = myMainCharacter[0].miX;
    myMainCharacter[0].posY = myMainCharacter[0].miY;
    //console.log("posX: " + posX + " posY: " + posY);
    return [myMainCharacter[0].posX, myMainCharacter[0].posY];
    };


    this.applyImpulse = function(degrees, power) {
    myMainCharacter[0].Object.GetBody().ApplyImpulse(
        new b2Vec2(Math.cos(degrees * (Math.PI / 180)) * power, Math.sin(degrees * (Math.PI / 180)) * power),
        myMainCharacter[0].Object.GetBody().GetWorldCenter());
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

    this.draw = function(ctx) {
      this.update();
        // drawing MainCharacter
        for (var ii = 1; ii < myMainCharacter.length; ii++) {
          myMainCharacter[ii].draw(ctx);
        }
        myMainCharacter[0].draw(ctx);

    }

}
