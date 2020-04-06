let isStart = false;
let hourStart = null;
let hourEnd = null;
let selectFirstAnimal = null;
let listaGeral = [];
let level = 12;
let ptsGame = 0;

let templateItem = `
<div class="card col-md-2 pointer" onclick="selectItem('{name}', {rowId})" id="{name}-{rowId}">
  <div class="card-body">
    <p class="card-text d-none">{name}</p>
  </div>
</div>`;

function updateHora() {
  setTimeout(() => {
    if (isStart) {
      let ms = Date.now() - hourStart;
      segundos = Math.trunc((ms / 1000) % 60);
      minutos = Math.trunc((ms / 60000) % 60);
      horas = Math.trunc(ms / 3600000);
      $('#time').html(`${horas}:${minutos}:${segundos}`);
      decrementPts(1)
      $('#pts').html(ptsGame > 0 ? ptsGame : 0);
      updateHora();
    }
  }, 1000);
}

function startGame() {
  level = $('#nivel option:selected').val();

  listaGeral = [];
  if (!isStart) {
    hourStart = Date.now();
    isStart = true;
    updateHora();
    listaGeral = duplicateAllItens(level);
    listaGeral = embaralhar(listaGeral);
    preencherTela();

    $('#btn-start-game').attr('disabled', 'true');
    $('#btn-finish-game').removeAttr('disabled');
  }
}

function preencherTela() {
  let textHtml = '';
  listaGeral.forEach((item, rowId) => {
    let itemHtml = templateItem;
    itemHtml = itemHtml.replace(/{name}/g, item.nome);
    itemHtml = itemHtml.replace(/{rowId}/g, (rowId + 1));
    textHtml += itemHtml;
  });

  $('.game-list').html(textHtml);
}

function finishGame() {
  listaGeral = [];
  isStart = false;
  ptsGame = 0;
  $('#btn-start-game').removeAttr('disabled');
  $('#btn-finish-game').attr('disabled', 'true');
}

function duplicateAllItens(level) {
  let numbersRandom = [];
  let animaisRandom = [];

  for (let i = 1; i <= level; i++) {
    let numberRandom = getRandomArbitrary(1, animais.length);
    if (numbersRandom.includes(numberRandom)) {
      i--;
    } else {
      numbersRandom.push(numberRandom);
    }
  }

  animaisRandom = animais.filter((item, count) => {
    return numbersRandom.includes(item.id);
  });

  animaisRandom.forEach((item) => {
    item.disable = false;
    listaGeral.push(item);
    listaGeral.push(item);
  });

  return listaGeral;
}

/**
 * https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Math/random
 * @param {*} min 
 * @param {*} max 
 */
function getRandomArbitrary(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * http://filipeteixeira.com.br/blog/2015/11/19/embaralhar-uma-array-em-javascript/
 * @param {*} array 
 */
function embaralhar(array) {
  let indice_atual = array.length, valor_temporario, indice_aleatorio;

  while (0 !== indice_atual) {

    indice_aleatorio = Math.floor(Math.random() * indice_atual);
    indice_atual -= 1;

    valor_temporario = array[indice_atual];
    array[indice_atual] = array[indice_aleatorio];
    array[indice_aleatorio] = valor_temporario;
  }

  return array;
}

function incrementPts(pts) {
  ptsGame = ptsGame + pts;
}

function decrementPts(pts) {
  if (ptsGame >= 0) {
    ptsGame = ptsGame - pts;
  }
}

/**
 * 
 * @param {*} animal 
 * @param {*} id 
 */
function selectItem(animal, id) {
  let selectedAnimal = { name: animal, id };
  if (isStart) {

    if (isDisabled(selectedAnimal)) {
      return false;
    }

    showItem(selectedAnimal);
    if (selectFirstAnimal === null) {
      selectFirstAnimal = selectedAnimal;
    } else {
      if (sameItens(selectedAnimal, selectFirstAnimal)) {
        showItem(selectFirstAnimal);
        incrementPts(30);
        disableItem(selectedAnimal);
        if (isFinish()) {
          finishGame();
          alert('Ganhou');
        }
        selectFirstAnimal = null;
      } else {
        //decrementPts(10);
        setTimeout(() => {
          hideIten(selectedAnimal);
          hideIten(selectFirstAnimal);
          selectFirstAnimal = null;
        }, 1000);
      }
    }
  }
}

function disableItem(selectedAnimal) {
  let itens = listaGeral.filter((item) => {
    return item.nome === selectedAnimal.name;
  });

  itens.forEach((item) => {
    item.disable = true;
  });
}

function isDisabled(selectedAnimal) {
  return (listaGeral.filter((item) => {
    return item.nome === selectedAnimal.name && item.disable == true;
  }).length > 0);
}

function isFinish() {
  return (listaGeral.filter((item) => {
    return item.disable == false;
  }).length == 0);
}

function sameItens(selectedAnimal, selectFirstAnimal) {
  if (selectedAnimal.name === selectFirstAnimal.name &&
    selectedAnimal.id !== selectFirstAnimal.id) {
    return true;
  }
}

function hideIten(animal) {
  if (animal) {
    $(`#${animal.name}-${animal.id}`).children().children().addClass('d-none');
  }
}

function showItem(animal) {
  if (animal) {
    $(`#${animal.name}-${animal.id}`).children().children().removeClass('d-none');
  }
}
