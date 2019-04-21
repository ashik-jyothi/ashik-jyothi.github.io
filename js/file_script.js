$(function(){

    var ul = $('#file_upload_list ul');

    $("#file_upload_list > div > span > .code-clear-all").click(function() {
        $("#file_upload_list li > .fa-check").parent().remove();
        $("#file_upload_list li > .fa-info").parent().remove();
        $(".file_upload_list").fadeOut();
    });

    $('#file_upload a').click(function(){
        // Simulate a click on the file input button
        // to show the file browser dialog
        $(this).parent().find('input').click();
    });

    $(".file_upload").hover(function(ev) {
	    if ( $("#file_upload_list .scrollable.code-list li").length != 0) {
		    $("#file_upload_list:not(:animated)").stop().delay(100).slideDown();
	    } else {
		    $("#file_upload_list:not(:animated)").stop().delay(100).slideUp();
	    }
    },function() { $('#file_upload_list:not(:animated)').stop().delay(100).slideUp()});

    // Initialize the jQuery File Upload plugin
    $('#file_upload').fileupload({

        // This element will accept file drag/drop uploading
        dropZone: $('#filter_docs, #content.isDashboardView'),

        // This function is called when a file is added to the queue;
        // either via the browse button, or via drag/drop:
        add: function (e, data) {
	    var filesize = formatFileSize(data.files[0].size);
        data.files[0].id = get_guid();
        data.formData = gridUplodtag;
	    var filename = data.files[0].name;
	    total_queue = data.files.length;
	    var tpl = $('<li class="clearfix" id="' + data.files[0].id + '" title="'+filename+'"><i class="fa fa-trash icon-trash"></i><div class="up_name">' + filename + '</div> <div class="progress pull-right nomar"><div class="progress-bar preogress-bar-success progress-bar-striped active"></div></div><span class="uploadSizeDrop">' + filesize + '</span></li>');
            // Add the HTML to the UL element
	    data.context = tpl.appendTo(ul);

	    $(document).find('.file_upload_list:not(:animated)').slideDown();

            // Automatically upload the file once it is added to the queue
             var jqXHR = data.submit().success(function (result, textStatus, jqXHR1) {

                var r                   = result.Result;
                var status              = String(r.r_status);
                var workflow            = r.workflow;
                var dataSet             = r._data;
                gridUplodtag = {};

                if( 'ok' == status.toLowerCase() ){
                        if(workflow != 0){
                            $.each(workflow, function(i, item) {
                                                var request = $.ajax({
                                                url   :'/workflow.init/'+item,
                                                method: "POST",
                                                data  : {'data':dataSet},
                                            });

                        request.done(function( msg ) {
                                if(msg.Actions['messages']) {
                                 $.each(msg.Actions['messages'], function(i, item){
                                               $app.setMessage(item,i);
                                                        });
                                                    }
                                                });
                                            });
                                        }
                                        if($('section.data-table').length){ 
                                            $('section.data-table').not('.datalistReact').each(function(){
                                                $(this).dataList();
                                            });     
                                        }		
                                }
			
			$(data.context).find('div.progress > div.progress-bar').width('100%');
			$(data.context).find('div.progress').remove();
			$(data.context).find('i.fa-trash').removeClass('fa-trash').addClass('fa-check clr_green');
			$(".file_upload_list").stop().delay(100).slideUp();
                         });	
                },

        progress: function(e, data){

            // Calculate the completion percentage of the upload
            var progress = parseInt(data.loaded / data.total * 100, 10);
            if(progress <= 80){
		data.context.find('div.progress > div.progress-bar').width(progress+'%');
            }
        },

        fail:function(e, data){
	    $(data.context).find('i.fa-trash').removeClass('fa-trash').addClass('fa-info clr_green');
	    $(data.context).find('div.progress > div.progress-bar').width('100%');
	    $(data.context).find('div.progress').remove();
	    $app.setMessage('Something Failed Try Again', 'error');
	    $(".file_upload_list").stop().delay(100).slideUp();
            // Something has gone wrong!
        }

    });


    // Prevent the default action when a file is dropped on the window
    $(document).on('drop dragover', function (e) {
        e.preventDefault();
    });

    // Helper function that formats the file sizes
    function formatFileSize(bytes) {
        if (typeof bytes !== 'number') {
            return '';
        }

        if (bytes >= 1000000000) {
            return (bytes / 1000000000).toFixed(2) + ' GB';
        }

        if (bytes >= 1000000) {
            return (bytes / 1000000).toFixed(2) + ' MB';
        }

        return (bytes / 1000).toFixed(2) + ' KB';
    }

}); 

function get_guid() {
	var v="";
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		var r = Math.random()*16|0, v = c == 'x' ? r : (4&0x3|0x8);
		return v.toString();
	});
}
