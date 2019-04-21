function sys_controllers_liveapp_objdna_list(i,$me){
  $me = $($me);
  $me.on('click', 'div.widget-title > span.icon > a.editdata', function(ev){
	var _s	= $.map( $me.find('table.data-table').dataTable().$("tr.selected"), function(e){ return e.id; });
	if(_s=='') return false;
	if( _s != ''){
	  var sel_app 			= $('#applist_objdna').val();
	  $(this).attr('href','/ls/liveapps/objdna.edit/'+_s+'?_ls='+sel_app);
	  return true;
	}
	ev.preventDefault();
  });
}
