//Javascript
$(document).ready(function() {
    $("body").on("click", 'input.ssgrid-button', function(e) {
        //e.preventDefault()
        var divObj  = $(this).parents('div.widget-box');
        var contentId = $(this).parents('div.objectContent').data('id');
        var val     = $(this).attr('ref').split('viz@viz');
        $(this).closest('ul.dropdown-menu').dropdown('toggle');
        $.ajax({
            type: "POST",
            url: "/analytics/grid.save"+$app.queryString(),
            cache: false,
            data: {ssid: val[0], rowId: val[1], colmnKey: val[2], colValue: val[3]},
            success: function(data) {
                if (data.Result.status == 'success') {
					
                    if (data.Result.wstatus) {
                        $.each(data.Result.workflows, function(colName, wrkflwId) {
                            $.ajax({
                                type: "POST",
                                dataType: "json",
                                url: "/workflow.init/" + wrkflwId,
                                data: {
                                    "data": JSON.stringify([data.Result.rowdata])
                                },
                                success: function(wdata) {
                                    $.each(wdata.Actions['messages'], function(i, item) {
                                        $app.setMessage(item,i);

                                    });
                                }
                            });
                        });
                    }else { $app.setMessage(data.Result.message,"success") }

                    if(data.Result.realtime.status){
                            $.ajax({
                                type: "POST",
                                dataType: "json",
                                url: "/ls/liveapps/realtime.save"+$app.queryString(),
                                data: {
                                    "data": JSON.stringify([data.Result.realtime])
                                },
                                success: function(wdata) {
                                    $.each(wdata.Actions['messages'], function(i, item) {
                                        $app.setMessage(item);

                                    });
                                }
                            });
                    }


                } else {
					$app.setMessage(data.Result.message,"success");
                }

                $('.ajax-modal').modal('hide');
                if($(this).parents('div.objectContent').length>0) //dashbord case
                    dtl[contentId].fnDraw();
                else{
                    $.each(Object.keys(dtl), function(a,i){
                     dtl[i].fnDraw();
                    });
                }

                
            }
        });


    });

    /* Drill Down in Template Grid */
    $("body").on('click', '.expandTable:not(.open,.inQuee)', function(ev){
        var $this		= $(this);        
        var isOpen = $(this).hasClass('open');
        $this.addClass('inQuee'); 
        var level = $this.data("level");
        var levelnext = parseInt(level) + 1;
        var mode        = $('#mode').val();
        var rowId       = $(this).data('row'); 
		var paddingLeft 	= $this.closest('td').css( "paddingLeft" );
		paddingLeft		= parseInt(paddingLeft)+10;
		var ssformEnabled	= $(this).parents('.ssform-enabled').length;
		var sstagEnabled	= $(this).parents('table.sstag-enabled').length;
		var contentId = $(this).parents('div.objectContent').data('id');
        if(mode == 'template'){
            var gridObjId   =   $("#objectId").val();
            var url         =   "/analytics/grid.drilldown"+$app.queryString();
        }else if(mode == 'dashboard'){
            var gridObjId   =   $(this).parents('div.objectContent').data('id');
            var url         =   "/ls/liveapps/grid.drilldown"+$app.queryString();
        }
        var dataString  = "obj="+gridObjId+"&rowid="+rowId+"&mode="+mode;
		var html = ""; 
		if(!isOpen){
        $.ajax({
            type: "POST",
            url: url,
            cache: false,
            data: dataString,
            success: function(data){
				var records  = data.result.data.records;
			if(typeof records ==="object"){
					$.each(records, function(key, val)
					{
						if($this.closest('tr').hasClass('subLevel')){
							var parentClass = $this.closest('tr').attr('class');
							html += '<tr class= "level_'+levelnext+' '+parentClass+' id'+rowId+'" >';
						}else{
							html += "<tr class=' level_"+levelnext+" subLevel id"+rowId+"'>";
						}
						var times = 1;
						var keyChildVal ="";
						var ssGridActionMenu;
                        var childClass = '';
						$.each(val, function(keyChild, valChild)
						{
							if(keyChild === 'vizRowId'){
                                var valChildArray = valChild.split('_');
                                if(valChildArray[1] == 0){
                                        childClass = 'inactive';
                                }else
                                    childClass = '';
								if((ssformEnabled === 1) || (sstagEnabled === 1)){
									var dataSS = $this.closest('tr').find('.ssGridActionMenu ').data();
									ssGridActionMenu = '<div class="ssGridActionMenu" data-ssid="'+dataSS.ssid+'" data-gridobjlink="'+dataSS.gridobjlink+'"  data-formid="'+dataSS.formid+'" data-appid="'+dataSS.appid+'" data-rowid="'+valChildArray[0]+'" data-edit="/analytics/form.preview/'+dataSS.formid+'/edit/'+valChildArray[0]+'/'+dataSS.gridobjlink+'-'+dataSS.appid+'"></div>';
									

                                    keyChildVal ='<div class="expandIconWrap ' + childClass +'"><a data-level='+levelnext+'  class="expandTable" data-row="'+valChildArray[0]+'"><i class="fa fa-caret-right"></i></a></div>';
									html += "<td style='padding-left:"+paddingLeft+"px'>"+ssGridActionMenu+" "+keyChildVal+" <span class='expandRowVal'>&nbsp;</span></td>";
									
								}else{
									keyChildVal ='<div class="expandIconWrap ' + childClass +'"><a data-level='+levelnext+' class="expandTable" data-row="'+valChildArray[0]+'"><i class="fa fa-caret-right"></i></a></div>';
								}
							}else{
								if ((times === 2) && (ssformEnabled === 0) && (sstagEnabled === 0)) {
									html += "<td style='padding-left:"+paddingLeft+"px'>"+keyChildVal+" <span class='expandRowVal'>"+valChild +"</span></td>";
								}else{
									html += "<td>"+valChild +"</td>";
								}
							}
							times++;
						});
						html += "</tr>";
					});
					
                $this.addClass('open').closest('tr').after(html);
                $this.removeClass('inQuee');
                dtl[gridObjId].fnAdjustColumnSizing(false);
            }
		}
        });	
		}
		
        return false;
    });
	
	 $("body").on('click', '.expandTable.open', function(ev){
		 ev.preventDefault();
		 var $this 			 = $(this);
		 var rowId       = $this.data('row'); 
		$('.subLevel.id'+rowId).remove();
		$this.removeClass('open') ;
		 
	 });
});


