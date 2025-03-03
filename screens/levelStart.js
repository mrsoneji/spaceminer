function levelStartScreen () {
  if (SetNewGame) {
    ShootCount = 0;
    Shoots = [];
    GameOver =  false;
    SetNewGame = false;
    getAsteroids();

    Background = new SPRITE({
      id: 'background',
      x: 0,
      y: 0,
      h: GAME_HEIGHT,
      w: GAME_WIDTH,
      sheet: 'background.png',
      totalFrames: 1,
    });

    Hero = new SPRITE({
      id: 'hero',
      x: GAME_MID_H - BLOCK_UNITY / 2,
      y: GAME_HEIGHT - GAME_HEIGHT / 2,
      h: 74,
      w: 50,
      sheet: 'ship.png',
      totalFrames: 1,
      r: 0
    });
    Hero.target = { x: Hero.x, y: Hero.y };
  }

  CurrentScreen = 'action';
  MarkTime = 0;
  GlobalTime = 0;
}
