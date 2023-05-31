/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html
	
/*	config.toolbar = [
	{ name: 'document', groups: [ 'mode', 'document', 'doctools' ], items: [ 'Source'] },
	{ name: 'clipboard', groups: [ 'clipboard', 'undo' ], items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
	{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker' ], items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
	{ name: 'forms'},
	'/',
	{ name: 'basicstyles', groups: [ 'basicstyles' ], items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript'] },
	{ name: 'paragraph', groups: [ 'align'], items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock' ] },
	{ name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
	{ name: 'insert', items: [ 'Image', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
		'/',
	{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
	{ name: 'colors', items: [ 'TextColor', 'BGColor' ] },
	{ name: 'others', items: [ '-' ] },
	{ name: 'about'} 
];  
*/

	
	

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
	    '/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		'/',		
		{name: 'styles'},
		{ name: 'colors' },
		{ name: 'others' },
		{ name: 'about' }	
		
	];

	//{ name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	//config.removeButtons = 'Underline,Subscript,Superscript,Anchor,SpecialChar,Maximize,Strike,RemoveFormat,Outdent,Indent,Blockquote,About';
	config.removeButtons = 'About,Maximize,Blockquote,Format,Styles';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	config.removeDialogTabs = 'link:Upload';
	// Simplify the dialog windows.
	//config.removeDialogTabs = 'image:advanced;link:advanced';

	config.extraPlugins = 'simplebutton,font,justify,lineheight,indent,indentblock';
	
	

    config.line_height="18px;19px;20px;21px;22px;23px;24px;25px;26px;27px;28px;29px;30px;31px;32px;33px;34px;35px;36px;37px;38px;39px;40px;41px;42px;43px;44px;45px;46px;47px;48px;49px;50px" ;


	config.fullPage = true;

	config.allowedContent = true;
	
	config.removeDialogTabs = 'image:advanced;link:advanced,link:upload;image:Upload';
    
    config.syntaxhighlight_lang = 'csharp';
    config.syntaxhighlight_hideControls = true;
	config.languages = 'vi';
	var roxyFileman = ROOT + 'Scripts/fileman/index.html?integration=ckeditor';
	config.filebrowserBrowseUrl = roxyFileman;
														//ROOT + 'Scripts/ckfinder/ckfinder.html';
	config.filebrowserImageBrowseUrl = roxyFileman;  // ROOT + 'Scripts/ckfinder/ckfinder.html';
	//config.filebrowserImageBrowseUrl = ROOT + 'Scripts/ckfinder/ckfinder.html?Types=Images';
	//config.filebrowserFlashBrowseUrl = ROOT + 'Scripts/ckfinder/ckfinder.html?Types=Flash';
	//config.filebrowserUploadUrl = ROOT +  'Scripts/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=File';
	//config.filebrowserImageUploadUrl = ROOT + 'Scripts/Data';
	//config.filebrowserFlashUploadUrl = ROOT + 'Scripts/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Flash';
    //config.stylesSet = 'my_styles';
    
	//CKFinder.setupCKEditor(null, ROOT + 'Scripts/ckfinder/');

    config.format_p = { element: 'p', attributes: { 'class': 'editorParagraph' } };
    config.format_h1 = { element: 'h1', attributes: { 'class': 'editorHeader1' } };
    config.format_h2 = { element: 'h2', attributes: { 'class': 'editorHeader2' } };
    config.format_h3 = { element: 'h3', attributes: { 'class': 'editorHeader3' } };
    config.format_pre = { element: 'pre', attributes: { 'class': 'editorFormatted' } };
};

CKEDITOR.on('dialogDefinition', function (ev) {
	// Take the dialog name and its definition from the event data
	var dialogName = ev.data.name;
	var dialogDefinition = ev.data.definition;
	if (dialogName == 'image' || dialogName == 'link') {
		// Remove upload tab
		dialogDefinition.removeContents('Upload');
		dialogDefinition.removeContents('upload');
	}
});
