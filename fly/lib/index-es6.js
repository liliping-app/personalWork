'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;(function (win, doc) {
	/*
 	类名：Vec2
 	构造参数：
 	x						横坐标
 	y						纵坐标
 	方法：
 	add					位移
 	clone				拷贝构造函数
  */
	var Vec2 = function () {
		function Vec2() {
			var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
			var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

			_classCallCheck(this, Vec2);

			this.x = x;
			this.y = y;
		}

		_createClass(Vec2, [{
			key: 'add',
			value: function add(v) {
				if (this.x < 0) {
					this.x = width - 60;
				} else if (this.x + 60 > width) {
					this.x = 0;
				}
				this.x += v.x;
				this.y += v.y;
			}
		}, {
			key: 'clone',
			value: function clone() {
				return new Vec2(this.x, this.y);
			}
		}]);

		return Vec2;
	}();
	/*
 	类名：Drow
 	构造参数：
 	pos					位置(x, y)
 	size				尺寸(width, height)
 	className		类名
  */


	var Drow = function Drow(pos, size, className) {
		_classCallCheck(this, Drow);

		this.pos = pos;
		this.size = size;
		this.$el = $('<div>').addClass(className).css({
			width: this.size.x,
			height: this.size.y,
			left: this.pos.x,
			top: this.pos.y
		});
		$(".wrapper").append(this.$el);
	};
	/*
 	类名：Ball 继承 Drow
 	构造参数：
 	pos					位置(x, y)
 	size				尺寸(width, height)
  */


	var Ball = function (_Drow) {
		_inherits(Ball, _Drow);

		function Ball() {
			var pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Vec2();
			var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Vec2(60, 60);

			_classCallCheck(this, Ball);

			var _this = _possibleConstructorReturn(this, (Ball.__proto__ || Object.getPrototypeOf(Ball)).call(this, pos, size, 'ball'));

			_this.sp = new Vec2(); //speed速度
			_this.a = 0; //初速度偏移量
			return _this;
		}

		_createClass(Ball, [{
			key: 'update',
			value: function update() {
				this.sp.y += g;
				var sp = this.sp.clone();
				var offsetY = 0; //y轴偏移量
				sp.x = keyPress[keyMap.left] ? -15 : keyPress[keyMap.right] ? 15 : 0;
				if (this.pos.y <= 500 && this.sp.y < 0) {
					sp.y = 0;
					offsetY = this.sp.y;
				}
				this.pos.add(sp);
				this.$el.css("top", this.pos.y + "px");
				this.$el.css("left", this.pos.x + "px");
				return offsetY;
			}
		}]);

		return Ball;
	}(Drow);
	/*
 	类名：Ball 继承 Drow
 	构造参数：
 	pos					位置(x, y)
 	size				尺寸(width, height)
  */


	var Platform = function (_Drow2) {
		_inherits(Platform, _Drow2);

		function Platform() {
			var pos = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : new Vec2();
			var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new Vec2(50, 10);

			_classCallCheck(this, Platform);

			return _possibleConstructorReturn(this, (Platform.__proto__ || Object.getPrototypeOf(Platform)).call(this, pos, size, 'platform'));
		}

		_createClass(Platform, [{
			key: 'update',
			value: function update(offsetY) {
				this.pos.y -= offsetY;
				this.$el.css("top", this.pos.y + "px");
				this.$el.css("left", this.pos.x + "px");
			}
		}]);

		return Platform;
	}(Drow);
	/*
 	主对象
  */


	var ball = void 0,
	    platforms = void 0,
	    Timer = void 0;
	var keyPress = [];
	var keyMap = {
		left: 37,
		right: 39
	};
	var main = {
		/*
  	初始化
   */
		spacing: 300,
		init: function init() {
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
		bindEvent: function bindEvent() {
			$(document).on('keydown', function (event) {
				keyPress[event.keyCode] = true;
			}).on('keyup', function (event) {
				keyPress[event.keyCode] = false;
			});
		},
		run: function run() {
			main.update();
			main.collisionCheck();
		},
		collisionCheck: function collisionCheck() {
			for (var i = 0; i < platforms.length; i++) {
				var platform = platforms[i];
				if (ball.pos.x + 50 >= platform.pos.x && ball.pos.x <= platform.pos.x + platform.size.x && ball.pos.y + ball.size.y >= platform.pos.y && ball.pos.y + ball.size.y <= platform.pos.y + 50 && ball.sp.y >= 0) {
					ball.sp.y = -35 - ball.a;
				}
			}
		},

		update: function update() {
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
			if (lastPlatformH > this.spacing) {
				ball.a += .3;
				var x = Math.random() * (this.w - 250);
				platforms.push(new Platform(new Vec2(x, lastPlatformH - this.spacing), new Vec2(200, 63)));
				if (this.spacing < 600) {
					this.spacing += 1;
				}
			}
		}
	};
	main.init();
})(window, document);