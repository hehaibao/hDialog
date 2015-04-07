# hDialog
jQuery+CSS3 多功能表单弹出层插件

在线演示地址：http://www.hehaibao.com/jquery-css3-plugin/

使用说明：
	/*
	 * 以下是单独的调用示例，你只需要自定义弹框的样式即可。
	 *          - $(element).hDialog(); //默认调用弹框；
	 *          - $(element).hDialog({box: '#demo'}); //自定义弹框容器ID/Class；
	 *          - $(element).hDialog({boxBg: '#eeeeee'}); //自定义弹框容器背景；
	 *          - $(element).hDialog({modalBg: '#eeeeee'}); //自定义遮罩背景颜色；
	 *          - $(element).hDialog({closeBg: '#eeeeee'}); //自定义关闭按钮背景颜色；
	 *          - $(element).hDialog({width: 500}); //自定义弹框宽度；
	 *          - $(element).hDialog({height: 400}); //自定义弹框高度；
	 *          - $(element).hDialog({position: 'top'}); //top:弹框顶部居中,center:绝对居中,left:顶部居左；
	 *          - $(element).hDialog({effect: 'fadeOut'}); //弹框关闭效果(结合animate.css里的动画，默认：rotateOut)；
	 *          - $(element).hDialog({hideTime: 2000}); //弹框定时关闭(默认0:不自动关闭, 以毫秒为单位)
	 *          - $(element).hDialog({closeHide: false}); //是否隐藏关闭按钮(默认true：不隐藏，false：隐藏)
	 *          - $(element).hDialog({resetForm: false}); //false:不重置表单,反之重置；
	 *          - $(element).hDialog({modalHide: false}); //false:点击遮罩背景不关闭弹框,反之关闭；
	 *          - $(element).hDialog({isOverlay: false}); //是否显示遮罩背景(默认true：显示，false：不显示)
	 *          - $(element).hDialog({escHide: false}); //false:按ESC不关闭弹框,反之关闭；
	 * 
	 * 也可以整个覆盖（tips: 默认的无需写）：  
	 *          - $(element).hDialog({
	 *                box: '#demo',
	 *                boxBg: '#eeeeee',
	 *                modalBg: '#eeeeee',
	 *                closeBg: 'rgba(0,0,0,0.6)',
	 *                width: 500,
	 *                height: 400,
	 *                positions: 'top',
	 *                effect: 'fadeOut',
	 *                hideTime: 3000,
	 *                closeHide: false,
	 *                resetForm: false,
	 *                isOverlay: false,
	 *                modalHide: false,
	 *                escHide: false,
	 *                beforeShow: function(){ alert('执行回调'); },
	 *                afterHide: function(){ alert('执行回调'); }
	 *            });
	 *
	 * 下面是简单的扩展方法（以后再慢慢补充吧）：
	 *          - $.tooltip('错误提示文字'); 或者  $.tooltip('正确提示文字',4000,true,callback);  //内置2种提示风格(参数1为提示文字，参数2为自动关闭时间，参数3：true为正确，false为错误，参数4: 回调函数)
	 *          - $.showLoading('正在加载...',90,30); 或者  $.hideLoading(); //显示/移除加载(参数1为说明文字，参数2为宽度，参数3为高度，默认宽高为140*48，可不填写)
	 *          - $.goTop(); //返回顶部,(参数1：和屏幕底部的距离，参数2：和屏幕右侧的距离； PS:自定义一定要加单位，比如px,em, 也可以是百分比哦)
	 *          - $.dialog('alert','提示','hello'); 或者 $.dialog('confirm','提示','确认么？',0,function(){ alert('ok'); });  //消息框,(参数1：消息框类型(alert/confirm)，参数2：消息框标题；参数3：消息框内容度；参数4：消息框自动关闭时间，以毫秒为单位(默认0：不自动关闭)；参数5: 回调函数)
	 *          - $.closeDialog(); 或者 $.closeDialog(function(){ alert('ok'); }); //关闭消息框,(参数1：回调函数)
	 */
