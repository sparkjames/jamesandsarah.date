// Based on https://css-tricks.com/snippets/jquery/smooth-scrolling/

// Old selector from the jQuery-based version:
// $('a[href*="#"]')
//   // Remove links that don't actually link to anything
//   .not('[href="#"]')
//   .not('[href="#0"]')
//   .not('.navigation-open')
//   .click(function(event) {

var jp_jump_links = document.querySelectorAll('a[data-jump-link="1"]');
for( i=0; i<jp_jump_links.length; i++ ){
    jp_jump_links[i].addEventListener('click', jp_jump_link_cb);
}

function jp_jump_link_cb(event){
    // console.log('clicked jump link');
    // console.log(event);

    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
        var target = document.querySelectorAll(this.hash);
        target = target.length ? target : document.querySelectorAll('[name=' + this.hash.slice(1) + ']');
        console.log( 'scroll target = ');
        console.log(target);

        // Does a scroll target exist?
        if (target.length) {
            event.preventDefault();
            target[0].scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        }

    }

}
