var elCol, closeAndDrager, addRepertTab, updateToolList ;
updateToolList = function () {
	$('.appChildItems').remove();
	const appid = $('[name=apps-id]').val();
	const ls = $app.queryString();
	template = {
		spreadsheet:function(obj){ return `<li class="appChildItems"> <a href="/ls/livespace.preview/${obj.fid}/${obj.cid}?_ls=${obj.uid}-${obj.lid}" class="ajax" data-width="100%" data-height="100vh - 40px" data-callback="updateToolList()" ><i class="im icon-lftPanel-spread"></i><strong>${obj.title}</strong> </a></li>`; },

		grid:function(obj){ return `<li class="appChildItems"> <a href="/analytics/grid.edit/${obj.fid}-${obj.uid}/0/app${ls}" class="ajax" data-width="100%" data-height="100vh - 40px" data-callback="updateToolList()" ><i class="im icon-lftPanel-grid"></i><strong>${obj.title}</strong></a><ul class="toolAppListControls"><li class="toolAppListControls-item toolAppListControls-delete"><span class="toolAppRemove" data-type="grid" id="${obj.fid}-${obj.uid}"><i class="icon-delete-bin circleHoverItem-after"></i></span></li></ul></li>`; },

		ssform:function(obj){ return `<li class="appChildItems" > <a href="/analytics/form.edit/${obj.fid}-${obj.uid}/0/app?_ls=${ls}" class="ajax" data-width="100%" data-height="100vh - 40px" data-callback="updateToolList()" ><i class="im icon-lftPanel-form"></i><strong>${obj.title}</strong> </a></li>`; },

		chart:function(obj){ return `<li class="appChildItems" > <a href="/analytics/chart.edit/${obj.fid}-${obj.uid}/0/app${ls}" class="ajax" data-width="100%" data-height="100vh - 40px" data-callback="updateToolList()" ><i class="im icon-lftPanel-chartpie"></i><strong>${obj.title}</strong> </a><ul class="toolAppListControls"><li class="toolAppListControls-item toolAppListControls-delete"><span class="toolAppRemove" data-type="chart" id="${obj.fid}-${obj.uid}"><i class="icon-delete-bin circleHoverItem-after"></i></span></li></ul></li>`; },

		card:function(obj){ return `<li class="appChildItems" > <a href="/analytics/card.edit/${obj.fid}-${obj.uid}/0/app${ls}" class="ajax" data-width="100%" data-height="100vh - 40px" data-callback="updateToolList()" ><i class="icon-card-setttings-build"></i><strong>${obj.title}</strong> </a><ul class="toolAppListControls"><li class="toolAppListControls-item toolAppListControls-delete"><span class="toolAppRemove" data-type="card" id="${obj.fid}-${obj.uid}"><i class="icon-delete-bin circleHoverItem-after"></i></span></li></ul></li>`; },

		datalist:function(obj){ return `<li class="appChildItems" > <a href="/analytics/datalist.edit/${obj.fid}/0/app${ls}" class="ajax" data-width="100%" data-height="100vh - 40px" data-callback="updateToolList()" ><i class="icon-list-grid"></i><strong>${obj.title}</strong> </a><ul class="toolAppListControls"><li class="toolAppListControls-item toolAppListControls-delete"><span class="toolAppRemove" data-type="datalist" id="${obj.fid}"><i class="icon-delete-bin circleHoverItem-after"></i></span></li></ul></li>`; }
	};
	$app.do({
		action:function(){
			$.ajax({
				url:`/ls/liveapps.toolbar/${appid}${ls}`,
				success:function(data){
					$.each(Object.keys(data.record),function(index,key){
						//console.log(index,key);
						data.record[key].forEach(element => {
							$(template[key](element)).appendTo(`.item_${key}`);

						});
					} );
				}
			});
		},
	time:100 });
};
function getWidth(){
	var n;
	var sidebar = $("body.viz-sidebar header").width();
	if($('.container-fluid').hasClass('isLiveAppsEdit')){
		n = (($(window).width()-535)/12);
		$('.gridster').width($(document).width()-sidebar-110);
		if (navigator.userAgent.indexOf("Firefox") > 0) {
			n = (($(window).width()-548)/12);
			$('.gridster').width($(document).width()-sidebar-135);
		}
	}else{
		n = (($(window).width()-454)/12);
		$('.gridster').width($(document).width()-sidebar-20);
		if (navigator.userAgent.indexOf("Firefox") > 0) {
			n = (($(window).width()-464)/12);
			$('.gridster').width($(document).width()-sidebar-60);
		}
	}
	return n;
}
function cr_ls_liveapps_html(crIndex, domCr){
	var lsOwner = $('#uid').val();
	var lsId 	= $('#lid').val();
	$cr			= $('.liveapps_dashboard');
	/*
	unsaved case for dashboard removed
		var dashId	= '';
		if( $('.liveapps_dashboard').find('input[type=hidden][name=apps-id]').length > 0){
			dashId	= $('.liveapps_dashboard').find('input[type=hidden][name=apps-id]').val() || "";
		}

		if(dashId !=""){
			var idArray = dashId.split('-');
			if(idArray[0]>0){
				liveAppId = idArray[0];
			}
		}
	*/
	var liveAppId =  $('[name="apps-id"]').val();
	var gAction  = $("input[name=mode]").val() == "new" ? `onclick="promptSave()" class="" ` : ` href="/ls/livespace/section.files/liveapp/${liveAppId}?_ls=${lsOwner}-${lsId}" class="ajax" data-width=\"100%\"  data-height=\"85vh\" `;
	gridTemplate = `<li class="gs-w" data-id="" data-app="">
					<div class="gridster-box">
						<div class=tName> </div>
						<article class="gridsterAddAction"> <a ${gAction} >Browse</a>
						<div class="dropdown FLO">
  <a class="dropdown-toggle"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
    New <i class="fa fa-caret-down"></i>
</a>
  <ul class="dropdown-menu">
    <li><a href="/ls/livespace/spreadsheet.html/report?_ls=${lsOwner}-${lsId}"  class=\"ajax \" data-width=\"100%\" ><i class="fa fa-file-excel-o"></i> Spreadsheet</a></li>
    <li><a href="/ls/liveapps/templates.html/report/grid/${liveAppId}?_ls=${lsOwner}-${lsId}"  class=\"ajax \" data-width=\"100%\" > <i class="fa fa-table"></i> Grid</a></li>
    <li><a href="/ls/liveapps/templates.html/report/chart/${liveAppId}?_ls=${lsOwner}-${lsId}"  class=\"ajax \" data-width=\"100%\" > <i class="fa fa-bar-chart"> </i> Chart</a></li>

  </ul>
</div>
<a class="rmgrid" id="">&#10006;</i></a>
</article>
<div class="objectContent"> <a class="ajax btn btn-default" data-width="100%" data-height="100vh - 40px" href="/ls/livespace/section.files/liveapp/${liveAppId}?_ls=${lsOwner}-${lsId}">Add  Element </a>  </div>
<div class="objectAction"> </div>
</div>
</li>`;
	/* Custom Code Start Here */

	colButton = '<div class=\"brs_file add_dh\" ><p> <i class=\"fa fa-plus-circle\" ></i>New</p><a href=\"/ls/livespace/spreadsheet.html/report?_ls='+lsOwner+'-'+lsId+'\"  class=\"ajax \" data-width=\"100%\"  title=\"Create Spreadsheet\"><i class=\"fa fa-file-excel-o\"  ></i><p>Spreadsheet</p></a><a href=\"/analytics/grid.new/report?_ls='+lsOwner+'-'+lsId+'\"  class=\"ajax \" data-width=\"100%\"  title=\"Create Grid\"><i class=\"fa fa-table\" ></i><p>Grid</p></a> <a href=\"/analytics/chart.new/report?_ls='+lsOwner+'-'+lsId+'\"  class=\"ajax \" data-width=\"100%\"  data-height=\"85vh\" title=\"Create Chart\" ><i class=\"fa fa-bar-chart\" > </i><p>Chart</p></a></div><div class=\"brs_file\" ><p><i class=\"fa fa-upload\" ></i> Browse</p><a href=\"/ls/livespace/section.files/excel?_ls='+lsOwner+'-'+lsId+'\"  class=\"ajax \" data-width=\"100%\"  data-height=\"85vh\" title=\"Browse Spreadsheets\" ><i class=\"fa fa-file-excel-o\" > </i><p>Spreadsheet</p></a> <a href=\"/ls/livespace/section.files/liveapp/${liveAppId}?_ls='+lsOwner+'-'+lsId+'\"  class=\"ajax \" data-width=\"100%\"  data-height=\"85vh\" title=\"Browse Grids\" ><i class=\"fa fa-table\" > </i><p>Grids</p></a> <a class=\"ajax\" data-width=\"100%\"  data-height=\"85vh\"  href=\"/ls/livespace/section.files/chart?_ls='+lsOwner+'-'+lsId+'\" title=\"Browse Charts\"><i class=\"fa fa-bar-chart\" > </i><p>Charts</p></a> <a class=\"ajax\" data-width=\"100%\"  data-height=\"85vh\" href=\"/ls/livespace/section.files/files?_ls='+lsOwner+'-'+lsId+'\" title=\"Browse Files\" ><i class=\"fa fa-file\" > </i><p>Files</p></a></div>';
	elCol = {


	    0: "<li class=\"clWrap\" name=\"tpl_0\"><ul class=\"col-md-12 column  code-drop-region-app dropup   \">"+colButton+"<\/ul><\/li>",

	    1: "<li class=\"clWrap\" name=\"tpl_1\"><ul class=\"col-md-6 column  code-drop-region-app dropup  ui-sortable \">"+colButton+"<\/ul><ul class=\"col-md-6 column  code-drop-region-app dropup  ui-sortable \">"+colButton+"<\/ul><\/li>",

	    2: "<li class=\"clWrap\" name=\"tpl_2\"><ul class=\"col-md-4  column  code-drop-region-app dropup  ui-sortable\">"+colButton+"<\/ul><ul class=\"col-md-4 column  code-drop-region-app dropup  ui-sortable \">"+colButton+"<\/ul><ul class=\"col-md-4  column  code-drop-region-app dropup  ui-sortable \">"+colButton+"<\/ul><\/li>",

	    3: "<li class=\"clWrap\" name=\"tpl_3\"><ul class=\"col-md-4 column  code-drop-region-app dropup  ui-sortable\">"+colButton+"<\/ul><ul class=\"col-md-8 column  code-drop-region-app dropup  ui-sortable \">"+colButton+"<\/ul><\/li>"

	};
	 closeAndDrager ='<span class="clsr"><i class="fa fa-remove"> </i> </span><span class="drgr"></span>';

	addRepertTab = function(){
		 var widgets = [


            [gridTemplate, 4, 2, 1, 1],
            [gridTemplate, 4, 2, 5, 1],
			[gridTemplate, 4, 2, 9, 1],
			[gridTemplate, 12, 3, 1, 3],


        ];
		var nextTab = $('#reportTabEdit li a.tabItem:last').data('tabcount')+1;
		nextTab		= nextTab || 1;
		templateNew = `<div   class="tab-pane " id="tab${nextTab}">

							<div class="clear"> </div>
							<div class="code-drop-div-app">
								<div  class=\"row-fluid  clearfix   dropZone\">
								<div class="gridster">
									<ul></ul>
								</div>
								</div>
								</div>
							</div>`;

		$('<li class="tab'+nextTab+'" ><a class="tabItem" data-tabcount="'+nextTab+'" href="#tab'+nextTab+'" data-toggle="tab">Tab '+nextTab+'</a><input type="text" data-tabOrder="'+nextTab+'" class=" ReportTabName" value="Tab '+nextTab+'" placeholder="Tab Name"></li>').insertBefore('#reportTabEdit li.BsAddTabli');
 		$(templateNew).appendTo('.LiveAppWraper .tab-content');
		$('#reportTabEdit a.tabItem:last').tab('show');
		gridster[`tab${nextTab}`]  = $('.tab-pane#tab'+nextTab).find('ul').gridster(

			{
					widget_base_dimensions: ['auto', 105],
					autogenerate_stylesheet: true,
					avoid_overlapped_widgets: true,
					namespace: '.tab-pane#tab'+nextTab,
					widget_selector:'li.gs-w',
					shift_widgets_up: false,
					max_cols: 12,
					max_rows: 40,
					widget_margins: [25, 25],
					draggable: {
						handle: '.gridsterAddAction'
					},
					resize: {
						enabled: true,
						stop:function(){$(window).trigger('resize')}
					}
				}

		).data('gridster');

		 $.each(widgets, function (i, widget) {
           gridster[`tab${nextTab}`].add_widget.apply(gridster[`tab${nextTab}`], widget)
        });


 	};


	 $('.LiveAppWraper ul#reportTabEdit a').on('click',  function(e) {
         e.preventDefault();
         isAddTab = $(this).hasClass('BsAddTab');
          if (isAddTab) {
			  addRepertTab();
			  showRemoveButton();
          } else {
             $(this).tab('show');

         }
		 $('.tab-pane.active').find('.code-drop-region-app:first-child').trigger('click');
		 // $('.tab-pane.active').find('.dropZone').addClass('ui-sortable');
		 setTimeout(function(){$(window).trigger('resize');},500);
     });

	$(domCr).on('keyup','.ReportTabName',function(){
		var tTitle = $(this).val();
		var order = $(this).data('taborder');
		if(tTitle !==''){$('#reportTabEdit').find('li.tab'+order+' a').html(tTitle);}
		else{$('#reportTabEdit').find('li.tab'+order+' a').html('Tab '+order);}
	});

	$(domCr).on('click','.RemoveTabAndItem ',function(e){
		e.preventDefault();
		e.stopImmediatePropagation();
		var isDone = confirm('Sure Want to delete this tab ');
		var order = $('.nav-tabs li.active  input').data('taborder');
		if(isDone){
		var pData = {
						liveapp_id :liveAppId,
						tab_id :  order
				   };
		$.post(  '/ls/liveapps.removetab/'+$app.queryString() ,
						pData ,
						function(data){
							$('.tab-pane#home-'+order).remove();
							$('.tab-pane#tab'+order).remove();
							showRemoveButton();
							$('#reportTabEdit').find('li.tab'+order).remove();
							$('#reportTabEdit a.tabItem:last').tab('show');
							delete(gridster['tab'+order]);
							delete(tabObjects['tab'+order]);
						});

		}
		return false;

	});
	$(domCr).on('change','.autoHeightToggle',function(){
		    var nval = $(this).is(':checked');
		    var el = $(this).closest('.gs-w');
			var activeTab = $('#reportTabEdit li.active a').data('tabcount');
			var data  = gridster['tab'+activeTab].serialize(el);
            var eHeight =  $(this).closest('.gs-w').find('.objectContent > div').height();
            var dataY =  Math.floor(eHeight/75);
            el.data('autoheight',nval);
            gridster['tab'+activeTab].resize_widget(el, data[0].size_x, dataY,false );
	});
	$(domCr).on('change','.realtimeToggle',function(){
		var nval = $(this).is(':checked');
		var el = $(this).closest('.gs-w');
		var activeTab = $('#reportTabEdit li.active a').data('tabcount');
		el.data('realtime',nval);
		var data  = gridster['tab'+activeTab].serialize(el);

		console.log(data);


});
	showRemoveButton();
	function showRemoveButton(){
		if ($('#contents .tab-pane').length <= 1 ) {
			$('.RemoveTabAndItem').hide();
		}else{
			$('.RemoveTabAndItem').show();
		}
	}



		$(domCr).on('click', '.Sblock',function() {
				var activeTab = $('#reportTabEdit li.active a').data('tabcount');
				var el = $('.LiveAppWraper').find('.tab-pane.active').find('.gs-w.active');
				gridObj = $('.LiveAppWraper').find('.tab-pane.active').find('div.gridster>ul').data('gridster');
				if(el.length ){ currentEl = el  } else{ currentEl = $('.LiveAppWraper').find('.tab-pane.active').find('.gs-w:last') }
				if(el.length == 0){
					var data = [{col:1,row:1,size_x:12,size_y:3}];
					dataCol  = "";
					dataRow  = "";
				}else{
					var data  = gridster['tab'+activeTab].serialize(currentEl);
					dataCol = ( data[0].col+data[0].size_x+1 > 13 ?  1 : data[0].col+data[0].size_x);
					dataRow =   ( data[0].col+data[0].size_x+1 > 13 ? data[0].row+data[0].size_y :  data[0].row );
				}

				var new_widget = gridObj.add_widget(gridTemplate, data[0].size_x,data[0].size_y,dataCol,dataRow);
				new_widget.click();
				return false;
		});

 	$(domCr).on('click', '.rmgrid',function() {
 		if($(this).attr('id')!=""){
 			$.get( '/ls/liveapps.contentremove/'+$(this).attr('id')+$app.queryString() ,
				function(data){
			});
		}
		gridObj = $('.LiveAppWraper').find('.tab-pane.active').find('div.gridster>ul').data('gridster');
		gridObj.remove_widget($(this).closest('.gs-w'));

		});
	$(domCr).on('click', '.rmColobj', function() {
				var el = $(this).closest('.gs-w');
				btnTemplate = `<a class="ajax btn btn-default" data-width="100%" data-height="100vh - 40px" href="/ls/livespace/section.files/liveapp/${liveAppId}?_ls=_ls=${lsOwner}-${lsId}">Add  Element </a>`;
				$.get( '/ls/liveapps.contentremove/'+$(this).attr('id')+$app.queryString() ,
					function(data){
						el.data('id','');
						el.find('.tName').html('');
						el.find('.objectAction').html('')
				 		el.find('.objectContent').html(btnTemplate);
					});
	});

	$(domCr).on('click','.clsr',function(){
	 		$(this).parent('.clWrap').remove();
	});
	// Show and hide title

	$(domCr).on('change','.titleHide',function(){
		var nval = $(this).is(':checked');
		var el = $(this).closest('.gs-w');
		var activeTab = $('#reportTabEdit li.active a').data('tabcount');
		el.data('tflag',nval);
		var data  = gridster['tab'+activeTab].serialize(el);
		//$('.code-save-btn-app').trigger('click');
	});

	$('.liveapps_dashboard').on('click', '.con_grid', function(ev){
		var flag = $(this).val();
		var $toggleFlag ;
		if(flag ==1){
			$toggleFlag = 0;
			$(this).removeAttr("checked");
		}else{
			$toggleFlag = 1;
			$(this).attr("checked","");
		}
		$(this).val($toggleFlag);
		var pData = {
						sstogrid_flag : $toggleFlag,
						datasource :  $(this).attr('name'),
						cntId 		: $(this).attr('id')
				   };
		$.post(  '/ls/liveapps.sstogrid/'+$app.queryString() ,
						pData ,
						function(data){
							$('.code-save-btn-app').trigger('click');
						});

	});
	$(".liveapps_dashboard").on('click', '.toolAppRemove', function(e){
     var pData = {
						objType :  $(this).attr('data-type'),
						objId 		: $(this).attr('id')
				   };
		$.post('/ls/liveapps.toolobjdelete/'+$app.queryString() ,
						pData ,
						function(data){
							updateToolList();
						});

	});
	$crMemory		= $('.liveapps_dashboard').find('ul.code-scratch-cr:first').empty();
	$('.liveapps_dashboard').on('change', 'select[name=layout]', function(ev){
		if($("#selected-layout").val()==$(this).val()){
			var appsId	= $('input[name=apps-id]').val();
			$app.FnRefresh();
		}else{
		$('.liveapps_dashboard').find('ul.code-drop-region-app > li').appendTo($crMemory.empty());
		$('.liveapps_dashboard').find('div.code-drop-div-app').load('/ls/liveapps.layout/' + $(this).val(), function(resTxt, resStatus, xhr){
			$crMemory.children('li').appendTo($('.liveapps_dashboard').find('ul.code-drop-region-app:first'));
		});
		}
	});
	$('.liveapps_dashboard').on('change click', 'select[name=lapps]', function(ev){
		if($(this).val()!=""){
			$app.FnRefresh();
		}
	});
	var formmodified=1;
	$('.liveapps_dashboard').on('click', 'button.code-save-btn-app', function(ev){
	    formmodified=0;
	    var selectedLayout = [];
		var xData = {
			lsId 	: $('.liveapps_dashboard').find('input[type=hidden][name=lid]').val(),
			uId	 	: $('.liveapps_dashboard').find('input[type=hidden][name=uid]').val(),
			title 	: $('.liveapps_dashboard').find('input[type=text][name=lapps_title]').val(),
			regions	: '',
			tabs    : $.map($('.liveapps_dashboard').find('ul#reportTabEdit li a.tabItem'), function(e){ return e.text; }),
			active_tab :$('.liveapps_dashboard').find('ul#reportTabEdit li.active a').data('tabcount'),
			active_cntId:$('.tab-pane.active').find('li.gs-w.active #widget').val()
		};
		var contentList = true;
		$.each(Object.keys(gridster),function(a,i){
		 tabObjects[i] = gridster[i].dashboard_widgets();
		});
		xData.regions = JSON.stringify(tabObjects);
		//Edit && Save
		var mode	= $('.liveapps_dashboard').find('input[type=hidden][name=mode]').val();
		var ahref;
		if(contentList){
			var title = $('.liveapps_dashboard').find('input[type=text][name=lapps_title]').val();
			if($.trim($('.liveapps_dashboard').find('input[type=text][name=lapps_title]').val())!=""){
				if(mode=='edit'){
					id		= $('.liveapps_dashboard').find('input[type=hidden][name=apps-id]').val();

					$.post(  '/ls/liveapps.save/'+id+$app.queryString() ,
						xData ,
						function(data){
							if(data==-1){
							$app.setMessage("Name already exists","danger");
							}else{
							$app.setMessage("Updated Successfully","success");
							$app.FnRefresh();
							}
						});
				}
				else{
					$.post( '/ls/liveapps.save'+$app.queryString() ,
						xData ,

						function(data){

							$app.setMessage("Saved Successfully","success");
							$app.doAction("#ls/liveapps.edit/"+$.trim(data)+'-'+$app.user.id+$app.queryString(),'redirect');

						});
				}
			}else{
				$app.setMessage("Please enter title","danger");
				return false;
			}
		}else{

			$app.setMessage("Sorry,you can't save/update without content","danger");
			if(mode=='edit'){
				//$app.FnRefresh();
			}

		}
	});


	//Remove liveapps
	$('.liveapps_dashboard').on('click', 'a.apps-remove', function(ev){
	    var cm	= false;
		cm	= confirm('Do you need to delete this liveapps?');
		if(cm==true){
			$.get( '/ls/liveapps.delete/'+$(this).attr('id')+$app.queryString() ,
				function(data){
						alert('Deleted');
						$app.doAction("/ls/liveapps.new/"+$app.queryString(),'redirect');
				});
		}
	});

	//Remove liveapps element
	$('.liveapps_dashboard').on('click', '.element-remove', function(ev){
		$(this).closest('li').remove();
	});
	/*************/

	$('.liveapps_dashboard').on('click', '.add-tab', function(){
	formmodified=0;
	$('ul.code-drop-region-app:first').clone().prependTo('#contents');
	var len	= $('ul.code-drop-region-app').length;

	$('ul.code-drop-region-app:first .tabtitle').val('Tab '+len);
	$('ul.code-drop-region-app:first>li').remove();
	$('ul.code-drop-region-app').removeClass('active');
	$('ul.code-drop-region-app:first').addClass('active');
	});


	/** Add GridchartTab button click **/
	 $('.liveapps_dashboard').on('click', '.add-grid-chart-tab', function(){
	 formmodified=0;
	 $('div.grid-chart-layout:first').clone().prependTo('#contents');
	 var len = $('div.grid-chart-layout').length;

	 $('div.grid-chart-layout:first .tabtitle').val('Tab '+len);
	 $('div.grid-chart-layout:first>ul.code-drop-region-app li').remove();
	 $('div.grid-chart-layout ul.code-drop-region-app').removeClass('active');
	 $('div.grid-chart-layout ul.code-drop-region-app:first').addClass('active');
	 });


	$('.liveapps_dashboard').on('click', '.add-grid-chart-tab-remove-tab', function(e){	e.stopPropagation();
	var len	= $('div.grid-chart-layout').length;
	if($(this).parents('div.grid-chart-layout').index()==0 && len==1){
		$('div.grid-chart-layout ul.code-drop-region-app:first .tabtitle').val('');
		$('div.grid-chart-layout ul.code-drop-region-app:first>li').remove();
		$('div.grid-chart-layout ul.code-drop-region-app:first').addClass('active');
	}else{
	var act = $(this).closest('div.grid-chart-layout').hasClass('active');
	if (act) {
		$(this).closest('div.grid-chart-layout ').unbind( "click" );
		$(this).closest('div.grid-chart-layout ').prev().addClass('active');

		}
		$(this).closest('div.grid-chart-layout').remove();
	}
	});


		$('.liveapps_dashboard').on('click', '.remove-tab', function(e){	e.stopPropagation();
	var len	= $('ul.code-drop-region-app').length;
	if($(this).parents('ul').index()==0 && len==1){
		$('ul.code-drop-region-app:first .tabtitle').val('');
		$('ul.code-drop-region-app:first>li').remove();
		$('ul.code-drop-region-app:first').addClass('active');
	}else{
	var act = $(this).closest('ul.code-drop-region-app').hasClass('active');
	if (act) {
		$(this).closest('ul.code-drop-region-app').unbind( "click" );
		$(this).closest('ul.code-drop-region-app').prev().addClass('active');

		}
		$(this).closest('ul.code-drop-region-app').remove();
	}
	});



	$('.liveapps_dashboard').on('click', '.tabtitle', function(){
	$(this).focus().select() ;
	});



	var timeoutId = 0;
	function search() {
		/*ie solve placeholder*/
		if (navigator.userAgent.match(/msie/i) ) {
			if($('input#files').val()=='Search'){
				$('input#files').val('');
			}
		}
		/*ie solve placeholder*/
		var filter= {
				collections : $('.liveapps_dashboard').find('select[name=collections]').val(),
				tags	   : $('.liveapps_dashboard').find('select[name=tags]').val(),
				search_value: $('input#files').val()

			};
		$.post('/ls/liveapps.search/'+$app.queryString(),filter,function(data) {

			var dat_pp = data.Body;
			$('#search-result').html(dat_pp);
		});
	}


	$('.liveapps_dashboard').on('click', '.gs-w', function(){
		$('.gs-w').not(this).removeClass('active');
		$(this).addClass('active');
		return true;
	});



}

;(function(root, factory) {
	'use strict';
	if(typeof exports === 'object') {
        module.exports = factory(require('jquery'), require('./jquery.gridster.js'));
    }
    else if (typeof define === 'function' && define.amd) {
        define(['jquery', 'gridster'], factory);
    } else {
        root.Gridster = factory(root.$ || root.jQuery, root.Gridster);
    }

}(this, function($, Gridster) {
	'use strict';
	Gridster.prototype.dashboard_widgets = function ($widgets) {
		$widgets || ($widgets = this.$widgets);
		if(	$widgets.length  ) {
				var result = [];
		 }
		 else { var result = [{"col":1,"row":1,"size_x":12,"size_y":3,"fid":"","app":""}]; }

		$widgets.each($.proxy(function (i, widget) {
			var $w = $(widget);
			if (typeof($w.coords().grid) !== 'undefined') {
				var obj = this.options.serialize_params($w, $w.coords().grid);
				obj.fid = $w.data('id');
				obj.app = $w.data('app');// for identifying toolApp :Dashbrd
				obj.cid = $w.data('cid');
				obj.autoheight 	= $w.data('autoheight');
				obj.realtime 	= $w.data('realtime');
				obj.tflag 		= $w.data('tflag');
				result.push(obj);
			}
		}, this));
		return result;
	};

 return Gridster;
}));
function promptSave(){ var loadTours_ = new Tour({
	"orphan": true,
	"placement":'left',
    template: `<div class='popover tour ml20'>
    <div class='arrow'></div>
    <h3 class='popover-title'></h3>
    <div class='popover-content'></div>
    <div class='popover-navigation'>
        <button class='btn btn-default btn-block' data-role='end'>Ok</button>
    </div>

  </div>`,
    "steps": [{
		"placement":'left',
        "element": ".code-save-btn-app ",
        "title": "Save Dashboard",
        "content": "Add a title and Save to continue",
        "placement": "right"
    }]
});
loadTours_.init();
loadTours_.restart();
return false;
}
