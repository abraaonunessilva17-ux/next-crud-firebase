interface BotaoProps { //Usamos isso para que o TypeScript diga o que o botão deve receber.
    cor?: 'green' | 'blue' | 'gray' //Estamos passando um atributo opcional "cor", é opcional pelo uso do "?": E as únicas cores que devem ter são 'green', 'blue' e 'gray'.
    className?: string //Atributo opcional que será uma className do tipo 'string' que será mandado de index.tsx para Botao.tsx. OBS: Será usado pra ter uma classe css dinâmica no botão.
    children: any //Dizemos que pode ter no botão qualquer (any) tipo de dado via props.
    onClick?: () => void //Atributo opcional que recebe de index.tsx a prop 'onClick' que permitirá com o botão, alternar da tabela para o formulário. OBS: Ele recebe a função 'setVisivel' de index.tsx que altera o estado entre form e tabela.
}

const cores = { //Como o Tailwind naõ funciona bem com classes dinâmicas usadas com %{}, decidimos montar as classes por inteiro aqui.
    green: 'from-green-400 to-green-700', //Note que criamos uma classe inteira com valores.
    blue: 'from-blue-400 to-blue-700',
    gray: 'from-gray-400 to-gray-700',
}

export default function Botao(props: BotaoProps) {
    const corEscolhida = cores[props.cor ?? 'gray'] //Criamos a variável 'corEscolhida' que armazena uma condição, ela usa a base da const "cores" se tiver uma "props.cor" vinda de index.tsx essa cor imbutida será usada no botão, se não, usará 'gray' como padrão.
    return(
        <button className={`
        bg-gradient-to-r ${corEscolhida} text-white px-4 py-2 rounded-md ${props.className}`} onClick={props.onClick}> {/*Note a ${className}, isso é para substituir essas classes inseridas no botão caso seja passado uma className vinda de index.tsx para cá.*/} {/*Note a ${corEscolhida}, isso vai usar nesses espaços a propriedade 'cor' se vier uma de index.tsx para cá, se não a cor será "gray".*/} {/*Note a onClick={props..} ela está recebendo a 'onClick' que veio do index.tsx para cá via prop, e isso vai ativar a alternância entre tabela para form.*/}
            {props.children} {/*Usamos isso caso queiramos passar algo para o botão como um ícone.*/}
        </button>
    )
}