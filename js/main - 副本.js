var land2 = function(){
	var _this = this;
	setTimeout(function(){ _this.init(); }, 500)
	//this.init();
}
land2.prototype = {
	init:function(){
		var _self = this;
		_self.fitwin();
		_self.loadimg();
	},
	loadimg:function(){
		var _self = this;
		var imgarr = ['page3_bg.png','icon_arrow.png','logo_cover.png','music_icon.png','page1_icon1.png','page1_icon2.png','page1_icon3.png','page1_bg.png','page1_icon4.png','page2_a1.png','page2_a2.png','page2_a3.png','page2_bg.png','page3_a1.png','page3_a2.png','page3_a3.png','page3_bg.png','page3_over.png','page4_a1.png','page4_a2.png','page4_a3.png','page4_bg.png','share.png'];
		new wrLoading('.loading',imgarr,function(){
			_self.start();
		});
	},
	start:function(){
		$(".loading").fadeOut();
		homeAnimate();
		//console.log(1)
	},
	fitwin:function(){
		
	}
}
function progressHandle(progress){
	var p = parseInt(progress*100);
	//$("#loading_progress").css("width",(p*1.6)+"px");
	//$("#loading_num").html(p);
	//console.log(progress);
}

var l = new land2();
$(window).resize(function(){
	l.fitwin();
})

function delayAnimation(o,c,t){
	$(o).hide();
	setTimeout(function(){
		$(o).show();
		$(o).addClass(c);
	},t);
}
//淡入
var sto=new Array();
var sn=0;
function objfadeIn(o,t,speed){
	speed=(speed==""||speed==undefined)?500:speed;
	$(o).hide();
	sto[sn]=setTimeout(function(){
	$(o).fadeIn(speed);
	},t);
	sn++;
}
function objfadeOut(o,t,speed){
	speed=(speed==""||speed==undefined)?500:speed;
	setTimeout(function(){
		$(o).fadeOut(speed);
	},t);
}
var ps1=false,ps2=false;
var myAudio=new Audio();
myAudio.setAttribute('src','images/bg.mp3');                
myAudio.loop = true;
myAudio.volume=1;
myAudio.play();
var playFlag = false;
$(".icon_music").bind("touchstart",function(){ 
	if(!playFlag){
		 myAudio.pause();
		 $(".icon_music").removeClass("music_play");
	}
	else{
		myAudio.play();
		$(".icon_music").addClass("music_play");
	}
	playFlag = !playFlag;
});

psws=false;
var pbtn = false;
$(function(){
	$("#page2_btn").bind("touchstart",function(){ 
		if(!pbtn){
			pbtn=true;
			objfadeOut(".page2_a2",0*aspeed,0.5*aspeed);
			delayAnimation(".page2_a3","icon_sb_animate",0*aspeed);
			objfadeIn("#page2_patica",1*aspeed,0.3*aspeed);
		}
	})
	$("#page3_btn").bind("touchstart",function(){ 
		if(!pbtn){
			pbtn=true;
			objfadeOut(".page3_a2",0*aspeed,0.5*aspeed);
			delayAnimation(".page3_a3","icon_sb_animate",0*aspeed);
			objfadeIn("#page3_patica",1*aspeed,0.3*aspeed);
		}
	})
	$("#page4_btn").bind("touchstart",function(){ 
		if(!pbtn){
			pbtn=true;
			objfadeOut(".page4_a2",0*aspeed,0.5*aspeed);
			delayAnimation(".page4_a3","icon_sb_animate",0*aspeed);
			objfadeIn("#page4_patica",1*aspeed,0.3*aspeed);
		}
	})
})

var page=1;
var pageMove=true;
var pm=false;
$(".pages").bind("touchstart",function(){ 
	event.preventDefault();
	var touch1 = event.touches[0];
	startY = touch1.pageY;
	endY = touch1.pageY;
});
$(".pages").bind("touchmove",function(){
	event.preventDefault();
	var touch1 = event.touches[0];
	endY = touch1.pageY;
});
$(".pages").bind("touchend",function(){
	if(Math.abs(startY - endY) > 200){
		if(startY > endY){
			//next
			if(page==5) return;
			if(pageMove){
				pm = true;
				page++;
				callPage();
			}
		}else{
			//prev
			if(page==1) return;
			if(pageMove){
				pm = false;
				page--;
				callPage();
			}
		}
	}
	startX = 0;
	endX = 0;
});

function callPage(){
	zindex++;
	pageMove=false;
	console.log("page:"+page);
	switch(page){
		case 1:	page1Animate();break;
		case 2: page2Animate();break;
		case 3: page3Animate();break;
		case 4: page4Animate();break;
		case 5: page5Animate();break;
	}
}

var aspeed=1000;

homeAnimate();
var zindex=100;
var ptop = 1039;
function homeAnimate(){
	$("#page1").show();
	objfadeIn(".page1_jb2",0,1*aspeed);
	objfadeIn(".page1_jb3",0.5*aspeed,1*aspeed);
	setTimeout(function(){
		$(".page1_icon1,.page1_icon2,.page1_icon4").fadeIn();
	},800)
	setTimeout(function(){
		pageMove=true;
	},1*aspeed)
}
function page1Animate(){
	pbtn=false;
	pagesMove($("#page1"));
	objfadeIn(".page1_jb2",0,1*aspeed);
	objfadeIn(".page1_jb3",0.5*aspeed,1*aspeed);
	setTimeout(function(){
		$(".page1_icon1,.page1_icon2,.page1_icon4").fadeIn();
	},800)
	pageMove=true;
}
function page2Animate(){
	pbtn=false;
	$(".page2_a3,#page2_patica").hide();
	$(".page2_a1").show();
	pagesMove($("#page2"));
	objfadeOut(".page2_a1",1*aspeed,0.5*aspeed);
	delayAnimation(".page2_a2","icon_sb_animate",1*aspeed);
	pageMove=true;
}
function page3Animate(){
	pbtn=false;
	pagesMove($("#page3"));
	$(".page3_a3,#page3_patica").hide();
	$(".page3_a1").show();
	objfadeOut(".page3_a1",1*aspeed,0.5*aspeed);
	delayAnimation(".page3_a2","icon_sb_animate",1*aspeed);
	pageMove=true;
}
function page4Animate(){
	pbtn=false;
	pagesMove($("#page4"));
	$(".page4_a3,#page4_patica").hide();
	$(".page4_a1").show();
	objfadeOut(".page4_a1",1*aspeed,0.5*aspeed);
	delayAnimation(".page4_a2","icon_sb_animate",1*aspeed);
	pageMove=true;
	$(".icon_arrow").show();
}
function page5Animate(){
	pbtn=false;
	pagesMove($("#page5"));
	$(".icon_arrow").hide();
	pageMove=true;
}
function pagesMove(obj){
	obj.css({"z-index":zindex}).hide();
	console.log(pm)
	setTimeout(function(){
		if(!pm){
			obj.show().addClass("page_move_upper");
		}else{
			obj.show().addClass("page_move_under");
		}
	},50)
}