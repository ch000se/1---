class Api {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.baseUrl = 'https://api.themoviedb.org/3';
    }

    async fetchPopularMovies() {
        try {
            const response = await fetch(`${this.baseUrl}/movie/popular?api_key=${this.apiKey}`);
            if (!response.ok) {
                throw new Error('Failed to fetch popular movies');
            }
            const data = await response.json();
            return data.results;
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

const api = new Api('e52fda134110945256469ed2ec1cb4fe');

function renderPopularMovies(movies) {
    const loadingElement = document.getElementById('loading');
    const movieListElement = document.getElementById('movie-list');

    loadingElement.style.display = 'none';

    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');

        const moviePoster = document.createElement('img');
        moviePoster.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
        movieItem.appendChild(moviePoster);

        const movieTitle = document.createElement('h2');
        movieTitle.textContent = movie.original_title;
        movieItem.appendChild(movieTitle);

        movieListElement.appendChild(movieItem);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const movies = await api.fetchPopularMovies();
    renderPopularMovies(movies);
});
