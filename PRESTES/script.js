// ======================================================
// PROJETO PRESTES - ECO-VILA SIM
// Concurso Agrinho 2026
// Tema: Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente
// JavaScript puro - sem bibliotecas ou frameworks
// ======================================================

document.addEventListener("DOMContentLoaded", () => {
  // Estado principal do jogo/simulação
  const jogo = {
    ativo: false,
    dia: 1,
    totalDias: 5,
    clima: "Ensolarado",
    saudePlantas: 75,
    umidadeSolo: 55,
    totalPlantado: 10,
    agua: 70,
    biodiversidade: 60,
    tecnologia: 35,
    producao: 20,
    pontuacao: 0,
    visaoAldeao: false,
    historico: []
  };

  // Busca elementos por ID, classe ou texto do botão
  function pegarElemento(seletores) {
    for (const seletor of seletores) {
      const elemento = document.querySelector(seletor);
      if (elemento) return elemento;
    }
    return null;
  }

  function pegarBotaoPorTexto(texto) {
    const botoes = Array.from(document.querySelectorAll("button"));
    return botoes.find((botao) =>
      botao.textContent.trim().toLowerCase().includes(texto.toLowerCase())
    );
  }

  // Botões principais
  const btnIniciar =
    pegarElemento(["#btnIniciar", "#btnIniciarJogo", ".btn-iniciar"]) ||
    pegarBotaoPorTexto("Iniciar");

  const btnReiniciar =
    pegarElemento(["#btnReiniciar", "#btnReiniciarJogo", ".btn-reiniciar"]) ||
    pegarBotaoPorTexto("Jogar Novamente");

  const btnIrrigar =
    pegarElemento(["#btnIrrigar", "#irrigar", ".btn-irrigar"]) ||
    pegarBotaoPorTexto("Irrigar");

  const btnExpandir =
    pegarElemento(["#btnExpandir", "#expandir", ".btn-expandir"]) ||
    pegarBotaoPorTexto("Expandir");

  const btnAldeao =
    pegarElemento(["#btnAldeao", "#btnControlarAldeao", ".btn-aldeao"]) ||
    pegarBotaoPorTexto("Controlar Aldeão");

  const btnSairAldeao =
    pegarElemento(["#btnSairAldeao", "#sairAldeao", ".btn-sair-aldeao"]) ||
    pegarBotaoPorTexto("Sair da Visão");

  const btnAvancar =
    pegarElemento(["#btnAvancar", "#btnAvancarDia", ".btn-avancar"]) ||
    pegarBotaoPorTexto("Avançar Dia");

  // Campos do painel
  const campoTempo =
    pegarElemento(["#tempo", "#diaAtual", ".tempo"]);

  const campoClima =
    pegarElemento(["#clima", "#climaAtual", ".clima"]);

  const campoSaude =
    pegarElemento(["#saudePlantas", "#plantas", ".saude-plantas"]);

  const campoUmidade =
    pegarElemento(["#umidadeSolo", "#solo", ".umidade-solo"]);

  const campoPlantado =
    pegarElemento(["#totalPlantado", "#plantado", ".total-plantado"]);

  // Áreas opcionais
  const telaInicial =
    pegarElemento(["#telaInicial", ".tela-inicial", "#inicio"]);

  const telaJogo =
    pegarElemento(["#telaJogo", ".tela-jogo", "#jogo"]);

  const telaFim =
    pegarElemento(["#telaFim", "#fimDeJogo", ".fim-de-jogo"]);

  const mensagem =
    pegarElemento(["#mensagem", "#mensagemJogo", ".mensagem"]);

  const relatorio =
    pegarElemento(["#relatorio", "#relatorioFinal", ".relatorio"]);

  const historicoLista =
    pegarElemento(["#historico", "#listaHistorico", ".historico"]);

  // Cria uma área de mensagem caso o HTML não tenha uma
  const caixaMensagem = mensagem || criarCaixaMensagem();

  function criarCaixaMensagem() {
    const div = document.createElement("div");
    div.id = "mensagemJogo";
    div.setAttribute("aria-live", "polite");
    div.style.margin = "16px 0";
    div.style.fontWeight = "700";

    const main = document.querySelector("main") || document.body;
    main.appendChild(div);

    return div;
  }

  function mostrarMensagem(texto) {
    caixaMensagem.textContent = texto;
  }

  function limitar(valor, minimo, maximo) {
    return Math.max(minimo, Math.min(maximo, valor));
  }

  function sortearClima() {
    const climas = ["Ensolarado", "Chuvoso", "Seco", "Nublado", "Ventania"];
    const indice = Math.floor(Math.random() * climas.length);
    return climas[indice];
  }

  function atualizarPainel() {
    if (campoTempo) campoTempo.textContent = `Dia ${jogo.dia} / ${jogo.totalDias}`;
    if (campoClima) campoClima.textContent = jogo.clima;
    if (campoSaude) campoSaude.textContent = `${jogo.saudePlantas}%`;
    if (campoUmidade) campoUmidade.textContent = `${jogo.umidadeSolo}%`;
    if (campoPlantado) campoPlantado.textContent = `${jogo.totalPlantado} áreas`;

    atualizarHistorico();
  }

  function atualizarHistorico() {
    if (!historicoLista) return;

    historicoLista.innerHTML = "";

    jogo.historico.slice(-6).forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      historicoLista.appendChild(li);
    });
  }

  function registrarAcao(texto) {
    jogo.historico.push(`Dia ${jogo.dia}: ${texto}`);
    atualizarHistorico();
  }

  function iniciarJogo() {
    jogo.ativo = true;
    jogo.dia = 1;
    jogo.clima = "Ensolarado";
    jogo.saudePlantas = 75;
    jogo.umidadeSolo = 55;
    jogo.totalPlantado = 10;
    jogo.agua = 70;
    jogo.biodiversidade = 60;
    jogo.tecnologia = 35;
    jogo.producao = 20;
    jogo.pontuacao = 0;
    jogo.visaoAldeao = false;
    jogo.historico = [];

    if (telaInicial) telaInicial.style.display = "none";
    if (telaFim) telaFim.style.display = "none";
    if (telaJogo) telaJogo.style.display = "block";

    mostrarMensagem("Simulação iniciada! Equilibre produção, água, solo e biodiversidade.");
    registrarAcao("A Eco-Vila iniciou o planejamento sustentável.");
    atualizarPainel();
  }

  function irrigarSolo() {
    if (!jogo.ativo) {
      mostrarMensagem("Clique em Iniciar Simulação antes de jogar.");
      return;
    }

    if (jogo.agua < 10) {
      mostrarMensagem("Água insuficiente. Avance o dia e aguarde melhora no clima.");
      return;
    }

    jogo.agua = limitar(jogo.agua - 10, 0, 100);
    jogo.umidadeSolo = limitar(jogo.umidadeSolo + 18, 0, 100);
    jogo.saudePlantas = limitar(jogo.saudePlantas + 8, 0, 100);

    registrarAcao("Irrigou o solo de forma controlada.");
    mostrarMensagem("Solo irrigado. As plantas ficaram mais saudáveis, mas a água foi reduzida.");
    atualizarPainel();
  }

  function expandirLavoura() {
    if (!jogo.ativo) {
      mostrarMensagem("Clique em Iniciar Simulação antes de jogar.");
      return;
    }

    if (jogo.umidadeSolo < 25) {
      mostrarMensagem("O solo está seco demais para expandir a lavoura.");
      return;
    }

    jogo.totalPlantado += 5;
    jogo.umidadeSolo = limitar(jogo.umidadeSolo - 12, 0, 100);
    jogo.biodiversidade = limitar(jogo.biodiversidade - 4, 0, 100);
    jogo.producao = limitar(jogo.producao + 10, 0, 100);

    registrarAcao("Expandiu a lavoura com planejamento.");
    mostrarMensagem("Lavoura expandida. A produção aumentou, mas o solo precisa de cuidado.");
    atualizarPainel();
  }

  function controlarAldeao() {
    if (!jogo.ativo) {
      mostrarMensagem("Clique em Iniciar Simulação antes de jogar.");
      return;
    }

    jogo.visaoAldeao = true;
    jogo.tecnologia = limitar(jogo.tecnologia + 7, 0, 100);
    jogo.biodiversidade = limitar(jogo.biodiversidade + 5, 0, 100);

    document.body.classList.add("modo-aldeao");

    registrarAcao("Ativou a visão do aldeão para observar a fazenda de perto.");
    mostrarMensagem("Visão do aldeão ativada. A tecnologia e o monitoramento ambiental melhoraram.");
    atualizarPainel();
  }

  function sairVisaoAldeao() {
    jogo.visaoAldeao = false;
    document.body.classList.remove("modo-aldeao");

    registrarAcao("Saiu da visão do aldeão.");
    mostrarMensagem("Você voltou para a visão geral da Eco-Vila.");
    atualizarPainel();
  }

  function avancarDia() {
    if (!jogo.ativo) {
      mostrarMensagem("Clique em Iniciar Simulação antes de jogar.");
      return;
    }

    jogo.clima = sortearClima();

    if (jogo.clima === "Chuvoso") {
      jogo.umidadeSolo = limitar(jogo.umidadeSolo + 20, 0, 100);
      jogo.agua = limitar(jogo.agua + 15, 0, 100);
      jogo.biodiversidade = limitar(jogo.biodiversidade + 4, 0, 100);
      registrarAcao("Choveu e os recursos naturais se recuperaram.");
    }

    if (jogo.clima === "Seco") {
      jogo.umidadeSolo = limitar(jogo.umidadeSolo - 18, 0, 100);
      jogo.saudePlantas = limitar(jogo.saudePlantas - 10, 0, 100);
      registrarAcao("O clima seco exigiu atenção ao uso da água.");
    }

    if (jogo.clima === "Ensolarado") {
      jogo.saudePlantas = limitar(jogo.saudePlantas + 4, 0, 100);
      jogo.umidadeSolo = limitar(jogo.umidadeSolo - 8, 0, 100);
      registrarAcao("O sol ajudou as plantas, mas reduziu a umidade do solo.");
    }

    if (jogo.clima === "Nublado") {
      jogo.umidadeSolo = limitar(jogo.umidadeSolo - 3, 0, 100);
      jogo.saudePlantas = limitar(jogo.saudePlantas + 2, 0, 100);
      registrarAcao("O dia nublado manteve equilíbrio na lavoura.");
    }

    if (jogo.clima === "Ventania") {
      jogo.saudePlantas = limitar(jogo.saudePlantas - 7, 0, 100);
      jogo.biodiversidade = limitar(jogo.biodiversidade - 3, 0, 100);
      registrarAcao("A ventania prejudicou parte da plantação.");
    }

    calcularProducao();

    if (jogo.dia >= jogo.totalDias) {
      finalizarJogo();
      return;
    }

    jogo.dia++;
    mostrarMensagem(`Novo dia iniciado. Clima: ${jogo.clima}. Continue equilibrando produção e meio ambiente.`);
    atualizarPainel();
  }

  function calcularProducao() {
    const bonusSolo = jogo.umidadeSolo * 0.2;
    const bonusSaude = jogo.saudePlantas * 0.3;
    const bonusTecnologia = jogo.tecnologia * 0.15;
    const impactoAmbiental = jogo.biodiversidade * 0.15;

    jogo.producao = limitar(
      Math.round((jogo.totalPlantado * 1.2) + bonusSolo + bonusSaude + bonusTecnologia + impactoAmbiental),
      0,
      100
    );
  }

  function calcularPontuacaoFinal() {
    const equilibrioAmbiental = (jogo.umidadeSolo + jogo.saudePlantas + jogo.biodiversidade) / 3;
    const desenvolvimento = (jogo.producao + jogo.tecnologia) / 2;

    jogo.pontuacao = Math.round((equilibrioAmbiental * 0.55) + (desenvolvimento * 0.45));

    return jogo.pontuacao;
  }

  function finalizarJogo() {
    jogo.ativo = false;
    const pontos = calcularPontuacaoFinal();

    if (telaJogo) telaJogo.style.display = "none";
    if (telaFim) telaFim.style.display = "block";

    let classificacao = "";

    if (pontos >= 85) {
      classificacao = "Excelente! A Eco-Vila alcançou produção forte com equilíbrio ambiental.";
    } else if (pontos >= 70) {
      classificacao = "Bom resultado! A vila foi sustentável, mas ainda pode melhorar.";
    } else if (pontos >= 50) {
      classificacao = "Resultado regular. A produção aconteceu, mas o meio ambiente sofreu.";
    } else {
      classificacao = "Atenção! A vila precisa melhorar o equilíbrio entre produção e natureza.";
    }

    const textoRelatorio =
      `Pontuação final: ${pontos}/100. ` +
      `Produção: ${jogo.producao}%. ` +
      `Saúde das plantas: ${jogo.saudePlantas}%. ` +
      `Umidade do solo: ${jogo.umidadeSolo}%. ` +
      `Biodiversidade: ${jogo.biodiversidade}%. ` +
      classificacao;

    if (relatorio) {
      relatorio.textContent = textoRelatorio;
    }

    mostrarMensagem(textoRelatorio);
    registrarAcao("A simulação foi finalizada.");
    atualizarPainel();
  }

  // Eventos dos botões
  if (btnIniciar) btnIniciar.addEventListener("click", iniciarJogo);
  if (btnReiniciar) btnReiniciar.addEventListener("click", iniciarJogo);
  if (btnIrrigar) btnIrrigar.addEventListener("click", irrigarSolo);
  if (btnExpandir) btnExpandir.addEventListener("click", expandirLavoura);
  if (btnAldeao) btnAldeao.addEventListener("click", controlarAldeao);
  if (btnSairAldeao) btnSairAldeao.addEventListener("click", sairVisaoAldeao);
  if (btnAvancar) btnAvancar.addEventListener("click", avancarDia);

  // Atalhos de teclado para melhorar acessibilidade
  document.addEventListener("keydown", (evento) => {
    if (!jogo.ativo) return;

    if (evento.key === "1") irrigarSolo();
    if (evento.key === "2") expandirLavoura();
    if (evento.key === "3") controlarAldeao();
    if (evento.key === "4") avancarDia();
    if (evento.key === "Escape") sairVisaoAldeao();
  });

  // Ano automático no rodapé, caso exista
  const anoAtual = document.querySelector("#anoAtual");
  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  atualizarPainel();
});