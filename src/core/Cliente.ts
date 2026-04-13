//Essa página é o coração (Core) da aplicação, aqui não lidamos com a "casca" (o visual com HTML/CSS). Note que usamos '.ts' e não '.tsx' na extensão desse arquivo, porque ele é de lógica pura

//Essa pasta "core" serve para guardar as "Regras de Negócio". É onde você define como os dados do seu sistema devem se comportar, independente se você está usando React, Vue ou até mesmo se o site está fora do ar.

export default class Cliente { //Essa class cliente é um "molde", antes você lidava com nomes e idades soltos. Agora, você criou  um objeto oficial chamado "Cliente". Toda vez que o seu sitema falar de um cliente, ele seguirá esse padrão exato.
    #id: string //string é único tipo de valor que id pode ter, definimos com TypeScript.
    #nome: string //string é o único tipo de valor que nome pode ter, definimos isso com TypeScript.
    #idade: number //number é o único tipo de valor que idade pode ter, definimos isso com TypeScript
    
    //OBS: OS "#" antes dos nomes é uma funcionalidade moderna do JavaScript/TypeScript chamada Atributos Privados. Eles impedem que alguém fora da classe Cliente mude o nome do cliente diretamente, ex: cliente.nome = "Mudei". Usamos isso porque nos garante que só conseguimos acessar esses valores pelos "getters" que criamos abaixo.

    constructor(nome: string, idade: number, id: string = null) {
        this.#nome = nome
        this.#idade = idade
        this.#id = id
    } //constructor é a função que 'nasce' com o objeto. Quando você fizer "new Cliente("João", 30)", o construtor pega esses valores e guarda nas variáveis privadas. Note o (id: string = null), isso diz que o ID é opcional (bom quando o cliente ainda não foi salvo no Firebase e não possui ID ainda).

    static vazio() {
        return new Cliente('', 0)
    } //Isso é um facilitador. Em vez que você escrever new Cliente('', 0) toda vez que precisar de um cliente limpo (para um formulário de "Novo Cliente", por exemplo) você só chama Cliente.vazio().

    get id() { //Esse é um Getter. Isso permite que você "leia" o valor (ex: console.log(cliente.nome)), mas como não existem "setters", você não pode alterá-los por acidente.
        return this.#id
    }

    get nome() { //Esse é um Getter. Isso permite que você "leia" o valor (ex: console.log(cliente.nome)), mas como não existem "setters", você não pode alterá-los por acidente.
        return this.#nome
    }

    get idade() { //Esse é um Getter. Isso permite que você "leia" o valor (ex: console.log(cliente.nome)), mas como não existem "setters", você não pode alterá-los por acidente.
        return this.#idade
    }
}