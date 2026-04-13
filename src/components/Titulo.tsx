export default function Titulo(props) {
    return(
        <div className="flex flex-col justify-center">
            <h1 className="px-5 py-2 text-2xl">{props.children}</h1> {/*Aqui {props.children} está sendo usado para pegar de forma dinâmica o 'titulo' que foi passado para <Layout titulo=""> no index.tsx. Ou seja, Layout.tsx importa Titulo.tsx nele, e index.tsx passa a prop titulo pra Layout que manda pra Titulo.tsx.*/}
            <hr className="border-2 border-purple-500"/>
        </div>
    )
}
//Note que usamos classes do Tailwind nas tags jsx acima. Note as "flex, flex-col, justify-center" na div principal e "px-5 e py-2" que são 'paddings', o "text-2xl" usados na h1. Usamos também a classe "border-2" na tag hr.