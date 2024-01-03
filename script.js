document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('starCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const starInfo = document.getElementById('starInfo');
    const introText = document.getElementById('introText');


    let stars = [];

    for (let i = 0; i < 100; i++) {
        stars.push(createStar(canvas, ctx, stars, starInfo));
    }

    document.addEventListener('click', function() {
        introText.classList.add('hidden'); // Adiciona a classe 'hidden' para ocultar
    });

    document.addEventListener('click', function(event) {
        if (!event.target.classList.contains('star')) {
            starInfo.style.display = 'none';
        }
    });

    document.addEventListener('dblclick', function(event) {
        if (isSpaceFree(event.pageX, event.pageY, stars)) {
            const newStar = createStar(canvas, ctx, stars, starInfo, event.pageX, event.pageY);
            stars.push(newStar);
        }
    });
});

function createStar(canvas, ctx, stars, starInfo, x = Math.random() * canvas.width, y = Math.random() * canvas.height) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.width = `${Math.random() * 3 + 1}px`;
    star.style.height = star.style.width;

    // Atribuir uma emoção fixa para cada estrela
    const emotions = ["Feliz", "Triste", "Empolgado", "Pensativo"];
    const starEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    star.setAttribute('data-emotion', starEmotion);

    star.addEventListener('mouseover', () => {
        drawLines(ctx, stars, star);
    });

    star.addEventListener('click', function(event) {
        event.stopPropagation();
        starInfo.style.display = 'block';
        starInfo.style.left = `${event.pageX}px`;
        starInfo.style.top = `${event.pageY}px`;

        const emotion = star.getAttribute('data-emotion');
        starInfo.innerHTML = `Informações da Estrela:<br>Coordenada X: ${event.pageX}<br>Coordenada Y: ${event.pageY}<br>Emoção: ${emotion}`;
    });

    document.body.appendChild(star);
    return star;
}

function isSpaceFree(x, y, stars, minDistance = 50) {
    return stars.every(star => {
        const starX = parseInt(star.style.left);
        const starY = parseInt(star.style.top);
        const distance = Math.sqrt(Math.pow(starX - x, 2) + Math.pow(starY - y, 2));
        return distance >= minDistance;
    });
}

function drawLines(ctx, stars, currentStar) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const currentEmotion = currentStar.getAttribute('data-emotion');

    // Filtra as estrelas com a mesma emoção
    const connectedStars = stars.filter(star => star.getAttribute('data-emotion') === currentEmotion);

    if (connectedStars.length > 0) {
        // Começa a desenhar a partir da estrela atual
        ctx.beginPath();
        ctx.moveTo(currentStar.offsetLeft + currentStar.offsetWidth / 2, currentStar.offsetTop + currentStar.offsetHeight / 2);

        // Desenha linhas para as outras estrelas com a mesma emoção
        connectedStars.forEach(targetStar => {
            ctx.lineTo(targetStar.offsetLeft + targetStar.offsetWidth / 2, targetStar.offsetTop + targetStar.offsetHeight / 2);
        });

        // Volta para a estrela atual para fechar o caminho
        ctx.lineTo(currentStar.offsetLeft + currentStar.offsetWidth / 2, currentStar.offsetTop + currentStar.offsetHeight / 2);

        ctx.strokeStyle = 'white';
        ctx.stroke();
    }
}
