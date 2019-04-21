function sys_controllers_ls_favorite( i, $me){
	$me					= $($me);
	/*//$("body").on("click",'.ls-favorite',function(){*/
	$me.on('click', '.ls-favorite', function(ev){
			var lid			=	$(this).data('id');
			var par 		= 	$(this);
			var ajaxUri		=	'/ls/livespace.lsgrid'+$app.queryString();
			var type 		=	'livespace';
			var app_id		=	0;
			isFav = par.hasClass('lsfav');
			/*//isFav	=	$(this).find('i').hasClass('icon-star');*/
			if(isFav){
				removeFavorite(lid, ajaxUri, type, app_id);
			}
			else{
				addFavorite(lid, ajaxUri, type, app_id);
			}
			par.toggleClass('lsfav');
			$(this).addClass('bounce');
			return false;

	});

	$me.on('click', '.dashboard-favorite', function(ev){
	/*//$("body").on("click",'.dashboard-favorite',function(){*/
			var id		=	$(this).data('id');
			var par 	= 	$(this);
			var ajaxUri	=	'/ls/liveapps.list'+$app.queryString();
			var type 	=	'dashboard';
			var arr 	= 	id.split('-');
			var app_id	=	arr[0];
			var lid 	=	arr[1];
			isFav = par.hasClass('lsfav');
			/*//isFav	=	$(this).find('i').hasClass('icon-star');*/
			if(isFav){
				removeFavorite(lid, ajaxUri, type, app_id);
			}
			else{
				addFavorite(lid, ajaxUri, type, app_id);
			}
			par.toggleClass('lsfav');
			$(this).addClass('bounce');
			return false;

	});

	$me.on('click', '.custom_dashboard-favorite', function(ev){
	/*//$("body").on("click",'.custom_dashboard-favorite',function(){*/
			var id		=	$(this).attr('id');
			var par 	= 	$(this);
			var ajaxUri	=	'/ls/liveapps/filter/criteria.list'+$app.queryString();
			var type 	=	'custom_dashboard';
			var arr 	= 	id.split('-');
			var app_id	=	arr[0];
			var lid 	=	arr[1];
			isFav = par.hasClass('lsfav');
			/*//isFav	=	$(this).find('i').hasClass('icon-star');*/
			if(isFav){
				$(this).find('i').switchClass('fa-star', 'fa-star-o');
				removeFavorite(lid, ajaxUri, type, app_id);
			}
			else{
				$(this).find('i').switchClass('fa-star-o','fa-star');
				addFavorite(lid, ajaxUri, type, app_id);
			}
			par.toggleClass('lsfav');
			$(this).addClass('bounce');
			return false;

	});
}
function addFavorite(lid, ajaxUri, type, app_id) {	
	$.getJSON(ajaxUri, {
        'params': 'favorite',
        'lid'   : lid,
        'app_id': app_id,
        'type'  : type, 
        'action': 'add'
    },
    function (d, s, jqXHR) {
        }
	);
}

function removeFavorite(lid, ajaxUri, type, app_id) {
	$.getJSON(ajaxUri, {
        'params': 'favorite',
        'lid'   : lid,
        'app_id': app_id,
        'type'  : type,
        'action': 'remove'
    },
    function (d, s, jqXHR) {
        }
	);
}