// ======================================================
// PROJETO PRESTES - ECO-VILA SIM
// Concurso Agrinho 2026
// JavaScript puro - sem bibliotecas ou frameworks
// ======================================================

document.addEventListener("DOMContentLoaded", function () {
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

  const btnIniciar = document.getElementById("btnIniciarJogo");
  const btnReiniciar = document.getElementById("btnReiniciarJogo");
  const btnIrrigar = document.getElementById("btnIrrigar");
  const btnExpandir = document.getElementById("btnExpandir");
  const btnAldeao = document.getElementById("btnControlarAldeao");
  const btnSairAldeao = document.getElementById("btnSairAldeao");
  const btnAvancar = document.getElementById("btnAvancarDia");

  const campoTempo = document.getElementById("tempo");
  const campoClima = document.getElementById("clima");
  const campoSaude = document.getElementById("saudePlantas");
  const campoUmidade = document.getElementById("umidadeSolo");
  const campoPlantado = document.getElementById("totalPlantado");

  const telaJogo = document.getElementById("telaJogo");
  const telaFim = document.getElementById("telaFim");
  const mensagemJogo = document.getElementById("mensagemJogo");
  const relatorioFinal = document.getElementById("relatorioFinal");
  const listaHistorico = document.getElementById("listaHistorico");
  const anoAtual = document.getElementById("anoAtual");

  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  function limitar(valor, minimo, maximo) {
    return Math.max(minimo, Math.min(maximo, valor));
  }

  function mostrarMensagem(texto) {
    if (mensagemJogo) {
      mensagemJogo.textContent = texto;
    }
  }

  function registrarHistorico(texto) {
    jogo.historico.push(`Dia ${jogo.dia}: ${texto}`);
    atualizarHistorico();
  }

  function atualizarHistorico() {
    if (!listaHistorico) return;

    listaHistorico.innerHTML = "";

    if (jogo.historico.length === 0) {
      const item = document.createElement("li");
      item.textContent = "Aguardando início da simulação.";
      listaHistorico.appendChild(item);
      return;
    }

    jogo.historico.slice(-8).forEach(function (acao) {
      const item = document.createElement("li");
      item.textContent = acao;
      listaHistorico.appendChild(item);
    });
  }

  function atualizarPainel() {
    if (campoTempo) campoTempo.textContent = `Dia ${jogo.dia} / ${jogo.totalDias}`;
    if (campoClima) campoClima.textContent = jogo.clima;
    if (campoSaude) campoSaude.textContent = `${jogo.saudePlantas}%`;
    if (campoUmidade) campoUmidade.textContent = `${jogo.umidadeSolo}%`;
    if (campoPlantado) campoPlantado.textContent = `${jogo.totalPlantado} áreas`;

    atualizarHistorico();
  }

  function sortearClima() {
    const climas = ["Ensolarado", "Chuvoso", "Seco", "Nublado", "Ventania"];
    const indice = Math.floor(Math.random() * climas.length);
    return climas[indice];
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

    document.body.classList.remove("modo-aldeao");

    if (telaFim) {
      telaFim.style.display = "none";
    }

    if (telaJogo) {
      telaJogo.style.display = "block";
    }

    mostrarMensagem("Simulação iniciada! Equilibre produção, água, solo, biodiversidade e tecnologia.");
    registrarHistorico("A Eco-Vila iniciou seu planejamento sustentável.");
    atualizarPainel();

    const simulador = document.getElementById("simulador");
    if (simulador) {
      simulador.scrollIntoView({ behavior: "smooth" });
    }
  }

  function verificarJogoAtivo() {
    if (!jogo.ativo) {
      mostrarMensagem("Clique em Iniciar Simulação antes de tomar decisões.");
      return false;
    }

    return true;
  }

  function irrigarSolo() {
    if (!verificarJogoAtivo()) return;

    if (jogo.agua < 10) {
      mostrarMensagem("Água insuficiente para irrigar. Aguarde uma chuva ou avance o dia.");
      return;
    }

    jogo.agua = limitar(jogo.agua - 10, 0, 100);
    jogo.umidadeSolo = limitar(jogo.umidadeSolo + 18, 0, 100);
    jogo.saudePlantas = limitar(jogo.saudePlantas + 8, 0, 100);

    registrarHistorico("Irrigou o solo de forma controlada.");
    mostrarMensagem("Solo irrigado. As plantas melhoraram, mas a reserva de água diminuiu.");
    atualizarPainel();
  }

  function expandirLavoura() {
    if (!verificarJogoAtivo()) return;

    if (jogo.umidadeSolo < 25) {
      mostrarMensagem("O solo está seco demais para expandir a lavoura com segurança.");
      return;
    }

    jogo.totalPlantado += 5;
    jogo.umidadeSolo = limitar(jogo.umidadeSolo - 12, 0, 100);
    jogo.biodiversidade = limitar(jogo.biodiversidade - 4, 0, 100);
    jogo.producao = limitar(jogo.producao + 10, 0, 100);

    registrarHistorico("Expandiu a lavoura com planejamento.");
    mostrarMensagem("A lavoura foi expandida. A produção aumentou, mas o solo precisa de cuidado.");
    atualizarPainel();
  }

  function controlarAldeao() {
    if (!verificarJogoAtivo()) return;

    jogo.visaoAldeao = true;
    jogo.tecnologia = limitar(jogo.tecnologia + 7, 0, 100);
    jogo.biodiversidade = limitar(jogo.biodiversidade + 5, 0, 100);

    document.body.classList.add("modo-aldeao");

    registrarHistorico("Ativou a visão do aldeão para observar a vila de perto.");
    mostrarMensagem("Visão do aldeão ativada. O monitoramento ambiental e tecnológico melhorou.");
    atualizarPainel();
  }

  function sairVisaoAldeao() {
    if (!verificarJogoAtivo()) return;

    jogo.visaoAldeao = false;
    document.body.classList.remove("modo-aldeao");

    registrarHistorico("Saiu da visão do aldeão.");
    mostrarMensagem("Você voltou para a visão geral da Eco-Vila.");
    atualizarPainel();
  }

  function aplicarEfeitoDoClima() {
    jogo.clima = sortearClima();

    if (jogo.clima === "Chuvoso") {
      jogo.umidadeSolo = limitar(jogo.umidadeSolo + 20, 0, 100);
      jogo.agua = limitar(jogo.agua + 15, 0, 100);
      jogo.biodiversidade = limitar(jogo.biodiversidade + 4, 0, 100);
      registrarHistorico("Choveu e os recursos naturais se recuperaram.");
    }

    if (jogo.clima === "Seco") {
      jogo.umidadeSolo = limitar(jogo.umidadeSolo - 18, 0, 100);
      jogo.saudePlantas = limitar(jogo.saudePlantas - 10, 0, 100);
      registrarHistorico("O clima seco reduziu a umidade e prejudicou as plantas.");
    }

    if (jogo.clima === "Ensolarado") {
      jogo.saudePlantas = limitar(jogo.saudePlantas + 4, 0, 100);
      jogo.umidadeSolo = limitar(jogo.umidadeSolo - 8, 0, 100);
      registrarHistorico("O sol ajudou as plantas, mas reduziu a umidade do solo.");
    }

    if (jogo.clima === "Nublado") {
      jogo.umidadeSolo = limitar(jogo.umidadeSolo - 3, 0, 100);
      jogo.saudePlantas = limitar(jogo.saudePlantas + 2, 0, 100);
      registrarHistorico("O dia nublado manteve equilíbrio na lavoura.");
    }

    if (jogo.clima === "Ventania") {
      jogo.saudePlantas = limitar(jogo.saudePlantas - 7, 0, 100);
      jogo.biodiversidade = limitar(jogo.biodiversidade - 3, 0, 100);
      registrarHistorico("A ventania prejudicou parte da plantação.");
    }
  }

  function calcularProducao() {
    const bonusSolo = jogo.umidadeSolo * 0.2;
    const bonusSaude = jogo.saudePlantas * 0.3;
    const bonusTecnologia = jogo.tecnologia * 0.15;
    const bonusBiodiversidade = jogo.biodiversidade * 0.15;

    jogo.producao = limitar(
      Math.round((jogo.totalPlantado * 1.2) + bonusSolo + bonusSaude + bonusTecnologia + bonusBiodiversidade),
      0,
      100
    );
  }

  function avancarDia() {
    if (!verificarJogoAtivo()) return;

    aplicarEfeitoDoClima();
    calcularProducao();

    if (jogo.dia >= jogo.totalDias) {
      finalizarJogo();
      return;
    }

    jogo.dia += 1;

    mostrarMensagem(`Novo dia iniciado. Clima atual: ${jogo.clima}. Continue buscando equilíbrio.`);
    atualizarPainel();
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

    let classificacao = "";

    if (pontos >= 85) {
      classificacao = "Excelente! A Eco-Vila alcançou produção forte com equilíbrio ambiental.";
    } else if (pontos >= 70) {
      classificacao = "Bom resultado! A vila foi sustentável, mas ainda pode melhorar.";
    } else if (pontos >= 50) {
      classificacao = "Resultado regular. A produção aconteceu, mas o meio ambiente sofreu impactos.";
    } else {
      classificacao = "Atenção! A vila precisa melhorar o equilíbrio entre produção e preservação.";
    }

    const textoRelatorio =
      `Pontuação final: ${pontos}/100. ` +
      `Produção: ${jogo.producao}%. ` +
      `Saúde das plantas: ${jogo.saudePlantas}%. ` +
      `Umidade do solo: ${jogo.umidadeSolo}%. ` +
      `Biodiversidade: ${jogo.biodiversidade}%. ` +
      classificacao;

    if (relatorioFinal) {
      relatorioFinal.textContent = textoRelatorio;
    }

    if (telaFim) {
      telaFim.style.display = "block";
      telaFim.scrollIntoView({ behavior: "smooth" });
    }

    mostrarMensagem(textoRelatorio);
    registrarHistorico("A simulação foi finalizada.");
    atualizarPainel();
  }

  if (btnIniciar) {
    btnIniciar.addEventListener("click", iniciarJogo);
  }

  if (btnReiniciar) {
    btnReiniciar.addEventListener("click", iniciarJogo);
  }

  if (btnIrrigar) {
    btnIrrigar.addEventListener("click", irrigarSolo);
  }

  if (btnExpandir) {
    btnExpandir.addEventListener("click", expandirLavoura);
  }

  if (btnAldeao) {
    btnAldeao.addEventListener("click", controlarAldeao);
  }

  if (btnSairAldeao) {
    btnSairAldeao.addEventListener("click", sairVisaoAldeao);
  }

  if (btnAvancar) {
    btnAvancar.addEventListener("click", avancarDia);
  }

  document.addEventListener("keydown", function (evento) {
    if (!jogo.ativo) return;

    if (evento.key === "1") irrigarSolo();
    if (evento.key === "2") expandirLavoura();
    if (evento.key === "3") controlarAldeao();
    if (evento.key === "4") avancarDia();
    if (evento.key === "Escape") sairVisaoAldeao();
  });

  atualizarPainel();
});