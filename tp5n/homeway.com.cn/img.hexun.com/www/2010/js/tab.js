var HX = $ = function(element) {
	var el;
	if(typeof element == 'string') el = document.getElementById(element);
	else el = element;
	if(!el) return null;
	else return el;
	};
var $E = {
	//�¼���
	bind:function(ele,ename,fn) {
		if(document.addEventListener) return $(ele).addEventListener(ename,fn,false);
		else if(document.attachEvent) return $(ele).attachEvent("on"+ename,fn);
		else return null;		
		},	
    //�Ƿ�ΪCSS
	isCss:function(ele,c) {
	var classes = $(ele).className;
    if(!classes) return false;
    if(classes == c) return true;
		},
	//CSS���
	addCss:function(ele,c) {
	if($E.isCss(ele,c)) return ;
    if($(ele).className) c = " " + c;
    ele.className +=c;	
		},
	//CSSɾ��
	removeCss:function(ele,c) {
	$(ele).className = $(ele).className.replace(new RegExp("\\b"+c+"\\b\\s*","g"),"");
		}
};
/*��ǩ�л�
 *����˵��:orpF�л�������ul���л�����li���źţ���������
 -----------------------------------*/
function switchTab(oprF,num,parameter) {
	var parent = $(oprF);
	var p = parameter || {};
	var conObj = p.tabname?p.tabname:(oprF+'_con');
	if(String(parent.tagName).toLowerCase()=='ul') {
		var lilist = parent.getElementsByTagName('li');
		var remark = false;
		for(var i=0;i<lilist.length;i++) {
			if(i+1 == parseInt(num)) {
				lilist[i].className = 'checked';
				doshow(i+1);
				remark = true;
				}
			else {
				lilist[i].className = (p.next && i+1!=3)?'unclicked':'';
				dohide(i+1);
				remark = false;
				}
		 if(p.whendo) hpageTab(lilist[i],remark);
			}
		}
     /*��ʾ*/
    function doshow(n) {
    var obj = conObj+n;
	var moreObj = p.more?(p.more+n):'';
	if($(obj)) {
	  $E.removeCss($(obj),'hide');
	  $E.addCss($(obj),'show');
	  }
	if(p.more && $(moreObj)) {
	  $E.removeCss($(moreObj),'hide');
	  $E.addCss($(moreObj),'show');		
	  }
	}
    /*����*/
    function dohide(n) {
	var obj = conObj+n;
	var moreObj = p.more?(p.more+n):'';
	  	if($(obj)) {
	  $E.removeCss($(obj),'show');
	  $E.addCss($(obj),'hide');
		}
	if(p.more && $(moreObj)) {
	  $E.removeCss($(moreObj),'show');
	  $E.addCss($(moreObj),'hide');		
	  }
	}
	
	//����tab�л�����������ҳ
	function hpageTab(lipar,togger) {
		var cname,name_arr;
		var spanlist = lipar.getElementsByTagName('span');
		for(var i=0;i<spanlist.length;i++) {
			if(spanlist[i].className) {
			cname = spanlist[i].className;
			name_arr =(cname.indexOf('_')!=-1)?cname.split('_'):'';
			if(togger) {$E.removeCss(spanlist[i],'un_'+name_arr[1]);$E.addCss(spanlist[i],'c_'+name_arr[1]);}
			else {$E.removeCss(spanlist[i],'c_'+name_arr[1]);$E.addCss(spanlist[i],'un_'+name_arr[1]);}
			}
		}
	}
	
	}


function scrollWord(scrollObj,conObj,copyObj,upObj,downObj,h,gap,vate) {
	scrollObj = $(scrollObj).parentNode;
	conObj = $(conObj);
	copyObj = $(copyObj);
	upObj = $(upObj);
	downObj = $(downObj);
	var lilist = conObj.getElementsByTagName('li');
	scrollObj.scrollTop = 0;
	copyObj.innerHTML = conObj.innerHTML;
	var remark = 0,timer,ani_timer,l = lilist.length;
	timer = setTimeout(animation,gap);
	function animation() {
		clearTimeout(timer);
		ani_timer = setInterval(showWord,vate);
		}
	//�ر�
	scrollObj.onmouseover = function(){
		clearInterval(ani_timer);
		clearTimeout(timer);
		}	
	//����
	scrollObj.onmouseout = function(){
		ani_timer = setInterval(showWord,vate);		
		}
	//�Ϲ���
	function showWord() {
		var top = parseInt(scrollObj.scrollTop);
		if(top<(remark+1)*h) scrollObj.scrollTop = top + 1;
		else {
			clearInterval(ani_timer);
			if(remark<l-1){
				scrollObj.scrollTop = (remark+1)*h;
			    remark+=1;
			    }
		    else {
				remark = 0;
				scrollObj.scrollTop = remark*h;				
				}
			timer = setTimeout(animation,gap);
			}
		}
	//�¹���
	function down() {
		var top = parseInt(scrollObj.scrollTop); 
		if(top>(remark-1)*h) scrollObj.scrollTop = top - 1;
		else {
			clearInterval(ani_timer);
			if(remark>0){
				remark-=1;
				scrollObj.scrollTop = remark*h;
			    }
		    else {
				remark = l-1;
				scrollObj.scrollTop = remark*h;				
				}
			timer = setTimeout(animation,gap);
			}
		}
	//���²���
	$E.bind(upObj,'click',upImg);
	$E.bind(upObj,'mouseover',function(){upObj.className = 'upOver';});
	$E.bind(upObj,'mouseout',function(){upObj.className = 'upWord';});
	function upImg() {
		clearTimeout(timer);
		clearInterval(ani_timer);
		ani_timer = setInterval(showWord,vate);
		}
	$E.bind(downObj,'click',downImg);
	$E.bind(downObj,'mouseover',function(){downObj.className = 'downOver';});
	$E.bind(downObj,'mouseout',function(){downObj.className = 'downWord';});
	function downImg() {
		clearTimeout(timer);
		clearInterval(ani_timer);
		if(remark == 0 ) {
			remark = l;
			scrollObj.scrollTop = remark*h;
			}
	    ani_timer = setInterval(down,vate);
		}
	}