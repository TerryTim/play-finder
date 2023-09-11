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
    const categories = ['mmorpg', 'shooter', 'moba', 'anime', 'battle-royale', 'strategy', 'fantasy',
        'sci-fi', 'card', 'racing', 'fighting', 'social', 'sports', 'sandbox', 'open-world', 'zombie',
        'survival', 'pixel', 'pvp', 'pve', 'turn-based', 'first-person', 'third-person', 'top-down', '3d',
        '2d', 'tank', 'space', 'sailing', 'side-scroller', 'superhero', 'permadeath'];

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