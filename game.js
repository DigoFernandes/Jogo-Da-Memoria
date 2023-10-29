let botaoColorido = ["red", "blue", "green", "yellow"];
let padraoJogo = [];
let coresEscolhidaUsuario = [];
let iniciou = false;
let nivel = 0;

$(document).ready(function () {
  $(this).keypress(function (e) {
    if (!iniciou) {
      iniciou = true;
      proximaSequencia();
    }
  });

  $(".btn").click(function () {
    if (iniciou) {
      let escolhaUsuario = $(this).attr("id");
      coresEscolhidaUsuario.push(escolhaUsuario);
      tocarSom(escolhaUsuario);
      animacaoPressionar(escolhaUsuario);
      let nivelAtual = coresEscolhidaUsuario.length - 1;
      checarRespostas(nivelAtual);
    }
  });
});

function proximaSequencia() {
  coresEscolhidaUsuario = [];

  nivel++;
  $("#level-title").text("Nível " + nivel);

  let numeroAleatorio = Math.floor(Math.random() * 4);
  let corEscolhidaAleatoria = botaoColorido[numeroAleatorio];
  padraoJogo.push(corEscolhidaAleatoria);
  $("#" + corEscolhidaAleatoria)
    .fadeOut()
    .fadeIn("slow");
  tocarSom(corEscolhidaAleatoria);
}

function checarRespostas(nivelAtual) {
  if (coresEscolhidaUsuario[nivelAtual] === padraoJogo[nivelAtual]) {
    console.log("Sucesso");
    if (coresEscolhidaUsuario.length === padraoJogo.length) {
      setTimeout(function () {
        proximaSequencia();
      }, 1000);
    }
  } else {
    $("h1").text("Errou o jogo, tente novamente");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 1000);
    comecarNovamente();
    setTimeout(() => {
      proximaSequencia();
    }, 1000);
  }
}
function comecarNovamente() {
  coresEscolhidaUsuario = [];
  padraoJogo = [];
  nivel = 0;
}
function animacaoPressionar(corPadrao) {
  $("#" + corPadrao).addClass("pressed");

  setTimeout(() => {
    $("#" + corPadrao).removeClass("pressed");
  }, 100);
}

function tocarSom(nome) {
  let som = new Audio("sounds/" + nome + ".mp3");
  som.play();
}
