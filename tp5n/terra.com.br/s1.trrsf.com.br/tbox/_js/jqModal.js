/*
* jqModal - Minimalist Modaling with jQuery
*   (http://dev.iceburg.net/jquery/jqModal/)
*
* Copyright (c) 2007,2008 Brice Burgess <bhb@iceburg.net>
* Dual licensed under the MIT and GPL licenses:
*   http://voidsource.org/licenses/mit-license.php
*   http://www.gnu.org/licenses/gpl.html
* 
* $Version: 07/06/2008 +r13
*/
(function($) {
	$.fn.jqm=function(o){
		var p={
			overlay: 50,
			overlayClass: 'jqmOverlay',
			closeClass: 'jqmClose',
			trigger: '.jqModal',
			ajax: F,
			ajaxText: '',
			target: F,
			modal: F,
			toTop: F,
			onShow: F,
			onHide: F,
			onLoad: F
		};
		return this.each(function(){
			if(this._jqm)return H[this._jqm].c=$.extend({},H[this._jqm].c,o);s++;this._jqm=s;
			H[s]={c:$.extend(p,$.jqm.params,o),a:F,w:$(this).addClass('jqmID'+s),s:s};
			if(p.trigger)$(this).jqmAddTrigger(p.trigger);
		});
	};

	$.fn.jqmAddClose=function(e){return hs(this,e,'jqmHide');};
	$.fn.jqmAddTrigger=function(e){return hs(this,e,'jqmShow');};
	$.fn.jqmShow=function(t){return this.each(function(){$.void(this._jqm,t);});};
	$.fn.jqmHide=function(t){return this.each(function(){$.jqm.close(this._jqm,t)});};

	$.jqm = {
		hash:{},
	void:function(s,t){
			var h=H[s];
			if(!h)return; // smart lab
			var c=h.c,cc='.'+c.closeClass,o=$('<div></div>').css({opacity:c.overlay/100});if(h.a)return F;h.t=t;h.a=true;
			if(c.modal) {if(!A[0])L('bind');A.push(s);}
			else if(c.overlay > 0)h.w.jqmAddClose(o);
			else o=F;

			h.o = (o) ? o.addClass(c.overlayClass).appendTo('#trr-ctn-general') : F;
			if(ie6){$('html,body').css({height:'100%',width:'100%'});if(o){o=o.css({position:'absolute'})[0];for(var y in {Top:1,Left:1})o.style.setExpression(y.toLowerCase(),"(_=(document.documentElement.scroll"+y+" || document.body.scroll"+y+"))+'px'");}}

			if(c.ajax) {var r=c.target||h.w,u=c.ajax,r=(typeof r == 'string')?$(r,h.w):$(r),u=(u.substr(0,1) == '@')?$(t).attr(u.substring(1)):u;
			r.html(c.ajaxText).loaddisabled(u,function(){if(c.onLoad)c.onLoad.call(this,h);if(cc)h.w.jqmAddClose($(cc,h.w));e(h);});}
			else if(cc)h.w.jqmAddClose($(cc,h.w));

			if(c.toTop&&h.o)h.w.before('<span id="jqmP'+h.w[0]._jqm+'"></span>').insertAfter(h.o);	
			(c.onShow)?c.onShow(h):h.w.show();e(h);return F;
		},
		close:function(s){
			
			var h=H[s];if(!h.a)return F;h.a=F;
			if(A[0]){A.pop();if(!A[0])L('unbind');}
			if(h.c.toTop&&h.o)$('#jqmP'+h.w[0]._jqm).after(h.w).remove();
			if(h.c.onHide)h.c.onHide(h);else{h.w.hide();if(h.o)h.o.remove();} return F;
		},
		params:{}
	};
	var s=0,H=$.jqm.hash,A=[],ie6=$.browser.msie&&($.browser.version == "6.0"),F=false,
	i=$('<iframe src="javascript:false;void(\'\');" class="jqm"></iframe>').css({opacity:0}),
	e=function(h){if(ie6)if(h.o)h.o.html('<p style="width:100%;height:100%"/>').prepend(i);else if(!$('iframe.jqm',h.w)[0])h.w.prepend(i); f(h);},
	f=function(h){try{$(':input:visible',h.w)[0].focus();}catch(_){}},
	L=function(t){$()[t]("keypress",m)[t]("keydown",m)[t]("mousedown",m);},
	m=function(e){var h=H[A[A.length-1]],r=(!$(e.target).parents('.jqmID'+h.s)[0]);if(r)f(h);return !r;},
	hs=function(w,t,c){return w.each(function(){var s=this._jqm;$(t).each(function() {
	if(!this[c]){this[c]=[];$(this).click(function(){ for(var i in {jqmShow:1,jqmHide:1})for(var s in this[i])if(H[this[i][s]])H[this[i][s]].w[i](this);return F;});}this[c].push(s);});});};
})(jQuery);