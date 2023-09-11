const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=release-date';
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '8851db8af0msh521ce639e923ab9p184313jsn66147ba4fa94',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
};

let isLoading = false;
let currentPage = 1;
const gamesPerPage = 12;

async function fetchAndDisplayGames() {
    try {
        isLoading = true;
        const response = await fetch(`${url}&page=${currentPage}`, options);
        const gameData = await response.json();

        const gameListContainer = document.getElementById('gameListContainer');
        const loader = document.getElementById('loader');
        // Simulate a 3-second loading delay
        // await new Promise(resolve => setTimeout(resolve, 1000));    

        const start = (currentPage - 1) * gamesPerPage;
        const end = start + gamesPerPage;

        for (let i = start; i < Math.min(end, gameData.length); i++) {
            const game = gameData[i];
            const gameItem = document.createElement('div');

            const genreClass = game.genre.toLowerCase().replace(' ', '-');
            gameItem.classList.add('col-lg-3', 'col-md-6', 'align-self-center', 'mb-30', 'trending-items', genreClass);
            gameItem.innerHTML = `
                <div class="item">
                    <div class="thumb">
                        <a href="details.html?gameId=${game.id}"><img src="${game.thumbnail}" alt=""></a>
                    </div>
                    <div class="down-content">
                        <span class="category">${game.genre}</span>
                        <h4>${game.title}</h4>
                    </div>
                </div>
            `;
            gameListContainer.appendChild(gameItem);
        }

        isLoading = false;
        loader.style.display = 'none';
    } catch (error) {
        console.error(error);
        isLoading = false;
        loader.style.display = 'none';
    }
}

function handleScroll() {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    const contentHeight = document.body.offsetHeight;

    // Calculate the scroll position to trigger when at the last game item
    const lastGameItem = document.querySelector('.trending-items:last-child');
    const lastGameItemOffset = lastGameItem.offsetTop + lastGameItem.clientHeight;
    if (!isLoading && windowHeight + scrollY >= lastGameItemOffset) {
        currentPage++;
        fetchAndDisplayGames();
    }
}

// Attach scroll event listener
window.addEventListener('scroll', handleScroll);

// Initial fetch and display of game data
fetchAndDisplayGames();


// Attach click event listeners to the filter buttons
const filterButtons = document.querySelectorAll('.trending-filter a');
filterButtons.forEach(button => {
    button.addEventListener('click', function (event) {
        event.preventDefault();
        const selectedGenre = this.getAttribute('data-filter');
        filterGamesByGenre(selectedGenre);
    });
});

function filterGamesByGenre(selectedGenre) {
    const gameItems = document.querySelectorAll('.trending-items');

    gameItems.forEach(item => {
        item.style.display = 'none'; // Hide all items
        if (selectedGenre === '*' || item.classList.contains(selectedGenre.slice(1))) {
            item.style.display = 'block'; // Show items of the selected genre or all items
        }
    });
}