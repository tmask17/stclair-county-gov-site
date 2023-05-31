$(document).ready(function () {
    savePagePassword();
    checkedOnChange();
});

function savePagePassword() {
    // Save Password
    $("#addPagePasswordButton").click(function () {
        var pageId = $("input[name='pageId']").val();
        var passwordInputField = $("input[name='newPassword']");
        var passwordInput = passwordInputField.val();
        var postData = { Id: pageId, Password: passwordInput };
        // appRoot always ends in a forward slash "/"
       // var appRoot = $("#applicationRoot").html();
        var appRoot = ROOT;
        // the value of `url` below must always begin with a forward slash "/"
        // The appRoot variable starts and ends with a "/"
        $.ajax({
            url: appRoot + 'Pages/AddPassword',
            data: JSON.stringify(postData),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
                alert(response.resultMessage);
            },
            error: function (xhr, status, errorThrown) {
                console.log("Xhr: " + xhr.responseText);
                console.log("Status: " + status);
                console.log("Error Thrown: " + errorThrown);
                alert(xhr.responseJSON.resultMessage);
            },
        });
    });
}

function checkedOnChange() {
    $("input[name='enabledCheckbox']").on('change', function () {
        var element = $(this).first();
        var sequence = element.attr("attr-id");

        if (element.is(':checked')) {
            element.attr("checked", "checked");
            $('#' + sequence).val('True');
        } else {
            element.removeAttr("checked", "checked");
            $('#' + sequence).val('False');
        }
        
    });
}




