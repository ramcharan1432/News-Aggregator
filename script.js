const API_KEY = '0e32190be0b54c4d9eaef4938a720f65';
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

async function fetchNews() {
    const query = document.getElementById('search').value;
    const url = `${NEWS_API_URL}?q=${query}&apiKey=${API_KEY}`;

    document.getElementById('loading-spinner').style.display = 'block';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        alert('There was an error fetching the news. Please try again later.');
    } finally {
        document.getElementById('loading-spinner').style.display = 'none';
    }
}

async function fetchCategory(category) {
    const url = `${NEWS_API_URL}?q=${category}&apiKey=${API_KEY}`;

    document.getElementById('loading-spinner').style.display = 'block';

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        alert('There was an error fetching the news. Please try again later.');
    } finally {
        document.getElementById('loading-spinner').style.display = 'none';
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('news-article');

        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;

        newsContainer.appendChild(articleElement);
    });

    // Adding delay for the animation to be noticeable
    setTimeout(() => {
        document.querySelectorAll('.news-article').forEach(article => {
            article.style.animation = 'slideIn 0.5s ease-in-out';
        });
    }, 100);
}

function supportUs() {
    alert('Thanks for your feedback!');
}
