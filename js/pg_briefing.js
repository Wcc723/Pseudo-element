;(function($){
	//document.ondragstart = function () { return false; }; 
	$.fn.pg_briefing=function(settings){
		var _defaultSettings={
		animateMode: 'slider', //動畫模式 fade , slider
		startIndex : 1,			// 預設要先顯示那一張
		controller : '.control' ,//控制器CSS
		speed : 300, //換頁速度
		//wrapTag:'.wrap', //動畫框預設class
		controlA : true, //數字選單是否顯示
		fademode : true,
		menulist : '.menulist', //選單開關預設值 
		menushowDefault :false,
		contentTag: 'section' //內容框
		//showTag : 'li' 播放之圖片或內容框
		};		
		var _settings=$.extend(_defaultSettings,settings);
		return this.each(function(){
			pg_briefing($(this),_settings);
		});
		function pg_briefing($this,_settings){
			// 先把其它圖片的變成透明
			var $block = $this,			
			_width = _settings.width,
			_isComplete = true,
			_controller = _settings.controller,
			_showTag = _settings.showTag,
			_wrapTag = _settings.wrapTag,
			_controlA = _settings.controlA,
			_speed = _settings.speed,
			_menushowDefault = _settings.menushowDefault,
			_fademode = _settings.fademode,
			_menulist = _settings.menulist,
			_startIndex = _settings.startIndex,
			_contentTag = _settings.contentTag;
			var _timer = new Array;
			var _menutimer = new Array;
			var _showIndex = new Array;
			_isComplete[$this] = true;  //避免重複點擊連續觸發			
			$ad = $block.find(_contentTag),_showIndex[$this] = _startIndex-1	;	// 預設要先顯示那一張
			//if ($block.find(".control")) $block.append("<div class='control'></div>")
			// 組出右下的按鈕	
			var str = '';			
			for(var i=0;i<$ad.length;i++){
				ad_length=$ad.length
				str += '<a href="#"><span>' +(i + 1)+'</span></a>';
			};			
			var $controlA = $block.find(_controller).html($(str)).find('a'); 
			$controlA.click(function(){	
				if(!_isComplete) return false;
				_isComplete = false;
				_showIndex = $(this).text() * 1 - 1;
				if (_fademode == false){
				$('html,body').animate({scrollTop:$(_contentTag).eq(_showIndex).offset().top}, _speed,function(){_isComplete = true;});}
				else if (_fademode == true){
				$($block).fadeTo(_speed,0.01,function (){	
					$('html,body').animate({scrollTop:$(_contentTag).eq(_showIndex).offset().top}, 0,function(){
							$($block).fadeTo(_speed,1)
						_isComplete = true;
						});								
					});				
				}
				$(this).addClass('on').siblings().removeClass('on');	// 讓 a 加上 .on 
				return false;	
			});
			//選單收合
			var  _menushow = true;
			if (_menushowDefault == false) { 
				$block.find(_controller).css('display','none');
				$block.find(_menulist).css('display','block');
				_menushow = false;
			} else if (_menushowDefault == false) {
				$block.find(_controller).css('display','block');
				$block.find(_menulist).css('display','none');
				_menushow = true;
				}
			$block.find(_menulist).click (function(){
				if (_menushow ==false){
					$block.find(_controller).slideDown(300);
					_menushow = true;
					} else {
						$block.find(_controller).slideUp(300);
					_menushow = false;
					clearTimeout(_menutimer);	
						}				
						return false;
				})
			$block.find(_controller).mouseout(function (){
				if (_menushow ==true){
					_menutimer = setTimeout(_menuclose,3000);	
					};
				});
			$block.find(_controller).mouseover(function (){
				clearTimeout(_menutimer);	
				});
			function _menuclose() {
				if (_menushow ==true){
					$block.find(_controller).slideUp(300);
					_menushow = false;
					clearTimeout(_menutimer);	
					};
				};
				//選單收合end
			// 當按鈕被點選時
			// 若要變成滑鼠滑入來切換時, 可以把 click 換成 mouseover
			//if (_controlA == false){ $block.find(_controller).css('display', 'none') }; 隱藏數字按鈕
			//if (_controlA_num == false)  $block.find(_controller).find('a span').css("display","none");隱藏數字按鈕的數字	
			$(document).keydown(function(event){ 
					if(event.keyCode == 37||event.keyCode ==  38){ 
					$block.find('.pre').click();
					return false;	
					}else if (event.keyCode == 39||event.keyCode ==  40){ 
					$block.find('.next').click();
					return false;	
					} 
			}); 	
			$block.find('.next').click(function(){
					if(!_isComplete) return false;
					if (_showIndex+1 < ad_length){
						_showIndex++;
						$controlA.eq(_showIndex).click();
					return false;		
					}
					else{
						_showIndex = 0;
						$controlA.eq(0).click();
					return false;	
					}
				});
				$block.find('.pre').click(function(){
					if(!_isComplete) return false;
					if (_showIndex > 0){
						_showIndex --;
						$controlA.eq(_showIndex).click();
					return false;		
					}
					else{
						_showIndex = ad_length-1;
						$controlA.eq(_showIndex).click();
					return false;	
					}
				});// next image & pre image btn end ;							 
		}
	};
})(jQuery);