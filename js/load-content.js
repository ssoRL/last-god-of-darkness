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