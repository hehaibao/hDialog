/**
+-------------------------------------------------------------------
* jQuery hDialog - 多功能弹出层插件
+-------------------------------------------------------------------
* @version 2.0.5
* @author haibao <hhb219@163.com> <http://www.hehaibao.com/>
* github [https://github.com/hehaibao/hDialog]
* MIT
+-------------------------------------------------------------------
*/
;(function(factory){
    if(typeof define === 'function' && define.amd) { // AMD
        // you may need to change `define([------>'jquery'<------], factory)` 
        // if you use zepto, change it rely name, such as `define(['zepto'], factory)`
        define(['jquery'], factory)
        // define(['zepto'], factory)
    } else { // Global
        factory(window.jQuery || window.Zepto)
    }
})(function($,undefined) {
	var $D = $(document), 
		$W = $(window), 
		$B = $('body'),
		timer = null;
	var methods = {
		op: {},
		version: '2.0.5',
        init: function(options) {
			var $el = $(this);
           	return this.each(function(i) {
				var defaults = {
						title: '',              	//弹框标题
						box: '#HBox',               //弹框默认选择器
						boxBg: '#ffffff',           //弹框默认背景颜色
						modalBg: 'rgba(0,0,0,0.5)', //遮罩默认背景颜色
						width: 300,                 //弹框默认宽度
						height: 270,                //弹框默认高度
						positions: 'center',        //弹框位置(默认center：居中，top：顶部居中，left：顶部居左，bottom：底部居右)
						effect: 'zoomOut',          //弹框关闭效果(结合animate.css里的动画，默认：zoomOut)
						hideTime: 0,				//弹框定时关闭(默认0:不自动关闭，以毫秒为单位)
						modalHide: true,            //是否点击遮罩背景关闭弹框(默认true：关闭，false：不可关闭)
						isOverlay: true,            //是否显示遮罩背景(默认true：显示，false：不显示)
						escHide: true,              //是否支持ESC关闭弹框(默认true：关闭，false：不可关闭)
						autoShow: false,            //是否页面加载完成后自动弹出(默认false点击弹出，true：自动弹出)
						autoHide: false,            //是否页面加载完成后自动关闭弹出(默认false: 不关闭，true: 关闭)
						types: 1,                   //弹框类型(默认：1正常弹框，2：iframe框架)
						iframeSrc: '',              //弹框类型为iframe时使用的 链接地址
						iframeId: 'iframeHBox',     //弹框类型为iframe时使用的 ID
						beforeShow: function() { }, //显示前的回调方法
						afterHide: function() { }   //隐藏后的回调方法
					};
				var _O = $.extend({}, defaults, options);

				if(_O.autoShow) {
					//自动弹出
					methods.op = _O;
					methods.open($el);
				} else {
					//绑定click事件
					$el[i].onclick = (function(k){
						return function() {
							methods.op = _O;
							methods.open($($el[k]));
						}
					})(i);
				}

				//自动关闭
				_O.autoHide && methods.close();
			});
        },
        open: function($el) {
			var _type = $el.attr('data-type') || 'fadeIn'; // 打开动画的样式名

			//检测是否IE8以下浏览器
			if(methods.checkBrowserVersion()) {
				//如果是，则改变遮罩背景色，并提示
				this.op.modalBg = '#000000'; //为了兼容IE8不识别rgba写法
				alert('系统检测到您正在使用ie8以下内核的浏览器，不能实现完美体验，请及时更新浏览器版本！');
			}
			var _self = this.op,
				t, l,
				headTpl = '', overlayTpl = '', iframeTpl = '',
				w = parseInt(_self.width), 
				h = parseInt(_self.height), 
				m = "" + parseInt(-(h/2)) + 'px 0 0 ' + parseInt(-(w/2)) + "px";
        		
			//显示前的回调
			_self.beforeShow && this.fire.call(this, _self.beforeShow); 
			
			//弹框位置
			switch (_self.positions) {
				case 'top': 
					t = 0; 
					l = '50%'; 
					m = "0 0 0 "+parseInt(-(w/2))+"px";
				break;
				case 'left':
					t = l = m = 0; 
				break;
				case 'bottom':
					t = parseInt($W.height() - h)+'px'; 
					l = parseInt($W.width() - w)+'px';
					m = 0; 
				break;
				default: 
					t = l = '50%';
			}

			//遮罩背景层
			if(_self.isOverlay && !$('#HOverlay').length) {
				overlayTpl = "<div id='HOverlay' style='width:"+$D.width()+"px;height:"+$D.height()+"px;background-color:"+_self.modalBg+";position:fixed;top:0;left:0;z-index:9999;'></div>";
			}
			
			//弹框标题和关闭按钮
			if(_self.title != '' && !$('#HTitle').length) {
				headTpl = '<div id="HTitle">'+_self.title+'</div>';
			}

			//将关闭按钮一直展示出来 fixed issue #3
			headTpl += '<a id="HCloseBtn" title="关闭"><span>&times;</span></a>';
			
			//iframe框架
			if (_self.types == 2 && _self.iframeSrc != '') {
				iframeTpl = '<iframe id="'+_self.iframeId+'" width="'+w+'" height="'+h+'" frameborder="0" scrolling="auto" src="'+_self.iframeSrc+'"></iframe>';
				$(_self.box).hide(); // 隐藏框架外的其他元素
			}

			//显示弹框
			$B.stop().append(overlayTpl).find(_self.box).css({
				backgroundColor: _self.boxBg,
				position: 'fixed',
				top: t,
				left: l,
				zIndex: 999999,
				margin: m,
				width: w,
				height: h,
				overflow: 'auto'
			}).removeAttr('class').addClass('animated '+_type).prepend(headTpl+iframeTpl).show();
        
			//默认关闭
			$(_self.box).modalHide ? $('#HOverlay, #HCloseBtn') : $('#HCloseBtn').off('click').on('click', function() { methods.close(); });
			
			//定时关闭
			if(_self.hideTime != 0) {
				timer = setTimeout(function() { methods.close(); }, parseInt(_self.hideTime));
			}
        		
			//支持ESC关闭
			_self.escHide && $D.off('keyup').on('keyup', function(event) {
				event = event || window.event;
				var keyCode = event.keyCode ? event.keyCode : event.which ? event.which : event.charCode;
				keyCode === 27 && methods.close();
			});
        },
	    close: function() {
			// 关闭弹窗
			var _this = this,
				_self = _this.op, 
				$o = $(_self.box);
			clearTimeout(timer); //清除定时器
			if(!$o.is(':visible')){
				return;
			}
			$o.removeAttr('class').addClass('animated '+_self.effect);
			$o.hasClass(_self.effect) && setTimeout(function() { 
				$o.removeAttr('style').hide();
			}, 300);
			$('#HOverlay, #HTitle, #HCloseBtn').remove();
			if(_self.types == 2) {
				$('#'+_self.iframeId).remove();
			}
			setTimeout(function(){
				_self.afterHide && _this.fire.call(_this, _self.afterHide);
			}, 310);
	    },
	    fire: function(event, data) { 
			if($.isFunction(event)) {
				return event.call(this, data);
			}
		},
		checkBrowserVersion: function() {
			//检测浏览器版本，目的：对IE8以下做特殊处理
			var DEFAULT_VERSION = 8,
				ua = navigator.userAgent.toLowerCase(),
				isIE = ua.indexOf("msie") > -1,
				safariVersion,
				flag = false;
			if(isIE) {
				safariVersion = ua.match(/msie ([\d.]+)/)[1];
				flag = parseInt(safariVersion) <= DEFAULT_VERSION ? true : false;
			}
			return flag;
		}
    };
    
	$.fn.hDialog = function(method) {
		if(methods[method]) { 
			return methods[method].apply(this, Array.prototype.slice.call(arguments, 1)); 
		}
		else if(typeof method === 'object' || !method) {
			return methods.init.apply(this, arguments); 
		}
		else {
			$.error('Error! Method' + method + 'does not exist on jQuery.hDialog！'); 
			return this; 
		}
	};
});
