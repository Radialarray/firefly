/**
 * Created by franklinhc on 9/24/15.
 */


function Branches(x, y) {
  var x = x;
  var y = y;
  this.myAxes = [];

  this.bufferPoints = [1, 18, 271, 20, 271, 20, 288, 12, 288, 12, 280, 7, 280, 7, 289, 0, 289, 0, 303, 0, 303, 0, 304, 15, 304, 15, 297, 20, 297, 20, 307, 20, 307, 20, 310, 26, 310, 26, 180, 23, 180, 23, 204, 31, 204, 31, 201, 46, 201, 46, 185, 43, 185, 43, 181, 35, 181, 35, 187, 30, 187, 30, 169, 24, 169, 24, 0, 24];

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
    this.image.src = "img/branch_1.png";
    


    this.draw = function(ctx) {
        for (var i = 0; i < this.myAxes.length; ++i) {
            //this.myAxes[i].draw(ctx);
        }
        var ratio = ctx.canvas.width / this.image.width;
        ctx.drawImage(this.image, 0+x, 0+y, this.image.width, this.image.height);

    }; // end draw function


}
