# [Driven Education](https://www.driven.com.br/) - Projeto 5 - Bate-Papo UOL

[Acesse o site clicando aqui!](https://ranbut.github.io/projeto5-batepapouol/);

# Descrição

Seu terceiro projeto com JavaScript será a implementação de um bate-papo totalmente funcional, inspirado no saudoso Bate-Papo UOL. Mas evite usar o site real da UOL como referência, pois apesar de inspirado nele, nossa interface é totalmente diferente :)

[API Chat UOL](https://www.notion.so/API-Chat-UOL-872c0f7c250741718dea2767139ecdc3)

# Requisitos

- Geral
    - [X]  Não utilize nenhuma biblioteca para implementar este projeto (jquery, lodash, react, etc), nem outras linguagens que compilem para JS (TypeScript, Clojure, ELM, etc), somente JavaScript puro
    
    - [X]  Seu projeto deverá ser desenvolvido utilizando Git e GitHub, em um repositório público
    - [X]  **A cada requisito implementado** faça um commit com uma mensagem descritiva do que você evoluiu
    
- Layout
    - [X]  Aplicar layout para mobile.
    
- Chat
    - [X]  Ao entrar no site, este deve carregar as mensagens do servidor e exibi-las conforme layout fornecido
    - [X]  Existem 3 tipos de mensagem:
        - Mensagens de status (**Entrou** ou **Saiu** da sala): deve ter o fundo cinza
        - Mensagens reservadas (**Reservadamente**): deve ter o fundo rosa
        - Mensagens normais: devem ter o fundo branco
    - [X]  A cada 3 segundos o site deve re-carregar as mensagens do servidor para manter sempre atualizado
    - [X]  O chat deverá ter rolagem automática por padrão, ou seja, sempre que novas mensagens forem adicionadas ao final do chat ele deve scrollar para o final
        
    - [X]  As mensagens com **Reservadamente** só devem ser exibidas se o nome do destinatário for igual ao nome do usuário que está usando o chat (ou senão ele poderia ver as mensagens reservadas para outras pessoas)
        - Obs: Fazer essa filtragem no front-end não é uma boa prática, o ideal seria o servidor não fornecer essas mensagens para outras pessoas. Manteremos dessa forma por fins didáticos :)
    
- Entrada na sala
    - [X]  Ao entrar no site, o usuário deverá ser perguntado com um `prompt` ****seu lindo nome
    - [X]  Após inserção do nome, este deve ser enviado para o servidor pra cadastrar o usuário
        - Caso o servidor responda com sucesso, o usuário poderá entrar na sala
        - Caso o servidor responda com erro, deve-se pedir para o usuário digitar outro nome, pois este já está em uso
    - [X]  Enquanto o usuário estiver na sala, a cada 5 segundos o site deve avisar ao servidor que o usuário ainda está presente, ou senão será considerado que "Saiu da sala"
- Envio de mensagem
    - [X]  Ao enviar uma mensagem, esta deve ser enviada para o servidor
        - Caso o servidor responda com sucesso, você deve obter novamente as mensagens do servidor e atualizar o chat
        - Caso o servidor responda com erro, significa que esse usuário não está mais na sala e a página deve ser atualizada (e com isso voltando pra etapa de pedir o nome)
        
    - [X]  Nesse envio, deve ser informado o remetente, o destinatário e se a mensagem é reservada ou não.
        - Escolher um destinário e se a mensagem é reservada ou pública é um **requisito bônus** (ver abaixo). Logo, se você não implementar o bônus, sempre envie destinatário como **Todos** e a mensagem como **pública**.

# API Chat UOL

Chegou a hora de implementar a comunicação com o servidor no projeto!

- Entrar na sala
    
    Para entrar na sala, deve-se enviar ao servidor o nome do usuário. Para isso, envie uma requisição `POST` para a URL:
    
    ```jsx
    https://mock-api.driven.com.br/api/v6/uol[/participants](https://mock-api.bootcamp.respondeai.com.br/api/v2/uol/participants) 
    ```
    
    Enviando um objeto no formato:
    
    ```jsx
    {
      name: "João"
    }
    ```
    
    O servidor pode responder com status `400` se já houver um usuário online com esse nome. Se for o caso, a aplicação deve pedir um novo nome até que o servidor responda com status `200`.
    
- Manter conexão
    
    O servidor precisa saber que o usuário continua online. Se o usuário não envia nenhuma mensagem, como ele pode inferir se o usuário continua ou não na página?
    
    Para resolver isso, o servidor espera que seu sistema avise continuamente que o usuário permanece utilizando o chat. Para isso, o sistema deve enviar uma requisição `POST` para a URL:
    
    ```jsx
    https://mock-api.driven.com.br/api/v6/uol/status
    ```
    
    Enviando um objeto no formato
    
    ```jsx
    {
      name: "João"
    }
    ```
    
    enviando o nome do usuário que foi pedido ao entrar na página.
    
    Esta requisição deve ser feita a cada 5s. 
    
- Buscar mensagens
    
    Para buscar mensagens do servidor, mande uma requisição `GET` para a URL:
    
    ```jsx
    https://mock-api.driven.com.br/api/v6/uol/messages
    ```
    
    A resposta será um array de objetos, como o seguinte:
    
    ```jsx
    [
    	{
    		from: "João",
    		to: "Todos",
    		text: "entra na sala...",
    		type: "status",
    		time: "08:01:17"
    	},
    	{
    		from: "João",
    		to: "Todos",
    		text: "Bom dia",
    		type: "message",
    		time: "08:02:50"
    	},
    ]
    ```
    
    Nos objetos, o campo `type` identifica o tipo da mensagem. Existem os seguintes valores:
    
    - `status`: mensagem de estado, como entrou ou saiu da sala
    - `message`: mensagem pública
    - `private_message`: mensagem particular
- Enviar mensagens
    
    Para enviar mensagens, você deve fazer uma requisição `POST` para a URL:
    
    ```jsx
    https://mock-api.driven.com.br/api/v6/uol/messages
    ```
    
    Nesta requisição, você deve enviar um objeto como o seguinte:
    
    ```jsx
    {
    	from: "nome do usuário",
    	to: "nome do destinatário (Todos se não for um específico)",
    	text: "mensagem digitada",
    	type: "message" // ou "private_message" para o bônus
    }
    ```
    

- **BÔNUS**: Buscar participantes
    
    Para buscar a lista de participantes, envie uma requisição `GET` para a URL:
    
    ```jsx
    https://mock-api.driven.com.br/api/v6/uol/participants
    ```
    
    Esta requisição retornará um array de objetos no formato:
    
    ```jsx
    [
    	{
    		name: "João"
    	},
    	{
    		name: "Maria"
    	}
    ]
    ```

# Bônus (opcional)

- Participantes ativos
    - [ ]  Ao clicar no ícone superior direito de participantes, o menu lateral deve abrir por cima do chat conforme layout. Um fundo escuro semi-transparente deve ficar por cima do chat.
    - [ ]  Ao clicar no fundo escuro, o menu lateral deve ser ocultado novamente
    - [ ]  O site deve obter a lista de participantes assim que entra no chat e deve atualizar a lista a cada 10 segundos
    - [ ]  Ao clicar em uma pessoa ou em público/reservadamente, a opção clicada deve ser marcada com um check e as demais desmarcadas
    - [ ]  Além do check acima, ao trocar esses parâmetros também deve ser alterada a frase que informa o destinatário, que fica embaixo do input de mensagem
    - **Para facilitar a correção do projeto** 🙂
        
        Para agilizarmos a correção dos projetos e dar um feedback mais rápido para vocês, adicione o que está sendo pedido abaixo nos seus elementos:
        
        - Nos elementos que representam um participante, adicione o atributo `data-identifier="participant"`
        - Nos elementos que identificam a visibilidade, adicione o atributo `data-identifier="visibility"`
        
        Com as configurações acima conseguimos automatizar parte da correção do projeto, acelerando o feedback.
        
- Tela de entrada
    - [ ]  Em vez de um prompt, faça uma tela inicial, seguindo o layout abaixo
        - Layout
    - **Para facilitar a correção do projeto** 🙂
        
        Para agilizarmos a correção dos projetos e dar um feedback mais rápido para vocês, adicione o que está sendo pedido abaixo nos seus elementos:
        
        - No elemento em que digitamos o nome, adicione o atributo `data-identifier="enter-name"`
        - No botão de entrar no chat, adicione o atributo `data-identifier="start"`
        
        Com as configurações acima conseguimos automatizar parte da correção do projeto, acelerando o feedback.
        
- Envio com enter
    - [ ]  Faça com que, caso o usuário tecle Enter no campo de mensagem, ela seja enviada (ou seja, deve ter o mesmo comportamento caso o usuário clique no botão de envio)
