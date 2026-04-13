import { useState, useEffect } from "react";
import Layout from "../components/Layout"; //Importamos Layout.tsx aqui pois ele será aninhado aqui.
import Tabela from "../components/Tabela"; //Importamos Tabela.tsx pois ele será aninhado aqui.
import Botao from '../components/Botao'; //Importamos Botao.tsx pois ele será aninhado em Layout.
import Formulario from '../components/Formulario'; //Importamos Formulario.tsx pois ele será aninhado em Layout.
import Cliente from "../core/Cliente"; //Importamos Cliente.ts aqui pois é aqui que passaremos o "molde" dessa classe para a Tabela.tsx.
import ColecaoCliente from "../backend/db/ColecaoCliente"; //Importamos ColecaoCliente pois é o arquivo que usa as regras do backend 'firestore' para as funções do projeto.
import ClienteRepositorio from "../core/ClienteRepositorio"; //Importamos ClienteRepositorio pois é o arquivo que dita as "regras" do backend.
export default function Home() {
  const repo: ClienteRepositorio = new ColecaoCliente() //A const repo deve se comportar como o 'ClienteRepositorio' manda, pois é nele que temos as funções 'salvar', 'excluir' e 'obterTodos'. Já 'new ColecaoCliente' está criando uma instância dessa classe que se conecta com as "regras" do back. OBS: resumindo, estamos criando instâncias da classe ColecaoCliente que usa ClienteRepositorio para conversar do seu front com o back.

  const [clientes, setClientes] = useState<Cliente[]>([]); //Estado criado para guardar os clientes que virem do banco de dados. O <Cliente[]> quer dizer que só será aceito um Array onde cada ítem segue o modelo da classe "Cliente". E o '[]' no fim quer dizer que começa com uma lista vazia.

  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio()); //Esse estado serve para garantir que quando alguém abrir o form para um novo cliente, os campos não venham com "lixo" de uma edição anterior, ou para que os campos fiquem vazios. Mas também serve para levar um cliente para a "edição". O 'Cliente.vazio()' está sendo chamado do arquivo Cliente.ts quando criamos esse facilitador, pra evitar de limpar de outra forma.

  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela'); //Estado que guarda a visualização do formulário e da tabela, o valor inicial está setado 'tabela'. Usamos Union Type(TypeScript) para restringir os valores de estado para somente 'tabela' e 'form'. Fazer isso evita erros de digitação que geram bugs. OBS: Estamos usando SPA aqui, pois n trocamos URL ao mudar de form pra tabela e etc. 

  useEffect(obterTodos, []) //Usamos um useEffect para que a lista seja mostrada assim que a tela recarregar.
  function obterTodos() { //Função para obter a lista.
    repo.obterTodos().then(clientes => {
      setClientes(clientes) //Em repo chamamos a função 'obterTodos' contida nela para trazer todos os Clientes, mas estamos usando .then porque como os dados levam certo 'tempo' para vir, assim que chegarem usaremos a 'setClientes' para inserir eles no estado Clientes.
      setVisivel('tabela') //E inserimos isso para voltar para tabela.
    })
  }
  
  function clienteSelecionado(cliente: Cliente){
    console.log(cliente.nome)
    setCliente(cliente); //Usamos setCliente que é a função que leva um cliente para a edição. o (cliente) nele faz com que o botão saiba qual cliente editar. Na real, estamos mandando o setCliente para o componente da Tabela.tsx que lá o usará no botão 'editar' para mandar um cliente para edição.
    setVisivel('form') //Usamos isso para que assim que o botão "editar" mande o usuário para o form, que seja mostrado o form.
  } //Função criada para ativar botão de "editar" cliente, que será passado para "Tabela.tsx" via props. Passamos (cliente: Cliente) como parâmetro para que lá na tabela o React saiba qual cliente editar.

  function novoCliente() { //OBS: Essa acontece ao mesmo tempo e é irmã de 'clienteSelecionado'.
    setCliente(Cliente.vazio()) //Isso é o que deixa os campos do formulario vazios quando você inicia um novo form.
    setVisivel('form') //Isso é para que seja renderizado o form assim que for limpos os campos.
  } //Essa função serve para limpar dos campos do form os dados da edição anterior. O 'Cliente.vazio()' está sendo chamado do arquivo Cliente.ts quando criamos esse facilitador. OBS: Ela acontece no momento em que você clica em editar.

  async function clienteExcluido(cliente: Cliente) {
  await repo.excluir(cliente); //repo usa a função ".excluir()" contida nela, e como parâmetro passamos o objeto cliente para ela funcionar.

  obterTodos(); //Invocamos obterTodos porque nela contém a função que volta para a lista depois da exclusão. Ela serve para verificar a lista salva na tabela.

  } //Função criada para ativar botão de "lixo", que será passado para "Tabela.tsx" via props. Passamos (cliente: Cliente) como parâmetro para que lá na tabela o React saiba qual cliente apagar.

  async function salvarCliente(cliente: Cliente) {
    await repo.salvar(cliente); //repo usa a função ".salvar()" contida nela, e como parâmetro passamos o objeto cliente para ela funcionar.

    obterTodos(); //Invocamos obterTodos porque nela contém a função que volta para a lista depois da edição. Ela serve para verificar a lista salva na tabela.

  } //Função criada para salvar cliente, seja ele novo ou editado do banco de dados. Note que temos como parâmetro o objeto 'cliente'. Isso será passado via props para 'Formulario.tsx'. Que lá vai usar isso no onClick do botão "Salvar" ou "Alterar", e teremos um novo cliente.

  return (
    <>
      <div className={`
        flex h-screen justify-center items-center bg-gradient-to-r from-blue-500 to-purple-500 text-white`}>
        <Layout titulo="Cadastro Simples">
         {visivel === 'tabela' ? (
           <>
           <div className="flex justify-end">
           <Botao cor="green" className="mb-4" onClick={novoCliente}>Novo Cliente</ Botao> {/*Note que no onClick do botão chamamos a {novoCliente} porque ela é a função que fica no botão "Novo Cliente" da tabela e que abre o formulário e que limpa os campos da última edição.*/}
           </div>
           
           <Tabela clientes={clientes} clienteSelecionado={clienteSelecionado} clienteExcluido={clienteExcluido} /> {/*Passamos para Tabela.tsx a prop 'clientes={clientes}' criada acima com as instâncias de novos clientes.*/}
           </>
         ) : (
          <Formulario cliente={cliente} cancelado={() => setVisivel('tabela')} clienteMudou={salvarCliente}/>
         )} {/*Note acima que fizemos uma render condicional! Pois temos {visivel === tabela...}, com isso dizemos: Se o estado 'visivel' for (tabela) note que renderizamos os componentes da tabela (<Botao />, <Tabela />), se não for, renderizamos o componente (<Formulario />) */} {/*Note que passamos no <Formulario /> a prop 'cancelado' que manda para o form a função setVisivel('tabela') que por sua vez renderiza a tabela. Isso para que o botão "cancelar" do form mande a pessoa para a tabela.*/} {/*Note que passamos a prop 'clienteMudou' para Formulario.tsx, e mandamos nessa prop a função 'salvarCliente' que lá será importado no 'onClick' do botão "Salvar"/"Alterar", e é lá esse novo cliente será gerado com nome, idade e id.*/} {/*Note na prop 'cliente' que passamos para <Formulario /> nela mandamos o estado 'cliente', que é o que vai deixar os campos do form limpos quando o iniciarmos.*/}
        </Layout>

      </div>
    </>
  );
}

//Note que passamos a prop "titulo" para o componente Layout.tsx, o mesmo vai mandar isso para o componente Titulo.tsx via props.children.

//Note que aninhamos Tabela.ts dentro de Layout.tsx, pois a tabela é um conteúdo que deve ser englobado em Layout.

//Note que fizemos algo novo! Uma renderização condicional da tabela e do formulário. Fizemos da seguinte forma, criamos um estado 'visivel' ajustada com TypeScipt para somente os valores 'tabela' e 'form'. Depois no aninhamento criamos uma condicional onde 'se o estado (visivel) fosse 'tabela' seriam renderizados os componentes disso, e se não fosse, seriam renderizado o componente formulário. Fizemos assim pois temos um SPA, e não usaremos links pra mudar de um para o outro.

//Note que fizemos algo semelhante no componente <Formulario />, como o mesmo possui um botão de "cancelar" que na prática deve fechar o form e renderizar de novo a tabela, nós passamos para ele via props a 'cancelado'. Essa prop 'cancelado' irá para o componente do Formulário, e lá será usada no onClick do botão 'cancelar' trocando do form para a tabela.

//Note que criamos a função que 'salva' um novo cliente, que na prática será chamada pelo botão do formulário! Pois este é o componente que cria um novo cliente ou que atualiza um cliente existente no banco de dados. Ela é passada via props 'clienteMudou' para o <Formulario />, e lá o form irá salvar o que foi digitado nos inputs, criando assim um novo Cliente.

/*Antes de criarmos o componente Tabela, nosso anihamento estava assim:
<Layout titulo="Cadastro Simples">
          <span>Conteúdo</span> //Usamos <span> como uma forma de simular um componente de 'conteúdo'. E o que tiver aqui vai ser o conteúdo passado para Layout.tsx. E Layout.tsx receberá isso por meio do props.children.
          </Layout>
*/

//OBS: A última etapa do projeto era mudar as funções daqui para pastas 'hooks' separadas, para que a lógica delas ficasse em outro lugar deixando esse componente mais limpo, faça isso nos outros projetos, pois aqui ajuda mais você desse jeito.