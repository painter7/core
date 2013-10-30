// override reload with own ajax call
FileList.reload = function(){
	FileList.showMask();
	if (FileList._reloadCall){
		FileList._reloadCall.abort();
	}
	$.ajax({
		url: OC.filePath('files_trashbin','ajax','list.php'),
		data: {
			dir : $('#dir').val(),
			breadcrumb: true
		},
		error: function(result) {
			FileList.reloadCallback(result);
		},
		success: function(result) {
			FileList.reloadCallback(result);
		}
	});
}

FileList.linkTo = function(dir){
	return OC.linkTo('files_trashbin', 'index.php')+"?dir="+ encodeURIComponent(dir).replace(/%2F/g, '/');
}

FileList.oldUpdateEmptyContent = FileList.updateEmptyContent;
FileList.updateEmptyContent = function(){
	FileList.oldUpdateEmptyContent.apply(this, arguments);
	$('#trash').prop('disabled', !$('#fileList tr:first').exists());
}
