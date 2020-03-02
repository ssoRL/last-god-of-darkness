// Constants
let last_scroll_position = 0;
// This is the number of pixels to let pass before recoloring everything
let scrollLagGB = 100;
// The dom element of the top bar
let top_bar;

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
    let ratio = scroll_pos / document.getElementById("tlgotd-body").clientHeight;
    top_bar.scrollLeft = top_bar.scrollLeftMax * ratio;
}

function initMoveWithScroll() {
    window.addEventListener('scroll', function(e) {
        let current_scroll_position = window.scrollY;
        let scroll_diff = current_scroll_position - last_scroll_position;
        if(scroll_diff > scrollLagGB || scroll_diff < -scrollLagGB){
            last_scroll_position = current_scroll_position;
            moveWithScroll(last_scroll_position);
        } else {
          // Don't bother if there's only been a small change. Conserve compute!
          return;
        }
      });
}


window.addEventListener("contentLoaded", () => {
    top_bar = document.getElementById("top-bar");
    top_bar.scrollLeft = 0;
    initBar();
    initMoveWithScroll();
});