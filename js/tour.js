jQuery.fn.getPath = function () {
    if (this.length != 1) throw 'Requires one element.';
    var path, node = this;
	var tagNamme = node[0].tagName.toLowerCase();
    if (node[0].id && tagNamme !== "input" && tagNamme !== "select" && node[0].className !== "code-browse" && node[0].className.indexOf("vwidget-abtn") === -1){	
		return path = tagNamme +"#" + node[0].id;
	}
	else{
		var nodeLenghth = node.length; 
		while (nodeLenghth) {
			if(node.parent().hasClass('tile-item-wraper')) {
				if($(path).hasClass("nextDashButton")){
					path = "a.nextDashButton.addDashButton ";
				}else{
					path =  "#"+node.attr("id").trim()+" "+ path;
				}
				break;
			}
			if(node.hasClass('modal')) {
				path =  ".modal "+ path;
				break;
			}
			if(node.hasClass('tileaction')) {
				path =  ".showTileAction .tileaction "+ path;
				path = path+""+getClasss( path );
				break;
			}
			if(node.hasClass('ui-dialog')) {
				path =  ".ui-dialog "+ path;
				break;
			}
			var realNode = node[0],
				name = realNode.localName;
				
			if (!name) break;
			name = name.toLowerCase();
			var parent = node.parent();
			var siblings = parent.children(name);
			if (siblings.length > 1) {
				name += ':eq(' + siblings.index(realNode) + ')';
			}
			path = name + (path ? '>' + path : '');
			node = parent;
		}
	}
	if($(path).parents(".dashActions").length > 0){
		path = path+""+getClasss( path );
	}
    return path;
};

function getClasss( elemnt ){
		var classs = "";
		var classes = $(elemnt).attr("class").split(" ");
		for (var i = 0; i < classes.length; ++i) {
			 if ( classes[i] ){classs += "."+classes[i]; }
		}
		return classs;
}

function createTour(){
	if($(".tourStatus").length === 0){
		$('body').append("<div class='tourStatus add notPick'><span class='title'>Tour</span><ul class='tourActions'><li><a class='notPick tip-top' title='Add Tour' id='tourAdd'><i class='fa fa-plus'></i><span>Step</span></a></li><li><a class='notPick tip-top'  title='Finish Tour' id='tourFinish'><i class='fa fa-flag-checkered'></i><span>Finish</span></a></li><li><a class='notPick tip-top' title='Run Tour' id='tourRun'><i class='fa fa-play-circle'></i><span>Run</span></a></li><li><a class='notPick tip-top' title='Exit Tour' id='tourExit'>  <i class='fa fa-times-circle'></i><span>Exit</span></a></li></ul></div>");
		$(".tourStatus").draggable({axis: "x", handle: ".title"});
	}	
}
// var  itemPromise = jQuery.Deferred(); promiseTour(itemPromise); }
function promiseTour() {
	var  itemPromise = jQuery.Deferred();
	 if ($.active > 0) {
		console.log($.active);
	 }
    setTimeout(function() {
        var setInt = setInterval(
            function() {
                if ($.active == 0) {
                    setTimeout(function() {
                        itemPromise.resolve();
                    }, 500);
                    clearInterval(setInt);
                }
            }, 500);
    }, 500);
    return itemPromise;
}

function refresh4Tour(){
	//$app.FnRefresh();
	$('.customCheckBox input[type="checkbox"]').prop('checked',false);
	$('.dashwrap').removeClass('selected');
	$('.dataCheck').removeClass('active');
	$('.showTileAction').removeClass("showTileAction");
	rightBarFn().close();
}


function removeTourElements(){
	$('body').removeClass('tourAdd  pickerActive, pickerSecondActive, pickerFirstActive');
	$('.pickerMarker, .stepCreator, .pickeroverlay, .pickerSecondMarker').remove();
	$(".tourStatus").removeClass("activeAdd");
	$(".showDrop").removeClass("showDrop");
	recordStatus =  "";
}
function showDropDown(thisis, create){
	$(".showDrop").removeClass("showDrop");
	if(thisis.parents(".dropdown").length !== 0 ){
		thisis.closest(".dropdown").addClass("showDrop") ;
	}
	if(thisis.parents(".logoDrop").length !== 0 ){
		thisis.closest(".logoDrop").addClass("showDrop") ;
	}
	if(thisis.parents(".dropup").length !== 0 ){
		thisis.closest(".dropup").addClass("showDrop") ;
	}
	if(thisis.parents(".dropdownSubmenu").length !== 0 ){
		thisis.closest(".dropdownSubmenu").addClass("showDrop") ;
	}
	if(thisis.parents(".dashActions").length !== 0 ){
		thisis.closest(".dashActions").addClass("showDrop") ;
	}
	if(thisis.parents(".staticItem").length !== 0 ){
		thisis.closest(".staticItem").addClass("showDrop") ;
	}
	if(thisis.parents(".flo.relative").length !== 0 ){
		thisis.closest(".flo.relative").addClass("showDrop") ;
	}
	if(!create){
		if(thisis.parents(".ps-active-y").length !== 0 ){
			$('#arrangeDashBoard').animate({ scrollTop: thisis.offset().top-300 }, 0);	
		}
	}
}

function stopAllEvents(e){
	e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();	
}

function markerHover(thisis, marker, edit){
	var offset, OffTop, OffLeft, placement =  0;
	
	if(edit === "edit"){
		path = thisis;
		$("body").append( "<div class='"+marker+"'>" );
		
	}else{
		path = $(thisis).getPath();
	}
	if($(path).length === 0){
		OffTop =  0;
		OffLeft =  0;
	}else{
		offset = $(thisis).offset();
		OffTop =  offset.top;
		OffLeft =  offset.left;
		placement = "right";
		if(OffLeft > ($(document).width()/2)){
			placement = "left";	
		}
	}
	
	$("."+marker).css({display:"none"});
	$("."+marker).css({display:"block", width : $(thisis).outerWidth(), height : $(thisis).outerHeight(),  top: OffTop, left: OffLeft }).attr({"data-path":path, "data-placement" : placement});
}

function  createDialog(options){

	  var opts = $.extend( {
						    "step": {
						      "element": "",
						      "title": "",
						      "content": "",
						      "event": {
						        "onNext": {
						          "element": "",
						          "action": ""
						        }
						      }
						    },
						    "mode":'New',
						    "order":"",
						    "tourStepid": "",
						    "Name": "",
						    "tourid": ""
						  }, options);

	 var click 			= opts.step.event.onNext.action=='click' ?'selected="selected"':"";
	 var elementClick 	= opts.step.event.onNext.action=='click element' ?'selected="selected"':"";
	 var nextOption 	= opts.step.event.onNext.action=='click element' ?'style="display: list-item;"':"";
	 var modVal 		= opts.mode=='New' ?'<a class="btn btn-primary pull-left mr5 onNext">Save</a> <a class="btn btn-primary endTour">Finish</a>':'<a class="btn btn-primary pull-left mr5 onUpdate" data-tour="'+opts.tourid+'" data-step="'+opts.tourStepid+'" data-href="'+opts.editUrl+'" data-order="'+opts.order+'">Update</a>';

	
	
	if(opts.step.element !== ""){;
			showDropDown($(opts.step.element), "create");
			markerHover( opts.step.element , "pickerMarker", "edit") ;
	 }
	if(opts.step.event.onNext.element !== "" && opts.step.event.onNext.action ==='click element'){
			showDropDown($(opts.step.element), "create");
			markerHover( opts.step.event.onNext.element , "pickerSecondMarker", "edit") ;
	 }

	var template =`<article class="stepCreator notPick">
  <div class="stepHeader">
    <h3>Tour</h3>
    <a class="closeStep">&#10006;</a> </div>
  <div class="stepBody" >
    <form id="frmStep">
      <ul>
        <li class="form-group tourname">
          <label>Tour Name</label>
          <input value="${opts.Name}"  class="form-control" id="txtTourName" name="txtTourName" placeholder="Name" required>
        </li>
        <li class="form-group inner-addon left-addon">
          <label>Element</label>
          <div class="elementPicker elPick"><i class="fa fa-crosshairs form-control-feck"></i><span>Pick Element</span></div>
          <input value="${opts.step.element}" class="form-control txtStepSelector txtPick" name="txtElement" id="txtElement" placeholder="Selector" required>
        </li>
        <li class="form-group">
          <label>Title</label>
          <input value="${opts.step.title}" class="form-control toutTitle" placeholder="Name" name="txtToutTitle" id="txtToutTitle" required>
        </li>
        <li class="form-group">
          <label>Content</label>
          <textarea class="form-control tourCntent" id="txtTourCntent" name="txtTourCntent" placeholder="Content">${opts.step.content}</textarea>
        </li>
        <li class="form-group">
          <label>On Next</label>
          <select class="form-control" id="tourNextElement" name="tourNextElement">
            <option value="" >Select Type</option>
            <option ${click} value="this">Click This</option>
            <option ${elementClick} value="element">Click Selected Element</option>
          </select> 	
        </li>
        
        <li class="form-group nextOption element" ${nextOption} >
          <label>Element</label>
          <div class="elPick secondElementPicker"><i class="fa fa-crosshairs form-control-feck"></i><span>Pick Element</span></div>
          <input value="${opts.step.event.onNext.element}" class="form-control txtActionSelector txtPick" placeholder="Selector" id="txtActionSelector" name="txtActionSelector" required>
        </li>
        </li>
        <li>${modVal} <a class="pull-right btn btn-primary cancelTourStep">Cancel</a></li>
		<input type="hidden" value="" name="txtPlacement" id="txtPlacement">
      </ul>
    </form>
  </div>
</article>`
	$('body').append(template);
	$('.stepCreator').css({"top":100, left : ($(document).width() - 400)/2}).fadeIn().draggable({handle: ".stepHeader h3"});
	if($app.tourname){
		$('.form-group.tourname').addClass('hide');	
		$('.stepHeader h3').html($app.tourname);
	}
}
function tourUrl(){
	var hashval = window.location.hash.substr(1);
	var pageName = hashval.split('/');
	if(pageName[0] === "ls" || pageName[0] === "user"|| pageName[0] === "livecloud" || pageName[0] === "storage" ){
		loadPageTours = pageName[1];
	}else{
		loadPageTours = pageName[0];
	}
	if(loadPageTours  === "livespace.html" && pageName[2].match("templates") ){
		loadPageTours = loadPageTours+"_templates";
	}
	if( pageName[3] === "users.html"){
		loadPageTours = pageName[3];
	}
	loadPageTours = loadPageTours.replace(".", '_');
	return loadPageTours;
	
}
function showPageTourIcon(){
	var loadPageTours = tourUrl();
	$.getJSON('/tour.pagetourlist').done(function(data){
		var customPageTour  = _.find(data.generalTour, function(num){  return num.url == loadPageTours; });
			if(tourArray[loadPageTours] || customPageTour ){
				$("#tourPage").show();
			}else{
				$("#tourPage").hide();
			}
	})
		
}



$(function(){
	
	
	
	var recordStatus = "";
	$('body').on('click',"#createTour",function(e){
		e.preventDefault();
		createTour();
	});
	
	$('body').on('click',"#tourAdd",function(e){
		e.preventDefault();
		$(".tourStatus").addClass("activeAdd");
		$('body').addClass('tourAdd  pickerActive pickerFirstActive');
		$('body').append("<div class='pickerMarker'></div>");
		recordStatus =  "start";
	});
	
	$('body').on('click',"#tourRun",function(e){
		$.ajax({
				type: "POST",
				url: "/general.tour",																
				cache: false,
				data: {status:'Run',tourname:$app.tourname},
				success: function(data){
				//	$app.setMessage("Saved Successfully","success");
				}
			});
	});
	
	$('body').on('click',"#tourFinish",function(){
		 $.ajax({
			type: "POST",
			url: "/tour.save",																
			cache: false,
			data: {flag:1,tourid:$app.tourId},
			success: function(data){
				$(".tourStatus").remove();
				$app.tourname = "";
				$app.tourId   = "";
				if($app.toureditUrl){
					window.location =$app.toureditUrl; 
				}
				$app.toureditUrl='';
			//	$app.setMessage("Saved Successfully","success");
			}
		});
	});
	$('body').on('click',"#tourExit",function(){
		$app.tourname = "";
		 $.ajax({
				type: "POST",
				url: "/tour.save",																
				cache: false,
				data: {tourexit:1},
				success: function(data){
					$(".tourStatus").remove();
					$app.tourname = "";
					$app.tourId   = "";
					if($app.toureditUrl){
						window.location =$app.toureditUrl; 
					}
					$app.toureditUrl='';
				//	$app.setMessage("Saved Successfully","success");
				}
			});
	
	});
	$('body').on('click',".elementPicker",function(e){
		e.preventDefault();
		$(".tourStatus").addClass("activeAdd");
		$('.pickerMarker').remove();
		$('body').addClass('tourAdd  pickerActive pickerFirstActive');
		$(".stepCreator, .pickeroverlay").hide();
		$('body').append("<div class='pickerMarker'></div>");
		recordStatus =  "changePicker";
	});
	
	$('body').on('click',".secondElementPicker",function(e){
		e.preventDefault();
		$(".tourStatus").addClass("activeAdd");
		$('body').addClass('tourAdd  pickerActive pickerSecondActive');
		$(".stepCreator, .pickeroverlay").hide();
		$('body').append("<div class='pickerSecondMarker'></div>");
		recordStatus =  "secondElementPicker";
	});
	
	$('body').on('click',".stepHeader .closeStep, .cancelTourStep",function(e){
		e.preventDefault();
		removeTourElements();
	});
	
	$('body').on("click", "button[data-role='end']",function(){
		$('.showDrop').removeClass('showDrop');
		$('.popover.tour-tour').remove();
		 $('.modal').modal('hide');
	});
	
	
	$("body").on("change","#tourNextElement",function(){
		$(".nextOption").hide();
		var value = $(this).val();
		$(".stepCreator ."+value).show();
		$('.txtActionSelector, .nxturl').val("");
		$('.pickerSecondMarker').remove();
	});
	
	$("body").on("change paste keyup","#txtTourName",function(){
		$(".stepHeader h3").html($(this).val());
	});
	
	var tourSelection = ".pickerFirstActive a, .pickerFirstActive input, .pickerFirstActive button, .pickerFirstActive .btn, .pickerFirstActive select,  .pickerFirstActive .select2, .pickerFirstActive .customCheckBox, .pickerFirstActive .add-to-list, .pickerFirstActive .ui-multiselect-checkboxes li label, .pickerFirstActive .row-check, .pickerFirstActive textarea, .pickerFirstActive .window .drag";
	var tourSelectionSecond = ".pickerSecondActive a, .pickerSecondActive input, .pickerSecondActive button, .pickerSecondActive .btn, .pickerSecondActive select,  .pickerSecondActive .select2, .pickerSecondActive .customCheckBox, .pickerSecondActive .add-to-list,  .pickerSecondActive .ui-multiselect-checkboxes li label, .pickerSecondActive .row-check, .pickerSecondActive textarea, .pickerSecondActive .window .drag";
	
	$("html").on("mouseenter",tourSelection ,function(e){
		var thisis = $(this).not('.notPick');
		markerHover(thisis, "pickerMarker");
		showDropDown(thisis, "create");
	});
	
	$("html").on("mouseenter",tourSelectionSecond,function(e){
		var thisis = $(this).not('.notPick');
		markerHover(thisis, "pickerSecondMarker");
		showDropDown(thisis, "create");
	});
	
	$("html").on("mouseleave","body.pickerFirstActive.pickerActive .pickerMarker",function(){
		$(".pickerMarker").css({display:"none"});
	});
	$("html").on("mouseleave","body.pickerSecondActive.pickerActive .pickerMarker",function(){
		$(".pickerSecondMarker").css({display:"none"});
	});
		
	$('html').on('click',".pickerActive .pickerMarker",function(e){
		stopAllEvents(e);
		if($('body').hasClass('pickerFirstActive')){
			var thiss;
			var path = $(this).data("path");
			var placement = $(this).data("placement");
			if(recordStatus === "changePicker"){
				$(".stepCreator, .pickeroverlay").show();
				$("body.pickerActive").removeClass("pickerActive");
				$('.txtStepSelector').val(path);
				$('#txtPlacement').val(placement);
				recordStatus =  "";
			}if(recordStatus === "start"){
				createDialog(thiss,path);
				$('body').append("<div class='pickeroverlay'></div>");
				$("body.pickerActive").removeClass("pickerActive");
				$('.txtStepSelector').val(path);
				$('#txtPlacement').val(placement);
				recordStatus = "";
			}
			$('body').removeClass('pickerFirstActive');
		}
	
	});
	
	$('html').on('click',".pickerActive .pickerSecondMarker",function(e){
		stopAllEvents(e);
		if($('body').hasClass('pickerSecondActive')){
			var thiss;
			var path = $(this).data("path");
			if(recordStatus === "secondElementPicker"){
				$(".stepCreator, .pickeroverlay").show();
				$('.txtActionSelector').val(path);
				$('body').append("<div class='pickeroverlay'></div>");
				$("body.pickerActive").removeClass("pickerActive");
				recordStatus =  "";
			}
			$('body').removeClass('pickerSecondActive');
		}
	
	});
	
	
	/*
			 // <option $('body').append(value="url">Go to Page</option>
	<li class="form-group nextOption url">
			  <label>Url</label>
			  <input type="text" class="form-control nxturl" id="txtUrl" name="txtUrl" placeholder="url" required>
			</li>  */
	
	$('body').on('click',".onNext",function(e){
		if($(".stepCreator #frmStep").valid()){
			if($app.tourname){
			}else{
				$app.tourname = $('#txtTourName').val();
			}
			var tourName  = $app.tourname;
			var txtStepSelector = $('.txtStepSelector').val();
			var txtActionSelector = $('.txtActionSelector').val();
			var tourNextElement = $('#tourNextElement').val();
			
			
			var tData = {
				tName:$app.tourname,
				tElement:$('.txtStepSelector').val(),
				title:$('.toutTitle').val(),
				content:$('.tourCntent').val(),
				onNext:tourNextElement,
				url:$('.nxturl').val(),
				actionSelector: txtActionSelector,
				flag:0,
				mode:'insert',
				tourpath:window.location.href,
				placement:$('#txtPlacement').val()
		
			};
			 if(tourName != ''){
					$.ajax({
							type: "POST",
							url: "/tour.save",																
							cache: false,
							data: tData,
							success: function(data){
							//	$app.setMessage("Saved Successfully","success");
							}
						});
				}
			removeTourElements();
		}	
	});
	
	$("body").on("click","#addTourStepEdit", function(){
		var tData 			= $(this).data();
		var editurl 	 	= window.location.href;
		$app.tourname 		= tData.title;
		$app.tourId 		= tData.val;
		$app.toureditUrl 	= editurl;
		createTour();
	});
	
	$('body').on('click',".editStep",function(){
		var stepData     =  $(this).data();
		var editurl 	 = window.location.href;
		$.ajax({
			type: "GET",
			url: "/tour.itemedit/"+stepData.tour+"/"+stepData.step,
			cache: false,
			success: function(data){
				
				 
				window.location 		= stepData.href;
				data.stepData.editUrl 	= editurl ;
				data.stepData.order 	= stepData.order; 
				setTimeout(function() {
					var setInt = setInterval(function() {
					 if ($.active == 0) {
							 createDialog(data.stepData);
					  clearInterval(setInt);
					 }
					}, 500);
				   }, 500);
	
				//	$app.setMessage("Saved Successfully","success");
			}
		});
	});
	$('body').on('click',".deleteStep",function(){
		var stepData     =  $(this).data();
		$.ajax({
				type: "GET",
				url: stepData.href,
				cache: false,
				success: function(data){
					$app.setMessage("Deleted Step Successfully","success");
					$app.FnRefresh();
				}
			});
	
	});
	$('body').on('click',".endTour",function(){
		$('.onNext').trigger('click'); 
		 $.ajax({
				type: "POST",
				url: "/tour.save",																
				cache: false,
				data: {flag:1,tourid:$app.tourId},
				success: function(data){
					$(".tourStatus").remove();
					$app.tourId="";
					$app.tourname = "";
					if($app.toureditUrl){
						window.location =$app.toureditUrl; 
					}
					$app.toureditUrl='';
				//	$app.setMessage("Saved Successfully","success");
				}
			});
		removeTourElements();
	
	});
	$('body').on('click',".onUpdate",function(e){
		if($('.modal').length > 0){
			$('.modal').modal('hide');	
		}
		var stepData 			=  $(this).data();
		var tourName 			= $('#txtTourName').val();
		var txtStepSelector 	= $('.txtStepSelector').val();
		var txtActionSelector 	= $('.txtActionSelector').val();
		var tourNextElement 	= $('#tourNextElement').val();
		var tData 				= {
									tName:tourName,
									tElement:$('.txtStepSelector').val(),
									title:$('.toutTitle').val(),
									content:$('.tourCntent').val(),
									onNext:tourNextElement,
									url:$('.nxturl').val(),
									actionSelector: txtActionSelector,
									flag:0,
									mode:'update',
									tourpath:window.location.href,
									placement:$('#txtPlacement').val()
							
								};
		if(tourName != ''){
			$.ajax({
				type: "POST",
				url: "/tour.save/"+stepData.tour+"/"+stepData.step+"/"+stepData.order,
				cache: false,
				data: tData,
				success: function(data){
				//	$app.setMessage("Saved Successfully","success");
					window.location = stepData.href;	
					removeTourElements();
	
				}
			});
		}	
	
	});
	
	 
	 $('body').on('click',".stepEditSave",function(){
		var tourname = $("#txtTourEditName").val();
		var tourData = $(this).data();
		var sortOrder = $(".tourSort").sortable('toArray');
		 $.ajax({
				type: "POST",
				url: "/tour.itemedit/"+tourData.value,																
				cache: false,
				data:{name:tourname,action:'nameupdate',sort:sortOrder},
				success: function(data){
					$app.setMessage("Tour Data Updated Successfully","success");
				}
			});
		 return false;
	
	});
	
	var loadPageTours = "";
	$('body').on('click',"#tourPage",function(){
			loadPageTours = tourUrl();
			 $.ajax({
				type: "POST",
				url: "/tour.pagetourlist",
				cache: false,
				success: function(data){
					var customPageTour  = _.find(data.generalTour, function(num){  return num.url == loadPageTours; });
					if(customPageTour){
						$.ajax({
							type: "POST",
							url: "/general.tour/"+customPageTour.id,
							cache: false,
							success: function(data){}
						});
					}else{
						refresh4Tour();
						var tourInt = new Tour({ steps: tourArray[loadPageTours], delay:false,
						onStart: function () {
						} });
						var setInt =  setInterval(function(){  
							  tourInt.init();tourInt.restart();clearInterval(setInt);
						},500);

					}

				}
			});
			
	});

	$('body').on('click',".setTour",function(){
			var tData =  $(this).data();
			loadPageTours = tourUrl();
			var setOrUnset = $(this).closest('li').hasClass('tourCurrentPage');
			var cnfrm;
			if(!setOrUnset){
				cnfrm = confirm("Do you really want to set this as default tour for this Page?");
			}
			if(cnfrm || setOrUnset){
				 $.ajax({
				type: "POST",
				url: "/tour.pagetour",
				data:{url:loadPageTours,id:tData.id,set:!setOrUnset},
				cache: false,
				success: function(data){
					if(typeof data.Actions != 'undefined') {
   				     $.each(data.Actions,function(i,v){
   						 $app.doAction(v,i);
   					});

   				     if(!setOrUnset || tourArray[loadPageTours]){
   				     	$("#tourPage").show(); 
   				     }else{
   				     	$("#tourPage").hide();
   				     }
				}
			}
			});
			return true;
			}
			

	});
	
	$.fn.popover.Constructor.prototype.getTitle = function (t) {
      var title
        , $e = this.$element
        , o = this.options
      title =  (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title) || $e.attr('data-original-title')
      return title;
    }
	
	Tour.prototype._isOrphan = function(step) {
      var isOph =((step.element == null) || !$(step.element).length || $(step.element).is(':hidden') && ($(step.element)[0].namespaceURI !== 'http://www.w3.org/2000/svg'));
       if(isOph && this._options.orphan ){ $app.setMessage('You have no permission to view next step','warn'); this.end();$('.showDrop').removeClass('showDrop'); }
	return (step.element == null) || !$(step.element).length || $(step.element).is(':hidden') && ($(step.element)[0].namespaceURI !== 'http://www.w3.org/2000/svg');
    };
	
});


Tour.prototype._onResize = function(callback, timeout) {
      return $(window).on("resize.tour-" + this._options.name, function() {});
};