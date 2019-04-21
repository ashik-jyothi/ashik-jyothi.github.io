$('body').on(
		'click',
		"a.ajax_new",
		function(ev){
			ev.preventDefault();
			var $a = $(this);
			var _title = $a.attr('data-original-title');
			if (typeof _title == 'undefined'){
				_title = $a.attr('title');
			}
			var $m = $('<div class="ajax-modal modal hide fade"><div class="modal-header"><button type="button" class="close" data-dismiss="modal">×</button><h3>' + _title + '</h3></div><div class="modal-body" /></div>')
				.appendTo('body:first')
				.on(
					'hidden',
					function(){
						$(this).remove();
						$(this).hide();
					}
				)
			;
			var ajaxUri = $a.attr('href');
			$.getJSON(
				ajaxUri,
				function( d, s, jqXHR ){
					var cssCb	= function(){
						if( d.Refs['css-code'].length > 0 ){
							$('<style type="text/css">' + d.Refs['css-code'] + '</style>')
								.appendTo('head:first')
							;
						}
					};
					if(d.Refs['css'].length > 0){
						head.js(d.Refs['css'], cssCb);
					}else if( d.Refs['css-code'].length > 0 ){
						cssCb();
					}
					var cbJs = function(){
						$m
							.find('div.modal-body:first')
								.html(d.Body)
								.end()
							.on('show', function(){
								var _l = ($('body').width() - $m.width() ) / 2;
								$m.css('left', _l);
								
								$.scrollTo(0, $m.parent().offset().top - 20 );
							})
							.on('shown', function(){
								eval(d.Refs['js-code']);
								$frm	= $(this).find('form').attr('action', ajaxUri);
								if( $frm.find( 'input[type=file]' ).length < 1 ){
								
									$frm.ajaxForm({
										
										'url': ajaxUri,
										'dataType': 'json',
										'beforeSubmit': function(arr, $form, options) {
											$form
												.find(':input:enabled')
												.prop('disabled', true)
												.addClass('disabled _ajax_disabled')
												.filter('.submit')
													.parent()
													.prepend('<i class="icon-spinner icon-spin icon-large ml20 font_16 mt5 clr_white" style="position:absolute;z-index:999" />')
											;
											return true;
										},
										'success': function(json){
											$m
												.find(':input:disabled._ajax_disabled')
												.prop('disabled', false)
												.removeClass('disabled _ajax_disabled')
												.filter('.submit')
													.siblings('i.icon-spinner.icon-spin')
														.remove();
											;
											if(json.Actions.messages.Error) {
												var error_mesg 	=	json.Actions.messages.Error;
												//$( '#error_mesg' ).remove();
												//$( '<div id="error_mesg" class="alert mt_15 mb15">'+json.Actions.messages.Error+'</div>' ).prependTo( '.modal-3 .wide-area' );
												if (String(error_mesg).indexOf('incorrect') !=-1) {
												    $('input[name=\'_fm[oldpassword]\']').after('<label for="_fm[oldpassword]" class="invalid mt2">'+json.Actions.messages.Error+'</label>');
												} else if(String(error_mesg).indexOf('both') !=-1){
													$('input[name=\'_fm[oldpassword]\']').after('<label for="_fm[oldpassword]" class="invalid mt2">Your password is incorrect</label>');
													$('input[name=\'_fm[confirmpassword]\']').after('<label for="_fm[confirmpassword]" class="invalid mt2">Passwords do not match</label>');
												} else {
													$('input[name=\'_fm[confirmpassword]\']').after('<label for="_fm[confirmpassword]" class="invalid mt2">'+json.Actions.messages.Error+'</label>');
												}
											} else {
												$m.modal('hide');
												$.map(json.Actions, $app.doAction);
											}
											//$.map(json.Actions, $app.doAction);
										},
										'error': function(){
											$app.setMessage( 'Sorry, something went wrong please try again later!', 'error' );
											$m.modal('hide');
										}
									});
								}
							})
							.modal('show')
						;
						$(".ajax-modal").draggable({
							handle: ".modal-header"
						});
					};
					if(d.Refs['js'].length > 0){
						head.js(d.Refs['js'], cbJs);
					}else{
						cbJs();
					}
				}
			);
		}
	);
