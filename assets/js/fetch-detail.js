document.addEventListener("DOMContentLoaded", async function () {
  // Function to fetch and display game data
  const fetchAndDisplayGameData = async () => {
    // Get the game ID from the URL parameters
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const gameId = urlParams.get("gameId");

    const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${gameId}`;
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '8851db8af0msh521ce639e923ab9p184313jsn66147ba4fa94',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }
    };

    try {
      const response = await fetch(url, options);
      const gameData = await response.json();

      // Populate fetched data into HTML elements
      document.title = `${gameData.title} | PlayFinder`; // Set the HTML title
      document.getElementById("gameThumbnail").src = gameData.thumbnail;
      document.getElementById("gameTitle").textContent = gameData.title;
      document.getElementById("gameShortDescription").textContent = gameData.short_description;
      document.getElementById("gameDescription").textContent = gameData.description;
      document.getElementById("gameGenre").textContent = gameData.genre;
      document.getElementById("gameStatus").textContent = gameData.status;
      document.getElementById("gamePublisher").textContent = gameData.publisher;
      document.getElementById("gameDeveloper").textContent = gameData.developer;
      document.getElementById("gamePlatform").textContent = gameData.platform;

      // Set the href attribute for the gameUrl link
      const gameUrlLink = document.getElementById("gameUrl");
      gameUrlLink.href = gameData.game_url;

      // Format and populate release date
      const releaseDate = new Date(gameData.release_date);
      const formattedDate = `${releaseDate.getDate()} ${releaseDate.toLocaleString('default', { month: 'long' })} ${releaseDate.getFullYear()}`;
      document.getElementById("gameRelease").textContent = formattedDate;

      // Populate minimum system requirements
      const gameSystemRequirements = gameData.minimum_system_requirements || {};

      document.getElementById("gameOS").textContent = gameSystemRequirements.os || "N/A";
      document.getElementById("gameProcessor").textContent = gameSystemRequirements.processor || "N/A";
      document.getElementById("gameMemory").textContent = gameSystemRequirements.memory || "N/A";
      document.getElementById("gameGraphics").textContent = gameSystemRequirements.graphics || "N/A";
      document.getElementById("gameStorage").textContent = gameSystemRequirements.storage || "N/A";

      // Show the game details container
      document.getElementById("gameDetailsContainer").style.display = "block";

      // Hide the loading indicator
      document.getElementById("loadingIndicator").style.display = "none";

      // Add link to category page with game genre
      const genreLink = document.getElementById("gameGenre");
      const genre = gameData.genre.replace(/ /g, "-"); // Replace spaces with hyphens
      if (genre === "Card-Game") {
        genreLink.href = "category.html?category=card";
      } else {
        genreLink.href = `category.html?category=${genre}`;
      }

      // Get the link element by its class
      const categoryLink = document.querySelector(".category-link");

      // Set the data-category attribute to gameData.genre
      categoryLink.href = `category.html?category=${genre}`;

      // Fetch and display game screenshots
      const screenshots = gameData.screenshots || [];
      const carouselInner = document.querySelector('.carousel-inner');
      carouselInner.innerHTML = ''; // Clear existing images

      for (let i = 0; i < screenshots.length; i++) {
        const screenshot = screenshots[i];
        const imageItem = document.createElement('div');
        imageItem.classList.add('carousel-item');

        if (i === 0) {
          imageItem.classList.add('active'); // Mark the first image as active
        }

        imageItem.innerHTML = `
          <img class="d-block w-100" src="${screenshot.image}" alt="Screenshot ${i + 1}">
        `;

        carouselInner.appendChild(imageItem);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const fetchAndDisplayRelatedGames = async (genre) => {
    if (genre = "Card-Game") {
      genre = "card"
    }
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${genre}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '8851db8af0msh521ce639e923ab9p184313jsn66147ba4fa94',
          'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
        }
      });
      const relatedGames = await response.json();

      const relatedGamesContainer = document.querySelector('.related-games .row');
      for (let i = 0; i < 4; i++) {
        const game = relatedGames[i];
        const gameItem = document.createElement('div');
        gameItem.classList.add('col-lg', 'col-sm-6', 'col-xs-12');
        gameItem.innerHTML = `
                <div class="item">
                    <h4>${game.title}</h4>
                    <div class="thumb">
                      <a href="details.html?gameId=${game.id}"><img src="${game.thumbnail}" alt=""></a>
                    </div>
                </div>
            `;
        relatedGamesContainer.appendChild(gameItem);
      }
    } catch (error) {
      console.error(error);
    }
  };



  // Fetch and display the main game's data
  await fetchAndDisplayGameData();

  // Fetch and display related games based on the main game's genre
  const mainGameGenre = document.getElementById("gameGenre").textContent;
  fetchAndDisplayRelatedGames(mainGameGenre.replace(/ /g, "-"));

  // Show the loading indicator initially
  document.getElementById("loadingIndicator").style.display = "block";

  // Listen for changes to the URL
  window.addEventListener("popstate", fetchAndDisplayGameData);
});
