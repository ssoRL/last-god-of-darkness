// Constants
FIXED_DELAY = 5000; // in miliseconds
WEIRD_DELAY = 10000; // a delay effected by chance
LONGGAZE_CHANCE = 0.5; // The chance the the eyes will linger longer than normal
SHORT_LINGER = 250; // The normal blink on/off thing
LONG_LINGER = 1000; // A longer, soul-chilling gaze time

function blinkEyes() {
    // The portion of the story scrolled thru
    // eyes get more common the further along you are
    let roll_the_dice = Math.random();
    try{
        let ratio = window.scrollY / document.documentElement.clientHeight;
        if(ratio > roll_the_dice) {
            // Then we're going to have some fun
            // First generate a new img with the eyes
            let eyes = new Image();
            eyes.src = "media/jaguar-eyes.png";
            eyes.style.position = "fixed";
            eyes.style.top = "5px"
            eyes.style.left = "5px"
            document.getElementById("tlgotd-body").appendChild(eyes);
            let more_dice = Math.random();
            let linger = LONGGAZE_CHANCE * ratio > more_dice ? LONG_LINGER : SHORT_LINGER;
            // Wait for linger milliseconds...
            window.setTimeout(
                () => {
                    // ...then destroy the evidence
                    eyes.remove();
                },
                linger
            );
        }
    } catch(e) {
        // JaguarGod.smite(e);
        console.log(e);
    }

    // Whatever else happens, prepare to run it all again
    window.setTimeout(blinkEyes, FIXED_DELAY + WEIRD_DELAY * roll_the_dice);
}

blinkEyes();