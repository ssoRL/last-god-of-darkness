async function initializeContent(){
    try{
      let contentFetch = await fetch('tlgotd-content.html', {
          method: 'get'
      });
      let text = await contentFetch.text();
      document.getElementById("content-section").innerHTML = text;
      window.dispatchEvent(new CustomEvent("contentLoaded"));
    } catch {
        // Maybe try updating your browser
    }
  }
  
  initializeContent();