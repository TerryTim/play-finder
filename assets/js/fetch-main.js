const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '8851db8af0msh521ce639e923ab9p184313jsn66147ba4fa94',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
  }
};

async function popularGames() {
  const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=popularity';

  try {
    const response = await fetch(url, options);
    const data = await response.json(); // Parse response as JSON
    const gameListContainer = document.querySelector('.trending .row'); // Get the container for game items

    if (data.length === 0) {
      gameListContainer.innerHTML = '<p>No games found.</p>';
      return;
    }

    // Display only the first 8 games
    const gamesToShow = data.slice(0, 8);

    // Create HTML elements for each game and append to the list
    gamesToShow.forEach(game => {
      const gameItem = document.createElement('div');
      gameItem.classList.add('col-lg-3', 'col-md-6', 'mb-4');
      gameItem.innerHTML = `
          <div class="item">
            <div class="thumb">
              <a href="details.html?gameId=${game.id}"><img src="${game.thumbnail}" alt="${game.title}"></a>
            </div>
            <div class="down-content">
              <span class="category">${game.genre}</span>
              <h4>${game.title}</h4>
            </div>
          </div>
        `;
      gameListContainer.appendChild(gameItem);
    });

    // On game item click, store the game ID in session storage and navigate to details.html
    const gameLinks = document.querySelectorAll('.item a');
    gameLinks.forEach(link => {
      link.addEventListener('click', function (event) {
        const gameId = link.getAttribute('href').split('?gameId=')[1];
        sessionStorage.setItem('selectedGameId', gameId);
      });
    });


  } catch (error) {
    console.error('Error fetching data:', error);
    const gameListContainer = document.querySelector('.trending .row');
    gameListContainer.innerHTML = '<p>An error occurred. Please try again later.</p>';
  }
}

// Call the async function to fetch and display data
popularGames();


async function NewGames() {
  const url = 'https://free-to-play-games-database.p.rapidapi.com/api/games?sort-by=release-date';;

  try {
    const response = await fetch(url, options);
    const data = await response.json(); // Parse response as JSON
    const gameListContainer = document.querySelector('.new-game .row'); // Get the container for game items

    if (data.length === 0) {
      gameListContainer.innerHTML = '<p>No games found.</p>';
      return;
    }

    // Display only the first 8 games
    const gamesToShow = data.slice(0, 8);

    // Create HTML elements for each game and append to the list
    gamesToShow.forEach(game => {
      const gameItem = document.createElement('div');
      gameItem.classList.add('col-lg-3', 'col-md-6', 'mb-4');
      gameItem.innerHTML = `
          <div class="item">
            <div class="thumb">
              <a href="details.html?gameId=${game.id}"><img src="${game.thumbnail}" alt="${game.title}"></a>
            </div>
            <div class="down-content">
              <span class="category">${game.genre}</span>
              <h4>${game.title}</h4>
            </div>
          </div>
        `;
      gameListContainer.appendChild(gameItem);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
    const gameListContainer = document.querySelector('.trending .row');
    gameListContainer.innerHTML = '<p>An error occurred. Please try again later.</p>';
  }
}

// Call the async function to fetch and display data
NewGames();

async function fetchGameCategory(category) {
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '8851db8af0msh521ce639e923ab9p184313jsn66147ba4fa94',
      'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
    }
  };

  try {
    const response = await fetch(url, options);
    const games = await response.json();
    return games;
  } catch (error) {
    console.error(error);
  }
}

async function populateGameCategories() {
  // Add more categories
  const categories = ['mmorpg', 'shooter', 'moba', 'battle-royale', 'racing', 'sports', 'fighting', 'fantasy'];

  for (const category of categories) {
    const games = await fetchGameCategory(category);
    const categoryElement = document.getElementById(category);

    if (categoryElement) {
      const thumbnail = games[0].thumbnail;
      const thumbnailElement = categoryElement.querySelector('.thumb img');
      thumbnailElement.src = thumbnail;

      const categoryLink = categoryElement.querySelector('.category-link');
      const selectedCategory = categoryLink.getAttribute('data-category');
      categoryLink.href = `category.html?category=${selectedCategory}`;
    }
  }
}

populateGameCategories();