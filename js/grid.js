function sys_ui_widgets_grids_grid( i, $me){
	$me					= $($me);
	$me.on('click', 'div.widget-title > span.icon > a', function(ev,arg){
		var cObj = { width:'100%', title: 'Vizru',  height :'100vh - 40px',callBack:function(){}};
		ev.preventDefault();
		if($(this).hasClass("edit")){
				var _s	 = arg || $.map( $me.find('section.data-table .arrangeDashBoard .customCheckBox input:checked'), function(e){ return e.id; });
				if(typeof _s[0] !== "undefined"){
					_s = _s[0].split('_');
					var sId	   = _s[1];
					var owner	   = _s[2];
					if(_s.length === 4){
						var cId	   	= 0;
						var type 	= _s[3];
					}
					else{
						var cId	   	= _s[3];
						var type	= _s[4];
					}

					if(_s=='') return false;

					switch(_s[0]){
						case "check-ls":
							$(this).attr('href','/ls/livespace.edit/'+ sId+$app.queryString());
							return true;
						break;
						case "check-lapps":
						case "lapps":
							var owner_details = sId.split('-');
							var app_id	=	owner_details[0];
							if($.isNumeric( app_id )){
								window.location	= '#ls/liveapps.edit/'+ sId+$app.queryString();
								return true;
							}else{
								$app.setMessage( 'You cannot edit a saved dashboard', 'error' );
								return false;
							}
						break;
						case "check-collection": 
							ajaxClick({  ajaxUri: '/ls/collection.edit/'+ sId+$app.queryString(),  title: 'Edit Collection', callBack:cObj.callBack});
							return false;
						break;
						case "check-elements":
							$(this).removeClass('ajax');
							var fileId	= _s[1];
							if(type	==	'grid'){
								cObj.ajaxUri = 'analytics/grid.edit/'+ fileId +'-'+owner+'/'+cId+$app.queryString();
								ajaxClick(cObj);
								return true;
							}else if(type	==	'card'){
								cObj.ajaxUri	=	'analytics/card.edit/'+ fileId +'-'+owner+'-'+cId+'/'+cId+$app.queryString();
								ajaxClick(cObj);
								return true;
							}
							else if(type	==	'chart'){
								cObj.ajaxUri	=	'analytics/chart.edit/'+ fileId +'-'+owner+'/'+cId+$app.queryString();
								ajaxClick(cObj);
								return true;
							}else if(type	==	'file'){
								//$(this).attr('href','#ls/livespace.fileedit/'+ fileId+'/'+cId+$app.queryString());
								ajaxClick({	ajaxUri:'/ls/livespace.fileedit/'+ fileId+'/'+cId+$app.queryString(),
											title: 'Edit File'});
								return true;
							}else if(type	==	'spreadsheet'){
								cObj.ajaxUri	=	'ls/livespace.preview/'+ fileId +'-'+owner+'/'+cId+$app.queryString();
								ajaxClick(cObj);
								return true;
							}else if(type	==	'htmlfile'){
								cObj.ajaxUri = '/ls/livespace.webdocedit/'+ fileId+'/'+cId+$app.queryString();
								ajaxClick(cObj);
								return true;
							}else if(type	==	'ssform'){
								cObj.ajaxUri	=	'analytics/form.edit/'+ fileId +'-'+owner+'/'+cId+$app.queryString();
								ajaxClick(cObj);
								return true;
							}else{
								$app.setMessage( 'Select one item to edit.', 'error' );
								return false;
							}
						break;
						case "check-ls":
							var query_string = '?_ls='+owner+'-'+sId;
							var url 		= '#ls/livespace.edit/'+sId;
							$(this).attr('href',url+query_string);
							return true;
						break;
						//added for tile actions
						case "collection":
							$(this).attr('href','/ls/collection.edit/'+ sId+$app.queryString());
							return true;
						break;
						case "ls":
							var query_string = '?_ls='+owner+'-'+sId;
							var url 		= '/ls/livespace.edit/'+sId;
							$(this).attr('href',url+query_string);
							return true;
						break;
						case "elements":
							$(this).removeClass('ajax');
							var fileId	= _s[1];
							if(type	==	'grid'){
								cObj.ajaxUri	=	'analytics/grid.edit/'+ fileId +'-'+owner+'/'+cId+$app.queryString();
								ajaxClick(cObj);
								return true;
							}else if(type	==	'card'){
								cObj.ajaxUri	=	'analytics/card.edit/'+ fileId +'-'+owner+'/'+cId+$app.queryString();
								ajaxClick(cObj);
								return true;
							}
							else if(type	==	'chart'){
								cObj.ajaxUri	=	'analytics/chart.edit/'+ fileId +'-'+owner+'/'+cId+$app.queryString();
								ajaxClick(cObj);
								return true;
							}else if(type	==	'file'){
								//ajaxUri = $(this).attr('href','/ls/livespace.fileedit/'+ fileId+'/'+cId+$app.queryString());
								//window.location	=	'#ls/livespace.fileedit/'+ fileId+'/'+cId+$app.queryString();
								ajaxClick({	ajaxUri:'/ls/livespace.fileedit/'+ fileId+'/'+cId+$app.queryString(),
											title: 'Edit File'});
								return true;
							}else if(type	==	'spreadsheet'){
								cObj.ajaxUri	=	'ls/livespace.preview/'+ fileId +'-'+owner+'/'+cId+$app.queryString();
								ajaxClick(cObj);
								return true;
							}else if(type	==	'htmlfile'){
								cObj.ajaxUri = '/ls/livespace.webdocedit/'+ fileId+'/'+cId+$app.queryString();
								ajaxClick(cObj);
								return true;
							}else if(type	==	'ssform'){
								cObj.ajaxUri	=	'analytics/form.edit/'+ fileId +'-'+owner+'/'+cId+$app.queryString();
								ajaxClick(cObj);
								return false;
							}else{
								$app.setMessage( 'Select one item to edit.', 'error' );
								return false;
							}
						break;
						//end

					}
					//checkParent();
					//showActionPanel();
					ev.stopPropagation();
					$(this).toggleClass('active');
					return true;
					//ev.preventDefault();
			}
		}
		else{
			var
			jsonCf		= $me.data('json-conf'),
			anConf		= jsonCf.actions,
			vrConf		= jsonCf.variables,
			$this		= $(this),
			cf			= false
			;
			for(var i in anConf){

				if( $this.attr('id') == anConf[i].Hash ){
					cf		= anConf[i];
					continue;
				}
			}

			if( 'object' === typeof cf ){
				var _s	 = arg || $.map( $me.find('section.data-table .arrangeDashBoard div.tile-item.selected'), function(e){ return e.id; });
				if(_s.length == 0){
					var _s	 = $.map( $me.find('table.data-table tr.selected'), function(e){ return e.id; });
				}

				if( _s.length < cf.Select[0] ){
					$app.setMessage( "Sorry, You must select atleast " + cf.Select[0] + " records to continue!", "warning" );
					ev.preventDefault();
					return false;
				}else if( cf.Select[1] > 0 && _s.length > cf.Select[1] ){
					$app.setMessage( "Sorry, You cannot select more than  " + cf.Select[1] + " records !", "warning" );
					ev.preventDefault();
					return false;
				}
				else if(cf.Name == 'delete' && _s.length == 0 && cf.Select[0] == 0){
					$app.setMessage( "Sorry, You must select atleast 1 records to continue!", "warning" );
					ev.preventDefault();
					return false;
				}
				else if(cf.Name == 'cust_setflag' || cf.Name == 'user_setflag'){
					return true;
				}
				else if(cf.Name == 'movetocoln'){
					_s_params = _s[0].split('_');
					if(_s_params[0] == 'check-collection'){
						$app.setMessage( "Sorry, You cannot move a collection!", "warning" );
						ev.preventDefault();
						return false;
					}
				}

				//-
				if(cf.Link){
					if( '' === cf.Confirm || !confirm(cf.Confirm) ){
						if('tag' == cf.Name){
							var data = {data:{divId: "create_div",
									title:"Add To Tag",
									width:"450",
									txtId:"",
									ajaxUrl: "/ls/tags.new"+$app.queryString(),
									targetUrl:"",
									dType:"tags",
							        menuId:""}};
							$.fn.createDialog(data);
						}
						//ev.preventDefault();
					}
				}else{
					ev.preventDefault();
					if( '' === cf.Confirm && 'delete' == cf.Name ){
						cf.Confirm		= 'Are you sure, selected items will be deleted permanently?';
					}

					var default_value = new Array();
					if(typeof String(_s) != 'undefined') {
						var default_vars	=	String(_s).split('-');
						if(typeof default_vars[1] != 'undefined') {
							default_value	=	default_vars[1].split('_');
						}
					}

					if(default_value[1] == 'default') {
						$app.setMessage("You cannot delete default LiveSpace","danger");
					}
					else {

							if( '' === cf.Confirm || confirm(cf.Confirm) ){
								if( _s.length > 0 ){

									$.post(
										cf.Url,
										{
											"action"	: cf.Name,
											"seln"		: _s,
											"variables"	: vrConf
										},
										function(d,s,jr){
											if(d.Body && d.Body['js-code'] != null && 'undefined' !== typeof d.Body['js-code'] && d.Body['js-code'].length > 1 ){
												eval( d.Body['js-code'] );
											}

											if(s == 'success'){
												if(cf.Name == 'member_inactivate'){
													$app.setMessage( "Members set as inactive", "success" );
													$('table.members_per ').dataTable().fnDraw();
													$('section.members_per ').dataList();
												}else if(cf.Name == 's_resetpassword' || cf.Name == 'download'){
													//$('table.dataTable ').dataTable().fnDraw();
												}else if(cf.Name == 'userRoles' || cf.Name == 'userPermissions' || cf.Name == 'user-permission-remove' || cf.Name == 'user-permission-setflag' || cf.Name == 'user-permission-add' || cf.Name == 'user-role-add' || cf.Name == 'user-role-remove' || cf.Name == 'user-customer-delete' ){
													//$('table.dataTable ').dataTable().fnDraw();
												}else if(cf.Name == 'globalrole-setflag' || cf.Name == 'globalrole-delete' || cf.Name == 'glrole-permission-save' || cf.Name == 'roles-permission-setflag' || cf.Name == 'roles-permission-remove' || cf.Name == 'lsrole-delete' || cf.Name == 'roles-members-remove' || cf.Name == 'glrole-members-save' || cf.Name == 'gs_dna_delete' || cf.Name == 'obj_dna_delete'){
													//$('table.dataTable ').dataTable().fnDraw();
												}else{
													$app.FnRefresh();
													//$('.table.dataTable').dataTable().fnDraw();
													$.each($.fn.dataTable.tables(), function () {
														  $(this).filter(":visible").dataTable().fnDraw();
														});
													if($("#ls").length != 0) {
													  $('#ls').removeClass('showTileAction');
													}
												}
											}
											$app.post();
										},
										'json'
									);
								}
							}
					}

				}
			}
		}

	});
	$me.on('click', '.dashIconWrap a.trash', function(ev){
		ev.preventDefault();
		d = $(this).data('id');
		$("div.widget-title > span.icon > a.trash").trigger('click',[[d]]);
		return false;
	});

	$me.on('click', '.dashIconWrap a.edit', function(ev){
		ev.preventDefault();
		d = $(this).data('id');
		$("div.widget-title > span.icon > a.edit").trigger('click',[[d]]);
		return false;
	});

	$me.on('click', '.dashIconWrap a.tag', function(ev){
		ev.preventDefault();
		d = $(this).data('id');
		$(this).closest('div.dashwrap').addClass('selected');
		$("div.widget-title > span.icon > a.add-to-tag").trigger('click');
	});

	$me.on('click', '.dashIconWrap a.move_to_collection', function(ev){
		ev.preventDefault();
		d = $(this).data('id');
		$(this).closest('div.dashwrap').addClass('selected');
	});

	$me.on('click', '.dashIconWrap a.set_landing', function(ev){
		d = $(this).data('id');
		$('#'+d+' > div.customCheckBox > .checkBoxinput' ).prop('checked',true);
		$("div.widget-title > span.icon > a.set_landing").trigger('click');
		$('#'+d+' > div.customCheckBox > .checkBoxinput' ).prop('checked',false);
		$(this).toggleClass('active');
		ev.preventDefault();
	});

	$me.on('click', '.dashIconWrap a.inactivate', function(ev){
		d = $(this).data('id');
		$('#'+d+' > div.customCheckBox > .checkBoxinput' ).prop('checked',true);
		$("div.widget-title > span.icon > a.inactivate").trigger('click');
		$('#'+d+' > div.customCheckBox > .checkBoxinput' ).prop('checked',false);
		$(this).toggleClass('active');
		ev.preventDefault();
	});

	$me.on('click', '.dashIconWrap a.download', function(ev){
		ev.preventDefault();
		d = $(this).data('id');
		$("div.widget-title > span.icon > a.download").trigger('click',[[d]]);
		$(this).removeClass('active');
		return false;
	});

	$me.on('click', 'div.widget-title > span.icon > a.random ', function(ev){
   
            var _s     = $.map( $me.find(".tile-item.selected"), function(e){ return e.id; });

            _s = _s[0].split('_');

            var colId       = _s[1];

            var owner       = _s[2];

            var type       = _s[3];
            var href       = $(this).attr("href");
            var lsobj          = $app.activeLs.lid;
            var arrayjson     = Array;
            arrayjson    = [{"file-id":colId+"-"+lsobj}];
            $.ajax({type:'POST',
                    dataType: "json",

                    url:href,
                    data:"data="+JSON.stringify(arrayjson),

                success: function(data){
                          $.each(data.Actions['messages'], function(i, item){
                            $app.setMessage(item);
                            });
                            
                }
                }).done(function(data) {
                    $me.find('section.data-table').dataList();        
                });
                

            return false;

            });

}
$("body").off('click','div.clearAllTagDiv .add-to-tag').on("click",'div.clearAllTagDiv .add-to-tag',function(){
	$("div.widget-title > span.icon > a.add-to-tag").trigger('click');
	return false;
});