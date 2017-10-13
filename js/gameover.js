function Gameover() {
    // Image texture
    this.gameover = new Image();
    this.gameover.src = "img/gameover.png";
    var gamelost = false;


    this.draw = function(ctx, cartesianPosY, life) {
            gamelost = true;
            var ratio = ctx.canvas.width / this.gameover.width;
            if (cartesianPosY < canvas.height) {
              ctx.drawImage(this.gameover, 0, ctx.canvas.height/2-this.gameover.height/2*ratio, ctx.canvas.width, this.gameover.height * ratio);
              // ctx.drawImage(this.gameover, 0, ctx.canvas.height - ((this.gameover.height * ratio)), ctx.canvas.width, this.gameover.height * ratio);
            }
            else {
              // ctx.drawImage(this.gameover, 0, ctx.canvas.height/2, ctx.canvas.width, this.gameover.height * ratio);
              ctx.drawImage(this.gameover, 0, ctx.canvas.height - ((this.gameover.height / 2 * ratio) + cartesianPosY), ctx.canvas.width, this.gameover.height * ratio);
        }
    };

}
