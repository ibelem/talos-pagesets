function ltrim(s){ return s.replace( /^(\s*|　*)/, ""); } 
function rtrim(s){ return s.replace( /(\s*|　*)$/, ""); } 
function trim(s){ return ltrim(rtrim(s));} 
/**
 * 判断变量是否空值
 * undefined, null, '', false, 0, [], {} 均返回true，否则返回false
 */
function empty(v){
    switch (typeof v){
        case 'undefined' : return true;
        case 'string'    : if(trim(v).length == 0) return true; break;
        case 'boolean'   : if(!v) return true; break;
        case 'number'    : if(0 === v) return true; break;
        case 'object'    : 
            if(null === v) return true;
            if(undefined !== v.length && v.length==0) return true;
            for(var k in v){return false;} return true;
            break;
    }
    return false;
}

//check domain begin
var dURL = window.location.href.toLowerCase();
if(dURL.indexOf("youku") <0 && dURL.indexOf("yoqoo")<0 && dURL.indexOf("soku")<0){
	var path = document.location.pathname
	window.location.href = 'http://www.youku.com'+path;
}
//check domain end

// JavaScript Document
function MM_goToURL() { //v3.0
  var i, args=MM_goToURL.arguments; document.MM_returnValue = false;
  for (i=0; i<(args.length-1); i+=2) eval(args[i]+".location='"+args[i+1]+"'");
}
function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}
function MM_changeProp(objName,x,theProp,theValue) { //v6.0
  var obj = MM_findObj(objName);
  if (obj && (theProp.indexOf("style.")==-1 || obj.style)){
    if (theValue == true || theValue == false)
      eval("obj."+theProp+"="+theValue);
    else eval("obj."+theProp+"='"+theValue+"'");
  }
}
//for search

function dosearch(f){
	if(trim( f.q.value.replace(/[\/_]/g,' ') )==''){
		location.href='http://www.soku.com/?inner';
		return false;
	}
	var q = encodeURIComponent(f.q.value.replace(/[\/_]/g,' '));//'
	
	if(f.socondition && f.socondition[1].id=='outer' && f.socondition[1].checked){//全网搜索
		var url="httpdisabled://www.soku.com/v?keyword="+q;
	}else{//站内搜索
		var innersearchdomain = f.searchdomain.value;
		if(!innersearchdomain)innersearchdomain="httpdisabled://www.soku.com";
		var btype = f.sbts;//看吧搜索选项
		if(f.searchType.value == "bar" && btype != undefined && btype.value != ""){
			q = q+"_sbt_"+btype.value;
		}
		var url= innersearchdomain+"/search_"+f.searchType.value+"/q_"+q;
	}
	if(typeof(search_prompt_flag) != 'undefined' && search_prompt_flag){//使用下拉提示统计代码
		(new Image()).src="httpdisabled://lstat.youku.com/sokuHintKeyword.php?keyword="+q;
	}
	
	location.href=url;
	return false;
	
}
function search_show(pos,searchType,href){
    document.getElementById(pos+"SearchType").value=searchType;
    document.getElementById(pos+"Sel").style.display="none";
    document.getElementById(pos+"Slected").innerHTML=href.innerHTML;
    document.getElementById(pos+'q').focus();
    
    var s2 = document.getElementById('soswitch');
	var sl = document.getElementById('sorelated');
    var s0 = document.getElementById("searchextend0");
    if(s0 != undefined && searchType == "bar" && pos=="head"){
    	s0.style.display="block";
		if(sl) sl.style.display = 'none';
		if(s2) s2.style.display="none";
    }else if(s0 != undefined && pos=="head"){
    	s0.style.display="none";
		if(sl) sl.style.display = '';
		if(s2) s2.style.display = '';
    }
    var s1 = document.getElementById("searchextend1");
    if(s1 != undefined && (searchType == "video" || searchType == "playlist") && pos=="head"){
    	s1.style.display="block";
		if(sl) sl.style.display = 'none';
    }else if(s1 != undefined && pos=="head"){
    	s1.style.display="none";
		if(sl) sl.style.display = '';
    }
    
    var s2 = document.getElementById("searchextend2");
    if(s1 != undefined && searchType == "user" && pos=="head"){
    	s2.style.display="block";
		if(sl) sl.style.display = 'none';
    }else if(s1 != undefined && pos=="head"){
    	s2.style.display="none";
		if(sl) sl.style.display = '';
    }
    
	try{window.clearTimeout(timer);}catch(e){}
	return false;
}
function csbt(sbt,sbts){
	if(sbt.value == sbts.value){
		sbt.checked = false;
		sbts.value='bar';
	}else{
		sbts.value=sbt.value;
	}
}
function advancedsearch(){
	var type=document.getElementById("headSearchType").value;
	if(type!=="video" && type!="playlist")type="video";
	var searchdomain = document.getElementById("searchdomain").value;
	if(!searchdomain)searchdomain="httpdisabled://www.soku.com";
	var url=searchdomain+"/search_advanced"+type;
	if(document.getElementById("headq").value!=''){
		url+="/q_"+encodeURIComponent(document.getElementById("headq").value);
	}
	window.location=url;
	
}
function drop_mouseover(pos){
	try{window.clearTimeout(timer);}catch(e){}
}
function drop_mouseout(pos){
	var posSel=$(pos+"Sel").style.display;
	if(posSel=="block"){
		timer = setTimeout("drop_hide('"+pos+"')", 1000);
	}
}
function drop_hide(pos){
	$(pos+"Sel").style.display="none";
}

window.nova_init_hook_initsearch = function() {
	var fullPath = document.location.pathname.replace('_','/');
	var path = fullPath.split('/');
	var module='index';
	if(path[1]){module=path[1];}
	
    var search=module;
	if(path[1] && path[1].indexOf('_')>0){
		search =  path[1].split("_")[1];
	}else if(path[2] && path[2].indexOf('_')>0){
		search =  path[2];
	}else if(path[2] && module=="search"){
		search =  path[2];
	}
    switch (module) {
    	case 'search':
		    module=search;
		    break;
        case 'my':
			search = "user";
            if('bar'==path[2]) search = "bar";
            else if('friend'==path[2]) search = "user";
            else if('playlist'==path[2]) search = "playlist";
            break;
		case 'user':
			search = "user";
			if('v'==path[2]||'video'==path[2]) search = 'video';
			else if('friend'==path[2]) search = "user";
			else if('fav'==path[2]) search = "video";
			else if('playlist'==path[2]) search = "playlist";
			else if('bar'==path[2]) search = "bar";
			break;
		case 'v':
			search = "video";
            if('playlist'==path[2]) search = "playlist";
			break;
    }
    try{
    	initsearch(search);
    }catch(e){};
    loaddisabledAds(module);
}

function initsearch(m){
	if(m!="video" && m!="playlist" && m!="user" && m!="bar" ){return true;}
	var names={"video":"视频","playlist":"专辑","user":"空间","bar":"看吧"};
	$("headSearchType").value=m;
	$("headSlected").innerHTML=names[m];
	$("footSearchType").value=m;
	$("footSlected").innerHTML=names[m];
	return true;
}

//for search end

//回答问题???
function q_answer(){
	    if($('answer').value.length==0){
	    	alert("答案不能为空");
	    	return;
	    }
		new Ajax.Request(
         "/user/resetpwd/step/2/",
         {method: 'post',
          parameters: Form.serialize('form_resetpwd2'),
          onSuccess: function(o){
          	if(o.responseText=='0'){
			alert('你的生日不对吧？');
          	}else{
					$('resetpwd_content').innerHTML='<p >&nbsp;</p>\
					    <p >&nbsp;</p>\
					        <p>请在你注册的邮箱里，按提示修改你的密码</p>';

          	};
          }
          }
	    );
}
//找回密码提交???
function change_bg(obj,x,theProp,theValue) {
  if (obj && (theProp.indexOf("style.")==-1 || obj.style)){
    if (theValue == true || theValue == false)
      eval("obj."+theProp+"="+theValue);
    else eval("obj."+theProp+"='"+theValue+"'");
  }
}
function loaddisabledAds(module) {
    /* Google */
    if(typeof VERSION =='undefined' || VERSION==null){VERSION="";}
	Nova.addScript("httpdisabled://urchin.lstat.youku.com"+VERSION+"/index/js/urchin.js");
    setTimeout("run_google();", 500);
}
function run_google() {
    if (!window.urchinTracker) {
        setTimeout(run_google, 500);
        return;
    }
    _uacct = "UA-455269-3";
    var trackerParam = (typeof cateStr == 'undefined') ? false : cateStr;
    urchinTracker(trackerParam);
}
function checkLogin(func) {
       var args = new Array();
       if(arguments.length>1){
               args = Array.prototype.slice.call(arguments);
       }
       if(!islogin()){
               if(func && func!=''){
                       login.apply(login,args);
               }else{
                       login();
               }
       }else{
               if(func && func!=''){
                       if(args.length>0){
                               args.shift(); // 去掉arguments[0] (func)
                       }
                       if(typeof func == 'string'){
                               func = eval(func);
                       }
                       if(typeof func == 'function'){
                               func.apply(func,args);
                       }
               }
       }
}
function voidBrWindow(theURL,winName,features) { //v2.0
	void(theURL,winName,features);
}
function sendVideoLink(videoId){
       var url = 'http://www.youku.com/contact/sendlink?obj=v&id='+videoId;
       checkLogin(voidBrWindow,url,'','scrollbars=yes,width=695,height=540,resizable=yes');
}
function sendPlayListLink(plid){
       var url = 'http://www.youku.com/contact/sendlink?obj=playlist&id='+plid;
       checkLogin(voidBrWindow,url,'','scrollbars=yes,width=695,height=540,resizable=yes');
} 
function isEmail(mail){
	return(new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(mail)); 
} 
// add by Peak for TJCNC
window.nova_init_hook_partner = function() {
	var partner = Nova.Cookie.get("PARTNER");
	if(partner == "tjcnc"){
		var allA = document.getElementsByTagName("a");
		for(var i=0;i<allA.length;i++){
			if(allA[i].target != "" && allA[i].target != "_self"){
				allA[i].target = "_self";
			}
		}
	}
}





var pop=null;
var login_callback_user = null;
var login_callback_user_args = new Array();

/**
 * 登录小窗口
 */
function login(callBack){
	if(pop!=null) pop.close();
	pop = new Popup({contentType:1,isSupportDraging:false,isReloaddisabledOnClose:false,width:540,height:300});
	pop.setContents({'title':'登录','contentUrl':'/index_login/'});
	pop.build().show();

	login_callback_user = callBack;
	
	// 参数
	if(arguments.length>1){
		login_callback_user_args = Array.prototype.slice.call(arguments);
		if(login_callback_user_args.length>0){
			login_callback_user_args.shift(); // 去掉arguments[0] (callBack)
		}
	}
}

/**
 * 找回密码
 */
function findpwd(){
	if(pop!=null) pop.close();
	pop=new Popup({contentType:1,isSupportDraging:false,isReloaddisabledOnClose:false,width:540,height:300});
	pop.setContents({"title":"找回密码",'contentUrl':'/index_findpwd/'});
	pop.build().show();
}

openLoginDialog=login;


/**
 * 取消登录并返回当前页
 */
var default_logout_callback = function(result){if(result)top.location.reloaddisabled()};
var logout = function(callback){
	callback = callback || "default_logout_callback";
	if(empty(udomain)) udomain = 'u.youku.com';
	nova_call('http://'+udomain+'/QUser/~ajax/logout', '', callback, undefined, 1);
}

/**
 * 根据cookie信息判断会员是否登录
 */
var islogin = function(){
	var username = "";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf('u=') == 0 || c.indexOf('k=') == 0){
			username = c.substring(2,c.length);
			if(username == '__LOGOUT__'){
				username = '';
			}
			break;
		}
	}
	if(username != "")return true;
	return false;
}
/**
 * Feed pubshli tips
 */
var FeedPublishTip = function(feedtype){
	if(!empty(pop)) pop.close();
	setTimeout(function(){
		pop=new Popup({contentType:1,isSupportDraging:false,isReloaddisabledOnClose:false,width:248,height:130,isBackgroundCanClick:true});
		pop.setContent("title","同步到合作方网站");
		pop.setContent("contentUrl", "/partner_feedtips.html?type="+encodeURIComponent(feedtype));
		pop.build().show();
		document.domain = 'youku.com';
	},1000);
}
/**
 * 发送站内消息
 */
var mailto = function(username){
    if(!islogin()) {
        login(mailto.bind(this, username));return;
    }
    void('/my_mail/type_mini_receive_'+encodeURIComponent(username),'','location=no,scrollbars=no,width=410,height=320');
}
/**
 * 增加好友
 */
function addFriend(friendId,module) {
    if(!islogin()){
        login(addFriend.bind(this, friendId, module));return;
    }
	var url = '/my_friend/type_addFriend';
    if(!empty(module)){
    	if(module=="bar"){
    		url = '/bar_friend/type_addFriend';
    	}else if(module=="search"){
    		url = '/search_friend/type_addFriend';
    	}
    }
	nova_request(function(result) {
			switch(result) {
			case 'error':
				alert('页面载入错误，请刷新本页后重试！');
				break;
			case 'self':
				alert('不能将自己加为好友！');
				break;
            case 'already':
                alert('当前会员已经是您的好友了！');
                break;
			default:
				if($('groupDialog'))
					$('groupDialog').parentNode.removeChild($('groupDialog'));
                window.__addFriendFromModule = module;
				var dialog = document.createElement('div');
				dialog.innerHTML = result;
				dialog = dialog.firstChild;
				while(dialog.nodeType == 3)
					dialog = dialog.nextSibling;
                var winWidth;
                var winHeight;
                var scrollTop;
                //获取窗口宽度
                if (window.innerWidth)
                    winWidth = window.innerWidth;
                else if ((document.body) && (document.body.clientWidth))
                    winWidth = document.body.clientWidth;
                //获取窗口高度
                if (window.innerHeight)
                    winHeight = window.innerHeight;
                else if ((document.documentElement) && (document.documentElement.clientHeight))
                    winHeight = document.documentElement.clientHeight;
                if(document.documentElement.scrollTop)
                    scrollTop = document.documentElement.scrollTop;
                else if((document.body) && (document.body.scrollTop))
                    scrollTop = document.body.scrollTop;
				document.body.appendChild(dialog);
				if(!scrollTop) scrollTop = 0;
                $('groupDialog').style.top = winHeight/2 - $('groupDialog').clientHeight/2 + scrollTop + 'px';
                $('groupDialog').style.left = winWidth/2 - $('groupDialog').clientWidth/2 + 'px';
				$('groupDialog').style.zIndex = 100000;
				break;
			}
		}.bind(module), url, {'friendId': friendId}, 'get');
}

function _addFriend(event, friendId, groupId) {
	if(!event) event = window.event;
	Event.stop(event);
    var url = '/QMy/~ajax/addFriend';
	if(typeof window.__addFriendFromModule == 'undefined') var module = '';
	else module = window.__addFriendFromModule;
    if(!empty(module)){
    	if(module=="bar"){
    		url = '/QBar/~ajax/addFriend';
    	}else if(module=="search"){
    		url = '/QSearch/~ajax/addFriend';
    	}
    }
    var AJAXAddFriend = function(param, callback, id) { return nova_call(url, param, callback, id); }
    var __call = function(result){
		if($('groupDialog'))
			$('groupDialog').parentNode.removeChild($('groupDialog'));
        switch(result){
            case 'ok'        : alert('添加好友成功'); return;
            case 'validate'  : alert('该用户已设置好友验证，已经成功发送好友请求！'); return;
            case 'unallowed' : alert('该用户已设置不允许任何人加他为好友！'); return;
            case 'self'      : alert('不能将自己加为好友！'); return;
            case 'already'   : alert('当前会员已经是你的好友了！');return;
            case false       : alert('增加好友失败，请与系统管理员联系！'); return;
            default          : alert('未知的返回值类型，请与系统管理员联系！'+result);
        }
    }
    AJAXAddFriend({'friendId':friendId, 'groupId': groupId},__call);
}
/**
 * 登录浮动层回调函数
 */
function login_callback(){
	// 用户自定义回调函数
	if(login_callback_user && login_callback_user != 'mynull'){
		if(typeof login_callback_user == 'string'){
			login_callback_user = eval(login_callback_user);
		}
		if(typeof login_callback_user == 'function'){
			login_callback_user.apply(login_callback_user,login_callback_user_args);
		}
	}

	// 更新登录状态
	update_login_status();
}


function update_login_status(){
	var username = "";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf('u=') == 0 || c.indexOf('k=') == 0){
			username = c.substring(2,c.length);
			if(username == '__LOGOUT__'){
				username = '';
			}
			break;
		}
	}

	if(typeof udomain == 'undefined' || udomain == '') udomain = 'u.youku.com';
	if(typeof isMiniHeader == 'undefined') isMiniHeader = false;
	var welcome = '<span class="item">[<a onclick="login(callback)">登录</a>]</span> <span class="item">[<a href="httpdisabled://www.youku.com/user_signup/" charset="0-620-0-2" target="_blank">注册</a>]</span>';
	if(username != "" && username != null){
		var uname = decodeURIComponent(username).substr(0, 15);
		if(isMiniHeader && uname.length > 3) uname = uname.substr(0, 3)+'...';
	    welcome = '<span class="item">hi, <span class="uname"><a title="'+decodeURIComponent(username).substr(0, 15)+'" href="httpdisabled://'+udomain+'/'+username+'">'+uname+'</a></span></span> | <span class="item"><a charset="0-620-1" href="httpdisabled://'+udomain+'/my/" target="_blank">优盘</a></span> <span class="item">[<a onclick="logout()">登出</a>]</span> ';
	}
	$("welcome").innerHTML = welcome;
}

window.nova_init_hook_main_login_status = update_login_status;
//{{{subscribe function

var subscribe_obj=null;
function subscribe_callback(result){
	if(!subscribe_obj){return;}
	var obj = (subscribe_obj.subtype == '0') ? '会员' : (subscribe_obj.subtype == '1' ? '标签' : '专辑');
	switch (result){
		case 'ok2'	 : FeedPublishTip('订阅' + obj);
        case 'ok'    : alert('订阅成功！'); return;
	    case 'error' :
	        alert('数据库操作异常！');return;
	    case -1 :
	        alert('参数校验失败！');return;
	    case 1 :
	        alert('您订阅的'+obj+'不存在！');return;
	    case 2 :
	        var msg = subscribe_obj.subtype == '0' ? '不能订阅自己！' : '不能订阅自己的专辑！';
	        alert(msg);return;
	    case 3 :
	        alert('该'+obj+'已经订阅！',null,false,true);return;
	    case 4 :
	        alert('标签含有禁忌词不能被订阅！');return;
	    default :
	        alert('未知的错误类型！');
	}
}
function subscribe(subtype,target){
    if(!islogin()){
        login(subscribe.bind(this, subtype, target));return;
    }
	subscribe_obj = {'subtype':subtype,'target':encodeURIComponent(target)};
	if(empty(udomain)) udomain = 'u.youku.com';
	var url = 'http://'+udomain+'/QMy/~ajax/addSubscribe';
    nova_call(url, subscribe_obj , "subscribe_callback", undefined,1); 
}
//}}}
/**
 * 订阅会员
 */
var subscribeUser = function(userName){
		subscribe(0,userName);
}

var popChannelListTimer = null;
/* pop miniHeader channelList */
function mhPopChannelList(listId, event, clearTimerOnly) {
	try{window.clearTimeout(popChannelListTimer);}catch(e){};

	if(Position.within($(listId), Event.pointerX(event), Event.pointerY(event))) return;
	if(typeof clearTimerOnly == undefined || !clearTimerOnly)
		popChannelListTimer = window.setTimeout('_mhPopChannelList("'+listId+'")', 700);
}
function _mhPopChannelList(listId) {
	var elList = $(listId);
	if(elList && elList.style.display != 'block')
		elList.style.display = 'block';
	else
		elList.style.display = 'none';
}
//{{{IKU-194
var ikuagent;
function getIkuAgent(){
	if (!ikuagent && navigator.userAgent.indexOf('MSIE') != -1){
		if (window.ActiveXObject){
			try{
				ikuagent = new ActiveXObject("iKuAgent.KuAgent2");
			}catch(ex){}
		}
	}
	return ikuagent;
}
function getP2PState(){
		if((iku = getIkuAgent())!=undefined){
			return iku.GetP2PPort();
		}return "";
}
function getIkuId(){
		if((iku = getIkuAgent())!=undefined){
			return ikuagent.Youku_Hao;
		}return "";
}
getP2PState();
//}}}
