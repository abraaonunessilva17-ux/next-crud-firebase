import Cliente from "../core/Cliente"; //Importamos o arquivo 'Cliente.ts' que é o "Core" da nossa aplicação. Pois para renderizar a tabela precisaremos dos dados do cliente.
import { IconeEdicao, IconeLixo } from "./Icones"; //Importamos aqui os ícones de edição e de lixo do arquivo Icones.tsx.

interface TabelaProps { //Imagine que você está criando uma caixa (o Layout). Esse 'interface' aqui é a etiqueta do lado de fora da caixa dizendo o que tem que ter dentro dela para ela funcionar.
   clientes: Cliente[] //Determinamos que esse valor deve ser uma lista de clientes em array.
   clienteSelecionado? : (cliente: Cliente) => void //O TypeScript não está apenas pedindo um dado como um (número ou um texto), ele está pedindo uma ação (função) que o "index.tsx" vai mandar para a "Tabela.tsx". o "?" que significa opcional, ou seja, se você n passar uma ação de "selecionar" no index.tsx, a tabela vai funcionar mas o botão de editar n fará nada. OBS: O (cliente: Cliente) promete entregar um objeto do tipo 'Cliente' como presente.
   clienteExcluido? : (cliente: Cliente) => void
}

export default function Tabela(props: TabelaProps) { //Usamos TabelaProps aqui pois como definimos acima: clientes é um Cliente[], ou seja uma lista de clientes em array. Então como essa lista virá de index.tsx para cá via 'props', isso garante que será mesmo uma lista não um cliente isolado.

    const exibirAcoes = props.clienteExcluido || props.clienteSelecionado; //Criamos essa condição para que a coluna "Ações" onde ficam os botões seja mostrada se qualquer uma dessas funções forem passadas para 'Tabela.tsx' no Index.tsx.

    function renderizarCabecalho() {
        return(
            <tr>
              <th className="text-left p-4">Código</th>
              <th className="text-left p-4">Nome</th>
              <th className="text-left p-4">Idade</th>
              {exibirAcoes ? <th className="p-4">Ações</th> : false}
            </tr>
        )
    } //tr -> table-row/linha da tabela. th -> table-header/Cabeçalho da tabela. Serve pra definir a célula de cabeçalho. OBS: Note que criamos uma função 'renderizarCabecalho()' para renderiza somente a linha da tabela. Note temos {exibirAcoes}.. isso é uma condição ternária que criamos pra const 'exibirAcoes' criada no topo, que renderiza a coluna "Ações" somente se uma das duas funções lá tiverem sido passadas para 'Tabela.tsx' de Index.tsx.

    function renderizarDados() { //Essa função é o "motor da tabela". Pois transforma uma lista de objetos "invisíveis" em linhas de HTML visíveis.
        return props.clientes?.map((cliente, i) => { //Aqui o "?" (Optional Chaining) evita erro se a lista estiver vazia ou nula, se não tiver isso e a lista vier vazia o js trava. "cliente" é um 'ítem' de clientes. "i" é o índice do cliente.
            //Executamos o 'map' para cada cliente encontrado, e transformamos ele na renderização abaixo.
            return(
                <tr key={cliente.id} className={`${i % 2 === 0 ? 'bg-purple-200' : 'bg-purple-100'}`}>
                    <td className="text-left p-4">{cliente.id}</td>
                    <td className="text-left p-4">{cliente.nome}</td>
                    <td className="text-left p-4">{cliente.idade}</td>
                    {exibirAcoes ? renderizarAcoes(cliente) : false}
                </tr>
            ) //Note que passamos uma chave única para cada linha/item <tr>, que é o 'id' em "Key". Útil se precisarmos deletar um ítem. OBS: <td> -> Table header são as células de conteúdo de cada ítem. OBS: Note que usamos uma condição na tag <tr> para que se o ítem for 'par' ele terá uma cor, e se não, terá outra. Perceba que no fim fazemos com que cada item renderize as ações que são os botões de editar e excluir. Note no fim onde temos {exibirAcoes..} é a condição que só mostra a coluna "ações" que tem os botões somente se qualquer um dos botões forem passados para Tabela.tsx lá no index.tsx.
        })
    }

    function renderizarAcoes(cliente: Cliente) { //Note que passamos cliente: Cliente no parâmetro, fizemos isso porque assim damos aos botões editar/excluir acesso a todas as informações daquele cliente específico(ID, nome, idade). Pois cada cliente terá seus botões.
        return(
            <td className="flex justify-center">
                {props.clienteSelecionado ? (
                    <button onClick={() => props.clienteSelecionado?.(cliente)} className={`flex justify-center items-center text-green-600 rounded-full hover:bg-purple-50 p-2 m-1`}>{IconeEdicao}</button>
                ): false } {/*No ternário acima temos que se função clienteSelecionado n encontra uma função de "selecionar" no index.jsx passado para Tabela, é false e não renderiza o botão. E no botão invocamos a função com onClick.*/}
              
              {props.clienteExcluido ? (
                     <button onClick={() => props.clienteExcluido?.(cliente)} className={`flex justify-center items-center text-red-500 rounded-full hover:bg-purple-50 p-2 m-1`}>{IconeLixo}</button>
              ): false}
            </td>
        )
    }

    return(
        <div>
          <table className="w-full rounded-xl overflow-hidden">
           <thead className={`
            text-gray-100 bg-gradient-to-r from-purple-500 to-purple-800`}>
              {renderizarCabecalho()}
           </thead>
           <tbody>
              {renderizarDados()}
           </tbody>
          </table>
        {/*thead -> React obriga usar isso entre o <tr> e <table>. OBS: <thead> invoca a rendrizarCabecalho() que renderiza os títulos.*/}
        {/*tbody -> invoca a renderizarDados() que renderiza os valores id, nome e idade.*/}
        {/*Note que deixamos a renderização mais componentizada, pois aqui em <thead> apenas invocamos a função que renderiza o cabeçalho da tabela, e a mesma coisa com <tbody>.*/}
        </div>
    )
}

//As classes Tailwind que usamos foram: 

/* Em <table>: w-full --> esticar essa tag toda. rounded-xl --> deixar borda arredondada. overflow-hidden pra ajudar na borda arredondada.

Em <thead>: bg-gradient-to-r --> cria gradiente com direção à direita. text-gray-100 --> deixa o texto com cor cinza quase branco

Nas tags <th>: text-left --> deixar conteúdo na esquerda.
*/