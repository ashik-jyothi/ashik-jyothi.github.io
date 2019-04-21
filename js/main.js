$(function(){
	$('body').on('click','.getNew', function(){
		var now = $.now();
		var href = $(this).attr('href');
		$(this).attr('href', href+'?t='+now);
		return true;
	});
	$('body').on('click', '.wrkfl-MenuBtn', function() {
		//$('.wfl-menu').toggle('');
		$('.stencilWrap').toggleClass('show');
	});
	$('body').on('click','.bcastNotifyLink',function(e){
		e.preventDefault();
		var lId = $(this).attr('id');
		var href = $(this).attr('href');
		if(!$app.activeLs || ($app.activeLs.lid != lId) ){
			window.location = href;
			$app.doAfter.push(function(){ 
			rightBarFn().open('messages');
			Searchrightbar({
		                "liveSpaceId": [lId],
		                "page": 1,
		                "tabId": "messages",
		                "searchKey": "",
		                "tag": ""
		            });
			});
		}else{
			rightBarFn().open('messages');
			Searchrightbar({
		                "liveSpaceId": [lId],
		                "page": 1,
		                "tabId": "messages",
		                "searchKey": "",
		                "tag": ""
		            });
		}
		
		});
		
	$('body').on('click','#notificationStatus',function(){
		$.ajax({
			url:'ls/livespace.lsmsgNotification'
			}).done(function(data){
				$('.notificationulList').html('');
				var makeTpl = function(obj){
				var	tpl = `
						<li> <a href="#${obj.url}" id="${obj.lid}" class="bcastNotifyLink" >
								<i class="im icon-speech"></i> <span>   ${obj.name} </span><strong>${obj.unreadmsg}</strong>
								</a>
							 </li>`;
						return tpl;
					};
			if(data.lsmsgcount.length){
				
			$.each(data.lsmsgcount, function(a,i){
					$('.notificationulList').append(makeTpl(i));
					});
					}else{
						$('.notificationulList').html(`<li><a> <span>   No unread notifications </span></a></li>`);
						}
				});
				
		
		});
	$('body').on('click','#support > a',function(){
		$('.tourlist').html(' <li class="disabled"><a href="#"> Fetching Data..</a></li>');
		$.ajax({
			url:'general.tourlist'
			}).done(function(data){
				$('.tourlist, .tourCreateOl').html('');
				if(data.permission){
					var isTAdmin = "";
				$('.tourCreateOl').append(`<ol class="shortcuts">
					<li><a href="/#tour.list"><span class="fa fa-pencil-square-o"></span> </a></li>
					<li><a id="createTour" >Create Tour</a></li>
					</ol>
					<li class="divider"></li>`);
				}else{
					var isTAdmin = "hide";
				}
					
				
				var makeTpl = function(obj){
				var active =  (obj.page == tourUrl()  ? "tourCurrentPage" : "");
				var	tpl = `
						<li class="${active}" > <a data-href="${obj.url}" id="${obj.tourid}" class="touritemlink" >
								<i class="im icon-playtour" aria-hidden="true"></i><span>   ${obj.name} </span>
								</a><a data-id="${obj.tourid}"  class="setTour ${isTAdmin}" title="Set as Global Tour"><i class="fa fa-question"</a>
							 </li>`;
						return tpl;
					};

					if(data.tList){
						$.each(data.tList, function(a,i){
							$('.tourlist').append(makeTpl(i));
						});
					}
			
				});
				
		
		});
		$('body').on('click','.touritemlink',function(){
			var url =$(this).data('href');
			$app.addJs(url);
			refresh4Tour();
		
		});
	//"use strict";
		$('body').on('click','.tag_wraper',function(){
		$(this).not('.inModal').clone().addClass('inModal').dialog(
		{	 minWidth: 450,
			title: "Edit Tags",
			buttons:[ 
			{ text: "Close", icons: { primary: "ui-icon-heart" },click: function() {   $( this ).dialog( "close" ); }}
		
		],
			 create: function( event, ui ) { $('.ui-dialog').addClass("customUiDialog"); $(".ui-dialog-buttonset button").addClass("btn  btn-primary"); }
		
		});
		});
	$.fn.uniform = function(){ return null;};
	$('.contentInner ').on('hashReady', function(e,args){
		$('body').fixYw({ container:'#ls', toolHeight:66 });
		setTimeout( function(){ 
			$('body').fixYw({ container: "#preview-div" , toolHeight:100  }); 
			//$('body').fixYw({ container:'.dropdownBelow:not(.noScroll)', toolHeight:160 });
			$('.dropdownBelow:not(.noScroll)').perfectScrollbar();
			 $('select').not('div.multiselect.o select, select.noselect').select2({minimumResultsForSearch: 5 });
			 // === Tooltips === //
		}, 1000);

	});
	
	
	var $grid  = $('#arrangeDashBoard');
	//$('body').addClass('showTagPanel'); 
	
	
	/*var $grid  = $('#arrangeDashBoard').masonry({
	  itemSelector: '.tile-item-wraper' ,
	  transitionDuration:0
	  
	});	*/
	
	$('body').on( 'ps-y-reach-end', '#arrangeDashBoard',function(){
		if(	$(this).closest('.listView').find('.addDashButton.nextDashButton').get(0)) {
			$(this).closest('.listView').find('.addDashButton.nextDashButton').get(0).click();
		}
		
	});
	
	$('body').on('click','.clWrap  .showHideTblCtrl',function(){
		console.log(56556);
			$(this).parent('.col-md-12').toggleClass('showmenu');
	})

	$('body').on( 'datalistdone', '.dTable',function(){
		if($(this).hasClass('tileView')){
			var arrangeDashBoardData =  $(this).find('#arrangeDashBoard').data();	
			//if(arrangeDashBoardData.masonry){
					//$('#arrangeDashBoard').masonry('destroy').masonry({itemSelector:'.tile-item-wraper', transitionDuration:0});	
				//}else{
					//$('#arrangeDashBoard').masonry('reloadItems').masonry({itemSelector:'.tile-item-wraper', transitionDuration:0});
					//$('#arrangeDashBoard').masonry({itemSelector:'.tile-item-wraper', transitionDuration:0});	
			//	}
	}
	heightFix();
	});
	
	$('body').on('click','a[data-view="tileView"]',function(e){
		$('.headerBelowButtonLeft ').removeClass('listView_wraper').addClass('tileView_wraper');
		e.preventDefault();
		$('#viewChange a').removeClass('Current');
		$(this).addClass('current');
		$('#ls').find('.vizTileContainer').removeClass('listView').addClass('tileView');
		//$('arrangeDashBoard').masonry('reloadItems');
		//$('#arrangeDashBoard').masonry('destroy');
		$('#arrangeDashBoard').scrollTop(0);
		//setTimeout(function(){ 	
			//  $('#arrangeDashBoard').masonry({ 
			// 	  itemSelector: '.tile-item-wraper' , transitionDuration:0}).masonry('layout'); heightFix();	},200);
			
	});
	$('body').on('click','a[data-view="listView"]',function(e){
		$('.headerBelowButtonLeft').removeClass('tileView_wraper').addClass('listView_wraper');
		e.preventDefault();
		$('#viewChange a').removeClass('current');
		$(this).addClass('Current');
		$('#ls').find('.vizTileContainer').removeClass('tileView').addClass('listView');
		//$grid.masonry('reloadItems');
		//$grid.masonry('destroy');
		heightFix();
	});
	
	$('body').on('change','.listView #arrangeDashBoard .customCheckBox input[type="checkbox"]', function() {
			var m = $(this).closest('.dataTable');
			var  selectSingle = m.is('.select-single');
			var itemList =  $(this).closest('.tile-item-wraper') ;
		 	if($(this).is(':checked')){
				$(this).closest('li').find('.dashwrap').addClass('selected').find('.dataCheck').addClass('active');
			 	if(selectSingle){
					/*if row selection is Single Unselect other Selections */
					$('.tile-item-wraper').not(itemList).find('.dashwrap') .removeClass('selected').find('.dataCheck').removeClass('active');
					m.find('input[type="checkbox"].checkBoxinput').not($(this)).prop('checked',false);
						}
		 }else{
			$(this).closest('li').find('.dashwrap') .removeClass('selected').find('.dataCheck').removeClass('active');
		 }
		checkParent();
		showActionPanel();
        
    });
	/*$('.listView .customCheckBox label').on('click', function(e){
		e.stopPropogation():
	});*/
	
	 $('body').on('change',' .customCheckBox.selectAll input[type="checkbox"]',function() {
		 
		 if($(this).is(':checked')){
			$('.contentInner').find('.customCheckBox input[type="checkbox"]').prop("checked", true);
			$('.contentInner').find('.dashwrap').not('.staticItem .dashwrap ').addClass('selected').find('.dataCheck').addClass('active');
		 }else{
			$('.contentInner').find('.customCheckBox input[type="checkbox"]').prop("checked", false);
			$('.contentInner').find('.dashwrap').removeClass('selected').find('.dataCheck').removeClass('active');
		 }
		
		 showActionPanel();
    });
	
	$('body').on('click', '.uploadTrigger', function(e){
		e.preventDefault();
		//alert($('.amazons3.upload_container input[type="file"]').html);
		$('.amazons3.upload_container input[type="file"], #click_up').trigger('click');
		
		
		
	});

	$('body').on('click', function(){
		//e.preventDefault();
		$('.tooltip').remove();
		//console.log('removetooltip');
	});
	
	// dna toggle desc
	$('body').on('click', ".desShowHide label", function(e){
		e.preventDefault();
		$('.desShowHide').toggleClass("show");
	});
	
	
	// workflow tree js
	
	$('body').on('click',".worflowLinkDelete", function(e){
		e.preventDefault();
		if(confirm("Are you sure, selected items will be deleted permanently?")){
			$.ajax({
			url:"/sys/ui/widgets/grids/datatable.an/delete/a%3A2%3A%7Bi%3A0%3Bs%3A30%3A%22Sys%5CControllers%5CWorkflow%5CList_%22%3Bi%3A1%3Bs%3A12%3A%22doListAction%22%3B%7D", 
			type:"POST", 
			data : {"action":"delete", "seln":[$(this).data("id")] },
			success : function(data){
				eval(data.Body.js);
				}
			});
		}
		
	});
	
	$('body').on('keyup','#worflowFilter',  function(){
		worklowFilter($(this).val(),'#workflowTreeContainer li', '.worflowLink');
	});	
	
	$('body').on('keyup','#searchWorflowDropTree input',  function(){
		worklowFilter($(this).val(),'#workflowDropDown li', '.worflowLink');
	});	
	
	$('body').on('mouseenter', 'span.filtCounting, .flttab-but2', function(){
		$('span.filtCounting, .flttab-but2').addClass('hover');
	});
	$('body').on('mouseleave', 'span.filtCounting, .flttab-but2', function(){
		$('span.filtCounting, .flttab-but2').removeClass('hover');
	});
	$('body').on('click', '.filtCounting', function(){$('.flttab-but2').click()})
	
	function worklowFilter(filter, elems, vals){
		filter = filter.toUpperCase();
		 $(elems).each(function(){ 
		  	var a = $(this).find(vals)	;
			var $wrkChild = $(this).children("span").children("a.worflowLink");	
			 if (a.html().toUpperCase().indexOf(filter) > -1) {
				$(this).show().parents('li').show();
				$wrkChild.addClass("searchHighliht");
			} else {
				$(this).hide().removeClass("searchHighliht");
				$wrkChild.removeClass("searchHighliht");
			}
			if(filter == ""){
				$(".searchHighliht").removeClass("searchHighliht");
				resetTreeView();	
			}
		});
	}
	
	

	
	$('body').on("click",' .tile-item-wraper:not(.staticItem)', function(e){
		var thisis = $(this);
		var isActionItems =  $(e.target).is('.checkBoxinput, .customCheckBox label');
		var isMultiple =  $(this).closest('.dataTable').is('.select-multiple');
		//console.log({isActionItems:isActionItems, isMultiple:isMultiple });
		var isLinkClick = $(e.target).is('.dashDetails a');
//		console.log(isLinkClick);
		if($('#ls').hasClass('showTileAction')){
			
			if (isActionItems === false && isMultiple ){
				checkit();
				checkParent();
				showActionPanel();
			}
		}else if($('section.dataTable').hasClass('listView')){
			if(isLinkClick === false)	{
				if (isActionItems === false && isMultiple ){	
					checkit();
					checkParent();
					showActionPanel();
				}
			}
		}
		
		function checkit(){
			e.stopPropagation();
			e.stopImmediatePropagation();	 
			e.preventDefault();
			if(!thisis.find('input[type="checkbox"]').is(':checked')){
				thisis.find('input[type="checkbox"]').prop("checked", true);
				thisis.find('.dashwrap').addClass('selected').find('.dataCheck').addClass('active');
				
			}else{
				thisis.find('input[type="checkbox"]').prop("checked", false);
				thisis.removeClass('selected');	
				thisis.find('.dashwrap').removeClass('selected').find('.dataCheck').removeClass('active');
			}	
		}
		
		
	});
	
	
	
	// menu search functions
	$('body').on(  'click ', '.dhd_name', function(){
		$('.breadcrumbDropDown_dash li').show();
		$('#searchDashmenu input').val("").focus();
	});
	$('body').on(  'mouseenter ', '.lsLinks', function(){
		$('#lsmenu input').focus();
		
	});
	
	$('body').on(  'click ', '.dropdownLsClick', function(){
		$('#lsmenu input').val("");
		$('.dropDownWrap  article').show();
		setTimeout( function(){$('#lsmenu input').focus();} ,100);
			
		
	});
	
	
	$('body').on('keyup','#searchDashmenu input',  function(){
		jqSimpleFilter($(this).val(),'.breadcrumbDropDown_dash li', 'span');
	});	
	$('body').on('keyup','#lsmenu input',  function(){
		jqSimpleFilter($(this).val(),'.dropDownWrap  article', 'span.titles');
	});	
	
	
	function jqSimpleFilter(filter, elems, vals){
		//console.log(filter+', '+elems+', '+vals);
		filter = filter.toUpperCase();
		 $(elems).each(function(){ 
		  	var a = $(this).find(vals)	;	
			 if (a.html().toUpperCase().indexOf(filter) > -1) {
				$(this).show();
			} else {
				$(this).hide();
			}
		});
	}
	
	
	
	
	function checkParent(){
		var check  = true;
		$('#arrangeDashBoard input[type="checkbox"]').each(function(){
			if(! $(this).is(':checked') ){
				check  = false;
				
			}
			
		});
		if(check === true){
			$('.customCheckBox.selectAll  input[type="checkbox"]').prop("checked", true);	
		}else{
			$('.customCheckBox.selectAll  input[type="checkbox"]').prop("checked", false);	
		}
	}
	
	function showActionPanel(){
		//console.log('dfdf');
		if($('#arrangeDashBoard  input[type="checkbox"]:checked').length > 0	){
			$('#ls').addClass('showTileAction');
		}else{
			$('#ls').removeClass('showTileAction');
		}
		heightFix();
	}
	
	function heightFix(){
		var Viewheight = 65;
		var timeDelay = 100;
		if($('section.dataTable').hasClass('tileView')){
			Viewheight = 70;
			if($('#ls').hasClass('showTileAction')){
				Viewheight = 90;
			}
			timeDelay = 100;
		}if($('section.dataTable').hasClass('listView')){
			Viewheight = 105;
			if($('#ls').hasClass('showTileAction')){
				Viewheight = 130;
			}
		}
		setTimeout(function(){ $('body').fixYw({ container: "#arrangeDashBoard",  toolHeight: Viewheight }); },timeDelay);	
		
		$('body').fixYw({ container:'#collection_side', toolHeight:100 });
		$('body').fixYw({ container:'#tag_side', toolHeight:100 });
		$('.dashtoolDropUl').perfectScrollbar();
	}
	
	$('body').on("click",'.dashIconWrap a',function(e){
		
		var isChack = $(this).is('.dataCheck');
		var isActiveItem = $(this).is('.active');
		var itemList =  $(this).closest('.tile-item-wraper') ;
		var m = $(this).closest('.dataTable');
		var  selectSingle = m.is('.select-single');
 		if(isChack){
			e.preventDefault();
			if(isActiveItem){
					itemList.find('.checkBoxinput').prop('checked',false);
					itemList.find('.dashwrap').removeClass('selected');
			}
			else{
					if(selectSingle){
						/*if row selection is Single Unselect other Selections */
						m.find('.tile-item-wraper').not(itemList).find('.checkBoxinput').prop('checked',false);
						m.find('.tile-item-wraper').not(itemList).find('.dashwrap').removeClass('selected');
						m.find('.tile-item-wraper').not(itemList).find('.dataCheck').removeClass('active');
						}
					itemList.find('.checkBoxinput').prop('checked',true);
					itemList.find('.dashwrap').addClass('selected');
			}
		}

		checkParent();
		showActionPanel();
		e.stopPropagation();
		$(this).toggleClass('active');
		//return false;
	});

	



	
	$('body').on('click','#searchToggle',function(e){
		e.preventDefault();
		closeFilterFn();
		rightBarFn().open();
	});	
	/*$('body').on('click','#messageToggle',function(e){
		 $('.fullRightBar').removeClass('fullRightBar');
		if( $('#content.isDash').hasClass('openfl')){
			$('#rightPanFilter').hide();
	   		$('#content.isDash, .headerBelowButtonRight').removeClass('openfl');		
		}
		rightBarFn().open('messages');
		  Searchrightbar({
	                "liveSpaceId": [$app.activeLs.lid],
	                "page": 1,
	                "tabId": "messages",
					"searchKey": "",
					"tag": ""
	            });
	});*/
	$('.closePanel').click(function(e){
		e.preventDefault();
		rightBarFn().contract(); 
		rightBarFn().close();
		$("body").find('table.ssform-enabled').find('tr').removeClass('selected'); 
	});

	//TileAction execute
	$.fn.tileAction = function(options){
		 var tileActionobj = options;
		};	
	
	$('body').on("shown.bs.tab","#reportTabEdit", function(e) {
		$(window).trigger('resize');
		Object.keys(vizCharts).forEach((a)=>{ vizCharts[a].highcharts().reflow() }); /* Redrow chart in new highchart 6.4 ,  $(window).trigger('resize') will not work in new version  */
		var Sid = $('.tab-pane.active').find('input[name="spreadCntKey"]');
		Sid.each(function() {
			eid = $(this).val();
			if (typeof eid != 'undefined') {
				hot3[eid].render();
			}
		});
	});
	
	
});

	rebuildAutoHeightWidgets = function(){
		Object.keys(gridster).forEach(function(item){ 
			$(` .tab-pane#${item} .gs-w.datalist[data-autoheight="true"]`).each(function(){
													el = $(this);
													var data  = gridster[item].serialize(el);
													var dataY =  Math.floor( (window.innerHeight - 150 ) / 98 );
													gridster[item].resize_widget(el, data[0].size_x, dataY,false );
													el.find( '.tileListViewsUl').attr( 'data-sizey-list',  dataY );
													el.find( '.objectContent').attr( 'data-sizey',  dataY );
												 
											});
	
	 });
	};

	function reTab(){
			
				$.each(Object.keys(dtl), function(a,i){
					var isExist =  $(dtl[i].selector).length;
					
					if(isExist){dtl[i].fnAdjustColumnSizing(false)	} 	 
				});
			/* $.each(dtl,function(index, value){
				setTimeout(function(){
					dtl[index].fnAdjustColumnSizing(false);
					$(window).trigger('resize');
				},100);
			});
				*/
			if(typeof(hot3) !== "undefined"){
				$.each(Object.keys(hot3),function(a,i){
					setTimeout(function(){
							hot3[i].render();
						},100);
				});
				}
			$('#arrangeDashBoard').masonry({itemSelector:'.tile-item-wraper', transitionDuration:0});	
	
		};
			
function urlEventss(hashurl){
	"use strict";
	$('.tooltip ').remove();
		
	if(hashurl.match('liveapps.edit')) {
		/* Close Rightbar if liveapp edit */
		 rightBarFn().clear(true); rightBarFn().close(); 
	}
	if(hashurl.match('liveapps.view')) {
		/* Close Rightbar if liveapp view */
		rightBarFn().close(); 
		$('body').addClass('dashBoardpage');
	}else{
		$('body').removeClass('dashBoardpage largeRightPanel');
	}
	if(hashurl.match('livespace.list')) {
		rightBarFn().close(); 
	}
	$('.showTileAction').removeClass('showTileAction');
	
	if((hashurl.match('livespace.list')) || (hashurl.match('workflow')) || (hashurl.match('administer')) || (hashurl.match('settings'))  || (hashurl.match('externaldata')) || (hashurl.match('storage'))  || (hashurl.match('user')) ) {
		rightBarFn().close(); 
	}
	
	if ((hashurl.match("livespace.html")) || (hashurl.match("collection.html")) || (hashurl.match("tags.html")) ){
		$('body').addClass('showTagPanel showRightPanel');
	}else{
		
		$('body').removeClass('showTagPanel');
		if(rightBarFn().isOpen() == false ){
			$('body').removeClass('showRightPanel');
			}
	}	
	$(".leftMenu li.current").removeClass('current');
	runtooltip();
	
	return;
}
$('#ls').on('hashReady',function(){
	if($("#headerBelow").length == 1){
		showPageTourIcon();		
	}
});

function runtooltip(){
	$('.tip').tooltip({container: 'body:first'});	
	$('.tip-left').tooltip({ placement: 'left' , container: 'body:first'});	
	$('.tip-right').tooltip({ placement: 'right' , container: 'body:first'});	
	$('.tip-top').tooltip({ placement: 'top', container: 'body:first' });	
	$('.tip-bottom').tooltip({ placement: 'bottom' , container: 'body:first'});	
	
}

function reloadBookmarks() {
	$.ajax({url:"/ls/shortcuts.shortcutlist",
        type:'GET',
        success: function(data){ 
			$("#bookmark_list").html(data.Body);
   	}});
}
function dolinkdin(){
	window.open("/ls/livespace.linkedinProfile", "Linkedin", "width=450,height=650");
	}
	
function resetTreeView(){
	$('#workflowTreeContainer, #workflowDropDown').find("span").find("i.icon-minus-sign").addClass("icon-plus-sign").removeClass("icon-minus-sign");
	$('#workflowTreeContainer').find(".worflowLink").attr("title", "Edit Workflow")
	$('#workflowTreeContainer ul li,  #workflowDropDown ul li').find("ul li").hide();	
}	
	