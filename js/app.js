var $app		= {},ajaxClick;
var dTableAjax;
var cache = {};
var dtl = {}; /*For Datatable With no selection */
$app.state		= {
	liveSpace: null
};
(function($) {
	$.fn.hasAttr = function(name) {  
			   return this.attr(name) !== undefined;
			};
}(jQuery));
var loadingSvg = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 -19 100 100" height="108" width="108"><path fill="#C4C4C4" d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50" transform="rotate(51.1646 50 50)"><animateTransform attributeName="transform" attributeType="XML" type="rotate" dur="1s" from="0 50 50" to="360 50 50" repeatCount="indefinite"></animateTransform></path></svg>';
var loderconf = function(){ return  {message: '<div class="pageloader cDtable" style="height:auto">'+loadingSvg+'<div class="loader-msg"> '+meessageArray[_.random(0,meessageArray.length-1)]+' </div> </div>',centerY:true,css:{"width":"30%","top":"350px","left":"","right":"10px","border":"none","padding":"0px","backgroundColor":"","opacity":"1","color":"#FFF"},overlayCSS:{"background":"#fff","opacity":"0.8","margin":"0px 0 0","top":"0px","position": "fixed","left":"0px"}}};
 
 /* document.addEventListener('DOMContentLoaded', function () {
	  if (Notification.permission !== "granted")
	      Notification.requestPermission();
     });
*/

$app.formatNumeralValue = function(fValue,fFormat){
	if(fFormat !== ""){
		return numeral(fValue).format(fFormat);	
	}else{
		return fValue;
	}
}
$app.addCss		= function( pUrl, flags = '' ){
	var class_name = '';
	var isLsCss = !! pUrl.match(/livespace\/custom.css\d*/);
	if(flags != '' && !isLsCss ){
		class_name = 'temp';
	}
	if( $(".lsCss[href='"+pUrl+"']").length  >= 1) {
		return false;
	}
	var link = $('<link media="all" rel="stylesheet" type="text/css" class="css file '+class_name+'" href="' + pUrl + '" />');	
	if(isLsCss) {
		$app.do({action:function(){ 
			link.attr('data-ls', $app.activeLs.lid );
			link.addClass("lsCss");
		 }, time:500  });
	}
	return $('head').append(link);
};
$app.addJs		= function( pUrl ){
	return $('<script type="text/javascript" class="js file" src="' + pUrl + '"></script>').appendTo('body:first');
};
$app.hash = function( str ){
    var hash = 0, i, cha;
    if (str.length == 0) return hash;
    for (i = 0, l = str.length; i < l; i++) {
        cha  = str.charCodeAt(i);
        hash  = ((hash<<5)-hash)+cha;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
$app.init = function(options){
	 window.socket = io.connect(options["socket-server"], {
		'query': 'token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiSm9obiIsImxhc3RfbmFtZSI6IkRvZSIsImVtYWlsIjoiam9obkBkb2UuY29tIn0.VecL2MImatj3_4y7I-y0sCoIOd3WPn86Z6ltQQ8fPwg'
	});

	socket.on("connect", function() {
    socket.emit("vizru_user", {
      username: $app.user.name,
      id: $app.user.id.toString(),
      tid: $app.tid
    });
  });
	return socket; 
}

$app.rand		= function(){
	var min = 0, max = 100;
	if(1 == arguments.length){
		max	= parseInt(arguments[0]);
	}else if(2 == arguments.length){
		min	= parseInt(arguments[0]);
		max	= parseInt(arguments[1]);
	}
	return Math.floor(min + Math.random() * (max - min + 1));
};
/* A call back utility for after done  process_page() /hashChange  */
$app.doAfter = [];
$app.post		= function(){
	
	// arguments URL, object, callback
	var
		pData = null,
		pCb = null,
		pUrl = '/sys/ajax.v1/' + Date.now()
	;
	if( arguments.length > 0 && 'object' === typeof arguments[0] ){
		pData	= arguments[0];
	}else if( arguments.length > 1 && 'object' === typeof arguments[1] ){
		pData	= arguments[1];
	}else if( arguments.length > 2 && 'object' === typeof arguments[2] ){
		pData	= arguments[2];
	}else{
		pData	= {};
	}
	if( arguments.length > 0 && 'function' === typeof arguments[0] ){
		pCb	= arguments[0];
	}else if( arguments.length > 1 && 'function' === typeof arguments[1] ){
		pCb	= arguments[1];
	}else if( arguments.length > 2 && 'function' === typeof arguments[2] ){
		pCb	= arguments[2];
	}
	return jQuery.ajax({
		'type': 'POST',
		'dataType': 'json',
		'url': pUrl,
		'success': function( json, tStatus, jqXHR ){
			$.map(json.Actions, $app.doAction);
			if($('body').find('#is_loaded').length>0){
				if($('#is_loaded').val()=="yes"){
					 $('.blockUI').fadeOut();
				}
			}
			return ('function' === typeof pCb) ? pCb( json.Body ) :true;
		},
		'data': {
			'_op': arguments.length > 0 && 'string' === typeof arguments[0] ? arguments[0] : null,
			'_ls': $app.liveSpace,
			'_args': pData
		}
	});
};

$app.clearDom = function(){
   $('.imageSelectDropDown').remove();
   if(typeof(hot3) !== 'undefined' ){
                  $.each(Object.keys(hot3),function(i,v){ hot3[v].destroy();}); 
	};
	$(document).attr("title", window.location.hostname);
    hot3Id = []; hot3 = []; hot3Conf = []; 
	$('style').filter(function() {
        return this.id.match(/gridster-stylesheet-.tab-pane#tab\d*/);
    }).remove();
};

$app.queryString = function(){

	var query_string  = '?'+ window.location.toString().split('?')[1];
	if(window.location.toString().split('?')[1] == undefined){
		query_string = '';
	}
    return query_string;
};

$app.do = function(opt) {
/* It will execute function in opt.action after all Ajax actions are  done and after a Safe time out */
    options = $.extend({
        action: $.noop,
        time: 500
    }, opt);
    optPromise = $.Deferred();
    setTimeout(function() {
        var setInt = setInterval(function() {
            if ($.active == 0) {
                setTimeout(function() {
                    opt.action.call();
                    optPromise.resolve('Static');
                }, opt.time);
                clearInterval(setInt);
            }
        }, opt.time);
    }, opt.time);
    return optPromise;
};
(function($){
	$.fn.setUrlParam = function( pArgs ){
		return this.filter('a').each(function() {
			var pUrl		= $(this).attr('href').split('?');
			var	pQs			= (pUrl.length > 1) ? decodeURI( pUrl[1] ) : '';
			pUrl			= pUrl[0];
			pQs				= $.map( pQs.split('&'), function(v){ return [v.split('=')]; });
			var	obj			= {};
			var name		= null;
			var value		= null;
			for(var i in pQs){
				if(pQs[i].length < 2){
					continue;
				}
				name		= pQs[i][0];
				value		= pQs[i][1];
				if('[]' === name.substr(-2)){
					name	= name.substr(0, name.length-2);
					if (obj[name] === undefined) {
						obj[name]	=[];
					}
					obj[name].push(value);
				}else{
					obj[name]	= value;
				}
			}
			$(this).attr( 'href', pUrl + '?' + $.param($.extend(pArgs, obj)));
		});
	};
}( jQuery ));

$app.doAction	= function( pArgs, pOp ){
  switch( pOp ){
	case 'messages':
		for(var i in pArgs){
			for(var j in pArgs[i]){
				$app.setMessage(pArgs[i][j], i);
			}
		}
	break;
	case 'redirect':
		if(pArgs == null){
			window.location.reload();
		}
		else{
			//window.location.replace(pArgs);
			window.location.hash = pArgs;
			//window.location.reload();
		}
	break;
	case 'fredirect':
		if(pArgs == null){
			window.location.reload();
		}
		else{
			window.location.hash = pArgs;
			window.location.reload();
		}
	break;
	case 'refresh':
		//window.location.reload();
		$app.FnRefresh();
	break;
	default:
		console.log( 'Unknown Action:', pOp, pArgs );
  }
  return true;
};
$app.setMessage = function( pMessage, pType ){

	// Webkit notification process

  /*	if (Notification.permission === "granted") {
  		var notification = new Notification('Vizru', {
			      	icon: '/ui-themes/base/images/tenant/logo.png',
			     	 body: pMessage,
			   	 });
			   	setTimeout(function () {
				notification.close();
			}, 9000);   
  	}else {
	*/
	var html = '<div class="alert-' + pType + ' alert"><a class="close" data-dismiss="alert" >&times;</a><div>' + pMessage + '</div></div>';
	$(html)
		.prependTo($app.$messages)
		.hide()
		.slideDown(150)
		.find('a.close:first')
		.each(function(i, dObj){
			setTimeout(function () {
				$(dObj).trigger('click');
			}, 9000);
		})
	;
	return true;
	//}
};
	$app.setError = function (pMessage) {
		var settings = $.extend({
			text: 'An error occurred',
			type: "danger",
			
			link: {text:"Retry", href:"#", target:"", action:function(ev){ console.log(ev); $app.FnRefresh(); $(this).remove(); }},
			slideOut: 6000
		}, pMessage);
		
		$('div#viznotification').off();
		var nDiv = $('div#viznotification').html('').on(
			'click',
			'a.retry',
			function (ev) {
				settings.link.action.call();
				$(this).parent().slideUp(75);
				return false;
			}
		).on(
			'click',
			'a.close',
			function (ev) {
			 
				$(this).parent().slideUp(
					75,
					function () {
						$(this).remove();
					}
				);
			}
		);

		var html = '<div class="alert-' + settings.type + ' alert_">' + settings.text + '<a href="'+settings.link.href+'"  target="'+settings.link.target+'" class="retry">' + settings.link.text + ' </a>  <a class="close" data-dismiss="alert" >&times;</a> </div>';
		$(html).prependTo(nDiv).hide().slideDown(150).each(function (i, Obj) {
				setTimeout(function () {
					$(Obj).remove();
				}, settings.slideOut);
		});
	};
jQuery(function($){
	$app.$messages = $('div#messages').on(
		'click',
		'a.close',
		function(ev){
			ev.preventDefault();
			$(this).parent().slideUp(
				75,
				function(){
					$(this).remove();
				}
			);
		}
	);
	$('body').on(
		'click',
		"a[href^='/ls/'],a[href^='/user/contacts/'],a[href^='/vizru/deals/']",
		function(ev){
			$(this).setUrlParam({'_ls': $app.state.liveSpace});
			return true;
		}
	);
	$('body').on(
		'click',
		"a.ajax",
		function(ev){
			ev.preventDefault();
			var $a = $(this);
			var dWidth = $a.attr('data-width'); 
			if (typeof dWidth == 'undefined' ){ dWidth = '772px';}else{	dWidth = dWidth; }
			dHeight = $a.attr('data-height'); 
			if (typeof dHeight == 'undefined' ){ dHeight = 'auto';}else{	dHeight = dHeight; }
			var _title = $a.attr('data-original-title');
			if (typeof _title == 'undefined'){_title = $a.attr('title');}
			var ajaxUri = $a.attr('href');	
			var targetUrl = '';
			c_function = new Function( $a.data().callback );
			if($a.hasAttr('type')) {targetUrl = $a.attr('type');}
					options = { 	    
							width: dWidth,
							title: _title,
							ajaxUri: ajaxUri,
							targetUrl :targetUrl,
							callBack:c_function,
							height:dHeight
						 };
							if ($a.data('state') !== "pending") {
								$a.data({ "state": "pending"});
									/* This will resolve when ajax modal close */
								ajaxClick(options).done(function (d) {$a.data({ 'state': 'resolved'})});
							}
			}
	);
	//Autocomplete
	function log( message ) {
		$( "<div>" ).text( message ).prependTo( "#search-result" );
		$( "#search-result" ).scrollTop( 0 );
	}
	$(".autocomplete").bind("keydown",function(event) {
		if (event.keyCode === $.ui.keyCode.TAB && $(this).data("autocomplete").menu.active) {
			event.preventDefault();	
		}
	}).autocomplete({
		minLength: 0,
		source: function(request, response) {
			var key	    = request.term;
			var aurl	= $('#search-url').val();
			var dataString= {key:key,type:'ls'};
			$.getJSON(aurl, dataString, function(result) {
				response($.map(result, function(item) {
                return item.name;
            }));
        });
			//$app.post(aurl,dataString);
		},
		select:  function( event, ui ) {
			log( ui.item ?
			"Selected: " + ui.item.label :
			"Nothing selected, input was " + this.value);
			}
		});
});


$app.FnRefresh = function(){

	if (window.location.hash) {
	   	hashurl = window.location.hash.slice(1);
	   	if (hashurl == undefined || hashurl == "") {
	       hashurl = '/ls/livespace.list';
	   	}
	   }

	   	 var target_div	=	"section.contentInner";
	   	 load_url('/'+hashurl, target_div,true);
}

 $app.md5 = function(value) {
    return CryptoJS.MD5(value).toString();
  }
var md5 = $app.md5;
$app.load_content = function () {
    	if (window.location.hash) {
	   	hashurl = window.location.hash.slice(1);
	   	if (hashurl == undefined || hashurl == "") {
	       hashurl = '#ls/livespace.list';
	   	}

	   	//redirected to hash url by removing unwanted url parts before #
	   	var loc 		= 	window.location.toString();
		var page_addr	=	loc.split(base_path);
		var hash_check	=	page_addr[1].split('#'+hashurl);
		if(hash_check[0]!='' && hash_check[0]!='user.signin'){
			var url 	= base_path + '#'+hashurl;
			window.location.replace(url);
		}
		//end

	   	url 	= base_path + hashurl;
	   	hash = hashurl.split("/");
	   	if(hash[1] != "") {
	       element = "#" + hash[1];
	       url = base_path +  hashurl;
	   	}else {
	       element = "#" + hash[0];
	   	}
	   	hash = "#" + hash[0];

	   	//loading hash url contents
	    var target_div	=	"section.contentInner";
	    load_url(url, target_div,true);
	    //hash url contents - end
		
		// urls add Classes function
		urlEventss(hashurl);
		
		

    	return false;
	}else{
		// if(window.location.pathname == '' || window.location.pathname == '/'){
		// 	var url 	= base_path + '#user.home';
		// 	window.location.replace(url);
		// }
	}
}

/* enhance $.getSctipt to handle mutiple scripts */
/*
var getScript = jQuery.getScript;
jQuery.getScript = function( resources, callback ) {

    var // reference declaration & localization
    length = resources.length,
    handler = function() { counter++; },
    deferreds = [],
    counter = 0,
    idx = 0;

    for ( ; idx < length; idx++ ) {
        deferreds.push(
            getScript( resources[ idx ], handler )
        );
    }

    jQuery.when.apply( null, deferreds ).then(function() {
        callback && callback();
    });
};
*/

function process_page(data,target_div,url)
   {

	 	$(target_div).html(data.Body);

		if(!data.Body){
		/* If data not Json format Replace target_div with Server Response */
			$(target_div).html(data);
		}

		if(typeof data.Refs != 'undefined') {
			if( $.trim(data.Refs['js']) == ""  &&  data.Refs['js-code'].length > 0 ){
				/* Eval js-code if Refs['js'] urls is empty and scripts in Refs['js-code'] */
				eval(data.Refs['js-code']);
					if(typeof(tourPromise) !== "undefined"){
						tourPromise.resolve('pagerefresh');
					};
				/* A call back utility for after process_page() done; push functions into  array //$app.doAfter.push(function(){alert('one')});  */
				$app.doAfter.forEach(function(element) {
    						element.call();
				});
				$app.doAfter = [];
				if($app.activeLs != null ){
						$('.lsLinks>a').find('span').html($app.activeLs.name);
						$('link.lsCss').not('[data-ls="'+$app.activeLs.lid+'"]').remove();
										}else{
						$('.lsLinks>a').find('span').html('My App Containers');
						$('link.lsCss').remove();				}
			}
		}
		//Manage  Actions 
			if(typeof data.Actions != 'undefined') {
				$.each(data.Actions,function(i,v){
					$app.doAction(v,i);
				});
			}

		if(typeof data.Refs != 'undefined') { 
			$.each(data.Refs['js'], function( index, value ){
				 $.ajax({
						type: "GET",
						dataType:"script",
						url: value,
						success: function(d) {}
					})
			      .done(function( script, textStatus ) {
			        if( data.Refs['js'].length == index+1){
			            if( data.Refs['js-code'].length > 0 ){
							setTimeout(function(){
								if(data.Refs){
									eval(data.Refs['js-code']);
								}
									if(typeof(tourPromise) !== "undefined"){
										tourPromise.resolve('pagerefresh');
									}
	/* A call back utility for after process_page() done; push functions into  array //$app.doAfter.push(function(){alert('one')});  */
						$app.doAfter.forEach(function(element) {
    										element.call();
										});
										$app.doAfter = [];
									if($app.activeLs != null ){
										$('.lsLinks>a').find('span').html($app.activeLs.name);
										$('link.lsCss').not('[data-ls="'+$app.activeLs.lid+'"]').remove();

										}else{
											$('.lsLinks>a').find('span').html('My App Containers');
											$('link.lsCss').remove();
											}
									
								$(document).trigger('hashReady').trigger("pageChange");
								$(target_div).trigger('hashReady', [{url:url}]);
								 },100)	;
						}
			        }

			      })
			      .fail(function( jqxhr, settings, exception ) {
			        console.log(value+" is not loaded");
			    });
			});
		}
		$('.myappMenu .dropDownWrap').perfectScrollbar();
		setTimeout(function(){ $(target_div).trigger('hashReady'); },1000);

		 $('.pageIconsleftnav').perfectScrollbar();
		
		/*css loading*/
		$('link.temp').prop('disabled',true);
	   	$('link.temp').remove();
		if(typeof data.Refs !== 'undefined') {
		   	if( data.Refs['css'].length > 0 ){	   		
				$.each(data.Refs['css'], function( index, value ) {
					$app.addCss(value, 'temp');
				});
			}
		   	if( data.Refs['css-code'].length > 0 ){
				$.each(data.Refs['css-code'], function( index, value ) {
					$app.addCss(value);
				});
			}
		}
		
	/*Process Scripts */
	$(target_div).find('.tip').tooltip({container: 'body:first'});	
	$(target_div).find('.tip-left').tooltip({ placement: 'left' , container: 'body:first'});	
	$(target_div).find('.tip-right').tooltip({ placement: 'right' , container: 'body:first'});	
	$(target_div).find('.tip-top').tooltip({ placement: 'top', container: 'body:first' });	
	$(target_div).find('.tip-bottom').tooltip({ placement: 'bottom' , container: 'body:first'});	
	/*Process Scripts */
	
   }




function load_url(url, target_div, clearDom){	
	/*$(target_div).unbind('hashReady');*/
	var clearDom = clearDom || false;
	$(target_div).find('.blockUI').remove();
	$(target_div).block(new loderconf);
	var lget = $.get(url, function (data){
		if(clearDom){ $app.clearDom() }
		process_page(data,target_div,url);
	}).fail(function(d){ 
		$(target_div).html(d.responseText);
	});
	return lget;
//}

}

function getUrlVars() {

    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}
/*for loading global livespace list*/
$( document ).ready(function() {
    var url			=	base_path +  'ls/livespace.lslistmenu'+$app.queryString();
	var target_div	=	"div#lsmenu";
	if(!!$("div#lsmenu").length ) {
		
		 load_url(url, target_div);
	}
   
});
 
ajaxClick = function(options) {
    var settings = $.extend({
	    width: '772px',
		isSlide: false,
		backdrop:true,
		title: 'Vizru',
		minimize:false,
        ajaxUri: '/',
		targetUrl :'',
		height :'auto',
		callBack:function(){﻿}
     }, options);
	 //console.log(options);
	var  ajaxClickPromise = jQuery.Deferred();
    var $a = $(this);
    var targetUrl = settings.targetUrl;
	var topMargin = "";
	var minimize = settings.minimize ?  "hasMinimize" : "";
	var settingsHeight = "height:calc(" + settings.height + ")";
	if((settings.height === '100vh - 40px')){
		topMargin = 'top : 0';
		settingsHeight = "height:calc(" + settings.height + "); max-height:100vh;";
	}
	$(".tooltip").fadeOut();
    var $m = $('<div class="ui-draggable ajax-modal '+minimize+' modal in fade" style=" max-height:100vh;height:calc('+ settings.height +' + 105px); width:' + settings.width + '" ><div class="modal-dialog" style="'+topMargin+'"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">×</button> <a id="modalMinimize" class="minimize modalMinimizeBtn"><i class="fa fa-window-minimize minimize-i " aria-hidden="true"></i> <i class="fa fa-window-maximize maximize-i" aria-hidden="true"></i> </a> <h4>' + settings.title + '</h4></div><div class="modal-body clearfix"  style ="'+ settingsHeight +'" /></div></div></div>')
            .appendTo('body:first')
            .on(
                'hidden.bs.modal',
                function() {
					settings.callBack.call();
					$(this).remove();
					ajaxClickPromise.resolve('closed');
					/*if($('body').find( 'section.data-table' ).length){
						$('body').find( 'section.data-table' ).dataList(); 
					}*/
                }
            );
    $.getJSON(
        settings.ajaxUri,
        function(d, s, jqXHR) {
            var cssCb = function() {
                if (d.Refs['css-code'].length > 0) {
                    $('<style type="text/css">' + d.Refs['css-code'] + '</style>')
                        .appendTo('head:first');
                }
            };
            if (d.Refs['css'].length > 0) {
                head.js(d.Refs['css'], cssCb);
            } else if (d.Refs['css-code'].length > 0) {
                cssCb();
			}
            var cbJs = function() {
                $m.find('div.modal-body:first')
                    .html(d.Body)
                    .end()
                    .on('show.bs.modal', function() {
						var minimizeEl = $m.find(".modalMinimizeBtn");
							minimizeEl.click(function(){
								var isMinimized = $(this).closest(".ajax-modal").hasClass("minimizeModal");
								$(this).closest(".ajax-modal").toggleClass('minimizeModal');
								if(isMinimized){
									$(this).closest(".ajax-modal").stop().animate({left:0,top:0},0);
								}else{
									$(this).closest(".ajax-modal").stop().css({left:"calc(100vw - 310px )", top:57 });
								}
							});
						if($('input[name="_fm[email]"]').length == 1){
							setTimeout( function(){$('input[name="_fm[email]"]').focus();}, 500	);
						}
                        eval(d.Refs['js-code']);
                        $frm = $(this).find('form').attr('action', settings.ajaxUri);
                        if (targetUrl != '') {
                            $(this).find('form').append('<input type="hidden" name="target_url_set"  id="target_url_set" value="' + targetUrl + '">');
                        }
                        if ($frm.find('input[type=file]').length < 1) {
                            $frm.ajaxForm({
                                'url': settings.ajaxUri,
                                'dataType': 'json',
                                'beforeSubmit': function(arr, $form, options) {
                                    $form
                                        .find(':input:enabled')
                                        .prop('disabled', true)
                                        .addClass('disabled _ajax_disabled')
                                        .filter('.submit')
                                        .parent()
                                        .prepend('<i class="fa fa-spinner fa-spin ml20 font_16 mt5 clr_white" style="position:absolute;z-index:999" />');
                                    return true;
                                },
                                'success': function(json) {
                                    if ($frm.find(':input[name="target_url_set"]').val() != '') {
                                        if (typeof $frm.find(':input[name="target_url_set"]').val() != 'undefined') {
                                        	//hide modal after new wed doc creation
                                            $m.modal('hide');
                                            window.location = $frm.find(':input[name="target_url_set"]').val();
                                            return false;
                                        }
                                    }
                                    $m
                                        .find(':input:disabled._ajax_disabled')
                                        .prop('disabled', false)
                                        .removeClass('disabled _ajax_disabled')
                                        .filter('.submit')
                                        .siblings('i.icon-spinner.icon-spin')
                                        .remove();
									$m.modal('hide');
									
									eval(json.Refs['js-code']);
									ajaxClickPromise.resolve('closed');
                                    if ($frm.find(':input[name="_fm[save_next_needed]"]').val() == 1) {
                                    /*   Re open form  after submit*/
                                        ajaxClick(settings);
                                    }

                                    $.map(json.Actions, $app.doAction);
                                    if (json.Result) {
                                        $('table.data-table[id]').each(function() {
                                            $(this).dataTable().fnDraw();
                                            if ($('body').find('#right-bar').length > 0) {
                                                $.post('/ls.rightbar/' + $app.queryString(), '', function(data) {
                                                    var dat_pp = data.Body;
                                                    $('#right-bar').html(dat_pp);
                                                });
                                            }
                                        });
                                    }
                                },
                                'error': function() {
                                    $app.setMessage('Sorry, something went wrong please try again later!', 'error');
                                    $m.modal('hide');
                                }
                            });
						}
                    }).modal({backdrop:settings.backdrop, show:false});
                   $m.modal('show');
                $(".ajax-modal").draggable({
					handle: ".modal-header"
                });
            };
            if (d.Refs['js'].length > 0) {
                head.js(d.Refs['js'], cbJs);
					if(typeof(tourPromise) !== "undefined"){
						tourPromise.resolve('pagerefresh');
					};
            } else {
                cbJs();
					if(typeof(tourPromise) !== "undefined"){
						tourPromise.resolve('pagerefresh');
					};
            }
        }
	);
	return ajaxClickPromise;
};

$app.setNotify = function(pMessage ){
	var settings = $.extend({
		width: '600px',
		isSlide: false,
		slideOut: 6000,
		backdrop: true,
		title: 'Vizru',
		content: "",
		ajaxUri: '/',
		targetUrl: '',
		height: '100%',
		buttons: [{
			text: "Ok"
		}
		],
		callBack: function () { }
	}, pMessage);
	 var  ajaxClickPromise = jQuery.Deferred();
	 var settingsHeight = "height:auto";

	var buttonHtml = "";
	if (settings.buttons) {
		settings.buttons.map(function (item) {
			buttonHtml += `<button class="btn btn-small btn-grn ml10 pull-right ${item.class}" id = ${item.id} data-dismiss="modal"  >${item.text}</button>`;
		});
	}

/*     var $msgDiv = $('<div class="ui-draggable ajax-modal '+minimize+' modal in fade" style=" max-height:100vh;height:calc('+ settings.height +' + 105px); width:' + settings.width + '" ><div class="modal-dialog" style="'+topMargin+'"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">×</button> <a id="modalMinimize" class="minimize modalMinimizeBtn"><i class="fa fa-window-minimize minimize-i " aria-hidden="true"></i> <i class="fa fa-window-maximize maximize-i" aria-hidden="true"></i> </a> <h4>' + settings.title + '</h4></div><div class="modal-body clearfix"  style ="'+ settingsHeight +'" /></div></div></div>')
    .appendTo('body:first')
    .on(
        'hidden.bs.modal',
        function() {
            settings.callBack.call();
            $(this).remove();
            ajaxClickPromise.resolve('closed');
            
        }
    ); */
    var $msgDiv = $(`<div class="ui-draggable ajax-modal modal in fade vizruNotifyModal" style="max-height:100vh;${settingsHeight}; width:${settings.width}"  role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-body clearfix cardParent"  style ="height:calc(${settings.height})  " >
          
		 ${settings.content}
		  
		  <div class="clearfix">   </div> 
  
		</div>
		<div class="modal-footer">
		${buttonHtml} 
		</div> 
      </div>
    </div>
  </div>`);
	$msgDiv.on(
        'hidden.bs.modal',
        function() {
			settings.callBack.call();
            $(this).remove();
            ajaxClickPromise.resolve('closed');
            
        }
	)
	.appendTo('body:first');
	$msgDiv.find(".btn.btn-small.btn-grn").each(function(i){
		$(this).on("click", settings.buttons[i].action);
	});
	$msgDiv.modal('show');

	
    return ajaxClickPromise;
	
};