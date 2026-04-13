import Titulo from "./Titulo"; //Importamos Titulo.tsx pois ele será organizado em Layout.

interface LayoutProps { //Imagine que você está criando uma caixa (o Layout). Esse 'interface' aqui é a etiqueta do lado de fora da caixa dizendo o que tem que ter dentro dela para ela funcionar.
    titulo: string //Você está dizendo que, quem usar o Layout, obrigatoriamente precisa passar um texto (string) para o título.
    children: any //O children é uma palavra mágica no React. Ela serve para quando você quer colocar um componente dentro do outro, tipo: <Layout> <Conteudo /> </Layout>. O any diz que pode ser qualquer coisa (um texto, outro componente, uma lista, etc.).
} //Obs, para que essas props fossem opcionais você deveria passar "?" depois da prop. Ex titulo?: string.

export default function Layout(props: LayoutProps) { //Usamos (props: LayoutProps) pois assim dizemos que o 'props' TEM que seguir o molde que criamos ali em cima em 'interface'. Pois assim quando no index.tsx você esquecer que Layout REQUER um título, o Typescript vai lembrar vc.
    return(
        <div className={`
        flex flex-col w-2/3 
        bg-white text-gray-800 rounded-md
        `}> {/*Temos classes Tailwind. flex-> deixar flexbox, flex-col -> deixar em column, w-2/3 -> Usa 2/3 da largura da página, g-white -> fundo branco, text-gray-800 -> cor do texto, rounded-md -> bordas arredondadas.*/}
            <Titulo>{props.titulo}</Titulo> {/*Importamos <Titulo> aqui, e usamos {props.titulo} para pegar a propriedade "titulo" que é passado para Layout em index.tsx. E depois é mandada para o Titulo.tsx.*/}
            <div className="p-6"> {/*p-6 é um padding que aplicamos em toda a div.*/}
               {props.children} {/*Isso pega todo o conteúdo inserido dentro de <Layout > no index.tsx.*/}
            </div>

        </div>
    )
}