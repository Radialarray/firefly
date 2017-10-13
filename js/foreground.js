function foreground() {
    // Image texture
    this.background = new Image();
    this.background.src = "img/foreground.png";


    this.draw = function(ctx, parallax) {
        var ratio = ctx.canvas.width / this.background.width;
        ctx.globalAlpha = 0.8;
        ctx.drawImage(this.background, 0, ctx.canvas.height-this.background.height*ratio+parallax, ctx.canvas.width, this.background.height*ratio);
        ctx.globalAlpha = 1;
    };

}
