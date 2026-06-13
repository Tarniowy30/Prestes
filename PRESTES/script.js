// JavaScript do Projeto Prestes

document.addEventListener("DOMContentLoaded", function () {
  console.log("JavaScript do projeto Prestes carregado com sucesso!");

  const ano = document.getElementById("anoAtual");
  if (ano) {
    ano.textContent = new Date().getFullYear();
  }

  const botoes = document.querySelectorAll("button");

  botoes.forEach(function (botao) {
    botao.addEventListener("click", function () {
      console.log("Botão clicado:", botao.textContent);
    });
  });
});