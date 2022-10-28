let mensagens = [];
let participantes = [];

let test = axios.get("https://mock-api.driven.com.br/api/v6/uol/messages")
console.log(test);

perguntarNome();

function perguntarNome() {
  nome = prompt("Digite seu nome para começarmos:");
  registrarParticipante(nome);
}

function registrarParticipante(nome){
    const dados = { name: nome };
    const requisicao = axios.post("https://mock-api.driven.com.br/api/v6/uol/participants", dados);
    requisicao.then(entrarNoChat);
    requisicao.catch(perguntarNome);
    //Colocar no servidor dados do participante atual   
}

function entrarNoChat(){
    carregarMensagens();
    carregarParticipantes();
}

function carregarMensagens(){

}

function carregarParticipantes(){

}

function atualizarMesagens(){

}

function atualizarParticipantes(){
    
}

function mostrarMensagens(){
    //Exibir messagens no HTML
}

function enviarMensagem(){
    //Enviar messagem e exibir-la ao chat
}

function mostrarParticipantes(){        
    //Exibir participantes no HTML
}