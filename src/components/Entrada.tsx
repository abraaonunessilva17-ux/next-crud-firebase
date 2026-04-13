//Esse componente será um input com superpoderes, pois no Next.js ele deve receber várias condições, e aqui haverá uma comunicação com o pai(Formulario.tsx) que será notificado quando algo for escrito no input, para que lá o estado seja alterado.

interface EntradaProps { //Usando TypeScript passamos para Entrada.tsx as propriedades que ele pode receber via props.
    tipo?: 'text' | 'number' //Receberá a propriedade tipo tendo 2 opções: text ou number.
    texto: string //Receberá a propriedade texto sendo do tipo 'string'.
    valor: any //Receberá qualquer outra prop.
    className?: string //Receberá propriedades css vindas do Pai Formulario no tipo string. É opcional.
    somenteLeitura?: boolean //Propriedade opcional usada para definir se um campo vai ser editável ou não, ex: Num campo "código" (ID) onde o usuário tem um id, nesse caso ele n seria editável, somente leitura, pois esse user viria do banco de dados. O boolean só serve para dizer que isso tudo é true ou false.
    valorMudou?: (valor: any) => void //Função (callback) que Entrada.tsx (Filho) usa para avisar o pai (Formulario.tsx) que o usuário digitou alguma coisa. O "?" diz que é opcional. (valor: any) indica o que o usuário digitou no input (nome ou número), e na verdade esse valor são funções 'setNome' e 'setIdade' que vieram de Formulario.tsx via prop para cá e que serão usadas para alterar os estados 'nome' e 'idade' lá no Pai. void é padrão.
}


export default function Entrada(props: EntradaProps) {
   return(
    <div className={`flex flex-col ${props.className}`}>
        <label className="mb-2">
           {props.texto}
        </label>
        <input 
        type={props.tipo ?? 'text'}
        value={props.valor} 
        readOnly={props.somenteLeitura}
        onChange={e => props.valorMudou?.(e.target.value)}
        className={`border border-purple-500 rounded-lg focus:outline-none bg-gray-100 px-4 py-2 ${props.somenteLeitura ? '' : 'focus:bg-white'}`}/> {/*No type temos uma condição que diz: Se n tiver a props.tipo vindo de Formulario.tsx para cá, então o type é "string".*/} {/*No onChange temos {e => props.valorMudou?..} isso no input é o que vai avisar o Pai(Formulario.tsx) que foi inserido um valor no input seja pra editar um cliente, ou para inserir um novo! E quando isso chega no Pai os estados 'nome' ou 'idade' são alterados, e isso faz o input funcionar.*/} {/*No className temos uma condição ${props.somenteLeitura..} que diz, se for somenteLeitura n faz nada, mas se não for coloca no foco essa cor 'bg-white'.*/}
    </div>
   )
}

//OBS: Perceba que nesse exercício criamos um 'input' com superpoderes!! Pois se antes no React normal nós fazíamos um input funcionar de forma simples e às vezes dentro do próprio componente de Form.jsx, dessa vez criamos um componente complexo para os inputs! Fizemos com que ele recebesse condições de leitura, condições de tipo, e até condições de comunicação. 

//Isso foi necessário pois estamos subindo de nível, e é assim que grandes sistemas com os do Facebook, Netflix ou Aribnb trabalham.