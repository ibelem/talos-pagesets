/* Copyright (c) The Internet Movie Database, 2010 */if(document.getElementById('quicksearch')){var advancedSearchOption=document.createElement("option");advancedSearchOption.className="advancedSearch";advancedSearchOption.setAttribute("value","/search/");advancedSearchOption.innerHTML="Advanced Search&raquo;";document.getElementById('quicksearch').appendChild(advancedSearchOption);}
function jumpMenu(selObj){var myIndex=selObj.selectedIndex;var myObj=selObj[myIndex];if("advancedSearch"==selObj[myIndex].className){selObj.selectedIndex=0;document.location=myObj.value;}}
var home_img_holder=document.getElementById("home_img_holder");if(home_img_holder){home_img_holder.onmouseover=function(){this.className="hover";};home_img_holder.onmouseout=function(){this.className="";};}
function navBuilder(test){var NavBuilder={};test.onmouseover=function(){if(true==buttonHistory){mouseOver();}else{inTimeOut=setTimeout(mouseOver,100);}}
function mouseOver(){buttonHistory=true;clearTimeout(outTimeOut);for(var i=0;i<test.parentNode.childNodes.length;i++){if("nb_home"==test.className){if("nb_home"==test.parentNode.childNodes[i].className){test.parentNode.childNodes[i].className="nb_home";}else{test.parentNode.childNodes[i].className="";}
test.className="nb_home";}else if("nb_home"!=test.parentNode.childNodes[i].className){test.parentNode.childNodes[i].className="";test.className="nb_hover";}}}
test.onmouseout=function(){outTimeOut=setTimeout(mouseOut,500);clearTimeout(inTimeOut);}
function mouseOut(){buttonHistory=false;if("nb_home"!=test.className){test.className="";}}
return NavBuilder;}
var buttonHistory=false;var outTimeOut;var inTimeOut;function triggerNav(){var mainNav=document.getElementById("main_nav");for(var i=0;i<mainNav.childNodes.length;i++){if("LI"==mainNav.childNodes[i].tagName){var test=mainNav.childNodes[i];var newButton=new navBuilder(test);}}}
triggerNav();