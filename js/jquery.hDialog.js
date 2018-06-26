/**
+-------------------------------------------------------------------
* jQuery hDialog - 多功能弹出层插件
+-------------------------------------------------------------------
* @version 2.0.3
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
		$el,
		timer = null;
	var methods = {
		op: {},
        init: function(options) {
           	return this.each(function() {
				$el = $(this);
				var _O = null;
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
				_O = $.extend({}, defaults, options);

				var _open = function(){
					methods.op = _O;
					methods.open();
				}
				if(_O.autoShow) {
					//自动弹出
					_open();
				} else {
					//绑定click事件
					$el.off('click').on('click', function(event) {
						_open();
					});
				}

				//自动关闭
				_O.autoHide && methods.close();
			});
        },
        open: function() {
			var _self = this.op, w, h, t, l, m, headTpl = '', overlayTpl = '', iframeTpl = '', 
				$o = _self.autoShow ? $el : $(_self.box),
				w = parseInt(_self.width), 
				h = parseInt(_self.height), 
				m = "" + parseInt(-(h/2)) + 'px 0 0 ' + parseInt(-(w/2)) + "px";
        		
			//显示前的回调
			_self.beforeShow && this.fire.call(this, _self.beforeShow, event); 
			
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
			if(_self.types == 2 && _self.iframeSrc != '') {
				iframeTpl =  '<iframe id="'+_self.iframeId+'" width="'+w+'" height="'+h+'" frameborder="0" scrolling="auto" src="'+_self.iframeSrc+'"></iframe>';
			}
			
			//显示弹框
			$B.stop().append(overlayTpl).find($o).css({
				backgroundColor: _self.boxBg,
				position: 'fixed',
				top: t,
				left: l,
				zIndex: 999999,
				margin: m,
				width: w,
				height: h
			}).removeAttr('class').addClass('animated '+$el.attr("class")).prepend(headTpl+iframeTpl).show();
        
			//默认关闭
			$o.modalHide ? $('#HOverlay, #HCloseBtn') : $('#HCloseBtn').off('click').on('click', function() { 
				methods.close();
			});
			
			//定时关闭
			if(_self.hideTime != 0) {
				timer = setTimeout(function() {
					methods.close(); 
				}, parseInt(_self.hideTime));
			}
        		
			//支持ESC关闭
			_self.escHide && $D.off('keyup').on('keyup', function() {
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
			$o.removeAttr('class').addClass('animated '+_self.effect);
			$o.hasClass(_self.effect) && setTimeout(function() { 
				$o.removeAttr('style').hide();
			}, 300);
			$('#HOverlay, #HTitle, #'+_self.iframeId).remove();
			setTimeout(function(){
				_self.afterHide && _this.fire.call(_this, _self.afterHide, event);
			}, 310);
	    },
	    fire: function(event, data) { 
			if($.isFunction(event)) {
				return event.call(this, data);
			}
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
