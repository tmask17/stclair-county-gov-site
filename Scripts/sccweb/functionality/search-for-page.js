$(document).ready(function () {
    handleShowPageSearchModal();
    handlePageSearch();
    handleHidePageSearchModal();
});

function handlePageSearch() {

    // Detects pages on the DB which will be shown when the starting 
    // strings are matched
    $("#pageSearchTextBox").on("keyup change cut", function () {
        // console.log("keydown " + $(this).val());
        // var appRoot = $("#applicationRoot").html();
        var appRoot = ROOT;
        // console.log(ROOT);
        var searchValue = $(this).val();
        var sval = searchValue.trim();
        sval = sval.toLowerCase();
        if (searchValue.trim().length > 2) {     // update from sir lester == length > 2    ---- if (searchValue.trim().length > 0) {
            $("#inputGroupPrepend3").show();

            var postData = { pageTitleSearchTerm: sval };   //{ pageTitleSearchTerm: searchValue.trim() };
            $.ajax({
                url: appRoot + 'Pages/QueryForPage',
                data: JSON.stringify(postData),
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
            }).done(function (data) {
                $("#pageSearchResults").empty();
                //console.log(data);
                var dd = data.length;

                $("#inputGroupPrepend3").hide();
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
            $("#inputGroupPrepend3").hide();
            $("#pageSearchResults").html("No results");     //  <-- update from sir lester     ----  $("#pageSearchResults").empty();
        }
    });

    function appendResultsToDiv(data) {

        var appRoot = ROOT;
        var dd = data.length;

        var kw = $("#pageSearchTextBox").val();   // keyword
        var regKeyword = new RegExp(kw, 'i');
        var acc_title = data.PageTitle;

        // added condition also highlight the title if it match with the search input
        var hasTitleHasKW = acc_title.match(regKeyword);
        if (hasTitleHasKW) {
            var strReplace = '<span style="background-color: #FFFF00">' + hasTitleHasKW[0] + '</span>';
            acc_title = acc_title.replaceAll(hasTitleHasKW[0], strReplace);
        }

        if (data.PageType === "Page") {
            var pageHyperlink = appRoot + "Offices/" + data.PageId;

            let fullcontent = data.PageContent;

            let splitcon = fullcontent.split('_TWC_');    // get the total number of accordion array

            // check if the full content has any keyword text
            var hasFullContentHasKW = fullcontent.match(regKeyword);

            for (let i = 0; i < splitcon.length - 1; i++) {
                var hasMatchFound = false;

                var data_with_title = splitcon[i];
                var acc_split = data_with_title.split('_ONC_');

                // check it matches with the accordion title
                var hasAccordionTitleMatchKW = acc_split[0].match(regKeyword);

                var acc_content = acc_split[1];

                // now get the accordion content and remove the markups
                var divv = document.createElement("div");

                divv.innerHTML = acc_content;
                var co = divv.textContent || divv.innerText || "";

                // remove leading and trailing spaces.
                var clean_co = co.trim();

                // first check if undefined 
                var c2 = clean_co.substring(0, 240);

                var check_api = co.includes('{');
                var check_api2 = co.includes('}');

                if ((c2.trim() != "undefined") && (check_api == false) && (check_api2 == false))   //&& (check_api == false)
                {
                    var kw_len = kw.length;

                    // first letter is uppercase
                    var str = kw.toLowerCase();
                    //var str2 = str.charAt(0).toUpperCase() + str.slice(1);
                    //var str3 = str.toUpperCase();

                    var pageHyperlink2 = pageHyperlink + "?kw=" + kw.toLowerCase().replaceAll(' ', '%20') + "&acc=" + i;

                    $(divv).find('td').find('a').each(function () {
                        if (hasMatchFound)
                            return false;
                        else {
                            if ($(this).find('img').length < 1) {
                                var elems = $(this).html();
                                var isHasmatch = elems.match(regKeyword);
                                if (isHasmatch) {
                                    hasMatchFound = true;

                                    var c3 = '...' + elems.replaceAll(isHasmatch[0], '<span style="background-color: #FFFF00">' + isHasmatch[0] + '</span>') + '...';
                                    var searchResultDiv = "<div class=\"mt-2 pageSearchResult\"><a href=" + pageHyperlink2 + "\><strong>" + acc_title + "</strong>&nbsp;<i class='fa fa-file-text f2' aria-hidden='true'></i><br/></a><small style='color: #0b5ca8'>" + c3 + "</small><hr/></div>";
                                    $("#pageSearchResults").append(searchResultDiv)
                                }
                            }
                        }
                    });

                    if (!hasMatchFound) {
                        $(divv).find('p').each(function () {
                            if (hasMatchFound)
                                return false;
                            else {
                                if ($(this).find('strong').find('a').length >= 1) {
                                    $(this).find('strong').find('a').each(function () {
                                        var elems = $(this).html();
                                        var isHasmatch = elems.match(regKeyword);
                                        if (isHasmatch) {
                                            hasMatchFound = true;

                                            var c3 = '...' + elems.replaceAll(isHasmatch[0], '<span style="background-color: #FFFF00">' + isHasmatch[0] + '</span>') + '...';
                                            var searchResultDiv = "<div class=\"mt-2 pageSearchResult\"><a href=" + pageHyperlink2 + "\><strong>" + acc_title + "</strong>&nbsp;<i class='fa fa-file-text f2' aria-hidden='true'></i><br/></a><small style='color: #0b5ca8'>" + c3 + "</small><hr/></div>";
                                            $("#pageSearchResults").append(searchResultDiv)
                                        }
                                    });
                                }
                                else if ($(this).find('ul').find('li').length >= 1) {
                                    // take all the elements under ul -> li -> a
                                    $(this).find('a').each(function () {
                                        if (hasMatchFound)
                                            return false;
                                        else {
                                            if ($(this).find('img').length < 1) {
                                                var isHasmatch = elems.match(regKeyword);
                                                if (isHasmatch) {
                                                    hasMatchFound = true;

                                                    var c3 = '...' + elems.replaceAll(isHasmatch[0], '<span style="background-color: #FFFF00">' + isHasmatch[0] + '</span>') + '...';
                                                    var searchResultDiv = "<div class=\"mt-2 pageSearchResult\"><a href=" + pageHyperlink2 + "\><strong>" + acc_title + "</strong>&nbsp;<i class='fa fa-file-text f2' aria-hidden='true'></i><br/></a><small style='color: #0b5ca8'>" + c3 + "</small><hr/></div>";
                                                    $("#pageSearchResults").append(searchResultDiv)
                                                }
                                            }
                                        }
                                    });
                                } else if($(this).find('a').length >= 1) {
                                    if (hasMatchFound)
                                        return false;
                                    else {
                                        if ($(this).find('img').length < 1) {
                                            $(this).find('a').each(function () {
                                                var elems = $(this).html();
                                                var isHasmatch = elems.match(regKeyword);
                                                if (isHasmatch) {
                                                    hasMatchFound = true;

                                                    var c3 = '...' + elems.replaceAll(isHasmatch[0], '<span style="background-color: #FFFF00">' + isHasmatch[0] + '</span>') + '...';
                                                    var searchResultDiv = "<div class=\"mt-2 pageSearchResult\"><a href=" + pageHyperlink2 + "\><strong>" + acc_title + "</strong>&nbsp;<i class='fa fa-file-text f2' aria-hidden='true'></i><br/></a><small style='color: #0b5ca8'>" + c3 + "</small><hr/></div>";
                                                    $("#pageSearchResults").append(searchResultDiv)
                                                }
                                            });                                            
                                        }
                                    }
                                }
                                else {
                                    if (!hasMatchFound) {
                                        var divv2 = document.createElement("div");
                                        divv2.innerHTML = $(this).text();

                                        if ($(divv2).find('img').length < 1 && $(divv2).find('a').length < 1) {
                                            var elems = $(divv2).html();
                                            var isHasmatch = elems.match(regKeyword);
                                            if (isHasmatch) {
                                                hasMatchFound = true;

                                                var indexOfMatch = elems.indexOf(isHasmatch[0]);

                                                // '<span style="background-color: #FFFF00">' + isHasmatch[0] + '</span>'

                                                var c3 = '...' + elems.substring(indexOfMatch - 10, indexOfMatch) + '<span style="background-color: #FFFF00">' + isHasmatch[0] + '</span>' + elems.substring(indexOfMatch + isHasmatch[0].length, indexOfMatch + isHasmatch[0].length + 10) + '...';
                                                var searchResultDiv = "<div class=\"mt-2 pageSearchResult\"><a href=" + pageHyperlink2 + "\><strong>" + acc_title + "</strong>&nbsp;<i class='fa fa-file-text f2' aria-hidden='true'></i><br/></a><small style='color: #0b5ca8'>" + c3 + "</small><hr/></div>";
                                                $("#pageSearchResults").append(searchResultDiv)
                                            }
                                        }                                        
                                    }                                    
                                }
                            }
                        });
                    }

                    if (!hasMatchFound) {
                        $(divv).find('ul').find('li').find('a').each(function () {
                            if (hasMatchFound)
                                return false;
                            else {
                                if ($(this).find('img').length < 1) {
                                    var elems = $(this).html();
                                    var isHasmatch = elems.match(regKeyword);
                                    if (isHasmatch) {
                                        hasMatchFound = true;

                                        var c3 = '...' + elems.replaceAll(isHasmatch[0], '<span style="background-color: #FFFF00">' + isHasmatch[0] + '</span>') + '...';
                                        var searchResultDiv = "<div class=\"mt-2 pageSearchResult\"><a href=" + pageHyperlink2 + "\><strong>" + acc_title + "</strong>&nbsp;<i class='fa fa-file-text f2' aria-hidden='true'></i><br/></a><small style='color: #0b5ca8'>" + c3 + "</small><hr/></div>";
                                        $("#pageSearchResults").append(searchResultDiv)
                                    }
                                }
                            }
                        });
                    }

                    if (!hasMatchFound) {
                        if (hasTitleHasKW && hasAccordionTitleMatchKW) {
                            var c3 = '...' + acc_split[0].replaceAll('\n', '') + '...';
                            var searchResultDiv = "<div class=\"mt-2 pageSearchResult\"><a href=" + pageHyperlink2 + "\><strong>" + acc_title + "</strong>&nbsp;<i class='fa fa-file-text f2' aria-hidden='true'></i><br/></a><small style='color: #0b5ca8'>" + c3 + "</small><hr/></div>";
                            $("#pageSearchResults").append(searchResultDiv)
                        }
                    }

                    /*
                    var isStringMatch = acc_content.match(regKeyword);
                    if (isStringMatch) {
                        var res1 = acc_content.indexOf(isStringMatch[0]);  // first letter uppercase

                        var res2 = acc_content.indexOf(str2);   // normal string kw

                        var new_content = "";
                        var new_content2 = "";

                        if (parseInt(res1) > parseInt(res2)) {
                            new_content = acc_content.slice(res1).replaceAll('\n', '');

                            if (parseInt(res1) < 50) {
                                let n1 = acc_content.substring(0, parseInt(res1));
                                let n2 = new_content.substring(kw_len, 50);
                                new_content2 = n1 + '<span style="background-color: #FFFF00">' + isStringMatch[0] + '</span>' + n2;
                            } else {

                                let n1 = acc_content.substring(parseInt(res1) - 49, parseInt(res1));
                                let n2 = new_content.substring(kw_len, 50);
                                new_content2 = n1 + '<span style="background-color: #FFFF00">' + isStringMatch[0] + '</span>' + n2;
                            }

                        } else {
                            new_content = acc_content.slice(res2).replaceAll('\n', '');;

                            if (parseInt(res2) < 50) {

                                let n1 = acc_content.substring(0, parseInt(res2));
                                let n2 = new_content.substring(kw_len, 50);
                                new_content2 = n1 + '<span style="background-color: #FFFF00">' + str2 + '</span>' + n2;
                            } else {

                                let n1 = acc_content.substring(parseInt(res2) - 49, parseInt(res2));
                                let n2 = new_content.substring(kw_len, 50);
                                new_content2 = n1 + '<span style="background-color: #FFFF00">' + str2 + '</span>' + n2;
                            }
                        }

                        var c3 = '...' + new_content2.replaceAll('<a href', '') + '...';
                        var pageHyperlink2 = pageHyperlink + "?kw=" + kw.toLowerCase().replaceAll(' ', '%20') + "&acc=" + i
                        var searchResultDiv = "<div class=\"mt-2 pageSearchResult\"><a href=" + pageHyperlink2 + "\><strong>" + acc_title + "</strong>&nbsp;<i class='fa fa-file-text f2' aria-hidden='true'></i><br/></a><small style='color: #0b5ca8'>" + c3 + "</small><hr/></div>";
                        $("#pageSearchResults").append(searchResultDiv)
                    } else if (hasTitleHasKW && hasAccordionTitleMatchKW) {
                        var c3 = '...' + acc_split[0].replaceAll('\n', '') + '...';
                        var pageHyperlink2 = pageHyperlink + "?kw=" + kw.toLowerCase().replaceAll(' ', '%20') + "&acc=" + i
                        var searchResultDiv = "<div class=\"mt-2 pageSearchResult\"><a href=" + pageHyperlink2 + "\><strong>" + acc_title + "</strong>&nbsp;<i class='fa fa-file-text f2' aria-hidden='true'></i><br/></a><small style='color: #0b5ca8'>" + c3 + "</small><hr/></div>";
                        $("#pageSearchResults").append(searchResultDiv)
                    }
                    */
                }
            }  // end splitcon for loop

            // this will only triggers if the page title match with the keyword but the content doesn't have any keyword matched.
            if (hasTitleHasKW && !hasFullContentHasKW) {
                var new_content = clean_co.replaceAll('\n', '').substring(0, 50);
                var c3 = '...' + new_content + '...';

                var pageHyperlink2 = pageHyperlink + "?kw=" + kw.toLowerCase().replaceAll(' ', '%20') + "&acc=0"
                var searchResultDiv = "<div class=\"mt-2 pageSearchResult\"><a href=" + pageHyperlink2 + "\><strong>" + acc_title + "</strong>&nbsp;<i class='fa fa-file-text f2' aria-hidden='true'></i><br/></a><small style='color: #0b5ca8'>" + c3 + "</small><hr/></div>";
                $("#pageSearchResults").append(searchResultDiv)
            }
        }
        else if (data.PageType === "ParentPages") {
            var pageHyperlink = appRoot + "Offices/" + data.PageId;
            pageHyperlink = pageHyperlink + "?kw=" + kw.toLowerCase().replaceAll(' ', '%20') + "&acc=0";

            var c3 = '...' + data.PageContent.substring(0, 50) + '...';
            var searchResultDiv = "<div class=\"mt-2 pageSearchResult\"><a target='_blank' href=" + pageHyperlink + "\><strong>" + acc_title + "</strong>&nbsp;<i class='fa fa-list-ul la7' aria-hidden='true'></i><br/></a><small style='color: #0b5ca8'>" + c3 + "</small><hr/></div>";
            $("#pageSearchResults").append(searchResultDiv)
        }
        else if (data.PageType === "ExtLinks") {
            var c3 = '...' + data.PageContent.substring(0, 50) + '...';
            var searchResultDiv = "<div class=\"mt-2 pageSearchResult\"><a target='_blank' href=" + data.PageContent + "\><strong>" + acc_title + "</strong>&nbsp;<i class='fa fa-link ln3' aria-hidden='true'></i><br/></a><small style='color: #0b5ca8'>" + c3 + "</small><hr/></div>";
            $("#pageSearchResults").append(searchResultDiv)
        }
        else if (data.PageType === "Pdfs") {
            var c3 = '...' + data.PageContent.substring(0, 50) + '...';
            var searchResultDiv = "<div class=\"mt-2 pageSearchResult\"><a target='_blank' href=" + data.PageContent + "\><strong>" + acc_title + "</strong>&nbsp;<i class='fa fa-file-pdf-o' aria-hidden='true'></i><br/></a><small style='color: #0b5ca8'>" + c3 + "</small><hr/></div>";
            $("#pageSearchResults").append(searchResultDiv)
        }
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