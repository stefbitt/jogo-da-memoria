let isStart = false;
let selectFirstAnimal = null;

function startGame() {
  isStart = true;
  $('#btn-finish-game').removeAttr('disabled');
}

function finishGame() {
  $('#btn-finish-game').attr('disabled', 'true');
}

function selectItem(animal) {
  if (isStart) {
    showItem(animal);
    if (selectFirstAnimal === null) {
      selectFirstAnimal = animal;
    } else {
      if (sameItens(animal, selectFirstAnimal)) {
        hideIten(animal);
        selectFirstAnimal = null
        alert('item será removido (2)');
      }
    }
  }
}

function sameItens(animal, selectFirstAnimal) {
  return animal === selectFirstAnimal;
}

function hideIten(animal) {

}

function showItem() {

}