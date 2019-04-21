$.fn.dataList = function(options) {
	var _dataList = function(options) {
		//debugger
			"use strict";
			{_this:null}
			var _this  = this._this;
    var processedData;
	 $.fn.dataList.defaults = {}
	 $.fn.dataList.defaults.listReady = function(){  }
    // Extend our default options with those provided.
    // Note that the first argument to extend is an empty
    // object – this is to keep from overriding our "defaults" object.
    var opts = $.extend(_this.data(), {}, options);
    var aoData = [];
	var actionButtons;
    _this.data(opts);
    opts.fnServerData([], aoData, {} , {});
    _this.addClass('vizTileContainer').attr('id','tileListViews');
					_this.find('#arrangeDashBoard').html('');
    var main = {};
    var warpIt = function() {
        $("<div class='dataList-wraper'> </div>").prependTo(_this);
		 opts.fnPreDrawCallback();
    };
/*    var generateButtons = function(buttons){
		var btPromise= $.Deferred();
		var btTempateAll = "<a  class='dataCheck'><i class='fa fa-check-square-o'></i></a>" 
		if(Object.keys(buttons).length){
			
			for (var _item  in buttons   ){
				 var eachBtn =  buttons[_item];
				btTempateAll  = btTempateAll+`<a class="${eachBtn.icons}" title="${eachBtn.title}" id="${id}" href="${eachBtn.url}" name="${name}"><i class="fa fa-${eachBtn.icons}"></i></a>`; 
				if(parseInt(_item)+1 == buttons.length){
				 
					btPromise.resolve(btTempateAll)
					}
				}
			
			}
			else{
				btPromise.resolve('');
				}
			
			
			
				return btPromise;
		}; /old Buttonn action/ */
		var rowBtns = function(id){
 		var rowBtPromise= $.Deferred();
		var id = id ||'staticId';
		var btTempateAll = "" ;
		if( opts.rowSelection === "single" || opts.rowSelection === "multiple" ) {
			btTempateAll  = btTempateAll+  "<a title='Select' class='dataCheck'><i class='fa fa-square-o'></i></a>" ;
			}
		if(Object.keys(opts.aoButtons).length){
			for (var _item  in opts.aoButtons   ){
				 var eachBtn =  opts.aoButtons[_item];
				 eachBtn.url = eachBtn.url || '';
				btTempateAll  = btTempateAll+`<a class="${eachBtn.icons}" title="${eachBtn.title}" data-id="${id}" href="${eachBtn.url}" name="${eachBtn.action}"><i class="fa fa-${eachBtn.icons}"></i></a>`; 
				if(parseInt(_item)+1 == opts.aoButtons.length){
					/* If last array return all opts.aoButtons with promise*/
					
					rowBtPromise.resolve(btTempateAll);
					}
				}
			
			}
			else{
				rowBtPromise.resolve('');
				}
				/*return rowBtPromise;*/
				return btTempateAll;
		};
	var makeSelectable = function(e) {
        e = $(e);
        e.find('.itemCheckBox').click(function() {
            var id = $(this).data('id');
            var isChecked = e.find('.itemCheckBox').is(':checked');
            /*console.log(isChecked);*/
            if (isChecked) {
                _this.find('.tile-item#' + id).addClass('selected');
            } else {
                _this.find('.tile-item#' + id).removeClass('selected');
            }
        });
        return e;
    };
	var getSeverData = function(){
		return {  
					iDisplayLength: opts.iDisplayLength,
				 	sSearch: opts.searchKey,
        			'variables': aoData[0].value,
					iSortCol_0:opts.iSortingCols,
					iSortingCols:opts.iSortingCols,
					sSortDir_0:opts.sSortDir
					
				};
		};
	var makeSortable = function() {
		_this.on('click','.dataSortable', function(){
			var sIndex = $(this).data().ofset;
				_this.find('.headerLi .dashDetails div').not($(this)).removeClass('sort-asc sort-desc');
			
				var order;
				if($(this).hasClass('sort-asc')){
					order = 'desc';
					$(this).addClass('sort-desc').removeClass('sort-asc');
					}
					else{
						order = 'asc';
						$(this).addClass('sort-asc').removeClass('sort-desc');

						}
				 
			var sData = {
						sSortDir:order,
						iSortingCols:sIndex
					};
			_this.data(sData);
			var serverData = getSeverData();
			setTimeout(function(){
       			 main.fnListinit(serverData,true);
			},400) ;
			
			});
		$.each(opts.aoColumns, function(a,i){
				if(i.bSortable !== false ) {
					_this.find('.headerLi').find('.col'+a).addClass('dataSortable');
						_this.find('.headerLi').find('.col'+a).append('<span class="sort-s"><i class="fa fa-sort" aria-hidden="true"></i><i class="fa fa-sort-asc mt7" aria-hidden="true"></i><i class="fa fa-sort-desc" aria-hidden="true"></i></span>');
					}
				
			});
		
		};
    var makeSearchable = function() {
		$('.searchHeaderBelow').html('');
		var input ='<input class="sFilterInput" id="searchTop" type="search" placeholder="Search">';
		var timeOut;
        $(input).on('keyup', function() {
			clearTimeout(timeOut); 
			var sKey = $(this).val(); 
			_this.data({searchKey:sKey});
			timeOut = setTimeout(function(){
				/* send clearExist as true for clear current items */
       			 main.fnListinit(getSeverData(),true);
			},400) ;
        }).prependTo($('.headerBelowButtonLeft').find('.searchHeaderBelow'));
		/*$('.gridIcons').find('.sFilterInput').wrap('<li class="searchHeaderBelow"></li>')*/
    };
    var buildListPagination = function(totalRecords, displayStart) {
        $('.data-pagination, .dataNextbtn').remove();
        var pageSize = opts.iDisplayLength;
        var totalRecords = totalRecords;
        var displayStart = displayStart;
        var paginationContainer = $('<div class="data-pagination"> <div class="paginationStatus"></div> </div>').appendTo('.paginationStatusMain');
        var paginationLink = $("<li>", {
            href: "#",
			class : 'staticItem loadMore',
            "data-next": opts.iDisplayLength + displayStart,
            html: '<div class="tile-item dashwrap dashes"><article class="dashDetails"><a class="addDashButton nextDashButton"><i class="fa fa-forward" ></i><h3> Load more..</h3></a></article></div>'
        });
		/*(opts.iDisplayLength + displayStart) next Count*/
        paginationLink.click(function(e) {
            var serverData = getSeverData();
			var nextPage = $(this).data('next');
			serverData.iDisplayStart = nextPage;
            main.fnListinit(serverData, false);
        });
       // _this.find('.dataList-wraper').append(paginationLink);
/*	   _this.parent().parent().addClass('sss').find('.icon').append(paginationLink.addClass('vwidget-abtn flo pl5 pr5 mr3 btn btn-small icon-large dataNextbtn'));*/
	   
	    _this.find('#arrangeDashBoard').append(paginationLink.addClass('tile-item-wraper dataNextbtn'));

        if (opts.iDisplayLength + displayStart >= totalRecords) {
            var pageLoded = totalRecords;
            /* if pagination count is larger than totalRecords*/
            paginationLink.remove();
        } else {
            var pageLoded = opts.iDisplayLength + displayStart;
        }
        paginationContainer.find('.paginationStatus').html('Showing 1 to ' + pageLoded + ' of ' + totalRecords + ' records. ');
        if (totalRecords >= pageSize) {
           /* console.log(totalRecords, pageSize);*/
        }
    };
    var fnListDochild = function(a) {
        var index = 1;
        var result = $.Deferred();
        var tpl = '';
        for (var rows in a) {
            var newTdData = '<div class="' + rows + '">' + a[rows] + '</div>';
            if ($.inArray(rows, ['DT_RowClass', 'DT_RowId']) === -1) {
                if(a[rows]){tpl = tpl + newTdData; }
				else{
						/* add empty div if no content */
						tpl = tpl + '<div class="dataList-empty ' + rows + '">&nbsp;</div>'; 
					 }
            }
            if (Object.keys(a).length === index) {
                result.resolve({
                    data: tpl,
                    id: a['DT_RowId'],
					rowclass: a['DT_RowClass']
                });
            }
            index++;
        };
        return result;
    };
    warpIt();
   
    main.getData = function() {
        return processedData;
    };
    main.fnListinit = function(serverData,clearExist) {
		/*Ser arg clearExist for clear existing elements , Used in search */
/*		generateButtons(opts.aoButtons).done(function(buttons){
			actionButtons = function(id){ return buttons.replace('staticId',id); };
			});*/
        $.ajax({
            url: opts.sAjaxSource,
            type: 'POST',
            data: serverData,
			beforeSend:function(){  opts.fnPreDrawCallback.call(); }
        }).done(function(data) {
			if(clearExist){
				main.fnClearList();
				}
            processedData = data;
            var ndata = data;
            var tableRows = ndata.aaData;
			var rowCount = tableRows.length;
			var loopIndex=0;
			if(!ndata.aaData.length){ _this.find('#arrangeDashBoard').append('<p> No Data found </p>'); }
            for (var prop in tableRows) {
				loopIndex++;
                fnListDochild(tableRows[prop]).done(function(data) {
                    var rowData = data.data;
                    var template = `<li class="tile-item-wraper ${data.rowclass}"   data-id="${data.id}"> <div class="tile-item dashwrap dashes" id="${data.id}">`
					
						if( opts.rowSelection === "single" || opts.rowSelection === "multiple" ) {
							template  =   template + `	<div class="customCheckBox">
                    	<input type="checkbox" class="checkBoxinput" id="check-${data.id}">
                    	<label for="check-${data.id}"></label>
                    </div>`;
					
							}
					
				
					
					  template  =   template + `<div class="dashActions">
                    	<div class="dashIconWrap">
                             ${rowBtns(data.id)}
                        </div>
                    </div>
							<article class="dashDetails"> 	 
								${rowData} 
							<article> 
						</div></li>`;
					_this.find('#arrangeDashBoard').append( /*makeSelectable(template)*/template).find('.dashIconWrap a').tooltip({ placement: 'top', container: 'body:first' });
                });
				
            }
			
				if ( rowCount == loopIndex) {
					/* do somthing after listReady  */
					 buildListPagination(data.iTotalRecords, data.iDisplayStart);
    					opts.fnInitComplete.call();
						if( _this.hasClass('tileView') ){
							$('.headerBelowButtonLeft').addClass('tileView_wraper');
							}else{
								$('.headerBelowButtonLeft').addClass('listView_wraper');
								}
						setTimeout(function(){ 
						 	$('.listStyeToggle').show();
							_this.trigger('datalistdone', [ "Custom", "Event" ] )}
						, 100) 
				}
        });
    };
    if( _this.length !== 0){
		/* if object in dom */
		 makeSearchable.call();
		 makeSortable.call();
		main.fnListinit({
				iDisplayLength: opts.iDisplayLength,
				'variables': aoData[0].value
		},true);
		}	
    main.fnClearList = function(bRedraw) {
        _this.find('.tile-item-wraper').remove();
    };
    return $.extend(_this, main);
};

return	$(this).not('.datalistReact').each(function(){
	var _this = $(this);

	return 	_dataList.call({_this:_this},options );

});
}
/*// Plugin defaults – added as a property on our plugin function.*/