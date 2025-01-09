let score = 0;
let username = '';
const rankingKey = 'ranking'; // Clave para el almacenamiento local
// Array de imágenes de fondo
const backgrounds = [
    'url("https://via.placeholder.com/800x600/FF5733/FFFFFF?text=Fondo+1")',
    'url("https://via.placeholder.com/800x600/33FF57/FFFFFF?text=Fondo+2")',
    'url("https://via.placeholder.com/800x600/3357FF/FFFFFF?text=Fondo+3")',
    'url("https://via.placeholder.com/800x600/FF33A1/FFFFFF?text=Fondo+4")',
    'url("https://via.placeholder.com/800x600/FFC300/FFFFFF?text=Fondo+5")'
];

let currentBackgroundIndex = 0; // Índice del fondo actual

document.getElementById('start-button').addEventListener('click', function() {
    document.getElementById('start-screen').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
});

document.getElementById('submit-name').addEventListener('click', function() {
    username = document.getElementById('username').value;
    if (username) {
        document.getElementById('score-title').style.display = 'block';
        document.getElementById('click-button').style.display = 'block';
        document.getElementById('score').style.display = 'block';
        document.getElementById('username').style.display = 'none';
        document.getElementById('submit-name').style.display = 'none';
        document.getElementById('show-ranking').style.display = 'block'; // Mostrar el botón de ranking
    } else {
        alert('Por favor, ingresa tu nombre.');
    }
});

document.getElementById('click-button').addEventListener('click', function() {
    score++;
    document.getElementById('score-value').innerText = score;
});

document.getElementById('show-ranking').addEventListener('click', function() {
    saveScore(username, score); // Guardar puntaje en localStorage
    showRanking();
});

function saveScore(username, score) {
    const ranking = JSON.parse(localStorage.getItem(rankingKey)) || [];
    
    // Verificar si el usuario ya está en el ranking
    const existingUser  = ranking.find(entry => entry.name === username);
    if (existingUser ) {
        // Si el usuario ya existe, actualizar su puntaje si es mayor
        if (score > existingUser .score) {
            existingUser .score = score; // Actualizar el puntaje
        }
    } else {
        // Si el usuario no existe, agregarlo al ranking
        ranking.push({ name: username, score: score });
    }
    
    localStorage.setItem(rankingKey, JSON.stringify(ranking));
}

function showRanking() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('ranking').style.display = 'block';
    const storedRanking = JSON.parse(localStorage.getItem(rankingKey));
    if (storedRanking) {
        document.getElementById('ranking-list').innerHTML = ''; // Limpiar la lista antes de mostrar
        storedRanking.forEach(entry => {
            const li = document.createElement('li');
            li.innerText = `${entry.name}: ${entry.score}`;
            document.getElementById('ranking-list').appendChild(li);
        });
    }
}

document.getElementById('back-to-game').addEventListener('click', function() {
    document.getElementById('ranking').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
});

document.getElementById('clear-ranking').addEventListener('click', function() {
    localStorage.removeItem(rankingKey); // Borra solo el ranking
    alert('Ranking borrado.');
    document.getElementById('ranking-list').innerHTML = ''; // Limpiar la lista visible
});