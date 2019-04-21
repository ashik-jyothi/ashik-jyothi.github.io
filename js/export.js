$(document).ready(function() {
	
	$('body').on('click','.export-ex',function(e){
		
		var fieldArr 			= {};
		var pVal				= ''; 
		var pGroupBy 			= '';
		fieldArr['liveAppId']	= $('#liveappid').val();
		pVal					= $('#periodVal').attr('name');	//read Year mode value
		pGroupBy				= $("#vizGroupBy").val();
		fieldArr['vizPeriod']	= pVal;
		var contentId			= $(this).attr('id');

		var url_filter			= $('#filter_url').val();	
		//alert(url_filter);

		if (url_filter.length != 0) {
		  var pieces = url_filter.split("::");
		  fieldArr[pieces[0]] = pieces[1].replace(/\//g, "@@");
		}

		$.each( $(".filter_section_input" ), function( key, value ) {
			var fieldName  		= $(this).attr('name');
			if(fieldName!='' && fieldName!='undefined' &&  $(this).prop("tagName")!='DIV'){
				var fieldVal 	= $(this).val();
				
				if($(this).attr('type')=="checkbox"){
					if($(this).hasClass('primary')){
					    var actualFld   = fieldName;
					   // fieldName = fieldName.replace('_vSv_','+');

					    fieldArr[fieldName] = $("input[data-field*='"+actualFld+"[]']:checkbox:checked.primary").map(function () {
					        return this.value;
					    }).get();
					}else{
						fieldArr[fieldName] = $('input:checkbox:checked.'+fieldName).map(function () {
												return this.value;
											}).get();
					}
				}else if($(this).prop('tagName') ==  'SELECT'){
					fieldArr[fieldName] = $("SELECT.filter_section_input[name='"+fieldName+"']" ).multiselect("getChecked").map(function(){
												return this.value;
											}).get();
				}else{
					
					if (fieldVal.indexOf("#@#") !=-1) {
					   fieldArr[fieldName]	= fieldVal = fieldVal.split("#@#");
					}
					else {
						fieldArr[fieldName] = fieldVal;
					}
				}
			}
		});
		e.preventDefault();
		if(pGroupBy == "undefined"){
			pGroupBy = '';
		}
		json = JSON.stringify(fieldArr);

		$("#content_id").val(contentId);
		$("#json").val(json);
		$("#pGroupBy").val(pGroupBy);

		$("#export_form").submit();
		
	});

	
	
	$('body').on('click','.btnExport',function(e){
		var ssid 	= '';
		ssid		= $('#ssid').val();

		var fieldArr 			= {};
		var pVal				= ''; 
		var pGroupBy 			= '';
		fieldArr['liveAppId']	= $('#liveappid').val();
		pVal					= $('#periodVal').attr('name');	//read Year mode value
		pGroupBy				= $("#vizGroupBy").val();
		fieldArr['vizPeriod']	= pVal;
		var contentId			= $(this).attr('id');

		var url_filter			= $('#filter_url').val();	

		if (url_filter.length != 0) {
		  var pieces = url_filter.split("::");
		  fieldArr[pieces[0]] = pieces[1].replace(/\//g, "@@");
		}

		$.each( $(".filter_section_input" ), function( key, value ) {
			var fieldName  		= $(this).attr('name');
			if(fieldName!='' && fieldName!='undefined' &&  $(this).prop("tagName")!='DIV'){
				var fieldVal 	= $(this).val();
				if($(this).attr('type')=="checkbox"){
					fieldArr[fieldName] = $('input:checkbox:checked.'+fieldName).map(function () {
												return this.value;
											}).get();
				}else if($(this).prop('tagName') ==  'SELECT'){
					fieldArr[fieldName] = $("SELECT.filter_section_input[name='"+fieldName+"']" ).multiselect("getChecked").map(function(){
												return this.value;
											}).get();
				}else{
					if (fieldVal.indexOf("#@#") !=-1) {
					   fieldArr[fieldName]	= fieldVal = fieldVal.split("#@#");
					}
					else {
						fieldArr[fieldName] = fieldVal;
					}
				}
			}
		});
		e.preventDefault();
		if(pGroupBy == "undefined"){
			pGroupBy = '';
		}
		json = JSON.stringify(fieldArr);

		$("#content_id").val(contentId);
		$("#json").val(json);
		$("#pGroupBy").val(pGroupBy);

		$('#export_form').attr('action', '/ls/livespace/spreadsheet.export');

		$("#export_form").submit();
		//window.location.href="/ls/livespace/spreadsheet.export/"+ssid;
	});

});
