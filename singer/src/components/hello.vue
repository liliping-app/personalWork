<template>
  <div class="hello">
    <!--首页-->
      <div class="total" v-bind:class="{'hide':isTotal}">{{formTotal}}</div>
      <div class="entrance" style="{backgroundColor:posterConfig.indexInfo.indexBgColor,backgroundImage:'url('+posterConfig.indexInfo.indexBg+')'}">
      </div>
      <div :style="{backgroundImage:'url('+ posterConfig.gameInfo.guideBg + ')'}">
      </div>
      <div class="ready" :style="{backgroundColor:'rgb(43,43,43)',backgroundImage:'url('+ posterConfig.gameInfo.ReadyBg + ')'}" v-bind:class="{'hide':isReady}"></div>
      <div class="go zoomIn" :style="{backgroundColor:'rgb(43,43,43)',backgroundImage:'url('+ posterConfig.gameInfo.GoBg + ')'}" v-bind:class="{'hide':isGo}">
      </div>
      <section class="entrance" v-bind:class="{'hide':isHidelogo}" :style="{backgroundColor:posterConfig.indexInfo.indexBgColor,backgroundImage:'url('+posterConfig.indexInfo.indexBg+')'}">
        <!-- 中心图片底框 -->
        <div class="zhongPic" :style="{backgroundImage:'url('+posterConfig.indexInfo.indexPic+')'}">
          <!-- 中心图片 -->
          <div class="zhongHb" :style="{backgroundImage:'url('+posterConfig.indexInfo.indexHb+')'}"></div>
          <!-- 中心图片文案 -->
          <div class="zhongTxt">{{posterConfig.indexInfo.indexTxt}}</div>
        </div>
        <!-- 开始闯关按钮 -->
        <a class="enterBtn during" v-on:click.stop.prevent="during" :style="{backgroundImage:'url('+ posterConfig.indexInfo.EnterBg + ')'}"></a>
        <!--活动规则-->
        <a class="ruleBtn" v-on:click.stop.prevent="ruleBtn" :style="{backgroundImage:'url('+ posterConfig.indexInfo.ruleBtnBg + ')'}"></a>
         <!--奖品配置-->
        <a class="prizeBtn" v-show="posterConfig.indexInfo.isPrizeOuter" v-bind:href="posterConfig.indexInfo.prizeLink" :style="{backgroundImage:'url('+ posterConfig.indexInfo.prizeBtnBg + ')'}"></a>
      </section>
      <!--游戏玩法-->
      <div id="guide" v-bind:class="{'hide':isGamefa}" :style="{backgroundImage:'url('+ posterConfig.gameInfo.guideBg + ')'}">
        <img v-bind:src="posterConfig.gameInfo.guildTou" alt="" class="guildTou">
        <div class="guildDK" :style="{backgroundImage:'url('+ posterConfig.gameInfo.guildDKt + ')'}">
        <p class="guildQuest">{{posterConfig.gameInfo.guildQuest}}</p>
          <ul class="guildBoxUl">
            <li class="guildBoxLi1">
            <p class="guildMaskz"></p>
              <img v-bind:src="posterConfig.gameInfo.guildEx01" alt="" class="guildEx01">
              <p class="guildAw01">{{posterConfig.gameInfo.guildAw01}}</p>
            </li>
            <li class="guildBoxLi2">
               <img v-bind:src="posterConfig.gameInfo.guildEx02" alt="" class="guildEx02">
               <p class="guildAw02">
                 {{posterConfig.gameInfo.guildAw02}}
               </p>
            </li>
          </ul>
          <img v-bind:src="posterConfig.gameInfo.guildDui" alt="" class="guildDui">
        </div>
        <div class="guideRTxt">{{posterConfig.gameInfo.ruleRTxt}}</div>
        <a class="guideRBtn" v-on:click.stop.prevent="guideRBtn" :style="{backgroundImage:'url('+ posterConfig.gameInfo.ruleRBtnBg + ')'}"></a>
      </div>
      <!-- 游戏过渡效果 -->
      <div class="ready" :style="{backgroundColor:'rgb(43,43,43)',backgroundImage:'url('+ posterConfig.gameInfo.ReadyBg + ')'}" v-bind:class="{'hide':isReady}"></div>
      <div class="go zoomIn" :style="{backgroundColor:'rgb(43,43,43)',backgroundImage:'url('+ posterConfig.gameInfo.GoBg + ')'}" v-bind:class="{'hide':isGo}">
      </div>
      <!-- 游戏页 -->
      <div class="game" v-bind:class="{'hide':isgame}" :style="{backgroundImage:'url('+ posterConfig.gameInfo.gameBg + ')'}">
        <div id="time" v-bind:class="{'hide':istime}">0.000s</div>
        <div class="gameWrap" v-bind:class="{'hide':isgameWrap}":style="{backgroundImage:'url('+ posterConfig.gameInfo.gameFrameBg + ')'}">
          <div id="question" class="question01 question02">{{wenti01}}</div> 
          <ul id="frame" class="tuBox"> 
            <li class="left">
              <div v-for="ans in answer">
                <a v-bind:class="{'hide': ans.hide}" class="leftT" v-on:click.stop.prevent="dati(ans.mark, 'left')">
                  <img v-bind:src="ans.imgLeft" class="leftTu" alt="猜图游戏" />
                  <span class="leftAn">{{ans.spanLeft}}</span>
                </a>
              </div>
            </li> 
            <li class="right">
              <div v-for="ans in answer">
                <a v-bind:class="{'hide': ans.hide}" class="leftR" v-on:click.stop.prevent="dati(-ans.mark, 'right')">
                  <img class="rightTu" v-bind:src="ans.imgRight" alt="猜图游戏" />
                  <span class="rightAn">{{ans.spanRight}}</span>
                </a>
              </div>
            </li> 
          </ul>
          <div class="maskli01" v-bind:class="{'hide':isZuo}"></div>
          <div class="maskli02" v-bind:class="{'hide':isYou}"></div>
          <div id="answer"> 
            <span class="succJ yes animated zoomIn" v-bind:class="{'hide':isYes}" :style="{backgroundImage:'url('+ posterConfig.gameInfo.rightBg + ')'}"></span> 
            <span class="errC no animated zoomIn" v-bind:class="{'hide':isNo}" :style="{backgroundImage:'url('+ posterConfig.gameInfo.leftBg + ')'}"></span> 
          </div>
        </div>
        <div id="turn" v-bind:class="{'hide':isturn}" class="bianMa">1/5</div>    
      </div>
      <!-- 分享外星人 -->
      <div id="fake" v-bind:class="{'hide':isfake}" :style="{backgroundImage:'url('+ posterConfig.gameInfo.fakeBg + ')'}" class="animated fadeInUp">
         <!-- 分享按钮图 -->
        <div v-if="fxY">
          <a class="j_share starFx" v-on:click.stop.prevent="j_share(1)" :style="{backgroundImage:'url('+posterConfig.resultInfo.fenX+')'}"></a>
        </div>
        <div v-else>
          <a class="pk j_share starFx" v-on:click.stop.prevent="j_share(1)" :style="{backgroundImage:'url('+posterConfig.resultInfo.fenX2+')'}" href="javascript:void(0);"></a>
        </div>
          <a class="closeWX" v-on:click.stop.prevent="closeWX"></a>
      </div>
      <!-- 失败页 -->
      <section class="fail" v-bind:class="{'hide':isFail}" :style="{backgroundColor:posterConfig.resultInfo.finalBgColor,backgroundImage:'url('+posterConfig.resultInfo.failBg+')'}">
        <img v-bind:src="posterConfig.resultInfo.failWenTu" class="failTop" alt="">
        <div class="failTbkd" :style="{backgroundImage:'url('+posterConfig.resultInfo.failTbk+')'}">
          <p class="ebu">这都能选错？你得恶补了! </p>
          <a class="bikan" v-on:click.stop.prevent="failBtn">
            <span class="bikanW" :style="{color:posterConfig.resultInfo.color}">{{posterConfig.resultInfo.bikanTxt}}</span>
            <img v-bind:src="posterConfig.resultInfo.bikanImg" class="bikantu" alt="">
          </a>
        </div>
        <!-- 分享按钮图 -->
        <div v-if="fxY">
          <a class="j_share" v-on:click.stop.prevent="j_share(1)" :style="{backgroundImage:'url('+posterConfig.resultInfo.fenX+')'}" href="javascript:void(0);"></a>
        </div>
        <div v-else>
          <a class="pk j_share" v-on:click.stop.prevent="j_share(1)" :style="{backgroundImage:'url('+posterConfig.resultInfo.fenX2+')'}" href="javascript:void(0);"></a>
        </div>
        <!-- 手速排名 -->
        <div class="shousu" :style="{backgroundImage:'url('+posterConfig.resultInfo.shousu+')'}"></div>
        <!-- 你的成绩最好的 -->
        <div v-if="cjgood2" class="chengji" :style="{backgroundImage:'url('+posterConfig.resultInfo.zuiCj+')'}">
          <p class="cjtxt">你最好的成绩是{{(cjgood2/1000).toFixed(3)}}s，击败了{{(rankPer*100).toFixed(2)}}%的玩家</p>
        </div>
        <ul class="paiming paimaing02">
          <li>排名</li>
          <li>昵称</li>
          <li>成绩</li>
        </ul>
        <ul class="scores02" v-for="(grade, index) in gradeList" :style="{backgroundImage:'url('+posterConfig.resultInfo.lieBg+')'}">
          <li class="ranks">
            <img v-if="grade.img.length > 0" v-bind:src="grade.img" class="rank01" alt="">
            <span class="num01">{{index + 1}}</span>
            <span class="touBg" :style="{backgroundImage:'url('+posterConfig.resultInfo.touBg+')'}">
              <img v-bind:src="grade.icon || 'https://static.youku.com/lvip/img/avatar/310/29.png'" class="touxiang" alt="">
            </span>
          </li>
          <li class="nicks">{{grade.nick}}</li>
          <li class="chengji2"><span>{{(grade.score / 1000).toFixed(3)}}</span>秒</li>
        </ul>
        <div class="bangdan">{{posterConfig.resultInfo.bangdan}}</div>
      </section>
      <!-- 成功页 -->
      <section class="succ" v-bind:class="{'hide':isSucc}" :style="{backgroundColor:posterConfig.resultInfo.succBgColor,backgroundImage:'url('+posterConfig.resultInfo.succBg+')'}">
        <!-- 成功页的头部 -->
        <img v-bind:src="posterConfig.resultInfo.succBgTop" class="succcBgTop" alt="">
        <!--活动规则-->
        <a class="ruleBtn" v-on:click.stop.prevent="ruleBtn" :style="{backgroundImage:'url('+ posterConfig.indexInfo.ruleBtnBg + ')'}" href="javascript:void(0);"></a>
        <img v-bind:src="posterConfig.resultInfo.succTu" alt="" class="succTu">
        <div v-if="cjgood > grades && grades != 0">
          <div class="succdik" :style="{backgroundImage:'url('+ posterConfig.resultInfo.succdik + ')'}">
            <p class="tongM">{{(cjgood/1000).toFixed(3)}}秒<br/>
            {{posterConfig.resultInfo.succwenan.split('$')[0]}}{{(rankPer2*100).toFixed(2)}}%{{posterConfig.resultInfo.succwenan.split('$')[1]}}</p>
          </div>
        </div>
        <div v-else>
          <div class="succdik2" :style="{backgroundImage:'url('+ posterConfig.resultInfo.succdik2 + ')'}">
            <p class="tongM2">你用了{{(cjgood/1000).toFixed(3)}}秒</p>
            <p class="wenanS">{{posterConfig.resultInfo.formMd}}</p>
            <form action="">
              <input  v-model="text"  placeholder="请输入手机号码" id="userNum" class="biaoda">
              <a v-on:click.stop.prevent="check"><img class="formTj" v-bind:src="posterConfig.resultInfo.formTj" alt=""></a>
            </form>
            <p class="wenanL">{{posterConfig.resultInfo.formLx}}</p>
          </div>  
        </div>
         <!-- 分享按钮图 -->
        <div v-if="fxY">
          <a class="j_share" v-on:click.stop.prevent="j_share(1)" :style="{backgroundImage:'url('+posterConfig.resultInfo.fenX+')'}" href="javascript:void(0);"></a>
        </div>
        <div v-else>
          <a class="pk j_share" v-on:click.stop.prevent="j_share(1)" :style="{backgroundImage:'url('+posterConfig.resultInfo.fenX2+')'}" href="javascript:void(0);"></a>
        </div>
        <!-- 手速排名 -->
        <div class="shousu sxpm" :style="{backgroundImage:'url('+posterConfig.resultInfo.shousu+')'}"></div>
        <!-- 你的最好成绩是 -->
        <div v-if="cjgood2" class="goodGrade" :style="{backgroundImage:'url('+posterConfig.resultInfo.goodBg+')'}">你的最好成绩是{{(cjgood2/1000).toFixed(3)}}s，击败了{{(rankPer*100).toFixed(2)}}%的玩家</div>
        <ul class="paiming paimaing02">
          <li>排名</li>
          <li>昵称</li>
          <li>成绩</li>
        </ul>
        <ul class="scores02" v-for="(grade, index) in gradeList" :style="{backgroundImage:'url('+posterConfig.resultInfo.lieBg+')'}">
          <li class="ranks">
            <img v-if="grade.img.length > 0" v-bind:src="grade.img" class="rank01" alt="">
            <span class="num01">{{index + 1}}</span>
            <span class="touBg" :style="{backgroundImage:'url('+posterConfig.resultInfo.touBg+')'}">
              <img v-bind:src="grade.icon || 'https://static.youku.com/lvip/img/avatar/310/29.png'" class="touxiang" alt="">
            </span>
          </li>
          <li class="nicks">{{grade.nick}}</li>
          <li class="chengji2"><span>{{(grade.score/1000).toFixed(3)}}</span>秒</li>
        </ul>
        <div class="bangdan">{{posterConfig.resultInfo.bangdan}}</div>
      </section>
      <!-- 弹框 -->
      <div class="fxalert animated fadeInUp" v-bind:class="{'hide':isFxalert}" :style="{backgroundImage:'url('+ posterConfig.activityInfo.fxalertBg + ')'}">
        <p class="fxzi">{{posterConfig.activityInfo.tkAlert}}</p> 
        <a class="hshare j_share" v-on:click.stop.prevent="j_share(1)"  :style="{backgroundImage:'url('+posterConfig.resultInfo.fenX+')'}" href="javascript:void(0);"></a> 
        <a href="javascript:void(0);" class="closeTk" v-on:click="closeTk"></a>
      </div>
      <!-- 弹窗弹窗和分享都用完了 -->
      <div class="fxalert animated fadeInUp" v-bind:class="{'hide':isFxalert2}" :style="{backgroundImage:'url('+ posterConfig.activityInfo.fxalertBg + ')'}">
        <p class="fxzi fxzi2">{{posterConfig.activityInfo.tkAlert3}}</p> 
        <a href="javascript:void(0);" class="closeTk" v-on:click.stop.prevent="closeTk"></a>
      </div>
      <!-- 蒙层 -->
      <div class="maskBig" v-bind:class="{'hide':ismaskBig}"></div>
      <!-- 清除按钮 -->
      <div class="clearBtn" v-on:click.stop.prevent="clearBtn" v-if="posterConfig.BtnBol">清除按钮</div>
  </div>
</template>
<script>
import mtop from '@ali/lib-mtop';
import axios from 'axios';
import browser from '../assets/browser';
import WindVane from '../assets/WindVane';
import callApp from '../assets/callApp.js';
// import bradge from '../assets/bradge.js';
import bradge from '@ali/lib-bridge';
import Vue from 'vue';
import VueDialog from '@ali/vue-dialog';
import qs from 'qs';
Vue.use(VueDialog, {
    componentName: 'vue-dialog', // Vue.componont()时的名字（默认为vue-dialog）
});

export default { 
  name: 'hello',
  data () {
    return {
      posterConfig:posterConfig,
      // noPhone: true,
      isHidelogo: false,
      isFxalert: true,
      isFxalert2: true,
      isGamefa: true,
      ismaskBig: true,
      isgameWrap: true,
      isgame: true,
      isShareBtn: false,
      isReady: true,
      isGo: true,
      isZuo: true,
      isYou: true,
      isturn: true,
      istime: true,
      isYes: true,
      isNo: true,
      isfake: true,
      isFail: true,
      isSucc: true,
      fxY: true,
      isTotal: true,
      wenti01: '',
      cjgood: '',
      cjgood2: '',
      rankPer:'',
      rankPer2:'',
      text:'',
      grades:'',
      answer: [],
      gradeList: [],
      formTotal: ''
    }
  },
  mounted: function() {
    var self = this;
    lib.mtop.config.prefix = 'acs';
    lib.mtop.config.subDomain = '';
    lib.mtop.config.mainDomain = 'youku.com';
    document.body.addEventListener('touchmove', function(event){
      if ((window.location.hash.indexOf('/fail') != -1) || (window.location.hash.indexOf('/cheng') != -1)) {
      } else {
        event.preventDefault();
        return false;
      }
    }, false);
    // axios.defaults.withCredentials=true;
    if (window.location.hash.indexOf('/fail') != -1) {
      self.popFail();
      //window.goldlog.record(posterConfig.logInfo.shibaiLog);    //错误的写法

      // window.goldlog.record('/yt/mmcjss.H5.zbhl','CLK','','H1455636893');   //期望

      window.goldlog.record(posterConfig.logInfo.shibaiLog.split(',')[0] ,'EXP','',posterConfig.logInfo.shibaiLog.split(',')[3]);
      
    }
    if (window.location.hash.indexOf('/cheng') != -1) {
      // self.noPhone = false;
      self.cjgood = self.getParam('/cheng');
      self.score = parseInt(self.getParam('/cheng'));
      self.popSucc(self.score);
      window.goldlog.record(posterConfig.logInfo.tongLog.split(',')[0] ,'EXP','',posterConfig.logInfo.tongLog.split(',')[3]);
      self.queryScore(self.score);
      self.getUserBest(self.score);
      self.getList();//添加score
    }
    window.onhashchange = function () {
      // console.log('改变');
      // self.hash();
      if (window.location.hash.indexOf('/fail') != -1) {
        self.popFail();
        //失败页的曝光
        window.goldlog.record(posterConfig.logInfo.shibaiLog.split(',')[0] ,'EXP','',posterConfig.logInfo.shibaiLog.split(',')[3]);
      } else if (window.location.hash.indexOf('/cheng') != -1) {
        // self.noPhone = false;
        self.cjgood = self.getParam('/cheng');
        self.score = parseInt(self.getParam('/cheng'));
        self.popSucc(self.score);
        //成功页的曝光
        window.goldlog.record(posterConfig.logInfo.tongLog.split(',')[0] ,'EXP','',posterConfig.logInfo.tongLog.split(',')[3]);
        self.queryScore(self.score);
        self.getUserBest(self.score);
        self.getList();//添加score
      } else {
        self.isHidelogo = false;
        self.isFail = true;
        self.isSucc = true;
      }
    };

    // self.getUserInfo();//测试
    let ls = window.localStorage;
    if (self.getParam('shouji')) {
      self.setDati();
      console.log(self.getParam('shouji'));
      console.log(self.getParam('score'));
      self.isHidelogo = true;
      console.log("你哈多了的")
      self.isSucc = false;
      window.goldlog.record(posterConfig.logInfo.tongLog.split(',')[0] ,'EXP','',posterConfig.logInfo.tongLog.split(',')[3]);
      // xuyao
      self.text = self.getParam('shouji');
      self.cjgood = self.getParam('score');
      self.score = parseInt(self.getParam('score'));
      self.getList();
      // self.login();//登录
      console.log(323,"dengllude asdfjdklsj")
    }
    if (self.getParam('share')) {
      self.setDati();
      self.isHidelogo = true;
      self.cjgood = self.getParam('score');
      self.score = parseInt(self.getParam('score'));
      if (window.location.hash.indexOf('/fail') == -1) {
        self.isSucc = false;
        //成功页的曝光
        window.goldlog.record(posterConfig.logInfo.tongLog.split(',')[0] ,'EXP','',posterConfig.logInfo.tongLog.split(',')[3]);
      } else {
        self.isFail = false;
        //失败页的曝光
        window.goldlog.record(posterConfig.logInfo.shibaiLog.split(',')[0] ,'EXP','',posterConfig.logInfo.shibaiLog.split(',')[3]);
      }
      self.getList();
      self.j_share(0);
    }
    document.getElementsByClassName('total')[0].style.transform = 'translateX(-50%)';
    document.getElementsByClassName('total')[0].style.webkitTransform = 'translateX(-50%)';
    var val = /^(\+86|0086)?\s*1[3578]\d{9}$/;
    //游戏进程
    var gameObj = self.gameObj = {
      wrapId: 'frame',//ul的id
      answerId: 'answer',//回答错误正确提示图层容器
      timeId: 'time',//游戏用时容器 
      questionId: 'question',  //问题容器id 
      sumTime: 0,  //游戏累计用时
      limitTime: posterConfig.gameInfo.limitTime * 1000,  //游戏超时时间
      timeNum: 0,  
      score: 0,
      curNum: 0,
      totalNum: posterConfig.gameInfo.questionNum,
      sumNum: posterConfig.posterArray.length,
      questions: [],
      timer: null,
      init: function(noGuide, inited){
        this.curNum = 0;
        this.sumTime = 0;
        this.timeNum = 0;
        this.timer = null;
        this.score = 0;
        this.questions = self.randomNums(this.sumNum, this.totalNum);
        this.yes = document.querySelector('#' + this.answerId).querySelector('.yes');
        this.no = document.querySelector('#' + this.answerId).querySelector('.no');
        this.question = document.querySelector('#' + this.questionId);
        this.turn = document.querySelector('#turn');
        this.countDown = document.querySelector('#countDown');
        // this.gameMb = document.querySelector('#gameMb');
        this.guide = document.querySelector('#guide');
        this.userNum = document.querySelector('#userNum');
        var _this = this;
        if(!noGuide){ 
          setTimeout(function(){
            _this.beginTime();
          }, 2000); 
        }
      },
      render: function(){
        let wrapL = document.querySelector('#' +this.wrapId).querySelector('.left');
        // self.isFxalert = true;
        let wrapR = document.querySelector('#' +this.wrapId).querySelector('.right');
        self.answer = [];
        for(var i = 0; i < 3; i++){
            if(Math.random() > 0.5){
              if(i == 0){
                self.wenti01 =posterConfig.posterArray[this.questions[i]].question;
                self.answer.push({
                  mark: 1,
                  hide: false,
                  imgLeft: posterConfig.posterArray[this.questions[i]].right,
                  spanLeft: posterConfig.posterArray[this.questions[i]].rightTxt,
                  imgRight: posterConfig.posterArray[this.questions[i]].wrong,
                  spanRight: posterConfig.posterArray[this.questions[i]].wrongTxt,
                });
              } else {
                self.answer.push({
                  mark: 1,
                  hide: true,
                  imgLeft: posterConfig.posterArray[this.questions[i]].right,
                  spanLeft: posterConfig.posterArray[this.questions[i]].rightTxt,
                  imgRight: posterConfig.posterArray[this.questions[i]].wrong,
                  spanRight: posterConfig.posterArray[this.questions[i]].wrongTxt,
                });
              }
            }else{
              if(i == 0){
                self.wenti01 =posterConfig.posterArray[this.questions[i]].question;
                self.answer.push({
                  mark: -1,
                  hide: false,
                  imgLeft: posterConfig.posterArray[this.questions[i]].wrong,
                  spanLeft: posterConfig.posterArray[this.questions[i]].wrongTxt,
                  imgRight: posterConfig.posterArray[this.questions[i]].right,
                  spanRight: posterConfig.posterArray[this.questions[i]].rightTxt,
                });
              } else {
                self.answer.push({
                  mark: -1,
                  hide: true,
                  imgLeft: posterConfig.posterArray[this.questions[i]].wrong,
                  spanLeft: posterConfig.posterArray[this.questions[i]].wrongTxt,
                  imgRight: posterConfig.posterArray[this.questions[i]].right,
                  spanRight: posterConfig.posterArray[this.questions[i]].rightTxt,
                });
              }
            }
            //隐藏外星人图层
            self.isYes = true;
            self.isNo = true;
            // self.isZuo = true;
            // self.isYou = true;
            //计数清零
            self.gameObj.turn.innerHTML = '1/' + self.gameObj.totalNum;
            document.querySelector('#'+ self.gameObj.timeId).innerHTML = '0.000秒';
            self.isgame = false;
            self.isFxalert = true;
        }
      },
      beginTime: function(){
        console.log(533,"sfsj")
          var _this = this,
              count = _this.limitTime * 17 / 1000;
              this.timer = ' ';
          clearInterval(_this.timer);
          _this.timer = setInterval(function(){
              if(_this.timeNum < count - 1){
                  _this.timeNum += 1;
                  _this.sumTime = Math.floor(_this.timeNum / 17 * 1000);
                  document.querySelector('#' + _this.timeId).innerHTML = (_this.sumTime / 1000).toFixed(3) + '秒';
              }else if(_this.timeNum == count - 1){
                  _this.timeNum = count;
                  _this.sumTime = _this.limitTime;
                  document.querySelector('#' + _this.timeId).innerHTML = (_this.limitTime / 1000) + '.000秒';
                  _this.exit(0);
              }
          }, 1000 / 17);
      },
      next: function(){
        setTimeout(function(){
          self.isYes = true;
          self.isZuo = true;
          self.isYou = true;
          self.gameObj.curNum ++;
          self.gameObj.turn.innerHTML = Math.min(self.gameObj.curNum+ 1,self.gameObj.totalNum)+ '/' + self.gameObj.totalNum;
          if(self.gameObj.curNum == self.gameObj.totalNum){
            setTimeout(function(){ 
              self.gameObj.exit(1);
            }, 200);
          }else{
            self.answer.shift();
            self.answer[0].hide = false;
            console.log(posterConfig.posterArray[self.gameObj.questions[self.gameObj.curNum]].question, 'curNum');
            self.wenti01 = posterConfig.posterArray[self.gameObj.questions[self.gameObj.curNum]].question;
            if(self.gameObj.curNum < self.gameObj.totalNum - 2){
              if(Math.random() > 0.5){
                 self.answer.push({
                  mark: 1,
                  hide: true,
                  imgLeft: posterConfig.posterArray[self.gameObj.questions[self.gameObj.curNum + 2]].right,
                  spanLeft: posterConfig.posterArray[self.gameObj.questions[self.gameObj.curNum + 2]].rightTxt,
                  imgRight: posterConfig.posterArray[self.gameObj.questions[self.gameObj.curNum + 2]].wrong,
                  spanRight: posterConfig.posterArray[self.gameObj.questions[self.gameObj.curNum + 2]].wrongTxt,
                });
              }else{
                self.answer.push({
                  mark: -1,
                  hide: true,
                  imgRight: posterConfig.posterArray[self.gameObj.questions[self.gameObj.curNum + 2]].right,
                  spanRight: posterConfig.posterArray[self.gameObj.questions[self.gameObj.curNum + 2]].rightTxt,
                  imgLeft: posterConfig.posterArray[self.gameObj.questions[self.gameObj.curNum + 2]].wrong,
                  spanLeft: posterConfig.posterArray[self.gameObj.questions[self.gameObj.curNum + 2]].wrongTxt,
                });
              }
            }
          }
        },300);
      },
      exit: function(result){
        clearInterval(self.gameObj.timer);
        self.isNo = true;
        self.cjgood = self.gameObj.sumTime;
        self.setDati();
        if(result){
          console.log(result,self.cjgood,"result",9988,self.gameObj.sumTime)
          window.goldlog.record(posterConfig.logInfo.succLog.split(',')[0] ,'EXP','',posterConfig.logInfo.succLog.split(',')[3]);
          window.location.hash += '/cheng=' + self.gameObj.sumTime;
          // self.noPhone = false;
          self.popSucc(self.gameObj.sumTime);
          self.queryScore(self.gameObj.sumTime);
          self.getUserBest(self.gameObj.sumTime);
          self.getList();//添加score
        }else{
          // self.popFail();
          // let url = self.setParam('fail=1');
          // window.location.href = url;
          window.location.hash += '/fail';
          self.popFail();
          console.log("score",self.gameObj.score,87777);
        }
      }
    }
  },
  methods: {  
    // 清除页面
    clearBtn: function(){
      var self = this;
      localStorage.clear();
    },
    //获取用户资料相关信息
    getUserInfo: function() {
      var self = this;
      return new Promise(function(resolve, reject){
        var userInfo = new Object();
        $.ajax({
          url: '//vip.youku.com/ajax/member/get_member_info.jsonp',
          data: {range: 'avatar'},
          dataType: 'jsonp',
          success: function(res){
            if(res.code === '20000'){
                userInfo.icon = res.result.member.user_icon;
                resolve(userInfo);
            }else{
                reject();
            }
          },
          error: function(xhr, type) {
            reject();
          }
        });
        /*axios.get('//vip.youku.com/ajax/member/get_member_info.jsonp', qs.stringify({"data": JSON.stringify({
          "range": 'avatar'
        })}), {
          headers: {
            'X-Requested-With': 'XMLHttpRequest',
          }
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });*/
      });
    },
    getParam: function(key) {
      if (window.location.href.split(key +'=')[1]) {
        return window.location.href.split(key +'=')[1].split('&')[0].split('#')[0];
      } else {
        return false;
      }
    },
    // 记录次数
    setTimes: function() {
      let self = this;
      self.isWeb().then(function() {
        //站外不记录
      }, function() {
        var promise = lib.mtop.request({
          api: 'mtop.com.youku.aplatform.weakGet', // 必须
          v: '1.0',  // 必须
          data: {
            bizType: 'tool.isLogin'
          }, // 必须
          appKey: '23536927', // 必须 (优酷业务请根据上述表格进行选择)
          ecode: 0   // 必须（登录接口设置为1，非登录接口0）
        });
        promise.then((res)=>{
          console.log(res,5444)
          if (res.data.isLogin == true) {
            self.isLogin = res.data.isLogin;
          } else {

          }
        });
      });
    },
    //答题
    dati: function(mask, leftOrRight) {
      let self = this;
      let _this = this.gameObj;
      if (leftOrRight == 'left') {
        self.isYou = false;
      } else if (leftOrRight == 'right') {
        self.isZuo = false;
      }
      console.log(mask,this.gameObj.curNum,);
      if(_this.curNum < _this.totalNum){
        if(mask == 1){//回答正确
          console.log(mask,5454);
          self.isYes = false;
          setTimeout(function(){
            _this.next();
          },200);
        }else if(mask == -1){//回答错误
          self.isNo = false;
          setTimeout(function(){
            _this.exit(0);
            console.log("exit",45454)
          },200)
        }
      }
    },
    // 首页的入口规则
    ruleBtn:function(){
      window.goldlog.record(posterConfig.logInfo.ruleLog.split(',')[0] ,'CLK','',posterConfig.logInfo.ruleLog.split(',')[3]);
      // if(!posterConfig.indexInfo.isRuleOuter){
      // }else{
      //   location.href = posterConfig.indexInfo.ruleLink;
      // }
      this.isWeb().then(function(){
        if(!posterConfig.indexInfo.isRuleOuter){
        }else{
          location.href = posterConfig.indexInfo.ruleLink;
        }
      },function(res){
        if(!posterConfig.indexInfo.isRuleOuter){
        }else{
          let dataVid = posterConfig.indexInfo.ruleLink;
          // showVeiw(dataVid,event){
          if(dataVid.split("id_")[1]){
            bradge.play({
                  vid:dataVid.split("id_")[1].split("==")[0].split(".")[0]
            });
          }else{
              window.location.href = dataVid;
          }
        }
      });
    },
    // 失败的通关必看的按钮
    failBtn:function(){
      var self = this;
      window.goldlog.record(posterConfig.logInfo.failLog.split(',')[0] ,'CLK','',posterConfig.logInfo.failLog.split(',')[3]);
      this.isWeb().then(function(){
        if(!posterConfig.indexInfo.isRuleOuter){
        }else{
          location.href = posterConfig.indexInfo.ruleLink;
        }
      },function(res){
        if(!posterConfig.indexInfo.isRuleOuter){
        }else{
          let dataVid = posterConfig.indexInfo.ruleLink;
          // showVeiw(dataVid,event){
          if(dataVid.split("id_")[1]){
            bradge.play({
                  vid:dataVid.split("id_")[1].split("==")[0].split(".")[0]
            });
          }else{
              window.location.href = dataVid;
          }
        }
      });
    },
    setDati: function() {
      let self = this;
      let ls = window.localStorage;
      let pageid = location.href.split('/act/')[1].split('.html')[0];
      let dtStr = pageid + '_' + self.ymd() + '_dt';
      let dat2 = Number(ls.getItem(dtStr)) + 1;
      ls.setItem(dtStr, dat2);
    },
    during: function(){
      let self = this;
      window.goldlog.record(posterConfig.logInfo.startLog.split(',')[0] ,'CLK','',posterConfig.logInfo.startLog.split(',')[3]);
      this.isWeb().then(function() {
        self.isHidelogo = true;
        self.isGamefa = false;
         window.goldlog.record(posterConfig.logInfo.gamewfLog.split(',')[0] ,'EXP','',posterConfig.logInfo.gamewfLog.split(',')[3]);
        self.ismaskBig = true;
        self.gameObj.init(1);
      }, function(res) {
        console.log(res, '设备');
        var promise = lib.mtop.request({
          api: 'mtop.com.youku.aplatform.weakGet', // 必须
          v: '1.0',  // 必须
          data: {
            bizType: 'tool.isLogin'
          }, // 必须
          appKey: '23536927', // 必须 (优酷业务请根据上述表格进行选择)
          ecode: 0   // 必须（登录接口设置为1，非登录接口0）
        });
        promise.then((res)=>{
          console.log(res,5444)
          if (res.data.isLogin == true) {
            posterConfig.activityInfo.datiBol = true;
            console.log(posterConfig.activityInfo.datiBol,"是否已经登录了")
            console.log(posterConfig.activityInfo.datiMin,"niaho")
            let ls = window.localStorage;
            let pageid = location.href.split('/act/')[1].split('.html')[0];
            let dtStr = pageid + '_' + self.ymd() + '_dt';
            let fxStr = pageid + '_' + self.ymd() + '_fx';
            let dat2 = Number(ls.getItem(dtStr)) + 1;
            let fxc = Number(ls.getItem(fxStr));
            /*ls.setItem(fxStr,fxc);
            ls.setItem(dtStr,dat2);*/
            console.log(fxc,"分享次数",dat2,"答题")
            if(posterConfig.activityInfo.datiMin>0){
              if(dat2 < Number(posterConfig.activityInfo.shareMin) + Number(posterConfig.activityInfo.datiMin)){
                self.isHidelogo = true;
                self.isGamefa = false;
                window.goldlog.record(posterConfig.logInfo.gamewfLog.split(',')[0] ,'EXP','',posterConfig.logInfo.gamewfLog.split(',')[3]);
                self.ismaskBig = true;
                self.gameObj.init(1);
                console.log('更新')
                // self.j_share1();
              } else {
                if(!posterConfig.activityInfo.shareBol || (ls.getItem(fxStr) && ls.getItem(fxStr)>=posterConfig.activityInfo.shareMin)){
                  console.log('今天没有机会');
                  self.isFxalert2 = false;
                  self.ismaskBig = false;
                } else {
                  self.ismaskBig = false;
                  self.isFxalert = false;
                }
              }
            }
          }else{
            // console.log('未登录');
            self.isHidelogo = true;
            self.isGamefa = false;
            window.goldlog.record(posterConfig.logInfo.gamewfLog.split(',')[0] ,'EXP','',posterConfig.logInfo.gamewfLog.split(',')[3]);
            self.ismaskBig = true;
            self.gameObj.init(1);
          }
        },(reject)=>{
          console.log(reject,'login err');
        });
          /*
          let ls = window.localStorage;
          let pageid = location.href.split('/act/')[1].split('.html')[0];
          let dtStr = pageid + '_' + self.ymd() + '_dt';
          let fxStr = pageid + '_' + self.ymd() + '_fx';
          let dat2 = Number(ls.getItem(dtStr));
          let fxc = ls.getItem(fxStr);
          if(posterConfig.activityInfo.datiBol){
            if(posterConfig.activityInfo.datiMin>0){
              if(dat2 < Number(fxc) + Number(posterConfig.activityInfo.datiMin)){
                self.isHidelogo = true;
                self.isGamefa = false;
                self.ismaskBig = true;
                self.gameObj.init(1);
                // self.j_share1();
              } else {
                if(!posterConfig.activityInfo.shareBol || (ls.getItem(fxStr) && ls.getItem(fxStr)>=posterConfig.activityInfo.shareMin)){
                  console.log('今天没有机会');
                  self.isFxalert2 = false;
                  self.ismaskBig = false;
                } else {
                  self.ismaskBig = false;
                  self.isFxalert = false;
                }
              }
            }
          } else {
            self.isHidelogo = true;
            self.isGamefa = false;
            self.ismaskBig = true;
            self.gameObj.init(1);
          }*/
        //} else { //today
         /* self.isHidelogo = true;
          self.isGamefa = false;
          self.ismaskBig = true;
          self.gameObj.init(1);*/
       // } //today
      });
    },
    //准备好了按钮
    guideRBtn:function(){
      let self = this;
      window.goldlog.record(posterConfig.logInfo.guideLog.split(',')[0] ,'CLK','',posterConfig.logInfo.guideLog.split(',')[3]);
      this.isZuo = true;
      this.isYou = true;
      this.gameObj.init(0,1);
      // this.ismaskBig = false;
      this.isGamefa = true;
      this.isgameWrap = false;
      this.isReady = false;
      this.isgame = false;
      // this.ismaskBig = true;
      this.isFxalert = true;
      console.log('lingdang',this.isFxalert)
      setTimeout(function(){
        self.isgameWrap = false;
        self.isReady = true;
        self.isGo = false; 
      },1000);
      setTimeout(function(){
        self.istime = false;
        self.isturn = false;
        self.isGo = true;
        window.goldlog.record(posterConfig.logInfo.startyLog.split(',')[0] ,'EXP','',posterConfig.logInfo.startyLog.split(',')[3]);
      },2000);
      self.gameObj.render();
    },
    closeWX: function(){
      this.isfake = true;
      this.isgame = true;
      this.isHidelogo = false;
      this.isFxalert = true;
      this.ismaskBig = true;
      // this.isSucc = false;
    },
    // 分享弹框的关闭
    closeTk: function(){
      this.isFxalert = true;
      this.ismaskBig = true;
      this.isFxalert2 = true;
    },
    // 手写的toast
    total: function(value, time) {
      let self = this;
      /*self.formTotal = value;
      self.isTotal = false;
      setTimeout(function() {
        self.isTotal = true;
      }, time);*/
      Vue.toast({
        text: value,
        time: time
      });
    },
    // 提交按钮
    check:function(){
      let self = this;
      let ls = window.localStorage;
      let pageid = location.href.split('/act/')[1].split('.html')[0];
      let dtStr = pageid + '_' + self.ymd() + '_dt';
      let dat2 = Number(ls.getItem(dtStr));
      let fxStr = pageid + '_' + self.ymd() + '_fx';
      let fxc = Number(ls.getItem(fxStr));
      var val = /^(\+86|0086)?\s*1[3578]\d{9}$/;
      window.goldlog.record(posterConfig.logInfo.saveLog.split(',')[0] ,'CLK','',posterConfig.logInfo.saveLog.split(',')[3]);
      if(!val.test(self.text)){
        self.total('请输入正确的手机号码', 1000);
      }else{
        self.isWeb().then(function() {
          self.zhan('jilu');
          // 站外
        }, function() {
          var promise = lib.mtop.request({
            api: 'mtop.com.youku.aplatform.weakGet', // 必须
            v: '1.0',  // 必须
            data: {
              bizType: 'tool.isLogin'
            }, // 必须
            appKey: '23536927', // 必须 (优酷业务请根据上述表格进行选择)
            ecode: 0   // 必须（登录接口设置为1，非登录接口0）
          });
          promise.then((res)=>{
            console.log(res, res.data.isLogin, 5444)
            if (res.data.isLogin == true) {
              self.isLogin = res.data.isLogin;
              // if (self.isLogin) { 
                lib.mtop.request({
                  api:"mtop.com.youku.aplatform.get", // 必须
                  v: '1.0',  // 必须
                  //appKey: '23774304', // 必须
                  appKey: posterConfig.activityInfo.appKey,
                  data: {bizType: 'singerphone.writePhone', bizParam: '{"phone": ' + self.text + '}'},
                  ecode: 0,   // 必须（注意2）
                  type: 'GET',   // 非必须。请求类型（GET/POST），默认是GET
                  dataType: 'jsonp', // 非必p须。数据类型（jsonp/originaljsonp/json），默认jsonp
                  isSec: 0,
                  timeout: 20000 // 非必须。接口超时设置，默认为20000ms
                },function(res){
                  console.log(res,"手机号",);
                  if(posterConfig.activityInfo.datiBol && posterConfig.activityInfo.datiMin>0){
                    if(dat2 <= Number(fxc) + Number(posterConfig.activityInfo.datiMin)){
                      self.total('保存成功', 1000);
                      self.saveScore(self.score);
                    }else{
                      self.total('今日游戏次数已用完', 1000);
                    }
                  }else{
                    // self.total('保存成功', 1000);
                    // self.saveScore(self.score);
                    self.total('今日游戏次数已用完', 1000);
                  }
                },
                function(res) {
                  console.log(res, 'singerphone.weakGet');
                });
              // } else {
              //   // alert('未登录')
              //   ls.setItem('shouji', self.text);
              //   ls.setItem('score', self.cjgood);
              //   console.log()
              //   setTimeout(function() {
              //     self.login();
              //     console.log("去登录")
              //   }, 100);
              // }
            } else {
              console.log('未登录');
              self.login();
            }
          },(reject)=>{
            console.log(reject,'login err');
          });
        });
        // self.total('保存成功', 1000);
        // self.saveScore(score);
      }

      
      /*self.isWeb().then(function() {

        self.zhan();
       
      }, function() {
        if (self.isLogin) {
          var val = /^(\+86|0086)?\s*1[3578]\d{9}$/;
          console.log(self.text,"test");
          if(!val.test(self.text)){
            console.log('请输入正确的手机号码');
            self.total('请输入正确的手机号码', 1000);
          } else {
            lib.mtop.request({
              api:"mtop.com.youku.aplatform.weakGet", // 必须
              v: '1.0',  // 必须
              //appKey: '23774304', // 必须
              appKey: posterConfig.activityInfo.appKey,
              data: {bizType: 'singerphone', bizParam: '{"phone": ' + self.text + '}'},
              ecode: 0,   // 必须（注意2）
              type: 'GET',   // 非必须。请求类型（GET/POST），默认是GET
              dataType: 'jsonp', // 非必p须。数据类型（jsonp/originaljsonp/json），默认jsonp
              isSec: 0,
              timeout: 20000 // 非必须。接口超时设置，默认为20000ms
            },function(res){
              console.log(res,"手机号", 'singerphone.weakGet');
              // this.$toast({
              //   text2:'保存成功',
              // });
              self.total('保存成功', 1000);
              self.saveScore(score);
            },
            function(res) {
              console.log(res, 'singerphone.weakGet');
            });
          }
        } else {
          var val = /^(\+86|0086)?\s*1[3578]\d{9}$/;
          if(!self.val.test(self.text)){
            console.log('请输入正确的手机号码');
            self.total('请输入正确的手机号码', 1000);
          }else{
            self.total('保存成功', 1000);
             self.saveScore(score);
          }
          self.login();
        }
      });*/
    },
    //判断登录
    login: function() {
      let self = this;
      console.log("two login")
      /*let ls = window.localStorage;
      let pageid = location.href.split('/act/')[1].split('.html')[0];
      let dtStr = pageid + '_' + self.ymd() + '_dt';
      let fxStr = pageid + '_' + self.ymd() + '_fx';
      let dat2 = Number(ls.getItem(dtStr));
      let fxc = ls.getItem(fxStr);*/
      /*let zb = window.localStorage;
      let pagezb= location.href.split('/act/')[1].split('.html')[0];
      let dtStr = pagezb + '_' + this.ymd() + '_dt';
      let ci = Number(zb.getItem(dtStr)) + 1;
      zb.setItem(dtStr, ci);*/
      console.log('登录');
      if (browser.iOS) {
        window.location.href = 'youku://jsblogin';
      } else {
        console.log('安卓登录');
        window.WindVane.call("WVLoginJSBridge", "showLoginView", "", function (e) {
        }, function (e) {
          // alert('登录失败:' + JSON.stringify(e));
        });
      }
      /*try {
        if (browser.iOS) {
          window.location.href = 'youku://jsblogin';
        } else {
          console.log('安卓登录');
          window.WindVane.call("WVLoginJSBridge", "showLoginView", "", function (e) {
          }, function (e) {
            alert('登录失败:' + JSON.stringify(e));
          });
        }
      } catch(err) {
        alert('失败');
      }*/
    },
    //判断环境
    isWeb: function(){
      return new Promise(function(resolve, reject){
        var ua = window.navigator.userAgent.toLowerCase(); 
        if (ua.indexOf('youku') === -1) {
            resolve();
        }else{
            if ((/iphone/i).test(ua)) {
                reject('ios'); 
            } else if ((/android/i).test(ua)) {
                reject('android');
            }  
        }  
        //reject();               
      });
    },
    isWebVar: function(){  
      if (window.navigator.userAgent.toLowerCase().indexOf('youku') === -1) {
        return true;
      }else{
          return false;  
      }  
    },
    isWx: function(){
      if(window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'){
          return true;
      }else{
          return false;
      }
    },

    randomNums:function(sum, num){
      var array = [];
      console.log(sum, num);
      if(!/^\+?[1-9][0-9]*$/.test(sum) || !/^\+?[1-9][0-9]*$/.test(num) || sum < num){  
        console.log('return null')
        return;  
      }else{
        while(array.length < num){
          var t = Math.floor(sum * Math.random());
          if(array.indexOf(t) == -1){
            array.push(t);
          }
        } 
        return array;
      }
    },
    //通关弹出结果页
    popSucc: function(score){
      let self = this;
      window.goldlog.record(posterConfig.logInfo.finishLog.split(',')[0] ,'EXP','',posterConfig.logInfo.finishLog.split(',')[3]);
      self.canShare();
      console.log(posterConfig.gameInfo.minTime, 'score');
      if(score <= posterConfig.gameInfo.minTime*1000){
        this.ismaskBig = false;
        this.isfake = false;
      }else{
        console.log('数据正常');
        self.score = score;
        this.isgame = true;
        this.isSucc = false;
        console.log(self.cjgood);
        console.log(self.grades);
        // isLogin().then(function(){

        // })
        this.isWeb().then(function() {
          //this.loginPass(score);
        }, function(){
          if (self.cjgood <= self.grades || self.grades == 0) {

          } else {
            self.saveScore(self.score);
          }
          //appLoginPass(score);
        });
      }
    },
    //失败弹出结果页
    popFail: function(){
      let self = this;
      window.goldlog.record(posterConfig.logInfo.finishLog.split(',')[0] ,'EXP','',posterConfig.logInfo.finishLog.split(',')[3]);
      self.isHidelogo = true;
      this.canShare();
      console.log(this.isgame,5454)
      this.isgame = true;
      this.isFail = false;          
      // refreshShare();  
      //将时间归零
      setTimeout(function(){
          document.querySelector('#time').innerHTML = '';
      }, 1000);  
      self.getUserBest(self.cjgood);
      self.getList(self.cjgood); 
    },
    //浏览器未登录结果页
    loginPass: function(score){
      var succ = document.querySelector('.browser');
      let pageid = location.href.split('/act/')[1].split('.html')[0];
      var login;
      // self.getList();
      //存储当前成绩
      queryScore(score).then(function(per){
        //保存成功
        refreshShare(score,per);
        console.log(32234)
        },function(){
          refreshShare(score);
        })
    },
    //查询url中指定参数值
    queryByName: function(name) {
      var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if(r!=null) return unescape(r[2]); 
        return null;
    },
    isWx: function(){
      if(window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger'){
          return true;
      }else{
          return false;
      }
    },
    isWebVar: function(){      
      if (window.navigator.userAgent.toLowerCase().indexOf('youku') === -1) {
        return true;
      }else{
          return false;  
      }  
    },
    //时间
    ymd: function() {
      let date = new Date();
      let y = date.getFullYear();
      let m = date.getMonth() + 1;
      let d = date.getDate();
      return `${y}_${m}_${d}`;
    },
    canShare: function() {
      let self = this;
      let ls = window.localStorage;
      let pageid = location.href.split('/act/')[1].split('.html')[0];
      let fxStr = pageid + '_' + self.ymd() + '_fx';
      if(!posterConfig.activityInfo.shareBol || (ls.getItem(fxStr) && ls.getItem(fxStr)>=posterConfig.activityInfo.shareMin)){
        self.fxY = false;
      } else {
        self.fxY = true;
      }
    },
    //判断是第几周
    week: function() {
      let self = this;
      let now = new Date();
      let time02 = now.getTime();
      let ck = posterConfig.canTime;
      ck = ck.replace(/-/g,'/');
      let date = new Date(ck);
      let time01 = date.getTime();
      let cz = parseInt((time02-time01)/(1000*60*60*24*7));
    },
    //限答和分享
    j_share: function(isMai){
      var self = this;
      self.isFxalert = true;
      if (isMai == 1) {
        window.goldlog.record(posterConfig.logInfo.shareLog.split(',')[0] ,'CLK','',posterConfig.logInfo.shareLog.split(',')[3]);
      }
      self.isWeb().then(function() {
        self.zhan('fenxiang');
      }, function() {
        self.islogin().then(function() {
          console.log("denglude ")
          //已登录
          // if(window.location.hash.indexOf('/fail') != -1){
          //   self.isHidelogo = true;
          //   self.isFail = false;
          //   // self.isGamefa = false;
          // } else {
          //   self.isHidelogo = true;
          //   self.isSucc = false;
          // }
          if(window.location.hash.indexOf('/fail') != -1){
            self.isHidelogo = true;
            self.isFail = false;
            // self.isGamefa = false;
          } else if(window.location.hash.indexOf('/cheng') != -1){
            self.isHidelogo = true;
            self.isSucc = false;
            //成功曝光的埋点
            window.goldlog.record(posterConfig.logInfo.tongLog.split(',')[0] ,'EXP','',posterConfig.logInfo.tongLog.split(',')[3]);
          }else{
            self.isHidelogo = false;
            self.ismaskBig = true;
          }
          self.shareZ();
          setTimeout(function() {
            console.log("验证")
            // self.ismaskBig = true;
            // self.isHidelogo = true;
            // self.isGamefa = false;
            // self.isShareBtn = true;
            // self.isShareBtn2 = false;
            let ls = window.localStorage;
            let pageid = location.href.split('/act/')[1].split('.html')[0];
            let dtStr = pageid + '_' + self.ymd() + '_dt';
            let fxStr = pageid + '_' + self.ymd() + '_fx';
            let dat2 = Number(ls.getItem(dtStr));

             console.log(ls.getItem(fxStr),posterConfig.activityInfo.shareMin,"分享次数2",posterConfig.activityInfo.datiMin,"答题次数")
            if(!posterConfig.activityInfo.shareBol || (ls.getItem(fxStr) && ls.getItem(fxStr)>=posterConfig.activityInfo.shareMin)){
              window.location.hash = window.location.hash.split('/fail')[0].split('/cheng')[0];
              self.isfake = true;
              self.isgame = true;
              // self.isFxalert = true;
              console.log(posterConfig.activityInfo.shareMin,"分享次数");
              console.log(9999);
            } else {
              console.log(123,ls.getItem(dtStr),ls.getItem(fxStr),"答题分享");
              let fxc = Number(ls.getItem(fxStr))+1;
              ls.setItem(fxStr, fxc);
              console.log(posterConfig.activityInfo.datiBol, 'posterConfig.activityInfo.datiBol');
              if(posterConfig.activityInfo.datiBol && posterConfig.activityInfo.datiMin>0){
                if(dat2 < Number(fxc) + Number(posterConfig.activityInfo.datiMin)){
                  window.location.hash = window.location.hash.split('/fail')[0].split('/cheng')[0];
                  self.isfake = true;
                  self.isgame = true;
                  console.log(self.fxY,564,"分享的")
                  self.ismaskBig = true;
                  self.isGamefa = false;
                  window.goldlog.record(posterConfig.logInfo.gamewfLog.split(',')[0] ,'EXP','',posterConfig.logInfo.gamewfLog.split(',')[3]);
                  // self.isFxalert = true;
                }else{
                }
              }else{
                window.location.hash = window.location.hash.split('/fail')[0].split('/cheng')[0];
                self.isfake = true;
                self.isgame = true;
                self.isGamefa = false;
                window.goldlog.record(posterConfig.logInfo.gamewfLog.split(',')[0] ,'EXP','',posterConfig.logInfo.gamewfLog.split(',')[3]);
                // self.isFxalert = true;
              }
            }
            // self.isFxalert = false;
            // self.ismaskBig = false;
            // self.tkShow = true;
            // self.isSecond = true;
            // self.isFirst = false;
          }, 6000);
        }, function() {
          self.login();
          // alert('没有登录');
        });
      });
    },
    setParam: function(str) {
      let self = this;
      let url = window.location.href;
      console.log(url,"url",77);
      let bool = url.indexOf('#');
      let fuhao = url.indexOf('?') == -1 ? '?' : '&';
      if (bool) {
        url = url.split('#')[0] + fuhao + str + '#' + url.split('#')[1];
      } else {
        url += fuhao + str;
      }
      return url;
    },
    //站外跳到站内
    zhan: function(type){
      let self = this;
      let url;
      if (type == 'jilu') {
        url = self.setParam(`shouji=${self.text}&score=${self.score}`);
      } else {
        url = self.setParam(`share=1&score=${self.score}`);
      }
      var ykconfig =  {
        isNeedDownload: true,
        downloadUrl: "",
        uri: '', //是否跳转h5页面
        replace: false, //是否替换当前页面
        //"universalLinkState":"",
        params: {
          "action": "http",
          // "source": '',
          "url": url
        },
        pathname:"http"
      };
      console.log(url);
      callApp.gotoPage(ykconfig);
    },
    getList: function(){//添加score
      console.log(654)
      let self = this;
      // time时间判断
      let now = new Date();
      let time02 = now.getTime();
      let ck = posterConfig.canTime;
      ck = ck.replace(/-/g,'/');
      let date = new Date(ck);
      let time01 = date.getTime();
      let cz = parseInt((time02-time01)/(1000*60*60*24*7));
      var scoreObj = new Object();
        scoreObj.activity = this.posterConfig.activityInfo.rankActivity;
        scoreObj.subType = this.posterConfig.activityInfo.rankSubType + '-' + cz;
        console.log(scoreObj.subType,"获得成绩列表")
        scoreObj.isReverse = false;
        scoreObj.page = 1;
        scoreObj.pageSize = parseInt(this.posterConfig.activityInfo.rankSum);
        lib.mtop.request({
          api:"mtop.com.youku.aplatform.weakGet", // 必须
          v: '1.0',  // 必须
          H5Request :true,
          //appKey: '23774304', // 必须
          appKey: posterConfig.activityInfo.appKey,
          data: {bizType: 'commonRank.getRank', bizParam: JSON.stringify(scoreObj)},
          ecode: 0,   // 必须（注意2）
          type: 'GET',   // 非必须。请求类型（GET/POST），默认是GET
          dataType: 'jsonp', // 非必p须。数据类型（jsonp/originaljsonp/json），默认jsonp
          isSec: 0,
          timeout: 20000 // 非必须。接口超时设置，默认为20000ms
          },function(res){
            console.log(res,8777);

          for (var i = 0; i < res.data.rankList.length; i++) {
            switch(i) {
              case 0: res.data.rankList[i].img = posterConfig.resultInfo.rank01; break;
              case 1: res.data.rankList[i].img = posterConfig.resultInfo.rank02; break;
              case 2: res.data.rankList[i].img = posterConfig.resultInfo.rank03; break;
              default: res.data.rankList[i].img = ''; break;
            }
          }
          console.log(res.data.rankList,66555);
          self.gradeList = res.data.rankList;
          let gradeList1 = res.data.rankList;
          let len = gradeList1.length-1;
          self.grades = gradeList1[len].score;
          console.log(scoreObj.pageSize);
          if (gradeList1.length < scoreObj.pageSize) {
            self.grades = 0;
          }
          console.log(len,222222654,gradeList1,self.grades,9888)
        }, function(res) {
          // alert(JSON.stringify(res));
        });
    },
    //保存成绩并返回百分比
    saveScore: function(score){
      console.log('保存成绩');
      let self = this;
      let now = new Date();
      let time02 = now.getTime();
      let ck = posterConfig.canTime;
      ck = ck.replace(/-/g,'/');
      let date = new Date(ck);
      let time01 = date.getTime();
      let cz = parseInt((time02-time01)/(1000*60*60*24*7));
      return new Promise(function(resolve, reject){
        var scoreObj = new Object();
        scoreObj.activity = posterConfig.activityInfo.rankActivity;
        scoreObj.subType = posterConfig.activityInfo.rankSubType + '-' + cz;
        console.log(scoreObj.subType,"saveScore","保存成绩")
        // alert(scoreObj.subType,"saveScore","保存成绩");

        scoreObj.score = score;
        scoreObj.isReverse = false; //非必填  最优分数记录方式，默认TRUE。 TRUE表示纪录最高分数 ；FALSE表示记录最低分数 ，比如游戏耗时等
        scoreObj.isFilterScore = true; //非必填  是否对分数进行过滤，默认FALSE。 TRUE表示过滤；FALSE表示不过滤 
        scoreObj.maxScore = posterConfig.gameInfo.limitTime * 1000; //非必填 ，分数过滤最高分， 如果score 高于该分数则不记录
        scoreObj.minScore = posterConfig.gameInfo.minTime * 1000; //非必填 ，分数过滤最低分， 如果score 低于该分数则不记录
        self.getUserInfo().then(function(res){
          scoreObj.info = res;
          // alert(res,"res", scoreObj.info)
          // alert(JSON.stringify(res));
          lib.mtop.request({
            api: 'mtop.com.youku.aplatform.get', // 必须
            v: '1.0',  // 必须
            appKey: posterConfig.activityInfo.appKey, // 必须
            data: {bizType: 'commonRank.addScore', bizParam: JSON.stringify(scoreObj)}, // 必须
            type: 'GET',   // 非必须。请求类型（GET/POST），默认是GET
            dataType: 'jsonp', // 非必须。数据类型（jsonp/originaljsonp/json）默认 json
            ecode: 1, // native 请求识别参数。 1 为登录接口, 0 为非登录接口
            isSec: 0,
            timeout: 20000 // 非必须。接口超时设置，默认为20000ms
          },function(res){
            console.log('保存成功',res,545353,"保存成绩成功了");
            if(res.data && res.data.success && res.data.rankPer){
              self.getList();//添加score
              resolve(Math.round(res.data.rankPer * 100));
              self.rankPer2 = res.data.rankPer;
            }else{
              reject();
            }
          },function(res){
            reject();
          })
        });
      })
    },
    //判断是否登录，登录就保存
    islogin: function(){
      //checkAppLogin(){
      let self  = this;
        // 配置 mtop 请求地址, 此配置仅支持H5请求，客户端请求请使用debug包，切换环境 
      return new Promise(function(resolve, reject){
        var promise = lib.mtop.request({
          api: 'mtop.com.youku.aplatform.weakGet', // 必须
          v: '1.0',  // 必须
          data: {
            bizType: 'tool.isLogin'
          }, // 必须
          appKey: '23536927', // 必须 (优酷业务请根据上述表格进行选择)
          ecode: 0   // 必须（登录接口设置为1，非登录接口0）
        });
        promise.then((res)=>{
          // alert(JSON.stringify(res));
          console.log(res,5444)
          if (res.data.isLogin == true) {
            // self.isLogin = res.data.isLogin;
            resolve();
          } else {
            reject(); 
          }
        },(rej)=>{
          console.log(rej,'login err');
        });
      });
      //}
    },
    //保存成绩并返回百分比,没有什么要的值，rankPer会随给的（成绩）值发生变化，分数大于180000ms就会报错，
    queryScore: function(score){
      console.log('查询百分比');
      var self = this;
      let now = new Date();
      let time02 = now.getTime();
      let ck = posterConfig.canTime;
      ck = ck.replace(/-/g,'/');
      let date = new Date(ck);
      let time01 = date.getTime();
      let cz = parseInt((time02-time01)/(1000*60*60*24*7));
      return new Promise(function(resolve, reject){
        var scoreObj = new Object();
        scoreObj.activity = posterConfig.activityInfo.rankActivity;
        scoreObj.subType = posterConfig.activityInfo.rankSubType + '-' + cz;
        console.log(scoreObj.subType,"queryScore","请求成绩")
        scoreObj.isReverse = false;
        scoreObj.score = score;
        lib.mtop.request({
          // 通用参数
          api: 'mtop.com.youku.aplatform.weakGet', // 必须
          v: '1.0',  // 必须
          appKey: posterConfig.activityInfo.appKey, // 必须
          data: {
            bizType: 'commonRank.getRankPer', 
            bizParam: JSON.stringify(scoreObj)},
          ecode: 0,   // 必须（注意2）
          type: 'GET',   // 非必须。请求类型（GET/POST），默认是GET
          dataType: 'jsonp', // 非必p须。数据类型（jsonp/originaljsonp/json），默认jsonp
          isSec: 0,
          timeout: 20000 // 非必须。接口超时设置，默认为20000ms
        },function(res){
          console.log(res,34542);
          console.log('查询百分比成功');
          if(res.data && res.data.success && res.data.rankPer){
            self.rankPer2 = res.data.rankPer;
            resolve(Math.round(res.data.rankPer * 100));
            console.log(Math.round(res.data.rankPer * 100),434,"rankPer baifenbi");
          }else{
            reject();
          }
        },function(err){
          reject();
        })
      })
    },
    //查询用户当前最佳成绩
    getUserBest: function() {
      console.log('查询最优');
      var self = this;
      return new Promise(function(resolve, reject){
        var scoreObj = new Object();
        let now = new Date();
        let time02 = now.getTime();
        let ck = posterConfig.canTime;
        ck = ck.replace(/-/g,'/');
        let date = new Date(ck);
        let time01 = date.getTime();
        let cz = parseInt((time02-time01)/(1000*60*60*24*7));
        scoreObj.activity = posterConfig.activityInfo.rankActivity;
        scoreObj.subType = posterConfig.activityInfo.rankSubType + '-' + cz;
        scoreObj.isReverse = false;
        console.log(scoreObj.subType,889)
        lib.mtop.request({
          // 通用参数
           api: 'mtop.com.youku.aplatform.get', // 必须
          v: '1.0',  // 必须
          appKey: posterConfig.activityInfo.appKey, // 必须
          data: {bizType: 'commonRank.getRankWithEntity', bizParam: JSON.stringify(scoreObj)},
          ecode: 0,   // 必须（注意2）
          type: 'GET',   // 非必须。请求类型（GET/POST），默认是GET
          dataType: 'jsonp', // 非必p须。数据类型（jsonp/originaljsonp/json），默认jsonp
          isSec: 0,
          timeout: 20000 // 非必须。接口超时设置，默认为20000ms
        },function(res){
          console.log('查询最优成功',res,8877);
          if(res.data && res.data.success && res.data.baseInfo){
                resolve(res.data.baseInfo.score);
                self.cjgood2 = res.data.baseInfo.score;
                console.log(self.cjgood2,'cjgood2',887)
                self.rankPer = res.data.baseInfo.rankPer;
          }else{
            reject();
          }
        }, function(){
          reject();
        })
      })
    },
    shareZ: function(){
      //吊起主动分享
      console.log('分享');
      try {
        bradge.setShare({
          link: posterConfig.shareInfo.FxUrl,
          title: posterConfig.shareInfo.FxTitle,
          img:'https:'+ posterConfig.shareInfo.FxImg,
          desc: posterConfig.shareInfo.FxDesc
        });
      } catch(e) {
        // alert(JSON.stringify(e));
      }

      /*var params = {
        'sourceId': 10, //分享来源页面编号
        'outputType': 0, //分享内容类型
        'title': posterConfig.shareInfo.FxTitle,
        'image': 'http:'+posterConfig.shareInfo.FxImg,
        'desc': posterConfig.shareInfo.FxDesc,
        'url': posterConfig.shareInfo.FxUrl, //分享的页面链接
        'titleText': posterConfig.shareInfo.FxTitle,   //分享内容标题
        'descText': posterConfig.shareInfo.FxDesc,     //分享内容描述
        'thumbnailUrl': posterConfig.shareInfo.FxUrl,  //分享内容题图 
        'contentId': '19473'  //分享内容在优酷系统里的唯一标识（vid/sid/aid） 

      };
      window.WindVane.call('WVBehavioursBridge', 'showShareView', params, function(e) {
          console.log('success' + JSON.stringify(e));//调起成功
      }, function(e) {
          console.log('failure' + JSON.stringify(e));//调起失败
      });*/
    }
  }
}
</script>

<style scoped lang="less" type="text/css">
@import '../assets/css/mixin.less';
@hb: 13.34%;
/*首页*/
*{margin: 0;}
.clearBtn{
  width: 200/@b;
  height: 60/@b;
  line-height: 60/@b;
  background: yellow;
  color: blue;
  font-size: 32/@b;
  position: fixed;
  display: none;
}
.entrance {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
/*中心图片底框*/
.zhongPic{
  top: 290/@hb;
  /*margin-top: 18.7%;*/
  width: 650/@b;
  /*width: 86.6%;*/
  height:952/@hb;
  left: 50%;
  margin-left: -315/@b;
  /*height:71.4%;*/
  /*margin-left: 60/@b;*/
  /*left: 100/@hb;*/
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  position: absolute;
}
/*中心图片*/
.zhongHb{
  width: 481/@b;
  height: 485/9.52%;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  position: absolute;
  left: 70/@b;
  top: 200/@hb;
}
/*中心图片文案*/
.zhongTxt{
  position: absolute;
  left: 50%;
  margin-left: -275/@b;
  bottom: 320/@hb;
  width: 540/@b;
  height: 66/@b;
  line-height: 66/@b;
  text-align: center;
  color: #a59578;
  font-size:30/@b;
  font-weight: bold;
  overflow: hidden;
  padding: 0 5/@b;
}
/*开始按钮*/
.enterBtn{
  width: 468/@b;
  height: 118/@hb;
  position: absolute;
  left: 50%;
  margin-left: -234/@b;
  bottom: 60/@hb;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
/*活动规则*/
.ruleBtn{
  width: 51/@b;
  height: 143/@b;
  background-size: 100% 100%;
  position: absolute;
  background-repeat :no-repeat;
  background-position: center center;
  right: 20/@b;
  top: 20/@b;
}
.prizeBtn{
  width: 51/@b;
  height: 143/@b;
  background-size: 100% 100%;
  position: absolute;
  background-repeat :no-repeat;
  background-position: center center;
  right: 20/@b;
  top: 173/@b;
}
/**/
/*游戏玩法*/
#guide{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.guildTou{
  margin: 0 auto;
  margin-top: 80/@hb;
  width: 318/@b;
  height: 133/@hb;
}
.guildDK{
  position: absolute;
  left: 50%;
  top: 50%;

  margin-left: -290/@b;
  /*left: 90/@b;*/
  margin-top: -390/@b;
  width: 579/@b;
  height: 615/@b;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.guildQuest{
  font-size: 28/@b;
  color: #fff;
  font-weight: bold;
  width: 480/@b;
  height: 90/@b;
  line-height: 45/@b;
  position: absolute;
  left: 50/@b;
  top: 20/@b;
  display:flex;
  align-items:center;
  justify-content:space-around;
  flex-direction: column;
}
.guildBoxUl{
  width: 524/@b;
  height: 420/6.15%;
  overflow: hidden;
  position: absolute;
  left: 25/@b;
  top: 140/6.15%;
}
.guildBoxLi1{
  width: 255/@b;
  height: 426/@b;
  overflow: hidden;
  left: 25/@b;
  top: 55/@b;
  float: left;
  margin-right: 10/@b;
  background: #fff;
}
.guildMaskz{
  width: 255/@b;
  height: 426/@b;
  overflow: hidden;
  left: 25/@b;
  top: 55/@b;
  float: left;
  background: rgba(0,0,0,.5);
}
.guildEx01{
  width: 238/@b;
  height: 354/@b;
  position: absolute;
  left: 10/@b;
  top: 10/@b;
}
.guildEx02{
  width: 238/@b;
  height: 354/@b;
  position: absolute;
  left: 274/@b;
  top: 10/@b;
}
.guildAw01,.guildAw02{
  font-size: 28/@b;
/*  color: #fff;*/
  line-height: 32/@b;
  width: 238/@b;
  height: 32/@b;
  position: absolute;
  bottom: 10/@b;
  overflow: hidden;
  white-space: nowrap;/*不换行*/
  text-overflow:ellipsis;/*超出部分文字以...显示*/
}
.guildAw01{
  left: 5/@b;
}
.guildAw02{
  left: 270/@b;
}
.guildDui{
  width: 144/@b;
  height: 147/@b;
  position: absolute;
  left: 226/@b;
  top: 287/@b;
}
.guildBoxLi2{
  width: 255/@b;
  height: 426/@b;
  float: left;
  overflow: hidden;
  left: 25/@b;
  top: 55/@b;
  background: #fff;
}
/*游戏玩法介绍*/
.guideRTxt{
  color: #a59578;
  font-size: 26/@b;
  position: absolute;
  left: 50%;
  width: 573/@b;
  height: 160/@hb;
  /*overflow:hidden;*/
  margin-left: -290/@b;
  bottom: 220/@hb;
  line-height:32/@b;
  font-weight: bold;
  padding: 0 4/@b;
  /*background-color: #ff0000;*/
}
/*游戏玩法的按钮*/
.guideRBtn{
  position: absolute;
  left: 50%;
  width: 468/@b;
  height: 119/@hb;
  margin-left: -234/@b;
  bottom: 80/@hb;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.game{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
/*蒙层*/
.maskBig{
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0,.75);
}
/*游戏过渡效果*/

/*动画的过渡*/
.ready,.go{
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: fixed;
  z-index:1;
}

/*计时*/
#time{
  position: absolute;
  left: 50%;
  margin-left: -60/@b;
  top: 100/@hb;
  text-align: center;
  color: #fff4c0;
  font-size: 40/@b;
  font-weight: bold;
  height:60/@b;
  line-height: 60/@b;
}
/*大盒子（包ul加问题）*/
.gameWrap{
  position: absolute;
  left: 50%;
  margin-left: -350/@b;
  top: 280/@hb;
  width:743/@b;
  height:794/@hb;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
/*问题  一行居中*/
.question01{
  font-size: 40/@b;
  color: #fff;
  font-weight: bold;
  width: 610/@b;
  height: 100/@b;
  line-height: 50/@b;
  position: absolute;
  left: 70/@b;
  top: 60/@hb;
}
/*问题 两行居中*/
.question02{
  display:flex;
  align-items:center;
  justify-content:space-around;
  flex-direction: column;
}
/*ul*/
.tuBox{
  position: absolute;
  left: 33/@b;
  top: 175/8.31%;
  width: 655/@b;
  height: 540/7.94%;
  padding: 10/@b;
}
.tuBox li{
  float: left;
  width: 320/@b;
  height:530/5.3%;
  background: #fff;
}

.left{
  margin-right: 15/@b;
}
.leftT{
  float: left;
  width: 320/@b;
  height:530/5.3%;
  overflow: hidden;
  position: absolute;
  left: 0;
  margin-left: 10/@b;
  margin-top: 10/@b;
  margin-bottom: 10/@b;
  top: 0;
  animation-duration: 0.4s;
}
.leftR{
  float: left;
  width: 320/@b;
  height:530/5.3%;
  overflow: hidden;
  position: absolute;
  margin-right: 10/@b;
  margin-top: 10/@b;
  margin-bottom: 10/@b;
  right: 0;
  top: 0;
  animation-duration: 0.4s;
}
/*li的图片*/
.leftTu, .rightTu{
  /*display: block;*/
  width: 300/@b;
  height: 450/5.3%;
  margin-left: 10/@b;
  margin-top: 10/@b;
  margin-bottom: 10/@b;
}
/*图片下的文案*/
.leftAn,.rightAn{
  font-size: 30/@b;
  /*height: 70/5.3%;*/
  line-height: 60/@b;
  padding: 0 10/@b;
  overflow:hidden;
  width: 300/@b;
  display: block;
  margin-top: -15/@b;
  white-space: nowrap;/*不换行*/
  text-overflow:ellipsis;/*超出部分文字以...显示*/
}
/*两边的遮罩层*/
.maskli01,.maskli02{
  position: absolute;
  width: 320/@b;
  height: 550/7.94%;
  background: rgba(0,0,0,.5);
  
}
.maskli01{
  left: 43/@b;
  top: 245/10.9%;
}
.maskli02{
  left: 378/@b;
  top: 245/10.9%;
}
/*对和错的图*/
.succJ,.errC{
  position: absolute;
  left: 243/@b;
  top: 354/9.8%;
  width: 242/@b;
  height: 279/@b;
  z-index: 2;
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position: center center;
  animation-duration: 0.1s;
}
/*编码*/
.bianMa{
  color: #fff4c0;
  position: absolute;
  margin: 0 auto;
  bottom: 64/@b;
  font-size: 38/@b;
  font-weight: bold;
  left: 50%;
  margin-left: -12/@b;
}
/*外星人*/
#fake{
  position: absolute;
  left: 50%;
  top: 50%;
  width: 8.586667rem;
  height: 5.88rem;
  margin-left: -4.293333rem;
  margin-top: -3.266667rem;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  animation-duration: 0.4s;
  z-index: 100;
}
/*分享弹框*/
.fxalert{
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -279/@b;
  margin-top: -218/@b;
  width: 558/@b;
  height: 427/@b;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  animation-duration: 0.4s;
  z-index: 1;
}
.fxzi{
  font-size: 32/@b;
  font-weight: bold;
  color: #ffd966;
  margin: 0 auto;
  width: 500/@b;
  height: 160/@b;
  line-height: 50/@b;
  margin-top: 120/@b;
}
.fxzi.fxzi2{
  margin-top: 200/@b;
}
.hshare{
  position: absolute;
  bottom: 30/@b;
  margin-left: -230/@b;
}
.closeTk{
  top: 0/@b;
  right: 12/@b;
  width: 70/@b;
  height: 80/@b;
  position: absolute;

}
/*分享按钮*/
.j_try{
  display: block;
  width: 415/@b;
  height: 110/@b;
  font-size: 0;
  position: absolute;
  left: 110/@b;
  top: 260/@b;
}
/*关闭按钮*/
.closeWX{
  display: block;
  width: 56/@b;
  height: 46/@b;
  font-size: 0;
  position: absolute;
  left: 555/@b;
  top: 10/@b;
}
/*失败及奖品结果页*/
.fail{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    min-height: 1334/@b;
/*    bottom: 0;*/
    /*width: 750/@b;*/
    /*height: 3451/@b;*/
    background-repeat: repeat-y;
    background-position: center center;
    background-size: 100% 100%;
    animation-duration: 0.6s;
}
.failTop{
  width: 297/@b;
  height: 161/@b;
  margin: 0 auto;
  /*position: absolute;*/
/*  margin-left: 240/@b;*/
  background-size: 100% auto;
  background-repeat: no-repeat;
  background-position: center center;
}
.failTbkd{
  width: 664/@b;
  height: 289/@b;
  position: relative;
  margin: 0 auto;
  /*margin-left: 50/@b;*/
  margin-top: 30/@b;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
  overflow: hidden;
}
.ebu{
  font-size:34/@b;
  color: #e5d5aa;
  font-weight: bold;
  margin-top: 60/@b;
  margin-left: 10/@b;
  height: 60/@b;
  line-height:60/@b;
  overflow: hidden;
}
.bikan{
  display: block;
  width: 660/@b;
  height: 60/@b;
  line-height: 60/@b;
  overflow: hidden;
  margin-top: 20/@b;
}
.bikanW{
  font-size: 34/@b;
}
.bikantu{
  width: 34/@b;
  height: 34/@b;
  display: inline-block;
  vertical-align: sub;
  margin-left: 5/@b;
}
.j_share{
  width: 468/@b;
  height: 119/@b;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  display: inline-block;
  margin-top: 80/@b;
  &.starFx{
    margin-top: 260/@b;
  }
}

.shousu{
  width:323/@b;
  height:124/@b;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  margin: 0 auto;
  margin-top: 80/@b;
}
.chengji{
  height: 72/@b;
  width: 662/@b;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
  margin: 0 auto;
  margin-top: 30/@b;
  margin-bottom: 30/@b;
  /*margin-left: 50/@b;*/
}
.cjtxt{
  width:660/@b;
  height: 70/@b;
  line-height: 70/@b;

  color: #fff;
  font-size: 30/@b;
}
.paiming{
 
  list-style: none;
  width: 662/@b;
  margin: 0 auto;
  overflow: hidden;
}
.paiming li{
  float: left;
  width:220/@b;
  color: #e4d6aa;
  font-size: 32/@b;
  font-weight: bold;
}
.paiming li:first-child{
    text-align: left;
    margin-left:60/@b;
    width: 160/@b;
}
.scores{
  width: 662/@b;
  margin: 0 auto;
  margin-top: 20/@b;
  overflow: hidden;
}
.scores li{
  float: left;
  height: 120/@b;
  line-height: 120/@b;
}
.rankM{
  font-size: 24/@b;
  color: #e4d6aa;
  text-align: left;
  display: inline-block;
  margin-left:-390/@b;
  /*width: 240/@b;*/
}
.touBgY{
  width: 90/@b;
  height: 90/@b;
  display: inline-block;
}
.nickM{
  width: 240/@b;
  font-size: 24/@b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #e4d6aa;
  margin-left: 55/@b;
}
/*成功页面*/
.succ{
  position: absolute;
  left: 0;
  top: 0;
  right:0;
  min-height: 1334/@b;
/*  width: 750/@b;*/
  /*height: 2710/@b;*/
  background-repeat: repeat-y;
  background-size: 100% auto;
  background-position: center top;
  animation-duration: 0.6s;
}
.succcBgTop{
  /*position: absolute;*/
  left: 0;
  top: 0;
  left: 50%;
  margin-left: -375/@b;
  width: 750/@b;
  height: 522/@b;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center top;
  animation-duration: 0.6s;
}
.succTu{
  width: 278/@b;
  height:169/@b;
  margin: 0 auto;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center top;
  margin-top: -250/@b;
}
.succdik{
  width: 664/@b;
  height:515/@b;
  margin: 0 auto;
  margin-top: -100/@b;
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
}
.succdik2{
  width: 664/@b;
  height:429/@b;
  margin: 0 auto;
  margin-top: 1/@b;
  margin-bottom: 60/@b;
  position: relative;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
}
.tongM{
  position: absolute;
  left:20/@b;
  top: 200/@b;
  width: 560/@b;
  line-height:46/@b;
  color: #fff4c0;
  font-size: 30/@b;
  overflow: hidden;
  margin: 0 auto;
}
.tongM2{
  position: absolute;
  left: 45/@b;
  top: 80/@b;
  width: 560/@b;
  color: #fff;
  font-size: 30/@b;
  line-height: 32/@b;
  overflow: hidden;
  margin: 0 auto;
}
.wenanS{
  position: absolute;
  left:20/@b;
  top: 150/@b;
  width: 640/@b;
  font-size: 30/@b;
  line-height: 32/@b;
  color:#e4d6aa;
  font-weight: bold;
  margin: 0 auto;
}
.wenanL{
  position: absolute;
  left:20/@b;
  top: 390/@b;
  width: 640/@b;
  font-size: 26/@b;
  line-height: 30/@b;
  color:#b24647;
  font-weight: bold;
  margin: 0 auto;
}
.biaoda{
  position: absolute;
  left: 80/@b;
  top: 230/@b;
  width: 303/@b;
  height: 70/@b;
  border-radius: 10/@b;
  border-color: #b24647;
  font-size: 26/@b;
  line-height: 30/@b;
  color:#b24647;
  /*font-weight: bold;*/
  /*margin: 0 auto;*/
}
.formTj{
  position: absolute;
  left: 430/@b;
  top: 235/@b;
  width: 161/@b;
  height: 70/@b;
  border-radius: 10/@b;
}
.total{
  position: fixed;
  left: 50%;
  top: 50%;
  margin-top: 40/@b;
  height: 60/@b;
  padding: 10/@b;
  line-height: 60/@b;
  background: rgba(0,0,0,.6);
  color: #fff;
  border-radius: 20/@b;
  z-index: 100;
}
.succShare{
  margin-top: 10/@b;
}
.sxpm{
  margin-top: 30/@b;
}
.goodGrade{
  width: 662/@b;
  height: 76/@b;
  line-height: 76/@b;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center top;
  margin: 0 auto;
  color: #fff;
  margin-top: 26/@b;
  font-size: 30/@b;
}
.paimaing02{
  margin-top: 40/@b;
/*  margin-left: 60/@b;*/
  margin-bottom: 20/@b;
}
.scores02{
  width: 662/@b;
  height: 120/@b;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100% 100%;
  /*margin-left: 43/@b;*/
  margin: 0 auto;
  overflow: hidden;
  margin-bottom: 10/@b;
}
.ranks{
  width: 240/@b;
  height:120/@b;
  float: left;
  position: relative;
}
.rank01{
  width: 48/@b;
  height: 60/@b;
  vertical-align: bottom;
  display: inline-block;
  margin-right: 30/@b;
  position: absolute;
  top: 30/@b;
  left: 40/@b;
}
.num01{
  position: absolute;
  color: #fff4c0;
  font-size: 34/@b;
  left: 55/@b;
  top: 34/@b;
}
.touBg{
  width: 90/@b;
  height: 90/@b;
  overflow:hidden;
  position: absolute;
  top: 16/@b;
  left:120/@b;
  border-radius: 100%;
  display: inline-block;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}
.touxiang{
  width: 80/@b;
  height: 80/@b;
  text-align:center;
  margin: 5/@b;
  border-radius: 100%;
}
.nicks{
  width: 206/@b;
  font-size: 26/@b;
  line-height: 120/@b;
  color: #fff4c0;
  float: left;
  margin-left: 20/@b;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.chengji2{
  width: 187/@b;
  font-size: 26/@b;
  color: #fff4c0;
  text-align: center;
  line-height: 120/@b;
  float:left;
}
.chengji2 span{
  padding-right:5/@b;
  font-size: 36/@b;
}
.bangdan{
  width: 662/@b;
  margin: 0 auto;
  overflow:hidden;
  font-size: 26/@b;
  color: #dd5b59;
  line-height: 30/@b;
  padding: 20/@b 5/@b;
  text-align: left;
}
</style>
