/**
+-------------------------------------------------------------------
* jQuery hDialog - 多功能弹出层表单插件
+-------------------------------------------------------------------
* @version 2.0
* @update 2015.04.02
* @author haibao <hhb219@163.com> <http://smwell.sinaapp.com/>
+-------------------------------------------------------------------
*/
;(function($, window, document, undefined) {	
	var $D = $(document), $W = $(window), $B = $('body');
	methods = {
        init: function (options) {
           	return this.each(function() {
				var T = $(this), _O = T.data('hDialog');
                if(typeof(_O) == 'undefined') {
	                	var defaults = {
	                		title: '',              	    //弹框标题
						box: '#HBox',               //弹框默认选择器
						boxBg: '#ffffff',           //弹框默认背景颜色
						modalBg: 'rgba(0,0,0,0.5)', //遮罩默认背景颜色
						closeBg: '#cccccc',         //弹框关闭按钮默认背景颜色
						width: 300,             //弹框默认宽度
						height: 270,            //弹框默认高度
						positions: 'center',    //弹框位置(默认center：居中，top：顶部居中，left：顶部居左)
						effect: 'rotateOut',    //弹框关闭效果(结合animate.css里的动画，默认：rotateOut)
						hideTime: 0,				//弹框定时关闭(默认0:不自动关闭，以毫秒为单位)
						resetForm: true,        //是否清空表单(默认true：清空，false：不清空)
						modalHide: true,        //是否点击遮罩背景关闭弹框(默认true：关闭，false：不可关闭)
						isOverlay: true,        //是否显示遮罩背景(默认true：显示，false：不显示)
	                		closeHide: true,        //是否隐藏关闭按钮(默认true：不隐藏，false：隐藏)
	                		escHide: true,          //是否支持ESC关闭弹框(默认true：关闭，false：不可关闭)
	                		beforeShow: function(){}, //显示前的回调方法
	                		afterHide: function(){}   //隐藏后的回调方法
	                	};
					_O = $.extend({}, defaults, options);
					T.data('hDialog', _O);
                }
                _O = $.extend({}, _O, options);
                
				T.on('click',function() { //元素点击事件
					var $_box = $(_O.box); 
                		if($_box.length > 0) $_box.hide(); //隐藏容器
                
					if(_O.resetForm) { //重置表单
		           	 	$_box.find('input[type=text],input[type=tel],input[type=email],input[type=date],input[type=password],textarea').val('');
		           	 	$_box.find('select option').removeAttr('selected');
		            		$_box.find('input[type=radio],input[type=checkbox]').removeAttr('checked');
		       		}
					methods.fire.call(this, _O.beforeShow); //调用显示之前回调函数
					methods.open(_O,T); //显示弹框
				});
			});
        },
        open: function (o,T) {
        		var w,h,t,l,m,$close, $obj = $(o.box), title = o.title, c = T.attr("class"), modalBg = o.modalBg, closeBg = o.closeBg;
			w = o.width != undefined ? parseInt(o.width) : 300;
			h = o.height != undefined ? parseInt(o.height) : 270;
			m = ""+parseInt(-(h/2))+'px 0 0 '+parseInt(-(w/2))+"px";
			
			//弹框位置
			switch (o.positions) {
				case 'center': 
					t = l = '50%'; 
				break;
				case 'top': 
					t = 0; l = '50%'; m = "0 0 0 "+parseInt(-(w/2))+"px";
				break;
				case 'left': 
					t = l = m = 0;
				break;
				default: 
					t = l = '50%'; 
			}

			this.remove('#HOverlay,#HCloseBtn,#HTitle');
       	 	if(o.isOverlay != false){
				$B.stop().append("<div id='HOverlay' style='width:"+$D.width()+"px;height:"+$D.height()+"px;background-color:"+modalBg+";position:fixed;top:0;left:0;z-index:9999;'></div>");				
			}
			if(o.title != '' && o.title != undefined){ 
				$obj.stop().prepend('<div id="HTitle" style="padding:10px 45px 10px 12px;border-bottom:1px solid #ddd;background-color:#f2f2f2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">'+o.title+'</div>'); 
			}
			if(o.closeHide != false){
				$obj.stop().append('<a id="HCloseBtn" title="关闭" style="width:24px;height:24px;line-height:18px;display:inline-block;cursor:pointer;background-color:'+closeBg+';color:#fff;font-size:1.4em;text-align:center;position:absolute;top:8px;right:8px;"><span style="width:24px;height:24px;display:inline-block;">×</span></a>').css({'position':'fixed','backgroundColor':o.boxBg,'top':t,'left':l,'margin':m,'zIndex':'100000'});
			}
			$obj.stop().animate({'width':o.width,'height':o.height},300).removeAttr('class').addClass('animated '+c).show();	        
			
			//定时关闭
        		if(o.hideTime != 0){ setTimeout(function(){ methods.close(o); }, parseInt(o.hideTime)); }
        		
        		//默认关闭
        		$close = $('#HCloseBtn');
        		if(o.modalHide) $close = $('#HOverlay,#HCloseBtn');
			$close.on('click',function(){  methods.close(o); });
			
			//支持ESC关闭
			if(o.escHide) { $D.keyup(function(){ if(event.keyCode === 27) methods.close(o); }); }
       	},
	    close: function (o, urls) {
	    		if(!$(o.box).is(':hidden')){
		    		methods.remove('#HOverlay,.HTooltip');
				$(o.box).removeAttr('class').addClass('animated '+o.effect);
				if($(o.box).hasClass(o.effect)){ setTimeout(function(){ $(o.box).removeAttr('style'); },300); }
				if(urls != undefined) { setTimeout(function() { window.location.href = urls; },1000); }
				this.fire.call(this, o.afterHide); //隐藏后的回调方法 
			}
	    },
        remove: function (a) {
        		$(a).remove();
        },
	    fire: function (event, data) {
			if($.isFunction(event)) { return event.call(this, data); }
	    },
	    destroy: function() {
	       return $(this).each(function() {
                var $this = $(this);
                $this.removeData('hDialog');
            });
	    }
    };
    
	$.fn.hDialog = function (method) {
		if(methods[method]) { return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); }
		else if(typeof method === 'object' || !method) {return methods.init.apply(this, arguments); }
		else{$.error('Error! Method' + method + 'does not exist on jQuery.hDialog！'); return this; }
	};
	
	/**
	+----------------------------------------------------------
	* 内置扩展
	+----------------------------------------------------------
	*/
	$.extend({  
		/**
		 * @decription 给方法添加加载方法
		 * @param t : string 提示文字
		 * @param w : string 提示框宽度
		 * @param h : string 提示框高度
		 */
	    showLoading: function (t, w, h) { //显示加载
	    		t = t != undefined ? t : '正在加载...';
	        	w = w != undefined ? parseInt(w) : 140;
	        	h = h != undefined ? parseInt(h) : 48;
	    		var closeBtn = '', margin = ""+parseInt(-(h/2))+'px 0 0 '+parseInt(-(w/2))+"px";
	        closeBtn = '<a style="position:absolute;top:-5px;right:-5px;width:15px;height:15px;line-height:15px;display:inline-block;border-radius:50%;text-align:center;background-color:rgba(0,0,0,0.5);color:#fff;font-size:10px;" href="javascript:;" id="closeBtn">X</a>';
	        methods.remove('#HLoading');
	        	$B.stop().append('<div id="HLoading" style="width:'+w+'px;height:'+h+'px;line-height:'+h+'px;border-radius:4px;background:rgba(0,0,0,0.6);color:#fff;text-align:center;position:fixed;top:50%;left:50%;margin:'+margin+';">'+t+closeBtn+'</div>');
	   		$('#closeBtn').on('click',function(){ //关闭按钮点击事件
	        		$.hideLoading();
	        	});
	    },
	    hideLoading: function () { //移除加载
        		methods.remove('#HLoading');
        },
        /**
		 * @decription 给方法添加提示方法
		 * @param t1 : string 提示文字
		 * @param t2 : int 提示时间
		 * @param t3 : boolean 提示类型，默认为false
		 * @param callback : 回调函数
		 */
        tooltip: function (t1, t2, t3, callback) {
        		t1 = t1 != undefined ? t1 : 'Error...';
	        	t2 = t2 != undefined ? parseInt(t2) : 2500;
        		var tip = '<div class="HTooltip shake animated" style="width:280px;padding:10px;text-align:center;background-color:#D84C31;color:#fff;position:fixed;top:10px;left:50%;z-index:100001;margin-left:-150px;box-shadow:1px 1px 5px #333;-webkit-box-shadow:1px 1px 5px #333;">'+t1+'</div>';
	    		if(t3 == true && t3 != undefined) { tip = '<div class="HTooltip bounceInDown animated" style="width:280px;padding:10px;text-align:center;background-color:#5cb85c;color:#fff;position:fixed;top:10px;left:50%;z-index:100001;margin-left:-150px;box-shadow:1px 1px 5px #333;-webkit-box-shadow:1px 1px 5px #333;">'+t1+'</div>'; }
	    		methods.remove('.HTooltip');
	    		$B.stop().append(tip);
	    		clearTimeout(t);
	    		var t = setTimeout(function() { 
	    			methods.remove('.HTooltip'); 
	    			if(callback != undefined){ methods.fire.call(this, callback); } //隐藏后的回调方法 
	    		},t2);
        },
        /**
		 * @decription 返回顶部
		 * @param b : string 和屏幕底部的距离
		 * @param r : string 和屏幕右侧的距离
		 */
        goTop: function (b, r) {
	        	b = b != undefined ? b : '30px';
	        	r = r != undefined ? r : '20px';
	        	methods.remove('#HGoTop');
	        	$B.stop().append('<a id="HGoTop" href="javascript:;" style="width:40px;height:40px;line-height:40px;border-radius:50%;display:inline-block;text-align:center;background:#333;color:#fff;position:fixed;bottom:'+b+';right:'+r+';z-index:100000;">Top</a>').find('#HGoTop').hide();
	        	$T = $('#HGoTop');
	        	$W.on('scroll',function(){
	        		if($W.scrollTop() > 150){
					$T.removeAttr('class').addClass('animated rollIn').show();
	        		}else{
					$T.removeAttr('class').addClass('animated rollOut');
				}
	        	});
	        	$T.on('click',function(){ //返回顶部按钮点击事件
	        		$('body,html').animate({ scrollTop:0 },500); return false;
	        	});
        },
        /**
		 * @decription 消息框
		 * @param type : string 消息框类型(alert/confirm)
		 * @param title : string 消息框标题
		 * @param content : string 消息框内容
		 * @param time : int 消息框自动关闭时间，以毫秒为单位(默认0：不自动关闭)
		 * @param callback : 回调函数
		 */
        dialog: function (type, title, content, time, callback) {
        		var t, tpl = '', footerTpl = '', isLock = false, okText = '确定', cancelText = '取消', width = 260, margin = '0 0 0 '+parseInt(-(width/2))+'px',
        		type = type != undefined ? type : 'alert',
        		time = time != undefined ? parseInt(time) : 0,
        		headerTpl = '<div id="hDialog-header" style="border-bottom:1px solid #ddd;padding:10px;font-size:1.2em;color:#333;">' + title +'</div>',
    			okTpl = '<a href="javascript:;" style="padding:5px 10px;display:inline-block;border-radius:3px;background-color:#337ab7;color:#fff;" id="h_ok">'+ okText +'</a>',
    			cancelTpl = '<a href="javascript:;" style="padding:5px 10px;display:inline-block;border-radius:3px;margin-left:10px;background-color:#eee;color:#333;" id="h_cancel">'+ cancelText +'</a>',
    			contentTpl = '<div id="hDialog-content" style="padding:25px 15px;text-align:center;">' + content + '</div>',
    			maskTpl = '<div id="hDialog-mask" style="width:100%;height:100%;background-color:rgba(0,0,0,0.6);position:fixed;top:0;left:0;z-index:99999;"></div>';
    		
    			if(type === 'confirm'){ footerTpl = '<div id="hDialog-footer" style="padding:10px;border-top:1px solid #ddd;text-align:right;">'+ okTpl + cancelTpl +'</div>'; }
    			if(isLock != true){ tpl += maskTpl; }
    			tpl += '<div id="hDialog-wrap" class="animated bounceIn" style="width:'+width+'px;border-radius:5px;box-shadow:4px 4px 10px #666;-webkit-box-shadow:4px 4px 10px #666;background-color:#ffffff;border:1px solid #eee;position:fixed;top:35%;left:50%;margin:'+margin+';z-index:100000;">' + headerTpl + contentTpl + footerTpl + '</div>'; 
    			methods.remove('#hDialog-wrap,#hDialog-mask');
    			$B.stop().append(tpl);
    			if(time !== 0){
        			clearTimeout(t);
		    		t = setTimeout(function() {  $.closeDialog(callback); },time);
	    		}
    			$('a:contains('+okText+')').on("click", function() { if(callback != undefined){ methods.fire.call(this, callback); } });
            $('a:contains('+cancelText+')').on("click", function() { $.closeDialog(); });
        },
        /**
		 * @decription 关闭消息框
		 * @param callback : 回调函数
		 */
        closeDialog: function (callback) {
        		methods.remove('#hDialog-wrap,#hDialog-mask'); 
        		if(callback != undefined){ methods.fire.call(this, callback); }
        }
	});
})(jQuery, window, document);
