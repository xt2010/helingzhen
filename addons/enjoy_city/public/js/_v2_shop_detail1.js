/*[tplStatic 1.0 - 2827758]*/
function initDetail(window,document,shop){window.toggleIntro=function(){var t=$("#desc");if(!t.data("sheight")){var a=$("#desc").css("maxHeight");t[0].style.cssText="";t.data("sheight",a);$("#toggle-btn").html("&and;&and; 收拢 &and;&and;")}else{t[0].style.cssText="max-height:"+$("#desc").data("sheight");t.removeAttr("data-sheight");$("#toggle-btn").html("&or;&or; 展开 &or;&or;")}};if(parseInt($("#desc").height(),10)<120){$("#toggle-btn").hide()}var showImgIndex=1;$("#pic-wrap").on("scroll",function(){var t=110;var a=$(this).width();var e=Math.ceil((parseInt($(this).scrollLeft(),10)+a)/t);for(;showImgIndex<=e;showImgIndex++){var o=$(".img-"+showImgIndex);if(o.length>0){o.attr("src",o.data("preview-src")).removeClass("img-"+showImgIndex)}}}).trigger("scroll");var isMapShow=0;window.openMap=function(t){if($("#map-info").length>0){if(isMapShow++%2==0){$("#map-info").show()}else{$("#map-info").hide()}if(isMapShow==1){var a=shop.lng+","+shop.lat;$("#map-img").attr("src","http://api.map.baidu.com/staticimage?width=500&height=300&zoom=17&center="+a+"&markers="+a)}}else{location.href=shop.addressUrl}return false};$("#shop-banner").on(window.CLICK_EVENT,function(){$("img[data-origin]").each(function(){$(this).attr("src",$(this).data("origin")).removeAttr("data-origin")});mui.previewImage()});mui.previewImage();$.get(shop.clickUrl,function(data){eval("data="+data);if(data&&data.error==0){$(".shop-phone").html('<img src="'+data.data+'">')}});var isCalled=0;$(".call-phone").on("click",function(){if(isCalled){location.href="tel:"+isCalled;return}function showCheckCodeDialog(t){showMessage(mzTpl($("#checkcode-dialog").html(),{message:t}));$("#checkcode-btn").on("click",function(){var t=$("#checkcode").val();if(parseInt(t,10)<0){mui.toast("请输入正确的验证码！");return}loadTruePhone({CHECK_CODE:t});showMessage("hide")})}function loadTruePhone(post){$.post(shop.telUrl,post,function(data){eval("data="+data);if(data&&data.error==0){isCalled=data.data;location.href="tel:"+isCalled}else if(data.error==99){showCheckCodeDialog(post?"验证码输入错误":"")}})}loadTruePhone()});window.jobDetail=function(t){window.API.post("job_detail",{id:t},function(t){if(t){if(t.error){showMessage(t.data)}else{showMessage(mzTpl($("#job-detail").html(),t.extend))}}else{showMessage("获取招聘信息失败，请重试")}})};window.shareTimelineConfig={imgUrl:$("#shop-icon").attr("src"),desc:$.trim($("#shop-share").text())+"\n"+shop.address};$("#fans-more").on("click",function(){var t=$(this).data("pages");var a=parseInt($(this).data("page"),10);var e=$(this).data("pagesize");if(a>t){$("#fans-more-text").hide();return}$(this).data("page",++a);if(a>=t){$("#fans-more-text").hide()}window.API.post("shop_fans",{page:a,id:shop.id,pagesize:e},function(t){if(t.error==0&&t.extend.list){var a=mzTpl($("#fan-users").html());var e=a(t.extend);$("#fan-extend-list").append(e)}})});$("#fans-btn").on("click",function(){window.API.post("shop_isfan",{id:shop.id},function(t){if(t.extend.require=="login"){var a=shop.loginUrl+"url="+encodeURIComponent(location.href);setTimeout(function(){location.href=a},1e3)}else{if(t.error==0){showMessage(mzTpl($("#qr-message").html(),t.extend))}}t.data&&mui.toast(t.data)})});window.tagCallback=function(t){if(!t){mui.toast("打标签失败");return}mui.toast(t.data);$("#rate-tag").val("")};$(".shop-raking").each(function(){var t=$(this);var a=function(a){if(t.data("readonly")||!t.data("id")){return}window.API.post("shop_star",{shop_id:t.data("id"),star:a},function(t){if(!t){mui.toast("评分失败");return}if(t.extend.require=="login"){var a=shop.loginUrl+"url="+encodeURIComponent(location.href);setTimeout(function(){location.href=a},1e3)}else if(t.error==0){$(".shop-raking").rateYo("rating",t.extend.perstar);$(".perstar").html(t.extend.perstar)}mui.toast(t.data)})};var e=null;var o=$(this).rateYo({starWidth:"20px",normalFill:"#A0A0A0",spacing:"5px",rating:$(this).data("rating")?0:shop.perstar,fullStar:true,readOnly:$(this).data("readonly")?true:false});var i=0;o.on(window.CLICK_EVENT,function(t,n){if(e!=null){clearTimeout(e)}e=setTimeout(function(){e=null;var t=o.rateYo("rating");if(i==t){return}i=t;a(t)},3e3)})});$(".raking-tag-big").find("span[data-id]").on("click",function(){var t=$(this);var a=t.data("id");if(!a){return}window.API.post("shop_tag_edit",{shop_id:shop.id,tag_id:a},function(a){if(!a){mui.toast("操作失败，请重试");return}if(a.extend.require=="login"){var e=shop.loginUrl+"url="+encodeURIComponent(location.href);setTimeout(function(){location.href=e},1e3)}else if(a.error==0){if(a.extend.status==1){t.addClass("active")}else{t.removeClass("active")}}mui.toast(a.data)})});if(shop.lng){var map=new BMap.Map(document.createElement("div"));var geoLocation=new BMap.Geolocation;geoLocation.getCurrentPosition(function(t){if(this.getStatus()==BMAP_STATUS_SUCCESS){var a=new BMap.Point(shop.lng,shop.lat);var e=map.getDistance(a,t.point).toFixed(2);var o="";var i=function(a){if(n.getStatus()!=BMAP_STATUS_SUCCESS){return}console.log(a);var e=a.getPlan(0);$("#location-far").text(e.getDistance(true)+"，路程约"+e.getDuration(true));$("#location-far-wrap").show().on("click",function(){var a="http://api.map.baidu.com/direction?origin=latlng:"+t.point.lat+","+t.point.lng+"|name:我的位置&destination=latlng:"+shop.lat+","+shop.lng+"|name:"+shop.name+"&mode=driving&region="+shop.country+"&output=html&src=114|weixin";window.open(a)})};var n=new BMap.DrivingRoute(map,{onSearchComplete:i});n.search(t.point,a)}else{}},{enableHighAccuracy:true})}$("#qr-btn").on("click",function(){var t="<img src="+DIR+"shop/qr/id/"+shop.id+'/ style="display:block;margin:0 auto">';showMessage(t)})};

(function($,window){var template='<div id="{{id}}" class="mui-slider mui-preview-image mui-fullscreen"><div class="mui-preview-header">{{header}}</div><div class="mui-slider-group"></div><div class="mui-preview-footer mui-hidden">{{footer}}</div><div class="mui-preview-loading"><span class="mui-spinner mui-spinner-white"></span></div></div>';var itemTemplate='<div class="mui-slider-item mui-zoom-wrapper {{className}}"><div class="mui-zoom-scroller"><img src="{{src}}" data-preview-lazyload="{{lazyload}}" style="{{style}}" class="mui-zoom"></div></div>';var defaultGroupName='__DEFAULT';var div=document.createElement('div');var imgId=0;var PreviewImage=function(options){this.options=$.extend(true,{id:'__MUI_PREVIEWIMAGE',zoom:true,header:'<span class="mui-preview-indicator"></span>',footer:''},options||{});this.init();this.initEvent();};var proto=PreviewImage.prototype;proto.init=function(){var options=this.options;var el=document.getElementById(this.options.id);if(!el){div.innerHTML=template.replace(/\{\{id\}\}/g,this.options.id).replace('{{header}}',options.header).replace('{{footer}}',options.footer);document.body.appendChild(div.firstElementChild);el=document.getElementById(this.options.id);}
$.options.gestureConfig.pinch=true;$.options.gestureConfig.doubletap=true;this.element=el;this.scroller=this.element.querySelector($.classSelector('.slider-group'));this.indicator=this.element.querySelector($.classSelector('.preview-indicator'));this.loader=this.element.querySelector($.classSelector('.preview-loading'));if(options.footer){this.element.querySelector($.classSelector('.preview-footer')).classList.remove($.className('hidden'));}
this.addImages();};proto.initEvent=function(){var self=this;$(document.body).on(window.CLICK_EVENT,'img[data-preview-src]',function(){if(self.isAnimationing()){return false;}
self.open(this);return false;});var laterClose=null;var laterCloseEvent=function(){!laterClose&&(laterClose=$.later(function(){self.isInAnimation=true;self.loader.removeEventListener(window.CLICK_EVENT,laterCloseEvent);self.scroller.removeEventListener(window.CLICK_EVENT,laterCloseEvent);self.close();},300));};this.scroller.addEventListener('double'+window.CLICK_EVENT,function(){if(laterClose){laterClose.cancel();laterClose=null;}});this.element.addEventListener('webkitAnimationEnd',function(){if(self.element.classList.contains($.className('preview-out'))){self.element.style.display='none';self.element.classList.remove($.className('preview-out'));laterClose=null;}else{self.loader.addEventListener(window.CLICK_EVENT,laterCloseEvent);self.scroller.addEventListener(window.CLICK_EVENT,laterCloseEvent);}
self.isInAnimation=false;});this.element.addEventListener('slide',function(e){if(self.options.zoom){var lastZoomerEl=self.element.querySelector('.mui-zoom-wrapper:nth-child('+(self.lastIndex+1)+')');if(lastZoomerEl){$(lastZoomerEl).zoom().setZoom(1);}}
var slideNumber=e.detail.slideNumber;self.lastIndex=slideNumber;self.indicator&&(self.indicator.innerText=(slideNumber+1)+'/'+self.currentGroup.length);self._loadItem(slideNumber);});};proto.isAnimationing=function(){if(this.isInAnimation){return true;}
this.isInAnimation=true;return false;};proto.addImages=function(group,index){this.groups={};var imgs=[];if(group){if(group===defaultGroupName){imgs=document.querySelectorAll("img[data-preview-src]:not([data-preview-group])");}else{imgs=document.querySelectorAll("img[data-preview-src][data-preview-group='"+group+"']");}}else{imgs=document.querySelectorAll("img[data-preview-src]");}
if(imgs.length){for(var i=0,len=imgs.length;i<len;i++){this.addImage(imgs[i]);}}};proto.addImage=function(img){var group=img.getAttribute('data-preview-group');group=group||defaultGroupName;if(!this.groups[group]){this.groups[group]=[];}
var lazyload=img.getAttribute('data-preview-src');var src=img.getAttribute('src')?img.getAttribute('src'):lazyload;if(src.search(/about\:blank/ig)>-1){src=lazyload;}
if(img.__mui_img_data&&img.__mui_img_data.src===src){if(this.groups[group].length){isFind=0;for(var i in this.groups[group]){if(this.groups[group][i].src==src){isFind=1;}}
if(isFind){return;}}
this.groups[group].push(img.__mui_img_data);}else{if(!lazyload){lazyload=src;}
var imgObj={src:src,lazyload:src===lazyload?'':lazyload,loaded:src===lazyload?true:false,sWidth:0,sHeight:0,sTop:0,sLeft:0,sScale:1,el:img};if(this.groups[group].length){isFind=0;for(var i in this.groups[group]){if(this.groups[group][i].src==src){isFind=1;}}
if(isFind){return;}}
this.groups[group].push(imgObj);img.__mui_img_data=imgObj;}};proto.empty=function(){this.scroller.innerHTML='';};proto._initImgData=function(itemData,imgEl){if(!itemData.sWidth){var img=itemData.el;itemData.sWidth=img.offsetWidth;itemData.sHeight=img.offsetHeight;var offset=$.offset(img);itemData.sTop=offset.top;itemData.sLeft=offset.left;itemData.sScale=Math.max(itemData.sWidth/window.innerWidth,itemData.sHeight/window.innerHeight);}
imgEl.style.webkitTransform='translate3d(0,0,0) scale('+itemData.sScale+')';};proto._getScale=function(from,to){var scaleX=from.width/to.width;var scaleY=from.height/to.height;var scale=1;if(scaleX<=scaleY){scale=from.height/(to.height*scaleX);}else{scale=from.width/(to.width*scaleY);}
return scale;};proto._imgTransitionEnd=function(e){var img=e.target;img.classList.remove($.className('transitioning'));img.removeEventListener('webkitTransitionEnd',this._imgTransitionEnd.bind(this));};proto._loadItem=function(index,isOpening){var itemEl=this.scroller.querySelector($.classSelector('.slider-item:nth-child('+(index+1)+')'));var itemData=this.currentGroup[index];var imgEl=itemEl.querySelector('img');this._initImgData(itemData,imgEl);if(isOpening){var posi=this._getPosition(itemData);imgEl.style.webkitTransitionDuration='0ms';imgEl.style.webkitTransform='translate3d('+posi.x+'px,'+posi.y+'px,0) scale('+itemData.sScale+')';imgEl.offsetHeight;}
if(!itemData.loaded&&imgEl.getAttribute('data-preview-lazyload')){var self=this;self.loader.classList.add($.className('active'));imgEl.style.webkitTransitionDuration='0.5s';imgEl.addEventListener('webkitTransitionEnd',self._imgTransitionEnd.bind(self));imgEl.style.webkitTransform='translate3d(0,0,0) scale('+itemData.sScale+')';this.loadImage(imgEl,function(){itemData.loaded=true;imgEl.src=itemData.lazyload;self._initZoom(itemEl,this.width,this.height);imgEl.classList.add($.className('transitioning'));imgEl.addEventListener('webkitTransitionEnd',self._imgTransitionEnd.bind(self));imgEl.setAttribute('style','');imgEl.offsetHeight;self.loader.classList.remove($.className('active'));});}else{itemData.lazyload&&(imgEl.src=itemData.lazyload);this._initZoom(itemEl,imgEl.width,imgEl.height);imgEl.classList.add($.className('transitioning'));imgEl.addEventListener('webkitTransitionEnd',this._imgTransitionEnd.bind(this));imgEl.setAttribute('style','');imgEl.offsetHeight;}
this._preloadItem(index+1);this._preloadItem(index-1);};proto._preloadItem=function(index){var itemEl=this.scroller.querySelector($.classSelector('.slider-item:nth-child('+(index+1)+')'));if(itemEl){var itemData=this.currentGroup[index];if(!itemData.sWidth){var imgEl=itemEl.querySelector('img');this._initImgData(itemData,imgEl);}}};proto._initZoom=function(zoomWrapperEl,zoomerWidth,zoomerHeight){if(!this.options.zoom){return;}
if(zoomWrapperEl.getAttribute('data-zoomer')){return;}
var zoomEl=zoomWrapperEl.querySelector($.classSelector('.zoom'));if(zoomEl.tagName==='IMG'){var self=this;var maxZoom=self._getScale({width:zoomWrapperEl.offsetWidth,height:zoomWrapperEl.offsetHeight},{width:zoomerWidth,height:zoomerHeight});$(zoomWrapperEl).zoom({maxZoom:Math.max(maxZoom,1)});}else{$(zoomWrapperEl).zoom();}};proto.loadImage=function(imgEl,callback){var onReady=function(){callback&&callback.call(this);};var img=new Image();img.onload=onReady;img.onerror=onReady;img.src=imgEl.getAttribute('data-preview-lazyload');};proto.getRangeByIndex=function(index,length){return{from:0,to:length-1};};proto._getPosition=function(itemData){var sLeft=itemData.sLeft-window.pageXOffset;var sTop=itemData.sTop-window.pageYOffset;var left=(window.innerWidth-itemData.sWidth)/2;var top=(window.innerHeight-itemData.sHeight)/2;return{left:sLeft,top:sTop,x:sLeft-left,y:sTop-top};};proto.refresh=function(index,groupArray){this.currentGroup=groupArray;var length=groupArray.length;var itemHtml=[];var currentRange=this.getRangeByIndex(index,length);var from=currentRange.from;var to=currentRange.to+1;var currentIndex=index;var className='';var itemStr='';var wWidth=window.innerWidth;var wHeight=window.innerHeight;for(var i=0;from<to;from++,i++){var itemData=groupArray[from];var style='';if(itemData.sWidth){style='-webkit-transform:translate3d(0,0,0) scale('+itemData.sScale+');transform:translate3d(0,0,0) scale('+itemData.sScale+')';}
itemStr=itemTemplate.replace('{{src}}',itemData.src).replace('{{lazyload}}',itemData.lazyload).replace('{{style}}',style);if(from===index){currentIndex=i;className=$.className('active');}else{className='';}
itemHtml.push(itemStr.replace('{{className}}',className));}
this.scroller.innerHTML=itemHtml.join('');this.element.style.display='block';this.element.classList.add($.className('preview-in'));this.lastIndex=currentIndex;this.element.offsetHeight;$(this.element).slider().gotoItem(currentIndex,0);this.indicator&&(this.indicator.innerText=(currentIndex+1)+'/'+this.currentGroup.length);this._loadItem(currentIndex,true);};proto.openByGroup=function(index,group){index=Math.min(Math.max(0,index),this.groups[group].length-1);this.refresh(index,this.groups[group]);};proto.open=function(index,group){if(this.element.classList.contains($.className('preview-in'))){return;}
if(typeof index==="number"){group=group||defaultGroupName;this.addImages(group,index);this.openByGroup(index,group);}else{group=index.getAttribute('data-preview-group');group=group||defaultGroupName;this.addImages(group,index);var groupIndex=-1;for(var i in this.groups[group]){if(this.groups[group][i].el.outerHTML==index.outerHTML){groupIndex=i;break;}}
this.openByGroup(groupIndex,group);}};proto.close=function(index,group){this.element.classList.remove($.className('preview-in'));this.element.classList.add($.className('preview-out'));var itemEl=this.scroller.querySelector($.classSelector('.slider-item:nth-child('+(this.lastIndex+1)+')'));var imgEl=itemEl.querySelector('img');if(imgEl){imgEl.classList.add($.className('transitioning'));var itemData=this.currentGroup[this.lastIndex];var posi=this._getPosition(itemData);var sLeft=posi.left;var sTop=posi.top;if(sTop>window.innerHeight||sLeft>window.innerWidth||sTop<0||sLeft<0){imgEl.style.opacity=0;imgEl.style.webkitTransitionDuration='0.5s';imgEl.style.webkitTransform='scale('+itemData.sScale+')';}else{if(this.options.zoom){$(imgEl.parentNode.parentNode).zoom().toggleZoom(0);}
imgEl.style.webkitTransitionDuration='0.5s';imgEl.style.webkitTransform='translate3d('+posi.x+'px,'+posi.y+'px,0) scale('+itemData.sScale+')';}}
var zoomers=this.element.querySelectorAll($.classSelector('.zoom-wrapper'));for(var i=0,len=zoomers.length;i<len;i++){$(zoomers[i]).zoom().destory();}};proto.isShown=function(){return this.element.classList.contains($.className('preview-in'));};var previewImageApi=null;$.previewImage=function(options){if(!previewImageApi){previewImageApi=new PreviewImage(options);}
return previewImageApi;};$.getPreviewImage=function(){return previewImageApi;}})(mui,window);;

(function($,window){var CLASS_ZOOM=$.className('zoom');var CLASS_ZOOM_SCROLLER=$.className('zoom-scroller');var SELECTOR_ZOOM='.'+CLASS_ZOOM;var SELECTOR_ZOOM_SCROLLER='.'+CLASS_ZOOM_SCROLLER;var EVENT_PINCH_START='pinchstart';var EVENT_PINCH='pinch';var EVENT_PINCH_END='pinchend';if('ongesturestart'in window){EVENT_PINCH_START='gesturestart';EVENT_PINCH='gesturechange';EVENT_PINCH_END='gestureend';}
$.Zoom=function(element,options){var zoom=this;zoom.options=$.extend($.Zoom.defaults,options);zoom.wrapper=zoom.element=element;zoom.scroller=element.querySelector(SELECTOR_ZOOM_SCROLLER);zoom.scrollerStyle=zoom.scroller&&zoom.scroller.style;zoom.zoomer=element.querySelector(SELECTOR_ZOOM);zoom.zoomerStyle=zoom.zoomer&&zoom.zoomer.style;zoom.init=function(){zoom.initEvents();};zoom.initEvents=function(detach){var action=detach?'removeEventListener':'addEventListener';var target=zoom.scroller;target[action](EVENT_PINCH_START,zoom.onPinchstart);target[action](EVENT_PINCH,zoom.onPinch);target[action](EVENT_PINCH_END,zoom.onPinchend);target[action]('touchstart',zoom.onTouchstart);target[action]('touchmove',zoom.onTouchMove);target[action]('touchcancel',zoom.onTouchEnd);target[action]('touchend',zoom.onTouchEnd);target[action]('drag',function(e){if(imageIsMoved||isGesturing){e.stopPropagation();}});target[action]('doubletap',function(e){zoom.toggleZoom(e.detail.center);});};zoom.transition=function(style,time){time=time||0;style['webkitTransitionDuration']=time+'ms';return zoom;};zoom.translate=function(style,x,y){x=x||0;y=y||0;style['webkitTransform']='translate3d('+x+'px,'+y+'px,0px)';return zoom;};zoom.scale=function(style,scale){scale=scale||1;style['webkitTransform']='translate3d(0,0,0) scale('+scale+')';return zoom;};zoom.scrollerTransition=function(time){return zoom.transition(zoom.scrollerStyle,time);};zoom.scrollerTransform=function(x,y){return zoom.translate(zoom.scrollerStyle,x,y);};zoom.zoomerTransition=function(time){return zoom.transition(zoom.zoomerStyle,time);};zoom.zoomerTransform=function(scale){return zoom.scale(zoom.zoomerStyle,scale);};var scale=1,currentScale=1,isScaling=false,isGesturing=false;zoom.onPinchstart=function(e){isGesturing=true;};zoom.onPinch=function(e){if(!isScaling){zoom.zoomerTransition(0);isScaling=true;}
scale=(e.detail?e.detail.scale:e.scale)*currentScale;if(scale>zoom.options.maxZoom){scale=zoom.options.maxZoom-1+Math.pow((scale-zoom.options.maxZoom+1),0.5);}
if(scale<zoom.options.minZoom){scale=zoom.options.minZoom+1-Math.pow((zoom.options.minZoom-scale+1),0.5);}
zoom.zoomerTransform(scale);};zoom.onPinchend=function(e){scale=Math.max(Math.min(scale,zoom.options.maxZoom),zoom.options.minZoom);zoom.zoomerTransition(zoom.options.speed).zoomerTransform(scale);currentScale=scale;isScaling=false;};zoom.setZoom=function(newScale){scale=currentScale=newScale;zoom.scrollerTransition(zoom.options.speed).scrollerTransform(0,0);zoom.zoomerTransition(zoom.options.speed).zoomerTransform(scale);};zoom.toggleZoom=function(position,speed){if(typeof position==='number'){speed=position;position=undefined;}
speed=typeof speed==='undefined'?zoom.options.speed:speed;if(scale&&scale!==1){scale=currentScale=1;zoom.scrollerTransition(speed).scrollerTransform(0,0);}else{scale=currentScale=zoom.options.maxZoom;if(position){var offset=$.offset(zoom.zoomer);var top=offset.top;var left=offset.left;var offsetX=(position.x-left)*scale;var offsetY=(position.y-top)*scale;this._cal();if(offsetX>=imageMaxX&&offsetX<=(imageMaxX+wrapperWidth)){offsetX=imageMaxX-offsetX+wrapperWidth/2;}else if(offsetX<imageMaxX){offsetX=imageMaxX-offsetX+wrapperWidth/2;}else if(offsetX>(imageMaxX+wrapperWidth)){offsetX=imageMaxX+wrapperWidth-offsetX-wrapperWidth/2;}
if(offsetY>=imageMaxY&&offsetY<=(imageMaxY+wrapperHeight)){offsetY=imageMaxY-offsetY+wrapperHeight/2;}else if(offsetY<imageMaxY){offsetY=imageMaxY-offsetY+wrapperHeight/2;}else if(offsetY>(imageMaxY+wrapperHeight)){offsetY=imageMaxY+wrapperHeight-offsetY-wrapperHeight/2;}
offsetX=Math.min(Math.max(offsetX,imageMinX),imageMaxX);offsetY=Math.min(Math.max(offsetY,imageMinY),imageMaxY);zoom.scrollerTransition(speed).scrollerTransform(offsetX,offsetY);}else{zoom.scrollerTransition(speed).scrollerTransform(0,0);}}
zoom.zoomerTransition(speed).zoomerTransform(scale);};zoom._cal=function(){wrapperWidth=zoom.wrapper.offsetWidth;wrapperHeight=zoom.wrapper.offsetHeight;imageWidth=zoom.zoomer.offsetWidth;imageHeight=zoom.zoomer.offsetHeight;var scaledWidth=imageWidth*scale;var scaledHeight=imageHeight*scale;imageMinX=Math.min((wrapperWidth/2-scaledWidth/2),0);imageMaxX=-imageMinX;imageMinY=Math.min((wrapperHeight/2-scaledHeight/2),0);imageMaxY=-imageMinY;};var wrapperWidth,wrapperHeight,imageIsTouched,imageIsMoved,imageCurrentX,imageCurrentY,imageMinX,imageMinY,imageMaxX,imageMaxY,imageWidth,imageHeight,imageTouchesStart={},imageTouchesCurrent={},imageStartX,imageStartY,velocityPrevPositionX,velocityPrevTime,velocityX,velocityPrevPositionY,velocityY;zoom.onTouchstart=function(e){e.preventDefault();imageIsTouched=true;imageTouchesStart.x=e.type==='touchstart'?e.targetTouches[0].pageX:e.pageX;imageTouchesStart.y=e.type==='touchstart'?e.targetTouches[0].pageY:e.pageY;};zoom.onTouchMove=function(e){e.preventDefault();if(!imageIsTouched)return;if(!imageIsMoved){wrapperWidth=zoom.wrapper.offsetWidth;wrapperHeight=zoom.wrapper.offsetHeight;imageWidth=zoom.zoomer.offsetWidth;imageHeight=zoom.zoomer.offsetHeight;var translate=$.parseTranslateMatrix($.getStyles(zoom.scroller,'webkitTransform'));imageStartX=translate.x||0;imageStartY=translate.y||0;zoom.scrollerTransition(0);}
var scaledWidth=imageWidth*scale;var scaledHeight=imageHeight*scale;if(scaledWidth<wrapperWidth&&scaledHeight<wrapperHeight)return;imageMinX=Math.min((wrapperWidth/2-scaledWidth/2),0);imageMaxX=-imageMinX;imageMinY=Math.min((wrapperHeight/2-scaledHeight/2),0);imageMaxY=-imageMinY;imageTouchesCurrent.x=e.type==='touchmove'?e.targetTouches[0].pageX:e.pageX;imageTouchesCurrent.y=e.type==='touchmove'?e.targetTouches[0].pageY:e.pageY;if(!imageIsMoved&&!isScaling){if((Math.floor(imageMinX)===Math.floor(imageStartX)&&imageTouchesCurrent.x<imageTouchesStart.x)||(Math.floor(imageMaxX)===Math.floor(imageStartX)&&imageTouchesCurrent.x>imageTouchesStart.x)){imageIsTouched=false;return;}}
imageIsMoved=true;imageCurrentX=imageTouchesCurrent.x-imageTouchesStart.x+imageStartX;imageCurrentY=imageTouchesCurrent.y-imageTouchesStart.y+imageStartY;if(imageCurrentX<imageMinX){imageCurrentX=imageMinX+1-Math.pow((imageMinX-imageCurrentX+1),0.8);}
if(imageCurrentX>imageMaxX){imageCurrentX=imageMaxX-1+Math.pow((imageCurrentX-imageMaxX+1),0.8);}
if(imageCurrentY<imageMinY){imageCurrentY=imageMinY+1-Math.pow((imageMinY-imageCurrentY+1),0.8);}
if(imageCurrentY>imageMaxY){imageCurrentY=imageMaxY-1+Math.pow((imageCurrentY-imageMaxY+1),0.8);}
if(!velocityPrevPositionX)velocityPrevPositionX=imageTouchesCurrent.x;if(!velocityPrevPositionY)velocityPrevPositionY=imageTouchesCurrent.y;if(!velocityPrevTime)velocityPrevTime=$.now();velocityX=(imageTouchesCurrent.x-velocityPrevPositionX)/($.now()-velocityPrevTime)/2;velocityY=(imageTouchesCurrent.y-velocityPrevPositionY)/($.now()-velocityPrevTime)/2;if(Math.abs(imageTouchesCurrent.x-velocityPrevPositionX)<2)velocityX=0;if(Math.abs(imageTouchesCurrent.y-velocityPrevPositionY)<2)velocityY=0;velocityPrevPositionX=imageTouchesCurrent.x;velocityPrevPositionY=imageTouchesCurrent.y;velocityPrevTime=$.now();zoom.scrollerTransform(imageCurrentX,imageCurrentY);};zoom.onTouchEnd=function(e){if(!e.touches.length){isGesturing=false;}
if(!imageIsTouched||!imageIsMoved){imageIsTouched=false;imageIsMoved=false;return;}
imageIsTouched=false;imageIsMoved=false;var momentumDurationX=300;var momentumDurationY=300;var momentumDistanceX=velocityX*momentumDurationX;var newPositionX=imageCurrentX+momentumDistanceX;var momentumDistanceY=velocityY*momentumDurationY;var newPositionY=imageCurrentY+momentumDistanceY;if(velocityX!==0)momentumDurationX=Math.abs((newPositionX-imageCurrentX)/velocityX);if(velocityY!==0)momentumDurationY=Math.abs((newPositionY-imageCurrentY)/velocityY);var momentumDuration=Math.max(momentumDurationX,momentumDurationY);imageCurrentX=newPositionX;imageCurrentY=newPositionY;var scaledWidth=imageWidth*scale;var scaledHeight=imageHeight*scale;imageMinX=Math.min((wrapperWidth/2-scaledWidth/2),0);imageMaxX=-imageMinX;imageMinY=Math.min((wrapperHeight/2-scaledHeight/2),0);imageMaxY=-imageMinY;imageCurrentX=Math.max(Math.min(imageCurrentX,imageMaxX),imageMinX);imageCurrentY=Math.max(Math.min(imageCurrentY,imageMaxY),imageMinY);zoom.scrollerTransition(momentumDuration).scrollerTransform(imageCurrentX,imageCurrentY);};zoom.destory=function(){zoom.initEvents(true);delete $.data[zoom.wrapper.getAttribute('data-zoomer')];zoom.wrapper.setAttribute('data-zoomer','');}
zoom.init();return zoom;};$.Zoom.defaults={speed:300,maxZoom:3,minZoom:1,};$.fn.zoom=function(options){var zoomApis=[];this.each(function(){var zoomApi=null;var self=this;var id=self.getAttribute('data-zoomer');if(!id){id=++$.uuid;$.data[id]=zoomApi=new $.Zoom(self,options);self.setAttribute('data-zoomer',id);}else{zoomApi=$.data[id];}
zoomApis.push(zoomApi);});return zoomApis.length===1?zoomApis[0]:zoomApis;};})(mui,window);;
(function(r){"use strict";var t=""+'<svg version="1.1"'+'xmlns="http://www.w3.org/2000/svg"'+'viewBox="0 12.705 512 486.59"'+'x="0px" y="0px"'+'xml:space="preserve">'+"<polygon "+'points="256.814,12.705 317.205,198.566'+" 512.631,198.566 354.529,313.435 "+"414.918,499.295 256.814,384.427 "+"98.713,499.295 159.102,313.435 "+'1,198.566 196.426,198.566 "/>'+"</svg>";var n={starWidth:"32px",normalFill:"gray",ratedFill:"#f39c12",numStars:5,maxValue:5,precision:1,rating:0,fullStar:false,halfStar:false,readOnly:false,spacing:"0px",multiColor:null,onInit:null,onChange:null,onSet:null};var e={startColor:"#c0392b",endColor:"#f1c40f"};function a(r,t,n){if(r===t){r=t}else if(r===n){r=n}return r}function i(r,t,n){var e=r>=t&&r<=n;if(!e){throw Error("Invalid Rating, expected value between "+t+" and "+n)}return r}function o(r){return typeof r!=="undefined"}var l=/^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;var s=function(r){if(!l.test(r)){return null}var t=l.exec(r),n=parseInt(t[1],16),e=parseInt(t[2],16),a=parseInt(t[3],16);return{r:n,g:e,b:a}};function f(r,t,n){var e=(t-r)*(n/100);e=Math.round(r+e).toString(16);if(e.length===1){e="0"+e}return e}function u(r,t,n){if(!r||!t){return null}n=o(n)?n:0;r=s(r);t=s(t);var e=f(r.r,t.r,n),a=f(r.b,t.b,n),i=f(r.g,t.g,n);return"#"+e+i+a}function c(n,l){this.node=n.get(0);var s=this;n.empty().addClass("jq-ry-container");var f=r("<div/>").addClass("jq-ry-group-wrapper").appendTo(n);var p=r("<div/>").addClass("jq-ry-normal-group").addClass("jq-ry-group").appendTo(f);var g=r("<div/>").addClass("jq-ry-rated-group").addClass("jq-ry-group").appendTo(f);var d,v,y,m,x,w,C=0;var S=l.rating;var b=false;function F(r){if(!o(r)){r=l.rating}S=r;var t=r/d;var n=t*y;if(t>1){n+=(Math.ceil(t)-1)*x}E(l.ratedFill);g.css("width",n+"%")}function k(){w=v*l.numStars+m*(l.numStars-1);y=v/w*100;x=m/w*100;n.width(w);F()}function I(r){var t=l.starWidth=r;v=window.parseFloat(l.starWidth.replace("px",""));p.find("svg").attr({width:l.starWidth,height:t});g.find("svg").attr({width:l.starWidth,height:t});k();return n}function V(r){l.spacing=r;m=parseFloat(l.spacing.replace("px",""));p.find("svg:not(:first-child)").css({"margin-left":r});g.find("svg:not(:first-child)").css({"margin-left":r});k();return n}function j(r){l.normalFill=r;p.find("svg").attr({fill:l.normalFill});return n}var q=l.ratedFill;function E(r){if(l.multiColor){var t=S-C,a=t/l.maxValue*100;var i=l.multiColor||{},o=i.startColor||e.startColor,s=i.endColor||e.endColor;r=u(o,s,a)}else{q=r}l.ratedFill=r;g.find("svg").attr({fill:l.ratedFill});return n}function W(r){l.multiColor=r;E(r?r:q)}function A(e){l.numStars=e;d=l.maxValue/l.numStars;p.empty();g.empty();for(var a=0;a<l.numStars;a++){p.append(r(t));g.append(r(t))}I(l.starWidth);j(l.normalFill);V(l.spacing);F();return n}function M(r){l.maxValue=r;d=l.maxValue/l.numStars;if(l.rating>r){B(r)}F();return n}function O(r){l.precision=r;B(l.rating);return n}function T(r){l.halfStar=r;return n}function R(r){l.fullStar=r;return n}function Y(r){var t=r%d,n=d/2,e=l.halfStar,a=l.fullStar;if(!a&&!e){return r}if(a||e&&t>n){r+=d-t}else{r=r-t;if(t>0){r+=n}}return r}function $(r){var t=p.offset(),n=t.left,e=n+p.width();var a=l.maxValue;var i=r.pageX;var o=0;if(i<n){o=C}else if(i>e){o=a}else{var s=(i-n)/(e-n);if(m>0){s*=100;var f=s;while(f>0){if(f>y){o+=d;f-=y+x}else{o+=f/y*d;f=0}}}else{o=s*l.maxValue}o=Y(o)}return o}function z(r){l.readOnly=r;n.attr("readonly",true);U();if(!r){n.removeAttr("readonly");P()}return n}function B(r){var t=r;var e=l.maxValue;if(typeof t==="string"){if(t[t.length-1]==="%"){t=t.substr(0,t.length-1);e=100;M(e)}t=parseFloat(t)}i(t,C,e);t=parseFloat(t.toFixed(l.precision));a(parseFloat(t),C,e);l.rating=t;F();if(b){n.trigger("rateyo.set",{rating:t})}return n}function N(r){l.onInit=r;return n}function Q(r){l.onSet=r;return n}function X(r){l.onChange=r;return n}this.rating=function(r){if(!o(r)){return l.rating}B(r);return n};this.destroy=function(){if(!l.readOnly){U()}c.prototype.collection=h(n.get(0),this.collection);n.removeClass("jq-ry-container").children().remove();return n};this.method=function(r){if(!r){throw Error("Method name not specified!")}if(!o(this[r])){throw Error("Method "+r+" doesn't exist!")}var t=Array.prototype.slice.apply(arguments,[]),n=t.slice(1),e=this[r];return e.apply(this,n)};this.option=function(r,t){if(!o(r)){return l}var n;switch(r){case"starWidth":n=I;break;case"numStars":n=A;break;case"normalFill":n=j;break;case"ratedFill":n=E;break;case"multiColor":n=W;break;case"maxValue":n=M;break;case"precision":n=O;break;case"rating":n=B;break;case"halfStar":n=T;break;case"fullStar":n=R;break;case"readOnly":n=z;break;case"spacing":n=V;break;case"onInit":n=N;break;case"onSet":n=Q;break;case"onChange":n=X;break;default:throw Error("No such option as "+r)}return o(t)?n(t):l[r]};function D(r){var t=$(r).toFixed(l.precision);var e=l.maxValue;t=a(parseFloat(t),C,e);F(t);n.trigger("rateyo.change",{rating:t})}function G(){F();n.trigger("rateyo.change",{rating:l.rating})}function H(r){var t=$(r).toFixed(l.precision);t=parseFloat(t);s.rating(t)}function J(r,t){if(l.onInit&&typeof l.onInit==="function"){l.onInit.apply(this,[t.rating,s])}}function K(r,t){if(l.onChange&&typeof l.onChange==="function"){l.onChange.apply(this,[t.rating,s])}}function L(r,t){if(l.onSet&&typeof l.onSet==="function"){l.onSet.apply(this,[t.rating,s])}}function P(){n.on("mousemove",D).on("mouseenter",D).on("mouseleave",G).on("click",H).on("rateyo.init",J).on("rateyo.change",K).on("rateyo.set",L)}function U(){n.off("mousemove",D).off("mouseenter",D).off("mouseleave",G).off("click",H).off("rateyo.init",J).off("rateyo.change",K).off("rateyo.set",L)}A(l.numStars);z(l.readOnly);this.collection.push(this);this.rating(l.rating,true);b=true;n.trigger("rateyo.init",{rating:l.rating})}c.prototype.collection=[];function p(t,n){var e;r.each(n,function(){if(t===this.node){e=this;return false}});return e}function h(t,n){r.each(n,function(r){if(t===this.node){var e=n.slice(0,r),a=n.slice(r+1,n.length);n=e.concat(a);return false}});return n}function g(t){var e=c.prototype.collection;var a=r(this);if(a.length===0){return a}var i=Array.prototype.slice.apply(arguments,[]);if(i.length===0){t=i[0]={}}else if(i.length===1&&typeof i[0]==="object"){t=i[0]}else if(i.length>=1&&typeof i[0]==="string"){var o=i[0],l=i.slice(1);var s=[];r.each(a,function(r,t){var n=p(t,e);if(!n){throw Error("Trying to set options before even initialization")}var a=n[o];if(!a){throw Error("Method "+o+" does not exist!")}var i=a.apply(n,l);s.push(i)});s=s.length===1?s[0]:s;return s}else{throw Error("Invalid Arguments")}t=r.extend({},n,t);return r.each(a,function(){var n=p(this,e);if(!n){return new c(r(this),r.extend({},t))}})}function d(){return g.apply(this,Array.prototype.slice.apply(arguments,[]))}window.RateYo=c;r.fn.rateYo=d})($||window.jQuery);;