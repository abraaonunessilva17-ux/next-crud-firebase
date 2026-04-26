//Lembre que na pasta core temos o arquivo 'ClienteRepositorio.ts', é lá que ficam as regras do "backend", isto é, é lá que vai dizer o que o back vai precisar: funções 'salvar', 'excluir', 'obterTodos'. E esse arquivo aqui (ColecaoCliente.ts) é o que executa essas regras! OBS: Como o back é o do Firebase, é aqui que criaremos o código que conversa com o Firebase.

import firebase from "../config"; //Importamos isso porque ele é o "Coração" da conexão com o bando de dados 'firebase'. Ele serve como o túnel que conecta o nosso app com o banco, pois é lá que estão os dados da API.
import Cliente from "../../core/Cliente"; //Importamos a classe Cliente da pasta core.
import ClienteRepositorio from "../../core/ClienteRepositorio"; //Importamos o arquivo que guarda as regras do backend.


export default class ColecaoCliente implements ClienteRepositorio { //Note o 'implements', isso diz que a classe ColecaoCliente está 'assinando o contrato' que criei com 'ClienteRepositorio' que é onde estão as regras do backend.

    //Logo abaixo teremos um conversor, como nesse projeto temos o nosso "Mundo do TypeScript" (nosso app) onde usamos a classe Cliente que tem seus métodos, tipos e um jeito de ser criada (new Cliente..), temos o "Mundo do Firestore"(Nuvem), em que o Google não conhece a classe Cliente e só entende documentos de texto/JSON. Por isso precisamos disso, para mandar para o banco os nossos dados de forma que ele entenda, e para recebê-los de forma que nosso app entenda.
    #conversor = { //Deixamos como privado.
        toFirestore(cliente: Cliente) { //Do nosso app para o Google. Note abaixo que transformamos o "Cliente" em um objeto simples que o banco de dados consege guardar.
            return {
                nome: cliente.nome,
                idade: cliente.idade
            } //Aqui montamos o Cliente em forma de objeto normal. OBS: Não passamos id aqui, ele será gerado do lado do servidor (firestore) e virá para cá.
        },
        fromFirestore(snapshot: firebase.firestore.QueryDocumentSnapshot, options: firebase.firestore.SnapshotOptions): Cliente {
            const dados = snapshot.data(options)
            return new Cliente(dados.nome, dados.idade, snapshot?.id)
        } //Aqui é do Google para o app. Quando buscamos um dado no banco, o Google devolve um 'snapshot' (uma foto do dado). Ela pega os dados brutos (sapshot.data()), pega o ID que estava na etiqueta do documento (snapshot.id) e remonta o objeto usando o seu molde: new Cliente. O "?" é pra evitar a quebra do código case o documento n tenha um ID. OBS: o id foi gerado no servidor, e veio para o Cliente aqui.
    }

    async salvar(cliente: Cliente): Promise<Cliente> {
        if(cliente?.id) { //Se cliente já possui id(modo editar), então faça abaixo..
            await this.#colecao().doc(cliente.id).set({
                nome: cliente.nome,
                idade: cliente.idade
            } as any); //Em #colecao no documento(doc), no cliente(cliente.id) aplique 'set(cliente)' que substitui o antigo pelo novo.
            return cliente //Ao término, delvolve o cliente para que saibamos que terminou.
        } else {
            const docRef = await this.#colecao().add({
                nome: cliente.nome,
                idade: cliente.idade
              } as any); //Se não tem id(novo cliente), em #colecao aplicamos o método '.add(cliente)' para adicionar o novo cliente no banco. OBS: docRef nesse processo todo está pedindo do Google um 'id' para o novo cliente.
            const doc = await docRef.get(); //doc está agora devolvendo esse documento com o id para o 'frontend'. OBS: esse doc é o 'snapshot' dos dados.
            return doc.data(); //Retornamos o novo 'Cliente' prontinho já covertido e com id preenchido.
        }
    } //Usamos 'async' pois essa função que vem de 'clienteRepositorio' usa Promise. No parâmetro o (cliente: Cliente) diz: Para isso funcionar, preciso entregar um objeto do tipo Cliente. O 'Promise<Cliente>' quer dizer que como o dado vem do (Google/Firebase) então temos a 'promessa' de que teremos o objeto <Cliente> depois de alguns milissegundos.

    async excluir(cliente: Cliente): Promise<void> {
        return this.#colecao().doc(cliente.id).delete() //#colecao mostra do documento(doc) que veio do back (firestore) o (cliente.id) pois usaremos id para saber qual apagar, e nele aplicamos o 'delete()'.

    } //Para "excluir" funcionar precisamos do objeto 'Cliente' para saber qual 'excluir', e a Promise dele não retorna nada(void) pois o dado será simplemente excluído. OBS: Mesmo n retornando nada <void>, mas usamos 'return' pois nele virá uma 'confirmação de exclusão'.

    async obterTodos(): Promise<Cliente[]> {
        const query = await this.#colecao().get(); //#colecao é a gaveta de clientes, usamos '.get()' para acessá-la. O query armazena isso.
        return query.docs.map(doc => doc.data()) ?? []; //query.docs é a lista que possui cada "pasta" (documento) vinda do banco, fazemos um '.map' em cada pasta e retornamos os dados deles. OBS: Cada pasta vai mostrar os dados de seus clientes.
        //OBS: O "?? []" no fim é uma segurança, pois se a lista estiver vazia (em casos onde o app acabou de iniciar e n tiver clientes), evita de dar erro na tela.

    } //obterTodos pede a lista de todos os clientes[], mas note que ele não precisa do objeto 'Cliente'.

    #colecao() {
        return firebase.firestore().collection('clientes').withConverter(this.#conversor)
    } //Como precisamos da conversão feita pelo "#conversor" que criamos acima em cada uma dessas funções (salvar, excluir e obterTodos), criamos '#colecao' como facilitador, que evita que chamemos o conversor em cada função.
}