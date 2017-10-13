function leaderboard() {

    var leaderboardItems = [];
    var leader;

    this.setNewLeader = function(){
        leader = highscore.points();
        var d = new Date(); // for now
        d.getHours();
        d.getMinutes();
        d.getSeconds();
        // leaderboardItems = sessionStorage.getItem('leaderboardItems');
        var buffer = "Date: " + d.getHours() + ":" + d.getMinutes() + ", Points: " + leader;
        console.log(leaderboardItems);
        leaderboardItems.push(buffer);
        // sessionStorage.setItem('leaderboardItems', leaderboardItems);
}

    var positionX = 30;
    var positionY = 100;

    this.draw = function(ctx) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "normal 35px webpixel bitmap_light";
        ctx.save();
        
        ctx.restore();
        ctx.fillText("Leader: " + leaderboardItems + " : " + leader, positionX, positionY);
    }

}
