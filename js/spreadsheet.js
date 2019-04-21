buildSSpagination = function(totalRecord, pageSize, sheetId, rowCount) {
    var hotId           = sheetId.split('sheet-')[1];
    var isRep;

    if($('.container-fluid').hasClass('isLsSpreadSheet')){
      isRep = $('.isLsSpreadSheet').find('#isReport').val();
    }else{
      isRep = $('.isLsSheet').find('#isReport').val();
    }
   	paginationContainer = $('#'+sheetId).parent().find('.paginationContainer');
	paginationContainer.show();
    paginationContainer.find('.ss-pagination').html('<div class="flo" style="padding: 6px 10px;"></div>');
    paginationContainer.find('.paginationStatus').html('Showing 1 to ' + rowCount + ' of ' + totalRecord + ' records. ');
    pagination          = $("<ul><li class='ss-pagination-item-more'></li></ul>", {
        "class": "slidesjs-pagination"
    }).appendTo($('.pagination'));
    makeAddrowInit = function(){
        $('#'+sheetId).parent().closest('.isLsSheet').find('a.addrow').click(function(e){
            /*Add row Click*/
                    hot3[hotId].loadData([hot3[hotId].getDataAtRow(0)]);
                    hot3[hotId].selectCell(1,1);
                    hot3[hotId].updateSettings({'minSpareRows':50});
                    $('#'+sheetId).addClass('paused');
                    var pageIndex = paginationLink.attr("data-slidesjs-item");
            /*Add row Click*/
        });
    } ;
        makeRefreshInit = function(){
        $('#'+sheetId).parent().closest('.isLsSheet').find('a.refreshSSData').click(function(e){
            /*Refresh Click*/
                $('#'+sheetId).parent().closest('.isLsSheet').find('.box .ss-text-search').val("");
                getData(0,hot3Conf[hotId].generalSettings.pageSize , sheetId, '', '').done(function(data) {
                    var currentData         = hot3[hotId].getDataAtRow(0);
                    var nFullData       = $.merge([currentData], data.records);
                    paginationLink.attr("data-slidesjs-item", data["nextPageIndex"] );
                    hot3[hotId].updateSettings({'minSpareRows':0});
                    hot3[hotId].selectCell(1,1);
                    hot3[hotId].loadData(nFullData);
                    paginationContainerXX = $('#'+sheetId).parent().find('.paginationContainer');
                    paginationContainerXX.find('.paginationStatus').html(data["paging-text"]);
                    $('#'+sheetId).removeClass('paused');
                })
            /*Refresh Click*/
        });
    } ;
    buildPageLink       = function(text) {
         paginationLink  = $("<a>", {
            href: "#",
			class:'btn btn-primary',
            "data-slidesjs-item": rowCount,
            html: text /*i + 1 */
        });
        paginationContainer.find('.ss-pagination-item-more').html(paginationLink);
        paginationLink.click(function(e) {
            $('#'+sheetId).addClass('paused');
            e.preventDefault();
            pageIndex           = $(this).attr("data-slidesjs-item");
            var moreButton      = $(this);
            if(isRep == '1'){
                var textSearch  = $('#'+sheetId).parent().parent().find('.ss-text-search').val();
                var sortOption  = $('#'+sheetId).parent().parent().find('.ss-sort-data').val();
            }else{
                var textSearch  = '';
                var sortOption  = '';
            }
            getData(pageIndex, pageSize, sheetId, textSearch, sortOption).done(function(data) {
                moreButton.attr("data-slidesjs-item", data["nextPageIndex"] );
                currentData         = hot3[hotId].getData();
                currentData.length  = parseInt(pageIndex)+1;/* (hot3[hotId].getData().length - 1) */
                var nFullData       = $.merge(currentData, data.records);
                hot3[hotId].loadData(nFullData);
                /* paginationContainer.find('.paginationStatus').html(data["paging-text"]); */
                paginationContainerXX = $('#'+sheetId).parent().find('.paginationContainer');
                paginationContainerXX.find('.paginationStatus').html(data["paging-text"]);
                $('#'+sheetId).removeClass('paused');

            }).fail(function(data) {
              /* $app.setMessage("End of the Page", 'success'); */
            });
        });
    }
    makeAddrowInit();
    makeRefreshInit();
    buildPageLink('Load More');

}
var getData = (function(pageIndex, pageSize, sheetId, textSearch, sortOption, skipRecentRule ) {
    var pKey        = $('#' + sheetId).attr('cnt-key');
    var pPage       = pageIndex || 0;
    var pPageSize   = pageSize;
    var pMod        = 'template';
    var ssPagedData = jQuery.Deferred();
    var fieldArr    = Array();
    var pFilter     = [];
    var skipRecentRule = skipRecentRule || false;
    if (isRep == 1) {
        var pMod = 'dashboard';

        $.each($(".filter_section_input"), function (key, value) {
            var fieldName = $(this).attr('name');
            if (fieldName != '' && fieldName != 'undefined' && $(this).prop("tagName") != 'DIV') {
                var fieldVal = $(this).val();

                if ($(this).attr('type') == "checkbox") {
                     if($(this).hasClass('primary')){
                            var actualFld   = fieldName;
                           // fieldName = fieldName.replace('_vSv_','+');

                            fieldArr[fieldName] = $("input[data-field*='"+actualFld+"[]']:checkbox:checked.primary").map(function () {
                                return this.value;
                            }).get();
                        }
                        else{
                    fieldArr[fieldName] = $('input:checkbox:checked.' + fieldName).map(function () {
                        return this.value;
                    }).get();
                  }
                    var obj = {field: fieldName, value: fieldArr[fieldName]};
                    pFilter.push(obj);
                } else if ($(this).prop('tagName') == 'SELECT') {
                    fieldArr[fieldName] = $("SELECT.filter_section_input[name='" + fieldName + "']").multiselect("getChecked").map(function () {
                        return this.value;
                    }).get();
                    var obj = {field: fieldName, value: fieldArr[fieldName]};
                    pFilter.push(obj);
                } else {
                    if(fieldVal != ''){
                        fieldArr[fieldName] = fieldVal;
                        var obj = {field: fieldName, value: fieldArr[fieldName]};
                        pFilter.push(obj);
                    }
                }
            }
        });

        
    }

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "/ls/livespace/spreadsheet.pagination",
        data: {
            "mod": pMod,
            "sskey": pKey,
            "page": pPage,
            "pagesize": pPageSize,
            "filter": pFilter,
            "textSearch": textSearch,
            "sortOption": sortOption,
            "skipRecentRule": skipRecentRule
        },
        success: function(data) {
            if (data.rowcount) {
                ssPagedData.resolve(data);
            } else {
                ssPagedData.reject(data);
            }

        }
    });
    return ssPagedData;
});

function handsontableSearchAndSort( obj_id, ssid_str ) {
  var sheetId         = 'sheet-'+obj_id;
  var hotId           = sheetId.split('sheet-')[1];
  if(isRep == '1'){
      var searchText  = $('#'+sheetId).parent().parent().find('.ss-text-search').val();
      var sortOption  = $('#'+sheetId).parent().parent().find('.ss-sort-data').val();
  }else{
      var searchText  = '';
      var sortOption  = '';
  }
  
  getData(0, 0, sheetId, searchText, sortOption).done( function(data){
    var totalRecord   = data["total"];
    var pagination    = data["pagination"];
    var pagesize      = data["pagesize"];
    var headerrow     = Array(data.headerrow);
    var records       = data.records;
    var rowCount      = data.rowcount;

    var nFullData     = $.merge(headerrow, records);
    hot3[hotId].loadData(nFullData);

    if(pagination){
      buildSSpagination(totalRecord, pagesize, sheetId, rowCount);
    }


  }).fail( function(data){
    hot3[hotId].loadData( Array(data.headerrow));
    $('#'+sheetId).parent().find('.paginationContainer').hide();
    //$app.setMessage("No result found", 'success');
  });
};
function handsontableDownload( ssid_str, cntId ) {
    var isRep = $('#appsId'),
    json, _dwurl,
     setngsssid, 
     res=  $.trim(ssid_str).split("-");
     
  if(isRep.length){
        setngsssid  = res[0];
     
    } 
     else{
        setngsssid  = $('#ssid').val();
     }


  if(setngsssid != ''){
     if(cntId != ""){
      /* Set filter variables for downloading spreadsheet */
      var fieldArr          = {};
      var pVal              = ''; 
      var pGroupBy          = '';
      fieldArr['liveAppId'] = $('#liveappid').val();
      pVal                  = $('#periodVal').attr('name'); /* read Year mode value */
      pGroupBy              = $("#vizGroupBy").val();
      fieldArr['vizPeriod'] = pVal;
      fieldArr['contentId'] = cntId;
      
      $.each( $(".filter_section_input" ), function( key, value ) {
        var fieldName       = $(this).attr('name');
        if(fieldName != '' && fieldName != 'undefined' &&  $(this).prop("tagName") != 'DIV'){
          var fieldVal      = $(this).val();
           //PrimaryFilterCase
         if($(this).hasClass('primary') ==true && $(this).prop('tagName') ==  'INPUT'){
           
            fieldArr[fieldName] = $("INPUT.filter_section_input[name='"+fieldName+"']:checked" ).map(function(){
                          return this.value;
                        }).get();
          }
          else if($(this).attr('type')=="checkbox"){
            fieldArr[fieldName] = $('input:checkbox:checked.'+fieldName).map(function () {
                                    return this.value;
                                  }).get();
          }else if($(this).prop('tagName') ==  'SELECT'){
            fieldArr[fieldName] = $("SELECT.filter_section_input[name='"+fieldName+"']" ).multiselect("getChecked").map(function(){
                                    return this.value;
                                  }).get();
          }else{
            if (fieldVal.indexOf("#@#") != -1) {
               fieldArr[fieldName]  = fieldVal = fieldVal.split("#@#");
            }else {
              fieldArr[fieldName]   = fieldVal;
            }
          }
        }
      });
      json                  = JSON.stringify({fieldArr});
       var regex       = new RegExp('/', 'g');
       json            = json.replace(regex, '_dt_');
 
    }
   if(isRep.length){
      _dwurl = "/ls/livespace/spreadsheet.export/"+setngsssid+"/"+json+"/"+$app.queryString();
     }else{
           _dwurl = "/ls/livespace/spreadsheet.export/"+setngsssid+"/"+$app.queryString();
        
     }
    window.location.href    = _dwurl;
  }
};

(function ($){
    $.fn.ssAutoPaginate = function(options) {
	 	var settings = $.extend({
             innerClass: ".wtHider",
            btnClass: '.ss-pagination-item-more a.btn',
            pauseclass:'paused',
			adjust: 200,
      }, options);
	this.scroll(function(){
			var thisScroll = ( $(this).scrollTop());
			var thisHeight = ( $(this).height());
			var InnerHeight = $(this).find(settings.innerClass).innerHeight();
            var isPaused    = $(this).parent().parent().hasClass(settings.pauseclass);
			thisScroll  += settings.adjust;
			if (thisScroll+thisHeight > InnerHeight ){
                if(isPaused == false){
				 $(this).closest('.isLsSheet').find(settings.btnClass+':last-child').trigger('click'); 
                }
               
		}
	});
    return this;
};
}( jQuery ));