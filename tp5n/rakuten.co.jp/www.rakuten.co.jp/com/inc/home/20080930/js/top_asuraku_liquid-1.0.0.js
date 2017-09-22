(function(){

if(typeof jQuery == 'undefined'){
	return;
}
jQuery.noConflict();
var $ = jQuery;

$(document).ready(function(){
	$.ajax({
		url : '/com/inc/cgi/get_time.cgi',
		type : 'get',
		dataType: 'text',
		error : function(){
			return;
		},
		success : function(data){
			setAsurakuDate(data);
		}
	});

	function setAsurakuDate(data){
		var yearNum = new Number(data.slice(0,4));
		var monthNum = new Number(data.slice(5,7));
		var dataNum = new Number(data.slice(8,10));
		var dayNum = new Number(data.slice(11,12));
		var hourNum = new Number(data.slice(13,15));
		var dayAry = new Array('��','��','��','��','��','��','��');
		
		var nextTime = 86400000;	// 1����86400000�ߥ���)
		var nextText = '����ޤ�';
		var saitanStr = '';
		if(hourNum > 11){
			nextTime = 172800000;	// 2����172800000�ߥ���)	
			nextText = '������';
			saitanStr = '��û';
		}	
		
		var nowDate = new Date();
		nowDate.setFullYear(yearNum, monthNum-1, dataNum);
		nowDate.setTime(nowDate.getTime() + nextTime);
		var nextMonth = nowDate.getMonth() + 1;
		var nextDate  = nowDate.getDate();
		var nextDay = dayAry[nowDate.getDay()];
		
		var monthImgPass = 'http://image.www.rakuten.co.jp/com/img/home/beta/201008_newtop/asuraku/n'+numToStr(nextMonth)+'.gif';
		var dayImgPass = 'http://image.www.rakuten.co.jp/com/img/home/beta/201008_newtop/asuraku/n'+numToStr(nextDate)+'.gif';
		
		
		//�������
		var asurakuDynamicArea = $('#asurakuDynamicArea');
		asurakuDynamicArea.empty();
		asurakuDynamicArea.append('<p class="ad"><span class="red">'+nextText+'</span>�Τ���ʸ��<br><span class="bold">'+saitanStr+'<a href="httpdisabled://rd.rakuten.co.jp/s/?R2=http%3A%2F%2Fevent.rakuten.co.jp%2Fasuraku%2F%3Fl-id%3Dasuraku_top_02_02&D2=3.260.48889.760895.20226975&C3=a4dc736d0a6adce340e69aa220930e165480890c"><img src="'+monthImgPass+'" width="38" height="32" alt=""></a>��<a href="httpdisabled://rd.rakuten.co.jp/s/?R2=http%3A%2F%2Fevent.rakuten.co.jp%2Fasuraku%2F%3Fl-id%3Dasuraku_top_02_02&D2=3.260.48889.760895.20226977&C3=a4dc736d0a6adce340e69aa220930e165480890c"><img src="'+dayImgPass+'" width="38" height="32" alt=""></a>����'+nextDay+'��</span>�ˤ��Ϥ�</p>')
		
		//�������
		var asurakuDynamicText = $('#asurakuDynamicText');
		asurakuDynamicText.empty();
		asurakuDynamicText.append(nextMonth+'��'+nextDate+'�����Ϥ��ʤ��ä���<span class="bold">�ݥ����5��</span>')

		//����������ʲ��ʤ飰��­��
		function numToStr(num){
			var str = new String();
			if(num < 10){
				str = '0'+num;
				return str;
			} else {
				str = num;
				return str;
			}
		}
	}
})
})();
