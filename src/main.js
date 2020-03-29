let animais = [
    {
        id: 1,
        nome: 'Leão'
    },
    {
        id: 2,
        nome: 'Macaco'
    },
    {
        id: 3,
        nome: 'Porco'
    },
    {
        id: 4,
        nome: 'Cachorro'
    },
    {
        id: 5,
        nome: 'Aranha'
    },
    {
        id: 6,
        nome: 'Avestruz'
    },
    {
        id: 7,
        nome: 'Andorinha'
    },
    {
        id: 8,
        nome: 'Baleia'
    },
    {
        id: 9,
        nome: 'Besouro'
    },
    {
        id: 10,
        nome: 'Bezerro'
    },
    {
        id: 11,
        nome: 'Boi'
    },
    {
        id: 12,
        nome: 'Borboleta'
    },
    {
        id: 13,
        nome: 'Cabra'
    },
    {
        id: 14,
        nome: 'Camaleão'
    },
    {
        id: 15,
        nome: 'Camelo'
    },
    {
        id: 16,
        nome: 'Canguru'
    },
    {
        id: 17,
        nome: 'Caranguejo'
    },
    {
        id: 18,
        nome: 'Cavalo'
    },
    {
        id: 19,
        nome: 'Cegonha'
    },
    {
        id: 20,
        nome: 'Cobra'
    },
    {
        id: 21,
        nome: 'Coelho'
    },
    {
        id: 22,
        nome: 'Dinossauro'
    },
    {
        id: 23,
        nome: 'Elefante'
    },
    {
        id: 24,
        nome: 'Ema'
    },
    {
        id: 25,
        nome: 'Escorpião'
    },
    {
        id: 26,
        nome: 'Esponja'
    },
    {
        id: 27,
        nome: 'Falcão'
    },
    {
        id: 28,
        nome: 'Flamingo'
    },
    {
        id: 29,
        nome: 'Foca'
    },
    {
        id: 30,
        nome: 'Formiga'
    },
    {
        id: 31,
        nome: 'Gafanhoto'
    },
    {
        id: 32,
        nome: 'Gaivota'
    },
    {
        id: 33,
        nome: 'Galinha'
    },
    {
        id: 34,
        nome: 'Gambá'
    },
    {
        id: 35,
        nome: 'Gato'
    },
    {
        id: 36,
        nome: 'Jacaré'
    },
    {
        id: 37,
        nome: 'Lagarto'
    },
    {
        id: 38,
        nome: 'Lobo'
    },
    {
        id: 39,
        nome: 'Onça'
    },
    {
        id: 40,
        nome: 'Papagaio'
    },
    {
        id: 41,
        nome: 'Panda'
    },
    {
        id: 42,
        nome: 'Peixe'
    },
    {
        id: 43,
        nome: 'Peru'
    },
    {
        id: 44,
        nome: 'Porco'
    },
    {
        id: 45,
        nome: 'Raposa'
    },
    {
        id: 46,
        nome: 'Sapo'
    },
    {
        id: 47,
        nome: 'Tatu'
    },
    {
        id: 48,
        nome: 'Tubarão'
    },
    {
        id: 49,
        nome: 'Urso'
    },
    {
        id: 50,
        nome: 'Vaca'
    },
    {
        id: 51,
        nome: 'Zebra'
    }
]

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
