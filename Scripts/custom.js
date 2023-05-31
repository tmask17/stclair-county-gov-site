//$(document).ready(function () {
//$('#dtPagination').DataTable();
//$('.dataTables_length').addClass('bs-select');
//});

$(document).ready(function () {
    //$('.selectpicker').selectpicker({
    //   style: 'btn-info',
    //   size: 4
    //});
});

$(function () {
    var i = 1;
    var ri = "";

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    var icon = getUrlParameter('icon');
    var menuparent = getUrlParameter('menuparent');
    var menucollapse = getUrlParameter('menucollapse');
    var pageparent = getUrlParameter('pageparent');

    if (icon == 1) {
        $('.panel-link form').each(function () {
            if ($(this).hasClass('form-create-icon')) {
                $('#menuparent').val(menuparent);
                $(this).show();
            } else if ($(this).hasClass('form-edit-icon')) {
                $(this).show();
            } else {
                $(this).hide();
            }
        });
    }

    if (pageparent) {
        var id = pageparent;

        $('.page-item-content .sidenav-group .snav-item, .page-item-bcrumbs .bcrumbs .mparent').each(function () {
            if ($(this).attr('data-parentid')) {
                if ($(this).attr('data-parentid').length > 0) {
                    var parentId = $(this).data('parentid');
                    //console.log(parentId);
                    if (id != parentId) {
                        $(this).hide();
                    }
                }
            }
        });
    }

    if (menucollapse) {
        var mc = menucollapse.split('I');
        var im;
        $('#menucollapse').val(menucollapse);

        if ($('.panel-link .form-edit-icon .f-back').length == 1) {
            $('.panel-link .form-edit-icon .f-back').each(function () {
                var link = $(this).attr('href');
                $(this).attr('href', link + '?menucollapse=' + menucollapse);
            });
        }

        if ($('.panel-link .form-create-icon .f-back').length == 1) {
            $('.panel-link .form-create-icon .f-back').each(function () {
                var link = $(this).attr('href');
                $(this).attr('href', link + '?menucollapse=' + menucollapse);
            });
        }

        if ($('.panel-link .form-link-edit .f-back').length == 1) {
            $('.panel-link .form-link-edit .f-back').each(function () {
                var link = $(this).attr('href');
                $(this).attr('href', link + '?menucollapse=' + menucollapse);
            });
        }

        if ($('.panel-menugroup .form-delete .f-back').length == 1) {
            $('.panel-menugroup .form-delete .f-back').each(function () {
                var link = $(this).attr('href');
                $(this).attr('href', link + '?menucollapse=' + menucollapse);
            });
        }

        if ($('.form-modal-edit .f-back').length == 1) {
            $('.form-modal-edit .f-back').each(function () {
                var link = $(this).attr('href');
                $(this).attr('href', link + '?menucollapse=' + menucollapse);
            });
        }

        if ($('.form-page-edit .f-back').length == 1) {
            $('.form-page-edit .f-back').each(function () {
                var link = $(this).attr('href');
                $(this).attr('href', link + '?menucollapse=' + menucollapse);
            });
        }
        if ($('.form-pdf-edit .f-back').length == 1) {
            $('.form-pdf-edit .f-back').each(function () {
                var link = $(this).attr('href');
                $(this).attr('href', link + '?menucollapse=' + menucollapse);
            });
        }


        for (im = 0; im < mc.length; im++) {
            if (im == 0) {
                $('ul[data-parentid="' + mc[im] + '"] > .card-header .ai-expand').attr('aria-expanded', true);
                $('ul[data-parentid="' + mc[im] + '"] > .collapse-body').addClass('show');
                //console(mc[im]);
            } else {
                $('li[data-menuid="' + mc[im] + '"] > .card-header .ai-expand').attr('aria-expanded', true);
                $('li[data-menuid="' + mc[im] + '"] > .collapse-body').addClass('show');
            }
            //console.log(mc[im]);
        }
    }

    $('.form-modal-edit .hg-item, .form-modal-edit .pg-item, .form-modal-edit .fi-item').each(function () {
        if ($.trim($(this).html()) == '') {
            $(this).remove();
        }
    });

    $('.form-modal-edit #saveTitle').click(function () {
        var val = $('#modalTitle').val();

        $('#modalTitle').val(val);
        $('#ImgNull').val(5);
    });

    $('.page-item #CompanyLogo').each(function () {
        $(this).attr('href', '/');
    });

    $('.form-link-edit input[type="submit"], .form-page-edit input[type="submit"]').click(function (e) {
        var fileImg = $('#upload').get(0).files.length;

        if (fileImg == 1) {
            $('#ImgNull').val(1);
        }
    });

    $('.form-modal-edit input[type="submit"]').click(function () {
        $('.form-modal-edit input[name="LocationHours"]').each(function () {
            var val = $(this).val(), dataReplace = val.toString().replace(/\,/g, '&comma;');
            $(this).val(dataReplace);
        });

        $('.form-modal-edit input[name="Google"]').each(function () {
            var val = $(this).val(), dataReplace = val.toString().replace(/\width="600"/g, 'width="100%"').replace(/\height="450"/g, 'height="300"');
            $(this).val(dataReplace);
        });
    });

    $('.fi-data-img .fdi-remove').click(function () {
        $(this).parent().siblings('#upload').show();
        $(this).parent().remove();
        $('#ImgNull').val(2);
    });

    $('.btnAddSubPage').on('click', function () {   // $('.btnAddSubPage').click(function () {

        /*var menuId = $(this).data('menuid'), menucollapseid = $(this).data('menucollapseid'), modal = $(this).data('modalmenu'), qlsubhome = $(this).data('quicklinks');

        var get_h4_text = $(this).closest('ul').prev().find("h4").text();

        var get_pid = $(this).closest('ul').prev().closest('li').data('parentid');

        console.log(get_h4_text);
        console.log(get_pid);


        $('#AddSubMenuItem').find('.submenuid').val(menuId);
        $('#AddSubMenuItem').find('.submenuparent').val(menuId);
        $('#AddSubMenuItem').find('.menucollapseid').val(menucollapseid);
        $('#AddSubModalItemLocation').find('.submenuid').val(menuId);
        $('#AddSubModalItemLocation').find('.submenuparent').val(menuId);
        $('#AddSubModalItemLocation').find('.menucollapseid').val(menucollapseid);
        $('#AddSubModalItemContact').find('.submenuid').val(menuId);
        $('#AddSubModalItemContact').find('.submenuparent').val(menuId);
        $('#AddSubModalItemContact').find('.menucollapseid').val(menucollapseid);


        if (modal == 1) {
            $('#AddSubMenuItem .admin-bl-modal').show();
        } else {
            $('#AddSubMenuItem .admin-bl-modal').hide();
        }
        console.log("qlsubhome : " + qlsubhome);
        console.log("menuid : " + menuId);

        if ((menuId == 1) || (qlsubhome == 1 )) {
            $('#AddSubMenuItem .menu-quick-links').show();
            $('#AddSubMenuItem .menu-default').hide();
            $('#AddSubMenuItem .form-img').hide();
            $('#AddSubMenuItem .mq').hide();
        } else {
            $('#AddSubMenuItem .menu-quick-links').hide();
            $('#AddSubMenuItem .menu-default').show();
            $('#AddSubMenuItem .form-img').show();
            $('#AddSubMenuItem .mq').show();
        }
    
        if (get_pid == 2) {
            $('#AddSubMenuItem .sh').show();
        } else {
            $('#AddSubMenuItem .sh').hide();
        } */
        //$("#AddSubMenuItem").modal("show");

    });

    $('#addNewPDF').on('click', function () {
        //$('#AddNewPDF').appendTo("body").modal('show');
        $('#txtUploadFile').trigger('click');
    });

    $(document).on('change', '#txtUploadFile', function () {
        var path = $(this).data('path');
        var filename = $(this).val().split('\\').pop();
        if ($(this).val() !== "") {
            if ($("#PdfModel_ExLink").length) {
                $("#PdfModel_ExLink").val(path + filename);
            } else if ($("#ExLink").length) {
                $("#ExLink").val(path + filename);
            }
        } else {
            if ($("#PdfModel_ExLink").length) {
                $("#PdfModel_ExLink").val("");
            } else if ($("#ExLink").length) {
                $("#ExLink").val("");
            }
        }

    });

    $('#addNewPDFList').on('click', function () {
        $('#AddNewPDFList').appendTo("body").modal('show');
    });

    $('.btnSelectPDFLink').on('click', function () {
        var title = $(this).data('title');
        var link = $(this).data('link');

        if ($("#PdfModel_ExLink").length) {
            $("#PdfModel_Title").val(title);
            $("#PdfModel_ExLink").val(link);
            $("#PdfModel_Title").focus();
        } else if ($("#ExLink").length) {
            $("#Title").val(title);
            $("#ExLink").val(link);
            $("#Title").focus();
        }
        $('#AddNewPDFList').modal('toggle');
    });

    $("#createNewPDF").submit(function (e) {
        e.preventDefault();

        if ($("#createNewPDF input[name=Title]").val() === null || $("#createNewPDF input[name=Title]").val() === '') {
            alert('Please enter Title.');
        }
        else if ($("#createNewPDF input[id=uploadPdf]").val() === null || $("#createNewPDF input[id=uploadPdf]").val() === '') {
            alert('Please choose a file.');
        } else {
            var formData = new FormData(this);

            $.ajax({
                url: '/PDF/CreateViaAjax',
                type: 'POST',
                data: formData,
                success: function (data) {
                    if ($("#PdfModel_ExLink").length) {
                        $("#PdfModel_ExLink").val(data);
                        $("#PdfModel_Title").focus();
                    } else if ($("#ExLink").length) {
                        $("#ExLink").val(data);
                        $("#Title").focus();
                    }
                    $('#AddNewPDF').modal('toggle');
                    //console.log(data);
                },
                cache: false,
                contentType: false,
                processData: false
            });
        }

    });

    $('.btn-duplicate-time').click(function () {
        $(this).siblings('.hour-group').append('<div class="row hg hg-item"><div class="col-6 hg-day"><button type="button" class="btn btn-danger btn-sm btn-remove-time"><i class="fa fa-times"></i></button><input type="text" class="form-control" name="LocationHours" placeholder="Monday" /></div><div class="col-3 hg-time"><input type = "text" class= "form-control form-control-time" name = "LocationHours" placeholder = "8:00AM"/></div><div class="col-3 hg-time"><input type = "text" class= "form-control form-control-time" name = "LocationHours" placeholder = "7:00PM"/></div></div>');

        if ($(this).siblings('.hour-group').find('.hg-item').length >= 7) {
            $(this).hide();
        } else {
            $(this).show();
        }

        $('.btn-remove-time').click(function () {
            if ($(this).parents('.hour-group').find('.hg-item').length >= 8) {
                $(this).parents('.hour-group').siblings('.btn-duplicate-time').hide();
            } else {
                $(this).parents('.hour-group').siblings('.btn-duplicate-time').show();
            }

            $(this).parents('.hg-item').remove();
        });
    });

    $('.btn-remove-time').click(function () {
        if ($(this).parents('.hour-group').find('.hg-item').length >= 8) {
            $(this).parents('.hour-group').siblings('.btn-duplicate-time').hide();
        } else {
            $(this).parents('.hour-group').siblings('.btn-duplicate-time').show();
        }

        $(this).parents('.hg-item').remove();
    });

    $('.btn-duplicate-phone').click(function () {
        $(this).siblings('.phone-group').append('<div class="row pg pg-item"><div class="col-md-7 pg-number"><button type="button" class="btn btn-danger btn-sm btn-remove-phone"><i class="fa fa-times"></i></button><input type = "text" class= "form-control" name="ConcactPhone" placeholder = "000 000 0000" /></div ><div class="col-md-5 pg-dept"><input type="text" class="form-control" name="ConcactPhone" placeholder="e.g Front Desk" /></div></div>');

        if ($(this).siblings('.phone-group').find('.pg-item').length >= 4) {
            $(this).hide();
        } else {
            $(this).show();
        }

        $('.btn-remove-phone').click(function () {
            if ($(this).parents('.phone-group').find('.pg-item').length >= 5) {
                $(this).parents('.phone-group').siblings('.btn-duplicate-phone').hide();
            } else {
                $(this).parents('.phone-group').siblings('.btn-duplicate-phone').show();
            }

            $(this).parents('.pg-item').remove();
        });
    });

    $('.btn-duplicate-email').click(function () {
        $('.form-inputs').append('<div class="row fi fi-item"><div class="col-md-3 fii-action"><input class="enable" type="hidden" name="modalEmails" value="1"><button type="button" class="btn btn-success btn-sm btn-email-enable" data-val="1"> Enable <i class= "fa fa-check"></i></button><button type="button" class="btn btn-danger btn-sm btn-email-disable" data-val="0">Disable <i class="fa"></i></button><button type="button" class="btn btn-default btn-sm btn-remove-email"><i class="fa fa-trash-o"></i></button></div><div class="col-md-3 fii fii-label"><input type="text" class= "form-control" name="modalEmails" placeholder="Office Label" value="" /></div><div class="col-md-6 fii fii-input"><input type="text" class="form-control" name="modalEmails" placeholder="Email address" value="" /></div></div>');

        if ($('.form-group-email').find('.fi-item').length >= 6) {
            $(this).hide();
        } else {
            $(this).show();
        }

        $('.btn-remove-email').click(function () {
            $(this).parents('.fi-item').remove();

            if ($('.form-group-email').find('.fi-item').length >= 6) {
                $('.btn-duplicate-email').hide();
            } else {
                $('.btn-duplicate-email').show();
            }
        });

        $('.form-modal-edit .fii-action .btn-email-enable, .form-modal-edit .fii-action .btn-email-disable').click(function () {
            var dataVal = $(this).data('val');

            $(this).find('.fa').addClass('fa-check');
            $(this).siblings('button').find('.fa').removeClass('fa-check');

            if ($(this).siblings('.enable').attr('id') == "SystemEmailEnable") {
                $(this).siblings('.enable').val('sys_' + dataVal);
            } else {
                $(this).siblings('.enable').val(dataVal);
            }
        });
    });

    $('.btn-duplicate-email').each(function () {
        if ($('.form-group-email').find('.fi-item').length >= 6) {
            $(this).hide();
        } else {
            $(this).show();
        }
    });

    $('.btn-remove-email').click(function () {
        $(this).parents('.fi-item').remove();

        if ($('.form-group-email').find('.fi-item').length >= 6) {
            $('.btn-duplicate-email').hide();
        } else {
            $('.btn-duplicate-email').show();
        }
    });

    $('.form-modal-edit .fii-action .btn-email-enable, .form-modal-edit .fii-action .btn-email-disable').click(function () {
        var dataVal = $(this).data('val');

        $(this).find('.fa').addClass('fa-check');
        $(this).siblings('button').find('.fa').removeClass('fa-check');

        if ($(this).siblings('.enable').attr('id') == "SystemEmailEnable") {
            $(this).siblings('.enable').val('sys_' + dataVal);
        } else {
            $(this).siblings('.enable').val(dataVal);
        }
    });


    $('#ModalEmail .sys-email').each(function () {
        var ah = $(this).attr('href'), text = $(this).text(), href = ah.toString().replace('sys_', ''), txtval = text.toString().replace('sys_', '');

        $(this).attr('href', href);
        $(this).html(txtval);
    });

    $('#ModalEmail .company-system').each(function () {
        var text = $(this).text(), txtval = text.toString().replace('sys_', '');

        $(this).html(txtval);
    });

    $('#ModalEmail .dept-emails .row').each(function () {
        if ($.trim($(this).html()) == '') {
            $(this).remove();
        }
    });

    $('#ModalEmail .dept-emails p').each(function () {
        if ($.trim($(this).html()) == '') {
            $(this).parent().parent().remove();
        }
    });

    $('.btn-remove-phone').click(function () {
        if ($(this).parents('.phone-group').find('.pg-item').length >= 5) {
            $(this).parents('.phone-group').siblings('.btn-duplicate-phone').hide();
        } else {
            $(this).parents('.phone-group').siblings('.btn-duplicate-phone').show();
        }

        $(this).parents('.pg-item').remove();
    });

    $('.form-modal-edit').each(function () {
        var phoneLength = $(this).find('.pg-item').length, hourLength = $(this).find('.hg-item').length;

        if (phoneLength >= 4) {
            $('.btn-duplicate-phone').hide();
        }

        if (hourLength >= 7) {
            $('.btn-duplicate-time').hide();
        }
    });

    $('#AddSubMenuItem #SubContentPage input[type="submit"]').click(function () {
        $('input[name="subcontent"]').each(function () {
            var val = $(this).val(), dataReplace = val.toString().replace(/\,/g, '&comma;');
            $(this).val(dataReplace);
        });
    });

    $('.form-modal-edit input[name="modalEmails"]#SystemEmail').each(function () {
        var val = $(this).val(), dataReplace = val.toString().replace('sys_', '');
        $(this).val(dataReplace);
    });

    $('.form-modal-edit input[name="modalEmails"]#SystemEmailTitle, .form-modal-edit input[name="modalEmails"]#SystemEmailLink').each(function () {
        var val = $(this).val(), dataReplace = val.toString().replace('sys_', '');
        $(this).val(dataReplace);
        $(this).attr('data-val', dataReplace);
    });

    $('.form-modal-edit input[type="submit"]#saveEmails').click(function () {
        $('input[name="modalEmails"]').each(function () {
            var val = $(this).val(), dataReplace = val.toString().replace(/\,/g, '&comma;');
            $(this).val(dataReplace);
        });

        var valTitle = $('#SystemEmailTitle').data('val'), valLink = $('#SystemEmailLink').data('val'), valEn = $('#SystemEmailEnable').data('val');
        $('#SystemEmailTitle').val('sys_' + valTitle);
        $('#SystemEmailLink').val('sys_' + valLink);
        $('#SystemEmailEnable').val(valEn);
    });

    $('.form-modal-edit input[type="submit"]#saveSysEmail').click(function () {
        $('input[name="modalEmails"]:not(#SystemEmailTitle):not(#SystemEmailLink):not(#SystemEmailEnable)').each(function () {
            var val = $(this).data('val'), dataReplace = val.toString().replace(/\,/g, '&comma;');
            $(this).val(dataReplace);
        });

        var valTitle = $('#SystemEmailTitle').val(), valLink = $('#SystemEmailLink').val(), valEn = $('#SystemEmailEnable').val();
        $('#SystemEmailTitle').val('sys_' + valTitle);
        $('#SystemEmailLink').val('sys_' + valLink);
    });

    $('#AddSubModalItemLocation input[type="submit"]').click(function () {
        $('#AddSubModalItemLocation input[name="LocationHours"]').each(function () {
            var val = $(this).val(), dataReplace = val.toString().replace(/\,/g, '&comma;');
            $(this).val(dataReplace);
        });

        $('#AddSubModalItemLocation input[name="LocationGoogle"]').each(function () {
            var val = $(this).val(), dataReplace = val.toString().replace(/\width="600"/g, 'width="100%"').replace(/\height="450"/g, 'height="300"');
            $(this).val(dataReplace);
        });
    });

    $('#AddSubModalItemContact input[type="submit"]').click(function () {
        $('#AddSubModalItemContact input[name="LocationHours"], #AddSubModalItemContact input[name="ConcactPhone"]').each(function () {
            var val = $(this).val(), dataReplace = val.toString().replace(/\,/g, '&comma;');
            $(this).val(dataReplace);
        });
    });

    $('.form-menu-create .selectpicker').on('change', function () {
        var optVal = $(this).find("option:selected").text();

        $(this).parents('.form-menu-create').find('#Name').val(optVal);
    });

    //$('a[data-external="1"]').click(function (e) {
    //    var element = $(this);
    //    var wlocation = $(this).attr('href');
    //    e.preventDefault();


    //        $('#modalRedirect').each(function () {
    //            $(this).fadeIn("fast");
    //            $(this).toggleClass('show');
    //            $(this).attr('aria-hidden', false);
    //            $(this).attr('aria-modal', true);

    //            if (element.hasClass('pdf')) {

    //                var data = "id=" + $(this).val();
    //                var url = '@Url.Action("Qlink")';

    //                $.ajax({
    //                    type: 'GET',
    //                    url: url,
    //                    data: data,
    //                    success: function (data) {

    //        $('#modalRedirect').each(function () {
    //            $(this).fadeIn("fast");
    //            $(this).toggleClass('show');
    //            $(this).attr('aria-hidden', false);
    //            $(this).attr('aria-modal', true);

    //            if (element.hasClass('pdf')) {

    //                var data = "id=" + $(this).val();
    //                var url = '@Url.Action("Qlink")';

    //                $.ajax({
    //                    type: 'GET',
    //                    url: url,
    //                    data: data,
    //                    success: function (data) {


    //                    }
    //                });



    //            } else {
    //                $(this).find('#continue').attr('href', wlocation);
    //            }


    //        });
    //});

    $('.msi-align-value').each(function () {
        var AlignVal = $(this).val(), msiAlignId = $(this).siblings('.menu-settings-item-alignment').data('id');

        $(msiAlignId + ' .al-radio').each(function () {
            var InputVal = $(this).data('radio');

            if (AlignVal == InputVal) {
                $(this).addClass('al-radio-active');
            }
        });
    });

    $('.al-radio input[type="radio"]').click(function () {
        $(this).parent().siblings('.al-radio').removeClass('al-radio-active');
    });

    $('#modalRedirect .cancel').click(function () {      // clicking cancel button --roqz
        var modal = $(this).parents('#modalRedirect');

        $(modal).fadeOut();
        $(modal).toggleClass('show');
        $(modal).attr('aria-hidden', true);
        $(modal).attr('aria-modal', false);
    });

    $('#modalRedirect a#continue').click(function () {   // clicking continue button --roqz
        var modal = $(this).parents('#modalRedirect');

        $(modal).fadeOut();
        $(modal).toggleClass('show');
        $(modal).attr('aria-hidden', true);
        $(modal).attr('aria-modal', false);
    });



    $('.texteditor').each(function () {
        var textId = $(this).attr('id');
        CKEDITOR.replace(textId);
    });

    //$('.home-intro-group .btn-intro-submit').each(function (e) {
    //    $('#introInput, #introTextarea').each(function () {
    //        var val = $(this).val(), dataReplace = val.toString().replace(/\,/g, '&comma;');
    //        $(this).val(dataReplace);
    //    });
    //});

    $('.form-page-create input[type="submit"], .form-page-edit input[type="submit"]').click(function (e) {
        var textlimit = 100;

        $('.texteditor:not(#Maintext)').each(function () {
            var textEditorId = $(this).attr('id'), ckEditorData = CKEDITOR.instances[textEditorId].getData(),
                dataReplace = ckEditorData.toString().replace(/\,/g, '&comma;');
            CKEDITOR.instances[textEditorId].setData(dataReplace);
        });

        $('input[name="subcontent"]').each(function () {
            //   var val = $(this).val(), dataReplace = val.toString().replace(/\,/g, '&comma;');
            //  $(this).val(dataReplace);

            var subt = $(this).val();
            if ($.trim(subt) == '') {
                alert('One or more subtitle is blank!');
                event.preventDefault();
                //  return false;
            }

        });

        $('input[name="Summary"]').each(function () {
            if ($(this).val() != '') {
                $(this).val($(this).val().substring(0, textlimit));
            }
        });
    });

    $('.form-menu-create input[type="submit"]').click(function (e) {
        var textlimit = 100;

        $('.texteditor:not(#Maintext)').each(function () {
            var textEditorId = $(this).attr('id'), ckEditorData = CKEDITOR.instances[textEditorId].getData(),
                dataReplace = ckEditorData.toString().replace(/\,/g, '&comma;');
            CKEDITOR.instances[textEditorId].setData(dataReplace);
        });

        $('input[name="subcontent"]').each(function () {
            //   var val = $(this).val(), dataReplace = val.toString().replace(/\,/g, '&comma;');
            //  $(this).val(dataReplace);

            // var subt = $(this).val();
            // if ($.trim(subt) == '') {
            ////     alert('One or more subtitle is blank!');
            //     event.preventDefault();
            //     //  return false;
            // }

        });

        $('input[name="Summary"]').each(function () {
            if ($(this).val() != '') {
                $(this).val($(this).val().substring(0, textlimit));
            }
        });
    });


    $('.form-menu-create button[type="submit"]').click(function (e) {
        $('input[name="subcontent"], textarea[name="subcontent"]').each(function () {
            var val = $(this).val(), dataReplace = val.toString().replace(/\,/g, '&comma;');

            $(this).val(dataReplace);
        });
    });

    $('.form-menu-create').each(function (e) {
        $('input[name="subcontent"], textarea[name="subcontent"]').each(function () {
            var val = $(this).val(), dataReplace = val.toString().replace(/\&comma;/g, ',');

            $(this).val(dataReplace);
        });
    });

    $('#SubOptModalContent .btn-option-content').click(function () {
        var dataMenu = $(this).data('menutype');

        $('#ModalMenutype').val(dataMenu);
    });

    $('#SubOptModalContent input[type="submit"]').click(function (e) {
        var textlimit = 100;

        $('.texteditor:not(#Maintext)').each(function () {
            var textEditorId = $(this).attr('id'), ckEditorData = CKEDITOR.instances[textEditorId].getData(),
                dataReplace = ckEditorData.toString().replace(/\,/g, '&comma;');
            CKEDITOR.instances[textEditorId].setData(dataReplace);
        });

        $('input[name="ModalPanelContent"]').each(function () {
            var val = $(this).val(), dataReplace = val.toString().replace(/\,/g, '&comma;');

            $(this).val(dataReplace);
        });
    });

    $('#MainOptModalContent .btn-main-option-content').click(function () {
        var dataMenu = $(this).data('menutype');

        $('#MainModalMenuType').val(dataMenu);
    });

    $('#MainOptModalContent input[type="submit"]').click(function (e) {
        var textlimit = 100;

        $('.texteditor:not(#Maintext)').each(function () {
            var textEditorId = $(this).attr('id'), ckEditorData = CKEDITOR.instances[textEditorId].getData(),
                dataReplace = ckEditorData.toString().replace(/\,/g, '&comma;');
            CKEDITOR.instances[textEditorId].setData(dataReplace);
        });

        $('input[name="ModalPanelContent"]').each(function () {
            var val = $(this).val(), dataReplace = val.toString().replace(/\,/g, '&comma;');

            $(this).val(dataReplace);
        });
    });

    $('.form-page-edit input[name="subcontent"]').each(function () {
        var val = $(this).val(), dataReplace = val.toString().replace(/\&comma;/g, ',');

        $(this).val(dataReplace);
    });

    $('.page-accordion .card-header h4').each(function () {
        var text = $(this).html(), dataReplace = text.toString().replace(/\&amp;comma;/g, ','), dataAndReplace = text.toString().replace(/\&amp;/g, '&');

        $(this).text(dataReplace);
        $(this).text(dataAndReplace);
    });

    $('.temptext').each(function () {
        var ptext = $(this).text(), dataAndReplace = ptext.toString().replace(/\&comma;/g, ',');;
        $(this).siblings('.card-body').append(dataAndReplace);
        $(this).remove();
    });

    $('.page .btn-add-mtext').click(function () {
        $('.form-multipletext').slideToggle();
    });



    $('.datepicker').datepicker({
        format: 'dd-mm-yy'
    });

    $('.page .ai-expand').click(function () {
        $(this).parents('.actions').siblings('.add-dtls').slideToggle();
        $(this).parents('tr').siblings('tr').toggleClass('overlay');
    });

    $('.textcontent').each(function () {
        var plaintext = $(this).text();
        $('.page-plaintext').append(plaintext);
        $(this).remove();
    });



    $('.add-dtls').each(function () {
        var pr = $(this).parents('.page').width();

        $(this).css('width', pr + 'px');
    });

    $('.btn-duplicate').click(function () { // CKeditor-duplicate-contents        
        //   alert('xxxxxxxxxxx');
        //console.log('aaaaaaaaaaa');
        var btnx = '';

        var container = $(this).data('container');

        var xck = $('textarea[name="subcontent"]').length;

        //if ($(this).siblings(container).children('.fmi-sep:last-child').length == 1) {
        //    var dataLength = $(this).siblings(container).children('.fmi-sep:last-child').data('length');

        //    if (ri != "") {
        //        i = ri;
        //    } else {
        //        i = dataLength + 1;
        //    }
        //}
        //console.log('value of i: ' + xck);
        i = parseInt(xck);
        i++;

        btnx += "<div style='float: right;'>";
        btnx += "   <a class='float-right ai ai-expand btn btn-sm  btn-primary' data-toggle='collapse' data-target='#xdv-child-" + i + "' aria-expanded='true' aria-controls='InterThoughts-9933'>";
        btnx += "       <i class='fa fa-list-ul' aria-hidden='true'></i>";
        btnx += "   </a>";
        btnx += "</div>";

        $(container).append('<li class="exd-' + i + ' ui-sortable-handle card"><div class="card-header"><strong>&nbsp;&nbsp;</strong> ' + btnx + '</div>      <div id="xdv-child-' + i + '" class="fmi fmi-sep fmi-sep-content collapse-body collapse show">              <div id="fmi-' + i + '" class="fm-item" data-fmitem="' + i + '"><input data-subid="' + i + '" type="text" name="subcontent" class="form-control fmi fmi-title" placeholder="Add Subtitle" required /><textarea id="textEditor' + i + '" class="form-control texteditor fmi fmi-content" name="subcontent" data-conid="' + i + '" row="4" placeholder="Add Subcontent"></textarea><p class="text-right" style="margin:0; margin-top: 10px;"><span class="btn btn-sm btn-danger btn-remove-fmi" data-remove="' + i + '">Remove</span></p></div>      </div>     </li>');

        CKEDITOR.replace('textEditor' + i);

        $('.btn-remove-fmi').click(function () {
            //  $(this).parents('.fm-item').remove();

            let text = "Are you sure?";
            if (confirm(text) == true) {
                //text = "You pressed OK!";
                var mid = $(this).data('remove');
                $('li.exd-' + mid).remove();
            } else {
                //text = "You canceled!";
            }
        });

        $('.pmgE').sortable("disable");
    });

    $('#modalDuplicate').click(function () {
        var container = $(this).data('container');

        if ($(this).siblings(container).children('.fmi-sep:last-child').length == 1) {
            var dataLength = $(this).siblings(container).children('.fmi-sep:last-child').data('length');

            if (ri != "") {
                i = ri;
            } else {
                i = dataLength;
            }
        }

        i++;
        $(container).append('<div id="fmi-' + i + '" class="fm-item" data-fmitem="' + i + '"><input data-subid="' + i + '" type="text" name="ModalPanelContent" class="form-control fmi fmi-title" placeholder="Add Subtitle"/><textarea id="textEditorModal' + i + '" class="form-control texteditor fmi fmi-content" name="ModalPanelContent" data-conid="' + i + '" row="3" placeholder="Add Subcontent"></textarea><p class="text-right" style="margin:0; margin-top: 10px;"><span class="btn btn-sm btn-danger btn-remove-fmi">Remove</span></p></div>');
        CKEDITOR.replace('textEditorModal' + i);

        $('.btn-remove-fmi').click(function () {

            let text = "Are you sure?";
            if (confirm(text) == true) {
                //text = "You pressed OK!";
                $(this).parents('.fm-item').remove();
            } else {
                //text = "You canceled!";
            }

        });
    });

    $('#MainModalDuplicate').click(function () {
        var container = $(this).data('container');

        //console.log('test');

        if ($(this).siblings(container).children('.fmi-sep:last-child').length == 1) {
            var dataLength = $(this).siblings(container).children('.fmi-sep:last-child').data('length');

            if (ri != "") {
                i = ri;
            } else {
                i = dataLength;
            }
        }

        i++;
        $(container).append('<div id="fmi-' + i + '" class="fm-item" data-fmitem="' + i + '"><input data-subid="' + i + '" type="text" name="ModalPanelContent" class="form-control fmi fmi-title" placeholder="Add Subtitle"/><textarea id="textEditorModalMain' + i + '" class="form-control texteditor fmi fmi-content" name="ModalPanelContent" data-conid="' + i + '" row="3" placeholder="Add Subcontent"></textarea><p class="text-right" style="margin:0; margin-top: 10px;"><span class="btn btn-sm btn-danger btn-remove-fmi"  data-remove=' + i + '>Remove</span></p></div>');
        CKEDITOR.replace('textEditorModalMain' + i);

        $('.btn-remove-fmi').click(function () {
            // $(this).parents('.fm-item').remove();
        });
    });


    $('.btn-remove-fmi').click(function () {
        // $(this).parents('.fm-item').remove();

        let text = "Are you sure?";
        if (confirm(text) == true) {
            //text = "You pressed OK!";
            var mid = $(this).data('remove');
            $('li.exd-' + mid).remove();
        } else {
            //text = "You canceled!";
        }

    });


    $('.btn-remove-fmisep').click(function () {
        if ($('.container').children('.fmi-sep:last-child').length == 1) {
            var dataLength = $('.container').children('.fmi-sep:last-child').data('length');
            ri = dataLength;
        }
        var dataItem = $(this).data('remove');

        $(this).parents('.fmi').siblings('.fmi[data-item="' + dataItem + '"]').remove();
        $(this).parents('.fmi').remove();
    });

    //--- Start Button Toggle Class
    $('.btn-toggle').click(function () {
        var target = $(this).data('target'), toggleClass = $(this).data('toggle');
        $(target).toggleClass(toggleClass);
    });

    $('.btn.collapse-hidden').click(function () {
        var parentId = $(this).data('parentid'), toggleId = $(this).data('target');
        $(toggleId).attr('data-content', '1');
        $(parentId).attr('data-content', '0');
        $(parentId).slideToggle();
        $(toggleId).slideToggle();
    });
    $('.block.collapse-slide').click(function () {
        var parentId = $(this).data('parentid'), toggleId = $(this).data('toggleblock'), target = $(this).data('target');

        //console.log('parentId:' + parentId);

        if ($(this).hasClass('btn')) {
            $(parentId).toggleClass('show');
            $(toggleId).slideToggle();
            $('.admin-bl').attr('aria-expanded', 'false');
        } else {
            $(parentId).slideToggle();
        }

        if (target == '#SubContentPage') {
            $(this).parents('.modal-create-content').addClass('modal-page');
        } else {
            $(this).parents('.modal-create-content').removeClass('modal-page');
        }
    });

    //--- End Button Toggle Class

    //--- Start Background Image Block
    $('.bg-img').each(function () {
        if ($(this).hasClass('bg-modal')) {
            var target = $(this).data('imgtarget'), imgsrc = $(this).find(target).attr('src');
        }
        else {
            var target = $(this).data('target'), imgsrc = $(this).find(target).attr('src');
        }

        $(this).attr('style', 'background-image: url(' + imgsrc + ')');
        //   $('header').attr('style', 'background: url(' + imgsrc + ') center / cover no-repeat');
    });
    //--- End Background Image Block

    $('.page-content-main .card-body a').click(function (e) {
        var loc = $(this).attr('href'), locSplit = loc.split('/'), pageUrl = window.location;

        // if (locSplit[2] != pageUrl['host']) {
        // adjust for sir alistair API tabs   #nav-home,#nav-profile,#nav-contact

        /*  if ((locSplit[2] != pageUrl['host']) || (loc != '#nav-home') || (loc != '#nav-profile') || (loc != '#nav-contact')) {
              e.preventDefault();
  
              $('#modalRedirect').each(function () {
                  $(this).fadeIn("fast");
                  $(this).toggleClass('show');
                  $(this).attr('aria-hidden', false);
                  $(this).attr('aria-modal', true);
                  $(this).find('#continue').attr('target', '_blank');
                  $(this).find('#continue').attr('href', loc);
              });
          } */

        var str2021 = locSplit[2];   //november 1, 2021

        if (str2021.indexOf("stclaircounty.org") >= 0) {
            //e.preventDefault();			  
            //console.log("yes");

        } else {
            e.preventDefault();
            //console.log("no");

            $('#modalRedirect').each(function () {
                $(this).fadeIn("fast");
                $(this).toggleClass('show');
                $(this).attr('aria-hidden', false);
                $(this).attr('aria-modal', true);
                $(this).find('#continue').attr('target', '_blank');
                $(this).find('#continue').attr('href', loc);
            });
        }
    });

    //$('a[data-external="1"]').click(function (e) {   // $('.page-content-sidenav .pages-sidenav-nav a').click(function (e) {
    //    var element = $(this);
    //    var wlocation = $(this).attr('href');
    //    e.preventDefault();

    $('.page-content-sidenav .pages-sidenav-nav a').click(function (e) {            //
        //if (this.hasAttribute('data-external')) {
        //    console.log('has specs');
        //} else {
        //    console.log('no specs');
        //}
    });

    //alistair breadd crumbs 5th level error
    $('.bmenus').click(function (e) {

        e.preventDefault();

        const href = $(this).attr('href');
        //console.log(href);

        try {

            if (href == 'undefined' || undefined) {
                //console.log('empty href');
                return;
            }
            //console.log('******** 5th level *************');

            if (href == '/departments') {
                $('.modal-departments22').modal('show');

                return;
            }

            if (href == '/pagebuilder_scc_web/') {
                $('.modal-departments22').modal('show');
                return;
            }

            if (href == '/pagebuilder_dev_1.1/') {
                $('.modal-departments22').modal('show');
                return;
            }


            if (href == '/scc_web/') {
                window.location.href = href;
                return;
            }

            if (href == '/sccweb/') {
                window.location.href = href;
                return;
            }

            if (href == '/pagebuilder_scc_web2/') {
                window.location.href = href;
                return;
            }

        }
        catch (e) {
            console.log(e);
        }

        window.location.href = href;
        return;
    });

    //alistair
    /* $('.snav-items a').click(function (e) {
         e.preventDefault();
       
         console.log($(this).attr('href'));
        
         let executed = false;
         if ($(this).attr('href') == 'http://52.144.45.68/scc_web') {
             executed = true;
             $('.modal-departments').modal('show');
             return;
         }
 
 
     
         let hostname = window.location.hostname;
         if ($(this).attr('href').indexOf(hostname) > -1) {
             executed = true;
             window.location.href = $(this).attr('href');
             return;
         }
 
         if ($(this).attr('href').substr(0, 1) == '/') {
             executed = true;
             window.location.href = $(this).attr('href');
             return;
         }
 
         if (!executed) {
             window.location.href = $(this).attr('href');
             return;
         }
 
     }); */

    //sidenav modal fix
    $('.snav-itemx a').click(function (e) {
        e.preventDefault();
        //alert('hello world');
        //alert(window.location.hostname);

        //   let { hostname } = window.location;
        let hostname = window.location.hostname;
        if ($(this).attr('href').indexOf(hostname) > -1) {
            window.location.href = $(this).attr('href');
        }

        if ($(this).attr('href').substr(0, 1) == '/') {
            window.location.href = $(this).attr('href');
        }

    });

    //fixed pagebuilder_scc_web main display issue with pagebuilder v1.1 codes
    $('.mainbody').css("display", "block");

    var xxxy = $('textarea[name="subcontent1"]').length;
    //  alert(xxxy);

    //if (xxxy < 5) {
    //    $('.btn-addtext-ani').prop('disabled', false);
    //} else {
    //    $('.btn-addtext-ani').prop('disabled', true);
    //}
    // add text intro animation details

    $('.btn-addtext-ani').click(function () {
        var id_attr;

        if ($('#div_0').length)         // use this if you are using id to check
        {
            alert('You still have unsave inputs');
        } else {
            // get the hidden counter
            var anicount = parseInt($('input[name=anicount_' + $(this).attr("id") + ']').val());
            if (anicount < 5) {
                anicount = anicount + 1;
                $('input[name=anicount_' + $(this).attr("id") + ']').val(anicount);

                var ani = "";
                ani += '<div class="col-sm-12" id="div_ani_0">';
                ani += '<div class="row form-group"> <label class="col-2"> Title </label> <div class="col-10"> <input id="introInput_0" type="text" class="form-control fmi fmi-title" name="subcontent3" placeholder="Max 80 characters" required> </div> </div>';
                ani += '<div class="row form-group"><label class="col-2">Text</label> <div class="col-10">';
                ani += '<textarea id="introTextarea_0" class="form-control fmi fmi-content" name="subcontent1" data-conid="1" rows="4" placeholder="Max 300 characters" maxlength="300"></textarea></div> </div>';
                ani += '<div class="row form-group" style="margin-top:10px"> <label class="col-2"> Text URL </label> <div class="col-10"> <input id="introURL_0" type="text" class="form-control fmi fmi-title" name="subcontent" placeholder="Max 80 characters"> </div> </div>';
                ani += '<div class="row form-group" style="margin-top:-10px"><div class="col-6"></div>';
                ani += '<div class="col-6" style="text-align:right;z-index:10">';
                ani += '<button id="removeani_0_' + $(this).attr("id") + '" class="btn btn-warning btn-sm btn-ani-remove" style="margin-right: 5px;"><i class="fa fa-trash" aria-hidden="true"></i> Delete </button>';
                ani += '<button id="ani_0" class="btn btn-success btn-sm btn-ani-submit"><i class="fa fa-floppy-o" aria-hidden="true"></i> Update </button>';
                ani += '</div ></div></div>';

                $(ani).appendTo('#text-animation');

                //if ($(this).attr("id")) {
                //    id_attr = $(this).attr("id");
                //    $(ani).appendTo('#text-animation-' + id_attr);
                //}
                //else {
                //    $(ani).appendTo('#text-animation');
                //}

                if (anicount == 5)
                    $(this).prop('disabled', true);
            } else {
                $(this).prop('disabled', true);
            }

        }

    });

    $('.btn-addtext-ani-sub').click(function () {
        if ($('#div_0').length)         // use this if you are using id to check
        {
            alert('You still have unsave inputs');
        } else {
            var anicount = parseInt($('input[name=anicount_' + $(this).attr("id") + ']').val());
            if (anicount < 5) {
                anicount = anicount + 1;
                $('input[name=anicount_' + $(this).attr("id") + ']').val(anicount);

                var ani = "";
                ani += '<div class="col-sm-12" id="div_ani_0">';
                ani += '<div class="row form-group"> <label class="col-2"> Title </label> <div class="col-10"> <input id="introInput_0" type="text" class="form-control fmi fmi-title" name="subcontent3" placeholder="Max 80 characters" required> </div> </div>';
                ani += '<div class="row form-group"><label class="col-2">Text</label> <div class="col-10">';
                ani += '<textarea id="introTextarea_0" class="form-control fmi fmi-content" name="subcontent1" data-conid="1" rows="4" placeholder="Max 300 characters" maxlength="300"></textarea></div> </div>';
                ani += '<div class="row form-group" style="margin-top:10px"> <label class="col-2"> Text URL </label> <div class="col-10"> <input id="introURL_0" type="text" class="form-control fmi fmi-title" name="subcontent" placeholder="Max 80 characters"> </div> </div>';
                ani += '<div class="row form-group" style="margin-top:-10px"><div class="col-6"></div>';
                ani += '<div class="col-6" style="text-align:right;z-index:10">';
                ani += '<button id="removeani_0_' + $(this).attr("id") + '" class="btn btn-warning btn-sm btn-ani-remove" style="margin-right: 5px;"><i class="fa fa-trash" aria-hidden="true"></i> Delete </button>';
                ani += '<button id="ani_0_' + $(this).attr("id") + '" class="btn btn-success btn-sm btn-ani-submit-sub"><i class="fa fa-floppy-o" aria-hidden="true"></i> Update </button>';
                ani += '</div ></div></div>';

                $(ani).appendTo('#text-animation-' + $(this).attr("id"));

                if (anicount == 5)
                    $(this).prop('disabled', true);
            } else {

            }
        }
    });
    // Handling for quicklinks button

    $("#quickLinksButton").click(function () {
        var sidebarNav = $(this).closest("nav");
        if (sidebarNav.hasClass("expanded")) {
            $("#searchForPageButton").hide();
        } else {
            $("#searchForPageButton").show();
        }
    });
    handleInternetExplorerUi();
    //handleSearchButtonDisplaying();
});


$('body').on('click', '.btn-hpi-submit', function (e) {
    //e.preventDefault();

    var id = $(this).attr('id');
    var splitId = id.split('_');

    var textArea = $('#childAcc-' + splitId[1] + ' textarea[id*="introTextarea"] ').val();
    if (textArea !== undefined) {
        if (textArea == '') {
            alert('Please fill up the input[Text] or click remove if not needed.');
            return false;
        } else
            return true;
    } else {
        textArea = $('#subChildAcc-' + splitId[1] + ' textarea[id*="introTextarea"] ').val();
        if (textArea !== undefined) {
            if (textArea == '') {
                alert('Please fill up the input[Text] or click remove if not needed.');
                return false;
            } else
                return true;
        } else {
            textArea = $('#subSubChildAcc-' + splitId[1] + ' textarea[id*="introTextarea"] ').val();
            if (textArea == '') {
                alert('Please fill up the input[Text] or click remove if not needed.');
                return false;
            } else
                return true;
        }
    }
});

$('body').on('click', '.btn-ani-submit', function () {
    var el = $(this).attr('id');
    var idx = el.split('_');
    var a = encodeURIComponent($('#introInput_' + idx[1]).val());
    var b = encodeURIComponent($('#introTextarea_' + idx[1]).val());
    var c = encodeURIComponent($('#introURL_' + idx[1]).val());

    /*if (($.trim(a) == '') || ($.trim(b) == '')) {*/
    if ($.trim(b) == '') {
        alert('Please fill up the input[Text] or click remove if not needed.');
    } else {  // save data - ajax post and return id and replace id
        var data = "a=" + a + "&b=" + b + "&c=" + c;
        var url = ROOT + 'Menugroups/SaveAni';

        $.ajax({
            type: 'POST',
            url: url,
            contentType: "application/x-www-form-urlencoded",
            data: data,
            success: function (data2) {
                alert('Saved');  // replace id
                $('#introInput_0').prop('id', 'introInput_' + data2);
                $('#introTextarea_0').prop('id', 'introTextarea_' + data2);
                $('#introURL_0').prop('id', 'introURL_' + data2);
                $('#div_ani_0').prop('id', 'div_ani_' + data2);
                $('#ani_0').prop('id', 'ani_' + data2);
                $('#removeani_0').prop('id', 'removeani_' + data2);
                $('#ani_' + data2).removeClass('btn-ani-submit');
                $('#ani_' + data2).addClass('btn-ani-update');
            }
        });
    }
});

$('body').on('click', '.btn-ani-submit-sub', function () {
    var el = $(this).attr('id');
    var idx = el.split('_');
    var a = encodeURIComponent($('#introInput_' + idx[1]).val());
    var b = encodeURIComponent($('#introTextarea_' + idx[1]).val());
    var c = encodeURIComponent($('#introURL_' + idx[1]).val());

    /*if (($.trim(a) == '') || ($.trim(b) == '')) {*/
    if ($.trim(b) == '') {
        alert('Please fill up the input[Text] or click remove if not needed.');
    } else {  // save data - ajax post and return id and replace id
        var data = "a=" + a + "&b=" + b + "&c=" + c + "&mgid=" + idx[2];
        var url = ROOT + 'Menugroups/SaveAniSubPage';

        $.ajax({
            type: 'POST',
            url: url,
            contentType: "application/x-www-form-urlencoded",
            data: data,
            success: function (data2) {
                alert('Saved');  // replace id
                $('#introInput_0').prop('id', 'introInput_' + data2);
                $('#introTextarea_0').prop('id', 'introTextarea_' + data2);
                $('#introURL_0').prop('id', 'introURL_' + data2);
                $('#div_ani_0').prop('id', 'div_ani_' + data2);
                $('#removeani_0_' + idx[2]).prop('id', 'removeani_' + data2 + '_' + idx[2]);
                $('#ani_0_' + idx[2]).prop('id', 'ani_' + data2);
                $('#ani_' + data2).removeClass('btn-ani-submit-sub');
                $('#ani_' + data2).addClass('btn-ani-update');
            }
        });
    }
});


$('body').on('click', '.btn-ani-update', function () {
    var el = $(this).attr('id');
    var idx = el.split('_');
    var a = encodeURIComponent($('#introInput_' + idx[1]).val());
    var b = encodeURIComponent($('#introTextarea_' + idx[1]).val());
    var c = encodeURIComponent($('#introURL_' + idx[1]).val());
    // check if there are blank inputs

    if ($.trim(b) == '') {
        alert('Please fill up the input[Text] or click remove if not needed.');
    } else {  // save data - ajax post and return id and replace id
        var data = "a=" + a + "&b=" + b + "&id=" + idx[1] + "&c=" + c;

        var url = ROOT + 'Menugroups/UpdateTextAni';
        //console.log(url);
        $.ajax({
            type: 'POST',
            url: url,
            contentType: "application/x-www-form-urlencoded",
            data: data,
            success: function (data2) {
                alert('Saved');  // replace id
            }
        });
    }
});

// remove animation text
$('body').on('click', '.btn-ani-remove', function () {

    var el = $(this).attr('id');
    var idx = el.split('_');
    var data = 'id=' + idx[1];
    var url = ROOT + 'Menugroups/TrashAni';

    console.log(idx);

    if (idx[1] != "0") {
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            success: function (data2) {
                $('.btn-addtext-ani').prop('disabled', false);
                $('#div_ani_' + idx[1]).remove();
                alert('removed');
            }
        });
    } else {
        $('#div_ani_' + idx[1]).remove();
        alert('removed');
    }

    var anicount = parseInt($('input[name=anicount_' + idx[2] + ']').val());
    $('input[name=anicount_' + idx[2] + ']').val(anicount - 1);
    $('#' + idx[2]).prop('disabled', false);
});


$('body').on('change', '#anisec', function (e) {   //$('body').on('click', '#anisecsubmit', function () {
    var tim = $(this).val();
    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#er1").html("Digits Only").show().fadeOut("slow");
        return false;
    }

    if (parseInt(tim) < 3) {
        $(this).val("3");
        alert('The minimum value is 3 seconds');
    }
    else {
        var data = 'id=' + tim;
        var url = ROOT + 'Menugroups/UpdateAni';
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            success: function (data2) {
                //  alert('Data was saved');
            }
        });
    }

});

//fadesec
$('body').on('change', '#fadesec', function (e) {  //$('body').on('click', '#fadesecsubmit', function () {
    var tim = $(this).val();

    if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#er1").html("Digits Only").show().fadeOut("slow");
        return false;
    }

    if (parseInt(tim) < 1) {
        $(this).val("1");
        alert('The minimum value is 1 second');

    }
    else {
        var data = 'id=' + tim;
        var url = ROOT + 'Menugroups/UpdateFadeSec';
        //console.log(url);
        //console.log(data);
        $.ajax({
            type: 'POST',
            url: url,
            data: data,
            success: function (data2) {
                //  alert('Data was saved');
            }
        });
    }
});

// update all meta keywords all pages
$('body').on('click', '#btnmeta', function () {

    var a = $('#mkey').val();
    var b = $('#mdes').val();

    var data = 'a=' + a + '&b=' + b;
    var url = ROOT + 'Menugroups/UpdateAllMeta';
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        success: function (data2) {
            alert('Meta Keywords and Description is now updated!')
        }
    });


});


// IE UI fixes
function handleInternetExplorerUi() {
    var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
    if (isIE11) {
        // fix exit modal size
        $("#modalRedirect .modal-header").addClass("ie-exit-modal-header");

        // Add flex-basis attributes to divs with Id that start with "LocationTab"
        $("#ModalLocation [id^='LocationTab']").each(function () {
            var locationTab = $(this);
            locationTab.addClass("ie-flex-basis");
        });
        // Add flex-basis to search buttons
        $("#ModalContact [id^='ContactTab']").each(function () {
            var locationTab = $(this);
            locationTab.addClass("ie-flex-basis");
        });
    }
}

//page accordion code
$('body').on('click', '.page-accordion .card-header', function () {
    var el = $(this).attr('id');
    //console.log(el);

    if ($('#' + el + ' span i').hasClass('fa-chevron-circle-down')) {
        $('#' + el + ' span i').removeClass('fa-chevron-circle-down')
    } else {
        $('#' + el + ' span i').addClass('fa-chevron-circle-down')
    }
});

//$('.page-accordion .card-header h4').each(function () {  //fa-chevron-circle-down
// new code for disabling drag and drop for accordion
/*
function chk2()
        {
    	
         var exp=0;
        $('a.ai-expand ').each(function(i, obj) {
                    console.log($(this).attr('aria-expanded'));
                    if  ($(this).attr('aria-expanded') == "true")
                    {
                        exp++;
                    }
            });
            console.log("exp: " + exp);
         
         if (exp > 0)
         {
                  console.log("disable drag1");
        	
            $( "#sortable" ).sortable({
              disabled: true
            });
        	
        	
             
         }else{
             $("#sortable" ).sortable({
              disabled: false
            });
        	
                     console.log("enable drag1");
             
         }
    	
        //return  
        }
*/

$(function () {
    if (window.location.href.indexOf("Pages") > -1) {
        // alert("Alert: Pages!");

        var open_accord = 0;
        $('.pmg-accordion').on('shown.bs.collapse', function () {
            open_accord++;
            //console.log("Opened-");
            //console.log("open_accord:" + open_accord);
            // chk2();
            $('.pmgE').sortable("disable");

            for (instance in CKEDITOR.instances) { CKEDITOR.instances[instance].updateElement(); }
        });

        $('.pmg-accordion').on('hidden.bs.collapse', function () {
            open_accord--;
            //console.log("Closed-");
            //console.log("open_accord:" + open_accord);
            // chk2();
            $('.pmgE').sortable("enable");

            for (instance in CKEDITOR.instances) { CKEDITOR.instances[instance].updateElement(); }
        });

        $('.pmg-accordion').on('dragstart drop', function (e) {
            console.log("drop");
            e.preventDefault();
            //return false;

            for (instance in CKEDITOR.instances) { CKEDITOR.instances[instance].updateElement(); }
        });

        $('.pmg-accordion').on('mousedown', function (e) {
            console.log("mousedown open_accord:" + open_accord);

            // e.preventDefault();

            for (instance in CKEDITOR.instances) { CKEDITOR.instances[instance].updateElement(); }
        });
    }

    // ckeditor code by roqz feb-16-2022

});

