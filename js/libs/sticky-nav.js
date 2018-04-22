
// Sticky Nav callback
// This is the callback on the scroll event that handles making the tab navigation sticky.
function jp_sticky_nav_cb(this_tab_nav){
	// Determine how far the windodw has scrolled.
	var scroll_top = window.pageYOffset;

	// If the distance scrolled is greater than the tab_nav's distance from the top, that means the tab_nav has been scrolled past. Add the tab_nav_original_height so that it will have to scroll past the entire element to fire.
	if( scroll_top > tab_nav_scroll_threshold ){
		// Once it reaches this point, set the sticky class on the tab_nav.
		jpAddClass(this_tab_nav, 'is-sticky');

		// Also use the original height of the tab nav to add padding to the top of the body. This way it avoids the "jump" of content that happens when the tab_nav position is set to fixed, which suddenly removes about 120px of height from the page.
		// Also only mess with the body padding if the screen is wider than 568px. The .is-sticky class only takes effect on screens larger than that (via a media query), but I can't add the padding in the CSS since it has to be determined here via JS.
		if( window.outerWidth > 568 ){
			document.body.style.marginTop = tab_nav_original_height+'px';
		}

	// Use the original position of the tab_nav to determine if they've scrolled up above the tab_nav. This is how to determine when the tab_nav stickiness is removed.
	} else if( scroll_top <= tab_nav_scroll_threshold ){
		jpRemoveClass(this_tab_nav, 'is-sticky');

		if( window.outerWidth > 568 ){
			document.body.style.marginTop = 0;
		}

	}

}




// determine the default state of the tab nav on page load or on window resize
function jp_determine_sticky_nav_defaults(this_tab_nav){
	// Get the position data for the tab nav.
	tab_nav_original_shape = this_tab_nav.getBoundingClientRect();

	// Get the height of the tab nav.
	tab_nav_original_height = this_tab_nav.offsetHeight;

	// Get the scroll distance that determines whether or not the tab nav has been scrolled past, which should be the "top" position of the element plus its height. We are only concerned with the position relative to the top of the document. However since getBoundingClientRect() will return position values that are relative to the current scroll position (window.pageYOffset), the scroll position must also be taken into account.
	// E.g., if you've scrolled halfway down a page then the top position of the element might be something like -2000, as in you've scrolled 2000 pixels past the top of the element. Adding the scroll distance here offsets that, and keeps the meaurement relative to the top of the document.
	// tab_nav_scroll_threshold = tab_nav_original_shape.top + window.pageYOffset + tab_nav_original_height;
	tab_nav_scroll_threshold = tab_nav_original_shape.top + window.pageYOffset;

	// console.log( 'Original shape = ' ); console.log(tab_nav_original_shape);
	// console.log( 'Original height = ' + tab_nav_original_height );
	// console.log( 'Original threshold = ' + tab_nav_scroll_threshold );
}





// JP scrollspy cb
// Populates the tab_section_positions[] array (which must already exist on a global scope) with the scroll positions of the elements in the tab_section_ids[] array. Used as callback on page load and on window resize event.
function jp_get_section_positions_cb(tab_section_ids){
	console.log( 'start jp_get_section_positions_cb() ');

	for( i=0; i<tab_section_ids.length; i++ ){
		var this_tab_section = document.getElementById( tab_section_ids[i] );
		console.log('this_tab_section = ');
		console.log(this_tab_section);

		if( this_tab_section !== null ){
			var this_tab_section_shape = this_tab_section.getBoundingClientRect();
			tab_section_positions.push( {
				id: tab_section_ids[i],
				position: this_tab_section_shape.top + window.pageYOffset
			} );
		}

	}

}



// Sticky Nav
// Get the tab navigation element.
var tab_nav = document.querySelectorAll('.main-nav');
var tab_nav_original_shape = 0;
var tab_nav_original_height = 0;
var tab_nav_scroll_threshold = 0;

if( tab_nav.length ){
	// Save some data about how the tab nav element originally appears (before it's sticky).
	jp_determine_sticky_nav_defaults(tab_nav[0]);
	window.addEventListener( 'resize', function(){
		jp_determine_sticky_nav_defaults(tab_nav[0]);
	});

	// As the window is scrolled, we will compare the scroll distance to the tab_nav data to determine if it should be made sticky or not.
	window.addEventListener( 'scroll', function(){
		jp_sticky_nav_cb(tab_nav[0]);
	});

}



// JP Scrollspy
// Determines if a section on the page has been scrolled to, highlights the navigation link of that section.
var tab_section_ids = [
	'wedding-info',
	'places-to-stay',
	'things-to-do'
];

var tab_section_positions = [];
jp_get_section_positions_cb(tab_section_ids);
console.log( tab_section_positions );

window.addEventListener( 'resize', function(){
	jp_get_section_positions_cb(tab_section_ids);
});

window.addEventListener( 'scroll', function(){
	console.log('scrolling');
	var current_scroll_distance = window.pageYOffset + (window.outerHeight * 0.6);
console.log( 'scroll distance = ');
console.log(current_scroll_distance);

	var active_tab_id = 0;
	var active_tab = 0;

	for( i=0; i<tab_section_positions.length; i++){
		if( current_scroll_distance > tab_section_positions[i].position ){
			active_tab_id = tab_section_positions[i].id;
		}
	}

	// console.log( active_tab_id );
	if( active_tab_id ){
		active_tab = document.querySelectorAll('a[href^="#'+active_tab_id+'"]');
		// console.log(active_tab);
	}

	var tabs = document.querySelectorAll('.main-nav-link');
	if( active_tab ){
		try {
			jpRemoveClass(tabs, 'is-active');
			jpAddClass(active_tab, 'is-active');

		} catch( error ){
			console.log(error);
		}

	} else {
		try {
			jpRemoveClass(tabs, 'is-active');

		} catch( error ){
			console.log(error);
		}
	}

});
