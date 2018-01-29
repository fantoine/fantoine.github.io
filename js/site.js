$(function() {
    // Category selector
    var $categories = $('#categories-select');
    if($categories.length) {
        $categories.on('change', function() {
            var value = $(this).val();
            if (value != '-1') {
                window.location.href = value;
            }
        });
    }
});

$(function() {
	var colors = {
		blue: '#2B8ABF',
		grey: '#343434',
	};

	// Contact page
	var $contact = $('.section-contact');
	if($contact.length) {
		var FANTOINE_TYPE_ID = 'fantoine_style';

		var myPosition = new google.maps.LatLng(45.0173930, 4.8385500);
        
        // Create map
        var map = new google.maps.Map(document.getElementById("contact-map"), {
			center: myPosition,
			zoom: 6,
			disableDefaultUI: true,
			disableDoubleClickZoom: true,
			draggable: false,
			scrollwheel: false,
			mapTypeControlOptions: {
				mapTypeIds: [google.maps.MapTypeId.ROADMAP, FANTOINE_TYPE_ID]
			},
			mapTypeId: FANTOINE_TYPE_ID
        });

        // Add marker
        new google.maps.Marker({
			position: myPosition,
			map: map,
			title: 'I\'m here!',
			icon: '/img/pin.png',
		});

		var customMapType = new google.maps.StyledMapType(
			[
				{
					stylers: [
						{ hue: colors.blue },
						//{ visibility: 'simplified' },
						//{ gamma: 0.5 },
						{ weight: 0.5 }
					]
				},
				{
					featureType: 'water',
					stylers: [
						{ color: colors.blue }
					]
				}
			], 
			{ name: 'Fantoine Style' }
		);
		map.mapTypes.set(FANTOINE_TYPE_ID, customMapType);

		// Bind form
		$contact.find('form').on('submit', function(event) {
			event.preventDefault();

			// Disable fields
			var $fields = $(this).find('input[type=email], input[type=text], input[type=hidden], textarea');
			var $submit = $(this).find('submit');
			$fields.attr('disabled', true);
			$submit.attr('disabled', true);

			// Extract fields
			var data = {};
			$.each($fields, function(_, elt) {
				var $elt = $(elt);
				var value = $elt.val();
				if (value) {
					data[$elt.attr('name')] = value;
				}
			});

			// Submit form
			$.ajax({
			    url: [ 'htt', 'ps://formsp', 'ree.io/fab', 'ien@fantoi', 'ne.fr' ].join(''), 
			    method: 'POST',
			    data: data,
			    dataType: 'json'
			}).done(function() {
				$contact.find('.alert-sent-message').addClass('alert-sent');
				$fields.val('');
			}).fail(function() {
				alert('An error occurred while sending your message!');
			}).always(function() {
				$fields.removeAttr('disabled');
				$submit.removeAttr('disabled');
			});
		});
	}
});