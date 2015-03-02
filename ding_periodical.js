(function ($) {
  $(document).ready(function(){
    $('.field-name-ding-periodical-issues li').children('.item-list').hide();

    $('.field-name-ding-periodical-issues .ding-periodical-fold.expand').toggle(function() {
      $(this).next().show();
      $('.page-ting-object .panel-pane.pane-ting-object-ding-availability-holdings').addClass('holdings-collapsed');
      $('.page-ting-object .grid-3 .panel-pane.pane-ting-object-ding-entity-buttons').addClass('holdings-collapsed');
      $(this).next().toggleClass('expanded-periodicals');
      $(this).parent().toggleClass('expanded-periodicals-parent');
    },
    function () {
      $(this).next().hide();
      $(this).next().toggleClass('expanded-periodicals');
      $(this).parent().toggleClass('expanded-periodicals-parent');
    });

    $('.ding-periodical-issue').click(function() {
      var periodicals = $(this).next('.item-list');
      if (periodicals.css('display') == 'none') {
        periodicals.show();
      }
      else {
        periodicals.hide();
      }
      $('.ding-periodical-issue').not($(this)).next('.item-list').hide();
    });
  });
}(jQuery));
