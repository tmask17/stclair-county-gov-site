$(document).ready(function () {
    pageContentShowingProcess();
});

function pageContentShowingProcess() {
    if (isPagePasswordProtected() && isPageNeedsPasswordPrompt()) {
        hidePageContent();
        promptPagePassword();
    } else {
        showPageContent();
    }
}

function isPagePasswordProtected() {
    var isPasswordProtected = $("#isPasswordProtectedPage").html();
    return 1 === parseInt(isPasswordProtected);
}

function showPageContent() {
    $("#pagePasswordModal").modal("hide");
    $("#detailsPageContent").css("visibility", "");
}

function hidePageContent() {
    $("#detailsPageContent").css("visibility", "hidden");
    $("#pagePasswordModal").modal("show");
}

function promptPagePassword() {
    $("#confirmPasswordButton").click(function () {
        var currentPageId = $("#currentPageId").html();
        var pagePasswordField = $("input[name='pagePassword']");
        var pagePassword = pagePasswordField.val();
        var postData = { Id: currentPageId, Password: pagePassword };
        // appRoot always ends in a forward slash "/"
      //  var appRoot = $("#applicationRoot").html();
        var appRoot = ROOT;
        // The value of `url` below must always begin with a forward slash "/"
        // The appRoot variable starts and ends with a "/"
        $.ajax({
            url: appRoot + 'Pages/VerifyPassword',
            data: JSON.stringify(postData),
            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            async: false,
            success: function (response) {
                handleResponse(response);
            },
            error: function (xhr, status, errorThrown) {
                console.log("Xhr: " + xhr.responseText);
                console.log("Status: " + status);
                console.log("Error Thrown: " + errorThrown);
                hidePageContent();
            },
        });
    });

    function handleResponse(result) {
        if (/Success/i.test(result.resultMessage)) {
            showPageContent();
        } else {
            alert(result.resultMessage);
            hidePageContent();
        }
    }
}

function isPageNeedsPasswordPrompt() {
    var needsPrompting = false;

    // Get the current page Id
    // Check if it has been verified
    var currentPageId = $("#currentPageId").html();
    var postData = { pageId: currentPageId };
    // appRoot always ends in a forward slash "/"
    //var appRoot = $("#applicationRoot").html();
    var appRoot = ROOT;
    // the value of `url` below must always begin with a forward slash "/"
    $.ajax({
        url: appRoot + 'Pages/PageNeedsPasswordPrompt',
        data: JSON.stringify(postData),
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        async: false,
        success: function (result) {
            needsPrompting = result;
        },
        error: function (xhr, status, errorThrown) {
            console.log("Xhr: " + xhr.responseText);
            console.log("Status: " + status);
            console.log("Error Thrown: " + errorThrown);
        },
    });
    return needsPrompting;
}
