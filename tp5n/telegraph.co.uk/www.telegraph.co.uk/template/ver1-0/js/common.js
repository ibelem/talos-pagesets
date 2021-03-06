/***************************************************************************
*
* Copyright (C) Telegraph Media Group Ltd.
* All Rights Reserved. No use, copying or distribution of this work may be
* made. This notice must be included on all copies, modifications and
* derivatives of this work.
****************************************************************************
* Author: L Dyson  Date: 12/05/2008
*
* Description:
* Common javascript functions
*
****************************************************************************
* $Id: common.js,v 1.91 2009/08/18 11:03:35 baptisteo Exp $
*
* Updates:
*
* 18/02/2011  P O'Shaughnessy TCUK-974 WebTrends tracking changes
***************************************************************************/

document.domain="telegraph.co.uk";

/* JQuery plugin to retrieve the outer HTML of any given element */
jQuery.fn.outerHTML = function() {
	return $('<div>').append( this.eq(0).clone() ).html();
};

/* New JQuery plugin to pull back comments from any given HTML element */
/* Author: L Dyson Date:13/07/2008 */
jQuery.fn.comments = function(i) {
	if (this.html() != null && this.html() != '') {
		var searchString = this.html().split("<!--");
		var commentArray = new Array();
	
		for (j in searchString) {
			if(typeof(searchString[j]) == 'string'){ // ANDREW ADDED TYPEOF CHECK HERE
				if(searchString[j].indexOf("-->") != -1) {
					commentArray.push(searchString[j].split("-->")[0].replace(/^\s+/,'').replace(/\s+$/,''));
				}
			}
		}
		if (isNaN(Number(i)) || i == null) {
			return commentArray;
		} else {
			return commentArray[i];
		}
	} else {
		return null;
	}
};

/* static reference locations for JavaScript and images */
var jsSrc = $("script[src*='common.js']").attr("src").substring(0,$("script[src*='common.js']").attr("src").lastIndexOf("/")+1);
var imgSrc = jsSrc.replace('js','i');
var theme = $("meta[name='colourTheme']").attr("content");

if (theme != null && theme != 'normal') {
	imgSrcArray=imgSrc.split("/i")
	imgSrc=imgSrcArray[0]+"/themes/"+theme+"/i"+imgSrcArray[1]
}
	

/* Variables for the dating widget */
var valStrings = new Array; 
valStrings["invalidPostCodeDFormat"] = "The post code you have entered appears to have an invalid format."; 
valStrings["invalidPostCodeDistrict"] = " does not appear in our list of valid post code districts.";

/* AddThis configuration */
var addthis_config = {
     username: 'telegraphmedia',
     services_compact: 'delicious, digg, facebook, fark, google, linkedin, live, googlebuzz, reddit, stumbleupon, twitter, buzz',
     ui_click: true,
     ui_offset_top: -20,
     ui_offset_left: -235,
     data_track_clickback: true /* Enable Clickback Analytics */
}
var addthis_share = {
	title: $("h1").text(),
	url: $("#diggPermaUrl").text(),
    templates: {
                   twitter: 'RT @'+$("#twtrUsr").text()+' '+$("h1").text()+' {{url}}'
			   }
}


/* ON PAGE LOAD... */
$(function() {
	/***********************************************************************
	*                          Breaking News Ticker                        *
	***********************************************************************/
	if ($("#tmglBreakingNews").length > 0) {
		$("#tmglBreakingNews > ul > li:not(:first)").hide();
		$("#tmglBreakingNews > ul > li:first").addClass("shown");
	
		setInterval(rotateBreakingNews,5000);
	}

	/***********************************************************************
	*                      Share this article function                     *
	***********************************************************************/
	// show the share code after the page has loaddisableded
	$(".storyFunc").removeClass("hide");
	$(".shareFunctions").removeClass("loaddisableding");


	/***********************************************************************
	*                      Video play button effect                        *
	***********************************************************************/
	
	  $('.playButton a').hover(function () {
		    $(this).find('.playBtt').stop().fadeTo('normal', 0.7);
		  }, function () {
		    $(this).find('.playBtt').stop().fadeTo('normal', 0);
		  });
		
		  $('.playButton a').hover(function () {
		    $(this).find('.playBttJH').stop().fadeTo('normal', 0.7);
		  }, function () {
		    $(this).find('.playBttJH').stop().fadeTo('normal', 0);
		  });
	
	
	/***********************************************************************
	*              Picture gallery arrow key navigation                    *
	***********************************************************************/

	if(document.getElementById('imgPrevUrl') != null) {
		$(document).keydown(function(event){
		    var key = event.keyCode || event.which;
			if (key === 37) {
					var previousUrl = document.getElementById('imgPrevUrl');
					location.href = previousUrl;
					return false;		
				}
			if (key === 39) {
					var nextUrl = document.getElementById('imgNextUrl');
					location.href = nextUrl;
					return false;
				}	
		  });	
		
			
		$('#imgGallImg a')
			.mouseover(function(){
				$('#nextGallImg a').stop().fadeTo(500, 0.5)
				$('#prevGallImg a').stop().fadeTo(500, 0.5)
			})
			.mouseout(function(){
				$('#nextGallImg a').stop().fadeTo(500, 0)
				$('#prevGallImg a').stop().fadeTo(500, 0)
			})
			
						
		$('#nextGallImg a')
			.mouseover(function(){
				$(this).stop().fadeTo(500, 1)
			})
			.mouseout(function(){
				$(this).stop().fadeTo(500, 0)
			})

		$('#prevGallImg a')
			.mouseover(function(){
				$(this).stop().fadeTo(500, 1)
			})
			.mouseout(function(){
				$(this).stop().fadeTo(500, 0)
			})	
		}	

	/***********************************************************************
	*              Super Summary tab object navigation                     *
	***********************************************************************/	
	$(".topRightTab").removeClass("hide");
	$(".middleFourTab").removeClass("hide");

	$(function() {
        $('#superSummaryTabElement').tabs({ fx: { opacity: 'toggle' } });
        $('#rightTabElement').tabs({ fx: { opacity: 'toggle' } });
		return false;
    });
	
	/***********************************************************************
	*                          Armagedon grid                              *
	***********************************************************************/	
	$("#armageddon").removeClass("hide");
	$(".twoThirds").removeClass("toolLoading");
	
	
	//.tabs('rotate', 2000) in case we want this to rotate
	/*$(function() {
         $('#armageddon').tabs({ fx: { opacity: 'toggle' } });
     });

		$('#armageddon .imgGallImg a')
			.css( {backgroundPosition: "-140px 0"} )
			.mouseover(function(){
				$('.next a').stop().fadeTo(500, 0.5)
				$('.prev a').stop().fadeTo(500, 0.5)
				$('.imageExtras').stop().fadeTo(500, 0.7)
				
			})
			.mouseout(function(){
				$('.next a').stop().fadeTo(500, 0.5)
				$('.prev a').stop().fadeTo(500, 0.5)
				$('.imageExtras').stop().fadeTo(500, 0)
			})
			
									
		$('#armageddon .next a')
			.css( {backgroundPosition: "-140px 0"} )
			.mouseover(function(){
				$(this).stop().fadeTo(500, 1)
				$('.imageExtras').stop().fadeTo(500, 0.7)
			})
			.mouseout(function(){
				$(this).stop().fadeTo(500, 0.5)
				$('.imageExtras').stop().fadeTo(500, 0)
			})

		$('#armageddon .prev a')
			.css( {backgroundPosition: "-40px 0px"} )
			.mouseover(function(){
				$(this).stop().fadeTo(500, 1)
				$('.imageExtras').stop().fadeTo(500, 0.7)
			})
			.mouseout(function(){
				$(this).stop().fadeTo(500, 0.5)
				$('.imageExtras').stop().fadeTo(500, 0)
			})	*/	
				
		$(function() {
		         $('#armageddon').tabs({ fx: { opacity: 'toggle' } });
		     });

		$('.imgGallImg a')
			.mouseover(function(){
				$('.next a').stop().fadeTo(500, 1.0)
				$('.prev a').stop().fadeTo(500, 1.0)
				$('.imageExtras').stop().fadeTo(500, 0.7)
				
			})
			.mouseout(function(){
				$('.next a').stop().fadeTo(500, 0.7)
				$('.prev a').stop().fadeTo(500, 0.7)
				$('.imageExtras').stop().fadeTo(500, 0)
			})
									
		$('.next a')
			.mouseover(function(){
				$(this).stop().fadeTo(500, 1)
				$('.imageExtras').stop().fadeTo(500, 0.7)
			})
			.mouseout(function(){
				$(this).stop().fadeTo(500, 0.7)
				$('.imageExtras').stop().fadeTo(500, 0)
			})

		$('.prev a')
			.mouseover(function(){
				$(this).stop().fadeTo(500, 1)
				$('.imageExtras').stop().fadeTo(500, 0.7)
			})
			.mouseout(function(){
				$(this).stop().fadeTo(500, 0.7)
				$('.imageExtras').stop().fadeTo(500, 0)
			})	
			
		$(".imgLoadingText").addClass("hide");
		
		
	/***********************************************************************
	*                  Armageddon 2 grid  (World Cup)                      *
	***********************************************************************/	
	$("#armageddon2").removeClass("hide");
	$(".twoThirds").removeClass("toolLoading2");
	
	var rotateSpeed = $('#tabRotationSpeed').text();
	
	if (rotateSpeed != 0) {
		$('#armageddon2').tabs({ event: 'click', fx: { opacity: 'toggle' } }).tabs('rotate', rotateSpeed, true);
		$('#armageddon2 li a')
			.click(function(){
				myId = $(this).attr('href').substring(1);
				$('#armageddon2').tabs('rotate', 0, false);
				
				$('div#' + myId + ' .imageExtras').stop().fadeTo(500, 0.8);
			});
	}
	
	else {
		$('#armageddon2').tabs({ event: 'click', fx: { opacity: 'toggle' } });
		$('#armageddon2 li a')
		.click(function(){
			myId = $(this).attr('href').substring(1);
			
			$('div#' + myId + ' .imageExtras').stop().fadeTo(500, 0.8);
		});
	}

   	/***********************************************************************
	*                    Portal Galleries Slideshow                        *
	***********************************************************************/
   	$('.picturesAndVideo .slideshow .imageLinks')
		.mouseover(function() {
			$('h3', this).stop().fadeTo(500,1);
		})
		.mouseout(function() {
			$('h3', this).stop().fadeTo(500,0.8);
		});
     	
	/***********************************************************************
	*                  Live Scores Box   (World Cup)                       *
	* http://www.switchonthecode.com/tutorials/jquery-creating-a-slideshow *
	***********************************************************************/
	var totalSlides;
	var currentSlide;
	//var currentSlide = 2;
	var contentSlides = "";
	var autoFootballScroll = true;
	var goBack = false;
	var st;

	$(function(){
		$("#livescore-prev").click(showPreviousSlide);
		$("#livescore-next").click(showNextSlide);
		$("#livescore-pause").click(pauseFootballScroll);
		
		initLiveScores();
	});
	
	function initLiveScores() {
		
		if (st != null) { clearTimeout(st); }
		totalSlides = $("#livescoreholder .livescore").length;
		contentSlides = "";
		var totalWidth = 0;
		contentSlides = $(".livescore");
		contentSlides.each(function(i) {
			  totalWidth += this.clientWidth;
		});
		$("#livescoreholder").width(totalWidth);
		$("#livescorescroller").attr({scrollLeft: 0});
		currentSlide = parseInt($('#currentMatch').text()) + 1;
		updateButtons();
		if (currentSlide != 1) {
			updateContentHolder();
		}
		
		if ($("#livescoreholder .livescore").length > 1) {
			$("#livescorecontainer .arrows").show();
			autoFootballScroll = true;
			goBack = false;
			$("#livescore-pause").css('background', 'url(/template/ver1-0/i/playPauseBlue.png) no-repeat 50% 50%');
			scrollScores();
		}
		else {
			$("#livescorecontainer .arrows").hide();
			autoFootballScroll = false;
		}
	}
	
	// I'm sure this is far more complex than it needs to be...
	function scrollScores() {
		if (currentSlide == 1) {
			goBack = false;
			st = setTimeout(function() { showNextSlide2() }, 5000);
		}
		else if (goBack) {
			st = setTimeout(function() { showPreviousSlide2() }, 5000);
		}
		else if (currentSlide < totalSlides) {
			st = setTimeout(function() { showNextSlide2() }, 5000);
			goBack = false;
		} 
		else if (currentSlide == totalSlides) {
			st = setTimeout(function() { showPreviousSlide2() }, 5000);
			goBack = true;
		}
	}
	
	function pauseFootballScroll() {
		if (autoFootballScroll) {
			autoFootballScroll = false;
			$("#livescore-pause").css('background', 'url(/template/ver1-0/i/playPauseGrey.png) no-repeat 50% 50%');
		}
		else if (!autoFootballScroll) {
			autoFootballScroll = true;
			$("#livescore-pause").css('background', 'url(/template/ver1-0/i/playPauseBlue.png) no-repeat 50% 50%');
			scrollScores();
		}
	}
	
	function showPreviousSlide2() {
		if (autoFootballScroll) {
			showPreviousSlide();
			scrollScores();
		}
	}
	
	function showNextSlide2() {
		if (autoFootballScroll) {
			showNextSlide();
			scrollScores();
		}
	}

	function showPreviousSlide() {
		currentSlide--;
		updateContentHolder();
		updateButtons();
	}
	
	function showNextSlide() {
		currentSlide++;
		updateContentHolder();
		updateButtons();
	}
	
	function updateContentHolder() {
		var scrollAmount = 0;
		contentSlides.each(function(i){
		    if(currentSlide - 1 > i) {
		    	scrollAmount += this.clientWidth;
		    }
	  });
		$("#livescorescroller").animate({scrollLeft: scrollAmount}, 1000);
	}
	
	function updateButtons() {
		if(currentSlide < totalSlides) {
			$("#livescore-next").css('background', 'url(/template/ver1-0/i/arrowForwardBlue.png) no-repeat 50% 50%');
		} else {
			$("#livescore-next").css('background', 'url(/template/ver1-0/i/arrowForwardGrey.png) no-repeat 50% 50%');
		}
		if(currentSlide > 1) {
			$("#livescore-prev").css('background', 'url(/template/ver1-0/i/arrowBackBlue.png) no-repeat 50% 50%');
		} else {
			$("#livescore-prev").css('background', 'url(/template/ver1-0/i/arrowBackGrey.png) no-repeat 50% 50%');
		}
	}
	
	$("#liveScoreBoxSelector").show();
	$("#livescorecontainer .arrows").show();
	
	/***********************************************************************
	*             Football                                                 *
	***********************************************************************/
	
	$("#changeseason").show();
	$("#changecompetition").show();
	
	$(function(){
		initChangeCompetition();
	});
	
	$("#changeseason select").change(function() { 
		$("#changeseasonform").submit();
	});
	
	function initChangeCompetition() { 
		$("#changecompetition select").change(function() { 
			$('#leagueTableContainer').loaddisabled($("#changecompetitionform").attr('action'), {'competition': $("#changecompetitionform select").find(':selected').attr('value')}, function() {
				initChangeCompetition();
				$("#changecompetition").show();
			});
		});
		$("#livescorecompetitionform select").change(function() { 
			$('#livescorescroller').loaddisabled($("#livescorecompetitionform").attr('action'), {'competition': $("#livescorecompetitionform select").find(':selected').attr('value')}, function() {
				initLiveScores();
			});
		});
	}
	
	$.tablesorter.addWidget({ 
	    id: "stripe", 
	    format: function(table) { 
			$(".footballTable table tbody tr:odd").addClass("odd").removeClass("even");
			$(".footballTable table tbody tr:even").addClass("even").removeClass("odd");
	    } 
	}); 
	
	$.tablesorter.defaults.sortInitialOrder = 'desc';

	$("#footballTablesTable").tablesorter({ headers: { 0: { sorter: false }, 1: { sorter: false } } , widgets: ['stripe'] }); 
	
	// Stripe fixtures/livescores divs
	$(function() {
		$(".footballFixtures div.fixtureNoBorder:odd").addClass("odd");
	});
	
	/***********************************************************************
	 *                         Search Box                                  *
	 ***********************************************************************/
	
	$("#searchBar #tg_search .searchBox").focus(function() {
		$("#searchBar #tg_search .searchBox").removeClass("google");
	});
	$("#searchBar #tg_search .searchBox").blur(function() {
		if( $('#searchBar #tg_search .searchBox').val() == '' ) {
			$("#searchBar #tg_search .searchBox").addClass("google");
		}
	});
	
	/***********************************************************************
	*                          Bars Chart                                  *
	***********************************************************************/	
	
	$("#sopGraph").removeClass("graphLoading");
	$("#dataGraph").removeClass("graphLoading");
			
			
	/***********************************************************************
	*                          Commercial Carousel                         *
	***********************************************************************/
	if($("#comCarousel").length > 0) {
		var comCarousel = $("#comCarousel").get();
		
		for (i in comCarousel) {
			ccObj[i] = new comCarouselObj();
			ccObj[i].carousel = comCarousel[i];
			
			$(ccObj[i].carousel).find("#comCarTools").removeClass("hide");
			
			$(ccObj[i].carousel).find(".offer[class*='hide']").removeClass("hide").hide();
			$(ccObj[i].carousel).find(".offer[class*='show']").removeClass("show").show();
			
			var partners = $(ccObj[i].carousel).find(".partner[class*='hide'").removeClass("hide").hide();
			var partners = $(ccObj[i].carousel).find(".partner[class*='show'").removeClass("show").show();
			
			$(ccObj[i].carousel).find("#carouselBtns > .btn").bind("click",{count:i},function(e){				
				comCarSelectPartner(e.data.count,$(ccObj[e.data.count].carousel).find("#carouselBtns > .btn").index(this));
				if (ccObj[e.data.count].timeoutId!=null){
					clearInterval(ccObj[e.data.count].timeoutId);
					ccObj[e.data.count].timeoutId=null;
				}
			});
			ccObj[i].timeoutId = setInterval("comCarNextPartner("+i+")",5000);
		}
	}



	/***********************************************************************
	*					 Commercial unit randomiser - First*Clarity   *
	***********************************************************************/
	
	if ($('#tmgPortalRand').length > 0){
		
		var toRand = $('#tmgPortalRand .jsRand');
		var numToDisplay = 4;
		var total = toRand.length;
		if (total < numToDisplay)
			numToDisplay = total;
		var order = new Array();
		for (i = 0; i < total; i++){
			order[i] = i;
		}
		order.sort( randOrd );
		var lastAffected = -1;
		for (i = 0; i < numToDisplay; i++){
			thisAffected = order.pop();
			$(toRand).eq(thisAffected).css('display', 'block');
			if (thisAffected > lastAffected)
			{
				lastAffected = thisAffected;
			}
		}
		$(toRand).eq(lastAffected).addClass('last');
	}
	

	/***********************************************************************
	*					 most Popular      (HAREESH)   *
	***********************************************************************/
	 $TabActive = $("#mostpop > .tabs > ul > li:first"); 

	    $('#mostpop > .tabs > ul > li').click(function() { 
	     
		  if ($(this) != $TabActive) {  
			 $TabActive.removeClass('current');  
			  $(this).addClass('current');  
			 $TabActive = $(this);  
			   
			contentIdChildDiv = "#div-" + $TabActive.attr("id");  
			$("div.view-content").hide();  
			 $(contentIdChildDiv).show();  
			 }  
	   });
	   
	    //$(".lists div:not(div:first)").hide();  
		//$("#mostpop > .tabs > ul > li:first").addClass("current");  
		

	/***********************************************************************
	*	 This changes the size of the text in article pages     (OJB)  *
	***********************************************************************/
	
		if($('#changeFont').length > 0){
			$('#changeFont').html("<div class=\"text_f\">Text Size</div><div class=\"plus_b\"><a href=\"#\" class=\"increaseFont\"><img src=\""+imgSrc+"Plus_btn.gif\" id=\"plus_btn\" alt=\"click here to increase the text size\" name=\"plus_btn\"/></a></div><div class=\"minus_b\"><a href=\"#\" class=\"increaseFont\"/><a href=\"#\" class=\"decreaseFont\"><img src=\""+imgSrc+"Minus_btn.gif\" id=\"minus_btn\" alt=\"click here to decrease the text size\" name=\"minus_btn\"/></a></div><div class=\"cl\"></div>");
			$('#changeFont').removeClass('hidden');

		//this function increases the font size
		$(".increaseFont").click(function(){
			var currentFontSize = $('html').css('font-size');
			var currentFontSizeNum = parseFloat(currentFontSize, 10);
			var newFontSize = currentFontSizeNum*1.1;
			if(newFontSize < 45 ){
				$('html').css('font-size', newFontSize);
			}return false;
		});

		// this decreases the font size
		$(".decreaseFont").click(function(){
			var currentFontSize = $('html').css('font-size');
			var currentFontSizeNum = parseFloat(currentFontSize, 10);
			var newFontSize = currentFontSizeNum*0.9;
			if(newFontSize > 9 ){
				$('html').css('font-size', newFontSize);
			}return false;
		  });

		$('img#plus_btn').hover(function(){

			$(this).attr("src",imgSrc+"Plus_btn_Hover.gif");
			}, function(){

			$(this).attr("src",imgSrc+"Plus_btn.gif");
			});

		$('img#minus_btn').hover(function(){

			$(this).attr("src",imgSrc+"Minus_btn_Hover.gif");
			}, function(){

			$(this).attr("src",imgSrc+"Minus_btn.gif");
			});

	}
	
	/***********************************************************************
	*         Function to show RSS Feed functions (on RSS Pages) - LD      *
	***********************************************************************/
	if($(".rssFeed").length > 0){
		$(".rssFeed a").click(function(e){
			var scrollFix = 0;
			if (navigator.appName == "Microsoft Internet Explorer" && parseInt(navigator.appVersion) <= 6) {			
				scrollFix = document.body.parentElement.scrollTop;
			}
			
			$(".feedTools").remove();
			
			var feedUrl = escape($(this).attr("href"));
			var feedBox = "<div class=\"feedTools hide\"><div class=\"title\"><p>Add \""+$(this).text()+"\" RSS Feed</p><img src=\""+imgSrc+"16_close.gif\" width=\"16\" height=\"16\" alt=\"close\" class=\"close\"/><div class=\"cl\"></div></div><ul><li class=\"google\"><a href=\"httpdisabled://fusion.google.com/add?feedurl="+feedUrl+"\">Google Reader</a></li><li class=\"bloglines\"><a href=\"httpdisabled://www.bloglines.com/sub/"+feedUrl+"\">Bloglines</a></li><li class=\"yahoo\"><a href=\"httpdisabled://add.my.yahoo.com/rss?url="+feedUrl+"\">My Yahoo</a></li><li class=\"netvibes\"><a href=\"httpdisabled://www.netvibes.com/subscribe.php?url="+feedUrl+"\">Netvibes</a></li><li class=\"newsgator\"><a href=\"httpdisabled://www.newsgator.com/ngs/subscriber/subext.aspx?url="+feedUrl+"\">Newsgator</a></li><li class=\"pageflakes\"><a href=\"httpdisabled://www.pageflakes.com/subscribe.aspx?url="+feedUrl+"\">Pageflakes</a></li><li class=\"technorati\"><a href=\"httpdisabled://technorati.com/faves?sub=favthis&add="+feedUrl+"\">Technorati</a></li><li class=\"aol\"><a href=\"httpdisabled://favorites.my.aol.com/ffclient/AddFeed?url="+feedUrl+"\">MyAOL</a></li><li class=\"rss\">"+$(this).attr("href")+"</li></ul></div>";
			
			$("body").append(feedBox);			
			
			$(".feedTools").hide().removeClass("hide")
			var ftHeight = $(".feedTools").height();
			var ftWidth = $(".feedTools").width();
			$(".feedTools").css({"position":"absolute","top":((window.Event) ? e.pageY : e.clientY)+scrollFix,"left":((window.Event) ? e.pageX : e.clientX),width:"0px",height:"0px"});
			$(".feedTools").animate({width:ftWidth,height:ftHeight}, 800 );
			
			
			$(".feedTools .close").click(function(){
				$(".feedTools").animate({width:"0px",height:"0px"}, {duration:800,complete:function(){$(".feedTools").remove()}});
			});
			
			return false;
		});
	};	
	
	/***********************************************************************
	*                    Other Sports Dropdown Menu - LD                   *
	***********************************************************************/
	if($("#otherSportsSelector").length > 0){
		$("#otherSportsSelector").removeClass("hide");
		
		// If a user selects a sport, enable the submit button
		$("#otherSports").change(function(){
			var sportSelected = $(this).find(":selected").text();
			if (sportSelected != "" && sportSelected != "Select a Sport") {
				$("#otherSportsSelector > #otherSportNav > input[type='submit']").removeClass("subBtnInactive").addClass("subBtnActive").attr("disabled",false);
			} else {
				$("#otherSportsSelector > #otherSportNav > input[type='submit']").removeClass("subBtnActive").addClass("subBtnInactive").attr("disabled",true);
			}
		});
		
		// If the user wants to navigate to their chosen sport, forward them to it
		$("#otherSportsSelector > #otherSportNav > input[type='submit']").click(function(){
			$("#otherSportsSelector > #otherSportNav > input[type='submit']").removeClass("subBtnActive").addClass("subBtnInactive").attr("disabled",true);
			window.location = $("#otherSports > option[value^='http://']:selected").attr("value");
			return false;
		});
	}
	
	/***********************************************************************
	*                          Dating widget - LD                          *
	***********************************************************************/
	if($("#comDating").length > 0){
		var headID = document.getElementsByTagName("head")[0];         
		var datingScriptOne = document.createElement('script');
		datingScriptOne.type = 'text/javascript';
		datingScriptOne.src = 'http://is014.www.is.121d8.com/js/find_search.js';
		headID.appendChild(datingScriptOne);
		var datingScriptTwo = document.createElement('script');
		datingScriptTwo.type = 'text/javascript';
		datingScriptTwo.src = 'http://is014.www.is.121d8.com/js/goPage.js';
		headID.appendChild(datingScriptTwo);
		var datingScriptThree = document.createElement('script');
		datingScriptThree.type = 'text/javascript';
		datingScriptThree.src = 'http://is014.www.is.121d8.com/js/postCodes_uk.js';
		headID.appendChild(datingScriptThree);
						
		$("#datingTabs").tabs();

		if($("#comDating").comments(5)=='MALE'){
			$("#datingTabs").tabs( 'select' , 0 );
		} else if ($("#comDating").comments(5)=='FEMALE') {
			$("#datingTabs").tabs( 'select' , 1 );
		}
		else {
			$("#datingTabs").tabs( 'select' , 2 );
		}
		
		$("#comDating > #searchd").removeClass("hide");
		
	}
	
	/***********************************************************************
	*    Function to launch SkimLinks if the JS exists in the HTML - LD & OJB    *
	***********************************************************************/
	if($("#skimLinks").length > 0){ 
		/* Variables for Skimlinks */
		window.skimlinks_pub_id = '296X467';
		
		/*var mugic_test = "on";*/
		if ($("meta[name='GSAChannel']").attr("content") == "finance") {
			if ($("meta[name='GSACategory']").attr("content") == "personalfinance") {
				window.skimlinks_pub_id = '296X684';
			} else {
				window.skimlinks_pub_id = '296X683';
			}
		} else	if ($("meta[name='GSAChannel']").attr("content") == "travel") {
			window.skimlinks_pub_id = '296X674';
		} else	if ($("meta[name='GSAChannel']").attr("content") == "fashion") {
			window.skimlinks_pub_id = '296X675';
		} else 	if ($("meta[name='GSAChannel']").attr("content") == "property") {
			window.skimlinks_pub_id = '296X676';
		} else	if ($("meta[name='GSAChannel']").attr("content") == "gardening") {
			window.skimlinks_pub_id = '296X677';
		} else	if ($("meta[name='GSAChannel']").attr("content") == "culture") {
			window.skimlinks_pub_id = '296X678';
		} else 	if ($("meta[name='GSAChannel']").attr("content") == "science_and_technology") {
			window.skimlinks_pub_id = '296X680';
		} else	if ($("meta[name='GSAChannel']").attr("content") == "sport") {
			window.skimlinks_pub_id = '296X679';
		} 		
			
		skimlinks();
	}
	
	/***********************************************************************
	*    Function to rotate commercial puffs  - OJB                        *
	***********************************************************************/
	if($(".rotatingPuffContainer").length > 0){
		for(i in $(".rotatingPuffContainer").get()) {
		$(".rotatingPuffContainer:eq("+i+") > .commercialPuff").removeClass("hidden");
			$(".rotatingPuffContainer:eq("+i+") > .commercialPuff > .sideBars > .spacing > .nav").removeClass("hidden");
			var rotatingPuffId = $(".rotatingPuffContainer:eq("+i+")").attr("id");
			$("#"+rotatingPuffId).cycle({
			    fx:    'fade',
			    speed:  0,
			    timeout: $(".rotatingPuffContainer:eq("+i+")").comments(0),
			    next:  '.n'+rotatingPuffId,
			    prev:  '.p'+rotatingPuffId,
				cleartype: true
			});
			
			$(".n"+rotatingPuffId).click(function(){
				// Scoping issue, reset this value
				rotatingPuffId = $(this).parents(".rotatingPuffContainer").attr("id");
				$("#"+rotatingPuffId).cycle("pause");
				return false;
			});

			$(".p"+rotatingPuffId).click(function(){
				// Scoping issue, reset this value
				rotatingPuffId = $(this).parents(".rotatingPuffContainer").attr("id");
				$("#"+rotatingPuffId).cycle("pause");
				return false;
			});
		}
	}


    /********************************************************************
     * Funciton for Webtrends on Thomas Cook / Configurable Tabs  KB    *
     ********************************************************************/
	$(".configTabs").each(function() {
		$(this).find('.controlledTab:first').show();
		$(this).find('li:first').addClass('ui-tabs-selected');
    });
	
	if ($(".configTabs").length > 0) {
		
		$('.configTabs .loaddisabledingMessage').css({display: 'none'});
	
		$('.configTabs .mainTabs a').click(function(){
			
			$(this).parent().parent().parent().siblings('.controlledTab').hide();
			//$('#configurableTabs .controlledTab').hide();
			$($(this).attr('href')).show();			
			$(this).parent().siblings('.ui-tabs-selected').removeClass('ui-tabs-selected');
			//$('#configurableTabs .ui-tabs-selected').removeClass('ui-tabs-selected');			
			$(this).parent().addClass('ui-tabs-selected');
			$(this).blur();
			return false;
		});
		// NB. Do not simulate a click on the first tab, or else this will fire off WebTrends tracking
		//$('#configurableTabs').tabs().tabs('select',0);
		$('.configTabs'). find('.controlledTab:first').show();
		$('.configTabs').find('li:first').addClass('ui-tabs-selected');
	
    }
 	// track the impressions of a commercial element
 	// trackAdImpressions();
 	

    /********************************************************************
     * Funciton for Autotrader / Configurable Tabs     * 
     ********************************************************************/
	/*autotrader START*/
	var fieldName = 'selectedTab';
	if ((position = location.href.indexOf(fieldName)) > -1){
		pairs = location.href.substr(position).split('&');
		for(i = 0; i < pairs.length; i++){
			if (pairs[i].substr(0,fieldName.length) == fieldName){
				answer = pairs[i].split('=');
				$('#linktoConfigurableTab_'+answer[1]).click();
			}
		}
	}

	/*autotrader END */
	
	/********************************************************************
     * DISQUS comment login via SAM cookie - retrieve cookie value and embed script     * 
     ********************************************************************/
    if ($('#disqus_thread').length>0) {
		dsCookie = $.cookie('tmg_hashd');
		var dsAcc='telegraphuk';
	
		if (dsCookie) {
		    dsCookie = dsCookie.replace(/"/g,'');
		    var head= document.getElementsByTagName('head')[0];
		    var script= document.createElement('script');
		    script.type= 'text/javascript';
		    
		    if (window.location.host!='www.telegraph.co.uk' && window.location.host!='preview.telegraph.co.uk') { dsAcc='telegraphdev'; } 
		    script.src= 'http://'+dsAcc+'.disqus.com/remote_auth.js?remote_auth_s2='+dsCookie;
		    head.appendChild(script);
		}
	
		var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
		dsq.src = 'http://'+dsAcc+'.disqus.com/embed.js';
		(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
	}
        
});


/***********************************************************************
*         Standard functions required for Breaking News Ticker         *
***********************************************************************/
function rotateBreakingNews() {
	if ($("#tmglBreakingNews > ul > li:first[class*='shown']").length > 0) {
		$("#tmglBreakingNews > ul > li:first[class*='shown']").removeClass("shown").hide();
		$("#tmglBreakingNews > ul > li:not(:first)[class!='shown']").addClass("shown").show();
	} else {
		$("#tmglBreakingNews > ul > li:first[class!='shown']").addClass("shown").show();
		$("#tmglBreakingNews > ul > li:not(:first)[class*='shown']").removeClass("shown").hide();
	}
}

/***********************************************************************
*          Standard functions required for Commercial Carousel         *
***********************************************************************/
var ccObj = [];
function comCarouselObj() {
	this.carousel=null;
	this.timeoutId=null;
}

function comCarNextPartner(id) {
	var activePartner = $(ccObj[id].carousel).find("#carouselBtns > .btn").index($(ccObj[id].carousel).find("#carouselBtns > .btn[class*=active]").get(0));
	if ($(ccObj[id].carousel).find("#carouselBtns > .btn").get().length > activePartner+1) {
		comCarSelectPartner(id,activePartner+1);
	} else {
		comCarSelectPartner(id,0);
	}
}

function comCarSelectPartner(id,btn) {
	$(ccObj[id].carousel).find("#carouselBtns > .btn[class*='active']").removeClass("active");
	$(ccObj[id].carousel).find("#carouselBtns > .btn:eq("+btn+")").addClass("active");

	$(ccObj[id].carousel).find(".partner").hide();
	$(ccObj[id].carousel).find("#partner-"+$(ccObj[id].carousel).find("#carouselBtns > .btn[class*='active'] > img").attr("id")).show();
}


/* OLD WINDOW OPEN FOR MIGRATED CONTENT */
function newWindow(url, name, features) {
	var newWin = void(url,name,features);
	newWin.moveTo(50,50);
	newWin.focus();
}

/* function to dynamically generate JS includes */
function getJS(src) {
	var js = document.createElement("script");
	js.type = "text/javascript";
	js.src = src;
	document.getElementsByTagName("head")[0].appendChild(js);
}

/* function to get request parameters in JS */
function getParams(url){
	/* get the search query pairs */
	var searchQry = url.substring(url.indexOf("?")+1,url.length).split("&");
	var requestObj = new Array();
	/* Loop through the pairs and create their name/value pairs in the new object */
	for(i in searchQry) {
		var temp = searchQry[i].split("=");
		requestObj[temp[0]] = temp[1];
	}
	return requestObj;
}

/* Standard function to rebuild standard tagging (removing any old data) */
function dcsRebuild() {
	
	// Clear existing parameters
	if (typeof(DCSext) != "undefined") {
		for (N in DCSext){
			DCSext[N] = "";
		}
	}
	// We also need to clear WT params (these don't all get cleared in dcsCleanup in the Webtrends script)
	if (typeof(WT) != "undefined") {
		for (N in WT){
			WT[N] = "";
		}
	}
	
	// Rebuild from meta
	dcsMeta();
}

/* Dating widget function to navigate through tabs */
function changeTab(type,url,aID) {
	if (type != 'searchd') {
		$("#"+type).html("<div class='datingLoader'>Loading...</div>");
		$.ajax({
		  url: 'http://' + window.location.host + '/template/ver1-0/templates/fragments/dating/datingLargeTab.jsp?xmlUrl='+url+'&aID='+aID,
		  cache: false,
		  success: function(html){
		    $("#"+type).html(html);
		    datingClickReporting(type);
		  }
		});
	}
}

function datingClickReporting(tabType) {
	if (tabType == "" || tabType == null) {
		$("#comDating a").click(function(){
			dcsRebuild();
		    dcsMultiTrack('DCSext.clickArticleId',$(this).parents("#comDating").comments(0),'DCSext.clickArticleTitle',$(this).parents("#comDating").comments(1),'DCSext.clickSectionId',$(this).parents("#comDating").comments(2),'DCSext.clickSectionName',$(this).parents("#comDating").comments(3),'DCSext.clickSectionPosition',$(this).parents("#comDating").comments(4),'DCSext.clickURL',$(this).attr('href'),'WT.tx_u','1','DCS.dcsref',DCS.dcssip+DCS.dcsuri);
		});
	} else {
		$("#comDating > #"+tabType+" > a").click(function(){
			dcsRebuild();
		    dcsMultiTrack('DCSext.clickArticleId',$(this).parents("#comDating").comments(0),'DCSext.clickArticleTitle',$(this).parents("#comDating").comments(1),'DCSext.clickSectionId',$(this).parents("#comDating").comments(2),'DCSext.clickSectionName',$(this).parents("#comDating").comments(3),'DCSext.clickSectionPosition',$(this).parents("#comDating").comments(4),'DCSext.clickURL',$(this).attr('href'),'WT.tx_u','1','DCS.dcsref',DCS.dcssip+DCS.dcsuri);
		});
	}
}
function rotatingPuffReporting(obj) {
	dcsRebuild();
	dcsMultiTrack('DCSext.clickArticleId',$(obj).comments(0),'DCSext.clickArticleTitle',$(obj).parents(".rotatingPuffContainer").comments(2),'DCSext.clickSectionId',$(obj).parents(".rotatingPuffContainer").comments(3),'DCSext.clickSectionName',$(obj).parents(".rotatingPuffContainer").comments(4),'DCSext.clickSectionPosition',$(obj).parents(".rotatingPuffContainer").comments(5),'WT.tx_u','1','DCS.dcsref',DCS.dcssip+DCS.dcsuri);
}

/* Brightcove multi-player loaddisableder */
function onTemplateLoaded() {
	for(i in $(".BCPlayer").get()){
		var modVP;
		if (brightcove.instances[$(".BCPlayer:eq("+i+") object").attr("id")]) {
			bcExp = brightcove.getExperience($(".BCPlayer:eq("+i+") object").attr("id"));
			bcExp.getModule(APIModules.VIDEO_PLAYER).setVolume($(".BCPlayer:eq("+i+")").comments(0));
		}
	}
}


/* InSkin Ad-loaddisableder function (Provided by InSkin) */
function InSkinGetSASCode(obj) {
	
	var lineupId = obj['lineupId'];
	var plrWidth = obj['plr_ContentW'];
	var pSizeW = obj.InSkinParams['plr_InSkinW'];
	var pSizeH = obj.InSkinParams['plr_InSkinH'];
	var ord = obj.InSkinParams['tmgl_ord'];
	
	var bcstyle = "";
	
	if (plrWidth == "300") {
		bcstyle = "&amp;bcstyle=chl";
	} else if (plrWidth == "424") {
		bcstyle = "&amp;bcstyle=st";
	} else if (plrWidth == "526") {
		bcstyle = "&amp;bcstyle=lst";		
	} else if (plrWidth == "798") {
		bcstyle = "&amp;bcstyle=ctn";
	}
	
	tId = $("script[src^='http://ads.telegraph.co.uk']:first").attr("src").substring($("script[src^='http://ads.telegraph.co.uk']:first").attr("src").indexOf("transactionID=")+14,$("script[src^='http://ads.telegraph.co.uk']:first").attr("src").length);
	
	adSrc = $("script[src^='http://ads.telegraph.co.uk']:first").attr("src").substring(0,$("script[src^='http://ads.telegraph.co.uk']:first").attr("src").indexOf("spaceid="));
	
	var adtag = '<scr' + 'ipt type="text/javascript" language="javascript" src="'+adSrc+'spaceid=inskin&amp;sz=1x1&amp;ls=f'+bcstyle+'&amp;lnID='+lineupId+'&amp;psize='+pSizeW+'x'+pSizeH+'&amp;transactionID='+tId+'&amp;ord='+ord+'"></scr' + 'ipt><noscript><a href="'+adSrc+'spaceid=inskin&amp;sz=1x1&amp;ls=f'+bcstyle+'&amp;lnID='+lineupId+'&amp;psize='+pSizeW+'x'+pSizeH+'&amp;transactionID='+tId+'&amp;ord='+ord+'" target="_blank"><img src="'+adSrc+'spaceid=inskin&amp;sz=1x1&amp;ls=f'+bcstyle+'&amp;lnID='+lineupId+'&amp;psize='+pSizeW+'x'+pSizeH+'&amp;transactionID='+tId+'&amp;ord='+ord+'" alt="Advertisement" border="0"/></a></noscript>';

	if (lineupId) {
		// modify adtag here to include the lineupId, using regular expressions for example...
	}

	return adtag;
}

/* This is called for the random sorting of commercial unit (First*Clarity) */
function randOrd(){
	return (Math.round(Math.random())-0.5);
}

/***********************************************************************
*                   InSkin multiple-player code - LD                   *
***********************************************************************/
inskinCall();

function inskinCall() {
	// Limiting exposure to jQuery by saving to one variable
	var inSkinPlayers = $(".InSkinContainer");
	if (inSkinPlayers.length > 0) {
		
		for (i in inSkinPlayers.get()){   
	        // Get this InSkin player
	        var inSkinObj = inSkinPlayers.eq(i);
	        // Get the initialisation variables
	        var inSkinInit = inSkinObj.comments();
	        
	        // Get the values for inskin
	        var width = $(".InSkinContentContainer > .ooyalaCont > .ooyala > .playerWidth").html();
	        var height = $(".InSkinContentContainer > .ooyalaCont > .ooyala > .playerHeight").html();
	        var playerId = $(".InSkinContentContainer > .ooyalaCont > .ooyala > .playerId").html();
	        
	        // Set up inSkin for this player
	        var InSkinParams = new Array();

	        InSkinParams['srv_SectionID'] = inSkinInit[0];
	        InSkinParams['srv_SectionIDPlay'] = inSkinInit[1];
	        InSkinParams['srv_Keywords'] = $("meta[name='keywords']").attr("content");
	        InSkinParams['srv_Categories'] = $("meta[name='GSACategory']").attr("content");
	       
	        InSkinParams['srv_UseSAS'] = 'onplay';
	        //InSkinParams['srv_UseSAS'] = 'false';
	        InSkinParams['sas_PlayAdTag'] = inSkinInit[3];
	        
	        InSkinParams['sas_FrameURL'] = 'http://www.telegraph.co.uk/template/utils/inskin/SASFrame.html';
	        InSkinParams['sas_FrameDomain'] = document.domain;
	        InSkinParams['plr_InSkinID'] = inSkinObj.attr("id").substr(inSkinObj.attr("id").indexOf("_")+1,inSkinObj.attr("id").length);
	        InSkinParams['plr_ContentID'] = playerId;  
	        InSkinParams['plr_ContentType'] = 'OOYALA';
	        // Load InSkin after everything else has loaddisableded (slow)
	        InSkinParams['plr_InitAfterContent'] = 'true';

	        InSkinParams['plr_ContentW'] = width; 
	        InSkinParams['plr_ContentH'] = height; 
	        InSkinParams['plr_FrameTop'] = inSkinInit[4].substring(0,inSkinInit[4].indexOf(","));
	        InSkinParams['plr_FrameSide'] = inSkinInit[4].substring(inSkinInit[4].indexOf(",")+1,inSkinInit[4].lastIndexOf(","));
	        InSkinParams['plr_FrameBottom'] = inSkinInit[4].substring(inSkinInit[4].lastIndexOf(",")+1,inSkinInit[4].length);
	        InSkinParams['plr_InSkinW'] = inSkinInit[5].substring(0,inSkinInit[5].indexOf("x"));
	        InSkinParams['plr_InSkinH'] = inSkinInit[5].substring(inSkinInit[5].indexOf("x")+1,inSkinInit[5].length);
	        InSkinParams['plr_TotalW'] = '900';
	        InSkinParams['plr_TotalH'] = '600';
	        
	        InSkinParams['plr_ExpandableDetached'] = 'true';
	        
	        // As advised by InSkin
	        InSkinParams['cnt_autostart'] = (inSkinInit[6] == '') ? 'false' : inSkinInit[6];
	        
	        // Needed to unique-ify ad call, I wonder if I can piggyback onto the object like this?
	        InSkinParams['tmgl_ord'] = inSkinInit[7];

	        InSkinLoad.init(InSkinParams);
	    }
	}
}

/***********************************************
*         Ooyala Video Initialisation          *
***********************************************/
// Save old player initialiser function, and append it to a new version of the function
var oldOoyalaPlayerInit = receiveTelegraphPlayerEvent;
// Optimise closures to prevent recursive function
var receiveTelegraphPlayerEvent = function(playerId, eventName, eventParams) {

    // Change the volume only for API ready players
    if(eventName == "apiReady"){
        var playerVol = document.getElementById(playerId).parentNode.innerHTML;
        playerVol = parseFloat(playerVol.substring(playerVol.indexOf("<!--")+4,playerVol.indexOf("-->")));
        if (playerVol != null) {
            getFlashMovie(playerId).setVolume(playerVol);
        }
    }
 
    // Continue the the rest of the Ooyala configuration
    var ooyalaPlayerInit = oldOoyalaPlayerInit(playerId, eventName, eventParams);
    return ooyalaPlayerInit;
}