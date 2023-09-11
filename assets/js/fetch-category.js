async function fetchCategoryGames(category) {
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

async function populateCategoryGames() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedCategory = urlParams.get('category');

    if (selectedCategory) {
        const games = await fetchCategoryGames(selectedCategory);
        const categoryContainer = document.getElementById('category-container');
        const categoryNameElement = document.getElementById('category-name');

        const categoryName = selectedCategory.replace(/-/g, ' '); // Replace hyphens with spaces
        document.title = `${categoryName} | PlayFinder`; // Set the HTML title
        categoryNameElement.textContent = categoryName; // Set the modified category name

        for (const game of games) {
            const genreClass = 'some-genre-class'; // Add your genre class logic here
            const gameItem = document.createElement('div');
            gameItem.classList.add('col-lg-3', 'col-md-6', 'align-self-center', 'mb-30', 'trending-items', genreClass);
            gameItem.innerHTML = `
                <div class="item">
                    <div class="thumb">
                        <a href="details.html?gameId=${game.id}"><img src="${game.thumbnail}" alt=""></a>
                    </div>
                    <div class="down-content">
                        <span class="category">${game.genre}</span>
                        <h4>${game.title}</h4>
                        <a href="details.html"></a>
                    </div>
                </div>
            `;
            categoryContainer.appendChild(gameItem);
        }
    }
}

populateCategoryGames();

