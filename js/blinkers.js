// Constants
FIXED_DELAY = 60000; // in miliseconds
WEIRD_DELAY = 30000; // a delay effected by chance
LONGGAZE_CHANCE = 0.1; // The chance the the eyes will linger longer than normal
SHORT_LINGER = 250; // The normal blink on/off thing
LONG_LINGER = 1000; // A longer, soul-chilling gaze time

// This function places the eye's somewhere in the gutters of the page
function set_position(eyes) {
    // Set its width to be half of the gutter width or 40, whichever is bigger
    let gutter_width = document.documentElement.clientWidth * 0.15; // 15% margins
    let eyes_width = Math.floor(Math.max(gutter_width/2, 40));
    eyes.style.width = `${eyes_width}px`;
    eyes.style.position = "fixed";
    // Set the top property the eyes can be anywhere from 5px from the top
    // to 5px from the bottom. (max top = page_height - eye_height - 5px)
    let eye_height = eyes.clientHeight;
    let page_height = document.documentElement.clientWidth
    let top_value = Math.random() * (page_height - eye_height - 10) + 5;
    eyes.style.top = top_value;
    // position the element horizontally
    let h_offset = Math.random() * (gutter_width - eyes_width - 10) + 5;
    // Can be on the left or the right
    if (Math.random() > 0.5){
        eyes.style.left = h_offset;
    } else {
        eyes.style.right = h_offset;
    }
}

function blinkEyes() {
    // The portion of the story scrolled thru
    // eyes get more common the further along you are
    let roll_the_dice = Math.random();
    try{
        let ratio = window.scrollY / document.getElementById("tlgotd-body").clientHeight;
        if(ratio > roll_the_dice) {
            // Then we're going to have some fun
            // First generate a new img with the eyes
            let eyes = new Image();
            eyes.src = "media/jaguar-eyes.png";
            // start the eyes totally faded out and add transition logic
            eyes.classList.add("eyes-closed");
            eyes.classList.add("eyes-transition");
            document.getElementById("tlgotd-body").appendChild(eyes);
            // Position the eyes in the world
            set_position(eyes);
            // Then fade the eyes in
            eyes.classList.remove("eyes-closed");
            eyes.classList.add("eyes-open");
            let more_dice = Math.random();
            let linger = LONGGAZE_CHANCE * ratio > more_dice ? LONG_LINGER : SHORT_LINGER;
            // Wait for linger milliseconds ...
            window.setTimeout(
                () => {
                    // ... fade the eyes out ... 
                    eyes.classList.remove("eyes-open");
                    eyes.classList.add("eyes-closed");
                    // ... wait for the fade to finish
                    eyes.addEventListener("transitionend", () => {
                        // ... finally destroy the evidence
                        eyes.remove();
                    });
                },
                linger
            );
        }
    } catch(e) {
        // JaguarGod.smite(e);
    }

    // Whatever else happens, prepare to run it all again
    window.setTimeout(blinkEyes, FIXED_DELAY + WEIRD_DELAY * roll_the_dice);
}

blinkEyes();