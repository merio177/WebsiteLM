document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('starCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const starInfo = document.getElementById('starInfo');
    const introText = document.getElementById('introText');
    const userInput = document.getElementById('userInput');
    const delayedTextInput = document.getElementById('delayedTextInput');


    setTimeout(function() {
        const introText = document.getElementById('introText');
        const intermediateText = document.getElementById('intermediateText');
        
        introText.style.display = 'none';
        intermediateText.style.display = 'block';
    }, 5000); // 5000 milissegundos = 5 segundos

    // Exibir o delayedText após o segundo intervalo
    setTimeout(function() {
        const intermediateText = document.getElementById('intermediateText');
        const delayedText = document.getElementById('delayedText');

        intermediateText.style.display = 'none';
        delayedText.style.display = 'block';
    }, 10000); // 10000 milissegundos = 10 segundos

    let stars = [];

    for (let i = 0; i < 100; i++) {
        stars.push(createStar(canvas, ctx, stars, starInfo));
    }

    document.addEventListener('click', function(event) {
        if (!event.target.classList.contains('star')) {
            starInfo.style.display = 'none';
        }
    });

    //REMOVER NO FIM
    document.getElementById('introText').addEventListener('click', function() {
        // Ocultar introText e introBackground
        this.style.display = 'none';
        document.getElementById('introBackground').style.display = 'none';
    
        // Garantir que o starCanvas esteja visível
        // (Se starCanvas já estiver visível por padrão, esta linha pode ser desnecessária)
        document.getElementById('starCanvas').style.display = 'block';
    
        // Rolando para a posição do starCanvas
        const starCanvas = document.getElementById('starCanvas');
        starCanvas.scrollIntoView({ behavior: 'smooth' });
    });
    
    

    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            thirdText.style.display = 'none'; // Oculta o terceiro texto
            document.getElementById('introBackground').style.display = 'none'; // Opcional: oculta o fundo preto
            // Aqui você pode adicionar qualquer outra ação que deseja executar após pressionar Enter
        }
    });

    delayedTextInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && delayedTextInput.value.trim() !== '') {
            const thirdText = document.getElementById('thirdText');
            const h1Element = thirdText.querySelector('h1'); // Seleciona o elemento <h1> dentro de thirdText
    
            // Atualiza o texto de <h1> em 'thirdText' com o valor de 'delayedTextInput'
            h1Element.textContent = "I’m feeling " + delayedTextInput.value.trim() + " because Y.";
    
            thirdText.style.display = 'block';
            delayedText.style.display = 'none'; // Oculta delayedText
        }
    });

    document.addEventListener('dblclick', function(event) {
        if (isSpaceFree(event.pageX, event.pageY, stars)) {
            const newStar = createStar(canvas, ctx, stars, starInfo, event.pageX, event.pageY);
            stars.push(newStar);
        }
    });
});

// Canvas - Estrelas

//Cria Estrela
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
        starInfo.innerHTML = `Informações da Estrela:<br>Coordenada X: ${event.pageX}<br>Coordenada Y: ${event.pageY}<br>Emoção: ${emotion}<br>Motivo:`;
    });

    document.body.appendChild(star);
    return { x, y, emotion: getRandomEmotion() };
    return star;
}

//Se estiver muito perto, não deixa criar a estrela
function isSpaceFree(x, y, stars, minDistance = 50) {
    return stars.every(star => {
        const starX = parseInt(star.style.left);
        const starY = parseInt(star.style.top);
        const distance = Math.sqrt(Math.pow(starX - x, 2) + Math.pow(starY - y, 2));
        return distance >= minDistance;
    });
}

//Linha de Emoção
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
            ctx.moveTo(targetStar.offsetLeft + targetStar.offsetWidth / 2, targetStar.offsetTop + targetStar.offsetHeight / 2);
        });

        ctx.strokeStyle = 'white';
        ctx.stroke();
    }
}

let isDragging = false;
let lastX, lastY;
let offsetX = 0, offsetY = 0; // Esses offsets controlarão a posição das estrelas

canvas.addEventListener('mousedown', function(event) {
    isDragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
});

document.addEventListener('mouseup', function() {
    isDragging = false;
});

canvas.addEventListener('mousemove', function(event) {
    if (isDragging) {
        const dx = event.clientX - lastX;
        const dy = event.clientY - lastY;
        lastX = event.clientX;
        lastY = event.clientY;

        offsetX += dx;
        offsetY += dy;
        redrawUniverse();
    }
});


