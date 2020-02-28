// Set global variables and constants
let last_known_scroll_position = 0;
let ticking = false;
let redTarget = 200;
let scrollLag = 100;

function doSomething(scroll_pos) {
    let ratio = scroll_pos / document.documentElement.clientHeight;
    //console.log(ratio);
    let inverseRatio = 1 - ratio;
    let bgRed = 255 * Math.pow(inverseRatio, 1.4);
    let bgGB = 255 * inverseRatio;
    let backgroundColorStyle = "rgb(" + bgRed + "," + bgGB + "," + bgGB + ")";
    document.body.style.backgroundColor = backgroundColorStyle;
    let textColor = Math.min(redTarget * ratio * 1.4, redTarget);
    //console.log(textColor);
    let textColorStyle = "rgb(" + textColor + ",0,0)";
    document.body.style.color = textColorStyle;
}

window.addEventListener('scroll', function(e) {
  let current_scroll_position = window.scrollY;
  let scroll_diff = current_scroll_position - last_known_scroll_position;
  if(scroll_diff > scrollLag || scroll_diff < -scrollLag){
    last_known_scroll_position = current_scroll_position;
    doSomething(last_known_scroll_position);
  } else {
    // Don't bother if there's only been a small change. Conserve so compute
    return;
  }
  
  // if (!ticking) {
  //   window.requestAnimationFrame(function() {
  //     doSomething(last_known_scroll_position);
  //     ticking = false;
  //   });
  //   ticking = true;
  // }
});

// function setHeaderFooterSize(){
//   let pageHeight = document.body.clientHeight;
//   let pageWidth = document.body.clientWidth;
//   let header = document.getElementById("title");
//   let footer = document.getElementById("footer");
//   header.style.height = pageHeight;
//   header.style.width = pageWidth;
//   footer.style.width = pageWidth;
// }

// window.addEventListener('load', () => {
//   setHeaderFooterSize()
//   //window.onresize(setHeaderFooterSize);
// })

async function initializeContent(){
  try{
    let contentFetch = await fetch('tlgotd-content.html', {
  	  method: 'get'
    });
    let text = await contentFetch.text();
    document.getElementById("contentSection").innerHTML = text;
  } catch {
  	console.log("ouch");
  }
}

initializeContent();