function lifescore() {
    var lifetime;
    var positionX = canvas.width - 180;
    var positionY = 30;
    var hwidth = 150;
    var hwidth2 = 150;
    var hheight = 20;
    var life = 80;
    var maxLife = 80;
    var lifePercent = 100;
    var colorPicker = 0;
    var colorSwitch = false;
    var multiplier = 1;

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



    this.update = function(lifetime, food, position, collision, activeFireflies, gameEnd) {
        positionY = position - canvas.height+70;

        if (gameEnd == true) {} else {
            if (food == true) {
                // lifetime = lifetime - 1200;
                multiplier = 1 + activeFireflies / 5;
                life = life + (6 * multiplier);

            }
            lifetime = lifetime / 500;
            life = life - lifetime;
            if (collision == true) {
                life = life - 10;
                mainCharacterCollision = false;
            }

            // console.log("life: " + life);
            // console.log("hwidth: " + hwidth);
            lifePercent = convertToRange(life, [0, maxLife], [0, 100])
            if (life <= 0) {
                life = 0;
            }
            if (life >= maxLife) {
                life = maxLife;
            }

            //for drawing the rectangle
            hwidth = convertToRange(life, [0, maxLife], [0, 150])
            if (hwidth <= 0) {
                hwidth = 0;
            }
            if (hwidth >= 150) {
                hwidth = 150;
            }
        }
    };

    this.life = function() {
        // life = convertToRange(hwidth, [0, 150], [0, 100]);
        return life;
    }

    this.draw = function(ctx) {
        ctx.strokeStyle = "rgba(255, 255, 255, 1)";
        ctx.save();
        if (lifePercent > 30 || colorSwitch == false) {
            ctx.fillStyle = "rgba(17, 126, 113, 1)";
            ctx.save();
            colorPicker++;
            if (colorPicker % 15 == 0) {
                colorSwitch = true
            };
        } else {
            ctx.fillStyle = "rgba(222, 92, 9, 1)";
            ctx.save();
            colorPicker++;
            if (colorPicker % 15 == 0) {
                colorSwitch = false
            };
        }
        if (colorPicker > 90) {
            colorPicker = 0;
        }
        ctx.restore();
        ctx.beginPath();
        ctx.rect(positionX, positionY, hwidth, hheight);
        ctx.fill();
        ctx.closePath();

        ctx.restore();
        ctx.beginPath();
        ctx.rect(positionX, positionY, hwidth2, hheight);
        ctx.stroke();
        ctx.closePath();
    }

}
