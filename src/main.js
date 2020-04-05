let isStart = false;
let hourStart = null;
let hourEnd = null;
let selectFirstAnimal = null;
let listaGeral = [];
let level = 12;

let templateItem = `
<div class="card col-md-2 pointer" onclick="selectItem('{name}', {rowId})" id="{name}-{rowId}">
  <div class="card-body">
    <p class="card-text d-none">{name}</p>
  </div>
</div>`;

startGame();

function startGame() {
  listaGeral = [];
  if (!isStart) {
    hourStart = Date.now();
    isStart = true;
    duplicateAllItens(level);
    $('#btn-start-game').attr('disabled', 'true');
    $('#btn-finish-game').removeAttr('disabled');
  }
}

function finishGame() {
  listaGeral = [];
  isStart = false;
  $('#btn-start-game').removeAttr('disabled');
  $('#btn-finish-game').attr('disabled', 'true');
}

function duplicateAllItens(level) {
  let numbersRandom = [];
  let animaisRandom = [];
  let column = 4;
  let rows = 6;

  for (let i = 0; i < level; i++) {
    numbersRandom.push(getRandomArbitrary(1, animais.length));
  }

  animaisRandom = animais.filter((item, count) => {
    return numbersRandom.includes(item.id);
  });

  animaisRandom.forEach((item) => {
    item.disable = false;
    listaGeral.push(item);
    listaGeral.push(item);
  });

  listaGeral = embaralhar(listaGeral);

  let textHtml = '';
  listaGeral.forEach((item, rowId) => {
    let itemHtml = templateItem;

    itemHtml = itemHtml.replace(/{name}/g, item.nome);
    itemHtml = itemHtml.replace(/{rowId}/g, (rowId + 1));

    textHtml += itemHtml;
  });

  $('.game-list').html(textHtml);
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
        disableItem(selectedAnimal);
        if (isFinish()) {
          hourEnd = Date.now();
          alert('Ganhou');
        }
        selectFirstAnimal = null;
      } else {
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
  }).length === 0);
}

function sameItens(selectedAnimal, selectFirstAnimal) {
  if (selectedAnimal.name === selectFirstAnimal.name &&
    selectedAnimal.id !== selectFirstAnimal.id) {
    return true;
  }
}

function hideIten(animal) {
  $(`#${animal.name}-${animal.id}`).children().children().addClass('d-none');
}

function showItem(animal) {
  $(`#${animal.name}-${animal.id}`).children().children().removeClass('d-none');
}
