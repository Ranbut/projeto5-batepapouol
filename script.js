const urlAPI = 'https://mock-api.driven.com.br/api/v6/uol/';

let nome, nomeReservado;

let idIntervalAtualizaStatus, idIntervalMensagem;

function toggleMenu(){
    const fundo_menu = document.querySelector('.menu-fundo');
    const menu = document.querySelector('.menu');

   
    fundo_menu.classList.toggle('fundo-escondido');
    menu.classList.toggle('escondido');
}

function renderizarMensagens(resposta){
    console.log(resposta);    

    const listaDeMensagens = resposta.data;

    // pegar o ul das mensagens
    const container = document.querySelector('.mensagens-container');

    // limpar o contudo que esta dentro dessa ul
    container.innerHTML = '';

    // percorrer o array de mensagens, pegar cada mensagem e adicionar na ul
    for(let i = 0; i < listaDeMensagens.length; i++){
        
        let mensagem = listaDeMensagens[i];

        let template;
        
        if ( mensagem.to !== 'Todos'){
        
            template = `
                <li class="conversa-publica"  data-test="message">
                    <span class="horario">( ${mensagem.time} )</span>
                        <strong>${mensagem.from}</strong>
                        <span> para </span>
                        <strong>${mensagem.to}: </strong>
                    <span>${mensagem.text}</span>
                </li>            
            `;

        }else if ( mensagem.from === null ){
            
            template = `
                <li class="entrada-saida"  data-test="message">
                    <span class="horario">( ${mensagem.time} )</span>
                    <strong>( ${mensagem.from} )</strong>          
                    <span>${mensagem.text}</span>            
                </li>
            `;

        }else if ( mensagem.to === 'Todos'){
            template= `
                <li class="conversa-privada"  data-test="message">
                    <span class="horario">( ${mensagem.time} )</span>
                        <strong>${mensagem.from}</strong>
                            <span> reservadamente para </span>
                        <strong>${mensagem.to}: </strong>
                    <span>${mensagem.text}</span>
                </li>
            `;
        }

        container.innerHTML += template;

    }

    // posicionar na ultima mensagem
    const ultimaMensagem = document.querySelector('.mensagens-container li:last-child');
    console.log(ultimaMensagem);
    ultimaMensagem.scrollIntoView();

}

function carregarMensagens(){
    console.log('enviando o pedido');
    // promise da função carregarMensagens - escopo é local 
    const promise = axios.get(`${urlAPI}messages`);
    promise.then(renderizarMensagens);
}

function erroRegistroUsuario(erro){
    console.log(erro);
}

function registrouUsuario(resposta){
    console.log(resposta);    
}

function registrarUsuario(){

    // promise da função registrarUsuario - escopo local
   const novoUsuario = {name:nome};

   const promise = axios.post(`${urlAPI}participants`, novoUsuario);
   promise.catch(erroRegistroUsuario);
   promise.then(registrouUsuario);
    
}

function erroAtualizarStatus(erro){
    console.log('Erro ao atualizar status');
    console.log(erro);
}

function sucessoAtualizarStatus(resposta){
    console.log('Status atualizado');
    console.log(resposta);
}

function atualizarStatus(){
    const promise = axios.post(`${urlAPI}status`, {name:nome});
    promise.catch(erroAtualizarStatus);
    promise.then(sucessoAtualizarStatus);
}

function renderizarParticipantes(resposta){

    console.log('Renderizando participantes');
    console.log(resposta);
    
    const listaParticipantes = document.querySelector('.contatos');

    // inserindo o elemento para todos os particpantes
    listaParticipantes.innerHTML = `
    <li class="visibilidade-publico selecionado" onclick = "selecionarDestinatario('Todos', this)" >
        <ion-icon name="people"></ion-icon><span class="nome">Todos</span><ion-icon class="check" name="checkmark-outline">
        </ion-icon>
    </li>  
    `;

    for( let i = 0; i < resposta.data.length; i++){
        let participante = resposta.data[i];

        listaParticipantes.innerHTML += `
            <li class="visibilidade-publico" onclick = "selecionarDestinatario('${participante.name}', this)">
                <ion-icon name="person-circle"></ion-icon><span class="nome">${participante.name}</span><ion-icon class="check" name="checkmark-outline">
                </ion-icon>
            </li>        
        `;
    }

}

function carregarParticipantes(){

    const promise = axios.get(`${urlAPI}participants`);
    promise.then(renderizarParticipantes);
    
}

function erroEnviarMensagem(erro){
    console.log('Ocorreu um erro ao enviar a mensagem');
    console.log(erro);
}

function sucessoEnviarMensagem(resposta){
    console.log('Mensagem enviada com sucesso');
    console.log(resposta);
}

function enviarMensagem(){
    // pegar o texto que o usuario digitou
    const texto = document.querySelector('.input-mensagem').value;
    // criar um objeto mensagem
    const novaMensagem = {
        from: nome,
	    to: nomeReservado,
	    text: texto,
	    type: "message" // ou "private_message" para o bônus
    }
    // enviar essa mensagem com axios
    const promise = axios.post(`${urlAPI}messages`, novaMensagem);
    promise.catch(erroEnviarMensagem);
    promise.then(sucessoEnviarMensagem);
}

function selecionarDestinatario(participante, elemento){
    
    nomeReservado = participante;

    console.log(participante);
    console.log(elemento);
    elemento.classList.toggle('selecionado');

}

function carregarChat(){

    nome = prompt("Qual é o seu nome?");    

    registrarUsuario();
    carregarMensagens();
    carregarParticipantes();

    idIntervalAtualizaStatus = setInterval(atualizarStatus, 5000);
    idIntervalMensagem = setInterval(carregarMensagens, 3000);
}

carregarChat();