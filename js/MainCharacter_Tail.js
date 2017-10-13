function MainCharacterTail(x, y, r) {
    this.radius = r;

    this.update = function(x, y) {
        this.miX = x;
        this.miY = y;
    }

    this.draw = function(ctx, i) {
        var alpha = i / 10;
        ctx.shadowBlur = 100;
        ctx.shadowColor = "rgba(242, 233, 16, 1)";
        // ctx.fillStyle = "rgba(242, 233, 16, "+ alpha +")";
        ctx.fillStyle = "rgba(242, 233, 16, " + (i / characterTail.length) + ")";
        ctx.save();
        ctx.restore();
        ctx.beginPath();
        ctx.arc(this.miX, this.miY, r, 0, Math.PI * 2, true);
        ctx.fill();
        ctx.shadowBlur = 0;
    };
}
