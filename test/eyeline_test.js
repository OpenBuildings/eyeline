(function( window, document, $, undefined ) {
	/*
		======== A Handy Little QUnit Reference ========
		http://api.qunitjs.com/

		Test methods:
			module(name, {[setup][ ,teardown]})
			test(name, callback)
			expect(numberOfAssertions)
			stop(increment)
			start(decrement)
		Test assertions:
			ok(value, [message])
			equal(actual, expected, [message])
			notEqual(actual, expected, [message])
			deepEqual(actual, expected, [message])
			notDeepEqual(actual, expected, [message])
			strictEqual(actual, expected, [message])
			notStrictEqual(actual, expected, [message])
			throws(block, [expected], [message])
	*/

	module('jQuery#eyeline', {
		// This will run before each test in this module.
		setup: function() {
			this.holder = $('#long-list');
			this.items = this.holder.children();
		}
	});

	test('is chainable', 1 ,function() {
		// Not a bad test to run on collection methods.
		strictEqual(this.items.eyeline(), this.items, 'should be chainable');
	});

	test('triggers view event', 1, function() {

		this.holder.one($.eyeline.events.view, 'li', function() {
			ok(true, 'view event should be triggered');
		});

		this.items.eyeline();
	});

	asyncTest('triggers view event after scroll', 1, function() {

		var last = this.items.last();

		last.on($.eyeline.events.view, function() {
			ok(true, 'view event should be triggered');
			last.off($.eyeline.events.view);
			last.one($.eyeline.events.view, function() {
				ok(false, 'view event should not be triggered a second time');
			});
			start();
		});

		this.items.eyeline();
		$(document).scrollTop($(document).height());
		this.items.eyeline();

		window.scrollTo(0, 0);
	});


	asyncTest('triggers view event only for visible items', 5, function() {
		// Equals the number of expectations
		var numberOfVisisbleElements = 5,
			elementsChecked = 0;

		this.holder.on($.eyeline.events.view, 'li', function() {
			ok(true, 'view event should be triggered');
			elementsChecked++;

			if (elementsChecked === numberOfVisisbleElements) {
				start();
			}
		});

		this.items.eyeline();
	});

	module('jQuery.eyeline', {
		// This will run before each test in this module.
		setup: function() {
			this.items = $('#long-list').children();
		}
	});

	test('isViewable', 2, function() {
		strictEqual(
			$.eyeline.isViewable(this.items.first()),
			true,
			'first element should be in the viewport'
		);
		
		strictEqual(
			$.eyeline.isViewable(this.items.last()),
			false,
			'last element should not be in the viewport'
		);
	});

	module(':viewable selector filter', {
		// This will run before each test in this module.
		setup: function() {
			this.items = $('#long-list').children();
		}
	});

	test('is :viewable', 1, function() {
		// Use deepEqual & .get() when comparing jQuery objects.
		deepEqual(this.items.filter(':viewable').get(0), this.items.first().get(0), 'first element should be in the viewport');
	});

}( window, window.document, window.jQuery ));
