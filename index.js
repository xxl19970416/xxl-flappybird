var bird = {
  position: 0,
  skyStep: 2,
  birdTop: 235,
  startColor: 'blue',
  startFlag: false,
  birdStepY:0,
  minTop:0,
  maxTop:555,

  init() {
    bird.initData();
    bird.animation();
    bird.handleStart();
  },
  initData() {
    this.el = document.getElementById('game');
    this.oBird = this.el.getElementsByClassName('bird')[0];
    this.oStart = this.el.getElementsByClassName('start')[0];
    this.oScore = this.el.getElementsByClassName('score')[0];
    this.oMask = this.el.getElementsByClassName('mask')[0];
    this.oEnd = this.el.getElementsByClassName('end')[0];
  },
  animation() {
    let count = 0;
    this.timer = setInterval(() => {   //定时器保存，后面用于清除，用this不是let
      this.skyMove();
      if(this.startFlag){
        this.birdDrop()
      };     
      if (++count % 10 == 0) {
        if (!this.startFlag) {
          this.birdJump();
          this.startBound();
        };
        this.birdFly(count);
      };
    }, 30);
  },
  skyMove() {
    // var self = this;

    this.position -= this.skyStep;
    this.el.style.backgroundPositionX = this.position + 'px';
    // console.log(self.el.style.backgroundPositionX);

  },
  birdJump() {

    this.birdTop = this.birdTop === 235 ? 190 : 235;
    this.oBird.style.top = this.birdTop + 'px';

  },
  birdFly(count) {
    this.oBird.style.backgroundPositionX = count % 3 * -52 + 'px';
  },
  birdDrop(){
    this.birdTop += ++ this.birdStepY;
    this.oBird.style.top = this.birdTop + 'px';
    this.judgeKnock()  //碰撞检测函数，在鸟落地时进行碰撞检测
  },
  startBound() {
    let prevColor = this.startColor;
    this.startColor = prevColor === 'blue' ? 'white' : 'blue';
    this.oStart.classList.remove('start-' + prevColor);
    this.oStart.classList.add('start-' + this.startColor);
  },
  handleStart() {
    this.oStart.onclick = () => {
      this.startFlag = true;
      this.oStart.style.display = 'none';
      this.oBird.style.left = '80px';
      this.oScore.style.display = 'block';
      this.skyStep = 5;
    }
  },
  judgeKnock(){
    this.judgeBoundary(); //边界碰撞检测函数
    this.judgePipe(); //柱子碰撞检测函数
  },
  judgeBoundary(){
    if(this.birdTop<this.minTop||this.birdTop>this.maxTop){
      this.failGame();
    }
  },
  failGame(){
    clearInterval(this.timer); //游戏结束时候清理定时器，画面和鸟不再动
    this.oMask.style.display = 'block';
    this.oEnd.style.display = 'block';
    this.oBird.style.display = 'none';
    this.oScore.style.display = 'none';

  }
}

bird.init();