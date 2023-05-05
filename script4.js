const calendar = document.getElementById("calendar");

async function fetchArticles() {
    const response = await fetch("https://api.coindar.org/v1/articles?limit=50");
    const articles = await response.json();
    return articles;
  }
   

function createEventElement(event) {
  const eventEl = document.createElement("div");
  eventEl.classList.add("event");
  const link = document.createElement("a");
  link.href = `https://coindar.org/en/event/${event.coin.symbol}/${event.id}`;
  link.target = "_blank";
  link.textContent = event.caption;
  eventEl.appendChild(link);
  return eventEl;
}

function addEventToCalendar(date, event) {
  const dayEl = document.querySelector(`[data-date="${date}"]`);
  if (dayEl) {
    dayEl.appendChild(createEventElement(event));
  }
}

function populateCalendar() {
  const today = new Date();
  const month = today.getMonth();
  const year = today.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  for (let i = firstDayOfMonth.getDay(); i > 0; i--) {
    const fillerDay = document.createElement("div");
    fillerDay.classList.add("calendar-day");
    calendar.appendChild(fillerDay);
  }

  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const dayEl = document.createElement("div");
    dayEl.classList.add("calendar-day");
    dayEl.dataset.date = `${year}-${month + 1}-${i}`;
    dayEl.innerHTML = `<strong>${i}</strong>`;
    calendar.appendChild(dayEl);
  }
}

async function main() {
    populateCalendar();
    const articles = await fetchArticles();
    console.log("Articles fetched:", articles);
  
    articles.forEach(article => {
      const articleDate = new Date(article.date * 1000); // Convert Unix timestamp to JavaScript timestamp
      console.log("Article date:", articleDate);
  
      const formattedDate = `${articleDate.getFullYear()}-${articleDate.getMonth() + 1}-${articleDate.getDate()}`;
      addEventToCalendar(formattedDate, {
        caption: article.title, // Use the article's title instead of the event's caption
        coin: { symbol: "Article" }, // Use a placeholder symbol "Article" to indicate that it's a news article
        id: article.id,
      });
    });
  }
  
  main();
