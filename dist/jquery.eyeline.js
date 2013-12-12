/*! Eyeline - v0.1.0 - 2013-12-12
* https://github.com/OpenBuildings/eyeline
* Copyright (c) 2013 Haralan Dobrev; Licensed GNU */
(function( window, document, $, undefined ) {

// Constants
var NAMESPACE = '.eyeline',
	EVENTS = {
		view: 'view' + NAMESPACE,
		viewTop: 'viewTop' + NAMESPACE,
		viewBottom: 'viewBottom' + NAMESPACE
	};

function isViewable ($element) {
	var docViewTop = $(window).scrollTop(),
		docViewBottom = docViewTop + $(window).height(),
		atBottom = false,
		bottomOffset = $element.offset().top;

	if ( bottomOffset ) {
		atBottom = (bottomOffset <= docViewBottom) &&
			(bottomOffset >= docViewTop);
	}

	var elemTop = $element.offset().top,
		elemBottom = elemTop + $element.height();

	// The element is seen if...

	// ...the element is vertically within the top and botom
	if ( (elemTop <= docViewBottom) && (elemTop >= docViewTop) ) {
		return true;
	}

	// ...the element top is above the top
	// and the bottom is below the bottom (large elements)
	else if ( (elemTop <= docViewTop) && (elemBottom >= docViewBottom) ) {
		return true;
	}

	// ...we're at the bottom
	// and the bottom of the element is visible (large bottom elements)
	else if ( atBottom && (elemBottom >= docViewTop) ) {
		return true;
	}

	return false;
}

$.fn.isViewable = function() {
	return isViewable(this);
};

// Collection method.
$.fn.eyeline = function() {
	var docViewTop = $(window).scrollTop(),
		docViewBottom = docViewTop + $(window).height(),
		$elements = this,
		atBottom = false,
		bottomOffset = $elements.last().offset().top,
		length = $elements.length,
		isPreviousViewable = false;

	if ( bottomOffset ) {
		atBottom = (bottomOffset <= docViewBottom) &&
			(bottomOffset >= docViewTop);
	}

	return $elements.each(function( i, element ) {
		
		var $element = $(element),
			isElementViewable = $element.isViewable(),
			stop;

		if ( !isElementViewable ) {
			stop = !isPreviousViewable;
			isPreviousViewable = false;
			return stop;
		}

		isPreviousViewable = true;

		$element.trigger( EVENTS.view );
		// If you hit the bottom we mark all the elements as seen.
		// Otherwise, just the first one
		if ( !atBottom ) {
			if ( i === 0 ) {
				$elements.trigger( EVENTS.viewTop, {
					element: $element
				});
			}

		}

		if ( i === 0 ) {
			$elements.trigger( EVENTS.viewTop, {
				element: $element
			});
		}

		if ( i === (length - 1) ) {
			$elements.trigger( EVENTS.viewBottom, {
				element: $element
			});
		}
		
	});
};

// Expose isViewable, events and namespace to the public
$.eyeline = {
	isViewable: isViewable,
	events: EVENTS,
	namespace: NAMESPACE
};

// Custom selector.
$.expr[':'].viewable = function( element ) {
	// Is this element in the viewport?
	return $(element).isViewable();
};

}(window, window.document, window.jQuery));
