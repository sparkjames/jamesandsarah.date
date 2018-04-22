// Set up a click event to close the nav if something other than the nav is clicked. Like if the nav is open and they click something in the main content, close the nav.
// Using touchstart for mobile safari compatibility - http://stackoverflow.com/questions/6397603/catching-the-click-on-dom-html-body-event-on-the-ipad
window.addEventListener('click', function(e){
	jp_detectCloseNavClick(e);
});
window.addEventListener('touchstart', function(e){
	jp_detectCloseNavClick(e);
});
function jp_detectCloseNavClick(e){
	// Get the #hash value at the end of the URL, which will be #main-nav when the nav is open.
	var hash = window.location.hash;

	// Get the element that was clicked, will use to check if it was in the nav element or not.
	var target = e.target;

	// Only try to close the nav if the nav is actually open.
	if( hash=='#main-nav' ){

		// Now just try to see where they clicked. If it wasn't anything to do with the navigation, then close the nav. Just check the click target's parents for #main-nav, or if the clicked thing is the #main-nav itself.

		// Get the #main-nav element, will use this for comparison to see if it's listed as a parent element for the clicked element.
		var nav_more = document.getElementById('main-nav');

		// Get an array of the parents for the clicked element.
		var parents = jpParents(target);

		// Assume that they did NOT click in the nav.
		var clicked_in_nav = false;

		// Go through each element in the parents array, see if any of the parents are the #main-nav element. If one of them is, then clicked_in_nav is true, meaning they clicked something within the #main-nav element.
		for( i=0; i<parents.length; i++ ){
			if( parents[i]===nav_more ){
				clicked_in_nav = true;
			}
		}
		// Or they could have clicked on #main-nav itself, in which case clicked_in_nav should still be true.
		if( target === nav_more ){
			clicked_in_nav = true;
		}

		// Now if clicked_in_nav is still false, it means they didn't click #main-nav or anything inside of it - close the nav by nullifying the hash.
		if( !clicked_in_nav ){
			window.location.hash = '#0';
		}

	}
}



// When the More/Menu button is clicked (when the main flyout navigation is open), add a class to the <html> element to turn off overflow. This allows the flyout nav to be scrolled through without scrolling around the rest of the page.
window.addEventListener('hashchange', jp_detectNavOpen);
jp_detectNavOpen(); //Also run the function on page load in case the nav is already open.

function jp_detectNavOpen(){
	var html = document.getElementsByTagName('html');

	if( window.location.hash=='#main-nav' ){
		jpAddClass(html, 'nav-is-open');

	} else {
		jpRemoveClass(html, 'nav-is-open');
	}

}
