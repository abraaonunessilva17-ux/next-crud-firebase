/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}"],
  safelist: [
      {
        pattern: /^bg-/, // Libera todas as classes de background
      },
      {
        pattern: /^to-/, // Libera todas as cores finais do gradiente
      },
      {
        pattern: /^from-/, // Libera todas as cores iniciais do gradiente
      },
    ],
  theme: {
    extend: {},
  },
  plugins: [],
}

//Abaixo mostra o que fizemos acima, inserimos isso pois existe um bug quando o site está em modo de produção, por algum motivo o botão não fica com a cor desejada e nem recebe o padrão 'cinza'. Mas isso resolve. Observe:
/*
 safelist: [
      {
        pattern: /^bg-/, // Libera todas as classes de background
      },
      {
        pattern: /^to-/, // Libera todas as cores finais do gradiente
      },
      {
        pattern: /^from-/, // Libera todas as cores iniciais do gradiente
      },
    ],
*/