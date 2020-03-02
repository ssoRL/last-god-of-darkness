// Constants
let last_scroll_position = 0;
// This is the number of pixels to let pass before recoloring everything
let scrollLagGB = 100;



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
    document.getElementById("top-bar-content").innerHTML = innerString;
}

window.addEventListener("auxScroll", () => {
    top_bar.scrollLeft = top_bar.scrollLeftMax * ratio;
})


window.addEventListener("contentLoaded", () => {
    top_bar = document.getElementById("top-bar");
    top_bar.scrollLeft = 0;
    initBar();
});