//Esse arquivo é como a Central de Comando da conexão entre o seu Frontend e o Google. Ele serve para:

//1. Inicializar o "Túnel" de Comunicação. O Firebase não fica conectado o tempo todo. O config.ts roda assim que o seu app inicia para abrir esse túnel. Ele usa as credenciais que você colocou no .env.local para provar que aquele site tem permissão para mexer no banco de dados "X".

//2. Evitar a Reinicialização (O erro do Next.js). Lembra que falamos do if (!firebase.apps.length)? O config.ts é o lugar onde essa lógica mora. Ele garante que, mesmo que você edite o código 50 vezes e a página dê "refresh", o app só se conecte ao Firebase uma única vez, economizando memória e evitando erros chatos no console.

//3. Exportar as Ferramentas Prontas. A parte mais importante é o export default. Em vez de você ter que configurar o Firebase em cada página do seu site, você faz tudo uma vez só no config.ts e exporta o banco já "pronto para o uso".

import firebase from "firebase"; //Importa o pacote principal (core) do Firebase.
import 'firebase/firestore'; //Aqui estamos ativando somente o módulo de banco de dados do Firestore no pacote principal.

if(!firebase.apps.length) { //Quer dizer: A lista de apps inicializados está vazia? OBS: Se for a 1° vez que o site carrega o tamanho da lista é 0, e o zero é falso em booleano, por isso a "!" no início torna esse valor 'true'. E inicia o código abaixo.
    firebase.initializeApp({ //firebase.initializeApp é o que inicializa o aplicativo. Note que temos {}, isso é o objeto com as "chaves da casa", os dados sensíveis que vc pegou do firebase no '.env.local'.
        apiKey: process.env.NEXT_PUBLIC_API_KEY, //É a chave de identificação da API. Diz qual projeto está fazendo a requisição.
        authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN, //Endereço oficial do seu projeto no Firebase (geralmente usado para sistemas de login).
        projectId: process.env.NEXT_PUBLIC_PROJECT_ID, //É o ID único do seu projeto.
    })
}

export default firebase;