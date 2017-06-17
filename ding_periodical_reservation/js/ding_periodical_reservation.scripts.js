/**
 * @file
 * Script file for the periodical reservations.
 */
(function ($) {
  'use strict';

  var trigger_periodical_reservation = function(ajax, response, status) {
    var entity_id = response.data.replace(' ', '%20');
    var forms = $('form');
    var regex = new RegExp(entity_id, 'g');

    // Loop through all forms on a page, deeper filtering comes next.
    forms.each(function() {
      var form = $(this);
      // Wee seek for reservations forms, thus specific form whose item was clicked.
      if (form.attr('id').match(/ding-reservation-reserve-form/g) && form.attr('action').match(regex)) {
        form.hide();
        form.find('.form-submit').mousedown();
      }
    });
  };

  Drupal.behaviors.ding_periodical_reservation = {
    attach: function (context, settings) {
      Drupal.ajax.prototype.commands.trigger_periodical_reservation = trigger_periodical_reservation;
    }
  }
}(jQuery));
