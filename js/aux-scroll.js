// Constants
// The last postion of the page scroll
let LAST_SCROLL_POSITION = 0;
// This is the number of pixels to let pass before firing a redraw
let SCROLL_LAG = 100;

// The ratio of the page that's been passed by
let ratio;


/**
 * A function that will create a bar to sit at the top of the page
 *  containing all the glyphs from the story
 */
function initBar() {
    // The string of characters that will be built up for the bar to contain
    innerString = "";
    let glyphs = document.body.getElementsByClassName("mayan");
    for (let glyph of glyphs) {
        let letter = glyph.innerHTML;
        if(letter === 'd'){
            //debugger;
        }
        innerString += `<span id="${glyph.id}">${letter}</span>`;
    }
    top_bar.innerHTML = innerString;
}

function moveWithScroll(scroll_pos) {
    // First determine the portion of the page that's been scrolled thru
    let ratio = scroll_pos / document.getElementById("tlgotd-body").scroll;
    top_bar.scrollLeft = top_bar.scrollLeftMax * ratio;
}



window.addEventListener("contentLoaded", () => {
    // Listen to all scroll events
    window.addEventListener('scroll', function(e) {
        let current_scroll_position = window.scrollY;
        let scroll_diff = current_scroll_position - LAST_SCROLL_POSITION;
        // If the change in the scroll position is great enough to be of note ...
        if(scroll_diff > SCROLL_LAG || scroll_diff < -SCROLL_LAG){
            let page_height = document.getElementById("tlgotd-body").clientHeight;
            // ... update the LAST_SCROLL_POSITION ...
            LAST_SCROLL_POSITION = current_scroll_position;
            // ... calculate ratio of the page that's scrolled thru ...
            let viewport_height = document.documentElement.clientHeight;
            ratio = current_scroll_position / (page_height - viewport_height);
            // ... fire an event letting other's know to update
            window.dispatchEvent(new CustomEvent("auxScroll"));
        } else {
          // Don't bother if there's only been a small change. Conserve compute!
          return;
        }
      });
});