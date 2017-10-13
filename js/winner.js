function Winner() {
    // Image texture
    this.winner = new Image();
    this.winner.src = "img/winner.png";


    this.draw = function(ctx, cartesianPosY) {
            var ratio = ctx.canvas.width / this.winner.width;
            if (cartesianPosY < canvas.height) {
                ctx.drawImage(this.winner, 0, ctx.canvas.height - ((this.winner.height * ratio)), ctx.canvas.width, this.winner.height * ratio);
            } else {
                ctx.drawImage(this.winner, 0, ctx.canvas.height - ((this.winner.height / 2 * ratio) + cartesianPosY), ctx.canvas.width, this.winner.height * ratio);
        }
    };

}
