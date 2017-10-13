function GameStart() {
    // Image texture
    this.gamestart = new Image();
    this.gamestart.src = "img/gamestart.png";
    this.draw = function(ctx, cartesianPosY) {
            var ratio = ctx.canvas.width / this.gamestart.width;
            ctx.globalAlpha = 1;
            if (cartesianPosY < canvas.height/2){
              ctx.drawImage(this.gamestart, 0, ctx.canvas.height - ((this.gamestart.height * ratio))-150, ctx.canvas.width, this.gamestart.height * ratio);
              //  ctx.drawImage(this.gamestart, 150, ctx.canvas.height - ((this.gamestart.height * ratio))+150, ctx.canvas.width-300, this.gamestart.height * ratio-300);
            } else {
            ctx.drawImage(this.gamestart, 0, ctx.canvas.height - ((this.gamestart.height/2 * ratio)+cartesianPosY), ctx.canvas.width, this.gamestart.height * ratio);
        }

    };        ctx.globalAlpha = 1;

}
