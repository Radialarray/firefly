window.onload = onReady; // first function call

// mouse position any time
var mouseX, mouseY;

var frameCounter;
var canvas;
var ctx;
// for frame rate
var filterStrength = 20;
var frameTime = 0,
    lastLoop = new Date,
    thisLoop;

// box2D world
var world;
var SCALE = 30;
var myFireflies = [];
var myFood = [];
var myLights = [];
var lightsOn = false;
var lastlightTimer = 0;
var lightExecuted = false;

var platformcount = 5;
var myBoundaries = [];
var myBranches = [];
var myBranches2 = [];
var myBranchPositions = [];
var distanceTooSmall = false;

var mainCharacter;
var radius = 20;
var windDirection = 0;

var mouseX, mouseY;
var button = false;
var enter = false;
var gameStarted = 0;
var gameEnd = false;

var spielerPositionArray = [];
var posX;
var posY;
var characterTail = [];
var characterTailObjects = [];
var tailAmount = 0;
var lastTailAmount = 0;
var characterLength = 0;


var attraction = false;

var collisions = 0;
var foodcollision;
var foodSwitch = 0;

var score = 0;
var food = 0;
var activeFireflies = 0;
var yCameraPos = 0;
var yBackgroundPos = 0;
var lastPosition = [];
var mainCharacterCollision = false;
var finishExplosion = false;


// box2D variables
var b2Vec2 = Box2D.Common.Math.b2Vec2,
    b2BodyDef = Box2D.Dynamics.b2BodyDef,
    b2Body = Box2D.Dynamics.b2Body,
    b2FixtureDef = Box2D.Dynamics.b2FixtureDef,
    b2Fixture = Box2D.Dynamics.b2Fixture,
    b2World = Box2D.Dynamics.b2World,
    b2MassData = Box2D.Collision.Shapes.b2MassData,
    b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape,
    b2CircleShape = Box2D.Collision.Shapes.b2CircleShape,
    b2DebugDraw = Box2D.Dynamics.b2DebugDraw,
    revoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef,
    b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef;

var matrix = [1, 0, 0, 1, 0, 0];


// do the translate
// but also save the translate in the matrix
function translate(x, y) {
    matrix[4] += matrix[0] * x + matrix[2] * y;
    matrix[5] += matrix[1] * x + matrix[3] * y;
    ctx.translate(x, y);
}

// converts Sourcerange to Destinationrange like Map function in Processing usw.
function convertToRange(value, srcRange, dstRange) {
    // value is outside source range return
    /*if (value < srcRange[0] || value > srcRange[1]) {
        return NaN;
    }*/

    var srcMax = srcRange[1] - srcRange[0],
        dstMax = dstRange[1] - dstRange[0],
        adjValue = value - srcRange[0];

    return (adjValue * dstMax / srcMax) + dstRange[0];
}

function lerp(a, b, t) {
    var len = a.length;
    if (b.length != len) return;

    var x = [];
    for (var i = 0; i < len; i++)
        x.push(a[i] + t * (b[i] - a[i]));
    return x;
}



function onReady() {
    // your inicialization code here  ----------------------------------------------
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    frameCounter = 0;
    canvas.addEventListener('mousedown', pick);
    canvas.addEventListener('mousemove', pick);

    document.onkeydown = function() {
        keyInput()
    };
    document.onkeyup = function() {
        keyInputUp()
    };

    // sounds
    foodcollision = document.createElement('AUDIO');
    foodcollision.src = "audio/noise3.mp3";


    img = new Image();
    img.src = "img/black.png"
        // setup world
    world = new b2World(
        new b2Vec2(0, 10) //gravity
        , true //allow sleep
    );

    mouseX = canvas.width / 2;
    mouseY = canvas.height / 2;

    mainCharacter = new MainCharacter(mouseX, canvas.height - radius, 3, radius, button, 5);



    // add "class" Background to our Game class
    background = new background();
    background2 = new background2();
    background3 = new background3();
    background4 = new background4();
    background5 = new background5();
    foreground = new foreground();

    // collision listener
    var listener = new Box2D.Dynamics.b2ContactListener;
    listener.BeginContact = function(contact) {
        var a = contact.GetFixtureA().GetBody().GetUserData();
        var b = contact.GetFixtureB().GetBody().GetUserData();
        // between additional Fireflies and Boundaries
        if ((a instanceof Box2DCircle && b instanceof Box2DBoundary) || (a instanceof Box2DBoundary && b instanceof Box2DCircle)) {
            if (a == myBoundaries[0] || b == myBoundaries[0] || a == myBoundaries[1] || b == myBoundaries[1] || a == myBoundaries[2] || b == myBoundaries[2]) {

            } else {
                if (a.attractMainCharacter == true) {
                    if (a instanceof Box2DCircle) a.collisionContact = true;
                }
                if (b.attractMainCharacter == true) {
                    if (b instanceof Box2DCircle) b.collisionContact = true;
                }
            }
        }

        // between additional Fireflies and Branches
        if ((a instanceof Box2DCircle && b instanceof BranchParts) || (a instanceof BranchParts && b instanceof Box2DCircle)) {
            if (a.attractMainCharacter == true) {
                if (a instanceof Box2DCircle) a.collisionContact = true;
            }
            if (b.attractMainCharacter == true) {
                if (b instanceof Box2DCircle) b.collisionContact = true;
            }
        }


        // between Main Character and Boundaries
        if ((a instanceof MainCharacterParts && b instanceof Box2DBoundary) || (a instanceof Box2DBoundary && b instanceof MainCharacterParts)) {
            if (a == myBoundaries[0] || b == myBoundaries[0] || a == myBoundaries[1] || b == myBoundaries[1] || a == myBoundaries[2] || b == myBoundaries[2]) {

            } else {
                if (a instanceof MainCharacterParts) a.collisionContact = true;
                if (b instanceof MainCharacterParts) b.collisionContact = true;
                mainCharacterCollision = true;
            }
        }

        // between Main Character and Branches
        if ((a instanceof MainCharacterParts && b instanceof BranchParts) || (a instanceof BranchParts && b instanceof MainCharacterParts)) {
            if (a instanceof MainCharacterParts) a.collisionContact = true;
            if (b instanceof MainCharacterParts) b.collisionContact = true;
            mainCharacterCollision = true;
        }
    };
    world.SetContactListener(listener);

    // adding a floor
    myBoundaries.push(new Box2DBoundary(canvas.width / 2, canvas.height + 10, canvas.width / 2, 10, 0));
    myBoundaries.push(new Box2DBoundary(-10, canvas.height, 10, background.getHeight(), 0));
    myBoundaries.push(new Box2DBoundary(canvas.width + 10, canvas.height, 10, background.getHeight(), 0));



    for (var gen = 0; gen < 0; gen++) {
        var platformX = Math.random() * 500;
        var platformY = Math.random() * 700;
        var myCurrentObj = new Box2DBoundary(platformX, platformY, 100, 10, 0)
        myBoundaries.push(myCurrentObj);
    }


    for (var i = 0; i < 70; i++) {
        var offsetY = 200;
        var x1 = convertToRange(Math.random() * canvas.width + 200, [canvas.width, 0], [0, canvas.width]);
        // var y1 = convertToRange(Math.random() * background.getHeight() + offsetY + (i * 10), [canvas.height, 0], [0, canvas.height]);
        var y1 = convertToRange(Math.random() * 200 + offsetY + i * 150, [canvas.height, 0], [0, canvas.height]);
        myBranchPositions.push({
            x: x1,
            y: y1
        });
    }

    // for (var i = 0; i < myBranchPositions.length; i++){
    //   var x1 = myBranchPositions[i].x;
    //   var y1 = myBranchPositions[i].y;
    //
    //   for (var ii = 0; ii < myBranchPositions.length; ii++) {
    //    if (ii == i){
    //
    //    } else {
    //       var x2 = myBranchPositions[ii].x;
    //       var y2 = myBranchPositions[ii].y;
    //
    //       var a = x1-x2;
    //       var b = y1-y2;
    //       var distance = Math.sqrt(a * a + b * b);
    //       var minDist = radius + 200;
    //       if(distance < minDist) {
    //         distanceTooSmall = true;
    //         // console.log(distance);
    //         var x1 = convertToRange(Math.random()*(canvas.width-branchWidth), [canvas.height, 0], [0, canvas.height]);
    //         var y1 = convertToRange(Math.random()*background.getHeight()+offsetY, [canvas.height, 0], [0, canvas.height]);
    //         myBranchPositions[({x:x1,y:y1})];
    //       }
    //     }
    //   }
    // }

    for (var i = 0; i < myBranchPositions.length; i++) {
        var randomizer = Math.random();
        if (randomizer > 0.5) {
            var myCurrentObj = new Branches(myBranchPositions[i].x, myBranchPositions[i].y);
            myBranches.push(myCurrentObj);
        } else {
            var myCurrentObj = new Branches2(myBranchPositions[i].x, myBranchPositions[i].y);
            myBranches2.push(myCurrentObj);
        }
    }

    //create fireflies
    for (var i = 0; i < 50; i++) {
        var rand = Math.random();
        if (rand > 0.5) {
            var myZs = rand * 5 + 6;
        } else {
            var myZs = rand * 10 + 5;
        }
        var myXs = Math.random() * canvas.width;
        var myCurrentObj = new Box2DCircle(myXs, convertToRange(Math.random() * background.getHeight(), [canvas.height, 0], [0, canvas.height]), myZs);
        myFireflies.push(myCurrentObj);
    }


    //create Food
    for (var i = 0; i < 100; i++) {
        var offsetY = 200;
        var myZs = Math.random() * 2 + 5;
        var myXs = Math.random() * canvas.width;
        var myYs = convertToRange(Math.random() * background.getHeight() + offsetY, [canvas.height, 0], [0, canvas.height]);
        var myCurrentObj = new Box2DFood(myXs, myYs, myZs);
        myFood.push(myCurrentObj);
    }

    //create Lights
    for (var i = 0; i < 5; i++) {
        var offsetY = 200;
        var myZs = Math.random() * 2 + 5;
        var myXs = Math.random() * canvas.width;
        var myYs = convertToRange(Math.random() * background.getHeight() + offsetY, [canvas.height, 0], [0, canvas.height]);
        var myCurrentObj = new Light(myXs, myYs, myZs);
        myLights.push(myCurrentObj);
    }

    gui = new gui();

    draw();

    console.log("ready to go!");
} // end onReady()


// your drawing code here ---------------------------------------------------
function draw() {
    //ctx.translate(0,1);
    // var stereoPos = convertToRange(posX, [0, canvas.width], [5, -5]);
    // console.log(stereoPos);
    // backgroundPan.pos(stereoPos,0,0);

    var thisFrameTime = (thisLoop = new Date) - lastLoop;
    // for background
    ctx.fillStyle = "#1d5351"; // dark gray
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#1D5451";
    var fillRectHeight = 10000;
    ctx.fillRect(0, ctx.canvas.height - fillRectHeight, ctx.canvas.width, fillRectHeight);
    background.draw(ctx);
    background2.draw(ctx, matrix[5] / 2);
    background3.draw(ctx, matrix[5] / 4);
    background4.draw(ctx, matrix[5] / 4);
    background5.draw(ctx, matrix[5] / 2);
    // drawing boundaries
    for (var ii = 0; ii < myBoundaries.length; ii++) {
        myBoundaries[ii].draw(ctx);
    }


    // drawing Food
    for (var i = 0; i < myFood.length; i++) {
        myFood[i].draw(ctx);
        if (myFood[i].done()) {
            myFood.splice(i, 1);
        }
    }

    // drawing Food
    for (var i = 0; i < myLights.length; i++) {
        myLights[i].draw(ctx);
        if (myLights[i].done()) {
            myLights.splice(i, 1);
        }
    }

    if (posX - radius <= 1 || posX + radius >= canvas.width - 1) {
        mainCharacter.applyImpulse(windDirection, 0);
    }
    if (button == true) {
        /*    var bufferPosY = posY
            var power = convertToRange(bufferPosY, [0, canvas.height], [0.2, 0.5]);
            if (bufferPosY < 350) {
                power = 0.28;
            }*/
        var power = 0.09;
        mainCharacter.applyImpulse(windDirection, power);
    }

    spielerPositionArray = mainCharacter.spielerPosition();
    posX = Math.floor(spielerPositionArray[0]);
    posY = Math.floor(spielerPositionArray[1]);
    //console.log(posY);
    var buffer = convertToRange(posY, [canvas.height, 0], [0, canvas.height]);
    var cartesianPosY = convertToRange(posY, [canvas.height, 0], [0, canvas.height]);

    var lastPositionNow = buffer - lastPosition.pop();
    //console.log(lastPositionNow);
    if (cartesianPosY > canvas.height / 2) {
        if (lastPositionNow > -100) {
            // start translation after player got to the middle of the screen
            translate(0, lastPositionNow);
        }
    }
    lastPosition.push(buffer);

    // drawing and removing Fireflies
    for (var i = 0; i < myBranches.length; i++) {
        myBranches[i].draw(ctx);
    }

    for (var i = 0; i < myBranches2.length; i++) {
        myBranches2[i].draw(ctx);
    }

    if (characterTail.length > characterLength * 3 + 7) {
        for (var i = 0; i < characterTailObjects.length; i++) {
            characterTailObjects[i].update(characterTail[7 + i * 3][0], characterTail[7 + i * 3][1]);
            characterTailObjects[i].draw(ctx, i);
        }
    }

    // drawing and moving Maincharacter
    mainCharacter.draw(ctx);
    //mainCharacter.setLocation(mouseX, mouseY);


    // removing food near to maincharacter
    for (var i = 0; i < myFood.length; i++) {
        var a = posX - (myFood[i].miX + myFood[i].rad);
        var b = posY - (myFood[i].miY + myFood[i].rad);
        var distance = Math.sqrt(a * a + b * b);
        var minDist = radius + 30;
        if (distance < minDist) {
            a = convertToRange(a, [-60, 60], [0.01, -0.01]);
            console.log(a);
            myFood[i].removeBody();
            myFood.splice(i, 1);
            // foodcollision.play();
            foodSwitch = Math.round(Math.random() * 2);
            console.log(foodSwitch);
            switch (foodSwitch) {
                case 0:
                    smack1.stereo(a);
                    smack1.play();
                    break;
                case 1:
                    smack2.stereo(a);
                    smack2.play();
                    break;
                case 2:
                    smack3.stereo(a);
                    smack3.play();
                default:
                    smack1.stereo(a);
                    smack1.play();
            }
            foodSwitch++;
            if (foodSwitch > 2) {
                foodSwitch = 0;
            }
            food = true;
            //console.log(food);
        }
    }

    // removing Lights near to maincharacter
    for (var i = 0; i < myLights.length; i++){
      var a = posX - (myLights[i].miX + myLights[i].rad);
      var b = posY - (myLights[i].miY + myLights[i].rad);
      var distance = Math.sqrt(a * a + b * b);
      var minDist = radius + 30;
      if (distance < minDist) {
        myLights[i].removeBody();
        myLights.splice(i, 1);
        lightsOn = true;
        console.log("light on" + lightsOn);
      }
    }



    if (food == true) {
        tailAmount++;
    }

    if (tailAmount != lastTailAmount && tailAmount <= 6) {
        characterLength = characterTailObjects.length;
        var size = Math.random() * 5 + 4;
        if (size == radius) {
            size = radius;
        }
        characterTailObjects.push(new MainCharacterTail(Math.random() * posX, Math.random() * posY, size));
        // characterTailObjects[i] = new MainCharacterTail(Math.random() * posX, Math.random() * posY, i * 5);
        lastTailAmount = tailAmount;
    }

    characterTail.push(mainCharacter.spielerPosition());

    if (characterTail.length > characterLength * 3 + 8) {
        characterTail.shift();
    }



    // drawing and removing Fireflies
    for (var i = 0; i < myFireflies.length; i++) {
        myFireflies[i].draw(ctx);
        if (myFireflies[i].done()) {
            myFireflies.splice(i, 1);
        }
    }


    // get the position of each element and check the distance between them
    for (var i = 0; i < myFireflies.length; i++) {

        var a = posX - myFireflies[i].miX;
        var b = posY - myFireflies[i].miY;
        distance = Math.sqrt(a * a + b * b);
        //console.log(distance);

        var minDist = radius + 80;
        if (distance < minDist || myFireflies[i].attractMainCharacter == true && finishExplosion == false) {
            // attract other fireflies
            //for (var i = 0; i < myFireflies.length; i++) {
            if (myFireflies[i].collisionContact == false) {
                myFireflies[i].attraction(posX, posY);
                myFireflies[i].attractMainCharacter = true;
            }
        }
    }



    // Multipliziert den Highscore
    for (var i = 0; i < myFireflies.length; i++) {
        if (myFireflies[i].attractMainCharacter == true && myFireflies[i].collisionContact == false && myFireflies[i].alreadyMultiplied == false) {
            activeFireflies++;
            //console.log(activeFireflies);
            myFireflies[i].alreadyMultiplied = true;
        }

        if (myFireflies[i].attractMainCharacter == true && myFireflies[i].collisionContact == true && myFireflies[i].alreadyMultiplied == true && myFireflies[i].dead == false) {
            activeFireflies--;
            myFireflies[i].dead = true;
        }
        //console.log(activeFireflies);
    }

    foreground.draw(ctx, matrix[5] / 6);


    // for overlay
    if (lightsOn == true && lightExecuted == false) {
        lastlightTimer = frameCounter;
        lightExecuted = true;
    }

    if (frameCounter - lastlightTimer >= 240) {
        lightsOn = false;
        lightExecuted = false;
    }

    if (lightsOn == false) {
        var scale = 0.7 + cartesianPosY / 2500 + activeFireflies / 5;
        ctx.globalAlpha = 0.91;
        ctx.drawImage(img, (canvas.width - img.width * scale) / 2 + posX - canvas.width / 2, (canvas.height - img.height / 2 * scale) - cartesianPosY, img.width * scale, img.height * scale);
        ctx.globalAlpha = 1;
    }

    var life = lifescore.life();


    var matrixValue = convertToRange(matrix[5], [0, canvas.height], [canvas.height, 0])


    if (gameStarted == 0) {} else {
        gui.update(food, activeFireflies, thisFrameTime, matrixValue, mainCharacterCollision, life, cartesianPosY, frameCounter, gameEnd);
    }
    food = false;
    mainCharacter.collisionContact = false;


    if (cartesianPosY > (background.getHeight() - ((background.getHeight() / 10) * 2))) {
        for (var i = 0; i < myFireflies.length; i++) {
            myFireflies[i].damping(posX, posY);
        }
        finishExplosion = true;
    }

    if (cartesianPosY > (background.getHeight() - (background.getHeight() / 10))) {
        gameEnd = true;
    }

    if ((life <= 0 && gameover.gamelost == false) || gameStarted == 0) {
        gamestart.draw(ctx, cartesianPosY);
    } else if (life <= 0 && gameEnd == false) {
        gameover.draw(ctx, cartesianPosY, life);
    } else if (gameEnd == true) {
        winner.draw(ctx, cartesianPosY);
    } else {
        world.Step(
            1 / 60 //frame-rate
            , 10 //velocity iterations
            , 10 //position iterations
        );
    }

    if (enter == true && gameStarted > 1) {
        location.reload();
    }

    // frameRate calculating
    frameTime += (thisFrameTime - frameTime) / filterStrength;
    lastLoop = thisLoop;
    var fpsOut = document.getElementById('frameRate');
    // fpsOut.innerHTML = "current frame = " + frameCounter + "   currente frame rate = " + (1000 / frameTime).toFixed(1) + " fps";
    frameCounter += 1;
    requestAnimFrame(draw);
}



// for events  ---------------------------------------------------
function pick(event) {
    mouseX = event.layerX;
    mouseY = event.layerY;
    //mousePos = new b2Vec2(mouseX, mouseY);
    //console.log("mouse x = " + mouseX + "   mouse y = " + mouseY);
}

function keyInput(e) {
    event.preventDefault();
    e = e || window.event;
    switch (e.keyCode) {
        case 37: // left arrow
            button = true;
            windDirection = 180;
            break;
        case 38: // up arrow
            button = true;
            windDirection = 270;
            break;
        case 39: // right arrow
            button = true;
            windDirection = 0;
            break;
        case 40: // down arrow
            button = true;
            windDirection = 90;
            break;
        case 65: // "a"
            attraction = !attraction;
            break;
        case 90: // "z"
            button = true;
            break;
        case 32: // "SPACE"
            enter = true;
            gameStarted++;
            break;
    }
    //console.log("Button pressed = " + button);
}

function keyInputUp(e) {
    event.preventDefault();
    e = e || window.event;
    switch (e.keyCode) {
        case 37: // left arrow
            button = false;
            break;
        case 38: // up arrow
            button = false;
            break;
        case 39: // right arrow
            button = false;
            break;
        case 40: // down arrow
            button = false;
            break;
        case 65: // "a"
            button = false;
            break;
        case 90: // "z"
            button = false;
            break;
        case 32: // "SPACE"
            enter = false;
            break;
    }
    //console.log("Button unpressed = " + button);
}


// for animation request  ---------------------------------------------------
window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function( /* function */ callback, /* DOMElement */ element) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
