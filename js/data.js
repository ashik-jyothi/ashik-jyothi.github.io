var vizCharts = [];
function isDragSourceExternalFile(dataTransfer){
    // Source detection for Safari v5.1.7 on Windows.
    if (typeof Clipboard != 'undefined') {
        if (dataTransfer.constructor == Clipboard) {
            if (dataTransfer.files.length > 0)
                return true;
            else
                return false;
        }
    }

    // Source detection for Firefox on Windows.
    if (typeof DOMStringList != 'undefined'){
        var DragDataType = dataTransfer.types;
        if (DragDataType.constructor == DOMStringList){
            if (DragDataType.contains('Files'))
                return true;
            else
                return false;
        }
    }

    // Source detection for Chrome on Windows.
    if (typeof Array != 'undefined'){
        var DragDataType = dataTransfer.types;
        if (DragDataType.constructor == Array){
            if (DragDataType.indexOf('Files') != -1)
                return true;
            else
                return false;
        }
    }
};
function ssGridShowTagMessage(ssId, rowId, doTagsearch) {
    /* function for triggering broadcast message (tagging) from dashboard ssGrid  PKP*/
    var doTagsearch = doTagsearch || "true";  /* perform serch in messages with tags , default will be true */
    $.ajax({
        type: "POST",
        url: "/ls/livespace/spreadsheet.gettaginfo",
        data: {
            'ssId': ssId,
            'rowId': rowId
        }

    }).done(function(res) {
        var Tagname = res.tagText;
        if (Tagname != '' && $.trim(Tagname)) {
            rightBarFn().open('messages');
            var tagLabel    = Tagname.replace(/\\/g,'_vSv_');
                tagLabel    = tagLabel.replace(/\#/g,'__vizHash__');
                tagLabel    = tagLabel.replace(/\%/g,'__vizPercent__');
            if (window.location.hash) {
                var tmpUrl = window.location.hash.slice(1);
                tmpUrl = tmpUrl.split('?')[0];
            } else {
                var tmpUrl = window.location.pathname;
            }
            if (tmpUrl.indexOf("rowId") >= 0 && tmpUrl.indexOf("ssId") >= 0) {
                var tmpUrlSeg = tmpUrl.split("/rowId/");
                tmpUrl = tmpUrlSeg[0];
            }
            var setUrl = tmpUrl + '/rowId/' + rowId + '/ssId/' + ssId + '/' + encodeURIComponent(tagLabel) + $app.queryString();
            var appId = $('#appsId').val();
            var lsId = $('#uId').val() + '-' + $('#portalId').val();
            var setngsssid = ssId;
            rightBarFn().open('messages');
            

            var sData = {'tabId':'messages', 'liveSpaceId':[$app.activeLs.lid], 'page':1,'searchKey':'','tag':tagLabel,'rowfilter':true };
            gSerch = $.extend(gSerch,sData);
           if(doTagsearch == "true" ){  Searchrightbar(gSerch, false); }
            $app.do({ 
                action:function(){
                        $.fn.addBcastTag({
                            tag: Tagname,
                            url: setUrl,
                            ssid: setngsssid,
                            rowid: rowId,
                            appid: appId,
                            lsid: lsId,
                            type: 'ssGrid'
                        });
                     },
                time: 100 
            });

            }
            else{
            $( "#tag_attach_remove" ).trigger( "click" );
            $('#tag_attach_box .taglist').html('');

            }

    });
}

$(document).ready(function() {
    $('body').on( 'mouseover', '.tile-item-wraper.newRow', function(){ $(this).removeClass("newRow") });
$('body').on('click','#rightFormContentArea .form-file-list', function(){ 
    var dataVars = $(this).data();
    var dataUri = 'ls/livespace.previewform/'+dataVars.id+'?_ls='+dataVars.ls;
    rightBarFn().fullScreen();
    $('#rightFormContentArea').addClass("formFilePreviewMode");
    load_url(dataUri, $('#rightMesageFiles') , false);


});

$('body').on('click','.gs-w  .form-file-list', function(){ 
    var dataVars = $(this).data();
    $(".right-content-files ").html('<div class="rightpanel-file-direct-view"> </div> ');
    var dataUri = 'ls/livespace.previewform/'+dataVars.id+'?_ls='+dataVars.ls;
    rightBarFn().open("files");
    rightBarFn().expand();
/*     $('#rightFormContentArea').addClass("formFilePreviewMode"); */
    load_url(dataUri, $('.rightpanel-file-direct-view') , false);
});

$('body').on('click','.formFilePreviewClose', function(){
    $("#rightFormContentArea").removeClass("formFilePreviewMode");
    $("#rightMesageFiles,.right-content-files ").html('');
    var oldWindowSize = $('#rightFormContentArea').data('window');
    switch(oldWindowSize){
        case 'expandscreen' : { rightBarFn().expand();  break; }
        case 'fullscreen' : {  rightBarFn().fullScreen();  break; }
        default : {  rightBarFn().contract(); break;}
    }
}); 

    
    /* Card Scripts */
	$('body').on('click', '.app-upload-btn', function(e){
		e.preventDefault();
		$('.amazons3.upload_container input[type="file"], #click_up').trigger('click');
    });
    $('body').on('click', '.app-form-card  .card-action', function(e){
        e.preventDefault();
        data = $(this).data();
        panel = { medium:"panel_expandscreen", small:"panel_smallscreen", fullscreen:"panel_fullscreen", }
        var el = $(`<div class="widget-box"> <table class="data-table ssform-enabled ${panel[data.panel]}"> </table> <a href ="${data.url}"> vLink </a> <div> `);
        loadNewAddform(el.find("a"));
 	});
    /* Card Scripts */
    $("body").on("click", ".file-browse-grid" ,function(e){
        gridUplodtag = $(this).data();
        e.preventDefault();
        $('.amazons3.upload_container input[type="file"], #click_up').trigger('click');
     });


    window.formTab = 'form';
    $('body').on('click','.isDashboardView table.ssform-enabled tr td:not(:nth-child(1)), .isDashboardView table.sstag-enabled  tr td:not(:nth-child(1)) ', function(e){
		
       var eventType = $(e.target).is('input[type="button"],input[type="checkbox"],a,button,.caret,.customcheck1');
        var hasForm = $(this).parents('table.data-table').hasClass('ssform-enabled');
		var hasTag = $(this).parents('table.data-table').hasClass('sstag-enabled');
		var parentss  =$(this).parents('table.data-table.ssform-enabled');
		var hasPanelSize = parentss.is(".panel_expandscreen, .panel_smallscreen, .panel_fullscreen");
        if(eventType === false){
            window.rightpanel = {};
            $(this).parentsUntil('table').find('tr').removeClass('selected');
            $(this).parent().addClass('selected');
            var viewUrl =  $(this).parent().find('.ssGridActionMenu').data();
            window.rightpanel.ssform = viewUrl;
            window.rightpanel.ssform.hasform = hasForm;
			$('.rightPanelTab').removeClass('hideGridFormTab hidetagMgGFl'); 
			var toLoad = 'form';
			if(hasForm === true && hasTag === true){
				if(window.formTab == "files"){
					toLoad = 'files';
				}
				 if(window.formTab == "msg"){
					toLoad = 'msg';
				}
			}
			if(hasForm === true && hasTag !== true){
				$('.rightPanelTab').addClass('hidetagMgGFl');
			}else  if(hasForm !== true && hasTag === true){
				/* remove Fullscreen rightpanel */ $('.fullRightBar').removeClass('fullRightBar');
				if( window.formTab === "form") {
					window.formTab = "msg";
					toLoad = 'msg'; 
				} 
				if(window.formTab === "files"){
					toLoad = 'files';
				}
				 if(window.formTab === "msg"){
					toLoad = 'msg';
				}
				$('.rightPanelTab').addClass('hideGridFormTab');
			}
			if(toLoad === 'form'){
				window.formTab = "form";
				rightBarFn().open('static');
                if(hasPanelSize){  panelShowSize(parentss); }else{ rightBarFn().expand(); }
                $('#rightPanel #homestatic').block(new loderconf);
                $.ajax({url:viewUrl.edit}).done(function(data){
                    reactFunc(data);	
                });
	
			}
			if(toLoad === 'msg'){
				window.formTab = "form";
				getRowTagedMessages();	
			}
			if(toLoad === 'files'){
				window.formTab = "files";
				getRowTagedFiles();	
			}
         
        } 
       
    });
	
	
	
    loadNewAddform = function (el){
        window.rightpanel = {};
		$('.rightPanelTab').removeClass('hideGridFormTab  hidetagMgGFl'); 
        viewUrl = el.attr('href');
        rightBarFn().open('static');
        var parentss = el.parents('.widget-box').find('table.data-table.ssform-enabled')
		var hasPanelSize = parentss.is(".panel_expandscreen, .panel_smallscreen, .panel_fullscreen");
        if(hasPanelSize){  panelShowSize(parentss); }else{ rightBarFn().expand(); }
        $('#rightPanel #homestatic').block(new loderconf);
        $.ajax({url:viewUrl}).done(function(data){
            reactFunc(data);	
        });
    };
    window.openEditForm =  function openEditForm(options){
        opt = _.extend({
                    "gridobjlink":0,
                    "appid":0,
                    "formid":"",
                    "ssid":"",
                    "rowid":"",
                     "queryString": $app.queryString(),   
                    "hasform":true,
                    "formMode":"edit",
                    "windowsize": "panel_expandscreen",
                    "user":""
                }, options);
        opt.edit = "/analytics/form.preview/" + opt.formid + "/edit/" + opt.rowid + "/" + opt.gridobjlink + "-" + opt.appid + "/" +opt.formmode+ "/" + opt.user + opt.queryString;
        console.log(opt);
        /* var eventType = $(e.target).is('input[type="button"],input[type="checkbox"],a,button,.caret,.customcheck1,.no-form-action');
        if(eventType === false){ } */
            window.rightpanel = {};
            window.rightpanel.ssform = opt;
            window.rightpanel.ssform.hasform = true;
            $('.rightPanelTab').removeClass('hideGridFormTab').addClass('hidetagMgGFl');
			var toLoad = 'form';
			if(toLoad === 'form'){
				window.formTab = "form";
                rightBarFn().open('static');
                $(".fullRightBar").removeClass("fullRightBar");
                if( opt.windowsize == "panel_expandscreen" ){
                    rightBarFn().expand();
                } 
                if( opt.windowsize == "panel_smallscreen" ){
                    rightBarFn().contract();
                }
                if( opt.windowsize ==  "panel_fullscreen" ){
                    rightBarFn().fullScreen();
                }	
                $('#rightPanel #homestatic').block(new loderconf);
                $.ajax({url:opt.edit}).done(function(data){
                    reactFunc(data);	
                });
	
			}
        
     };
    $('body').on('click','.editRightForm', function(){
        var viewUrl =  $(this).data();
        load_url(viewUrl.href,'#rightPanel #rightFormViewEdit');
    });
    $('body').on('click','.editFormFromGridAjax', function(){
        rightBarFn().open('static');   
        var viewUrl =  $(this).data();
        window.rightpanel = {};
        window.rightpanel.ssform = viewUrl;
        load_url(viewUrl.href,'#rightPanel #homestatic');
    });
    $('body').on('click', '#reportTabEdit a ', function(e) {
        e.preventDefault();
        var isAddTab = $(this).hasClass('BsAddTab');
        if (isAddTab) {} else {
            $(this).tab('show');
        }
    });
    $('body').on("shown.bs.tab", '#reportTabEdit', function(e) {
        reTab();
        var Sid = $('.tab-pane.active').find('input[name="spreadCntKey"]');
    });

    $('body').on('mouseover', '.ssGridActionMenu',
        function() {
            $(this).children('.dropdown-menu').show();
        }
    );

    $('body').on('mouseout', '.ssGridActionMenu',
        function() {
            $(this).children('.dropdown-menu').delay('500').hide();
        }
    );

    $('body').on('shown', '#reportTabEdit a.tabItem', function() {
        if (typeof lapSS !== 'undefined') {
            $.each($.unique(lapSS), function(a, e) {
                hot3[e].render();
            });
        }

    });
    $("body").on("click", ".flttab-but, .flttab-but2", function() {
        $('.fltcont').show();
        $(".ritBarFilter ul.ui-multiselect-checkboxes").perfectScrollbar('update');
        $('#rightPanFilter').addClass('ftlbase');
        setTimeout(function() {
            $(window).trigger('resize');
        }, 1000);
    });

    $('body').on('change click', 'select[name=lapps]', function(ev) {
        if ($(this).val() != "") {
            window.location.href = "#ls/liveapps.view/" + $(this).val() + $app.queryString();
        }
    });
    $("body").on("click", '.ssform-button', function(e) {

         if($(this).hasClass("inqueue")){
            return false;
        }
      
        valiDateInputs($(this),true);
        
        $(this).addClass("inqueue");
        
    });
    $("body").on("blur , change", 'input.valError', function(e) {
        //e.preventDefault()
        valiDateInputs($(this),false);
    });

$("body").on("click", '#rightForm_messageLink', function(e) {
    getRowTagedMessages();
});

$("body").on("click", '#rightForm_formLink', function(e) {
        rightBarFn().open('static');
        window.formTab = "form";
        // load_url(rightpanel.ssform.edit,'#rightPanel #homestatic');
        $('#rightPanel #homestatic').block(new loderconf);
        $.ajax({url:rightpanel.ssform.edit}).done(function(data){
            reactFunc(data);	
        });

});

$("body").on("click", '.addRecordSSForm', function(e) {
    e.preventDefault();
    element = $(this).parents('.gridster-box').find('.viz_viz_viz_bton').trigger('click');
    loadNewAddform(element);
});

$("body").on("click", '.addRecordSSForm_datalist', function(e) {
    e.preventDefault();
    $(this).parents('.gridster-box').find('.addRecordSSFormDatalist').get(0).click();
});

$("body").on("click", '#rightForm_filesLink', function(e) {
    getRowTagedFiles();
            
});


	$("body").on("click",".editChildFormSS", function(e){
		e.preventDefault();	
		var $this = $(this);
		data = $(this).data();
		editChildFormSS(data, $this);
	});
	
	$("body").on("click",".rightPanelTab .refreshSSData", function(e){
		e.preventDefault();	
		var $this = $(this).parents('.ssEditRightToggleWrap').find('.editChildFormSS').click();
	});
	
/*
	$("body").on("click",".gridEdit .editChildFormSS", function(e){
		e.preventDefault();	
		var $this = $(this);
		data = $(this).data();
		 $.ajax({
        type: "GET",
        url: "/analytics/form/grid.preview",
        data: formConf[data.key]	
		}).done(function(res) {
			$this.parents(".ssEditRightToggleWrap").removeClass("gridView").addClass("gridEdit").find(".type_tpl_grid").html(res.Body).show();
			$this.find(".rightPanelSS").hide();
			console.log("dd");
		});
	});
	
*/	


	
    
});
var indexBefore = -1;
function getIndex(itm, list) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (itm[0] === list[i]) break;
    }
    return i >= list.length ? -1 : i;
}

function makeFilterSortable(appId) {
    $('.filter_left').sortable({
        items: "> div",
        axis: 'y',
        update: function(event, ui) {
            var daTa = $('.filter_left').sortable("toArray");
            $.ajax({
                url: 'ls/liveapps/filter.savefilterorder/' + appId + '/',
                data: {
                    displayorder: daTa
                },
                type: 'POST'
            })
        }
    }).disableSelection();
};
function updateFilterPos(arrPos) {
    $.each(arrPos, function(i, e) {
        els = arrPos[i];
        $('#' + els).appendTo('.filter_left');
    })
};
function doUpadate_() {

    if ($.fn.multiselect) {
        $("#liveAppLeftMenu").find('select.uiSelect').multiselect({
                minWidth: 125,
                height: 130,
                autoOpen: true,
                classes: 'custom-filter',
            })
            .multiselectfilter({
                label: '',
                placeholder: 'Filter	',
            });
    }


    $('#periodMode').slider({
        min: 1,
        max: 3,
        range: "min",
        change: function(event, ui) {
            var val = ui.value;
            var pVal = '';
            switch (val) {
                case 1:
                    pVal = 'yearly';
                    break;
                case 2:
                    pVal = 'quarterly';
                    break;

                case 3:
                    pVal = 'monthly';
                    break;
            }
            $('#periodVal').attr('name', pVal);
            fnApplyFilter();

        }

    });


    $('body').on('click', '.filter_groups input', function() {
        $(this).focus();

    });


};
   
    /* DNA Link click event */
    $('body').on('click', '.vizDNALink:not(.menuCustomDrop a)', function() {
        var linkstr = $(this).attr('name');

        window.open('#ls/liveapps.view/' + linkstr);

    });



function getRowTagedMessages() {
    $.ajax({
        type: "POST",
        url: "/ls/livespace/spreadsheet.gettaginfo",
        data: {
            'ssId': rightpanel.ssform.ssid,
            'rowId': rightpanel.ssform.rowid
        }
    }).done(function(res) {
        window.formTab = "msg";
        $app.do({
            action: function() {
                
                ssGridShowTagMessage(window.rightpanel.ssform.ssid, window.rightpanel.ssform.rowid);
            },
            time: 100
        });
    });
};

function getRowTagedFiles() {
    $.ajax({
        type: "POST",
        url: "/ls/livespace/spreadsheet.gettaginfo",
        beforeSend: function() {
            $(' div.rightPanelTab ._rightpaneltab.tab-pane.active').block(rightLoder);
        },
        data: {
            'ssId': rightpanel.ssform.ssid,
            'rowId': rightpanel.ssform.rowid
        }
    }).done(function(res) {
        $(' div.rightPanelTab ._rightpaneltab.tab-pane.active').unblock();
        if (res.tagText) {
            /*if no tags configerd res.tagText will return ""  */
            rightBarFn().open('files');
            window.formTab = "files";
            Searchrightbar({
                'tabId': 'files',
                'liveSpaceId': [$app.activeLs.lid],
                'page': 1,
                'searchKey': res.tagText,
                'rowfilter': true
            }, false);
        } else {
            if (window.formTab == "files") {
                rightBarFn().open('static');
                load_url(viewUrl.edit, '#rightPanel #homestatic');
                window.formTab = "";
            }
        }
    });
}

function panelShowSize(parentss, hasPanelSize){
		$(".fullRightBar").removeClass("fullRightBar");
		if(parentss.hasClass("panel_expandscreen")){
			rightBarFn().expand();
		} 
		if(parentss.hasClass("panel_smallscreen")){
			rightBarFn().contract();
		}
		if(parentss.hasClass("panel_fullscreen")){
			rightBarFn().fullScreen();
		}	
}
function editChildFormSS(data, $this){
     var $parent = $this.parents(".ssEditRightToggleWrap");
	 $.ajax({
	type: "GET",
	url: "/ls/livespace/spreadsheet/custom.view/"+data.key,
	data: window.formConf[data.key]		
	}).done(function(res) {
		$parent.find(".type_tpl_grid").hide().html("");
		$parent.find(".rightPanelSS").html(res.Body);
	});
}


/* Dashboard Realtime */
/* vizruSocket  will be  initiate  from html.tpl  */

$(document).ready(function() { 
    $app.do({ action:function(){
        console.log(vizruSocket);
    vizruSocket.on("ss_dataChange", (data) => {
        if(data.payload.content_type === "grid")  { 
        switch (data.payload.action)
        {
            case "rowInsert":
                {
                     var tr = buildTr( JSON.parse(data.payload.data)); 
                        tr.then(function(res){
                            var $nRow = $(res.data);
                            $(`[data-id='${data.payload.cnt_id}']`).find(`tbody`).prepend($nRow.delay(5000).removeClass("newRow",5));
                             $(`[data-id='${data.payload.cnt_id}']`).find('.dataTables_empty').parent('tr').remove();
                        });
                    break;
                }
            case "rowUpdate":
                {                 
                     var tr = buildTr( JSON.parse(data.payload.data)); 
                        tr.then(function(res){
                            var $nRow = $(res.data);
                            $(`[data-id='${data.payload.cnt_id}']`).find(`#${data.payload.row_id}`).replaceWith($nRow.delay(5000).removeClass("newRow",5))
                            });
                    break; 
                }
            case "row_remove":
                {

                    data.payload.row_id.forEach(function(id){
                   $(`[data-id='${data.payload.cnt_id}']`).find(`#${id}`).remove(); 
                    })                                   

                    break;
                }
            case "copyPaste":
                {
                    break;
                }
            case "multiRowsUpdate":
                {
                    break;
                }
            case "column_remove":
                {
                    break;
                }
        }
    }
    if(data.payload.content_type === "datalist" &&  !!dtl[data.payload.cnt_id] ) {
        
        switch (data.payload.action)
        {
            case "rowInsert":
                {
                   
                    _prefixObject = {}
                    Object.keys( JSON.parse(data.payload.data) ).forEach(function(key, index){ 
                       var nKey =  ( _.indexOf(['DT_RowClass', '_DT_SortColumn',  'DT_RowId'], key) != -1  )? 	key : "_"+key; 
                       _prefixObject[nKey] = JSON.parse(data.payload.data)[key];
                       
                   } );
                    _prefixObject["DT_RowClass"]= "newRow";
                   


                    dtl[data.payload.cnt_id].store.dispatch({type: "LIST_ITEMS", data:[_prefixObject], clear : false, position:1 }); 
                     /* var tr = buildTr( JSON.parse(data.payload.data));  */
                     /*    tr.then(function(res){
                            var $nRow = $(res.data);
                            $(`[data-id='${data.payload.cnt_id}']`).find(`tbody`).prepend($nRow.delay(5000).removeClass("newRow",5));
                             $(`[data-id='${data.payload.cnt_id}']`).find('.dataTables_empty').parent('tr').remove();
                        }); */
                    break;
                }
            case "rowUpdate":
                {   

                    
                    /* Add _prefix to missing keys  */
                    _prefixObject = {}
                    Object.keys( JSON.parse(data.payload.data) ).forEach(function(key, index){ 
                       var nKey =  ( _.indexOf(['DT_RowClass', '_DT_SortColumn',  'DT_RowId'], key) != -1  )? 	key : "_"+key; 
                       _prefixObject[nKey] = JSON.parse(data.payload.data)[key];
                       
                   } );
                    _prefixObject["DT_RowClass"]= "newRow";
                    dtl[data.payload.cnt_id].store.dispatch({type: "UPDATE_RECORD", rowId:data.payload.row_id, data:_prefixObject}); 
                      
                    /*  var tr = buildTr( JSON.parse(data.payload.data)); 
                        tr.then(function(res){
                            var $nRow = $(res.data);
                            $(`[data-id='${data.payload.cnt_id}']`).find(`#${data.payload.row_id}`).replaceWith($nRow.delay(5000).removeClass("newRow",5))
                            }); */
                    break; 
                }
            case "row_remove":
                {
                    data.payload.row_id.forEach(function(id){
                            dtl[data.payload.cnt_id].store.dispatch({type: "DELETE_RECORD", rowId:id  });  
                    }
                    
                    )                               

                    break;
                }
            case "copyPaste":
                {
                    break;
                }
            case "multiRowsUpdate":
                {
                    break;
                }
            case "column_remove":
                {
                    break;
                }
        }
    }

    else if(!!vizCharts[data.payload.cnt_id]) {
       /* if chart and content id avilable in dasboard chart global Obj */
            if(data.payload.data.chart.events){ 
                /* Update Basic total etc .. */
                var Total = 0;  
                 Total += _.reduce(data.payload.data.series[0].data, function(memo, num){  return memo + num.y; }, 0);
                 var Average = Total;  
                 var dataCnt  = data.payload.data.series[0].data.length;
                        $(`.objectContent[data-id='${data.payload.cnt_id}']`).find(".chart-total, .chart-total-pie").remove(); 
                        $(`.objectContent[data-id='${data.payload.cnt_id}']`).find(".highcharts-legend-item br").remove();
                        var script = `var ac = function  ($me) {var dc = ${data.payload.data.chart.events.load}();}( $(".objectContent[data-id='${data.payload.cnt_id}']") )`;
                        eval(script);
            }
        var vChart = vizCharts[data.payload.cnt_id].highcharts();
        if(data.payload.data.xAxis){
            vChart.xAxis[0].setCategories(data.payload.data.xAxis.categories); 
        }
        $.each(vChart.series, function (a, i) {
            Object.keys(data.payload.data.series[a]).map(function (nt, dt) 
            {
                    var newData = {};
                    newData[nt] = data.payload.data.series[a][nt];
                    if( nt !== "data") {
                        i.update(newData, true, true);
                    } 
                    else{  
                        i.setData(data.payload.data.series[a][nt],true,true)
                     }
            })
        });

  /*       data.payload.data.series.forEach((element,i) => {
                vChart.series[i].setData(data.payload.data.series[i].data,true,true);
                vChart.series[i].update({name:data.payload.data.series[i].name },true, true) 
                
            }); */
    }
    
    });
    }, time: 100  } );
    $(document).on("pageChange", function(){
        $app.do({ action:function(){ 
            if( $app.activeLs !== null){
                vizruSocket.emit("ls_switch", {
                    lid: $app.activeLs.lid.toString(),
                    tid: $app.tid.toString()
                })
            };
        }, time:100 });
  
    });
});
var buildTr = function(a) {
    var index = 1;
    var result = $.Deferred();
    var tpl = '';    
    for (var rows in a) {
        var newTdData = '<td class="' + rows + '">' + a[rows] + '</td>';
        if ($.inArray(rows, ['DT_RowClass', 'DT_RowId']) === -1) {
            if(a[rows] || a[rows] === 0  ){tpl = tpl + newTdData; }
            else{
                    /* add empty div if no content */
                    tpl = tpl + '<td class="dataList-empty ' + rows + '">&nbsp;</td>'; 
                 }
        }
        if (Object.keys(a).length === index) {
            rtemplate =  `<tr class="${a.DT_RowClass} newRow "  id="${a.DT_RowId}"   > ${tpl} </tr>`;
            result.resolve({
                data: rtemplate,
                id: a['DT_RowId'],
                rowclass: a['DT_RowClass']
            });
        }
        index++;   
    };
    return result;
};

/* Dashboard Realtime */


/* Dashboard View Dummy Drag and Drop Place Holder */

$('body').on('dragenter', '#content.isDashboardView', function(e) {
    var IsFile = isDragSourceExternalFile(e.originalEvent.dataTransfer);
    if(!IsFile){
        isDashhandleDragLeave();
        return false;
    };
    
	if( !$('.isDashboardView .rightdragAndDropArea').length){
		$('.isDashboardView').append('<div class="rightdragAndDropArea"><span class="dragDropText">Drop Files here..</span></div>');
		var dropArea = document.getElementsByClassName('rightdragAndDropArea');
		dropArea[0].addEventListener('dragleave', isDashhandleDragLeave, false);
	}
});
function isDashhandleDragLeave(e) {
            $('.isDashboardView .rightdragAndDropArea').remove();
}
$('body').on('drop','.isDashboardView .rightdragAndDropArea',function(e){
	$('.rightdragAndDropArea').remove();
});


/*Place holder End */
/* Workflow Card */
$.fn.vizworkflowCards = function(){
    $(this).each(function(){
            var el = $(this);
        var jsonData = $(this).data();
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/workflow.exec/" + jsonData.wid,
            data: { "data": JSON.stringify([jsonData]) },
            success: function (data) {
                        el.addClass("done");
                        Object.keys(data[0]).forEach(function(item){
                                el.find( `[data-content="${item}"]`).html(data[0][item]);
                        });
                }
            });
    }) ;   
};
$("body").on( 'filterInitDone', '#ls'  ,  function(){ 
    $('.workflow-card').vizworkflowCards();
}); 
/* Workflow Card end*/


