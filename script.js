let mensagens = [];
let participantes = [];

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

}

function entrarNaSala() {
  carregarMensagens();
  carregarParticipantes();
}

function carregarMensagens(){

}

function carregarParticipantes(){
    
}

function mostrarMensagens(){
    //Exibir messagens no HTML
}

function mostrarParticipantes(){        
    //Exibir participantes no HTML
}