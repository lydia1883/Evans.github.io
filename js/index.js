/**
 * Created by Evans on 2016/1/9.
 */


  /*第二页布局实现*/
  /*$(function(){       
        

			var aLi=$("#section_1 ol li")
			for(var i=0;i<aLi.get().length;i++){

				aLi[i].style.left=(i%8)*12+'em';
				aLi[i].style.top=Math.floor(i/8)*12+'em';	
			}

  });*/

  define(['jquery'],function($){
    
    /*第二页布局*/
  	function Ball_Left(){

	    var aLi=$("#section_1 ol li")
		for(var i=0;i<aLi.get().length;i++){

			aLi[i].style.left=(i%8)*12+'em';
			aLi[i].style.top=Math.floor(i/8)*12+'em';	
		}	
  	}	

  	/*第三页轮播*/
  	function Ball_Show(){

  		var aBtn=$(".img_show ol li");
  		var oUl=$(".img_show ul");
  		var aImg=$(".img_show ul").find("img");
  		var aFigure=$("#Mark").find("figure");
  		var aClose=$("#Mark").find(".close");
  		var _width=$(".img_show").width();
  		var now=0;
  		aBtn.on("click",function(){
           now=$(this).index();
           oUl.animate({
           	left:-now*_width
           });

           $(this).attr("class","active").siblings("li").attr("class","");
  		});
  		 $(window).on("resize",function(){

  	  		 _width=$(".img_show").width();
	  	  	  oUl.animate({
	           	left:-now*_width
	          });
  	    });  

  	    /*点击看大图*/
		for(var i=0;i<aImg.get().length;i++){
			aImg[i].index=i;	
			aImg[i].onclick=function(){
				aFigure[this.index].style.display="block";
			}
		}
  	    aClose.on("click",function(){
  	    	aFigure.hide();	
  	    })

  	}

  	/*时光轴*/
    function timeLine(){

    	var aDot=$("#section_3 footer .dot");
  
    	aDot.hover(function(){
    		$("#section_3 footer .dot").find(".timeline").css("display","none");
    		$(this).find(".timeline").css("display","block");
    	},function(){
    		
    			$(this).find(".timeline").css("display","none");	
    
    	})
    }

    /*时钟*/

    function clock(){

    	function toTwo(n){
    		if(n<10){
    			return "0"+n;
    		}
    		else{

    			return ""+n;
    		}
    	}

    	var aLi=$("#aside ul li");
    	var oBtn=$("#aside span");
    	var onOff=true;
    	var oDate=new Date();
    	var str="";
    	str=toTwo(oDate.getHours())+':'+toTwo(oDate.getMinutes())+':'+toTwo(oDate.getSeconds());
    
    	for(var i=0;i<aLi.get().length;i++){
    		if(i!=2 && i!=5){
    			aLi[i].innerHTML=str.charAt(i);
    		}
    	}
    	oBtn.html( toTwo(oDate.getHours())+':'+toTwo(oDate.getMinutes()) );
    	setInterval(function(){
    		oBtn.html( toTwo(oDate.getHours())+':'+toTwo(oDate.getMinutes()) );
    	},1000);
    	

    	oBtn.on("click",function(){
    		if(onOff){
    		$("#aside").css({"left":0});
    		onOff=false;
    		}else{
    		$("#aside").css({"left":-512});	
    		onOff=true;
    		}
    	})

    }


  	return {
  		Ball_Left:Ball_Left,
  		Ball_Show:Ball_Show,
  		timeLine:timeLine,
  		clock:clock
  	}


  });

 /*第三页轮播实现*/ 


