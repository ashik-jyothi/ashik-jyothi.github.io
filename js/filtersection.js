var clearAtherFilters;
$(document).ready(function () {

    $('body').on('change',".periodRange",  function () {
        fnApplyFilter();
    });

    $('body').on('change','.filterElements',  function () {
        fnApplyFilter();
    });

   $('body').on('keydown','.filterElements',  function (event) {
        var code = event.keyCode || event.which;
         if(code == 13) { //Enter keycode
         event.preventDefault();
         fnApplyFilter();
           return false;
        }
    });
   $('body').on('change', ".vizru_autosuggest_list", function () {
        fnApplyFilter();
    });
    
    $('body').on( 'change', '#vizGroupBy', function () {
        fnApplyFilter(); //$("#periodMode").trigger('change');
    });
    
    $('body').on('apply.daterangepicker', '.LAppDateFilter',  function () {
        //$(this).trigger('change');
        fnApplyFilter();

    });
    
     $('body').on('keypress keyup click', ".LAppDateFilter", function(se) {
         /* Prevent page refresh on manual data change and press enter */
        if ( se.which === 13  ) { 
            se.preventDefault();
            $(this).trigger('apply.daterangepicker');
    }
     
    });

    //var select = $("#minbeds");
    

    $('body').on('click', '.vizPeriodClass', function () {

        var dd_point = $(this).attr('name').split('#@#');
        var val;
        var selVal;
        switch (dd_point[0]) {
        case 'Y':
            $("#periodRange>optgroup[label^='"+dd_point[1]+"']").children().attr('selected',true);
            $("#periodRange").multiselect("refresh");
            val = 2;
            break;

        case 'Q':
            $("#periodRange>optgroup").children().attr('selected',false);
            $("#periodRange>optgroup>option[value='"+dd_point[1]+"']").prop('selected',true);
            $("#periodRange").multiselect("refresh");

            val = 3;
            break;
        }
        $('#periodMode').slider('value', val);
    });

    

}); //Filter function


function fnApplyFilter(clickArray,clear) {	
 		$('section#ls').trigger('filterPreInit');
        var fieldArr = {};
        var pVal = '';
        var pGroupBy = '';
        var mp=0;
        fieldArr['liveAppId'] = $('#liveappid').val();
        if($('#liveappid').length >0){
        $('.filterByLiveapp').html('<strong class="applyingFilter"> <i class="icon-spinner icon-spin icon-large mr5 "> </i> Applying Filters .. </strong>');
        
    
        if($('#reportTabEdit li').hasClass('active')  ){
            var tAbStr = $('#reportTabEdit li.active a').attr('href');//$($('.nav-tabs li.active a').attr('href')).index();
            var tabArray = tAbStr.split('-');
            var tAb      = tabArray[1];
            tAb=  $('#reportTabEdit li.active a').data('tabcount');
            
            fieldArr['tabIndex'] = tAb;
        }
        pVal = $('#periodVal').attr('name'); //read Year mode value
        fieldArr['vizPeriod'] = pVal;
        
        var ajaxUri = '/ls/liveapps.filter' + $app.queryString();
        var clklen;
        if(clickArray == null) clklen =0;
        else
         clklen = $.map(clickArray, function(n, i) { return i; }).length;

       /* setTimeout(function() {$('#contents').unblock();}, 2000); */
        setTimeout(function(){ $('#contents').block(new loderconf); }, 50);
       if(clklen>0){
            // check vizPeriodRange exists for period chart click
            if ( typeof clickArray['vizPeriodRange'] !== "undefined" && clickArray['vizPeriodRange']) {
             mp = $.map(clickArray['vizPeriodRange'], function(n, i) { return i; }).length;
            }
            else mp =0;
          //$('#reportTabEdit>span.flttab-but').trigger('click');
            $.each(clickArray,function(clkey, clvalue){
                if(clkey=="filterAreaId"){

                }else{
                    var ckey        = clkey;
                    var clFldArray  = ckey.split('.');
                    var objId       = clFldArray[0];
                    var objFldName   = clFldArray[1];
                    $('#objSourceId').val(objFldName);
                }
                $.each($(".filter_section_input"), function (key, value) {
                var fieldName     = $(this).attr('name');
                
                 if(fieldName){
                    fieldName         = fieldName.replace("_vSv_", " ");
                }
                if (fieldName != '' && fieldName != 'undefined' && $(this).prop("tagName") != 'DIV') {

                    var actualFldArray = fieldName.split('.');
                    var actualFldName  = actualFldArray[1];
                    var fieldVal = $(this).val();

                    if ($(this).attr('type') == "checkbox" && objFldName == actualFldName) {
                     
                        if($(this).hasClass("primary")){
                                $('input.primary[type="checkbox"]').not('[value="'+clvalue+'"]').prop('checked',false) ;
                                $('input.primary[type="checkbox"][value="'+clvalue+'"]').prop('checked',true) ;
                        }
                        else{                            
                            $(this).attr('checked','checked')
                         }
                       

                    } else if ($(this).prop('tagName') == 'SELECT' && objFldName == actualFldName && clkey !="filterAreaId") {
                        if( clkey == "vizPeriodRange"){
                            var periodArray  = clvalue[0].split('-');
                            var cval         = periodArray[0];
                            var optgroup = $('select#periodRange optgroup[label="'+cval+'"]');
                            if(mp==4){
                                var option = optgroup.find('option[value*="'+cval+'"]');
                            }else{
                                var option = optgroup.find('option[value="'+clvalue+'"]');
                            }
                           
                            option.attr('aria-selected', true);
                            option.attr('selected', true);
                            $('#periodRange').multiselect('refresh');
                        }else{
                            $(this).prop('selected',true);
                            $(this).val(clvalue);    $(this).multiselect("refresh");                     
                        }
                    } else if(objFldName == actualFldName) {
                      
                        if($(this).hasClass('vizru_autosuggest_list')){  
                            var str ={id:clvalue, name: clvalue};
                             thIs =$(this);
                            setTimeout(function(){ 
                                thIs.tokenInput("add",str,"preventDuplicates",true); 
                            },500);
                           


                    }else{
                        if($(this).hasClass('LAppDateFilter')){
                            $(this).val(clvalue+" - "+clvalue);
                         }else{
                            $(this).val(clvalue);
                        }
                    }
                             
                    }
                }
                });
                fieldArr[clkey] = clvalue;
           
            });
        }

        else{
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
                    } else if ($(this).prop('tagName') == 'SELECT') {
                        fieldArr[fieldName] = $("SELECT.filter_section_input[name='" + fieldName + "']").multiselect("getChecked").map(function () {
                            return this.value;
                        }).get();

                    } else {
                        if(fieldVal != '')
                        fieldArr[fieldName] = fieldVal;
                    }
                }
            });
        }
        pGroupBy = $("#vizGroupBy").val();
        //console.log(fieldArr);
        filterArr =  _.keys(fieldArr).map( function(item){
                 //console.log(item) 
               if (     _.indexOf( ["liveAppId", "tabIndex", "vizPeriod"], item  ) ==  -1 ) { return item } else { return false };
        

      });

       isArray =  filterArr.map(function(key){
            if (key) {
               if  (fieldArr[key].length) { 
                return true 
            } else  { 
                return false 
            } 
            }
        })

      if (  $.inArray(true, isArray)  == -1) {
        //console.log("hide filters");
        $(".filterbyitems").parents(".filtrdItemsWrap").addClass("hideFiltrList");

      } else {
        //console.log("show filters");
        $(".filterbyitems").parents(".filtrdItemsWrap").removeClass("hideFiltrList");
        
      }
       



                $.getJSON(ajaxUri, {
                        'params': fieldArr,
                        'groupby': pGroupBy
                    },
                    function (d, s, jqXHR) {
                        $app.clearDom();
                        //$('.view_list_apps').html(d.Body);
                        $('.filterByLiveapp').remove();
                        $('#contents').html(d.Body);

                        // Chnage SS view url after filtering :- Convert to Grid feature
                        if( $('.isDashboardView').find('.viewss').length >0){
                            var ahrf=  $('.isDashboardView').find('.viewss').attr('href');
                            var t= "&";
                            $.each(Object.keys(fieldArr), function(i,e){
                              t=t+`params[${e}]=${fieldArr[e]}&`;

                            });
                            var newhref = ahrf+t;
                            $('.isDashboardView').find('.viewss').attr('href',newhref);
                        }

                        $('#reportTabEdit li.tab'+tAb).find('a').tab('show');
                        if(clklen>0){ 
                            $(".reset-cls").show();
                        }else 
                             $(".reset-cls").hide();
                        var cbJs = function () {
                            eval(d.Refs['js-code']);
                        };
                        if (d.Refs['js'].length > 0) {
                            head.js(d.Refs['js'], cbJs);
                        } else {
                            cbJs();
                        }
                        $('section#ls').trigger('filterInitDone');
                    }
                );
            }

    }
    /**#### Created on 05/11/2014 for saving filter data under liveapps ####***/
    $('body').on('click', '.filter_save_div_btn', function () {
        $('.filter-name-div').toggle();
    });
     //Added on 17/9/2016  for closing filter criteria from the top of a dashboard
    $('body').on('click','a.fltclsdash',function(){
        rightBarFn().clear(true); rightBarFn().close(); 
        var y ;
        var removeItem = $(this).attr('id');
        var fieldname  = $(this).attr('name');
         if(fieldname){
             fieldname     = fieldname.replace(" ", "_vSv_");
         }
         if(  $("input.filter_section_input[name*='."+fieldname+"']").val())
           { 
		   	y   = $("input.filter_section_input[name*='."+fieldname+"']").val();//auto and other text
		   }
        else
            { 
				y  = $("select.filter_section_input[name*='."+fieldname+"']").val(); //checkbocxvalues 
			} 
        if(y){
            if(y.includes('#@#') && y.indexOf('#@#') > -1){
                //Autosuggested values format abc#@#def#@#ghi
                y= y.split('#@#');
            }
		 if (typeof(y) == "object"){
			 y = jQuery.grep(y, function(value) {
          			return value != removeItem;
       		 });
			}

            //Closing primary filter 
             if (typeof(y) == "string" && $("input.filter_section_input[data-field*='."+fieldname+"[]']").hasClass('primary')){
                    $("input.filter_section_input[data-field*='."+fieldname+"[]']").each(function(){
                     var val = $(this).val();
                     val= val.replace('__vizdot__','.'); 
                    
                   if(val==removeItem){
                    $(this).prop('checked',false);
                }
            });

             }
            //Date Case
            else if (typeof(y) == "string"){
                  y= "";
            
            }
        }
        
			 else{
				   y = '';
				 }
        if(!$("input.filter_section_input[name*='."+fieldname+"']").val()){
             $("select.filter_section_input[name*='."+fieldname+"']").val(y);
             $("select.filter_section_input[name*='."+fieldname+"']").attr('aria-selected',false);
             $("select.filter_section_input[name*='."+fieldname+"']").multiselect("refresh"); 
         }
        //$("input[name*='"+$(this).attr('name')+"']" ).val("");
        //Autosuggest
       if (typeof(y) == "string" && $("input.filter_section_input[name*='."+fieldname+"']").hasClass('primary')){}else{
		  $("input.filter_section_input[name*='."+fieldname+"']").val(y);
         }
          if($("input.filter_section_input[name*='."+fieldname+"']").hasClass('vizru_autosuggest_list')){ 
            $(".vizru_autosuggest_list[name*='."+fieldname+"']").tokenInput("remove", {name: $(this).attr('id')});
        }
      $(".reset-cls").trigger('click');
      fnApplyFilter();
		
			
		
    });
    $('body').on('click','li.tabdashfilter', function(e){
        $(".savdFiltrWrap ").hide();
        $(this).parents(".rightTbStyle").find(".filtSaveTab").removeClass("active");
        //$(".saveTabCont").parents("#dashfilter").removeClass("saveFiltrActive");
    });
    /*$('body').on('click','.filtSaveTab', function(e){
        $(".saveTabCont").parents("#dashfilter").addClass("saveFiltrActive");
        if($(".filtrdItemsWrap").hasClass("hideFiltrList")){
            $(".filtrdItemsWrap").parents("#dashfilter").removeClass("saveFiltrActive").addClass("withoutFilters");
        }
    })*/
    $('body').on('click', '.reset-cls,.clear-all', function () {
         rightBarFn().clear(true); rightBarFn().close(); 
        if($("#periodRange").length ==1){
            $("select[id=#periodRange] optgroup").find('option').attr('aria-selected', false);
            $("select[id=#periodRange] optgroup").find('option').attr('selected', false);
            $("#periodRange").multiselect("refresh");  
        }
        //var objId = $('#objSourceId').val();
        var tmpval = [];
        var i =0;
         $(".filter_section_input").each(function(){ 
             tmpval[i] =  $(this).attr('name');
             i++;
        });
         if( $.inArray('vizPeriodRange', tmpval) > -1) {
            tmpval = $.grep(tmpval, function(value) {
            return value != "vizPeriodRange";
            });
         }
         if( $.inArray(undefined, tmpval) > -1) {
         	tmpval = $.grep(tmpval, function(value) {
          	return value != undefined;
        	});
     	}
        var l = tmpval.length;
        var substr=[];
        var j=0;
        for(i=0;i<l;i++){
            substr[j] = tmpval[i].split('.');
            j++;
         }
        var sublen=substr.length;
        var p =0;
        var objId=[];
        for(i=0;i<sublen;i++){
            objId[p]=substr[i][1];
            p++;
         }
        var lenob =objId.length;
        for(i=0;i<lenob;i++){
            objId1 = objId[i];
            $("select[name$='"+objId1+"']" ).prop('selected',true);
            $("select[name$='"+objId1+"']" ).val(""); 
            $("select[name$='"+objId1+"']" ).multiselect("refresh"); 
            $("input[name$='"+objId1+"']").filter(".filter_section_input").not('.primary').val("");    
            $("input.primary[name$='"+objId1+"']").prop('checked',false);  

            if($("input[name$='"+objId1+"']").hasClass('vizru_autosuggest_list')){ 
              /*  $("input[id*='"+objId1+"']").closest('ul.token-input-list').find("li.token-input-token").remove(); */
                $(".filter_groups input.filter_section_input[id*='"+objId1+"']").tokenInput("clear")
            }
        }
        $(".reset-cls").hide();  
        setTimeout(function() {$('#contents').unblock();}, 2000); 
        setTimeout(function(){ $('#contents').block({
                            "message": "<div class=\"pageloader cDtable\" style=\"height:auto; margin-top:35px;\"><i class=\"icon-spinner font_40 icon-spin\"><\/i><span class=\"font_20 ml15\">Processing..<\/span><\/div>","centerY": false,"css": { "width": "20%", "top": "50px", "left": "10%", "right": "","border": "none", "padding": "0px",  "backgroundColor": "", "opacity": "1", "color": "#FFF" },
                                "overlayCSS": {"backgroundColor": "#FFF", "opacity": "0.9", "margin": "0px 0 0" }
                         }); },100);
        fnApplyFilter();
    
    });

     clearAtherFilters = function () {
        /* onclik event changed to function  $('body').on('click', '.controller.chart .highcharts-series-group, .controller.stacked .highcharts-series-group',  */ 
		 /*  Reset filtered values on chart click */   
        if($("#periodRange").length ==1){
            $("select[id=#periodRange] optgroup").find('option').attr('aria-selected', false);
            $("select[id=#periodRange] optgroup").find('option').attr('selected', false);
            $("#periodRange").multiselect("refresh");  
        }
        var objIdname = $('#objSourceId').val();
        if(objIdname){
             objIdname     = objIdname.replace(" ", "_vSv_");
    
         }
        var tmpval = [];
        var i =0;
         $(".filter_section_input").each(function(){ 
             tmpval[i] =  $(this).attr('name');
             i++;
        });
         if( $.inArray('vizPeriodRange', tmpval) > -1) {
            tmpval = $.grep(tmpval, function(value) {
            return value != "vizPeriodRange";
            });
         }
         if( $.inArray(undefined, tmpval) > -1) {
         	tmpval = $.grep(tmpval, function(value) {
         	 return value != undefined;
        	});
     	}
        var l = tmpval.length;
        var substr=[];
        var j=0;
        for(i=0;i<l;i++){
            substr[j] = tmpval[i].split('.');
            j++;
         }
        var sublen=substr.length;
        var p =0;
        var objId=[];
        for(i=0;i<sublen;i++){
            objId[p]=substr[i][1];
            p++;
         }
        objId = $.grep(objId, function(value) {
          return value != objIdname;
        });
		if($("input.filter_section_input[name*='"+objIdname+"']").hasClass('vizru_autosuggest_list')){  
				$("input.filter_section_input[name*='"+objIdname+"']").tokenInput("clear");
          }	
        var lenob =objId.length;
       // objId = $.unique(objId.sort()).sort();
       if(lenob != 0){

        for(i=0;i<lenob;i++){
            objId1 = objId[i];
            $("select[name$='"+objId1+"']" ).prop('selected',true);
            $("select[name$='"+objId1+"']" ).val(""); 
            $("select[name$='"+objId1+"']" ).multiselect("refresh"); 
            if($("input[name$='"+objId1+"']" ).filter(".filter_section_input").hasClass("primary")){
                $("input[name$='"+objId1+"']" ).filter(".filter_section_input").prop('checked',false) ;
        }
        else{   $("input[name$='"+objId1+"']" ).filter(".filter_section_input").val("");  }
            if($("input[name$='"+objId1+"']").hasClass('vizru_autosuggest_list')){  
              //  $("input[id*='"+objId1+"']").closest('ul.token-input-list').find("li.token-input-token").remove();
				$("input[name$='"+objId1+"']").filter(".filter_section_input").tokenInput("clear");
            }
        }
    }
	 };
    /** Filter save button click event **/
    $('body').on('click', '.filter_save_btn', function () {

        var mode;
        if($('#periodMode').length>0)
            mode = $('#periodMode').slider('value');
        else
            mode = '';   
        var range;
        if($('#periodRange').val()!="")
            range = $('#periodRange').val();
        else
            range ='';
        var xData = {
                        name                : $('#filter-save-name').val(),
                        periodMode          : mode,
                        periodSelection     : range,
                        liveAppId           : $('#liveappid').val(),  
                        filterData          : $('form#formFilter').serialize().replace(/[^&]+=&/g, '').replace(/&[^&]+=$/g, ''),
                        vizGroupBy          : $('#vizGroupBy').val(),
                        primaryFilter       : $("input.primary").serialize().replace(/[^&]+=&/g, '').replace(/&[^&]+=$/g, '')
                    };
        var serialized          = xData.filterData;
        var primarySerialized   = xData.primaryFilter;
        if($('#filter-save-name').val()==''){
            $('.messages').show().html('<div class="alert-error alert"><a  data-dismiss="alert" class="close">×</a><div>Please enter name</div></div>').fadeOut(2000);
            return false;
        }else{
            //Save only if filter value exists
            if((serialized.substr(serialized.length - 1) == '=' || serialized.length == '') && primarySerialized.length == ''   && mode == '' ){
                $('.messages').show().html('<div class="alert-error alert"><a  data-dismiss="alert" class="close">×</a><div>Please select any filter</div></div>').fadeOut(2000);
                return false;
            }else{ 

                // var name = $('#filter-save-name').val();
                // $('#savedReportName').val(name);
                // var saved =$('#savedReportName').val();
                $.post('/ls/liveapps/filter/criteria.new/'+$app.queryString(),
                                xData ,
                                function(data){
                                    if(data == -1){
                                        $('.messages').show().html('<div class="alert-danger alert"><a  data-dismiss="alert" class="close">×</a><div>Not Saved.Name already exist</div></div>').fadeOut(4000);
     
                                    }else{
                                    // if($('div#breadcrumb').find('ul .current span').length>0)
                                    //     $('div#breadcrumb').find('ul .current span').remove();

                                    //  $('<span />', {html: ' - ('+saved+')'}).appendTo($('div#breadcrumb').find('ul .current'))
                                     $('#filter-save-name').val('');
                                     $('body').find('table.filterSavedClass').dataTable().fnDraw();
                                     $('.messages').show().html('<div class="alert-success alert"><a  data-dismiss="alert" class="close">×</a><div>Saved successfully</div></div>').fadeOut(4000);
                                    }   
                                    
                });
            }
        }

       
    });
