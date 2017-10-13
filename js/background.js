function background() {
    // Image texture
    this.background = new Image();
    this.background.src = "img/background.png";
    var backgroundHeight;

    this.getHeight = function() {
      backgroundHeight = this.background.height;
      return backgroundHeight
    }

    this.draw = function(ctx) {
        var ratio = ctx.canvas.width / this.background.width;
        ctx.drawImage(this.background, 0, ctx.canvas.height-this.background.height*ratio, ctx.canvas.width, this.background.height*ratio);
    };
}
