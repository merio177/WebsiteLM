document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('starCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const stars = [];

    for (let i = 0; i < 100; i++) {
        stars.push(createStar(canvas, ctx, stars));
    }
});

function createStar(canvas, ctx, stars) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.left = `${Math.random() * canvas.width}px`;
    star.style.top = `${Math.random() * canvas.height}px`;
    star.style.width = `${Math.random() * 3 + 1}px`;
    star.style.height = star.style.width;

    star.addEventListener('mouseover', () => {
        drawLines(ctx, stars, star);
    });

    star.onclick = function() {
        alert('Você clicou em uma estrela!');
    };

    document.body.appendChild(star);
    return star;
}

function drawLines(ctx, stars, currentStar) {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.beginPath();
    ctx.moveTo(currentStar.offsetLeft + currentStar.offsetWidth / 2, currentStar.offsetTop + currentStar.offsetHeight / 2);

    const numberOfLines = Math.floor(Math.random() * 5) + 1; // De 1 a 5 linhas
    for (let i = 0; i < numberOfLines; i++) {
        const targetStar = stars[Math.floor(Math.random() * stars.length)];
        ctx.lineTo(targetStar.offsetLeft + targetStar.offsetWidth / 2, targetStar.offsetTop + targetStar.offsetHeight / 2);
        ctx.moveTo(currentStar.offsetLeft + currentStar.offsetWidth / 2, currentStar.offsetTop + currentStar.offsetHeight / 2);
    }

    ctx.strokeStyle = 'white';
    ctx.stroke();
}
