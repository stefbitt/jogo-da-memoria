let isStart = false;

function startGame() {
  isStart = true;
  $('#btn-finish-game').removeAttr('disabled');
}

function finishGame() {
  $('#btn-finish-game').attr('disabled', 'true');
}