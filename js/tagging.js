  //Javascript
var site_base_url = '/';
$(document).ready(function(){
	
	///////////////  TAGGING SYSTEM
	
	$('body').on( 'click', 'div.widget-title > span.icon > a.add-to-tag',{ divId: "create_div",
		title:"Add To Tag",
		width:"450",
		txtId:"",
		ajaxUrl: "/ls/tags.new"+$app.queryString(),
		targetUrl:"",
		dType:"tags",
		menuId:""
	},$.fn.createDialog);
	
	////////Delete Tags based on fid and cid
	
	$("body").on("click",'.tag-close',function(){
	
	var cId;
	var $grid	   = $(this).parents('table.data-table').dataTable();
	var tagName   = $(this).closest('.tag').children('span').html(); 
	
	var mainIdVal = $(this).closest('.tag').attr('id');
	var mainIdAr  = mainIdVal.split('_');
	var mainId	   = mainIdAr[1];
	var section  = $("#sectionId").val();
	if(section!=""){
	var sectionAr = section.split('-');
	cId	=sectionAr[1];//inside collection files tag
	}else{
	
	switch(mainIdAr[0]){
	  case 'collection': 
						  cId	= mainId;
						  mainId = 0;	
							break;
	  case 'elements':
							if(mainIdAr[3]>0){
							cId	=mainIdAr[3];
							}else{
							cId	='';
							}
							break;
	}

	}
	$(this).closest('.tag').remove();
	var dataString ="mainId="+mainId+"&tag="+tagName;
	$.ajax({
		type: "POST",
		url: "/ls/tags.delete/"+cId+$app.queryString(),
		cache: false,
		data:dataString,
		success: function(data){
			$app.FnRefresh();
		}
		});
	return false;
	});
	//Moving a file from one collection to other	
	$('body').on( 'click', '.move_to_collection',{ divId: "move_coln",
			title:"Move To",
			width:"350",
			txtId:"addto_group_list",
			ajaxUrl: "/ls/collection.movefiles",
			targetUrl:"",
			dType:"lsGroup",
			menuId:"leftDocs"
	},$.fn.createDialog);

	//Moving a file from one collection to other	
	$('body').on( 'click', '.move_fileversion',{ divId: "move_coln",
			title:"Move To",
			width:"350",
			txtId:"addto_group_list",
			ajaxUrl: "/ls/livespace.movefiles",
			targetUrl:"",
			dType:"lsGroup",
			menuId:"leftDocs"
	},$.fn.createDialog);

	$("body").on("click",'.clear_tag',function(event){
		$('.tagselect').removeClass("active");
		event.preventDefault();
		$("#tags").val('');
		var existing_tag  =  $("#tags").val();
		var result   	 	=  existing_tag.split('##@##');
		$('#multitag_list .item_').html('');
		$('.tagselect').find('i').removeClass('fa-check');
		$('.tagselect').find('i').addClass('fa-tag');
		//applyMultitag(result);
	  	goBack();
	});

	$("body").on("click",'.tagselect',function(event){
		var new_tag  		= 	$(this).closest('li.file').find('span').text();
		var existing_tag 	= 	$("#tags").val();
		var result 			= 	[];
		if( existing_tag ) {
			if(existing_tag.length > 0){
				result 				= 	existing_tag.split('##@##');
			}
		}

		var updated_tag		=	'';

		if (window.location.hash) {
		   	hashurl = window.location.hash.slice(1);
		   	if (hashurl) {
		       if (hashurl.indexOf("ls/tags.html") !=-1) {
				    event.preventDefault();
				}
		   	}
	   	}

		$(this).toggleClass('active');
		if($(this).hasClass('active')) {
			if($.inArray(new_tag, result) != -1) {
			} else {
			    result[result.length] = new_tag;
			}
		}
		else{
			//remove element from array
			result = $.grep(result, function(value) {
			  return value != new_tag;
			});
		}
		if(result.length == 0){
			goBack();
		}
		$('.dhd_name.noarrow').html(result.join(', '));
		updated_tag	= 	result.join('##@##');

		$("#tags").val(updated_tag);
		var params = updated_tag.split('##@##');
		applyMultitag(params);
	});

});

function applyMultitag(fieldArr) {
	var ajaxUri	=	'/ls/tags.tagContainer' + $app.queryString();
	var cid 	=	$("#hid_cid").val();
	$.getJSON(ajaxUri, {
            'params': fieldArr,
            'cid' : cid
        },
        function (d, s, jqXHR) {
        	$('#tag_container').html(d.Body);
            //removing empty elements from array
            fieldArr = $.grep(fieldArr, function(n, i){
			  return (n !== "" && n != null);

			});

		    var multitag_list = fieldArr.join(' </span><span> ');
			multitag_list = "<span>"+multitag_list+"</span>";
		    $('#multitag_list .item_').html(multitag_list);
		    var cbJs = function () {
                eval(d.Refs['js-code']);
            };
            if (d.Refs['js'].length > 0) {
                head.js(d.Refs['js'], cbJs);
            } else {
                cbJs();
            }
        }
    );
}

function goBack(){
	if (window.location.hash) {
	   	hashurl = window.location.hash.slice(1);
	   	if (hashurl) {
	       if (hashurl.indexOf("ls/tags.html") !=-1) {
			    window.history.back();
			}
	   	}
   	}
}
