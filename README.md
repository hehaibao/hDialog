# hDialog - jQuery+CSS3 多功能表单弹出层插件

jQuery.hDialog.js 是一个用来创建一个模态窗口的 jQuery 插件，基于 CSS3 过渡实现。您可以利用 Animate.css 中的转换或自行创建自己的过渡效果。支持 Firefox、Chrome、Safari、Opera 和 IE 10+ 浏览器。

### 演示地址：

http://hehaibao.github.io/hDialog/index.html

http://www.hehaibao.com/uploads/hDialog/index.html [Tips: 博客更新可能不及时, 以GitHub上为准~]
  
### 使用说明：

1 引入jQuery和jQuery.hDialog.min.js

2 页面中，请将要放入弹框的内容放在比如id="HBox"的容器中，然后将box的值换成该ID即可；

  举个🌰：  $(element).hDialog({'box':'#HBox'});

### 更多示例：

	/*
	 * 以下是单独的调用示例，你只需要自定义弹框的样式即可。
	 *          - $(element).hDialog(); //默认调用弹框；
	 *          - $(element).hDialog({box: '#demo'}); //自定义弹框容器ID/Class；
	 *          - $(element).hDialog({boxBg: '#eeeeee'}); //自定义弹框容器背景；
	 *          - $(element).hDialog({modalBg: '#eeeeee'}); //自定义遮罩背景颜色；
	 *          - $(element).hDialog({width: 500}); //自定义弹框宽度；
	 *          - $(element).hDialog({height: 400}); //自定义弹框高度；
	 *          - $(element).hDialog({position: 'top'}); //弹框位置(默认center：居中，top：顶部居中，left：顶部居左，bottom：底部居右)
	 *          - $(element).hDialog({effect: 'fadeOut'}); //弹框关闭效果(结合animate.css里的动画，默认：zoomOut)；
	 *          - $(element).hDialog({hideTime: 2000}); //弹框定时关闭(默认0:不自动关闭, 以毫秒为单位)
	 *          - $(element).hDialog({modalHide: false}); //false:点击遮罩背景不关闭弹框,反之关闭；
	 *          - $(element).hDialog({isOverlay: false}); //是否显示遮罩背景(默认true：显示，false：不显示)
	 *          - $(element).hDialog({escHide: false}); //false:按ESC不关闭弹框,反之关闭；
	 *          - $(element).hDialog({autoShow: false}); //是否页面加载完成后自动弹出(默认false点击弹出，true：自动弹出)
	 *          - $(element).hDialog({autoHide: true}); //是否页面加载完成后自动关闭弹出(默认false: 不关闭，true: 关闭)
	 *          - $(element).hDialog({types:2,iframeSrc:'http://css.doyoe.com/',iframeId:'iframeHBox',width:960,height:600}); //调用框架
	 * 
	 * 也可以整个覆盖（tips: 默认的无需写）：  
	 *          - $(element).hDialog({
	 *                box: '#demo',
	 *                boxBg: '#eeeeee',
	 *                modalBg: '#eeeeee',
	 *                width: 500,
	 *                height: 400,
	 *                positions: 'top',
	 *                effect: 'fadeOut',
	 *                hideTime: 3000,
	 *                isOverlay: false,
	 *                modalHide: false,
	 *                escHide: false,
	 *                autoShow: false,
	 *                autoHide: false,
	 *                types: 1,
	 *                iframeSrc: '',
	 *                iframeId: 'iframeHBox',
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


### 插件依赖：

-------

    jQuery.hDialog.js depends on the following libraries:

* [jQuery](http://jquery.com/)


* [animate.css, by Daniel Eden](http://daneden.github.io/animate.css/)


### 更新日志：

   2018-06-26： 增加AMD支持，修复已知bug
   
   ...

### 写在最后

感谢jQuery和animate.css的开发人员!

如果这款弹出层插件对您有帮助，请star支持一下。欢迎pr, 谢谢~


