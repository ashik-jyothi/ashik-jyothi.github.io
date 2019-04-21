var togleBut, lsap, filterOpen,iscr_ls_ss_htmlLoded;
selectTemplate1 = function(state, data){
    /*sample  <option value="2-314" data-type="grid" data-image="/ui-themes/karma/images/svg/grid4.svg">Option 1</option> */
   /*  console.log(state, data ); */
 if (!state.id) {
    return state.text;
  } 
  var $state = $(
    '<span class="bg_white"><span class="select2-imagePlace"> <img src="'+$(state.element).data("image")+'" class="img-flag bg_white pr5 " height="30" width="30" /> </span>' + state.text + '</span>'
  );
  return $state;
}


$(document).ready(function() {
	$('body').on("click",'.vizPopOverUl .opener', function(){
		$(this).toggleClass("toggle");
	});
	function addAnim(t){
		t.addClass('bounceIn').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
				function(){t.removeClass('bounceIn'); });
  	};
	var selecters = 
	
 	$('body').on('click', '.loder-link',function(){
		$('.modal').modal('hide');
		$('#wrap').block(blockLoadConf2);
 	})	
	/*$('#short-left .animated, .liveAppSwt, .sidebar-small #admin .animated').click(function(){addAnim($(this));})*/
	/*check if the local class is applied */
	var nInput = $('.formAlpha').find('.input-block-level');
	$.each(nInput,function(i,e){$(this).after('<div class="mb"></div>')});

if (document.location.pathname.indexOf("/ls/liveapps.view/") == 0) 
            {
         	$('body').fixYw({ container: "#wrap",  toolHeight:95, });

            }
			else{
	
	$('body').fixYw({ container: "#wrap",  toolHeight:0, });
				}
	
	$('body').fixYw({ container: "#rightPan",  toolHeight:53, });
/*	$('body').fixYw({ container: "#formFilter",  toolHeight:190, });*/
	localStorage.clear();
	
        $( ".tip-left, .tip-top, .tip-right, .tip-bottom" ).click(function() {
                    $(this).blur();
        });
         $(function() {    
        $('#input-search-customer').on('keyup', function() {
          var rex = new RegExp($(this).val(), 'i');
            $('.searchable-container .items_dash').hide();
            $('.searchable-container .items_dash').filter(function() {
                return rex.test($(this).text());
            }).show();
        });
          $('#input-search-user').on('keyup', function() {
          var rex = new RegExp($(this).val(), 'i');
            $('.searchable-container .items_dash').hide();
            $('.searchable-container .items_dash').filter(function() {
                return rex.test($(this).text());
            }).show();
        });
          $('#input-search-activity').on('keyup', function() {
          var rex = new RegExp($(this).val(), 'i');
            $('.searchable-container .items_dash').hide();
            $('.searchable-container .items_dash').filter(function() {
                return rex.test($(this).text());
            }).show();
        });
    });
        var d_handlerIn = function () {$(this).find('.more-lnk').stop().delay(300).fadeIn()}
        var d_handlerOut = function () {$(this).find('.more-lnk').clearQueue().fadeOut(); $('.d-pop ').stop().hide();}
        $('.dash-col').hover( d_handlerIn, d_handlerOut )

        $('body').on('click', '.close-dash-pop', function(){
        var _p = $(this).parent('.popover').hide();
        _p.hide();
        
        })
        
        
    $('body').on('click', '.d-add', function(){
        var _e = $(this).next('.d-pop');
        var _p = $(this).parent('.more-lnk').find('.popover');
        var _c = $(this).parentsUntil('.row-fluid');
        $('.d-pop ').hide();
        _p.show();
        _e.addClass('foo');
        
        $(document).click(function(e) {
                 
                 
                if (!_c.is(e.target) // if the target of the click isn't the container...
                    && _c.has(e.target).length === 0) // ... nor a descendant of the container
                {
                    _p.hide();
                }
                 
        });
        
        })

	
     $('body').on('click', '.filter_tog,.filter_tog_app', function () {
         
         $(this).closest(".filter_left").find('.filter_groups').hide();
         $(this).next(".filter_groups").toggle();
    
    });
    
    $('#myTab a:first').tab('show');
    $('#rootwizard').bootstrapWizard({onTabShow: function(tab, navigation, index) {
        var $total = navigation.find('li').length;
        var $current = index+1;
        var $percent = ($current/$total) * 100;
        $('#rootwizard').find('.bar').css({width:$percent+'%'});
        
        // If it's the last tab then hide the last button and show the finish instead
        if($current >= $total) {
            $('#rootwizard').find('.pager .next').hide();
            $('#rootwizard').find('.pager .finish').show();
            $('#rootwizard').find('.pager .finish').removeClass('disabled');
        } else {
            $('#rootwizard').find('.pager .next').show();
            $('#rootwizard').find('.pager .finish').hide();
        }
        
    }});
    $('#rootwizard .finish').click(function() {
        $('#rootwizard').find("a[href*='tab1']").trigger('click');
    });
    
    //$('body').fixY({container:'#content', toolHeight: 65,})
    
});
function updateDom(container) {
}
//DoScroll height set
function DoScroll(Body) {
    /* if(typeof(Body) !== 'object'){ return false}; */
    $(Body).find(".scrollable").each(function () {
        var e = $(this),
            t = parseInt(e.attr("data-height")),
            n = e.attr("data-visible") == "true" ? !0 : !1,
            r = e.attr("data-start") == "bottom" ? "bottom" : "top",
            i = {
                height: t,
                color: "#666",
                start: r,
                allowPageScroll: !0
            };
        if (n) {
            i.alwaysVisible = !0;
            i.disabledFadeOut = !0
        }
        e.perfectScrollbar()
		
    });
}

function filtrCountPosSet() {
        if($(".filtrCountPoscls").length) {     
         $(".filtrCountPoscls").position({
                my:        "right+6 top-22",
                at:        "right bottom",
                of:        $(".flttab-but2"), 
                collision: "fit"
            })
        }  
    };

 function selectAllVal(){
        $("input:text.selectAllVal").focus(function() { $(this).select();});
    };
    
$(document).ready(function () {
    // modal box  close button set
    
    var jb = '<a href="" class="icon-remove-sign js-back  fro clr_orange font_20  mt_20 mr_15  "></a>'
    $('.modal-9,.modal-8,.modal-7,.modal-6,.modal-5,.modal-4,.modal-3,.modal-2').not('.noModal').prepend(jb)
    
    $('.lives_choose').change(function () {
        if ($(this).val() == "L2") {
            $('.live_choser').show();

        } else {
            $('.live_choser').hide();
        }
    })
    //back button function to last page
    $('.js-back').click(function () {
        window.history.go(-1);
        return false;
    });
    //back button function to last page
    $('.button-back').click(function () {
        window.location.href=$('.current').prev().attr('href');
        return false;
    });
//remove from list button on live space
    $('.ls-close').on('click', function () {
        $(this).parent('li').remove();
    });
//remove from list button on live space
    $('.ls-list li').click(function () {
        var t = $(this);
        var h = $(this).children('a').html();
        var el = '<li class="ls">' + h + '<a class="ls-close" href="#"></a></li>'
        $('.livespace_c').append(el);
        $(t).remove();
        console.log(el);
    })

    $('.themeholder a').click(function (e) {
        e.preventDefault();
        $('.themeholder a').removeClass('c');
        $(this).addClass('c');
    });

    $('input[name="uSource"]').change(function () {
        var TV = $(this).val()
        if (TV == 'Default') {
            $('.storageConf').fadeOut();
        } else {
            $('.storageConf').fadeIn();
        }
    });
    /*$('#user-settings').hover(function(){
        });*/
    var k = true;
    DoScroll('body');
   // $('input[type=checkbox]').uniform();
   // $('#logo-upload').uniform();
  // fancy box 
  $(".fancybox").fancybox({
        openEffect: 'none',
        closeEffect: 'none',
        padding: 0,
        closeBtn: 0,
        margin: 0,
    }); 
//drop down select set width
     $('select').not('div.multiselect.o select, select.noselect').select2({placeholder: "Select ",allowClear: true, width:'element',  minimumResultsForSearch: 5 });
        if ($.fn.multiselect) {
    $("select.uiSelect").multiselect({minWidth: 125, autoOpen: true,classes: 'custom-filter',}).multiselectfilter({ label:'', placeholder:'Filter   ',}); 
        }
});

(function ($) {

    $.fn.demo = function (options) {

        // This is the easiest way to have default options.
        var settings = $.extend({
            // These are the defaults.
            text: "text",
            title: 'Title',
            top: "auto",
            right: "auto",
            bottom: "auto",
            left: "auto",
            pPose: "right",
            class: " ",
            next: 1,
            id: 0,
            

        }, options);
        var c = '';
        if (settings.id == 0) {
            c = 'show'
        }


        var template = '<div id=\"' + settings.id + '\" class=\"popover Cuitem_'+settings.id+' '+c+' '+settings.pPose+' '+settings.class+' \"> <button type="button" class="close closePOP mr5 mt5" data-dismiss="alert" aria-hidden="true">&times;</button>';
        template += '<div class=\"arrow\"><\/div>';
        template += '<h3 class=\"popover-title\">' + settings.title + '<\/h3>';
        template += '<div class=\"popover-content\">';
        template += '<p>' + settings.text + '<\/p>';
        template += '<\/div><\/div>';
        var el = '.Cuitem_'+settings.id;
        this.append(template);

        var c = $(el).find('.closePOP')
                
        jQuery(c).click(function() {
                 nxt_ID = settings.id + 1;
                 var next = '.Cuitem_'+nxt_ID;
                 console.log(next);
                 $(next).fadeIn();
                 
        });
        
 

    };

}(jQuery));


/* A custom Plugin For Fix Element Height In Page*/

(function($) {
    $.fn.fixY = function(options) {
        var settings = $.extend({
            container: "ul, li",
            toolHeight: 40, // Top And Bottom HEIGHT 
            wraper: $(window)
        }, options);
         var e = jQuery(this);
        if ($("body").height() > $(window).height()) {
            var pageHeight = $('body').height();

        } else {
            var pageHeight = $(window).height();
        }

        var avilArea = pageHeight - settings.toolHeight;
        e.find($(settings.container)).css({
            height: avilArea,
        }).addClass('fixY');

        $(window).resize(function() {
             
             e.find($(settings.container)).css({
                height: 'auto',
            })
            
             e.find($(settings.container)).addClass('sss')
            if ($("body").height() > $(window).height()) {
                var pageHeightN = $('body').height();

            } else {
                var pageHeightN = $(window).height();
            }

             var avilAreaN = pageHeightN - settings.toolHeight;
           
            e.find($(settings.container)).css({
                height: avilAreaN,
            }).addClass('NfixY').attr('data-height', pageHeightN);

        })
    };
}(jQuery));
(function ($) {
	'use strict';
	var vizDataPopover = function (element, options) {
	  this.init('popover', element, options);
	}
	vizDataPopover.VERSION  = '3.3.7'
	vizDataPopover.DEFAULTS = $.extend({},  $.fn.popover.Constructor.DEFAULTS)
	vizDataPopover.prototype = $.extend({}, $.fn.popover.Constructor.prototype)
	vizDataPopover.prototype.constructor = vizDataPopover

	vizDataPopover.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
		var Eplacement =  placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left } :
			   placement == 'top'    ? {     top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
			   placement == 'left'   ? { top: pos.top, left: pos.left - actualWidth } :
			/* placement == 'right' */ { top: pos.top, left: pos.left + pos.width }
		return	Eplacement; 
	  }
	  vizDataPopover.prototype.replaceArrow = function (delta, dimension, isVertical) {
		this.arrow().addClass("customArrow");
	  }

	vizDataPopover.prototype.getPosition = function ($element) {
	 
		$element   = $element || this.$element
	
		var el     = $element[0]
		var isBody = el.tagName == 'BODY'
	
		var elRect    = el.getBoundingClientRect()
		if (elRect.width == null) {
		  elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
		}
		var isSvg = window.SVGElement && el instanceof window.SVGElement
		var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
		var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
		var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null
	
		return $.extend({}, elRect, scroll, outerDims, elOffset)
	  }


	  
	function Plugin(option) {
	  return this.each(function () {
		var $this   = $(this)
		var data    = $this.data('bs.popover')
		var options = typeof option == 'object' && option
  
		if (!data && /destroy|hide/.test(option)) return
		if (!data) $this.data('bs.popover', (data = new vizDataPopover(this, options)))
		if (typeof option == 'string') data[option]()
	  })
	}
	var old = $.fn.vizDataPopover
	$.fn.vizDataPopover             = Plugin
	$.fn.vizDataPopover.Constructor = vizDataPopover
	/* POPOVER NO CONFLICT */
	
	$.fn.vizDataPopover.noConflict = function () {
	  $.fn.vizDataPopover = old
	  return this
	}
  })(jQuery);

(function($) {
    $.fn.vizPopover = function(options) {  
        $this =   $(this);
        var settings = $.extend({
            container: "body",
            close: true, 
            wraper: $(window),
            placement:"auto",
            height:"height: 220px;",
            data: $(this).find('.data-holder').text()
        }, options);
        var bsData =   $this.data('bs.popover');
        var TableData = JSON.parse(settings.data.replace(/\'/g, '"'));
        var obTypes = _.values(TableData).map(function(e,i){return typeof(e); });
        var hasChildObj = _.contains(obTypes,"object");
        if (!hasChildObj){
            TableData = {"Parameters": TableData }
        } 
        var  etemplate  = _.map(TableData, function (val, key) {
                var liTemplate = "";
                var _in =  Object.keys(TableData).indexOf(key) == 0 ? 'toggle' :'';
                if (typeof (val) == "object") {
                    tr = _.map(val, function (cval, ckey) {
                        return `<tr> <td> ${ckey} </td>  <td> <span> ${cval} </span> </td> </tr>`
                    });
                    var liTemplate = `<li>
                        <span class="opener ${_in}"><i class="fa isClose"> + </i> <i class="fa isOpen"> - </i> ${key} </span>
                            <div class="panel fade in non ${_in}"><table class="vizJsonPopoverTable"><tbody> ${tr.join("")}</tbody></table>
                            </div>
                        </li>`
                };
                if (typeof (val) == "string" || (val) ==  "boolean" || (val) ==  "number" ) {
                    tr = `<tr> <td> ${val} </td>  </tr>`;
                    var liTemplate = `<li>
                        <span class="opener ${_in}"><i class="fa isClose"> + </i> <i class="fa isOpen"> - </i> ${key} </span>
                            <div class="panel fade in non ${_in}"><table class="vizJsonPopoverTable"><tbody> ${tr}</tbody></table>
                            </div>
                        </li>`
                };

                return liTemplate;
            });
      
            varData = `<ul style="height:${settings.height}" class="vizPopOverUl">${etemplate.join("")}</ul>`;


            if( typeof(bsData) == "object"  ) {
            }
            else{
                $(this).vizDataPopover({
               
                template: '<div style="max-width:710px; min-width:500px; " class="popover vizPopover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><button data-viztoggle="popover" type="button" id="close" class="close" >&times;</button><div class="popover-content"></div></div>',
                content:varData,
                container: 'body',
                html:true,
                placement:settings.placement,
                title:false })
               
            };

            $this.on('click' , function(e){
                e.preventDefault();
                return false;
             });
             return  $this;
       };
}(jQuery));

$('body').on('mouseover',  '.viz-popover' , function(e){
	$(".popover.vizPopover").remove();
    $(this).vizPopover({placement:"auto"}).vizDataPopover("show");
 });
 $('body').on('mouseleave',  '.vizPopover' , function(e){
	$(this).remove();
 });
$('body').on('click',  '[data-viztoggle="popover"]' , function(e){
    $('.viz-popover').vizDataPopover("hide")
 });

$('body').on("click",'.viz-expansion-header .viz-expansion-indicator', function(){
        $(this).closest(".viz-expansion-panel").toggleClass("open");
});

/* A custom Plugin For Fix Element Height In Page*/




var blockLoadConf = { "message": "<div class=\"pageloader cDtable\" style=\"height:auto\"><i class=\"icon-spinner font_40 icon-spin\"><\/i><span class=\"font_30 ml15\">Processing..<\/span><\/div>","centerY": true,"css": { "width": "30%", "top": "150px", "left": "", "right": "10px","border": "none", "padding": "0px",  "backgroundColor": "", "opacity": "1", "color": "#FFF" },
                                "overlayCSS": {"backgroundColor": "#FFF", "opacity": "0.9", "margin": "0px 0 0" }};


var blockLoadConf2 = { "message": "<div class=\"pageloader cDtable\" style=\"height:auto; margin-top:35px;\"><i class=\"icon-spinner font_40 icon-spin\"><\/i><span class=\"font_20 ml15\">Processing..<\/span><\/div>","centerY": false,"css": { "width": "20%", "top": "50px", "left": "10%", "right": "","border": "none", "padding": "0px",  "backgroundColor": "", "opacity": "1", "color": "#FFF" },
                                "overlayCSS": {"backgroundColor": "#FFF", "opacity": "0.9", "margin": "0px 0 0" }}

$('body').on('click','.search_tab a.searchTab ',function(){
	var selTab = $(this).attr('id');
  	$('#selsrch').val(selTab);
    if( selTab == 'files' ){
		 
			gSerch.tabId= "files";	
				
			gSerch.page= 1;	
			fnApplySearch(gSerch);
            if( $('#input-search-all').val() == $('#last_search_files').val() && selTab == 'files'){}else{}
        }
        else{
			gSerch.tabId= "reports";	
			
			gSerch.page= 1;	
			fnApplySearch(gSerch);
            if($('#input-search-all').val() == $('#last_search_report').val() && selTab == 'reports' ){ }
            else{}
    }    

});                                
filterOpen = function (){
if ($('#wrap').hasClass( 'rightbarOpen')) 
            {
				console.log('open')
         	$('#rightPanFilter').addClass('openright');
            }
			else{

		$('#rightPanFilter').removeClass('openright');
				}
				}
$('body').on('click', '.fg-button',function(){ 
        $('.ps-container').scrollTop(0).perfectScrollbar('update');
});

$('body').on('mouseover', '.wtHolder',function(){ 
       $('#wrap').perfectScrollbar('destroy');
});
$('body').on('click', '.flttab-but2',function(){ 
      if(!$('#content.isDash').hasClass('openfl')){
		   $('#rightPanFilter').show();
		   filterOpen();
		  /* $('.filterbyitems ').hide();*/
		   $('#content.isDash, .headerBelowButtonRight').removeClass('openitm');
		   $('#content.isDash, .headerBelowButtonRight').addClass('openfl');
	  }else{
		  closeFilterFn();
	  }
});
$('body').on('click', '#rightPanFilter .filterclose',function(){ 
       closeFilterFn();
});
function closeFilterFn(){
	 $('#rightPanFilter').hide();
	   $('#content.isDash, .headerBelowButtonRight').removeClass('openfl');	
}
$('body').on('click', '#ShowBroadcast',function(){ 
       filterOpen();
});
$('body').on('click', '#wrap',function(){ 
    $('#rightPanFilter .filterclose').trigger('click');
	$('#content.isDash, .headerBelowButtonRight').removeClass('openfl');
});
$('body').on('click', '.add_svd_flt',function(){ 
        $('.filter-name-div ').show();
		$('#rightTabul > li , .right-filter-cont .tab-pane').removeClass('active');
		$('#rightTabul > li:first , .right-filter-cont .tab-pane:first').addClass('active');
});
$('body').on('click', '.filter_cancel_btn',function(){ 
        $('.filter-name-div ').hide();
});
$('body').on('click','.sidebar-collapsible-icon', function(){
    $('body').toggleClass('viz-sidebar-small viz-sidebar-large');
    setTimeout(function(){
        $(window).trigger('resize');
    },300);

    if(typeof(hot3) !== "undefined"){
    $.each(Object.keys(hot3),function(a,i){
        setTimeout(function(){
                hot3[i].render();
            },300);
    });
    }
})



					
$('body').on('ps-y-reach-end','.ui-multiselect-checkboxes', function () {
var h = $('.right-filter-cont').scrollTop();
  $('.right-filter-cont').scrollTop(h+30);
  ;
})
$('body').on('ps-y-reach-start', '.ui-multiselect-checkboxes',function () {
var h = $('.right-filter-cont').scrollTop();
  $('.right-filter-cont').scrollTop(h-50);
  ;
})

$('body').on('mouseover','.tip, .tip-left, .tip-right, .tip-top, .tip-bottom', function(){
    if(!$(this).data("bs.tooltip")){
        $(this).tooltip("show");
    }
    
  });


    
/*Spread sheet sroll on mouseover  on inside start*/
var scroller;
if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
	 scroller = 'DOMMouseScroll';	
}else{
	 scroller = 'mousewheel';
}
$('body').on( scroller, '.wtHolder', function( e ) { 
	e.preventDefault();
	cdata = $(this).scrollTop()
	doParentScroll = function(toTop) {
		d = $('#wrap').scrollTop();
		if (toTop) { $('#wrap').stop().animate( { scrollTop:  d - 200 },'500' ) }
		else {$('#wrap').stop().animate({scrollTop:  d + 200 },'500' ) }
	}
 if (e.type == 'mousewheel') {
		if (e.originalEvent.wheelDelta > 0) {
			var preScroller;
			preScroller = $(this).scrollTop();
			$(this).stop().animate( { scrollTop:  cdata - 270 },'500' ) 
			if (preScroller == $(this).scrollTop()) {doParentScroll(true)}
		} else {
			preScroller = $(this).scrollTop();
            $(this).stop().animate( { scrollTop:  cdata + 270 },'500' ) 
			if (preScroller == $(this).scrollTop()) {  doParentScroll(false)}
		}
	} else if (e.type == 'DOMMouseScroll') {
		if (e.originalEvent.detail > 0) {
			preScroller = $(this).scrollTop();
            $(this).stop().animate( { scrollTop:  cdata + 270 },'500' )
			if (preScroller == $(this).scrollTop()) {doParentScroll(false)}
		} else {
			preScroller = $(this).scrollTop();
            $(this).stop().animate( { scrollTop:  cdata - 270 },'500' ) 
			if (preScroller == $(this).scrollTop()) {doParentScroll(true)}
	
		}
	}	
});

/*Spread sheet sroll on mouseover  on inside end*/
