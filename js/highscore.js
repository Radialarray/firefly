  function highscore() {
      var points = 0;
      var multiplier = 1;
      var positionX = 30;
      var positionY = 50;
      var hwidth = 150;
      var hheight = 50;
      var foodcount = 10;
      var addend = 0;

      this.update = function(frameCounter, food, activeFireflies, position, collision) {
          positionY = position - canvas.height+90;
          multiplier = 1 + activeFireflies;

          // if ((frameCounter % 30) <= 0.1) {
          //     points = points + 1;
          // }

          if (food == true) {
              addend = foodcount * multiplier;
              points = points + addend;
          }
          if (collision == true) {
              points = points - foodcount/2;
          }
          //console.log(activeFireflies);
          if (points <= 0) {
              points = 0;
          }
      };

      this.points = function() {
          return points;
      }

      this.draw = function(ctx) {
          ctx.fillStyle = "#ffffff";
          ctx.font = "normal 35px webpixel bitmap_light";
          ctx.save();

          ctx.restore();
          ctx.fillText("Highscore: " + Math.floor(points), positionX, positionY);
      }

  }
