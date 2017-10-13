function gui() {
    highscore = new highscore();
    lifescore = new lifescore();
    gameover = new Gameover();
    gamestart = new GameStart();
    winner = new Winner();
    leaderboard = new leaderboard();



    this.update = function(food, activeFireflies, thisFrameTime, matrixValue, mainCharacterCollision, life, cartesianPosY, frameCounter, gameEnd) {

        if (life > 0) {
            highscore.update(frameCounter, food, activeFireflies, matrixValue, mainCharacterCollision);
        }
        highscore.draw(ctx);

        lifescore.update(thisFrameTime, food, matrixValue, mainCharacterCollision, activeFireflies, gameEnd);

        lifescore.draw(ctx);

        // gameover.draw(ctx, cartesianPosY, life);
        //
        // winner.draw(ctx, cartesianPosY, gameEnd);

    }

}
