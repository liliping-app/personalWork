;(function(win, doc) {
  function Vec2(x, y) {
    this.x = x || 0;
    this.y = y || 0;
  }
  Vec2.prototype = {
    add: function(v) {
      if (this.x < 0) {
        this.x = width - 60;
      } else if (this.x + 60 > width) {
        this.x = 0;
      }
      this.x += v.x;
      this.y += v.y;
    },
    clone: function() {
      return new Vec2(this.x, this.y);
    }
  }
  function Drow(pos, size, className) {
    this.pos = pos;
    this.size = size;
    this.$el = $('<div>').addClass(className).css({
      width: this.size.x,
      height: this.size.y,
      left: this.pos.x,
      top: this.pos.y
    });
    $(".wrapper").append(this.$el);
  }
  function Ball(pos, size) {
    this.pos = pos || new Vec2();
    this.size = size || new Vec2(60, 60);
    Drow.call(this, this.pos, this.size, 'ball');
    this.sp = new Vec2();
    this.a = 0;
  }
  Ball.prototype.update = function() {
    this.sp.y += g;
    var sp = this.sp.clone();
    var offsetY = 0;          //y轴偏移量
    sp.x = keyPress[keyMap.left] ? -15 : keyPress[keyMap.right] ? 15 : 0;
    if(this.pos.y <= 500 && this.sp.y < 0){
      sp.y=0;
      offsetY=this.sp.y;
    }
    this.pos.add(sp);
    this.$el.css("top", this.pos.y + "px");
    this.$el.css("left", this.pos.x + "px");
    return offsetY;
  }
  function Platform(pos, size) {
    this.pos = pos || new Vec2();
    this.size = size || new Vec2(50, 10);
    Drow.call(this, this.pos, this.size, 'platform');
  }
  Platform.prototype.update = function(offsetY) {
    this.pos.y -= offsetY;
    this.$el.css("top", this.pos.y + "px");
    this.$el.css("left", this.pos.x + "px");
  }

  var ball, platforms, Timer;
  var keyPress = [];
  var keyMap = {
    left: 37,
    right: 39
  };
  var main = {
    spacing: 300,
    init: function() {
      var self = this;
      win.g = 2;
      this.w = $('body').width();
      this.h = $('body').height();
      $(".wrapper").width(this.w).height(this.h);
      ball = new Ball(new Vec2(48, this.h - this.spacing - 140));
      platforms = [];
      platforms.push(new Platform(new Vec2(0, this.h - 100), new Vec2(250, 35)));
      Timer = setInterval(self.run, 1000 / 30);
      this.bindEvent();
    },
    bindEvent: function() {
      $(document).on('keydown', function(event) {
        keyPress[event.keyCode] = true;
      }).on('keyup', function(event) {
        keyPress[event.keyCode] = false;
      });
    },
    run: function() {
      main.update();
      main.collisionCheck();
    },
    collisionCheck() {
      for (var i = 0; i < platforms.length; i++) {
        var platform = platforms[i];
        if (ball.pos.x + 50 >= platform.pos.x 
          && ball.pos.x <= platform.pos.x + platform.size.x 
          && ball.pos.y + ball.size.y >= platform.pos.y 
          && ball.pos.y + ball.size.y <= platform.pos.y + 50
          && ball.sp.y >= 0) {
          ball.sp.y = -35 - ball.a;
        }
      }
    },
    update: function() {
      var offsetY = ball.update();
      for (var i = 0; i < platforms.length; i++) {
        platforms[i].update(offsetY);
        if (platforms[i].pos.y > this.h) {
          platforms.splice(i, 1);
        }
      }
      var lastPlatformH = this.h;
      if (platforms.length > 0) {
        lastPlatformH = platforms[platforms.length - 1].pos.y;
      }
      if (ball.pos.y > this.h) {
        clearInterval(Timer);
      }
      if(lastPlatformH > this.spacing) {
        ball.a += .3;
        var x = Math.random()*(this.w - 250);
        platforms.push(new Platform(new Vec2(x,lastPlatformH - this.spacing), new Vec2(200, 63)));
        if (this.spacing < 600) {
          this.spacing += 1;
        }
      }
    }
  };
  main.init();
})(window, document);