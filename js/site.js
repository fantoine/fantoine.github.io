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
			icon: templateUrl + 'img/pin.png',
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
	}
});