/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-01-13 14:13:49
 * @version $Id$
 */

 require.config({
 	
 	shim:{
 		'PageSwitch':['jquery']
 	},
 	paths:{
 		jquery:'jquery-2.1.4.min',
 		PageSwitch:'PageSwitch'
 	}
 });
 //将jq更名

 requirejs(['jquery','index','PageSwitch'],function($,index,PageSwitch){

 	  index.Ball_Left();
 	  index.Ball_Show();
 	  index.timeLine();
 	  index.clock();
 	  setInterval(function(){
 	  	index.clock()
 	 
 	  },1000);


 	  $("#container").PageSwitch({
 	  	  'loop':true,
 	  	  'keyboard':true,
 	  	  'direction':'vertical',

 	  })
 });