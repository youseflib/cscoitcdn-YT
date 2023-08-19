	/*  Wizard */

	var isRTL = false;

	$(window).on("load", function () {		
		

	
	});


	jQuery(function ($) {
		"use strict";
		// Chose here which method to send the email, available:
		// Simple phpmail text/plain > survey.php (default)
		// Phpmaimer text/html > phpmailer/survey_phpmailer.php
		// Phpmaimer text/html SMPT > phpmailer/survey_phpmailer_smpt.php
		// PHPmailer with html template > phpmailer/survey_phpmailer_template.php
		// PHPmailer with html template SMTP> phpmailer/survey_phpmailer_template_smtp.php

		
        if (jQuery('body').css('direction') === 'rtl') {
            isRTL = true;
		}
		

		$('form#wrapped').attr('action', '#');
		$("#wizard_container").wizard({
			stepsWrapper: "#wrapped",
			submit: ".submit",
			afterBackward: function (event, currentIndex, newIndex) { 				
				window.location.href = "#start";
				return true; },
			afterForward: function (event, currentIndex, newIndex) { 
				window.location.href = "#start";
				return true; },
			beforeSelect: function (event, state) {
				if ($('input#website').val().length != 0) {
					return false;
				}
				if (!state.isMovingForward)
					return true;
				var inputs = $(this).wizard('state').step.find(':input');
				return !inputs.length || !!inputs.valid();
			}
		}).validate({
			errorPlacement: function (error, element) {
				if (element.is(':radio') || element.is(':checkbox')) {
					error.insertBefore(element.next());
				} else {
					error.insertAfter(element);
				}
			}
		});
		//  progress bar
		$("#progressbar").progressbar();
		$("#wizard_container").wizard({
			afterSelect: function (event, state) {
				var HelpVar = $(".step.wizard-step.current").data("helpvariable");
				if (HelpVar!=="" && $("#HelpArea").length>0 )
				{
					var BlockSourceURL='AJAXFunctionCaller.asp?Function1=UpdateBlock&VariableName='+HelpVar+'&iLanguage=2&Namespace=170000';
					var BlockName="#HelpArea";
					var UpdateType = "Inside";
					var LoadingIndicator="";
					var CallBackFunction="initPage"
					UpdateBlock(BlockName, BlockSourceURL, UpdateType, LoadingIndicator, CallBackFunction)
					//$("#HelpArea").text(HelpVar);					

				}
				$("#progressbar").progressbar("value", state.percentComplete);
				$("#location").text("(" + state.stepsComplete + "/" + state.stepsPossible + ")");
			}
		});
		// Validate select
		$('#wrapped').validate({
			ignore: [],
			rules: {
				select: {
					required: true
				}
			},
			errorPlacement: function (error, element) {
				if (element.is('select:hidden')) {
					error.insertAfter(element.next('.nice-select'));
				} else {
					error.insertAfter(element);
				}
			}
		});
	
		
	
	});


	function initPage(){
		// Added by me 15-12-2020
		initSlimScroll('.scroller');
	}
	// Added by me 15-12-2020
	function initSlimScroll(el) {
		if (!jQuery().slimScroll) {	return;}

		jQuery(el).each(function() {
			if (jQuery(this).attr("data-initialized")) {return;}

			var height;

			if (jQuery(this).attr("data-height")) {
				height = jQuery(this).attr("data-height");
			} else {
				height = jQuery(this).css('height');
			}

			jQuery(this).slimScroll({
				allowPageScroll: true, // allow page scroll when the element scroll is ended
				size: '7px',
				color: (jQuery(this).attr("data-handle-color") ? jQuery(this).attr("data-handle-color") : '#bbb'),
				wrapperClass: (jQuery(this).attr("data-wrapper-class") ? jQuery(this).attr("data-wrapper-class") : 'slimScrollDiv'),
				railColor: (jQuery(this).attr("data-rail-color") ? jQuery(this).attr("data-rail-color") : '#eaeaea'),
				position: isRTL ? 'left' : 'right',                    
				alwaysVisible: (jQuery(this).attr("data-always-visible") == "1" ? true : false),
				railVisible: (jQuery(this).attr("data-rail-visible") == "1" ? true : false),
				disableFadeOut: true,
				height: 'auto' //height
			});

			jQuery(this).attr("data-initialized", "1");
		});
	}


// Summary 
function getVals(formControl, controlType) {
	switch (controlType) {

		case 'question_1':
			// Get the value for a radio
			var value = $(formControl).val();
			$("#question_1").text(value);
			break;

		case 'question_2':
			// Get name for set of checkboxes
			var checkboxName = $(formControl).attr('name');

			// Get all checked checkboxes
			var value = [];
			$("input[name*='" + checkboxName + "']").each(function () {
				// Get all checked checboxes in an array
				if (jQuery(this).is(":checked")) {
					value.push($(this).val());
				}
			});
			$("#question_2").text(value.join(", "));
			break;

		case 'question_3':
			// Get the value for a radio
			var value = $(formControl).val();
			$("#question_3").text(value);
			break;

		case 'additional_message':
			// Get the value for a textarea
			var value = $(formControl).val();
			$("#additional_message").text(value);
			break;
	}
}
