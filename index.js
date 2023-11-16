const query = "software development";

const fetchNews = (query) => {
  fetch(
    `https://newsapi.org/v2/everything?q=${query}&apiKey=6af35a1c5f9e4834a884ce947ae50d0d`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderNews(data.articles);
    });
};

fetchNews(query);

const renderNews = (news) => {
  const newsContainer = document.querySelector(".news-container");
  newsContainer.innerHTML = "";
  news.forEach((newsItem) => {
    const newsItemElement = document.createElement("div");
    newsItemElement.classList.add("news-item");
    newsItemElement.innerHTML = `
        <div class="news-item__image">
            <img src="${newsItem.urlToImage}" />
        </div>
        <div class="news-item__content">
            <h2 class="news-item__title">${newsItem.title}</h2>
            <p class="news-item__description">${newsItem.description}</p>
            <a href="${newsItem.url}" target="_blank" class="news-item__link">Read more</a>
            <button class="news-item__button">🔖</button>
        </div>
        `;

    const bookmarkButton = newsItemElement.querySelector(".news-item__button");
    bookmarkButton.addEventListener("click", () => {
      fetch("https://news-server-ix8f.onrender.com/bookmarks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsItem),
      });
    });
    newsContainer.appendChild(newsItemElement);
  });
};

const searchForm = document.querySelector(".search-form");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const query = event.target.search.value;
  fetchNews(query);
});

const bookmarkButton = document.querySelector(".view-bookmarks");

bookmarkButton.addEventListener("click", () => {
  fetchSavedNews();
});

const fetchSavedNews = () => {
  fetch("https://news-server-ix8f.onrender.com/bookmarks")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderNews(data);
    });
};
