$('#IsOnMaintenanceMode').on('change', function () {
    var isChecked = $(this).is(':checked');
    $.ajax({
        url: ROOT + "MenuGroups/SetMaintenanceModeState/",
        data: { isOnState: isChecked },
        success: function (res) {
            console.log(res);
            if (res.isSusseccfull) {
                toastr.success(res.Message);
                $('#maintenanceModeState').html('(' + res.State + ')');
            }
            else
                toastr.error(res.Message);
        }
    });
});
var updateMaintenanceModeDetials = function (a) {
    var btn = $(a).closest('div').find('.btn');
    var that = this;
    $(this).html('<i class="fa fa-spinner fa-spin"></i> Update');
    btn.attr('disabled', 'disabled');

    //var files = $("#maintenanceModeBgImage").get(0).files;
    var formdata = new FormData();
    //formdata.append("maintenanceModeBgImage", files[0]);
     //formdata.append("BgColor", $('#maintenanceModeBgColor').val());
    formdata.append("Title", $('#maintenanceModeTitle').val());
    formdata.append("Message", $('#maintenanceModeMessage').val());
   
   
   // console.log(files);
    $.ajax({
        type: 'POST',
        url: ROOT + "MenuGroups/UpdateMaintenanceModeDetails/",
        data: formdata,
        cache: false,
        contentType: false,
        processData: false,
        success: function (res) {
            if (res.isSusseccfull) {
                toastr.success(res.Message);
            }
            else {
                toastr.error(res.Message);
            }

            btn.removeAttr('disabled');
            $(that).html('<i class="fa  fa-save"></i> Update');
        }
    });
}

var readURL = function (input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();
        reader.onload = function (e) {
            $('#' + input.alt)
                .attr('src', e.target.result)
        };
        reader.readAsDataURL(input.files[0]);
    }
    else {
        var img = input.value;
        $('#' + input.alt).attr('src', img);
    }
}
var setDefaultImage = function (target) {
    $(target).attr("src", ROOT + "Content/Images/default-img.png");
}