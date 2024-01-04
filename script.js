document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('starCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    const starInfo = document.getElementById('starInfo');
    const introText = document.getElementById('introText');
    const userInput = document.getElementById('userInput');
    const delayedTextInput = document.getElementById('delayedTextInput');
    let currentStar = null;
    let starCount = 0;
    let isMouseOverStar = false;
    let lineOpacity = 1;

    const emotionColors = {
        "Feliz": "yellow",
        "Triste": "#0078ff",
        "Empolgado": "red",
        "Pensativo": "green"
    };
    
    

    setTimeout(function() {
        const introText = document.getElementById('introText');
        const intermediateText = document.getElementById('intermediateText');
        
        introText.style.display = 'none';
        intermediateText.style.display = 'block';
    }, 2000); // 5000 milissegundos = 5 segundos

    // Exibir o delayedText após o segundo intervalo
    setTimeout(function() {
        const intermediateText = document.getElementById('intermediateText');
        const delayedText = document.getElementById('delayedText');

        intermediateText.style.display = 'none';
        delayedText.style.display = 'block';
    }, 6000); // 10000 milissegundos = 10 segundos

    let stars = [];

    for (let i = 0; i < 100; i++) {
        stars.push(createStar(canvas, ctx, stars, starInfo));
    }

    document.addEventListener('click', function(event) {
        if (!event.target.classList.contains('star')) {
            starInfo.style.display = 'none';
        }
    });
    
    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            thirdText.style.display = 'none'; // Oculta o terceiro texto
            document.getElementById('introBackground').style.display = 'none'; // Opcional: oculta o fundo preto
            // Aqui você pode adicionar qualquer outra ação que deseja executar após pressionar Enter
            if (isSpaceFree(event.pageX, event.pageY, stars)) {
                const newStar = createStar(canvas, ctx, stars, starInfo, event.pageX, event.pageY);
                stars.push(newStar);
            }
        }
    });

    delayedTextInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            const thirdTextH1 = document.getElementById('thirdText').querySelector('h1');
            const delayedTextInputValue = document.getElementById('delayedTextInput').value;
            
            // Atualiza o texto dentro do <h1> em thirdText
            thirdTextH1.textContent = `I’m feeling ${delayedTextInputValue} because ...`;
    
            const thirdText = document.getElementById('thirdText');  
            const delayedText = document.getElementById('delayedText');
     
            delayedText.style.display = 'none'; // Oculta delayedText
            thirdText.style.display = 'block'; // Mostra thirdText
        }
    });
    
    document.addEventListener('dblclick', function(event) {
        if (isSpaceFree(event.pageX, event.pageY, stars)) {
            const newStar = createStar(canvas, ctx, stars, starInfo, event.pageX, event.pageY);
            stars.push(newStar);
        }
    });

// ESTRELAS
    function createStar(canvas, ctx, stars, starInfo, x = Math.random() * canvas.width, y = Math.random() * canvas.height) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
    
        // Aumente esses valores para aumentar o tamanho das estrelas
        const minSize = 40; // Antes era 10
        const maxSize = 80; // Antes era 30
        const size = minSize + Math.random() * (maxSize - minSize); // Isso dará um tamanho entre 20 e 60
    
        // Definindo um tamanho inicial maior para a estrela
        const initialSize = 100; // Antes era 50
        star.style.width = `${initialSize}px`;
        star.style.height = `${initialSize}px`;
    
        // Reduzindo o tamanho após um curto período
        // Reduzindo o tamanho após um curto período
        setTimeout(() => {
            const finalSize = Math.random() * 6 + 2; // Antes era Math.random() * 3 + 1
            star.style.width = `${finalSize}px`;
            star.style.height = `${finalSize}px`;
        }, 5000); // 1000 milissegundos = 1 segundo para o efeito de diminuição
    
        starCount++;
        console.log(`Número de Estrelas: ${starCount}`);

        star.addEventListener('mouseover', () => {
            isMouseOverStar = true;
            lineOpacity = 1;
            drawLines(ctx, stars, star);
        });
        
        star.addEventListener('mouseout', () => {
            isMouseOverStar = false;
        });
    
    
        // Atribuir uma emoção fixa para cada estrela
        const emotions = ["Feliz", "Triste", "Empolgado", "Pensativo"];
        const starEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        star.setAttribute('data-emotion', starEmotion);
        const starColor = emotionColors[starEmotion];
        star.style.backgroundColor = starColor; // Aplicar a cor à estrela

        star.setAttribute('data-emotion', starEmotion);
    
        star.addEventListener('mouseover', () => {
            isMouseOverStar = true;
            lineOpacity = 1;
            drawLines(ctx, stars, star);
        });
    
        star.addEventListener('mouseout', () => {
            isMouseOverStar = false;
        });
    
        star.addEventListener('click', function(event) {
            currentStar = this; // Armazena a estrela atual
            event.stopPropagation();
            starInfo.style.display = 'block';
            starInfo.style.left = `${event.pageX}px`;
            starInfo.style.top = `${event.pageY}px`;
    
            const emotion = star.getAttribute('data-emotion');
            starInfo.innerHTML = `Informações da Estrela:<br>Coordenada X: ${event.pageX}<br>Coordenada Y: ${event.pageY}<br>Emoção: ${emotion}<br>Motivo:`;
        });
    
        document.body.appendChild(star);
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

    //Não definida
    function createAndAddStar() {
        const newStar = createStar(canvas, ctx, stars, starInfo);
        stars.push(newStar);
    }

    //Linha de Emoção
    function drawLines(ctx, stars, currentStar) {
        if (!isMouseOverStar) {
            lineOpacity -= 0.01;
            if (lineOpacity < 0) {
                lineOpacity = 0;
            }
        } else {
            lineOpacity = 1;
        }
    
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        if (lineOpacity > 0 && currentStar) {
            const currentEmotion = currentStar.getAttribute('data-emotion');
            const connectedStars = stars.filter(star => star.getAttribute('data-emotion') === currentEmotion);
    
            if (connectedStars.length > 0) {
                ctx.beginPath();
                ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`; // Linha branca com a opacidade atual
                ctx.moveTo(currentStar.offsetLeft + currentStar.offsetWidth / 2, currentStar.offsetTop + currentStar.offsetHeight / 2);
    
                connectedStars.forEach(targetStar => {
                    ctx.lineTo(targetStar.offsetLeft + targetStar.offsetWidth / 2, targetStar.offsetTop + targetStar.offsetHeight / 2);
                    ctx.moveTo(targetStar.offsetLeft + targetStar.offsetWidth / 2, targetStar.offsetTop + targetStar.offsetHeight / 2);
                });
    
                ctx.stroke();
            }
        }
    }
    

// Carrossel typing Effect
    class TypeWriter {
        constructor(txtElement, words, wait = 3000) {
          this.txtElement = txtElement;
          this.words = words;
          this.txt = '';
          this.wordIndex = 0;
          this.wait = parseInt(wait, 8);
          this.type();
          this.isDeleting = false;
        }
      
        type() {
          // Current index of word
          const current = this.wordIndex % this.words.length;
          // Get full text of current word
          const fullTxt = this.words[current];
      
          // Check if deleting
          if(this.isDeleting) {
            // Remove char
            this.txt = fullTxt.substring(0, this.txt.length - 1);
          } else {
            // Add char
            this.txt = fullTxt.substring(0, this.txt.length + 1);
          }
      
          // Insert txt into element
          this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
      
          // change color for data-text
          this.txtElement.innerHTML = `<span class="txt" style="color: #e2000f;">${this.txt}</span>`;
      
          // Initial Type Speed
          let typeSpeed = 100;
      
          if(this.isDeleting) {
            typeSpeed /= 2;
          }
      
          // If word is complete
          if(!this.isDeleting && this.txt === fullTxt) {
            // Make pause at end
            typeSpeed = this.wait;
            // Set delete to true
            this.isDeleting = true;
          } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            // Move to next word
            this.wordIndex++;
            // Pause before start typing
            typeSpeed = 300;
          }
      
          setTimeout(() => this.type(), typeSpeed);
        }
    }
    function init() {
        const txtElement = document.querySelector('.txt-type');
        const words = JSON.parse(txtElement.getAttribute('data-words'));
        const wait = txtElement.getAttribute('data-wait');
        // Init TypeWriter
        new TypeWriter(txtElement, words, wait);
    }

    // Função para converter cores hexadecimais em valores RGB
    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : null;
    }
    
    function animate() {
        requestAnimationFrame(animate);
        if (!isMouseOverStar) {
            drawLines(ctx, stars, currentStar);
        }
    }

    animate();
});


