/*
 * eyeline
 * https://github.com/OpenBuildings/eyeline
 *
 * Copyright (c) 2013 Haralan Dobrev
 * Licensed under the GNU license.
 */

(function(window, $, undefined) {

	// Collection method.
	$.fn.eyeline = function() {
		return this.each(function(i) {
			// Do something awesome to each selected element.
			$(this).html('awesome' + i);
		});
	};

	// Static method.
	$.eyeline = function(options) {
		// Override default options with passed-in options.
		options = $.extend({}, $.eyeline.options, options);
		// Return something awesome.
		return 'awesome' + options.punctuation;
	};

	// Static method default options.
	$.eyeline.options = {
		punctuation: '.'
	};

	// Custom selector.
	$.expr[':'].eyeline = function(elem) {
		// Is this element awesome?
		return $(elem).text().indexOf('awesome') !== -1;
	};

}(window, window.jQuery));
