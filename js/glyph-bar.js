// Constants
let last_scroll_position = 0;
// This is the number of pixels to let pass before recoloring everything
let scrollLagGB = 100;
// A handle to the dom element of the top bar
let top_bar;
let top_bar_content;



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
    top_bar_content.innerHTML = innerString;
}

window.addEventListener("auxScroll", () => {
    scrollLeftMax = top_bar_content.clientWidth - top_bar.clientWidth;
    top_bar.scrollLeft = scrollLeftMax * ratio;
})


window.addEventListener("contentLoaded", () => {
    top_bar = document.getElementById("top-bar");
    top_bar_content = document.getElementById("top-bar-content");
    top_bar.scrollLeft = 0;
    initBar();
});