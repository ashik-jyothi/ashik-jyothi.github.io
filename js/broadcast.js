// JavaScript Document
/////////////////////Broadcast ////////////////
var autoCompleteBrd,
	updateSelctGrp;
var lsb_id;
function repoFormatResult(repo) {
    var markup = '<div class="row-fluid">' +
        '<div>"' + repo.label + '</div>' +
        '<div>' +
        '<div class="row-fluid">' +
        '<div>' + repo.id + '</div>' +
        '</div>';
    markup += '</div></div>';

    return markup;
}

function repoFormatSelection(repo) {
     return repo.name;
}

var DropImage = [];
function fileDropOnRightPanel(event) {
	$('#files').html("");
	DropImage = [];
	event.preventDefault();
		$("#add_attach_box").show();
		var files = event.originalEvent.dataTransfer.files.length;
		for(var i=0; i < files; i++){
			DropImage[i] = event.originalEvent.dataTransfer.files[i];
		}
		
		$.each(DropImage,function(i, file){
				$('#files').append("<li>"+ file.name +"</li>");
		});
		setMessageAreaHeight();
}

$('body').on('dragenter', '.right-content-messages', function(e) {
	e.preventDefault();
	e.stopPropagation();
	if(!$('.rightdragAndDropArea').length){
		$('.right-content-messages').append('<div class="rightdragAndDropArea"><span class="dragDropText">Drop Files here..</span></div>');
		var dropArea = document.getElementsByClassName('rightdragAndDropArea');
		dropArea[0].addEventListener('dragleave', handleDragLeave, false);
	}
});

function handleDragLeave(e) {
			e.preventDefault();
			$('.rightdragAndDropArea').remove();
}

$('body').on('drop','.rightdragAndDropArea',function(e){
	e.preventDefault();
	$('.rightdragAndDropArea').remove();
	fileDropOnRightPanel(e);
});


$(document).ready(function(){
	updateSelctGrp = function(a){
		var delim;
		if($app.queryString() == "")
			 delim ="?";
		else delim = "&";
		$("#permissionset").tokenInput('destroy');
		$("#permissionset").tokenInput("/ls/livespace/broadcasts.bjson/all/"+$app.queryString()+delim+"livespace_id="+a, {
		theme: "facebook",
		hintText: "Search Users",
		jsonContainer: 'seltype',
		crossDomain: false,
		preventDuplicates: true
	});
		}
	
	function reverseString(string) {
		var reversedString = "";
		var stringLength = string.length - 1;
		for (var i = stringLength; i >= 0; i--) {
			reversedString += string[i];
		}
		return reversedString;
	}

	function split(val) {
		return val.split(/@\s*/);
	}

	function extractLast(term) {
		return split(term).pop();
	}

	$.ui.autocomplete.prototype._renderItem = function (ul, item) {
		var highlighted = item.label.split(this.term).join('<strong>' + this.term +  '</strong>');
		return $("<li></li>")
		  .data("item.autocomplete", item)
		  .append("<a>" + highlighted + "</a>")
		  .appendTo(ul);
	};


	autoCompleteBrd = function (){};



	function get_json(stype,pid,key2,response1){
		var data;
		if(stype=="User"){
			data= $.get("/ls/livespace/broadcasts.bjson/users."+pid+".email/"+$app.queryString()+"&q="+encodeURIComponent(key2),
		  		 function(data) {
			  		var bcSelectType = data.seltype;
					response1(bcSelectType);			   
				 }, "json"); 
		}
		else if(stype=="Apps"){
			data= $.get("/ls/livespace/broadcasts.bjson/ls."+pid+"/"+$app.queryString(),
					function(data) {
					 var bcSelectType = data.seltype;
					 response1(bcSelectType);			   
					}, "json");
		}
		else if(stype=="files"){
			data= $.get("/ls/livespace/broadcasts.bjson/files."+pid+"/"+key2+$app.queryString(),
					function(data) {
					 var bcSelectType = data.seltype;
					 response1(bcSelectType);			   
					}, "json");
		}
		else if(stype=="Dashboard"){
			data= $.get("/ls/livespace/broadcasts.bjson/lapps."+pid+"/"+$app.queryString(),
					function(data) {
					 var bcSelectType = data.seltype;
					 response1(bcSelectType);			   
					}, "json");
		}
		
		return data;						 
	}
	$("body").on("click",'.collab_choose',function(){
			if($(this).val() == 1){
				$("#permit_set").show();   
			}else{
				$("#permit_set").hide();   
			}
	});



	//////////////////////////////////////////////////////////////////


	/* Custom Script For Add Broad Cast Statr*/
	$("body").on('click', '#add_broadcast_fld', function () {
		var  eOpen = $(this).hasClass('open');
		$("#attach,.SelectLsDr").fadeIn();
/*		if( eOpen ==false){} else{} */
		$(this).addClass('open');
	});
	
	
	/*****************ATTACH FUNCTIONALITY STARTS HERE************************/
	
	$("body").on('click', '#attach_click', function () {
		DropImage = [];
		$("#add_attach_box").show();
		$("#liveapps_div, #add_user_box, #events_div,#add_settings_box").hide();
		$("#attach_file").click();
		//setMessageAreaHeight();
	});
	var attachArray	= new Array();
	$("body").on('change', '#attach_file', function() {
		var cnt=0;
		/*$.blockUI({ message: '<h3 class="loader"><i class="icon-spinner icon-spin icon-1x clr_blue"></i> File enqueued for uploading...</h1>' });*/
		/* now you can work with the file list */
		var nFile='';
		var oFiles =$("#attach_file").get(0).files;
		var  nFiles = oFiles.length;
		$.each(oFiles,function(i, file){
		    nFile +="<li>"+ file.name +"</li>";
			cnt++;
			
		});
		$('#files').html(nFile);
		$('#add_attach_box div.ml10').html(nFile);
		$("#add_attach_box").show();
		$("#liveapps_div, #add_user_box, #events_div,#add_settings_box").hide();
		setMessageAreaHeight();		

	});
	
	
	$(".bcast-div").on('click', '#adduser_remove', function () {});
	$("body").on('click', '#add_remove', function () {
        $("#add_settings_box, #add_user_box, #events_div, #add_attach_box").hide();
    });

	$("body").on('click', '#addattach_remove', function () {
		$("#add_attach_box").hide();
		setMessageAreaHeight();
		$('#attach_file').val('');
		DropImage = [];
		
	}); /* Custom Script For Add Broad Cast End*/
	
	$("body").on('click', '#tag_attach_remove', function () {
		$("#tag_attach_box").hide();
		ssTagobj = {};
		setMessageAreaHeight();
		
	}); /* Custom Script For Add Broad Cast End*/

	$("body").on('click', '.ssTagel', function () {
		var eVal = $(this).attr('data-tag');
		ssTagobj.tag = (ssTagobj.tag).replace(' '+eVal,'');
		if ($.trim(ssTagobj.tag)  == ""){
			$('#tag_attach_remove').trigger('click');
			}
		
		$(this).remove();
		
	}); /* Custom Script For Add Broad Cast End*/



	
	 
	$("#liveset").tokenInput("/ls/livespace/broadcasts.bjson/ls", {
		theme: "facebook",
		hintText: "Search liveSpace",
		preventDuplicates: true,
		jsonContainer: 'seltype'
	});

	
	///////////Broadcast Section
	//Form Submission
	function submit_bcast_form(){
		var formObj = $('form#broad_cast_form');
		gSerch.liveSpaceId = [$("#select_apps_bcast").val()];
		/*formObj[0]['lsId'].value = $("#select_apps_bcast").val();
		formObj[0]['lsName'].value = $(".SelectLsDr>span").html();*/
		var formData = new FormData(formObj[0]);
		$.each(ssTagobj, function(a,i){
			/*Extend Formdata with Spreadsheet Tags */
			formData.append(a,i); 
			});

			if(DropImage.length != 0){
				formData.delete("attach_file[]");
				for(var i=0; i<DropImage.length; i++){
					formData.append("attach_file[]",DropImage[i],DropImage[i].name);
				}

			}

		/*var cfm=true;
		var bcount= $(".bcount").html();*/
	/*	if(bcount=="")bcount=0;*/
		if($("#add_broadcast_fld").val()!=""){
			var oFiles = $("#attach_file").get(0).files;
			var nFiles = oFiles.length;
			if (oFiles.length) {
			  $('#messageProgressBar').show();
				var percentage = 0;
				function showProgress () {
					if(percentage < 100){
						percentage += 1;
						$('div.progress > div.progress-bar').css({
							"width": percentage + "%"
						});
						setTimeout(function (){showProgress();},100)
					}
				}
				showProgress();
			}
				$.ajax({
					url: "/ls/livespace/broadcasts.save",
					beforeSend : function(){ $( "#add_attach_box" ).addClass( "active" ); },
					type: 'POST',
					data: formData,
					async: true,
					cache: false,
					success: function (data) {
						$( "#add_attach_box" ).removeClass( "active" );
						ssTagobj={};
						if(data == 'false'){
							var r = confirm("File cannot be uploaded to this storage space, do you want to continue broadcast without attachment?");
						    if (r == true) {
						        //proceed
						        formData.append("upload", 1);
						        $.ajax({
									url: "/ls/livespace/broadcasts.save",
									type: 'POST',
									data: formData,
									async: false,
									cache: false,
									beforeSend: function() {},
									success: function (data) {
										$("#add_broadcast_fld").val("");
			
										eval(data);
										gSerch.tabId= "messages";
										if($('.right-content-messages #rightMesageFileLink').length){
											gSerch.rowfilter = true;	
										} 
										else{
											gSerch.searchKey='';
											gSerch.rowfilter = false;
										}
										
										gSerch.page= 1;
										 Searchrightbar(gSerch);


										 if(gSerch.rowfilter){
											 $app.do({
												 action:function(){
																ssGridShowTagMessage(window.rightpanel.ssform.ssid, window.rightpanel.ssform.rowid, "false" );
															 },
												 time: 300
											 });
										 }

									},
									contentType: false,
									processData: false
								});
						    } else {
						    }
						}
						else{
								$("#add_broadcast_fld").val("");
								eval(data);	
								gSerch.tabId= "messages";
								if($('.right-content-messages #rightMesageFileLink').length){
											gSerch.rowfilter = true;	
										} 
										else{
											gSerch.searchKey='';
											gSerch.rowfilter = false;
								}
								gSerch.page= 1;
								Searchrightbar(gSerch);
								if(gSerch.rowfilter){
									$app.do({
												action:function(){
															 ssGridShowTagMessage(window.rightpanel.ssform.ssid, window.rightpanel.ssform.rowid, "false");
															},
												time: 300
											});
								 }

							}
					},
					error:function(){
						$app.setMessage('Select livespace to Send Message', 'error')
						},
					contentType: false,
					processData: false
				});
			}
		
		return false;
	}

	$("body").off("submit","form#broad_cast_form",submit_bcast_form);
	$("body").on("submit","form#broad_cast_form",submit_bcast_form);
});