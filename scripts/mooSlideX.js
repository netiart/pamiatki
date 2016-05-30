window.addEvent('domready',function(){

	$$('a').each(function(x){
		y = x.getAttribute('rev');
	
		if(navigator.appVersion.indexOf('MSIE') != -1){
			if(y != ""){
				$(y).setStyle('visibility','hidden');
			}
		}else{
			if(y != null){
				$(y).setStyle('visibility','hidden');
			}
		}
	})
})

var xxx = new Array();

$$('a').each(function(el){
	if(el.getAttribute('rel') == "designSlide"){
		
		// preload images
		a = new Image();
		lnk = el.getAttribute('href');
		a.src = lnk;
		xxx.push(a);
	
		el.addEvent('click',function(x){		
		// old container still existing? remove it
		if($('container2') != false){
			$('container2').remove();
		}
		
		//go
		bd = document.body;
		windowHeight = 0;
		windowWidth = 0;
		title = el.getAttribute('title');
		titleSplitPos = title.indexOf("::");
		titleHead = title.substring(0,titleSplitPos);
		lengthContent = title.length + titleSplitPos
		titleContent = title.substring(titleSplitPos+2,lengthContent);
		addContent = el.getAttribute('rev');
	
		if($(addContent) != false){
			addContentCont = $(addContent).innerHTML;
			$(addContent).setStyle('visibility','hidden');	
		}
	
		nav = navigator.appName;
		windowHeight = window.getScrollTop() + window.getHeight();
		var x = new Event(x).stop();
		var hrefSrc = el.getAttribute('href');
		var preloadPrev = new Image();
		preloadPrev.src = hrefSrc;
		var imgWidth = preloadPrev.width;
		var imgHeight = preloadPrev.height;	
		var space = imgHeight + 50;
		var top = windowHeight - space;
		
		// create a new div with the width of the screen
		var container = new Element('div', {
					'styles': 
					{
						'display': 'block',
						'visibility':'hidden',
						'width': '98%',
						'height': space,
						'background':'#000',
						'border': '1px solid #e5ecef',
						'padding':'0px',
						'left':'3px',
						'margin':'0px',
						'position': 'absolute',
						'top': top + 'px'
					}
			  })
			  
		container.setAttribute('id','container2');
			  
			  image = new Element('img', {
			  	'styles':
				{
					'border': '3px solid #FFF',
					'display':'block',
					'visibility': 'hidden',
					'float':'left',
					'background': '#000 url(scripts/loading.gif) center center no-repeat',
					'margin-top':'20px',
					'margin-left':'20px',
					'height':imgHeight,
					'width': imgWidth,
					'src': hrefSrc,
					'z-index':'1000'
				}			
			})
			
			  div = new Element('div', {
			    'styles':
				{
						'float':'left',
						'width':'200px',
						'height':'auto',
						'display':'block',
						'margin':'10px'
						
						
				}
			})
			
			off = new Element('img', {
			  'styles':
			  	{
			  			'float':'left',
						'width':'64px',
						'height':'20px'
						
				}
			
			})		
			  off.src="scripts/close.jpg";
			 off.addEvent('click',function(){
			 	  	 container.effect('opacity',{duration: 700, transition: Fx.Transitions.linear, wait:true}).start(0.9,0).chain(function(){
					 // var h = container.getStyle('height');																															  					//  image.remove();
					//  container.effect('height',{duration: 700, transition: Fx.Transitions.linear, wait:true}).start(h,0).chain(function(){
					  container.remove();
					  $('overlayed').effect('opacity',{duration: 300, transition: Fx.Transitions.linear, wait:true}).start(0.5,0);
					  $('overlayed').remove();
					 })
			 })
			  
			 div.setAttribute('id','info');			
			
			 if($(addContent) != false){
			 div.innerHTML = "<h1>" + titleHead + "</h1><p>" + titleContent + "</p>" + "<p>" + addContentCont + "</p>";
			 }else{
			 div.innerHTML = "<h1>" + titleHead + "</h1><p>" + titleContent + "</p>";
			 }
			 
			 // add overlay
			 winH = window.getScrollHeight();
			 winW = window.getScrollWidth();
			 overlayed = new Element('div', {
	          'styles':
			  {
				  	'width':winW,
					'height':winH,
					'position':'absolute',
					'background-color':'#000',
					'visibility':'hidden',
					'top':'0px'
					
			  }
			  })
			  overlayed.setAttribute('id','overlayed');			
			  overlayed.injectInside(document.body);
			  
			  image.src = preloadPrev.src;
			  
			  overlayed.effect('opacity',{ duration: 200, transition:Fx.Transitions.linear, wait:true }).start(0,0.5);
			  container.injectInside(bd);
			  image.injectInside(container);
			  image.effect('opacity',{duration: 200, transition: Fx.Transitions.linear, wait:false}).start(0,1);
		  	  container.effect('opacity',{duration: 700, transition: Fx.Transitions.linear, wait:false}).start(0,0.9);
			  container.effect('top',{duration: 1700, transition: Fx.Transitions.Bounce.easeOut, wait:false}).start(windowHeight,top);
			  div.injectAfter(image);
			  off.injectInside(div);
			  container.makeDraggable();
			 return false;
		})
	}
})