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
