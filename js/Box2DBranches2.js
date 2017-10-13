/**
 * Created by franklinhc on 9/24/15.
 */


function Branches2(x, y) {
  var x = x;
  var y = y;
  this.myAxes = [];

 this.bufferPoints = [0, 90, 76, 90, 76, 90, 144, 111, 144, 111, 156, 137, 156, 137, 154, 114, 191, 123, 146, 105, 146, 105, 172, 97, 172, 97, 140, 101,  140, 101, 111, 98, 111, 98, 231, 88, 231, 88, 251, 128, 251, 128, 244, 95, 244, 95, 303, 121, 303, 121, 281, 106, 281, 106, 302, 103, 302, 103, 268, 99, 268, 99, 246, 86, 246, 86, 319, 85, 331, 85, 404, 82, 404, 82, 306, 80, 306, 80, 340, 50, 340, 50, 296, 80, 296, 80, 168, 77, 168, 77, 243, 49, 243, 49, 276, 51, 276, 51, 254, 45, 254, 45, 278, 35, 278, 35, 204, 57, 204, 57, 230, 0, 230, 0, 198, 58, 198, 58, 141, 78, 141, 78, 0, 76];


  if (this.bufferPoints.length % 4 != 0) {
    console.log("Fehler im BufferPoints Array!");
  } else {
  for (var i=0; i<this.bufferPoints.length;i++) {
    if (i%2 == 0) this.bufferPoints[i] = this.bufferPoints[i]+x;
    if (i%2 !== 0) this.bufferPoints[i] = this.bufferPoints[i]+y;
  }

    for (var i=0; i<this.bufferPoints.length;i=i+4){
    this.myAxes.push(new BranchParts(this.bufferPoints[i],this.bufferPoints[i+1],this.bufferPoints[i+2],this.bufferPoints[i+3]));
  }
  }

    this.image = new Image();
    this.image.src = "img/branch_2.png";
   


    this.draw = function(ctx) {
        for (var i = 0; i < this.myAxes.length; ++i) {
            //this.myAxes[i].draw(ctx);
        }
        var ratio = ctx.canvas.width / this.image.width;
        ctx.drawImage(this.image, 0+x, 0+y, this.image.width, this.image.height);

    }; // end draw function


}
