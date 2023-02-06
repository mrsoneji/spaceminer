class SPRITE {
  constructor(props) {
    this.id = props.id;
    this.h = props.h;
    this.w = props.w;
    this.y = props.y;
    this.x = props.x;
    this.target = props.target;
    this.r = props.r;
    this.sheet = props.sheet;
    this.updateImage = () => {
      var img = new Image();
      // img.crossOrigin = "Anonymous";
      img.src = SPRITES_FOLDER + this.sheet;
      this.image = img;
    }
    if (this.sheet) {
      this.updateImage();
    }
    this.totalFrames = props.totalFrames;
    this.currentFrame = 0;
    this.sheetY = 0;
    this.framing = function () {
      this.sheetY = this.currentFrame * this.h;
      if (this.currentFrame < this.totalFrames - 1) {
        this.currentFrame++;
      } else {
        this.currentFrame = 0;
      }
    }
    this.path = [];
    this.currentPathPosition = 0;
    this.setPath = function (target) {
      this.currentPathPosition = 0;
      const origin = { x: this.x, y: this.y }
      let targetFit = { x: target.x, y: target.y }
      this.path = Utils.pathLinear(origin, targetFit, Speed);
      this.r = Utils.radiants(origin, targetFit);
    }
    this.going = function () {
      if (this.path[this.currentPathPosition]) {
        this.x = this.path[this.currentPathPosition].x;
        this.y = this.path[this.currentPathPosition].y;
        this.currentPathPosition++;
      }
    }
    this.hit = () => this.hits++;
    this.hits = 0;
    this.hitsLimit = props.hitsLimit ? props.hitsLimit : 1;
    this.loops = props.loops;
    this.currentLoop = 0;
    this.canLoop = () => this.currentLoop < this.loops;
    this.looping = function () {
      this.currentLoop++;
    }
    this.spawnedAt = props.spawnedAt;
    this.shootAt = props.shootAt;
    this.shooted = false;
    this.scaleX = props.scaleX || 1;
    this.scaleY = -props.scaleY || 1;
    this.text = props.text;
    this.type = props.type;
    this.draw = function () {
      // ctx.scale(this.scaleX, this.scaleY);
      ctx.drawImage(this.image, 0, this.sheetY, this.w, this.h, this.x, this.y, this.w, this.h);
    }
    this.drawing = function () {
      ctx.save()
      ctx.translate(this.x, this.y);
      // ctx.rotate(270 * (Math.PI / 180));
      ctx.rotate(-this.r);
      ctx.scale(this.scaleX, this.scaleY);
      ctx.drawImage(this.image, 0, this.sheetY, this.w, this.h, 0 - this.w / 2, 0 - this.h / 2, this.w, this.h);
      ctx.restore();
      // pixelate(this);
    }
    this.flipVertically = function (direction) {
      if (Math.sign(direction) == 1) {
        this.scaleY = -Math.abs(this.scaleY);
      } else {
        this.scaleY = Math.abs(this.scaleY);
      }
    }
    this.flipHorizontally = function (direction) {
      if (Math.sign(direction) == 1) {
        this.scaleX = -Math.abs(this.scaleX);
      } else {
        this.scaleX = Math.abs(this.scaleX);
      }
    }
    this.colision = function (elements) {
      const that = this;
      return elements.find((e) => Utils.colision(e, that));
    }
  };
}
