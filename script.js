let mensagens = [];
let participantes = [];
let nome;
let destinatario = "Todos";
let tipoMensagem = "message";

const requi = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");

function registrarParticipante(){
    const nomeInput = document.querySelector(".input-nome");    
    nome = nomeInput.value ;
    const dados = { name: nome};
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", dados);
    requisicao.then(entrarNoChat);
    requisicao.catch(errorEntrar);
    //Colocar no servidor dados do participante atual   
}

function errorEntrar(){
    alert("Ocorreu um error ao entrar.\nVerifique sua conexão ou\nse o nome é válido.");
}

function entrarNoChat(){
    const login = document.querySelector(".login");
    login.classList.add("disable");

    const header = document.querySelector("header");
    header.classList.remove("disable");

    const main = document.querySelector("main");
    main.classList.remove("disable");

    const footer = document.querySelector("footer");
    footer.classList.remove("disable");

    carregarMensagens();
    carregarParticipantes();

    atualizarMesagens();
    atualizarParticipantes();
}

function carregarMensagens(){
    const requisicao = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages");
    requisicao.then(processarMensagens);
}

function processarMensagens(resposta) {
    mensagens = [];
  
    for (let i = 0; i < resposta.data.length; i++) {
      const mensagem = resposta.data[i];
      mensagens.push(mensagem);
    }
  
    mostrarMensagens();
  }

function carregarParticipantes(){
    //Atualizar Lista de Participantes
}

function processarParticipantes(resposta){
    //Processamento de Participantes
}

function atualizarMesagens(){
    setInterval(carregarMensagens, 3000);
}

function atualizarParticipantes(){
    setInterval(carregarParticipantes, 10000);
}

function mostrarMensagens(){
    const ul = document.querySelector(".mensagens-container");
    let html = "";
  
    for (let i = 0; i < mensagens.length; i++) {
      const mensagem = mensagens[i];
  
      html += `
        <li class="${mensagem.type}">
          ${
            mensagem.time !== undefined
             ? `<span class="time">(${mensagem.time})</span>`
             : ``
          }
          <span>
            <strong>${mensagem.from}</strong>
          </span>
          ${
            mensagem.type === "private_message"
             ? `<span> reservadamente para </span>`
             : `<span> para </span>`
          }
          <strong>${mensagem.to}</strong>
          <span>${mensagem.text}</span>
        </li>
      `;
    }
  
    ul.innerHTML = html;
  
    setTimeout(() => document.querySelector(".mensagens-container li:last-child").scrollIntoView(), 0);
}

function enviarMensagem(){
    //Enviar messagem
}

function mostrarParticipantes(){        
    //Exibir participantes no HTML
}