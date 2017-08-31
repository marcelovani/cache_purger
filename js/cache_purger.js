(function ($) {
	"use strict";

	Drupal.behaviors.cachePurger = {
    attach: function (context, settings) {
      jQuery.each(_cp, function (i, item) {
        var module = item.module;
        var delta = item.delta;
        var block_id = item.id;
        var id = '#block-' + block_id;
        var cl = '.block-' + block_id;
        jQuery(id + ', ' + cl).once('cache-purger', function () {
	        $(this).append(Drupal.behaviors.cachePurger.markup(module, block_id, delta));
        });
      });
    },

    markup: function(module, block_id, delta) {
      return '<div class="cache-purge-btn" title="Purge Cache: ' + delta +
        '" id="cache-purge-btn-' + delta +
        '" onclick="Drupal.behaviors.cachePurger.purge(\'' + module + '\', \'' + block_id + '\', \'' + delta + '\');">' +
        '</div>';
    },

    purge: function (module, block_id, delta) {
      var purge_btn = document.getElementById('cache-purge-btn-' + delta);
      var degrees = 0, speed = 0.5;
      var spinner = setInterval(function () {
        degrees += speed;
        var style = [
          '-webkit-transform:rotate(' + degrees + 'rad);',
          '-moz-transform:rotate(' + degrees + 'rad);',
          '-ms-transform:rotate(' + degrees + 'rad);',
          '-o-transform:rotate(' + degrees + 'rad);'
        ];
        purge_btn.setAttribute("style", style.join());
      }, 10);

      jQuery.getJSON("/admin/config/development/cachepurger/block/" + module + "/" + delta, {}, function (data) {
        clearInterval(spinner);
        if (Drupal.settings.cachePurger.debug == 1) {
          alert(data.result);
        }
        var id = '#block-' + block_id;
        var cl = '.block-' + block_id;
        jQuery(id + ', ' + cl).fadeOut('slow').fadeIn();
        jQuery('#cache-purge-btn-' + delta).fadeOut('slow');
      });
    }
  };

})(jQuery);
