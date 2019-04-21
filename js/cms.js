//Javascript
  var getPreview = function(obj){
		settings = $.extend({
				container:$('.file_preview'),
				url:''
		},obj);

		$.getJSON( settings.url, {},
			function( d, s, jqXHR ){
				settings.container.html(d.Body).fadeIn();
				var cbJs = function(){
					eval(d.Refs['js-code']);
				};
				if(d.Refs['js'].length > 0){
					head.js(d.Refs['js'], cbJs);
				}else{
					cbJs();
				}
		});
  };
if(typeof fileAnadDash == 'undefined'){
var fnApplySearch,slideTemplate,globalSearch,gSerch={},DropStatus, site_base_url = '/',fileAnadDash={},aData, aReportsSelect ='',aFileSelect ='',
	loadInbox;
$(document).ready(function(){
	//////////Make MENU Button Active end Userlevel
	var section = $(".section").val();
	switch(section){
	case "portals"://lsfiles
			//$("#mls").addClass("open");
			$("#leftDocs").addClass("active");
			$("#livespacelist").addClass("active");
			break;
	case "leftoverview"://leftoverview
			//$("#mls").addClass("open");
			$("#leftoverview").addClass("active");
			$("#livespace").addClass("active");
			break;	
	case "leftLiveapps"://leftoverview
			//$("#mls").addClass("open");
			$("#leftLiveapps").addClass("active");
			$("#livespacelist").addClass("active");
			
			break;	
	case "leftLiveappsView"://leftoverview
			//$("#mls").addClass("open");
			$("#leftLiveapps").addClass("active");
			$("#livespacelist").addClass("active");
			break;
			
		case "lsDash"://leftoverview
			//$("#mls").addClass("open");
			$("#overview").addClass("active");
			$("#livespacelist").addClass("active");

			break;
			
					
	case "leftdash"://leftoverview
			//$("#mls").addClass("open");
			$("#leftdash").addClass("active");
			$("#dbd").addClass("active");
			//$("body").addClass("inox");
			break;	
	case "lefthelp"://leftoverview
			//$("#mls").addClass("open");
			$("#lefthelp").addClass("active");
			break;	
	case "portals-col"://lsfiles
		//	$("#mls").addClass("open");
			$("#leftDocs").addClass("active");
			$("#livespacelist").addClass("active");
			break;
	case "portals-prev"://lsfiles
			$("#mls").addClass("open");
			$("#leftDocs").addClass("active");
			$("#livespacelist").addClass("active");
			break;			
		case "deals"://lsfiles
			$("#mls").addClass("open");
			$("#leftLiveapps").addClass("active");
			$("#livespace").addClass("active");
			break;			
	case "leftInbox"://inbox
			$("#envelope").addClass("active");
			$("#leftInbox").addClass("active");
			$("body").addClass("inox");
			break;	
	case "leftDraft"://draft
			//$("#mls").addClass("open");
			$("#leftDraft").addClass("active");
			break;	
	case "leftSentbox"://sentbox
			//$("#mls").addClass("open");
			$("#leftSent").addClass("active");
			$("#livespacelist").addClass("active");
			break;	
	case "leftUsers"://shared user
			//$("#mls").addClass("open");
			$("#leftUsers").addClass("active");
			$("#livespacelist").addClass("active");
			break;			
	case "leftGroup"://leftGroup Shared group
			$("body").addClass("inox");
			$("#leftGroup").addClass("active");
			$("#admin").addClass("active");
			break;			
	case "leftBroadcast"://leftBroadcast
			$("#mls").addClass("open");
			$("#leftBroadcast").addClass("active");
			$("#livespacelist").addClass("active");
			break;	
	case "left-dna"://storage
			$("#left-dna").addClass("active");
			$("#livespace").addClass("active");
			break;
	case "left-dna"://storage
			$("#left-doc-usg").addClass("active");
			$("#livespace").addClass("active");
			break;		
	case "dbd"://dashboard
			$("#dbd").addClass("active");
			break;
	case "usr-list"://user-list
			$("#admin").addClass("active");
			$("#usr-list").addClass("active");
			$("#useractive").addClass("active");
			break;
	case "user-grp-list"://user-group-list
			$("#admin").addClass("active");
			$("#usr-list").addClass("active");
			$("#admin").addClass("active");
			
			break;	
		case "workflow"://user-group-list
			//$("#usr").addClass("active, open");
			$("#workflow").addClass("active");
			$("#admin").addClass("active");
			
			break;			
	case "usr-per"://user-permission
			//$("body").addClass("inox");
			$("#usr-list").addClass("active");
			$("#admin").addClass("active");
			break;	
	case "ls_storage"://user-permission
			//$("#usr").addClass("active, open");
			$("#left-storage-mapping").addClass("active");
			$("#admin").addClass("active");
			break;					
	case "grp-list"://group-list
			//$("body").addClass("inox");
			$("#grp-list").addClass("active");
			$("#admin").addClass("active");
			break;
	case "livespacelist"://leftBroadcast
  			//$("body").addClass("inox");
			$("#livespace").addClass("active");
			$("#livespacelist").addClass("active");
			break;		
	case "grp-per"://group-per
			//$("body").addClass("inox");
			$("#grp-list").addClass("active");
			$("#admin").addClass("active");
			break;	
	case "grp-user"://group-per
			//$("body").addClass("inox");
			$("#grp-list").addClass("active");
			$("#admin").addClass("active");
			break;					
	
	case "scnf"://storage
			$("#left-storage-conf").addClass("active");
			$("#admin").addClass("active");
			break;
	case "left-storage-dash"://storage
			$("#left-storage-dash").addClass("active");
			$("#admin").addClass("active");
			break;	
	case "left-storage-cloud"://storage
			$("#left-storage-cloud").addClass("active");
			$("#admin").addClass("active");
			break;			
	case "left-livecloud-connection"://storage
			$("#left-livecloud-connection").addClass("active");
			$("#admin").addClass("active");
			break;			
	case "left-livecloud-source"://storage
			$("#left-livecloud-source").addClass("active");
			$("#admin").addClass("active");
			break;			
	case "left-livecloud-dataset"://storage
			$("#left-livecloud-dataset").addClass("active");
			$("#admin").addClass("active");
			break;	
		
	case "left-workflow"://storage
			$("#left-workflow").addClass("active");
			$("#admin").addClass("active");
			break;		
	case "workflow-new"://storage
			$("#left-workflow").addClass("active");
			$("#admin").addClass("active");
			break;		
	case "users-globalsettings"://storage
			$("#users-globalsettings").addClass("active");
			$("#admin").addClass("active");
			break;		
	case "members-globalsettings"://storage
			$("#members-globalsettings").addClass("active");
			$("#admin").addClass("active");
			break;	
	case "roles-globalsettings"://storage
			$("#roles-globalsettings").addClass("active");
			$("#admin").addClass("active");
			break;			
	case "tntdatb"://tenant  database
			$("#tntdatb").addClass("active");
			break;		
case "admin"://tenant  database
			$("#admin").addClass("active");
			$("#admin").addClass("active");
			break;		
	default:
			//$("#mls").removeClass("open");
			break;
}

$("body").click(function(){
$(".alert").remove();
});

$("body").on("click",".mainmenu", function(){
		if ($(this).closest('open')){
			$(this).find('.arrow').toggleClass(' icon-chevron-down ');}
	else{
			$(this).find('.arrow').toggleClass(' icon-chevron-right ');
	}

});


$("body").on("click",".flttab-save", function(){
			$('.filter-name-div').toggle();

});

	///////SET DEFAULT LIVESPACE
	$("body").on("click",".set-default", function(){
		var tr=$(this).closest('tr');
		var obj=$(this);
		var myarr = $(this).attr("id").split("_");
		var id = myarr[1];
		if(confirm('Are you sure, make this as your default LiveSpace?')){
		  $.ajax({
			  type: "POST",
			  url: "/ls/livespace.lsdefault/"+id,
			  cache: false,
			  beforeSend: function(){},
			  success: function(data){
				  eval(data);
				  return false;
			  }
		  });
		}
		
	});
	$("body").on("click",".rep-unplugfrmdash", function(){
		var tr=$(this).closest('tr');
		var obj=$(this);
		var myarr = $(this).attr("id").split("_");
		var id = myarr[1];
		if(confirm('Are you sure, you want to remove this dashboard from home page ?')){
		  $.ajax({
			  type: "POST",
			  url: "/ls/liveapps.unplugdash/"+id,
			  cache: false,
			  beforeSend: function(){},
			  success: function(data){
				  $app.setMessage( 'Selected Dashboard is no longer a landing page!! ', 'success' );
				  $app.FnRefresh();
				  return false;
			  }
		  });
		}
		
	});
	function getQueryParam(param) {
		var result =  window.location.search.match(
			new RegExp("(\\?|&)" + param + "(\\[\\])?=([^&]*)")
		);

		return result ? result[3] : false;
	}
	//Create Dialog
	/******************** CREATE NEW ************************/
	var createDialog;  
	$.fn.createDialog = function(e){
	 var divId		= e.data.divId;
	 var dTitle		= e.data.title;
	 var dWidth		= e.data.width;
	 var dHeight	= e.data.height;
	 var name		= $(this).attr("name");
	 var txtId		= e.data.txtId;
	 var ajaxUrl	= e.data.ajaxUrl;
	 var targetUrl	= e.data.targetUrl;
	 var menuId		= e.data.menuId;
	 var cssClass = e.data.cssClass;
	 var save_btn	="Save";

	 var section=$("#"+divId+" #section").val();
	 var portalId;
	 if(section=="lapps"){
	  portalId = $("#portalId").val();
	 }else{
	  portalId =$("#lspaceId").val();
	 }
	// $("#"+txtId).val("");
	
	 //check if it is adoc 
	 var dType		= e.data.dType;
	 
	if(dType=="lsGroup" || dType=="tags" || dType=="fileshare" ||  dType=="setLandingGlobal"){
		//$('#arrangeDashBoard ').removeClass('selected');
		var x = $.map($(".tile-item.selected"), function(e){ return e.id; });
		
		if(dType == 'lsGroup'){
			var selection  				= [];
				$.map($(".tile-item.selected"), function(e){ 
					selection.push(e.id);  
				});
				$.map($("tr.selected"), function(e){ 
					selection.push(e.id); 
				});
			//For moving collection identify file type for listing corresponding collections in thelist
			var selArray = selection[0].split('_');
			var miType   = selArray[5];
      		if( miType == "docs" ){
				$('select[name="sele_group_id"]').find('optgroup#col_temp').hide();
				$('select[name="sele_group_id"]').find('optgroup#col_temp').children().hide();
				$('select[name="sele_group_id"]').find('optgroup#col_docs').show();
				$('select[name="sele_group_id"]').find('optgroup#col_docs').children().show();


			} else{
				$('select[name="sele_group_id"]').find('optgroup#col_docs').hide();
				$('select[name="sele_group_id"]').find('optgroup#col_docs').children().hide();

				$('select[name="sele_group_id"]').find('optgroup#col_temp').show();
				$('select[name="sele_group_id"]').find('optgroup#col_temp').children().show();


			}
		}

		if(x.length==0)return false;
	}
	
/*	$('#dvLoading').show();
	$('#dvLoading').fadeOut(3000);*/
	$("#"+divId).dialog({
				  modal: true,
				  show: "blind",
				  hide: "blind",
				  dragStart: function( event, ui ) { try { $('.ui-dialog').find("select").not('noselect').select2("close");} catch(s){}},
				  beforeClose: function( event, ui ) { try { $('.ui-dialog').find("select").not('noselect').select2("close"); } catch(s){}},
				  title: dTitle,
				  width: dWidth,
				  buttons: {
						Save: {

							text:save_btn,
							click:function() {	
								if(dType=="liveapps" ){
									var paramValArray= $("#lspaceinfo").val().split('-');
									portalId	= paramValArray[1];
									var uid		= paramValArray[0]
								}
								if($("#"+txtId).val() != "") {
									$('#hide-all').show();
									var dataString ={
										'txtId':$("#"+txtId).val(),
										'portal_id':portalId,
										'uid'	   : uid
									};
									var selection  				= [];
									$.map($(".tile-item.selected"), function(e){ 
										selection.push(e.id);  
									});
									$.map($("tr.selected"), function(e){ 
										selection.push(e.id); 
									});
									dataString['selection'] 	= selection; 

									if(dType=="lsGroup" ){
										dataString['sele_group_id']=$("#sele_group_id").val();
									}else if(dType=="tags" || dType=="fileshare"){
										if($("#sectionId").val()!=""){
											var sId		  		=$("#sectionId").val();
											var sectionArray	= sId.split('-');
											var mainId	 	 	= sectionArray[1];
											ajaxUrl		 		 = ajaxUrl+"/"+mainId;
										}
										dataString['group_id']		=	$("#hid_group_id").val();
										var tagString=$('#ls-tags').val();
										dataString['tags']=tagString;
										ajaxUrl		  = ajaxUrl+window.location.search;
									}else if(dType=="analytics" ){
										dataString['chart_type']		=	$("#schart_type:checked").val();
										dataString['chart1_type']		=	$("#sel_chart1_type").val();
										dataString['title']				=	$("#"+txtId).val();
										dataString['description']		=	$("#apps_description").val();
										dataString['is_editable']		=	$("#is_editable").val();
										dataString['edit_activity_id']	=	$("#edit_activity_id").val();
									}else if(dType=="setLanding" ){
										var stAr 	= targetUrl.split('-');
										/*Call from Global Settings page*/
										if(stAr.length==2 && stAr[0] == 'settings'){
											dataString['selection'] 	= $.map($("tr.selected"), function(e){ return e.id; });
										/*Call from Livespace Members page*/
										}else if(stAr[0] == 'members'){
											var selection  				= [];
											$.map($(".tile-item.selected"), function(e){ 
												selection.push(e.id);  
											});
											$.map($("tr.selected"), function(e){ 
												selection.push(e.id); 
											});
											dataString['selection'] 	= selection;

										}
									}

									if(dType=="lsGroup" || dType=="tags" || dType=="fileshare"){
									
										$.ajax({
											type: "POST",
											url: ajaxUrl,																
											cache: false,
											data:dataString,
											success: function(data){
												$('#hide-all').hide();
												$("#"+divId).hide().dialog( "close" );
												eval(data);
											}
										});
									} else{
										
										$.ajax({
											type: "POST",
											url: ajaxUrl,																
											cache: false,
											data:dataString,
											success: function(data){
												$('#hide-all').hide();
												$("#"+divId).hide().dialog( "close" );
												if(dType=="analytics" ){
													 var paramValArray= $("#lspaceinfo").val().split('-');//getQueryParam("_ls").split('-');
													 window.location.href="/v2/portals/add_analytics/"+paramValArray[1]+"/"+paramValArray[0]+"/create";
												}else if(dType=="liveapps" ){
													eval("$('table.data-table').dataTable().fnDraw()");
													//window.location.href="/ls/livespace/liveapps.html/"+window.location.search;
												}else if(dType=="setLanding"){
													var st 		= targetUrl;
													var stAr 	= st.split('-');
													// Call from Global Settings page
													if(stAr.length==2 && stAr[0] == 'settings'){
														eval("$('#gridMembers').find('table.data-table').dataTable().fnDraw()");
													}else if(stAr[0] == 'members'){
														eval("$('#tileListViews').dataList();");
													}else{
														rurl 	= "/ls/livespace/shared/users.html" + window.location.search;
														$app.setMessage("Landing page set successfully for the selected Members","success");
														$('table.data-table').each(function() {($(this).dataTable().fnDraw());});
													}
													//rurl 		= "/ls/livespace/shared/users.html" + window.location.search;
												}
											}
										});
									}
								}
							}
						},
						Cancel: function() {
							if(dType=="tags" || dType=="fileshare"){
								$('div.select2-drop').hide();
								$('li.select2-search-choice').remove();
								$('#ls-tags').val('');
								$('#ls-fileshare').val('');								
							}
							$( this ).dialog( "close" );
						}
					},//button
					close: function () {
							if(dType=="tags" || dType=="fileshare"){
								$('div.select2-drop').hide();
								$('li.select2-search-choice').remove();
								$('#ls-tags').val('');
								$('#ls-fileshare').val('');								
							}
							$(this).dialog('destroy');
					}
				});
				$('.ui-dialog').addClass(cssClass+" customUiDialog"); 
				$(".select2-search-field input").focus();
				$('body').on('mouseover',  "#"+divId+' .select2-container-multi', function(){
					
					$(".select2-search-field input").focus();
							
				});
				
				$(".ui-dialog-buttonset button").addClass("btn  btn-primary");
				
				return false;
	} 

	//COMMON FUNCTION FOR broadcast ATTACHMENT Preview[INBOX,SENTBOX AND BROADCAST]
	$(".attach-preview").on("click",function(){
		var fileId	= $(this).attr('name');
		var fileName = $('#attach-preview-'+fileId).attr('title');
		var Id		= $(this).attr('id');
		var lsInfo	= fileId.split('_');//
		var owner 	=	lsInfo[1];
		$.post('/ls/livespace/broadcasts.preview/'+lsInfo[0]+'?_ls='+owner,function(data) {
			var dat_pp = data.Body;
			$('#previewModal .modal-body').html(dat_pp);
			$('#previewModal .modal-title').html(fileName);
			$('#previewModal').modal('show');
		});
		
	});	
	$('#previewModal .close').on("click",function(){
		$('#previewModal .modal-body').html('');
	});
	
	/* Delete Tag From livespace -Tag list and Collection List
	*/
	////////Delete Tags Permanently based on livespaceId
	
	$("body").on("click",'.tag-remove',function(){
		var cId;
		var $grid	  	= $('table.data-table').dataTable();
		var tagId   	= $(this).data('id');
		var tagName	  	= tagId; //$(this).parent().find('span').text();
		var cnfm 	  	= false;
		var dataString 	= "tag="+tagName+"&remove=true";
		if(confirm('Are you sure, selected tag will be deleted permanently?')==true){
			$.ajax({
				type: "POST",
				url: "/ls/tags.delete/"+$app.queryString(),
				cache: false,
				data:dataString,
				success: function(data){
					$(".tag-"+tagId).closest('.file').remove();
					if($('.tag-remove').closest('.file').length==0){
					 	$('div .list-files').html('No tags created');
					}
					$("section.dataList").dataList();
					$grid.fnDraw();
				}
				});
		}
		return false;	
	
	});

	$("body").on("click",'.tag-favorite',function(){
		var tag  		= 	$(this).closest('li.file').find('span').text();
		//var tag			=	$(this).attr('id');
		var par 		= 	$(this).closest('li.file');
		var flag 		=	1;
		isFav = par.hasClass('favorite');
		if(isFav){
			$(this).find('i').switchClass('fa-star', 'fa-star-o');
			flag = 1;
		}
		else{
			$(this).find('i').switchClass('fa-star-o','fa-star');
			flag = 2;
		}
		var ajaxUri	=	'/ls.rightbar'+$app.queryString();
		$.getJSON(ajaxUri, {
            'params': 'tag_fav',
            'tag'   : tag,
            'flag'  : flag
        },
        function (d, s, jqXHR) {	        	
	        }
    	);

		par.toggleClass('favorite');
		$(this).addClass('bounce');
		return false;	
	});
	
/*ie solve placeholder*/
if (navigator.userAgent.match(/msie/i) ) {
$('[placeholder]').focus(function() {
var input = $(this);
if (input.val() == input.attr('placeholder')) {
input.val('');
input.removeClass('placeholder');
}
}).blur(function() {
var input = $(this);
if (input.val() == '' || input.val() == input.attr('placeholder')) {
input.addClass('placeholder');
input.val(input.attr('placeholder'));
}
}).blur().parents('form').submit(function() {
$(this).find('[placeholder]').each(function() {
var input = $(this);
if (input.val() == input.attr('placeholder')) {
input.val('');
}
})
});
}
/*ie solve placeholder*/

/*Home user page Activity and grid height manage as equall*/
	var lt = $(".home_lt").height();
	var rt = $(".home_rt").height();
		if(lt>rt) {
					$(".home_lt").height(rt);
					} 
		else {
					$(".home_rt").height(lt).find('.scrollable:first').attr('data-height', lt-100);
		}
/*Home user page Activity and grid height manage as equall*/

/*********************************************
  			Global Search
**********************************************/
	
	//added for navigation bar global search
	
	$("#tipue_search_input").on('keypress',function(se) {
  		var searchKey = $('#tipue_search_input').val();
		if (se.which == 13 && $.trim(searchKey).length !==0 ) {
				se.preventDefault();
				var selhid = $('#selsrch').val();
				var defaults = {searchKey:searchKey,tabId:selhid,}
				gSerch = $.extend({}, defaults, aData);
				fnApplySearch(gSerch);
		 };
 	});
	
	$("#tipue_search_input").on('click',function() {
		glSerchlocal =  localStorageArray('recentSearch');
 		$("#tipue_search_input").cAutocomplete({ source:glSerchlocal, 
			 close: function( event, ui ) {
				var e = jQuery.Event("keypress");
				e.which = 13; 
				$("#tipue_search_input").trigger(e);
			}
		});
	});
		
	/* Custom Widget for global search in nav bar */	
	$.widget( "ui.cAutocomplete", $.ui.autocomplete, {
 			_renderMenu: function( ul, items ) {
			  var that = this;
			  $.each( items, function( index, item ) {
					that._renderItemData( ul, item );
			  });
			  var lts = '<li class="clearSearch"> <a id="ClearRecentSearchData"><i class="icon-remove-sign"></i> Clear all </a></li>'; 
 			  $(ul).addClass( "globelSearhTop").find('a').removeClass('ui-corner-all');
			  $(ul).append(lts);
			  $('#ClearRecentSearchData').on( 'click' , function(){
				  localStorage.removeItem('recentSearch');
				  $(ul).hide();
				 
				  })
			  
			}
 	 });
	
	$('body').on('click','.fselected a',function (e){  
	 	e.stopPropagation();
		$(this).addClass('active').blur();
		$('.fselected a').not( $(this) ).removeClass('active')
     	var search_r = $(this).attr('id'),  str ='';
     	$('#selsrch').val(search_r);
		aData.tabId = search_r; 
		if(search_r =='files' ){
			str = 'Files';
		}
		else{ 
			str = 'Dashboards';
		}
		$('#tipue_search_input').attr('placeholder', 'Search in '+str);
		/*var searchKey = $('#tipue_search_input').val();
	 	var url = "/user.home?q="+searchKey+"&key="+search_r;    
		if(searchKey !=''){
		$(location).attr('href',url);
		}*/
    });


    $('body').on('click','.top_search_input',  function () {      
	 	var e = jQuery.Event("keypress");
		e.which = 13; 
		$("#tipue_search_input").trigger(e);
    });
	  
	globalSearch = function (){
			var e = jQuery.Event("keypress");
			e.which = 13; 
			$("#tipue_search_input").trigger(e);
	};

    var searchKey = $('#searchq').val();
    if(searchKey!= ''){
    	$('#input-search-all').val(searchKey);
    	/*fnApplySearch();*/
    }
	
	//SELECT FILE OR DASHBORDS
	
//end
	
	/*
	$('body').on('change','#input-search-all',  function () {
        fnApplySearch();
    });
	$('body').on('focus','#input-search-all',  function () {
    	$('.ui-multiselect-close').trigger('click');
    });*/
	/*$('body').on('keydown','#input-search-all',  function (event) {
		var code = event.keyCode || event.which;
		 if(code == 13) { //Enter keycode
		 	event.preventDefault();
			$('.ui-multiselect-close').trigger('click');
			fnApplySearch();
         	return false;	
		}
		
    });*/

/*	$('body').on('change','#select_report,#select_apps',  function (event) {
		var tabId 		= $('#active_tab').val();
		var page 		= $('#page_id_'+tabId).val(1);
		fnApplySearch();
		return false;
 	});*/
	
	/*$('body').on('focus','.rpt .ui-multiselect',  function () {
    	//$('.search_tab #reports').trigger('click');
		$('.srch .ui-multiselect-close').trigger('click');
    });
	$('body').on('focus','.srch .ui-multiselect',  function () {
    	//$('.search_tab #files').trigger('click');
		$('.rpt .ui-multiselect-close').trigger('click');
    });
   	*/
	
$('body').on('click','.ad_set_but',  function (event) {
   		$('.ad_set').toggle();
 		
    });
  


	fnApplySearch = function (dsatS,isOnscroll) {
			/*Get DropDown*/
			$('#tipue_search_input').cAutocomplete( "close" ).blur();
			isOnscroll = typeof isOnscroll !== 'undefined' ? isOnscroll : false;
 			var lsearch = localStorageArray('recentSearch');
			if (  lsearch.indexOf(dsatS.searchKey) == -1 ){
					lsearch.push(dsatS.searchKey);
					/*console.log( lsearch.indexOf(dsatS.searchKey));*/
				}
 			localStorage.setItem('recentSearch', JSON.stringify(lsearch));
			var returObj = {}
			var isDropdata =  	jQuery.isEmptyObject(fileAnadDash);
			
			function generateSelect(dArray){
				aReportsSelect =''; aFileSelect =''; 
							$.each(fileAnadDash.files, function(i,e){
								selected = ( $.inArray( this.id, dArray.liveSpaceId ) == -1 || dArray.liveSpaceId == 'undefined' )? ' ':'selected';
								aFileSelect = aFileSelect+'<option value="'+this.id+'" ' +selected+ ' >'+this.name+'</option>';
								/*console.log(dArray.liveSpaceId)*/
							});
							$.each(fileAnadDash.reports, function(i,e){
								 aReportsSelect = aReportsSelect+'<optgroup  label="'+i+'">';
									$.each(e, function(a,x){
										
								selected = ( $.inArray( this.id, dArray.liveAppsId ) == -1 || dArray.liveAppsId == 'undefined' )? ' ':'selected';
								aReportsSelect = aReportsSelect+'<option value="'+x.id+'" ' +selected+ '>'+x.name+'</option>';
									
									})
								aReportsSelect = aReportsSelect+'</optgroup>';
							});
  					};

			tab = "<ul class=\"nav nav-tabs bor_no search_result mb0 \" style=\"margin-left:2%;\" >";
			tab += "<li class=\" search_tab active\"><a href=\"#files_search\" id=\"files\" class=\" bor_no  flo searchTab \" data-toggle=\"tab\"><i class=\"icon-file\"> </i> Files<\/a><div class=\"flo mt_10 srch\">  <\/div><\/li>";
			tab += "<li class=\"search_tab \"><a href=\"#report_search\" id=\"reports\" class=\" bor_no flo searchTab\" data-toggle=\"tab\"><i class=\"icon-bar-chart\"> </i>Dashboards<\/a><div class=\"flo mt_10 rpt\"><\/div><\/li><\/ul>";
 			var template = tab+"<div id=\"result_search\" class=\"tab-content  row-fluid\"><div  id=\"files_search\" class = \"files_search active tab-pane\"> <img src='/ui-themes/trigata/images/spinner.svg'>   <\/div><div id=\"report_search\" class = \"report_search tab-pane\"> <img src='/ui-themes/trigata/images/spinner.svg'> <\/div><\/div>";
			
				if ( $.fn.ajaxSlide().isOpen() == false ){
						/*$.fn.ajaxSlide({data:"<img src='/ui-themes/trigata/images/spinner.svg'> Loading Search results", width:600});*/
						$.fn.ajaxSlide({data:template,width:570, fullHeight:true, class:'fixed'});
						
				}
			getFileAnadDash = $.Deferred();
 			if(isDropdata){
				$.getJSON('/search.dropdown', function(d){
					fileAnadDash = d.Body;
					generateSelect(dsatS);
					/*console.log('Resolved '+new Date().getTime());*/
  					getFileAnadDash.resolve();
				})
			}
			else{
				generateSelect(dsatS);
				/*console.log('Resolved '+new Date().getTime());*/
				getFileAnadDash.resolve();
			}
				
		
				
			 
 		var searchKeys = $('#input-search-all').val();		
		var tabId 		= $('#active_tab').val();
		if(searchKeys!= ''){
   		$('#searchButton i').toggleClass('icon-spinner  icon-spin icon-large clr_orange ');
		var ajaxUri = '/search.content';
		var page = $('#page_id_'+tabId).val();
   		var dsatS =  $.extend( {
	            'searchKey': $('#input-search-all').val(),
	            'liveAppsId':$('#select_report').val(),
				'liveSpaceId':$('#select_apps').val(),
	            'page'		:page,
	            'tabId'     :$('#active_tab').val()
	        }, dsatS);
			/* Store Serch data for future use*/
		gSerch =  dsatS;
		$.when(getFileAnadDash).done(function () {
			
 		/*console.log('Start Exicute'+new Date().getTime())*/
	    $.getJSON(ajaxUri, dsatS,
	        function (d, s, jqXHR) {
	        	$('#searchButton i').removeClass('icon-spinner icon-spin icon-large clr_orange');
	        	$('#searchButton i').addClass('icon-search');
				
				if(isOnscroll == false){
				$.fn.ajaxSlide({data:template,width:570, fullHeight:true, class:'fixed'});
				}
				
				if(dsatS.tabId ==='files'  ){
						if(isOnscroll){
							
							 
							$('.gSearchResultAjax').find('.loadMoreSearch').parent('div').remove();
							$('.gSearchResultAjax').find('.gSearchResultAjaxInner').append( d.Body);
						 
							
						}	
							else
							{
								$('.files_search').html(d.Body).css('minHeight','5000');
								}
								
						
						$('#select_apps').html(aFileSelect).multiselect({classes:'multiSelectFlat noCurve',
						noneSelectedText: 'Select Apps',
						close: function(){ 
							gSerch.page = 1; 
							gSerch.liveSpaceId=$('#select_apps').val(),
							gSerch.liveAppsId = ''
							fnApplySearch(gSerch);
 						}});
						$('.search_result #files').tab('show');
						$('body').fixYw({ container: ".gSearchResultAjax",  toolHeight:206 });
				}
				else{
					$('.report_search').html(d.Body).css('minHeight','5000');
					
					 
 						 $('#select_report').html(aReportsSelect).multiselect({
							 classes:'multiSelectFlat noCurve',
							 noneSelectedText: 'Select Dashboards',
							 close: function(){
							gSerch.page = 1; 
							gSerch.liveAppsId = $('#select_report').val(),
							gSerch.liveSpaceId= '',
							fnApplySearch(gSerch);
							  
						}});
					$('.search_result #reports').tab('show');
					$('body').fixYw({ container: ".gSearchResultAjax",  toolHeight:240 });

				 };
		
			$('.messageWraperRight').clickPaginationReverse({innerClass: ".broadCastUl", btnClass:'.loadMoreSearchMsg'});	 
			$('.gSearchResultAjax').clickPagination({innerClass: ".gSearchResultAjaxInner", btnClass:'.loadMoreSearch'});
				 
				
 				
				
	        }
	    );
	
  			});
			
			
			
			}	
	}
/*  fnApplySearch end here  */



	/** AJAX PAGINATION**/
	function loading_show(){
        $('#loading').html("<img src='images/loading.gif'/>").fadeIn('fast');
    }
    function loading_hide(){
        $('#loading').fadeOut('fast');
    }                
    
 
	
	 $('body').on('click', '.searchItem .dwt',function(){ 
	 	el = $(this);
		el.addClass('fadeOutDown').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
     			$(this).removeClass('fadeOutDown');
   			 });
		
	 })
	
	

/*    $('body').on('click','#result_search .pagination_reports li.active',function(){
        var page 	= $(this).attr('p');

        var tabId	= $('.pagination_reports').attr("name");
        $('#active_tab').val(tabId);
		$('#page_id_'+tabId).val(page);
		fnApplySearch();
    });              
*/


	

 
//Settings page Dropdown Status function
DropStatus = function (t){
	var Text = t.find ('.dropdown-toggle .txt');
	var Selectedlist = t.find('.dropdown-menu li a.selected').length;
	var Selectedone = t.find('.dropdown-menu li a.selected').text();
	if (t.hasClass('ls-not-member')){
		var yy = Text.html('Not a member ');	
	}else if (t.hasClass('permi')&& Selectedlist == 0){	
		Text.html('Add Permission');
	}else if (t.hasClass('permi')&& Selectedlist>1){	
		Text.html(Selectedlist + ' Selected ');			
	}else if (Selectedlist>1){	
		Text.html(Selectedlist + ' Selected ');	
	}else if (Selectedlist == 1){	
		Text.html(Selectedone);
	}else if (t.hasClass('permi')&& Selectedlist ==1){	
		Text.html(Selectedone);	
   }else{
		  Text.html('Add Role');
	} 
	return false;
	
 }
 
 loadInbox = function (){
	 $.ajax({
		 url:'/inbox.list',
		 type:'GET',
		 success: function(data){
			 $.fn.ajaxSlide({
				 data:data.Body,
				 class:'fixed',
				 fullHeight: true,
				 });
			eval(data.Refs['js-code']);
			 }
		 })
	 }

 
});//jqury end

		(function ($) {
			$.fn.ajaxSlide = function (options) {
				$.fx.off = false;
				jQuery.fx.interval = 10;
				/*Options*/
				var settings = $.extend({
					container: "ul, li",
					width: 430,   
					wraper: window,
					class:'absolute',
					fullHeight: false,
					spinner:"<img src='/ui-themes/trigata/images/spinner.svg'>",
					loader:false,
					data: null,
					autoTop: false
				}, options);
				/*Options End*/
				var e = jQuery(this);
				var isSider = $('#style-switcher');
				$('#style-switcher i.switcher').unbind('click');
				slideTemplate += "<div id=\"style-switcher\" class=\"hidden-phone bor_gray_ccc\">";
				slideTemplate += "<i class=\"btn icon-remove-sign font_20 icon-white clr_orange switcher\"><\/i>";
				slideTemplate += "<span class=\"clr_gray mt10 clear\"> <\/span><div class=\"AjaxData\"><\/div><\/div>";
				isSider = $('#style-switcher');
				/* publicMethods */
				
				
				publicMethod =  {};
 				publicMethod.make = function(){
					$('#style-switcher').find('.AjaxData').html(settings.data).promise().done(function(){
						isSider.fadeIn().width(settings.width).animate({opacity:1, right:'-2px'},30).addClass('open '+settings.class);
					});
					if(settings.autoTop){
							$("html, body").animate({scrollTop:0});
						}
				};
				
				if(settings.fullHeight){
					$('body').fixYw({ container: "#style-switcher",  toolHeight:44, });
				}
				publicMethod.isOpen = function(){
					return  isSider.hasClass('open');
				};
				publicMethod.close = function(){
					$('#style-switcher').find('.AjaxData').html('');
					isSider.animate({opacity:'0'},30).removeClass('open '+settings.class).hide();
				};
				$('#style-switcher i.switcher').click(function(){
					publicMethod.close();
				});
				/* publicMethods */
 				if( isSider.length !== 0 && settings.data !== null){
						publicMethod.make();
				};
				/*Init Loader*/
				if(settings.loader){
					settings.data =  settings.spinner;
					publicMethod.make();
				}
				
 				return publicMethod;
 		
			};
		}(jQuery));
		};
		localStorageArray = function(name){
					var getLoacal =  localStorage.getItem(name);
					if( getLoacal == null  ){ 	recentResuts = [] }
					else{ recentResuts =  JSON.parse(getLoacal) };
					return recentResuts;
		};
 $(function() {    
        $('#input-search-recentactivity').on('keyup', function() {
          var rex = new RegExp($(this).val(), 'i');
            $('.searchable-container li').hide();
            $('.searchable-container li').filter(function() {
                return rex.test($(this).text());
            }).show();
        });
    });
 
 $('body').on('click','.rec .dropdown-menu li a',  function () {
		var rec = $(this).attr('id');
		if (rec=='monthly'){
			$('.rece_drop  span').html('Monthly');
						console.log(rec);
			}
			else if(rec=='weekly'){
				$('.rece_drop span').html('Weekly');
				console.log(rec);
				}
			else{
				
				$('.rece_drop span').html('Weekly');
				}	
    });
 
  

(function($) {
    $.fn.fixYw = function(options) {
        var settings = $.extend({
            container: "ul, li",
            toolHeight: 44,
			slimScroll:false,
            wraper: window
        }, options);
        var pageHeight = $(settings.wraper).height();
        var avilArea = pageHeight - settings.toolHeight;
        var e = jQuery(this);
        e.find($(settings.container)).css({
            height: avilArea,
        }).addClass('fixYw')
		$(settings.container).addClass('relative').perfectScrollbar({wheelPropagation:true});
        var elType = $(settings.container).prop('tagName');
         $(window).resize(function() {
            var pageHeight = $(settings.wraper).height();
            var avilArea = pageHeight - settings.toolHeight;
            e.find($(settings.container)).css({
                height: avilArea,
            }).addClass('newY')
         })
    };
}(jQuery));
(function ($){
    $.fn.clickPagination = function(options) {
	 	var settings = $.extend({
            innerClass: ".ajaxMsgInner",
            btnClass: '.loadMorebroadCast',
			adjust: 30,
      }, options);
	this.scroll(function(){
			var thisScroll = ( $(this).scrollTop());
			var thisHeight = ( $(this).height());
			var InnerHeight = $(this).find(settings.innerClass).innerHeight();
			thisScroll  += settings.adjust;
			if (thisScroll+thisHeight > InnerHeight ){
				 $(this).find(settings.btnClass+':last-child').trigger('click'); 
			}
	});
    return this;
    };
	
	 $.fn.clickPaginationReverse = function(options) {
	 	var settings = $.extend({
            innerClass: ".ajaxMsgInner",
            btnClass: '.loadMorebroadCast',
			adjust: 30,
      }, options);
	  $(this).on('scroll',function(){
		  var thisScroll = ( $(this).scrollTop());
 			if ( thisScroll + 10 < 11 ){
				$(this).find(settings.btnClass+':last-child').trigger('click'); 
			}
		  })
     return this;
    };
	
	
	$('body').on('keypress','#add_broadcast_fld', function(se){
			var tval = $(this).val();
				if ( se.which == 13 && ($.trim(tval).length != 0) ) { 
       				$("form#broad_cast_form").submit();
					return false;
				};
		});
	
	
	$.fn.resizeMesssageScrollWindow = function(options) {
 			$('body').on('resize keyup','#add_broadcast_fld', function(se){
				var tHeight = $(this).height();
			//	$('body').fixYw({ container: ".messageWraperRight",  toolHeight:20+tHeight, });/*Set BroadCst Container Height*/
					makeChatScrollBottom();
				});
		};
	
}( jQuery ));

