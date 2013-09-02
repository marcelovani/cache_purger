(function ($) {
Drupal.behaviors.blockPurge = {
  attach: function (context) {
  var block_ids = Drupal.settings.cache_purger;
  jQuery.each(block_ids.module, function (i, item) {
    var module = block_ids.module[i];
    var delta = block_ids.delta[i];
    var purge_btn = '<div class="cache-purge-btn" title="Purge Cache: ' + module + '-' + delta + '" id="cache-purge-btn-' + module + '-' + delta +	'" onclick="cache_purge_block(\'' + module + '\', \'' + delta + '\', \'' + Drupal.settings.cache_purger_debug + '\');"></div>';
    jQuery('#block-' + module + '-' + delta + '').append(purge_btn);
   });
  }
};

})(jQuery);

function cache_purge_block(module, delta, debug) {
  var cssPrefix = false;
  if (jQuery.browser.webkit) {
    cssPrefix = "webkit";
  }
  if (jQuery.browser.safari) {
    cssPrefix = "webkit";
  }
  if (jQuery.browser.mozilla) {
    cssPrefix = "moz";
  }
  if (jQuery.browser.opera) {
    cssPrefix = "o";
  }
  if (jQuery.browser.msie) {
    cssPrefix = "ms";
  }

  if(cssPrefix != false) {
    var purge_btn = document.getElementById('cache-purge-btn-' + module + '-' + delta), degrees = 0, speed = 5;
    var spinner = setInterval(function() {
      // Degree adjustment each interval.
      degrees += speed;
      purge_btn.setAttribute("style","-" + cssPrefix + "-transform:rotate(" + degrees + "deg)");
    },5);
  }
  jQuery.getJSON("/admin/config/development/cachepurger/block/" + module + "/" + delta, {}, function(data) {
    clearInterval(spinner);
    if (debug != 0) {
      alert(data.result);
    }
    jQuery('#cache-purge-btn-' + module + '-' + delta).fadeOut('slow');
  });
}
