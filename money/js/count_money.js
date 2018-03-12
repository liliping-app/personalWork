//配置数据
var config = {
  //前往用券链接
  useUrl: 'https://market.aliyun.com',
  timeOut:8
};
config.quan = new Map();
//券信息
config.quan.set(0, "WDCP V3.2管理面板多版本PHP共存和SSL CentOS6.8-https://market.aliyun.com/products/57742013/cmjj018542.html-福州兴奕盛网络科技有限公司-https://market.aliyun.com/coupon?tId=100000081471-100-满200元使用");
config.quan.set(1, "CentOS 5.10 64位-https://market.aliyun.com/products/57742013/cmjj010349.html-阿里云计算有限公司-https://market.aliyun.com/coupon?tId=100000081472-20-满200元使用");
config.quan.set(2, "CentOS 5.10 64位-https://market.aliyun.com/products/57742013/cmjj010349.html-阿里云计算有限公司-https://market.aliyun.com/coupon?tId=100000081473-50-满200元使用");
config.quan.set(3, "WDCP V3.2管理面板PHP多版本共存 CentOS7.3 64位-https://market.aliyun.com/products/57742013/cmjj021148.html-北京君云时代科技有限公司-https://market.aliyun.com/coupon?tId=100000081474-90-满200元使用");
config.quan.set(4, "CentOS 6.5 64位-https://market.aliyun.com/products/57742013/cmjj010346.html-阿里云计算有限公司-https://market.aliyun.com/coupon?tId=100000081475-2000-满22200元使用");
config.quan.set(5, "身份证实名认证，验证姓名+身份证号码是否一致，身份证校验！覆盖全国人口-https://market.aliyun.com/products/57742013/cmapi016424.html-上海加数信息科技有限公司-https://market.aliyun.com/coupon?tId=100000081476-70-满100元使用");
config.quan.set(6, "银行卡四要素（四元素）实名认证-https://market.aliyun.com/products/57742013/cmapi021096.html-苏州云亿互通信息服务有限公司-https://market.aliyun.com/coupon?tId=100000081477-90-满260元使用");
config.quan.set(7, "WordPress建站博客系统（LAMP | 视频）-https://market.aliyun.com/products/57742013/cmjj010728.html-长沙网久软件有限公司-https://market.aliyun.com/coupon?tId=100000081478-10000-满50000元使用");
config.quan.set(8, "ASP.NET运行环境(2.0/3.5/4.0+MySql5.5）-https://market.aliyun.com/products/57742013/cmjj007582.html-武汉完美网络服务有限公司-https://market.aliyun.com/coupon?tId=100000081479-3779-满6000元使用");

document.body.addEventListener('touchmove', function(event){
  event.preventDefault();
  return false;
}, false);
function maxNum(min,max){
    return parseInt(Math.random()*(max-min+1)+min);
  }
// 数据配置（优惠券）
var maxValue = maxNum(0,8);
$('.yuan_num').html(parseInt(config.quan.get(maxValue).split('-')[4]));
$('.gold').html(config.quan.get(maxValue).split('-')[0]);
$('.gong').html(config.quan.get(maxValue).split('-')[2]);
$('.use').html(config.quan.get(maxValue).split('-')[5]);
$('.gold1').attr('href',config.quan.get(maxValue).split('-')[1]);
$('.gong1').attr('href',config.quan.get(maxValue).split('-')[3]);
$('.mask_loading').show();
setTimeout(function(){
  $('.mask_loading').hide();
},1000);
$('.btn_game').on('click',function(e){
  e.preventDefault();
  $(this).css('background-image','url(img/btn_down.png)');
  
  });

  $('.btn_game').on('click',function(e){
    e.preventDefault();
    $(this).css('background-image','url(img/btn_down.png)');
    setTimeout(function(){
      $('.money').hide();
      $('.mask').show();
      $('.two').show();
      var mask = document.querySelector('.mask');
      mask.addEventListener('click',function(){
        $('.mask').hide();
        $('.show').show();
        var num = config.timeOut;
        $('#div_countDown').html(num);
        timeOut(num);
        load();
      }, false);  
    },100);
  });
var touchY, touchY2;
$('.voucher').attr('href',config.useUrl);
  function load (){  
    var count = 0;
    $('.list').get(0).addEventListener('touchstart',touch, false);  
    $('.list').get(0).addEventListener('touchmove',touch, false);  
    $('.list').get(0).addEventListener('touchend',touch, false);     
    function touch (event){  
      var event = event || window.event;    
      switch(event.type){  
        case "touchstart":  
          touchY = event.touches[0].clientY;
          $('.more_slide').prepend('<img class="more" src="img/money.png" alt=""/>');
          $('.more:first').css('transform', 'scale(0.9)');
          $('.finger').css('z-index',6);
          break;  
        case "touchend":   
          console.log(touchY2 - touchY);
          $('.more:first').css({
            'transform':'scale(1)'
          });
          if (touchY2 - touchY < 0) {
            $('.more:first').addClass('move');
            $('.finger').css('z-index',6);
            count ++;
          } else {
            $('.more:first').hide();
          }
          break;  
        case "touchmove":  
          touchY2 = event.touches[0].clientY;
          event.preventDefault(); 
          $('.dollar').html(count);
          console.log(count,5545554);
          break; 
      }     
    }  
  } 

// window.addEventListener('load',load, false);  
// 倒计时
function timeOut(num){
  var name = setInterval(function(){
    $('#div_countDown').html(num-1);
    num --;
    if(num == 0){
      clearInterval(name);
      $('.two').hide();
      $('.cash').show();
      
    }
  },1000);
}
// 分享按钮按下
$('.share').on('click',function(e){
  e.preventDefault();
  $(this).css('background-image','url(img/share.png)');
  $('.fen').css('display','block');
});
$('.again').on('click',function(e){
  e.preventDefault();
  $('.more_slide').html('');
  $(this).css('background-image','url(img/again.png)');
  $('.list_img').css('display','none');
  setTimeout(function(){
    var num = config.timeOut;
    $('#div_countDown').html(num);
    $('.two').show();
    $('.cash').hide();
    timeOut(num);
    load();
  },1000);
});
$('.cancel').on('click',function(e){
  e.preventDefault();
  $('.fen').hide();
})