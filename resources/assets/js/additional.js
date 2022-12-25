$(document).ready(function() {
	$('.search-cat-button').click(
		function(){
			let searchCatMenu = $(this).next('.search-cat-menu');

			if (searchCatMenu.css('visibility') === 'hidden'){
				searchCatMenu.css('visibility', 'visible')
			} else {
				searchCatMenu.css('visibility', 'hidden')
			}
		}
	);

	$('.search-cat-menu>li').click(
		function(){
			let selImg = $('> img',this).attr('src');
			let catId = $('> img',this).attr('value');
			let searchCatMenu = $(this).parent('.search-cat-menu');
			let searchCat = searchCatMenu.parent('.search-cat');

			searchCat.children('input.search-cat-val').val(catId);
			searchCatMenu.prev('.search-cat-button').children('.search-cat-button>img:first-child').attr('src', selImg);
			searchCatMenu.css('visibility', 'hidden');
		}
	);

	$(window).on("scroll", function(e) {
		if ($(window).scrollTop() >= $('.header-begin').outerHeight()) {
			$('.nav-bar').css('position','fixed');
		} else {
			$('.nav-bar').css('position','absolute');
		}
	});
})