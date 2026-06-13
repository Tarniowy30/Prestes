// Projeto Prestes - Eco-Vila Sim
// JavaScript puro para o Agrinho 2026

document.addEventListener("DOMContentLoaded", function () {
  let jogoAtivo = false;
  let dia = 1;
  let totalDias = 5;
  let clima = "Ensolarado";
  let saude = 75;
  let solo = 55;
  let plantado = 10;
  let biodiversidade = 60;
  let tecnologia = 35;
  let producao = 20;

  const btnIniciar = document.getElementById("btnIniciarJogo");
  const btnReiniciar = document.getElementById("btnReiniciarJogo");
  const btnIrrigar = document.getElementById("btnIrrigar");
  const btnExpandir = document.getElementById("btnExpandir");
  const btnAldeao = document.getElementById("btnControlarAldeao");
  const btnSairAldeao = document.getElementById("btnSairAldeao");
  const btnAvancar = document.getElementById("btnAvancarDia");

  const tempo = document.getElementById("tempo");
  const campoClima = document.getElementById("clima");
  const campoSaude = document.getElementById("saudePlantas");
  const campoSolo = document.getElementById("umidadeSolo");
  const campoPlantado = document.getElementById("totalPlantado");
  const mensagem = document.getElementById("mensagemJogo");
  const listaHistorico = document.getElementById("listaHistorico");
  const telaFim = document.getElementById("telaFim");
  const relatorioFinal = document.getElementById("relatorioFinal");
  const anoAtual = document.getElementById("anoAtual");

  if (anoAtual) {
    anoAtual.textContent = new Date().getFullYear();
  }

  function escreverMensagem(texto) {
    if (mensagem) {
      mensagem.textContent = texto;
    }
  }

  function limitar(valor) {
    if (valor < 0) return 0;
    if (valor > 100) return 100;
    return valor;
  }

  function atualizarTela() {
    if (tempo) tempo.textContent = `Dia ${dia} / ${totalDias}`;
    if (campoClima) campoClima.textContent = clima;
    if (campoSaude) campoSaude.textContent = `${saude}%`;
    if (campoSolo) campoSolo.textContent = `${solo}%`;
    if (campoPlantado) campoPlantado.textContent = `${plantado} áreas`;
  }

  function adicionarHistorico(texto) {
    if (!listaHistorico) return;

    const item = document.createElement("li");
    item.textContent = `Dia ${dia}: ${texto}`;

    if (listaHistorico.children.length === 1 && listaHistorico.children[0].textContent.includes("Aguardando")) {
      listaHistorico.innerHTML = "";
    }

    listaHistorico.appendChild(item);
  }

  function iniciarJogo() {
    jogoAtivo = true;
    dia = 1;
    clima = "Ensolarado";
    saude = 75;
    solo = 55;
    plantado = 10;
    biodiversidade = 60;
    tecnologia = 35;
    producao = 20;

    document.body.classList.remove("modo-aldeao");

    if (telaFim) {
      telaFim.style.display = "none";
    }

    if (listaHistorico) {
      listaHistorico.innerHTML = "";
    }

    escreverMensagem("Simulação iniciada! Tome decisões para equilibrar produção e meio ambiente.");
    adicionarHistorico("A Eco-Vila iniciou o planejamento sustentável.");
    atualizarTela();

    const simulador = document.getElementById("simulador");
    if (simulador) {
      simulador.scrollIntoView({ behavior: "smooth" });
    }
  }

  function verificarJogo() {
    if (!jogoAtivo) {
      escreverMensagem("Clique em Iniciar Simulação antes de jogar.");
      return false;
    }

    return true;
  }

  function irrigarSolo() {
    if (!verificarJogo()) return;

    solo = limitar(solo + 15);
    saude = limitar(saude + 8);

    escreverMensagem("Você irrigou o solo. A saúde das plantas melhorou.");
    adicionarHistorico("Irrigou o solo com responsabilidade.");
    atualizarTela();
  }

  function expandirLavoura() {
    if (!verificarJogo()) return;

    if (solo < 25) {
      escreverMensagem("O solo está seco demais para expandir a lavoura.");
      return;
    }

    plantado += 5;
    solo = limitar(solo - 10);
    biodiversidade = limitar(biodiversidade - 5);
    producao = limitar(producao + 12);

    escreverMensagem("A lavoura foi expandida. A produção aumentou, mas o solo perdeu umidade.");
    adicionarHistorico("Expandiu a lavoura de forma planejada.");
    atualizarTela();
  }

  function controlarAldeao() {
    if (!verificarJogo()) return;

    tecnologia = limitar(tecnologia + 8);
    biodiversidade = limitar(biodiversidade + 5);

    document.body.classList.add("modo-aldeao");

    escreverMensagem("Visão do aldeão ativada. O monitoramento da vila melhorou.");
    adicionarHistorico("Usou a visão do aldeão para observar a Eco-Vila.");
    atualizarTela();
  }

  function sairVisaoAldeao() {
    if (!verificarJogo()) return;

    document.body.classList.remove("modo-aldeao");

    escreverMensagem("Você saiu da visão do aldeão.");
    adicionarHistorico("Voltou para a visão geral da vila.");
    atualizarTela();
  }

  function avancarDia() {
    if (!verificarJogo()) return;

    const climas = ["Ensolarado", "Chuvoso", "Seco", "Nublado", "Ventania"];
    clima = climas[Math.floor(Math.random() * climas.length)];

    if (clima === "Chuvoso") {
      solo = limitar(solo + 18);
      biodiversidade = limitar(biodiversidade + 4);
      adicionarHistorico("Choveu e o solo recuperou umidade.");
    }

    if (clima === "Seco") {
      solo = limitar(solo - 18);
      saude = limitar(saude - 10);
      adicionarHistorico("O clima seco prejudicou o solo e as plantas.");
    }

    if (clima === "Ensolarado") {
      saude = limitar(saude + 4);
      solo = limitar(solo - 6);
      adicionarHistorico("O sol ajudou as plantas, mas reduziu a umidade.");
    }

    if (clima === "Nublado") {
      saude = limitar(saude + 2);
      solo = limitar(solo - 3);
      adicionarHistorico("O clima nublado manteve a vila estável.");
    }

    if (clima === "Ventania") {
      saude = limitar(saude - 7);
      biodiversidade = limitar(biodiversidade - 3);
      adicionarHistorico("A ventania afetou a plantação.");
    }

    producao = limitar(Math.round((plantado * 1.2) + (saude * 0.3) + (solo * 0.2) + (tecnologia * 0.2)));

    if (dia >= totalDias) {
      finalizarJogo();
      return;
    }

    dia++;
    escreverMensagem(`Novo dia iniciado. Clima: ${clima}. Continue equilibrando produção e natureza.`);
    atualizarTela();
  }

  function finalizarJogo() {
    jogoAtivo = false;

    const equilibrio = Math.round((saude + solo + biodiversidade + producao + tecnologia) / 5);

    let resultado = "";

    if (equilibrio >= 85) {
      resultado = "Excelente! A Eco-Vila conseguiu unir agro forte e futuro sustentável.";
    } else if (equilibrio >= 70) {
      resultado = "Bom resultado! A vila foi produtiva e manteve bom equilíbrio ambiental.";
    } else if (equilibrio >= 50) {
      resultado = "Resultado regular. A produção aconteceu, mas o meio ambiente precisa de mais cuidado.";
    } else {
      resultado = "Atenção! A vila precisa melhorar o equilíbrio entre produção e preservação.";
    }

    const texto = `Pontuação final: ${equilibrio}/100. Produção: ${producao}%. Saúde das plantas: ${saude}%. Umidade do solo: ${solo}%. ${resultado}`;

    if (relatorioFinal) {
      relatorioFinal.textContent = texto;
    }

    if (telaFim) {
      telaFim.style.display = "block";
      telaFim.scrollIntoView({ behavior: "smooth" });
    }

    escreverMensagem(texto);
    adicionarHistorico("A simulação foi finalizada.");
    atualizarTela();
  }

  if (btnIniciar) btnIniciar.addEventListener("click", iniciarJogo);
  if (btnReiniciar) btnReiniciar.addEventListener("click", iniciarJogo);
  if (btnIrrigar) btnIrrigar.addEventListener("click", irrigarSolo);
  if (btnExpandir) btnExpandir.addEventListener("click", expandirLavoura);
  if (btnAldeao) btnAldeao.addEventListener("click", controlarAldeao);
  if (btnSairAldeao) btnSairAldeao.addEventListener("click", sairVisaoAldeao);
  if (btnAvancar) btnAvancar.addEventListener("click", avancarDia);

  document.addEventListener("keydown", function (evento) {
    if (!jogoAtivo) return;

    if (evento.key === "1") irrigarSolo();
    if (evento.key === "2") expandirLavoura();
    if (evento.key === "3") controlarAldeao();
    if (evento.key === "4") avancarDia();
    if (evento.key === "Escape") sairVisaoAldeao();
  });

  atualizarTela();
});
