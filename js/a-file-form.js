function sys_utils_ui_fileform(pIndex, $me){
	var $me				= $($me);
	var jsonCf			= $me.data('plupload-conf');
	jsonCf.drop_element = "filter_docs";
	$me.removeData('plupload-conf');
	var $btnBrowse		= $me.find('.code-browse:first');
	var $btnStart		= $me.find('.code-start:first');
	var $btnStop		= $me.find('.code-stop:first');
	var $fileList		= $me.find('ul.code-list');
	var files_remaining = 0;
	var total_queue     = 0;
	var uploaded_file   = 0 ;
	var uploader	    = new plupload.Uploader(jsonCf);

	$me
		.data('plupload', uploader)
		.on('dragover', function(ev){
			$me.addClass('drop-here');
		})
		.on('dragleave drop', function(ev){
			$me.removeClass('drop-here');
		})
		.on('click', '.code-start:first', function(ev){
			ev.preventDefault();
			if( uploader.total.queued > 0 ){
				uploader.start();
			}
		})
		.on('click', '.code-stop:first', function(ev){
			ev.preventDefault();
			uploader.stop();
		})
		.on('click', 'i.fa-trash', function(ev){
			uploader.removeFile($(this).parent('li').attr('id'));
			ev.preventDefault();
		})
		.on('click', '.code-clear-all', function(ev){
			uploader.splice(0);
			uploader.refresh();
		})
	;
	
	uploader.bind('StateChanged', function(up) {
		$me.find('.code-stop:first').toggleClass('hide', up.state === plupload.STOPPED);
		$me.find('.code-start:first').toggleClass('hide', up.state === plupload.STARTED);
	});
	
	uploader.bind('FilesRemoved', function(up, files) {
		$.each(files, function(i, file) {
			$fileList.find('li#'+file.id).remove();
		});
		up.refresh(); // Reposition Flash/Silverlight
	});
	uploader.bind('QueueChanged', function(up, files){
    	files_remaining = uploader.files.length;
    });
	uploader.bind('BeforeUpload', function(up, file) {
		up.settings.multipart_params.key = up.settings.multipart_params.key + get_guid();
		//console.log(file, 'Insert Temp Metadata to tmpFile table & prepare Amazon path!');
		return true;
	});
	uploader.bind('UploadProgress', function(up, file) {
		if( parseInt(file.percent) <= 80 ){
			$fileList.find('#' + file.id + ' > div.progress > div.progress-bar').width(file.percent + '%');
		}
	});
	
	uploader.bind('FileUploaded', function(up, file, xmlRs) {

		/* For getting upload file count status */
		files_remaining--;
		var total_queue 	= up.files.length;
		var uploaded_file 	= total_queue-files_remaining;
		if(files_remaining == 0)
			up.files.length = 0 ;
		
		/* -------------- */

		var $xmlR	= $($.parseXML(xmlRs.response)).children('PostResponse:first');
		var $file		= $fileList.find('#' + file.id);
		var postTags = typeof gridUplodtag != "undefined" && gridUplodtag.tags ? gridUplodtag.tags : ""; 
		$app.post(
			'sys/utils/ui/forms/file-forms/amazon-s3.cb', {
				'cb': $me.data('form-cb'),
				'name': file.name,
				'size': file.size,
				'type': file.type,
				's3_location': $xmlR.children('location:first').text(),
				's3_bucket': $xmlR.children('bucket:first').text(),
				's3_key': $xmlR.children('key:first').text(),
				's3_etag': $xmlR.children('etag:first').text(),
				'tags': postTags
			}, function(json){
				r					= json.Body;
				var status			= String(r.r_status);
				var workflow		= r.workflow;
				var dataSet			= r._data;


				if( 'ok' == status.toLowerCase() ){
					gridUplodtag = {};
					if(workflow != 0){
						/*$file.find('div.progress').html('<img src="/ui-themes/trigata/images/gif-load.gif" style="width:100%;height:150%;"/>');*/
						$.each(workflow, function(i, item) {
							var request = $.ajax({
												  url	:'/workflow.init/'+item,
												  method: "POST",
												  data 	: {'data':dataSet},
												});
							request.done(function( msg ) {
								$me.find('.code-browse:first span.upload_count').html('('+uploaded_file+'/'+total_queue+')');
								 $file.find('div.progress').remove();
								 $file.find('i.fa-trash').removeClass('fa-trash').addClass('fa-check clr_green');
								 $file.find('#' + file.id + ' > div.progress > div.progress-bar').width('100%');
								 $.each(msg.Actions['messages'], function(i, item){
	                                                  $app.setMessage(item,i);
	                                                });
							request.fail(function( jqXHR, textStatus ) {
								$me.find('.code-browse:first span.upload_count').html('('+uploaded_file+'/'+total_queue+')');
								  $file.find('i.fa-trash').removeClass('fa-trash').addClass('fa-info clr_green');
								  $file.find('#' + file.id + ' > div.progress > div.progress-bar').width('100%');
								  $file.find('div.progress').remove();
								  $app.setMessage('Something Failed Try Again','error');
								});	 
								if($('section.data-table').length){ 
									$('section.data-table').dataList();      
								}
									
							});
						});
					}
					else{
						$('section.data-table').dataList();
						$file.find('div.progress').remove();
						$file.find('i.fa-trash').removeClass('fa-trash').addClass('fa-check clr_green');
						$file.find('#' + file.id + ' > div.progress > div.progress-bar').width('100%');
						$me.find('.code-browse:first span.upload_count').html('('+uploaded_file+'/'+total_queue+')');
					}
					

				}else{
					$me.find('.code-browse:first span.upload_count').html('('+uploaded_file+'/'+total_queue+')');
					$file
						.find('i')
						.removeClass('fa-trash')
						.addClass('fa-info clr_red')
						.attr('title', r.length > 1 ? r : 'Unknown error!' )
					;
				}
			}
		);
		delete $xmlR;
	});
	uploader.bind('Error', function(up, err) {
		var $file		= $fileList.find('#' + err.file.id);
		$file.find('i').removeClass('fa-trash').addClass('fa-info clr_red').attr('title', err.code + ': ' + err.message);
		up.refresh(); // Reposition Flash/Silver light
	});
	uploader.bind('UploadComplete', function(up, files) {
		up.refresh(); // Reposition Flash/Silverlight
	});
	
	uploader.init();
	
	uploader.bind('FilesAdded', function(up, files) {
		var total_queue 	= up.files.length;
		$me.find('.code-browse:first span.upload_count').html('(0/'+total_queue+')');
		$.each(files, function(i, file) {
			//file.name		= file.id + '--' + file.name;
			$fileList.append(
				'<li class="clearfix" id="' + file.id + '" title="'+file.name+'"><i class="fa fa-trash icon-trash"></i><div class="up_name">' + file.name + '</div> <div class="progress  pull-right nomar"><div class="progress-bar progress-bar-success progress-bar-striped active"></div></div><span class="uploadSizeDrop" >' + humanFileSize(file.size, 1000) + '</span></li>'
			);
		});
		$me.find('.file_upload_list:not(:animated)').slideDown();
		up.refresh(); // Reposition Flash/Silverlight
		if( up.state === plupload.STOPPED ){
			up.start();
		}
	});
	
	$me.parent().hover(function(ev){
		if( $('.file_upload_list .scrollable.code-list li').length != 0 ){
			$me.find('.file_upload_list:not(:animated)').stop().delay(100).slideDown();
		}else{
			$me.find('.file_upload_list:not(:animated)').stop().delay(100).slideUp();
		}
		
	},function(){
			$me.find('.file_upload_list:not(:animated)').stop().delay(100).slideUp();
	}).find('.file_upload_list').css('display', 'none');	
}

function humanFileSize(bytes, si) {
    var thresh = si ? 1000 : 1024;
    if(bytes < thresh) return bytes + ' B';
    var units = si ? ['kB','MB','GB','TB','PB','EB','ZB','YB'] : ['KiB','MiB','GiB','TiB','PiB','EiB','ZiB','YiB'];
    var u = -1;
    do {
        bytes /= thresh;
        ++u;
    } while(bytes >= thresh);
    return bytes.toFixed(2)+' '+units[u];
};

function get_guid() {
	var v="";
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
	return v.toString();
});
}
