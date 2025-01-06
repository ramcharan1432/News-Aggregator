const NEWS_API_URL = 'https://newsapi.org/v2/everything'; // News API URL
const API_KEY = '0e32190be0b54c4d9eaef4938a720f65'; // Replace with your API Key

// Function to fetch news based on a search query
async function fetchNews() {
    const query = document.getElementById('search').value.trim();
    if (!query) {
        alert('Please enter a search term.');
        return;
    }

    const url = `${NEWS_API_URL}?q=${query}&apiKey=${API_KEY}`;

    // Show loading spinner
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
        alert('Failed to fetch news. Please try again later.');
    } finally {
        // Hide loading spinner
        document.getElementById('loading-spinner').style.display = 'none';
    }
}

// Function to fetch news by category
async function fetchCategory(category) {
    const url = `${NEWS_API_URL}?q=${category}&apiKey=${API_KEY}`;

    // Show loading spinner
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
        alert('Failed to fetch news. Please try again later.');
    } finally {
        // Hide loading spinner
        document.getElementById('loading-spinner').style.display = 'none';
    }
}

// Function to display fetched news on the page
function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Clear previous news articles

    if (articles.length === 0) {
        newsContainer.innerHTML = '<p>No articles found.</p>';
        return;
    }

    articles.forEach(article => {
        const articleElement = document.createElement('div');
        articleElement.classList.add('news-article');

        articleElement.innerHTML = `
            <h2>${article.title}</h2>
            <p>${article.description || 'No description available.'}</p>
            <a href="${article.url}" target="_blank">Read more</a>
        `;

        newsContainer.appendChild(articleElement);
    });

    // Optional animation for news articles
    setTimeout(() => {
        document.querySelectorAll('.news-article').forEach(article => {
            article.style.animation = 'slideIn 0.5s ease-in-out';
        });
    }, 100);
}

// "Support Us" button functionality
function supportUs() {
    alert('Thank you for your support!');
}
