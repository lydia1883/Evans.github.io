/**
 * Created by Evans on 2016/1/9.
 */
/*全屏切换自定义插件*/

 
  ;(function($){

  	var _prefix=(function(temp){

  		var aPrefix=['webkit','moz','o','ms'],
  		props='';

  		for(var i in aPrefix){

  			props=aPrefix[i]+"Transition";
  			if(temp.style[props]!==undefined){

  				return "-"+aPrefix[i].toLowerCase()+'-';
  			}
  		}

  	  return false;	

  	})(document.createElement(PageSwitch));

  	var PageSwitch=(function(){

  		function PageSwitch(element,opt){

  			this.settings=$.extend(true,$.fn.PageSwitch.defaults,opt||{}); //配置参数覆盖默认参数
  			this.element=element;//作为共有属性
  			this.init();//初始化整个插件
  		}

  		PageSwitch.prototype={  //重写整个原型

  			//初始化插件
  			init:function(){

  				var me=this; //Pg对象
  				me.selectors=me.settings.selectors;  //获取默认参数中选择器
  				me.sections=me.element.find(me.selectors.sections);//获取父元素DOM元素
  				me.section=me.sections.find(me.selectors.section);//获取子元素DOM元素

  				me.direction=me.settings.direction == 'vertical' ? true : false;  //获取页面方向
  				me.pagesCount=me.pagesCount(); //获取页面数量
  				me.index=( me.settings.index >= 0 && me.settings.index< me.pagesCount ) ? me.settings.index : 0; //如果页面索引大于等于零并且小于页面数量 索引为上，否则为0;
  				
  				me.canScroll=true;

  				if(!me.direction){//如果是横屏，调用layout
  					me._initLayout();   //横屏布局
  				}	
  				if(me.settings.pagination){  //如果为分页
  					me._initPaging();  //调用初始化分页dom结构函数
  				}

  				me._initEvent();  //调用事件函数
  			},
  			//初始化结束

  			//获取页面滑动数量
  			pagesCount:function(){
  				return this.section.length;
  			},
  			//获取滑动宽度或高度
  			switchLength:function(){
  				return this.direction ? this.element.height() : this.element.width();
  			},
  			//上一张方法
  			prev:function(){

  			   var me=this;
  			   if(me.index>0){
  			   	me.index--;
  			   }else if(me.settings.loop){
  			   	me.index=me.pagesCount-1;
  			   }	

  			   me._scrollPage();//调用滑动方法
  			},
  			//下一张方法
  			next:function(){

  			   var me=this;
  			   if(me.index<me.pagesCount){
  			   	me.index++;
  			   }else if(me.settings.loop){
  			   	me.index=0;
  			   }	

  			   me._scrollPage();//调用滑动方法
  			},

  			//针对横屏情况的页面布局
  			_initLayout:function(){

  				var me=this;
  				var width=( me.pagesCount *100 )+'%',   //获取整个容器宽度
  				cellWidth=(100 / me.pagesCount).toFixed(2)+'%';  //每个容器宽度

  				me.sections.width(width);//设置整个容器宽度
  			    me.section.width(cellWidth).css("float","left");  //设置每个容器
  			},

  			//实现分页Dom结构及CSS样式
  			_initPaging:function(){

  				var me=this,
  				pagesClass=me.selectors.pages.substring(1);   //存储按钮UL的类名
  				me.activeClass=me.selectors.active.substring(1); //存储选中的类名
  				var pageHTML="<ul class="+ pagesClass +">";  //存储dom结构

  				for(var i=0;i<me.pagesCount;i++){  //循环页数
  					pageHTML+="<li></li>";//存储dom结构
  				}

  				pageHTML+="</ul>"; //存储dom结构
  				me.element.append(pageHTML);  //添加到元素中

  				var pages=me.element.find(me.selectors.pages);  //查找按钮父元素dom
  				me.pageItem=pages.find("li"); //查找li Dom元素
  				me.pageItem.eq(me.index).addClass("active");  //添加选中类

  				if(me.direction){
  					pages.addClass("vertical");
  				}else{
  					pages.addClass("horizontal");
  				}
  			},

  			//初始化插件事件
  			_initEvent:function(){

  				var me=this;
  				me.element.on("click", me.selectors.pages+">li",function(){
  					

  					me.now=$(this).index();//存储当前索引
  					if(me.canScroll){
  						me.index=$(this).index();  //存储当前索引
  						me._scrollPage();   //调用滑动事件
  					}
  				});	

  				me.element.on("mousewheel DOMMouseScroll",function(e){  //调用鼠标滚动事件

  					e.preventDefault();
  					if(me.canScroll){

  						var delta=e.originalEvent.wheelDelta || -e.originalEvent.detail;
  						if( delta > 0 && (me.index && !me.settings.loop || me.settings.loop )){

  							me.prev();  //调用上一页事件
  						}else if( delta < 0 && ( me.index < (me.pagesCount-1) && !me.settings.loop || me.settings.loop ) ){

  							me.next();  //调用下一页事件
  						}

  					}

  				});

  				//键盘事件
  				if(me.settings.keyBoard){

  					$(window).on("keydown",function(e){

  						if(me.canScroll){
  							var keyCode=e.keyCode;
  							if(keyCode==37 || keyCode==38){
  								me.prev();
  							}
  							if(keyCode==39 || keyCode==40){
  								me.next();
  							}
  						}

  					});
  				}

  				//resize事件
  				$(window).resize(function(){

  				   var currentLen=me.switchLength(),//获取宽或高

  				   offset=me.settings.direction ? me.section.eq(me.index).offset().top : me.section.eq(me.index).offset().left;  //获取top或者left
  				   if(Math.abs(offset)>currentLen/2 && me.index<(me.pagesCount-1)){
  				   	me.index++;  
  				   }
  				   if(me.index){
  				   	me._scrollPage();  //翻页
  				   }
  				});

  				me.sections.on("transitionend webkitTransitionEnd oTransitionEnd",function(){

  					me.canScroll=true;
  					if(me.settings.callback && $.type(me.settings.callback=='function')){
  						me.settings.callback();
  					}

  				});

  			},

  			//_scrollPage
  			_scrollPage:function(){

  				var me=this,
  				dest=me.section.eq(me.index).position();
  				if(!dest) return;//得不到距离返回

  				if(!me.canScroll){return;}
  				me.canScroll=false;

  				if(_prefix){

  				  me.sections.css(_prefix+"transition","all "+me.settings.duration+"ms "+me.settings.easing);  //添加css3动画	

  				  var translate=me.direction ? "translateY(-"+dest.top+"px)" : "translateX(-"+dest.left+"px)";

  				  me.sections.css(_prefix+"transform",translate);

  				}else{

  					var animateCss=me.direction ? {top : -dest.top } : { left : -dest.left};
  					me.sections.animate(animateCss,me.settings.duration,function(){

  						me.canScroll=true;
  						if(me.settings.callback && $.type(me.settings.callback)=='function'){
  							me.settings.callback();
  						}
  					});
  				}

  				if(me.settings.pagination){
  					me.pageItem.eq(me.index).addClass(me.activeClass).siblings("li").removeClass(me.activeClass);
  				}

  			}

  		};

  		return PageSwitch;//返回这个构造函数

  	})();

  	$.fn.PageSwitch=function(opt){

  		return this.each(function(){  //实现链式调用

  		  var me=$(this),  //操作的元素
  		  instance=me.data("PageSwitch");//建立数据名存放实例

  		  if(!instance){  //单例模式
  		  	instance=new PageSwitch(me,opt);//  如实例不存在，创建对象，传入操作对象，配置参数
  		    me.data("PageSwitch",instance);//存放实例
  		  }

  		  if($.type(opt)==='string') return instance[opt]();//实现init调用；
  		});
  	};

  	$.fn.PageSwitch.defaults={	

  		selectors:{
  			sections:".sections",  //父容器相对的class
  			section:".section",//子容器相对的class
  			pages:".pages",	  //对应的分页
  			active:".active"  //对应页面选中是的class
  		},
  		index:0, //对应的页面索引值
  		easing:'ease',//对应动画效果
  		duration:500,  //持续时间
  		loop:'false',//能否循环
  		pagination:true,//是否能分页处理
  		keyBoard:true,//是否使用键盘事件
  		direction:true,  //滑动的方向
  		callback:''
  	};


  })(jQuery);
