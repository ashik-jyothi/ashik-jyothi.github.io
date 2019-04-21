  //Javascript
var site_base_url = '/';
$(document).ready(function(){
	
	/* Collection - Drag & Drop : Begin */
	var _c = {};
	$('table.data-table').on('mouseenter', 'tr.elements_row:not(.ui-draggable)', function(ev){
		var $grid = $(ev.delegateTarget).dataTable();
		$(this).draggable({
			containment: 'parent',
			 cancel: '.dropdown' ,
			cursor: 'move',
			cursorAt: {
				top: -10,
				left: -10
			},
			helper: function(ev){
				var _seln	 = $grid.$("tr.selected.elements_row").add(ev.delegateTarget).length
				return $('<div class="ls-move-docs-seln">' + _seln + ' documents.</div>')
			},
			start: function(ev, ui) {
				$(ev.delegateTarget).not('.selected').addClass('selected');
				_c.tr = this;
				_c.helper = ui.helper;
			}
		}).css('cursor', 'move');
	});
	$('table.data-table').on('mouseenter', 'tr.collection_row:not(.ui-droppable)', function(ev, ui){
		var $grid = $(ev.delegateTarget).dataTable();
		$(this).droppable({
			drop: function(ev, ui) {
				if( ui.draggable.is('tr.elements_row') && confirm('Are you sure you want to move selected documents?' ) ){
					var _p	= {
						'files': $.map( $grid.$("tr.selected.elements_row"), function(e){ return e.id.substr(9); }),
						'colln': $(this).attr("id").substr(11),
						'ls': $app.state.liveSpace
					};
					$app.post(
						'ls/livespace.move',
						_p,
						function(json){
							$grid.fnDraw();
						}
					);
				}
				return true;
			}
		}).css('cursor', 'move');
	});
	/* Collection - Drag & Drop : End */
});						  