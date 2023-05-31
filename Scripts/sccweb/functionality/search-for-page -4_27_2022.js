$(document).ready(function () {
    handleShowPageSearchModal();
    handlePageSearch();
    handleHidePageSearchModal();
});

function handlePageSearch() {

    // Detects pages on the DB which will be shown when the starting 
    // strings are matched
    $("#pageSearchTextBox").on("keyup change cut", function () {
        console.log("keydown " + $(this).val());
       // var appRoot = $("#applicationRoot").html();
        var appRoot = ROOT;
        console.log(ROOT);
        var searchValue = $(this).val();
        if (searchValue.trim().length > 2) {     // update from sir lester == length > 2    ---- if (searchValue.trim().length > 0) {
            var postData = { pageTitleSearchTerm: searchValue.trim() };
            $.ajax({
                url: appRoot + 'Pages/QueryForPage',
                data: JSON.stringify(postData),
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
            }).done(function (data) {
                $("#pageSearchResults").empty();
                console.log(data);
                var dd = data.length;
                if (dd > 0) {
                    data.map(appendResultsToDiv);
                } else {
                    $("#pageSearchResults").empty();
                    $("#pageSearchResults").html("No results");
                }              
            }).fail(function (jqXHR, textStatus, errorThrown) {
                // console.log("Xhr: " + jqXHR.responseText);
                console.log("Status: " + status);
                console.log("Error Thrown: " + errorThrown);
            });
        } else {
            $("#pageSearchResults").html("No results");     //  <-- update from sir lester     ----  $("#pageSearchResults").empty();
        }
    });

    function appendResultsToDiv(data) {
        //  var appRoot = $("#applicationRoot").html();
        var appRoot = ROOT;
        var dd = data.length;

        var pageHyperlink = appRoot + "Offices/" + data.PageId;
        // var searchResultDiv = "<div class=\"mt-2 pageSearchResult\"><a href=" + pageHyperlink + "\>" + data.PageTitle + "</a></div>";
        // if(pageHyperlink.indexOf('.pdf'))   //pageHyperlink.includes('.pdf') || 
        //	 {}
        //  else{
        // split content remove _TWC_

        let fullcontent = data.PageContent;
        let splitcon = fullcontent.split('_TWC_');
        console.log(splitcon[0]);
        let lastcon = splitcon[0];
        let newcon = lastcon.split('_ONC_');

        let mcon = newcon[1];

        var divv = document.createElement("div");
        divv.innerHTML = mcon;
        var co = divv.textContent || divv.innerText || "";

        // let noimg=mcon.replace(/<img[^>]*>/g,"");

        // let co =noimg.replace(/(<([^>]+)>)/gi, "");

        let c2 = co.substring(0, 240);

        c2 = c2 + '...';

        var searchResultDiv = "<div class=\"mt-2 pageSearchResult\"><a href=" + pageHyperlink + "\>" + data.PageTitle + "<br/>" + c2 + "</a><hr/></div>";
        $("#pageSearchResults").append(searchResultDiv)   //  <-- update from sir lester  $("#pageSearchResults").append(searchResultDiv);
        //	 }

    }

}

function handleShowPageSearchModal() {
    $("#searchForPageButton").click(function () {
        $("#pageSearchResults").empty();
        $("#pageSearchTextBox").val("");
        $("#pageSearchModal").modal("show");
    });
    $("#searchForPageButton2").click(function () {
        $("#pageSearchResults").empty();
        $("#pageSearchTextBox").val("");
        $("#pageSearchModal").modal("show");
    });

    // Place cursor in textbox
    $('#pageSearchModal').on('shown.bs.modal', function () {
        $('#pageSearchTextBox').focus();
    });
}

function handleHidePageSearchModal() {
    $("#pageSearchModal").on('hidden.bs.modal', function () {
        $("#pageSearchTextBox").val("");
    });
}