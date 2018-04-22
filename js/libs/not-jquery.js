// Library of functions that I would otherwise use jQuery for. Based on stuff from http://youmightnotneedjquery.com/

// $.addClass()
function jpAddClass(el, className){
    var added_class = false;
    var add_class_to_these = [];

    try {

        // Check if the given element is a NodeList, like what document.querySelectorAll() will return. In that case, we can replace the add_class_to_these array directly with the NodeList.
        if( el.length ){
            add_class_to_these = el;

        // Otherwise it's just a single element, add it to the add_class_to_these array.
        } else {
            add_class_to_these.push(el);

        }

        // Now that the add_class_to_these array is populated, loop through and add classes.
        for( i=0; i<add_class_to_these.length; i++ ){
            if( add_class_to_these[i].classList ){
                add_class_to_these[i].classList.add(className);
                added_class = true;

            } else {
                add_class_to_these[i].className += ' ' + className;
                added_class = true;

            }
        }

    } catch( error ){
        console.log(error);
    }

    return added_class;
}



// $.removeClass()
function jpRemoveClass(el, className){
    var removed_class = false;
    var remove_class_from_these = [];

    try {

        // Check if the given element is a NodeList, like what document.querySelectorAll() will return. In that case, we can replace the remove_class_from_these array directly with the NodeList.
        if( el.length ){
            remove_class_from_these = el;

        // Otherwise it's just a single element, add it to the remove_class_from_these array.
        } else {
            remove_class_from_these.push(el);

        }

        // Now that the remove_class_from_these array is populated, loop through and remove classes.
        for( i=0; i<remove_class_from_these.length; i++ ){
            if( remove_class_from_these[i].classList ){
                remove_class_from_these[i].classList.remove(className);
                removed_class = true;

            } else {
                remove_class_from_these[i].className = remove_class_from_these[i].className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
                removed_class = true;

            }
        }

    } catch( error ){
        console.log(error);
    }

    return removed_class;
}



// $.hasClass()
function jpHasClass(el, className){
    var has_class = false;

    try {

        if( el.classList ) {
            has_class = el.classList.contains(className);

        } else {
            has_class= new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);

        }

    } catch( error ){}

    return has_class;
}



// $.parents()
// https://stackoverflow.com/questions/12980877/parents-without-jquery-or-queryselectorall-for-parents
// Warning - this function is weird. Don't include a parentSelector parameter if you want it to work. If you include the parentSelector parameter (which I think the author meant "parentNode" or "parentElement") it won't work. From what I can tell, the while loop happens one extra time when it shouldn't. When it finds the parent you were looking for, the while loop continues despite the fact that it's conditional no longer passes. It continues looping as long as p isn't the parentSelector, but even when p IS the parentSelector it continues and throws an error that it couldn't get the .parentNode of undefined.
function jpParents(el, parentSelector /* optional */) {

    // If no parentSelector defined will bubble up all the way to *document*
    if (parentSelector === undefined) {
        parentSelector = document;
    }

    var parents = [];
    var p = el.parentNode;

    while (p !== parentSelector) {
        var o = p;
        parents.push(o);
        p = o.parentNode;
    }
    parents.push(parentSelector); // Push that parentSelector you wanted to stop at

    return parents;
}
