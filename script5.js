/*To retrieve news article from external sources. */
document.addEventListener("DOMContentLoaded", function() {
    const newsWidgetContainer = document.getElementById("news-widget-container");
    const widgetCode = `
      <rssapp-wall id="tmbbvxelRAzrJsEl"></rssapp-wall>
      <script src="https://widget.rss.app/v1/wall.js" type="text/javascript" async></script>
    `;
  
    newsWidgetContainer.innerHTML = widgetCode;
  });
  