;(function(win, doc) {
	/*
		类名：Vec2
		构造参数：
		x						横坐标
		y						纵坐标
		方法：
		add					位移
		clone				拷贝构造函数
	 */
	class Vec2 {
		constructor(x = 0, y = 0){
      this.x = x;
      this.y = y;
    }
    add(v) {
    	if (this.x < 0) {
				this.x = width - 60;
			} else if (this.x + 60 > width) {
				this.x = 0;
			}
			this.x += v.x;
			this.y += v.y;
    }
    clone() {
    	return new Vec2(this.x, this.y);
    }
	}
	/*
		类名：Drow
		构造参数：
		pos					位置(x, y)
		size				尺寸(width, height)
		className		类名
	 */
	class Drow {
		constructor(pos, size, className) {
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
	}
	/*
		类名：Ball 继承 Drow
		构造参数：
		pos					位置(x, y)
		size				尺寸(width, height)
	 */
	class Ball extends Drow {
		constructor(pos = new Vec2(), size = new Vec2(60, 60)) {
			super(pos, size, 'ball');
			this.sp = new Vec2();			//speed速度
			this.a = 0;								//初速度偏移量
    }
    update() {
    	this.sp.y += g;
    	let sp = this.sp.clone();
    	let offsetY = 0;					//y轴偏移量
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
	}
	/*
		类名：Ball 继承 Drow
		构造参数：
		pos					位置(x, y)
		size				尺寸(width, height)
	 */
	class Platform extends Drow {
		constructor(pos = new Vec2(), size = new Vec2(50, 10)) {
			super(pos, size, 'platform');
    }
    update(offsetY) {
    	this.pos.y -= offsetY;
			this.$el.css("top", this.pos.y + "px");
			this.$el.css("left", this.pos.x + "px");
    }
	}
	/*
		主对象
	 */
	let ball, platforms, Timer;
	let keyPress = [];
	const keyMap = {
		left : 37,
		right : 39
	};
	let main = {
		/*
			初始化
		 */
		spacing: 300,
		init: function() {
			let self = this;
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
			let offsetY = ball.update();
			for (var i = 0; i < platforms.length; i++) {
				platforms[i].update(offsetY);
				if (platforms[i].pos.y > this.h) {
					platforms.splice(i, 1);
				}
			}
			let lastPlatformH = this.h;
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