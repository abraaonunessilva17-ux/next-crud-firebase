import { useState } from "react";
import Entrada from "./Entrada"; //Importamos o componente Entrada.tsx porque ele é filho de Formulario, e o mesmo mandará para cá os dados digitados no input.
import Botao from "./Botao"; //Importamos o componente Botao.tsx porque ele é filho de Formulario.
import Cliente from '../core/Cliente'; //Importamos o arquivo Cliente.ts que está na pasta "core", pois precisamos das regras dele.

interface FormularioProps { //Com o TypeScript estaremos usando os dados do nosso objeto Cliente.
    cliente: Cliente //Esse é o objeto "Cliente".
    clienteMudou?: (cliente: Cliente) => void //Prop opcional. É a função que envia o novo Cliente completo de volta para o banco de dados quando clicamos em "Salvar". OBS: Ele recebe de index.tsx a função 'salvarCliente'.
    cancelado?: () => void; //Propriedade opcional que recebe de index.tsx a prop 'cancelado' que permitirá com o botão, alternar do formulário para a tabela. OBS: Ele recebe a função 'setVisivel' de index.tsx que altera o estado entre form e tabela.
}

export default function Formulario(props: FormularioProps) {
    const id = props.cliente?.id //id aqui armazena a condição que diz: "Cliente" tem um 'id' setado? OBS: Isso porque 'id' é opcional dentro de Cliente, se tiver, quer dizer que o dado veio do banco de dados, se n é porque é um cliente novo.
    const [nome, setNome] = useState(props.cliente?.nome ?? '') //Temos uma condição no valor inicial que diz: Tente acessar o nome dentro do objeto cliente, isso será nulo/undefined se for um "cliente Novo", se for um existente funcionará. Se n for "edição" o estado 'nome' começa com string vazia, se for "edição" o estado 'nome' começa com o nome do cliente.
    const [idade, setIdade] = useState(props.cliente?.idade ?? 0) //A mesma coisa aqui, se for modo "edição" 'idade' começará com a idade do cliente se não for, começará em 'zero'.
    return(
        <div className="bg-gray-200 p-4 rounded-md">
            {id ? (
                <Entrada
                somenteLeitura
                texto="Código" 
                valor={id}
                className="mb-4" />
            ) : false} {/*Aqui temos uma renderização condicional, se o 'id' estiver setado renderizamos essa "Entrada", se não, retorna false. OBS: Isso se dará ao clicar em editar cliente, nesse caso já tem 'id' e cai nesse caso, se clicar em novo cliente será falso.*/} {/*Note que passamos como prop 'somenteLeitura' para que não seja possível alterar nada aqui, e a prop valor recebe o 'id' do cliente.*/}

            <Entrada texto="Nome" valor={nome} valorMudou={setNome} className="mb-4" /> {/*Note que o valor dessa entrada input é o estado 'nome' que pode ser vazio se for cliente novo, ou o nome do cliente se for um que já veio do banco. Note que a prop 'valorMudou' envia {setNome}, lá em Entrada.tsx, ela captura o que foi digitado no input, e quando isso vem pra cá é usado para alterar o estado e mostrar o digito na tela.*/}
            <Entrada texto="Idade" tipo="number" valor={idade} valorMudou={setIdade} /> {/*Note que o valor dessa entrada input é o estado 'idade' que pode ser zero se for cliente novo, ou a idade do cliente se for um que já veio do banco. Note que a prop 'valorMudou' envia {setIdade}, lá em Entrada.tsx ela captura o que foi digitado no input, e quando isso vem pra cá é usado para alterar o estado e mostrar o digito na tela.*/}
            <div className="flex justify-end smt-7 pt-4 pb-2">
                <Botao cor="blue" className="mr-2" onClick={() => props.clienteMudou?.(new Cliente(nome, idade, id))}> {/*Note no onClick, estamos passando a 'prop.clienteMudou' que indica quando editamos ou criamos um cliente novo, então se for true criaremos um novo cliente com 'nome', 'idade' e 'id'.*/}
                    {id ? 'Alterar' : 'Salvar'} {/*Condição que diz: Se tiver id/modo edição então o nome do botão será 'Alterar' se não tiver id o nome será 'Salvar'. */}
                </Botao>
                <Botao onClick={props.cancelado}> {/*Note o onClick aqui, ele recebe a prop 'cancelado' vindo de index.tsx para cá, e isso vai ativar a alternância do Fomulário para a tabela.*/}
                    Cancelar
                </Botao>
            </div>
        </div>
    )
}

//Preste muita atenção no 'valorMudou' usado como prop que é mandado para as intâncias de <Entrada />, pois na realidade ela está mandando a função 'setNome' ou 'setIdade' para Entrada.tsx. E lá Entrada irá usá-la para capturar o que é digitado e mandar de volta pra cá, chegando aqui esse dígito vai alterar os estados 'nome' e 'idade' e fará os inputs funcionarem na tela.

//Note o 'cancelado' no TypeScrip lá em cima, pois ele recebe a função 'setVisivel' que vem de index.tsx via prop para cá! E é usado no botão 'cancelar' para alternar do formulário para a tabela.

//Note o 'clienteMudou' no TypeScript lá em cima, pois ele recebe a função 'salvarCliente' que vem de index.tsx via prop para cá! E é usado no botão "Salvar"/"Atualizar" para mandar esse cliente para o banco de dados.
