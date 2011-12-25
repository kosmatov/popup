(function($) {

	$.fn.popup = function(opts) {

		var el = $(this);

		opts = $.extend({

			timeout: 10000,
			left: 'auto',
			top: 'auto',
			duration: 1000,
			callback: function() {

				var p = $(this);
				p.find('.close').click( function() {

					p.hide();
					return false;
				});
			}
		}, opts);

		if ( ! opts.cookie )
			opts.cookie = {};

		opts.cookie = $.extend({

			name: 'popup',
			path: '/'
		}, opts.cookie);

		if ( ! $.cookie(opts.cookie.name) ) {

			setTimeout( function() {

				if ( opts.left == 'auto' ) {

					opts.left = ( $(window).width() - el.width() ) / 2;
					if ( opts.left < 0 )
						opts.left = 0;
				}

				if ( opts.top == 'auto' ) {

					opts.top = ( $(window).height() - el.height() ) / 2;
					if ( opts.top < 0 )
						opts.top = 0;
				}

				el.css({

					position: 'absolute',
					top: opts.top,
					left: opts.left
				}).fadeIn(opts.duration, function() {

					$(this).each(opts.callback);
				});

				$.cookie(opts.cookie.name, 1, opts.cookie);

			}, opts.timeout);
		}
	}

})(jQuery);

/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

jQuery.cookie = function (key, value, options) {

	// key and value given, set cookie...
	if (arguments.length > 1 && (value === null || typeof value !== "object")) {
		options = jQuery.extend({}, options);

		if (value === null) {
			options.expires = -1;
		}

		if (typeof options.expires === 'number') {
			var days = options.expires, t = options.expires = new Date();
			t.setDate(t.getDate() + days);
		}

		return (document.cookie = [
			encodeURIComponent(key), '=',
			options.raw ? String(value) : encodeURIComponent(String(value)),
			options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
			options.path ? '; path=' + options.path : '',
			options.domain ? '; domain=' + options.domain : '',
			options.secure ? '; secure' : ''
		].join(''));
	}

	// key and possibly options given, get cookie...
	options = value || {};
	var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
	return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};

