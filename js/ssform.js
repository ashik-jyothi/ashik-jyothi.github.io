//Javascript
var site_base_url = '/';
var DropformFiles = [];
var DropformFilesLength = 0;
window.viz_Files = {};
$(function(){
    window.setFileObj = function (params) {
            var fn = $.extend({
                action: 'set',
                startUpload: false,
                category: [],
                tags: true,
                field_id: Math.random().toString(36).substring(7),
                files : []
            }, params);
            if ((typeof fn.files === 'object' && fn.files.length != 0) || typeof fn.files == "number") {
            if (fn.action == "set") {
                viz_Files[fn.field_id] = [];
                for (var i = 0; i < fn.files.length; i++) {
                    viz_Files[fn.field_id][i] = fn.files[i];
                }
                buildFormFilePreModal(fn);
            } else if (fn.action == "delete") {
                viz_Files[fn.field_id].splice(fn.files, 1);
                if (viz_Files[fn.field_id].length === 0) {
                    delete viz_Files[fn.field_id];
                    $(`input[name="${fn.field_id}"]`)
                        .parent(".file-label")
                        .find(".file-cta .file-label")
                        .html("Drag it or Click here");
                }
            } else if (fn.action == "add") {
                for (var i = 0; i < fn.files.length; i++) {
                    viz_Files[fn.field_id].push(fn.files[i]);
                }
                buildFormFilePreModal(viz_Files[fn.field_id], fn.field_id, fn.startUpload, fn.tags, fn.category);
            } else if (fn.action == "deleteAll") {
                viz_Files[fn.field_id].splice(-fn.files, fn.files);
                if (viz_Files[fn.field_id].length === 0) delete viz_Files[fn.field_id];
            }
        }
    }

    function getCategoryFormField(field_id) {
        if($(`input[name="${field_id}"]`).length == 0) return false;
        var tab = "tab-" + $(`input[name="${field_id}"]`)
            .closest("[id^=sstab-]")
            .attr("id")
            .split("-")
            .pop();
        var layout = "layout-" + $(`input[name="${field_id}"]`)
            .attr("data-filpos")
            .split("_")
            .pop()
            .split("##")[0];
        var category = viz_Files.formFileKey[tab] && viz_Files.formFileKey[tab][layout] ? viz_Files.formFileKey[tab][layout] : [];
        return category;
    }
    
    $(window).on("shown.bs.modal", function () {
        var tagDiv = $(".formFileUploadListBoady").find('select[name="tag[]"]');
        tagDiv
            .select2({
                allowClear: true,
                tags: true,
                dropdownCssClass: "fileTagDrpDwn",
                tokenSeparators: [","]
            });
        var fieldId = $(".fileUploadListBody").data("field_id");
        if (viz_Files[fieldId])
            viz_Files[fieldId].map(function (file, i) {
                var tagOption = "";
                if(file.tag)
                tagOption = file.tag.map(function(t){
                    return `<option value=${t}>${t}</option>`;
                }).join("");
                $(tagDiv[i]).empty().append(tagOption).val(file.tag).trigger('change');
            });
    });

        var buildFormFilePreModal = function(obj){
            var categoryDiv,tagsDiv = "";
            var cat = obj.category.length ? obj.category : getCategoryFormField(obj.field_id);
            var fileText = _.values(viz_Files[obj.field_id]).map(function (file, index) {
                if(cat && cat.length > 1){
                    var catOptions = cat.map(function (item) {
                        if (file.category == item)
                            return `<option value="${item}" selected> ${item} </option>`;
                        else
                            return `<option value="${item}"> ${item} </option>`;
                    }).join("");
                    categoryDiv = `<td> <select class="file-category form-control" name="itemFile[]">
                                        ${catOptions}
                                        </select>
                                        </td>`;
                }
                if(obj.tags){
                    tagsDiv = `<td class="tagBox"><select type="text" name="tag[]" value="" multiple="multiple">
                    </select> </td>`;
                }
                return `<tr data-file_index=${index}>
                    <td class="itemFilenameTd"> <span class="itemFilename"> ${file.name} </span></td>
                    ${categoryDiv ? categoryDiv:""}
                    ${tagsDiv}
                    <td> <a data-index="${index}" class="deletFromTempList"> <i class="icon-delete-bin ls_delete"></i> </a> </td>
                </tr>`;
            }).join("");
                
                // console.log((200+ (48*data.length) )+"px" );

                var   str =`<div class="formFileUploadListBoady">
                <div class="modal-title">
                    <h2 class="title"> Upload Files </h2>
                </div>
                <div class="fileUploadListBody" data-field_id="${obj.field_id}">
                    <table class="table">
                        <tr>
                            <th> Name </th>
                            ${categoryDiv ? `<th> Category </th>`:""}
                            ${tagsDiv ? `<th class="tagTh"> Tag </th>`:""}
                            <th> </th>
                        </tr>
                         ${fileText}
            
                    </table>
                </div>
            </div>`;

            $app.setNotify({
                content: str, width: '885px', height: (200 + (50 * viz_Files[obj.field_id].length)) + "px", buttons: [{
                    text: "Done", class: "attachBtn", id: "attachToForm", action: function () {
                        if (viz_Files[obj.field_id]) {
                          var fileIndex = $(".fileUploadListBody tr[data-file_index]");
                          fileIndex.map(function(i, f) {
                            viz_Files[obj.field_id][i].tag = $(f)
                                .find('select[name="tag[]"]')
                                .val() || [];
                            viz_Files[obj.field_id][i].tag = viz_Files[obj.field_id][i].tag.concat(obj.tagList);
                            viz_Files[obj.field_id][i].category = cat.length === 1 ? cat[0] : $(f)
                                    .find('select[name="itemFile[]"]')
                                    .val();
                          });
                          if (obj.startUpload) {
                            appendUploadModal();
                            uploadFile(obj.field_id);
                          } else attachFilesToForm(obj.field_id);
                        }
                        DropformFiles = [];
                    }
                },
                {
                    text: "Cancel", class: "cancelAttch", id: "cancelAttch", action: function () {
                        if (DropformFilesLength) {
                          setFileObj({
                            action: "deleteAll",
                            files: DropformFilesLength,
                            field_id: obj.field_id
                          });
                          DropformFiles = [];
                          DropformFilesLength = 0;
                        }
                    }
                }
                ]
            });
        }
    var attachFilesToForm = function(field_id){
        var files;
        viz_Files[field_id] ?
            files = viz_Files[field_id].map(function (file,i) {
                return `<span class="form-files-selected">${file.name}<span class="icon-close-thick file-remove deleteFileForm"></span></span>`;
            }).join("") :
            files = "Drag it or Click here";
        $(`input[name="${field_id}"]`)
          .parent(".file-label")
          .find(".file-cta .file-label")
          .html(files);
          $(`input[name="${field_id}"]`)
          .parent(".file-label")
          .find(".fileDropArea").remove();
          $(`input[name="${field_id}"]`)
          .parent(".file-label")
          .find(".file-label.drag-click").show();
    }

    $('body').on('dragenter', '.file-cta', function (e) {
        e.preventDefault();
        e.stopPropagation();

        $(this).addClass("start-drag");
        if (!$(this).find('.fileDropArea').length) {
            $(this).find(".file-label.drag-click").hide();
            $(this).append('<div class="fileDropArea"><span class="dragDropText">Drop Files here..</span></div>').ready(function () {
            var dropArea = $(this).find('.fileDropArea').get(0);
            dropArea.addEventListener('dragleave', handleDragLeave, false);
            dropArea.addEventListener('drop', function (event) {
                var field_id = $(this).closest(".file-label").find(".file-input.ssfm-file").attr('id');
                var action = viz_Files[field_id] ? "add" : "set";
                DropformFiles = event.dataTransfer.files;
                DropformFilesLength = event.dataTransfer.files.length;
                setFileObj({action:action, files:event.dataTransfer.files, field_id:field_id});
            }, false);
        });
    }
    });

    $('body').on("click", ".deleteFileForm", function(e){
        e.stopPropagation();
        e.preventDefault();
        var index = $(this).parent(".form-files-selected").index();
        var field_id = $(this).closest("label.file-label").find("input[data-type='file']").attr("id");
        $(this).parent(".form-files-selected").remove();
        setFileObj({action:"delete", files:index, field_id:field_id});
    });

    $('body').on("click", ".deletFromTempList", function () {
        var index = $(this).closest("tr").index() - 1;
        var field_id = $(this).closest(".fileUploadListBody").data("field_id");
        $(this).closest("tr").remove();
        setFileObj({action:"delete", files:index, field_id:field_id});
    });

    $('body').on("change", ".file-input.ssfm-file", function () {
        var field_id = $(this).attr('id');
        var action = viz_Files[field_id] ? "add" : "set";
        DropformFiles = this.files;
        DropformFilesLength = this.files.length;
        setFileObj({action:action, files:this.files, field_id:field_id});
        $(this).val("");
    });
    var dragTimer;
    function handleDragLeave(e) {
        e.preventDefault();
        window.clearTimeout(dragTimer);
        dragTimer = window.setTimeout(function() {
            $('.rightdragAndDropArea').remove();
            $(".fileDropArea").remove();
            $(".file-label").show();
        },2000);
    }    
 
});
function uploadFile(field_id) {
    var aFajax = [];
    const axiosViz = axios.create();
    axiosViz.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
         var initWflow = function(data,category){
            if (data.Result.r_status) {
                $.each(data.Result.workflow, function(i, item) {
                        var nWorkflowData = JSON.parse(data.Result._data);
                        nWorkflowData[0].filekey = $(`input[name="${field_id}"]`).data("name") || category;
                var request = $.ajax({
                                        url :'/workflow.init/'+item,
                                        method: "POST",
                                        data    : {'data': JSON.stringify(nWorkflowData)   },
                                    });
                request.done(function( msg ) {
                        $.each(msg.Actions['messages'], function(i, item){
                                            $app.setMessage(item,i);
                                        });
                request.fail(function( jqXHR, textStatus ) {
                        $app.setMessage('Something Failed Try Again','error');
                    });  
                });
            });         
            }

        };     
                // var fileInputId = fileInput.attr('id');
                if ( viz_Files[field_id] && viz_Files[field_id].length ) { 
                        $.each(viz_Files[field_id], function(i, file) {
                            var progresElemant = $(`<div class="upload-files-list"> <span class="FileStatus" data-file=${i}></span><div class="progress">
                            <div class="progress-bar progress-bar-success active  " role="progressbar" aria-valuenow="70" aria-valuemin="0"
                                aria-valuemax="100" style="width:0%"></div>
                        </div><i class="icon-check1" style="display:none"></i></div> `);

                            var config = {                          
                                onUploadProgress: function(progressEvent) {
                                    var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
                                    console.log(percentCompleted);
                                    progresElemant.find(".progress-bar").stop().animate({width: percentCompleted+"%"})
                                }
                              };

                            var ssFileData = new FormData();
                             ssFileData.append("upload_file[]", file);
                             progresElemant.find(".FileStatus").append(file.name);
                             ssFileData.append("tags", file.tag.join("_viztag_"));
                             $(".formFileUploadListBoady").find(".fileUploadListBody").append(progresElemant);
                             var aFajaxItem = axiosViz.post( `/ls/uploader.upload/${$app.user.id}/${$app.activeLs.lid}` , ssFileData, config)
                             .then(function(res){
                                    progresElemant.find(".progress-bar").stop().animate({width: "100%"});
                                    progresElemant.find(".icon-check1").show();
                                    initWflow(res.data,file.category);
                                });
                                aFajax.push(aFajaxItem)
                         });
                         axios.all(aFajax).then(function(e){
                            if(e.length == aFajax.length){
                                delete viz_Files[field_id];
                                $('.ajax-modal').modal('hide');
                            }
                        });
                    }  
                    else {
                            var aFajaxItem = $.Deferred();
                            aFajax.push(aFajaxItem);
                            aFajaxItem.resolve("No File Input ");

                    }
                    return aFajax; 

}

var appendUploadModal = function(){
    var str = `<div class="formFileUploadListBoady">
    <div class="modal-title">
        <h2 class="title"> We are verifying your files. Thanks for your patience. </h2>
    </div>
    <div class="fileUploadListBody">

    </div>
</div>`;

    $app.setNotify({
        content: str, width: '885px', height: (200 + (48 * viz_Files.totalFiles)) + "px", buttons: [{
            text: "Ok", action: function () {
                $('.ajax-modal').modal('hide');
            }
        }]
    });
}

var valiDateInputs = function(th_is, save) {
    var formPromise = $.Deferred();
   var formMode =  th_is.data('after'); 
    if (th_is.hasClass("viz-def-ssform-btn")) {
        $('.ssform-button-val').val('viz-def-ssform-btn');
    } else {
        $('.ssform-button-val').val(th_is.attr('data-name'));
    }
    //var retVal  = form_validate();
    var retVal          = [];
    var falseFieldsVal  = window.form_validate_clone();

    if(_.keys(falseFieldsVal).length ){ 
      var errorArray    = falseFieldsVal.map(function(e){ 
        retVal.push(e.field_name)
        return `<li class="pb10"><i class="icon-arrow-right"></i>  ${e.error_message} </li>`;
      });

        if(save) { 
             $app.setNotify({
            content: `<ul class="text-left pl0" > ${errorArray.join("")} </ul>`,
            callBack: function(){$('.ssform-button').removeClass('inqueue')}, 
        });
        }
     
    }

    $('#error-msg').text('');
    if (retVal.length < 1) {
        var $ssfm = th_is.parents('form.ssform-form');
        var hasFiles = $ssfm.find(".ssform-fields .ssfm-file");
        var gridObjKey = $('#ssform-gridObjKey').val();
        var divId = 'dataobj_' + gridObjKey;
        var contentId = th_is.parent().find('#ssform-app-content').val();
        if (save) {
            $('#rightPanel #homestatic').block(new loderconf);
            $('#mobileForm').block(new loderconf);
            $.ajax({
                type: "POST",
                url: "/analytics/form.save" + $app.queryString(),
                cache: false,
                data: $ssfm.serialize(),
                success: function (data) {
                    $('#rootwizard').trigger("form.save",[{"data":data,"formid":$('#ssform-id').val()},]);
                    formPromise.resolve("done");
                    if(data.Actions.messages != null){
                        $.each(data.Actions.messages, function (i, item) {
                            $app.setMessage(item, i);
                        });
                    }
                    viz_Files.totalFiles = 0;
                    for (var key in viz_Files) {
                        if (key != "formFileKey" && key != "totalFiles") {
                            for(var i in viz_Files[key]){
                                viz_Files[key][i].tag = viz_Files[key][i].tag.concat(data.Result.row.tags);
                            } 
                            viz_Files.totalFiles += viz_Files[key].length;
                        }
                    }
                    console.log("total files to upload:::", viz_Files);
                    if (viz_Files.totalFiles) {
                        appendUploadModal();
                    }
                    var uploadArry = hasFiles.map(function (el) {
                        return uploadFile($(this).attr("id"));
                    });
                    var waRRAY = _.flatten(_.map(hasFiles, function (e, i) { return uploadArry[i] }));
                    console.log({ "waRRAY": waRRAY, "uploadArry": uploadArry });

                    Promise.all(_.flatten(uploadArry)).then(function (upStatus) {
                        if (formMode == 'add') {
                            window.rightpanel = {};
                            rightpanel.ssform = data.Result.row;
                            // load_url(data.Result.row.new,'#rightPanel #homestatic');
                            $('#rightPanel #homestatic').block(new loderconf);
                            $.get(data.Result.row.new, function (data) {
                                reactFunc(data);
                            });

                        }
                        else if (formMode == 'update') {
                            window.rightpanel = {};
                            rightpanel.ssform = data.Result.row;
                            var nUrl = data.Result.row.edit.replace("r-", "");
                            // load_url(nUrl,'#rightPanel #homestatic');
                            $('#rightPanel #homestatic').block(new loderconf);
                            $.get(nUrl, function (data) {
                                reactFunc(data);
                            });

                        }

                    });
                    $ssfm.find("select.ssform-field").removeAttr('checked');
                    if (data.Result.status == 'success') {
                        if ($.trim(data.Result.message) !== "") { $app.setMessage(data.Result.message, "success"); }
                        if (data.Result.wstatus) {
                            $.each(data.Result.workflows, function (colName, wrkflwId) {
                                $.ajax({
                                    type: "POST",
                                    dataType: "json",
                                    url: "/workflow.init/" + wrkflwId,
                                    data: {
                                        "data": JSON.stringify([data.Result.rowdata])
                                    },
                                    success: function (wdata) {
                                        $.each(wdata.Actions['messages'], function (i, item) {
                                            $app.setMessage(item);
                                        });
                                    }
                                });
                            });
                        }

                        if (data.Result.realtime.status) {
                            $.ajax({
                                type: "POST",
                                dataType: "json",
                                url: "/ls/liveapps/realtime.save" + $app.queryString(),
                                data: {
                                    "data": JSON.stringify([data.Result.realtime])
                                },
                                success: function (wdata) {
                                    $.each(wdata.Actions['messages'], function (i, item) {
                                        $app.setMessage(item);

                                    });
                                }
                            });
                        }
                    } else {
                        $app.setMessage(data.Result.message, "success");
                    }
                    // $('.ajax-modal').modal('hide');
                    //console.log(contentId);
                    if (contentId && dtl[contentId]) {
                        if ($(dtl[contentId][0]).hasClass("datalistReact")) {  dtl[contentId].fnDraw(false); } 
                          
                        else {   dtl[contentId].api().draw(false); }
                          
                    }
                }
            });
        }
    } else {
        formPromise.resolve("hasError");
        }
        /* var ret_string = retVal.join(', '); */
        $('input.ssform-field').each(function(key, val) {
            $(this).removeClass('valError');
            $('#ssFormTabEdit li a').removeClass('hasErrorElement');
        }).promise().done(function() {
            $.each(retVal, function(e, i) {
                $("input[id='"+i+"']").addClass('valError');
                $('#error-msg').text('Validation Errors');
                elmentTab = $("input[id='"+i+"']").parents('.tab-pane').attr('id');
                $('a[href*="'+elmentTab+'"]').addClass('hasErrorElement');

            });
        });
    
    return false;
};
/*
$(document).ready(function() {
    $("body").on("click", '.ssform-button', function(e) {
        valiDateInputs($(this),true);
    });
    $("body").on("blur , change", 'input.valError', function(e) {
        valiDateInputs($(this),false);
    });


}); */