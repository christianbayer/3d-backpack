$('.thumbnails-content img').on('click', function () {

    // Get this element as a jQuery object
    let $this = $(this);

    // Remove active class from the other image
    $('.thumbnails-content img.active').removeClass('active');

    // Add the active class to this one
    $this.addClass('active');

    // Hide the current image on the slider
    $('#prodCarousel_350134960 .item.active').removeClass('active');

    // Show the selected image on the slider
    $('#prodCarousel_350134960 .item[data-index="' + $this.data('slideto') + '"]').addClass('active');
});


$('.custom-dropdown:not(.disabled) .custom-dropdown-header').on('click', function () {

    // Get some elements
    let $this = $(this),
        $container = $this.parent(),
        $content = $container.find('div.custom-dropdown-content');

    // Change the arrow
    $this.find('span.lr-arrow').toggleClass('lr-arrow-up lr-arrow-down');

    // Open the dropdown
    $container.toggleClass('opened');
    $content.toggle();

});

$('.pdp-filter-item.color-item').on('click', function () {

    // Get some elements
    let $this = $(this),
        $container = $this.closest('.custom-dropdown'),
        $content = $container.find('div.custom-dropdown-content');

    // Turn this into the selected color
    $container.find('.color-item.selected').removeClass('selected');
    $this.addClass('selected');

    // Change image and label
    $container.find('.filter-color-thumbnail').attr('src', $this.find('img').attr('src'));
    $container.find('.pdp-filter-label-choice').text($this.attr('title'));

    // Close the dropdown
    $container.find('span.lr-arrow').toggleClass('lr-arrow-up lr-arrow-down');
    $container.removeClass('opened');
    $content.hide();

    // Change 360 view
    changeBackpack($this.val());

    // Set 360 as active view
    $('.thumbnails-content img.active').removeClass('active');
    $('.thumbnails-content img[data-slideto="0"]').addClass('active');
    $('#prodCarousel_350134960 .item.active').removeClass('active');
    $('#prodCarousel_350134960 .item[data-index="0"]').addClass('active');

});