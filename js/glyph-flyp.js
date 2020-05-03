// Constants
FIXED_DELAY = 6000; // in miliseconds
WEIRD_DELAY = 4000; // a delay effected by chance
LINGER = 200; // in ms

function flipGlyphs() {
    // The portion of the story scrolled thru
    // eyes get more common the further along you are
    let roll_the_dice = Math.random();
    try{
        let ratio = window.scrollY / document.getElementById("tlgotd-body").clientHeight;
        if(ratio > roll_the_dice) {
            let glyphs = document.body.getElementsByClassName("mayan");
            let glyph_index = Math.floor(Math.random() * glyphs.length);
            let glyph = glyphs[glyph_index];
            // flip anything other than the temple
            if(!glyph.classList.contains("upsidedown-temple")) {
                glyph.style.transform = "scaleX(-1)";
            }
            // Wait for LINGER milliseconds ...
            window.setTimeout(
                () => {
                    // ... then flip it back
                    if(!glyph.classList.contains("upsidedown-temple")) {
                        glyph.style.transform = "scaleX(1)";
                    }
                },
                LINGER
            );
        }
    } catch(e) {
        // window.banishToUnderworld(e);
        console.log(e);
    }

    // Whatever else happens, prepare to run it all again
    window.setTimeout(flipGlyphs, FIXED_DELAY + WEIRD_DELAY * roll_the_dice);
}

window.addEventListener("contentLoaded", (a, b) => {
    flipGlyphs();
});