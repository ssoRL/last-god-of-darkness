async function initializeContent(){
    try{
      let contentFetch = await fetch('tlgotd-content.html', {
          method: 'get'
      });
      let text = await contentFetch.text();
      document.getElementById("contentSection").innerHTML = text;
      window.dispatchEvent(new Event("contentLoaded", {content: true}));
    } catch {
        // Maybe try updating your browser
    }
  }
  
  initializeContent();