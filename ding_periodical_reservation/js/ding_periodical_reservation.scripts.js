/**
 * @file
 * Script file for the periodical reservations.
 */
(function ($) {
  Drupal.extractPeriodicalId = function(ele) {
    var id_attr = $(ele).attr('id');
    var id = id_attr.match(/periodical-id-(.+)/);

    if (id != null) {
      return id[1];
    }
    else {
      return false;
    }
  }

  trigger_periodical_reservation = function(ajax, response, status) {
    var entity_id = response.data.replace(' ', '%20');
    var forms = $('form');
    var regex = new RegExp(entity_id, 'g');
    // Loop through all forms on a page, deeper filtering comes next.
    forms.each(function() {
      form = $(this);
      // Wee seek for reservations forms, thus specific form whose item was clicked.
      if (form.attr('id').match(/ding-reservation-reserve-form/g) && form.attr('action').match(regex)) {
        form.hide();
        // Make sure we don't miss the form.
        setTimeout(function() {
          // Call mousedown(), since click() event is forbidden by #ajax['prevent'].
          form.find('.form-submit').mousedown();
        }, 500);
      }
    });
  }

  Drupal.behaviors.ding_periodical_reservation = {
    attach: function (context, settings) {
      Drupal.ajax.prototype.commands.trigger_periodical_reservation = trigger_periodical_reservation;
      $('.periodical-holdings-reserve-button button', context).once('periodical-holdings-reserve-button', function() {
        var id = Drupal.extractPeriodicalId($(this).parent());
        if (id) {
          var element_settings = {};
          element_settings.url = '/ding_periodical_reservation/reserve/' + id;
          element_settings.event = 'click';
          element_settings.progress = { type: 'throbber' };
          base = $(this).attr('id');

          Drupal.ajax[base] = new Drupal.ajax(base, $(this), element_settings);
        }
      });
    }
  }
}(jQuery));
