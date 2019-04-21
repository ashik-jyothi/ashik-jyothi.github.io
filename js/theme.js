jQuery(function($){
	  
	  var section = $(".section").val(); 
	  var isLeftmenu;
	 
	switch(section){
	case "portals"://lsfiles
			  isLeftmenu = true;
			break;
	case "lsDash"://Ls Dash Board
			//$("#mls").addClass("open");
			 isLeftmenu = false;
			 
			break;
	case "leftoverview"://leftoverview
			//$("#mls").addClass("open");
			 isLeftmenu = true;
			break;	
	case "leftLiveapps"://leftoverview
			//$("#mls").addClass("open");
			 isLeftmenu = true;
			break;
	case "leftLiveappsView"://leftoverview
			//$("#mls").addClass("open");
			 isLeftmenu = false;
			break;
						
	case "leftdash"://leftoverview
			//$("#mls").addClass("open");
			 isLeftmenu = true;
			break;	
	case "lefthelp"://leftoverview
			//$("#mls").addClass("open");
			 isLeftmenu = true;
			break;	
	case "portals-col"://lsfiles
		//	$("#mls").addClass("open");
			 isLeftmenu = true;
			break;
	case "portals-prev"://lsfiles
			 isLeftmenu = true;
			break;			
		case "deals"://lsfiles
			 isLeftmenu = true;
			break;			
	case "leftInbox"://inbox
	   
		 isLeftmenu = true;
			break;	
	case "leftDraft"://draft
			//$("#mls").addClass("open");
		 isLeftmenu = true;
			break;	
	case "leftSentbox"://sentbox
			//$("#mls").addClass("open");
			 isLeftmenu = true;
			break;	
	case "leftUsers"://shared user
			//$("#mls").addClass("open");
			 isLeftmenu = true;
			break;			
	case "leftGroup"://leftGroup Shared group
			 isLeftmenu = true;
			break;			
	case "leftBroadcast"://leftBroadcast
			 isLeftmenu = true;
			break;	
								
	case "dbd"://dashboard
		 isLeftmenu = true;
			break;
	case "usr-list"://user-list
			//$("#usr").addClass("active, open");
		 isLeftmenu = true;
			break;
	case "user-grp-list"://user-group-list
			 isLeftmenu = true;
			
			break;			
	case "usr-per"://user-permission
			 isLeftmenu = true;
			break;	
	case "ls_storage"://user-permission
			isLeftmenu = false;
			break;					
	case "grp-list"://group-list
			//$("#usr").addClass("active, open");
			isLeftmenu = true;
			break;
	case "livespacelist"://leftBroadcast

		 isLeftmenu = true;
			break;		
	case "grp-per"://group-per
			//$("#usr").addClass("active, open");
			isLeftmenu = true;
			break;	
	case "grp-user"://group-per
			//$("#usr").addClass("active, open");
			isLeftmenu = true;
			break;					
	
	case "scnf"://storage
			isLeftmenu = false;
			break;
	case "left-storage-dash"://storage
			 isLeftmenu = false;
			break;	
	case "left-storage-cloud"://storage
			 isLeftmenu = false;
			break;			
	case "left-livecloud-connection"://storage
			isLeftmenu = false;
			break;			
	case "left-livecloud-source"://storage
			isLeftmenu = false;
			break;		
	case "left-livecloud-dataset"://storage
			isLeftmenu = false;
			break;			
			
	case "left-workflow"://storage
			isLeftmenu = false;
			break;		
	case "users-globalsettings"://storage
			isLeftmenu = false;
			break;	
	case "members-globalsettings"://storage
			isLeftmenu = false;
			break;	
	case "roles-globalsettings"://storage
			isLeftmenu = false;
			break;			
	case "tntdatb"://tenant  database
			isLeftmenu = false;
			break;		
case "admin"://tenant  database
			isLeftmenu = false;
			break;	

	default:
			isLeftmenu = true;
			break;
}
	
	
	/*   
	$('body').on('click', '.toggle-sidebar-but', function(ev){
			ev.preventDefault();
			$('body').toggleClass('sidebar-small');
			$.cookie('trigata.dashboard.sidebar', $('body').hasClass('sidebar-small') ? 1 : 0 );
		})
	//	.toggleClass('sidebar-small', 0 == $.cookie('trigata.dashboard.sidebar') );
	.toggleClass('sidebar-small', isLeftmenu );*/
	
		
	
	 
});

(function ($) {
    $.fn.vizMenuBuilder = function (options) {
        var settings = $.extend({
            sortConainer: ".items",
            item: '.item'
        }, options);
        var leftNavIcons = ['icon-lftPanel-collection','icon-templates','icon-file-document','icon-lftPanel-document','icon-doc','icon-note','icon-file-text','icon-contracts', 'icon-lftPanel-template','icon-file-minus','icon-file-plus','icon-folder','icon-folder-minus','icon-folder-plus','icon-chat','icon-chat_bubble','icon-chat_bubble_outline','icon-question-answer','icon-insert-comment','icon-search','icon-client-search','icon-lens','icon-zoom_in','icon-zoom_out','icon-list-grid','icon-excel','icon-pdf','icon-lftPanel-form','icon-lftPanel-grid','icon-lftPanel-spread','icon-user-form','icon-chat-user-person','icon-chat-panic','icon-lftPanel-members','icon-user','icon-user-line','icon-user-check','icon-users','icon-people1','icon-group_add1','icon-chevron','icon-navigate-before','icon-navigate-next','icon-first_page1','icon-arrow-down-lite','icon-keyboard-arrow-left','icon-keyboard-arrow-right','icon-keyboard-arrow-up','icon-keyboard-capslock','icon-last-page','icon-downward','icon-arrow-back','icon-arrow-downward','icon-arrow-forward','icon-arrow-upward','icon-code-new','icon-compare-arrows','icon-call_made','icon-trending-up','icon-vertical_align_top','icon-vertical_align_center','icon-vertical_align_bottom','icon-storage','icon-download1','icon-download-cloud','icon-cloud-download','icon-ls-coud','icon-cloud-done','icon-cloud_download','icon-cloud-off','icon-cloud-queue','icon-cloud-upload','icon-repeat','icon-maximize-2','icon-aspect-ratio','icon-minimize-2','icon-zoom_out_map','icon-minimize','icon-zoom_out_map1','icon-fullscreen_exit','icon-fullscreen','icon-crop_free','icon-all-out','icon-video2','icon-video','icon-camera','icon-camera-off','icon-keyboard_voice1','icon-mic_off','icon-mic_none','icon-image','icon-calendar1','icon-event_available','icon-event_busy','icon-check','icon-check-box','icon-check_circle','icon-star_border1','icon-star_half','icon-stars','icon-eye','icon-eye-off','icon-visibility1','icon-show','icon-hide','icon-external-link','icon-edit-3','icon-border-color','icon-phone_locked','icon-phone_missed','icon-phone_paused','icon-enable-tag','icon-tag','icon-filter','icon-filter_list','icon-filter1','icon-delete-bin','icon-show','icon-hide','icon-tick','icon-lftPanel-members','icon-lftPanel-edit', 'icon-lftPanel-form','icon-lftPanel-grid', 'icon-lftPanel-spread','icon-lftPanel-document','icon-lftPanel-chart','icon-lftPanel-chartpie','icon-bar-chart','icon-chart','icon-add-widget','icon-lightbulb_outline','icon-bell','icon-bell-off','icon-notifications','icon-notify','icon-notifications-active','icon-notifications-none','icon-view_carousel','icon-view_column','icon-view_comfy','icon-view_compact','icon-view_day','icon-view_headline','icon-view_list','icon-view_module','icon-view_quilt','icon-view_stream','icon-view_week','icon-border-all','icon-grid_off','icon-grid_on','icon-lock_open','icon-lock_outline','icon-key','icon-debugger', 'icon-tour', 'icon-tourhelp','icon-monitor', 'icon-block', 'icon-power-cord', 'icon-spreadsheet2','icon-spreadsheet','icon-liveflow','icon-grid','icon-dna', 'icon-link','icon-flow','icon-signout','icon-ls-star', 'icon-ls-owner', 'icon-ellipsis-v', 'icon-plus-new', 'icon-add2', 'icon-add', 'icon-cogwheel', 'icon-four-squares', 'icon-multiple-line','icon-envelope', 'icon-support', 'icon-speech', 'icon-share', 'icon-cloudpermission'];
        var _public = {
            clear: function () {
                $(settings.sortConainer).empty();
            },
            save: function () {
                var dataSet = [];
                $.each($(settings.sortConainer).find('.first-level'), function () {
                    var Elemnt = $(this);
                    var itemData = function (el) {
                        var _obj = $(el).data('menu')
                        delete _obj['groupList']
                        return $.extend({}, _obj)
                    }
                    var tempData = new itemData(this);
                    tempData.child = [];
                    $.each(Elemnt.nextUntil('.first-level'), function (index, item) {
                        tempData.child.push(itemData(item));
                    });
                    dataSet.push(tempData);
                });
                return dataSet;
            },
            insert: function (opt) {
                var insertOpt = $.extend({
                    name:  "",
                    icon: "icon-lftPanel-chart",
                    level: "first-level",
                    groups:[],
                    groupList: [],
                    url: "",
					child: [],
					menutype: "",
					datalist:{dashboard:"",contentId:"",name:"",dashboardname:""}
				}, opt);
				var item = $(`<li class="item ${insertOpt.level} ${insertOpt.menutype}"></li>`);
				var optTemp = "";
				insertOpt.groupList.map(function (user) {
					var selected = insertOpt.groups.indexOf(user.id) > -1 ? "selected" : "";
					optTemp += `<option value="${user.id}" ${selected} >${user.name}</option>`;
				});



               var  template = function() {
					var html = `<div class="menu-list-wrap" data-menutype="${insertOpt.menutype}"><span class="text-label"> ${insertOpt.name} </span>
					<a class="btn btn-default btn-link btn-sm toogleMenuEditor"> <i class="fa fa-chevron-down"></i></a>
						<div class="ml2 menuEditor mt10">
						 ${insertOpt.menutype=="url" ? 

								`<div class="col-md-3">Menu Url</div>
								<div class="col-md-9 pr20">
									<input type="text" name="url" value="${insertOpt.url}" class="col-md-12 form-control urlInput" placeholder="Url">
								</div>
								<div class="clear"></div>
								`
						 
						 : 
						 `<div class="col-md-3">Datalist </div>
						 <div class="col-md-9 pr20">
							 <input type="text" name="url" value="${insertOpt.datalist.name}" class="col-md-12 form-control urlInput" placeholder="Data List" readonly >
						 </div>
						 `  }
						 
						 
						 <div class="clear"></div>
						 <div class="col-md-3"> Menu Name</div>
						 <div class="col-md-9 pr20 mt5">
							 <input type="text" name="name" value="${insertOpt.name}" class="nameInput col-md-12  form-control" placeholder="Alias">
						 </div>
							<div class="col-md-3"> User Group</div>
							<div class="col-md-9 pr20 mt5">
								<div class="UserGrpSel"><select multiple>${optTemp}</select></div>
							</div>
							<div class="clear"></div>
							<div class="clearfix menuActionsContainer">
								<a class="customMenuIconSelect"><i class="${insertOpt.icon}"></i></a>
								<div class="imageSelectDropDown"><ul></ul></div>
								<button class="btn btn-link removeMenu ">Remove</button>
							</div>
				</div></div>`
			
				return html ;	
			} ;
				$(item).on('click', ".toogleMenuEditor", function () {
					$(this).closest("li.item").toggleClass("open");
					var check = $(this).closest("li.item").find(".UserGrpSel select").not(".select2-hidden-accessible").select2();
					if (check.length) updateDataSetMenu($(this).closest("li.item").find(".UserGrpSel select"));

				});
				var updateDataSetMenu = function (el) {
					el.on("select2:unselect", function (e) {
						var dataSet = $(el).closest("li").data("menu");
						var index = dataSet.groups.indexOf(parseInt(e.params.data.id));


							var dataSet = $(el).closest("li").data("menu");
						dataSet.groups= el.val();
						$(el).closest("li.item").data('menu', dataSet);

						/*if (index > -1) {
							dataSet.groups.splice(index, 1);
						}
						console.log("dataSet:::",dataSet);
						*/
					});
					el.on("select2:select", function (e) {
						var dataSet = $(el).closest("li").data("menu");
						dataSet.groups = el.val();
						$(el).closest("li").data('menu', dataSet);
					});

				}
                $(item).on('click', ".customMenuIconSelect", function () {
                    dropDownEl = $(this).parent().find('.imageSelectDropDown');
                    dropDownEl.find('ul').html('');
                    $.each(leftNavIcons, function (i, a) {
                        dropDownEl.find('ul').append(`<li> <a class="setMenuIcon" data-icon="${a}"> <i class="im ${a} "> </i> </a>   </li>`);
                    });
                    dropDownEl.toggle();
                });
                $(item).on('click', ".removeMenu", function () {
                    $(item).remove();
                    return false;
                });
                $(item).on('click', ".setMenuIcon", function () {
                    var newImg = $(this).attr('data-icon');
                    var el = $(this).parents('.menuActionsContainer');
                    el.find('.customMenuIconSelect i').attr('class', newImg);
                    $('.imageSelectDropDown').hide();
                    $(item).data('menu', $.extend($(item).data('menu'), {
                        "icon": newImg
                    }));
                    return false;
                });
                $(item).on('keyup', ".nameInput", function () {
                    var newVal = $(this).val();
                    $(item).find('.text-label').html(newVal);
                    $(item).data('menu', $.extend($(item).data('menu'), {
                        "name": newVal
                    }));
                });
                $(item).on('keyup', ".urlInput", function () {
                    var newVal = $(this).val();
                    $(item).data('menu', $.extend($(item).data('menu'), {
                        "url": newVal
                    }));
                });
                item.append(template()).appendTo(settings.sortConainer).data('menu', insertOpt);

            },
            init: function () {
                $(settings.sortConainer).sortable({
                    connectWith: ".items",
                    placeholder: "placeholder",
                    update: function (event, ui) {
                    },
                    start: function (event, ui) {
                        if (ui.helper.hasClass('second-level')) {
                            ui.placeholder.removeClass('placeholder');
                            ui.placeholder.addClass('placeholder-sub');
                        } else {
                            ui.placeholder.removeClass('placeholder-sub');
                            ui.placeholder.addClass('placeholder');
                        }
                    },
                    sort: function (event, ui) {
                        var pos;
                        if (ui.helper.hasClass('second-level')) {
                            pos = ui.position.left + 20;
                             
                        } else {
                            pos = ui.position.left;
                           
                        }
                        if (pos >= 32 && !ui.helper.hasClass('second-level') && ui.helper.hasClass('url') ) {
                            ui.placeholder.removeClass('placeholder');
                            ui.placeholder.addClass('placeholder-sub');
                            ui.helper.addClass('second-level').removeClass('first-level');
                            var nData = ui.helper.data("menu");
                            nData ["level"]=  'second-level';
                            ui.helper.data("menu",nData );

                        } else if (pos < 25 && ui.helper.hasClass('second-level')) {
                            ui.placeholder.removeClass('placeholder-sub');
                            ui.placeholder.addClass('placeholder');
                            ui.helper.removeClass('second-level').addClass('first-level');
                            var nData = ui.helper.data("menu");
                            nData ["level"]=  'first-level'; 
                            ui.helper.data("menu",nData );
                        }
                    }
                });

                $(settings.item).droppable({
                    accept: settings.item,
                    hoverClass: "dragHover",
                    drop: function (event, ui) {
                        /*console.log('drop');
                        if (ui.position.left >= 20) {
                        	$(this).removeClass("first-level");
                        	$(this).addClass("second-level");
                        } else {
                        	$(this).removeClass("second-level");
                        	$(this).addClass("first-level");
                        }*/
                    },
                    over: function (event, ui) {},
                    activate: function (event, ui) { }
                });
            }
        }
        _public.init();
        return _public;
    };
})(jQuery);