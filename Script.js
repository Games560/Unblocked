const gameList = document.getElementById("game-list");
const gameContainer = document.getElementById("game-container");
const gameFrame = document.getElementById("game-frame");
const backBtn = document.getElementById("back-btn");
const searchInput = document.getElementById("search");

let gamesData = [];

// Fetch games from JSON
fetch("games.json")
    .then(response => response.json())
    .then(data => {
        gamesData = data;
        displayGames(gamesData);
    });

// Display games
function displayGames(games) {
    gameList.innerHTML = "";
    games.forEach(game => {
        const card = document.createElement("div");
        card.classList.add("game-card");
        card.textContent = game.name;

        card.addEventListener("click", () => {
            openGame(game.url);
        });

        gameList.appendChild(card);
    });
}

// Open game in iframe
function openGame(url) {
    gameFrame.src = url;
    gameList.classList.add("hidden");
    gameContainer.classList.remove("hidden");
}

// Back button
backBtn.addEventListener("click", () => {
    gameFrame.src = "";
    gameContainer.classList.add("hidden");
    gameList.classList.remove("hidden");
});

// Search functionality
searchInput.addEventListener("input", () => {
    const searchValue = searchInput.value.toLowerCase();
    const filtered = gamesData.filter(game =>
        game.name.toLowerCase().includes(searchValue)
    );
    displayGames(filtered);
});
