// Function to parse URL parameters
function getUrlParameter(name) {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
  const results = regex.exec(location.search);
  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

// Retrieve the search query from URL parameters
const keyword = getUrlParameter('keyword').toLowerCase();

// Set the search input field value to the keyword
document.getElementById('searchText').value = keyword;

// Fetch and format game data (similar to the previous code)
const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games';
const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '8851db8af0msh521ce639e923ab9p184313jsn66147ba4fa94',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com',
  },
};

try {
  fetch(url, options)
    .then((response) => response.json())
    .then((data) => {
      // Filter games based on the search keyword
      const filteredGames = data.filter((game) => {
        const gameTitle = game.title.toLowerCase();
        const gamePublisher = game.publisher.toLowerCase();
        const gameDeveloper = game.developer.toLowerCase();
        return (
          gameTitle.includes(keyword) ||
          gamePublisher.includes(keyword) ||
          gameDeveloper.includes(keyword)
        );
      });

      // Display the filtered games on the page
      const resultsContainer = document.getElementById('results');

      // Clear any existing content in the results container
      resultsContainer.innerHTML = '';

      // Create and append HTML elements for each game item
      filteredGames.forEach((game) => {
        const gameElement = document.createElement('div');
        gameElement.classList.add('col-lg-3', 'col-md-6', 'align-self-center', 'mb-30', 'trending-items');
        gameElement.innerHTML = `
            <div class="item">
                <div class="thumb">
                    <a href="details.html?gameId=${game.id}"><img src="${game.thumbnail}" alt=""></a>
                </div>
                <div class="down-content">
                    <span class="category">${game.genre}</span>
                    <h4>${game.title}</h4>
                    <p class="mb-0">Publisher: ${game.publisher}</p>
                    <p class="mb-0">Developer: ${game.developer}</p>
                </div>
            </div>
          `;
        resultsContainer.appendChild(gameElement);
      });
    })
    .catch((error) => {
      console.error(error);
    });
} catch (error) {
  console.error(error);
}
