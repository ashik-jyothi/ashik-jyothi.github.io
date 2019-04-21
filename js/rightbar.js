// JavaScript Document
var rightBarFn, /*Open Close metods for Right Bar*/
    Searchrightbar, /* Main Rightbar Serch ajax function*/
	initBcastLidDrop, /* Populate Dropdowns */
	makeChatScrollBottom, /*Chat Scroll  to Bottom*/
	ssTagobj = {},
	setMessageAreaHeight;
var activeBcastState = function() {
	    if ($app.activeLs && $app ) {
	        if ( parseInt($app.activeLs.lid) !==  parseInt(lastState) && gSerch.searchKey =="" && gSerch.tag == "") {
				console.log('from activeBcastState', parseInt($app.activeLs.lid) , parseInt(lastState) , gSerch.searchKey );
				refreshMessage = $.extend(gSerch, {
	                "liveSpaceId": [$app.activeLs.lid],
	                "page": 1,
	                "tabId": "messages",
	                "searchKey": ""
				});
	            Searchrightbar(refreshMessage);
	        }
	    }
		if( $app.activeLs === null && gSerch.searchKey ==="" ){
			/*close rightbar if user navigate to any Global url if not in any search state ( Top nav Global search )*/
			rightBarFn().close();
			}
};
		
	var bcastTagHeight = 0, bcastFileHeight= 0; /*Height Adjust For Tag and File*/
var rightLoder = { "message": "<div class=\"pageloader cDtable pl20 \" style=\"height:auto\"><span class=\"font_15 clr_black\">Processing.<\/span><\/div>","centerY": true,"css": { "width": "30%", "top": "150px", "left": "", "right": "10px","border": "none", "padding": "0px",  "backgroundColor": "", "opacity": "1", "color": "#FFF" },
                                "overlayCSS": {"backgroundColor": "#FFF", "opacity": "0.9", "margin": "0px 0 0" }};
setMessageAreaHeight = function(){
	_textArea = $('.add_broadcast_fld').height();
	_attachMents = $('#common_div').height();
	$('body').fixYw({ container: ".messageWraperRight",  toolHeight:_attachMents+_textArea+140, });
	}
 $.fn.addBcastTag = function(options){
		 ssTagobj = options;
		 $('#tag_attach_box').show();
		  $('#right_search_input').val('');
		 var tagItem = ($.trim(options.tag)).split(' ');
		 $('#tag_attach_box .taglist').html('');
		 $.each(tagItem, function(i,e){
				e =   $('#right_search_input').val();
				//alert("ddd"+options.tag);
				var tagLabel 	= tagItem[i].replace(/\_vSv_/g,'/');
				tagLabel 		= tagLabel.replace(/\__vizHash__/g,'#');
				tagLabel 		= tagLabel.replace(/\__vizPercent__/g,'%');

				$('#tag_attach_box .taglist').append('<a class="ssTagel" data-tag="'+tagItem[i]+'" title="Click to Remove"> #'+tagLabel+'</a>');
				$('#right_search_input').val( e+' '+tagItem[i]);
			 });
		setMessageAreaHeight();
		
		 
		};		
		
	$(function() {
	makeChatScrollBottom = function(){
			var messageUlheight = $('.broadCastUl').height();
			$(".messageWraperRight").scrollTop(messageUlheight);	
			}
/*	initBcastLidDrop = function(c){
	c.find('#select_apps_bcast').multiselect({
		classes:'multiSelectFlat noCurve noHeader single brdCstApSelectDrpDwn ',
		multiple:false,
		header:true,
		noneSelectedText: 'Select Livespace',
		close: function() {
			var aVal = $('#select_apps_bcast').val(); 
			//if( aVal == null) return;
 			var selectText = $("#select_apps_bcast option[value="+aVal+"]").html();
			$.extend(gSerch,{tabId:'messages',page:1,searchKey :'',liveSpaceId:[aVal]});
			Searchrightbar(gSerch, false);
		}
}).multiselectfilter();
		}*/
    rightBarFn = function(method) {
        var wrap = $('#wrap');
        var id; 
        if(method == 'filter'){
        	id 	 = 'rightPanFilter';

        }else{
        	 id 	 = 'rightPan';
        }
        var rightbar = $('#'+id);
        pFunction = {};
        pFunction.close = function() {
			
        	
         if(!$('body').hasClass('showTagPanel')){
			$('body').removeClass('showRightPanel messagePanel searchPanel largeRightPanel fullScreenPanel');
		}else{
			$('body').removeClass(' messagePanel searchPanel largeRightPanel fullScreenPanel');
		}
		if($('#ls').hasClass('tileView')){
			setTimeout(function(){
				$('#arrangeDashBoard').masonry('reloadItems').masonry('layout');
			},1000);
		}
		$(".fullPanelBack").remove();
			

		
		/*	if(method == null){
				$.ajax({
					url:"/rightpanel.setcookie",
					data:{panel:'close'}
					});
			}*/
		setTimeout(function(){
					reTab();		
				$(window).trigger('resize');

		},300);

		$('#right_search_input').val('');
		};
		pFunction.isOpen = function(){
			return $('body').hasClass('searchPanel');
			};
		pFunction.clear = function(all){
			// var _all = all || false; //clear all tab or current tab Default = Current
			// if(_all){ 
			// 	$('._rightpaneltab').find("[class*='right-content-']").html('');
			// 	$('._rightpaneltab#homestatic').html('');
			//  }
				
			// 	else{
			// 			$('._rightpaneltab.active').find("[class*='right-content-']").html('');
			// 			if( $('._rightpaneltab.active').attr('id')=="homestatic" ){ $('._rightpaneltab#homestatic').html('');}
			// 	}
			return true;
		};
			
		pFunction.open = function(tab="files") {
			$('body').addClass('showRightPanel searchPanel');
			$('body').removeClass("messagePanel");
			if($('#ls').hasClass('tileView')){
			setTimeout(function(){
				$('#arrangeDashBoard').masonry('reloadItems').masonry('layout');
				},1000);
			}
			
	

		
				if(typeof tab !== "undefined")
				{
				  $('.rightPanelTab').find('a[data-tabcount='+tab+']').tab('show');
				} 
			/*	$.ajax({
					
					url:"/rightpanel.setcookie",
					data:{panel:'open'}
					});
			*/
		setTimeout(function(){
					reTab();		
				$(window).trigger('resize');

		},300);
	
		};
		pFunction.expand = function(){
			$('body').addClass('largeRightPanel').removeClass('fullScreenPanel');
			$(".fullPanelBack").remove();
			$('body').fixYw({ container: "#rightPan",  toolHeight:53 });
			$('body').fixYw({ container: ".right-content-files",  toolHeight: 55 });
		};
		pFunction.fullScreen = function(){
			$('body').addClass('fullScreenPanel').removeClass('largeRightPanel');
			$('<div class="modal-backdrop fullPanelBack"></div>').appendTo(document.body);
			$('body').fixYw({ container: "#rightPan",  toolHeight:0 });
			$('body').fixYw({ container: ".right-content-files",  toolHeight:0 });
			$("body").addClass("fullRightBar");
		};
		pFunction.contract = function(){
			$('body').removeClass('largeRightPanel fullScreenPanel');
			$(".fullPanelBack").remove();	
			$('body').fixYw({ container: "#rightPan",  toolHeight:53 });
			
			$('body').fixYw({ container: ".right-content-files",  toolHeight:90 });
		};
		
        return pFunction;

    }
	$('.rightPan .sidebar-close').click(function(){
       /* $.ajax({url:"/rightpanel.setcookie", data:{panel:'close'},
                    type:'GET',
                    success: function(data){ 
        }}); */
		rightBarFn(null).close();
		 rightBarFn('filter').close();
	 });
	
   $("#right_search_input").on('keypress keyup click', function(se) {
		 e = $('.searchHeader').find('.searchLink.selected');
        var searchKey = $('#right_search_input').val();
		 var  tabId ;
		 if(e.length){
				 tabId =  e.attr('data-tab-id');
				  }else{
					   tabId = $('#rightTabul').find('li.active').attr('data-activeright');
					  }
		
        if ( se.which == 13 && (  $.trim(searchKey).length != 0 || tabId == 'messages') ) { 
            se.preventDefault();
            var defaults = {  searchKey: searchKey, tabId: tabId};
            gSerch = $.extend({}, defaults, aData);
			gSerch.tag = '';
            Searchrightbar(gSerch);
			rightBarFn().open(tabId);
       }
	   else if (  se.which === 38 ){
		   if(e.length){
			   e.removeClass('selected').prev('.searchLink').addClass('selected');
			   }
			   else{ $('.searchHeader').find('.searchLink').first().addClass('selected'); }
		    }
			 else if (  se.which === 40 ){
			   if(e.length){
			   e.removeClass('selected').next('.searchLink').addClass('selected');
			   }
			   else{
				   $('.searchHeader').find('.searchLink').first().addClass('selected');
				   }
		    }
	   else{
		   if ($.trim(searchKey) !== ''){
			 $('.searchAssistant').show();
		  		/* $('.serachString').html(searchKey);*/
			   }
		   
		   }
    });
	$('#rightPan .sidebar-close').on('click',function(){
        
		 rightBarFn(null).close();
		 rightBarFn('filter').close();
	 });
	$('body').on('click','.replayWithTagBcast',function(){
		var taglink = $(this).data().tagconf; 
		taglink.tag = $(this).data().tagconf.tags 
		$.fn.addBcastTag(taglink );
 	 });
	$('body').on('click','.expandRightBtn',function(e){
		e.preventDefault();
		$($.fn.dataTable.tables(true)).DataTable().columns.adjust();
		if($('body').hasClass('fullScreenPanel') && $('body').hasClass('fullRightBar')){
			rightBarFn().expand();
		}else if($('body').hasClass('largeRightPanel') && $('body').hasClass('fullRightBar')){
			rightBarFn().fullScreen();
		}else if($('body').hasClass('largeRightPanel') && !$('body').hasClass('fullRightBar')){
			rightBarFn().contract();
		}else{
			rightBarFn().expand();
		}
 	 }); 
	 
	
	/* Dashboard filter*/

	/*$('#ShowdashboardFilter').on('click',function(){
		rightBarFn(null).close();
      	var tabName = $(this).attr('data-tab-open'); 
		rightBarFn('filter').open(tabName);
	});*/
	$('#rightPanFilter .sidebar-close').on('click',function(){
        rightBarFn('filter').close();
		rightBarFn(null).close();
	 });
	// End
	
 
    $(document).on('click', '.searchLink', function(){
		var sData = $(this).data();
		var searchKey = $('#right_search_input').val();
		gSerch.searchKey =  searchKey;
		gSerch.rowfilter = false;
		gSerch.tag = '';
		gSerch = $.extend(gSerch,sData);
		Searchrightbar(gSerch, false);
		rightBarFn().open(gSerch.tabId);
		});
	
	$(document).on('click', '[data-hide="popover"]', function(){
		 $(this).parent().parent().hide();
	 });
	
	$(document).on('rightbar-search', function(){
		$('.searchAssistant').hide();
		
		});
	 
	
	$('#rightTabul').find('.tabItem').on('shown', function (e) {
			var e = jQuery.Event("keypress");
			e.which = 13;
			$("#right_search_input").trigger(e);
	/*  e.target // activated tab
	  e.relatedTarget // previous tab
	*/});
	
 	 
		$('body').on('click', '.bcastTagLink', function (e) {
			var val = $(this).attr('data-search');
			/*var e = jQuery.Event("keypress");
			e.which = 13;*/
			Searchrightbar({page: 1, tabId: "messages", searchKey: val});
			$("#right_search_input").val(val);
			e.preventDefault();
	});
	
		
		
	
	 $('body').on('click', '.loadMoreSearch ',function(){
		t = $(this);
		if( t.hasClass('inQuee') == false ){
			t.append(" <img src='/ui-themes/trigata/images/spinner.svg' heiht='20' width='20' class='ml10' >");
			var page 	= t.attr('p');
            var tabId = $('#rightTabul').find('li.active').attr('data-activeright');
            gSerch.page = page;
            gSerch.tabId = tabId;
			Searchrightbar(gSerch,true);
			};
		t.addClass('inQuee');
    }); 
	
	$('body').on('click', '.loadMoreSearchMsg ',function(){
		t = $(this);
		if( t.hasClass('inQuee') == false ){
			t.append(" <img src='/ui-themes/trigata/images/spinner.svg' heiht='20' width='20' class='ml10' >");
			var page 	= t.attr('p');
            var tabId = $('#rightTabul').find('li.active').attr('data-activeright');
            gSerch.page = page;
            gSerch.tabId = tabId;
			Searchrightbar(gSerch,true);
			};
		t.addClass('inQuee');
    }); 
	

	$('body').on('mouseenter','.newmsg',function(){
		e = $(this);
		var bid_ = e.attr('id');
		bid = bid_.split("row_")
		$.ajax({url:"/rightpanel.read", data:{uid:$app.user.id,bid:bid[1]},
                    type:'GET',
                    success: function(data){ 
					var c_item = $('#notificationStatus span').html();
					if( c_item <= 1){
							$('#notificationStatus span').html('<i class="fa fa-bell-o" aria-hidden="true"></i>');
							$('#notificationStatus').removeClass("hasNotificaton");
						}
						else{
						$('#notificationStatus span').html(c_item - 1);
							$('#notificationStatus').addClass("hasNotificaton");
						}
						
/*                      $('#ShowBroadcast').attr('name',0);
                        $('#ShowBroadcast').attr('title','');
                        $('#ShowBroadcast').attr('data-original-title','');
                        $('#ShowBroadcast .inbcount').remove(); 
*/						e.removeClass('newmsg');
               }});
		
		} )
	/*initBcastLidDrop($('body'));*/
	$('body').fixYw({ container: ".right-content-messages .gSearchResultAjax",  toolHeight:180});
	setMessageAreaHeight(); /*Set BroadCst Container Height*/
	$('.right-content-messages').find('.gSearchResultAjax').clickPagination({ innerClass: ".gSearchResultAjaxInner", btnClass: '.loadMoreSearch'});
	$('.messageWraperRight').clickPaginationReverse({innerClass: ".broadCastUl", btnClass:'.loadMoreSearchMsg'});	
	setTimeout(function(){makeChatScrollBottom()},1000);
 	 /* Move Brodcast Scrollbar botom when Load */
/*$('.right-content-messages').find('.gSearchResultAjax').clickPagination({ innerClass: ".gSearchResultAjaxInner", btnClass: '.loadMoreSearch'});*/
});

Searchrightbar = function(dsatS, isOnscroll) {
	dsatS.tag = dsatS.tag ? dsatS.tag : '';
	ssTagobj={};
	$(document).trigger('rightbar-search');
    isOnscroll = typeof isOnscroll !== 'undefined' ? isOnscroll : false;
    var returObj = {}
    var isDropdata = jQuery.isEmptyObject(fileAnadDash);
	var curTab = $('.right-content-'+dsatS.tabId);
	var searchKeys = dsatS.searchKey;
    var tabId = dsatS.tabId;
	var adHeight = ( dsatS.tabId == 'messages' ) ? -40 : 0; 
	if(!isOnscroll){
		curTab.block(rightLoder);
	}
    function generateSelect(dArray) {
        aReportsSelect = '';
        aFileSelect = '';
        if(fileAnadDash.files) {
	        $.each(fileAnadDash.files, function(i, e) {
	            selected = ($.inArray(this.id, dArray.liveSpaceId) == -1 || dArray.liveSpaceId == 'undefined') ? ' ' : 'selected';
	            //selected = (this.selected == '') ? ' ' : 'selected';
	            aFileSelect = aFileSelect + '<option value="' + this.id + '" ' + selected + ' >' + this.name + '</option>';

	        });
	    }
    	if(fileAnadDash.reports) {
	        $.each(fileAnadDash.reports, function(i, e) {
	            aReportsSelect = aReportsSelect + '<optgroup  label="' + i + '">';
	            $.each(e, function(a, x) {

	                selected = ($.inArray(this.id, dArray.liveAppsId) == -1 || dArray.liveAppsId == 'undefined') ? ' ' : 'selected';
	                aReportsSelect = aReportsSelect + '<option value="' + x.id + '" ' + selected + '>' + x.name + '</option>';

	            })
	            aReportsSelect = aReportsSelect + '</optgroup>';
	        });
	    }
    };



    /*if ( $.fn.ajaxSlide().isOpen() == false ){
    		$.fn.ajaxSlide({data:"<img src='/ui-themes/trigata/images/spinner.svg'> Loading Search results", width:600});
    		$.fn.ajaxSlide({data:template,width:570, fullHeight:true, class:'fixed'});
    		
    }*/
    getFileAnadDash = $.Deferred();
    if (isDropdata) {
        $.getJSON('/search.dropdown'+$app.queryString(), function(d) {
            fileAnadDash = d.Body;
            generateSelect(dsatS);
            getFileAnadDash.resolve();
        })
    } else {
        generateSelect(dsatS);
        getFileAnadDash.resolve();
    }




	
    if ( $.trim(searchKeys).length !== 0  || tabId == 'messages' ) {
		
        //$('#searchButton i').toggleClass('icon-spinner  icon-spin icon-large clr_orange ');
        var ajaxUri = '/rightpanel.search'+$app.queryString();
        var page = 1;
        var dsatS = $.extend({
            // 'searchKey': searchKeys,
            'liveAppsId': $('#select_report').val(),
            'liveSpaceId': $('#select_apps_bcast').val(),
            'page': page,
			'tabId': tabId,
			'rowfilter':0
        }, dsatS);
		lastState = dsatS.liveSpaceId;
        /* Store Serch data for future use*/
        gSerch = dsatS;
        $.when(getFileAnadDash).done(function() {

            $.getJSON(ajaxUri, dsatS,
                function(d, s, jqXHR) {
					curTab.unblock();
					if(isOnscroll){
							if( dsatS.tabId =='messages'){
									curTab.find('.loadMoreSearchMsg').parent('div').remove();
									curTab.find('.broadCastUl').prepend(d.Body);
									$('.messageWraperRight').scrollTop(200);
									
								}
								else{
								curTab.find('.loadMoreSearch').parent('div').remove();
								curTab.find('.gSearchResultAjaxInner').append(d.Body);
									}
						}
					else{
							$('#rightTabul .tab'+dsatS.tabId+' a').tab('show');
							$('.right-content-'+dsatS.tabId).html(d.Body);
							//$('body').fixYw({ container: ".right-content-"+tabId+" .gSearchResultAjax",  toolHeight: (140+adHeight) });
							curTab.find('.gSearchResultAjax').clickPagination({ innerClass: ".gSearchResultAjaxInner", btnClass: '.loadMoreSearch'});
							$('.messageWraperRight').clickPaginationReverse({innerClass: ".broadCastUl", btnClass:'.loadMoreSearchMsg'});
							$('.right-content-messages').find('.gSearchResultAjax').perfectScrollbar('destroy');
							setTimeout(function(){makeChatScrollBottom()},100); 
 							 /*Messages Chat Scroll to Bottom*/
							
							
						}
				setMessageAreaHeight();/*Set BroadCst Container Height*/
				/*Dropdown functions*/
                    if (dsatS.tabId === 'files') {
                        curTab.find('#select_apps').html(aFileSelect).multiselect({
                            classes: 'multiSelectFlat noCurve',
                            noneSelectedText: 'Select Livespace',
                            close: function() {
                                gSerch.page = 1;gSerch.liveSpaceId = $('#select_apps').val(),gSerch.liveAppsId = '',Searchrightbar(gSerch);
                            }
                        });
                    }
				 
				  if (dsatS.tabId === 'messages' ) {
					  $('#add_broadcast_fld').elastic();
					  	/* initBcastLidDrop(curTab);*/
                        curTab.find('#select_appBcast').hide();
							autoCompleteBrd();
						lsb_id = $('#select_appBcast').val();
						updateSelctGrp(lsb_id);	

                    }
				 if (dsatS.tabId === 'dash' ) {
                      curTab.find('#select_report').html(aReportsSelect).multiselect({
                            classes: 'multiSelectFlat noCurve',
                            noneSelectedText: 'Select Dashboards',
                            close: function() {
                                gSerch.page = 1;gSerch.liveAppsId = $('#select_report').val(), gSerch.liveSpaceId = '',
                                Searchrightbar(gSerch);
                            }
                        });
                    };
				/*Dropdown functions end*/
                 }
            );

        });
    }
$.fn.resizeMesssageScrollWindow();
   
};


$(function(){
	
/*  Broadcast Functions */	
setInterval(function(){activeBcastState()},500);
$('#ShowBroadcast,#ShowSearch').click( function(){
		if($('#rightPanFilter').length==1){
			 rightBarFn('filter').close();
		}
        var tabName = $(this).attr('data-tab-open'); 
		rightBarFn().open(tabName);
		makeChatScrollBottom()
       /* $.ajax({url:"/rightpanel.setcookie", data:{panel:'open'},
                    type:'GET',
                    success: function(data){ 
        }});*/
	}); 
	
	});