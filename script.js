
const btnNao = document.getElementById("btn-nao");
const body = document.body;
const somFundo = document.getElementById("musica-fundo");
const somVitoria = document.getElementById("musica-vitoria");

let contadorDesvios = 0;

btnNao.addEventListener("mouseover", function() {

    contadorDesvios++;

    btnNao.style.position = "absolute";
    // Gera posições aleatórias para X e Y baseadas no tamanho da janela
    // Subtraímos um pouco (ex: 100px) para o botão não sair da tela
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);

    // Aplica as novas coordenadas ao botão
    btnNao.style.left = x + "px";
    btnNao.style.top = y + "px";

    if (contadorDesvios === 3) {
        // Chama a função para mostrar o emoji cobrando
        mostrarEmojiCobranca();
    }

// --- NOVO: Efeito Visual ---
    // Muda a cor para um vermelho de "erro" temporariamente
    btnNao.style.backgroundColor = "#ff4d4d"; 
    btnNao.style.color = "white";

    // Dá uma leve aumentada para dar susto
    btnNao.style.transform = "scale(1.2)";

    // Depois de 0.2 segundos, volta ao normal (cinza)
    setTimeout(() => {
        btnNao.style.backgroundColor = "#e0e0e0";
        btnNao.style.color = "#757575";
        btnNao.style.transform = "scale(1)";
    }, 200);

});

function aceitou() {

    somFundo.pause();
    somFundo.currentTime = 0;

    somVitoria.play();

    // 1. Dispara os confetes!
    confetti({
        particleCount: 150, // Quantidade de confetes
        spread: 100,         // Espalhamento
        origin: { y: 0.6 }   // Origem (um pouco abaixo do topo)
    });
    const conteudoDiv = document.getElementById("conteudo")

    conteudoDiv.innerHTML = `
        <div style="padding: 10px; text-align: center;">
            
            <h2 style="color: #d63384; margin-bottom: 5px; font-size: 26px; font-weight: 600;">
                Aceitou o menor quente! &lt;3
            </h2>

            <img src="aceitou.png" alt="Emoji muito feliz" id="emoji-aceitou"
                 style="width: 300px; height: auto; margin: 20px 0;">

            <p style="color: #757575; font-size: 18px; line-height: 1.6; margin: 0; padding: 0 10px;">
                Que bom que aceitou, agora oficialmente a minha pretinha, 
                <span style="color: #d63384; font-weight: 600;">te amo gostosa!</span>
            </p>

        </div>
    `;
    
    const emojiCobranca = document.getElementById("emoji-cobranca-container");
    if (emojiCobranca) emojiCobranca.remove();
    
}

// Função para iniciar a música de fundo na primeira interação
function iniciarMusica() {
    const somFundo = document.getElementById("musica-fundo");
    somFundo.play().catch(error => {
        console.log("Autoplay bloqueado pelo navegador, aguardando clique.");
    });
}

// Tenta tocar quando o mouse se move pela primeira vez
document.addEventListener('mousemove', iniciarMusica, { once: true });

// Tenta tocar quando o usuário clica em qualquer lugar pela primeira vez
document.addEventListener('click', iniciarMusica, { once: true });

function mostrarEmojiCobranca() {
    // 1. Cria o container para o emoji
    const container = document.createElement("div");
    container.id = "emoji-cobranca-container";

    // 2. Cria a imagem do emoji (emoji-cobranca.png)
    const imgCobranca = document.createElement("img");
    imgCobranca.src = "emojiCobranca.png";
    imgCobranca.alt = "Emoji Cobrando";

    // 3. Monta e adiciona o container ao corpo da página
    container.appendChild(imgCobranca);
    body.appendChild(container);

    // 4. Adiciona uma animação de "aparecer" (fade-in)
    container.style.opacity = "0";
    container.style.transition = "opacity 0.5s ease-in-out";
    
    // Pequeno delay para a transição funcionar
    setTimeout(() => {
        container.style.opacity = "1";
    }, 100);
}

function criarCoracao() {
    // 1. Cria o elemento da imagem do coração
    const coracao = document.createElement("span");
    coracao.innerText = "❤️"; // Usamos o emoji diretamente!
    coracao.classList.add("coracao-emoji"); // Classe para o CSS

    // 2. Define posição e tamanho aleatórios
    const tamanhoAleatorio = Math.random() * (30 - 15) + 15; // Entre 15px e 30px
    const posicaoAleatoria = Math.random() * 100; // Entre 0% e 100% da largura

    coracao.style.fontSize = tamanhoAleatorio + "px";
    coracao.style.left = posicaoAleatoria + "vw"; // 'vw' é largura da viewport
    
    // 3. Define rotação aleatória inicial para dar charme
    coracao.style.transform = `rotate(${Math.random() * 360}deg)`;

    // 4. Adiciona o coração ao corpo da página
    document.body.appendChild(coracao);

    // 5. Remove o coração após a animação terminar (para não pesar o navegador)
    setTimeout(() => {
        coracao.remove();
    }, 15000); // 15 segundos (mesmo tempo da animação CSS)
}

// 6. Programa para criar um novo coração a cada 0.8 segundos (800ms)
// Aumente este número para MENOS corações, diminua para MAIS corações.
setInterval(criarCoracao, 800);
