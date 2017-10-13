function background3() {
    // Image texture
    this.background = new Image();
    this.background.src = "img/background3.png";


    this.draw = function(ctx, parallax) {
        var ratio = ctx.canvas.width / this.background.width;
        ctx.drawImage(this.background, 0, ctx.canvas.height-this.background.height*ratio+parallax, ctx.canvas.width, this.background.height*ratio);
    };

}
