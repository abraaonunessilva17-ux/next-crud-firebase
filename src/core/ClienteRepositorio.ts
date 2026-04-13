//Imagine que você está construindo um sistema e ainda não decidiu se vai usar Firebase, MongoDB ou apenas salvar tudo em um arquivo de texto. O ClienteRepositorio é o documento que diz: "Não importa qual banco de dados vamos usar, ele PRECISA ter essas três funções funcionando desse jeito". OBS: Esse é o arquivo que cria as "regras de backend". Isso é um dos conceitos mais importantes da Arquitetura de Software.

import Cliente from "./Cliente"; //Importamos o arquivo Cliente.ts.

export default interface ClienteRepositorio {
    salvar(cliente: Cliente): Promise<Cliente> //Você envia um cliente e ele te devolve o cliente salvo (geralmente agora com um ID gerado pelo banco).
    excluir(cliente: Cliente): Promise<void> //Você envia o cliente para deletar. O void significa que a promessa não devolve nenhum dado, apenas confirma que "está feito".
    obterTodos(): Promise<Cliente[]> //O TypeScript entende que o banco vai te devolver um Array (Vetor) contendo vários objetos Cliente. Isso porque vc usou [].
} //Aqui estamos importando essas 3 funções.


//Assim como o arquivo "Clientes.ts" da pasta core que é responsável por criar as regras do objeto "Cliente", esse arquivo aqui é responsável por criar as regras do backend! 