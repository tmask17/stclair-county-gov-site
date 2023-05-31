/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here.
	// For complete reference see:
	// https://ckeditor.com/docs/ckeditor4/latest/api/CKEDITOR_config.html

	// The toolbar groups arrangement, optimized for two toolbar rows.
	config.toolbarGroups = [
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'forms' },
		{ name: 'tools' },
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'others' },
		'/',
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'about' }
	];

	

	// Remove some buttons provided by the standard plugins, which are
	// not needed in the Standard(s) toolbar.
	config.removeButtons = 'Underline,Subscript,Superscript,Anchor,SpecialChar,Maximize,Strike,RemoveFormat,Outdent,Indent,Blockquote,Styles,About';

	// Set the most common block elements.
	config.format_tags = 'p;h1;h2;h3;pre';

	config.removeDialogTabs = 'link:Upload';
	// Simplify the dialog windows.
	//config.removeDialogTabs = 'image:advanced;link:advanced';

	config.extraPlugins = 'simplebutton';

	config.fullPage = true;

	config.allowedContent = true;
	
	config.removeDialogTabs = 'image:advanced;link:advanced,link:upload;image:Upload';
    
    config.syntaxhighlight_lang = 'csharp';
    config.syntaxhighlight_hideControls = true;
    config.languages = 'vi';
	config.filebrowserBrowseUrl = ROOT + 'Scripts/ckfinder/ckfinder.html';
	config.filebrowserImageBrowseUrl = ROOT + 'Scripts/ckfinder/ckfinder.html';
	//config.filebrowserImageBrowseUrl = ROOT + 'Scripts/ckfinder/ckfinder.html?Types=Images';
	//config.filebrowserFlashBrowseUrl = ROOT + 'Scripts/ckfinder/ckfinder.html?Types=Flash';
	//config.filebrowserUploadUrl = ROOT +  'Scripts/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=File';
	//config.filebrowserImageUploadUrl = ROOT + 'Scripts/Data';
	//config.filebrowserFlashUploadUrl = ROOT + 'Scripts/ckfinder/core/connector/aspx/connector.aspx?command=QuickUpload&type=Flash';
    //config.stylesSet = 'my_styles';
    
	CKFinder.setupCKEditor(null, ROOT + 'Scripts/ckfinder/');

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
