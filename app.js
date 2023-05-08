/* *********************************** Стартовый экран с игрой*********************************************** */
const screens = document.querySelectorAll(".screen"); // Все экраны с игрой
const form = document.forms.form.userName; // Форма для регистрации
let pattern = /^[\s] +$/; // Патерн для проверки на пробелы, когда пользователь вводит имя
let userName; // Переменная с именем пользователя
const nameSave = "userName"; // Ключ для сохранения имени
let playerList = [];// Список игроков
let playerListPossition = 0; // Позиция выбранного игрока
const btnStart = document.querySelector("#start"); // Кнопка «Старт»
const btnAvatar = document.querySelector("#avatar"); // Кнопка «Аватар и Имя игрока»
const modal = document.querySelector(".modal"); // Модальное окно
const playerParent = document.querySelector(".modal__list"); // Поле списка игроков
const btnNewPlayer = document.querySelector(".modal__newPlayer"); // Кнопка «Новый игрок»
const overlow = document.querySelector(".overlay"); // Оверлай

/* ***********************************Экран с выбором уровня и времени*********************************************** */
const levelChooseText = document.querySelector("#check-level"); // Надпись «Выбери уровень игры»
const levelList = document.querySelectorAll(".card"); // Список всех уровней
let levelActive = document.querySelector(".card.active") || levelList[1]; // Активный уровень
let btnLevel = document.querySelectorAll(".card__btn"); // Кнопка выбора уровня
let levelPage = document.querySelector(".level");
let btnActiveLevel = btnLevel[1]; // Кнопка активного уровня
btnActiveLevel.innerHTML = "Выбрано";
const btnLvelInfo = document.querySelector("#levelInfo"); // Кнопка с информацией о выбранном уровне
let levelSelected = "Средний"; // Выбранный уровень
const timeList = document.querySelector("#timeList"); // Список кнопок с выбором времени игры

/* ***********************************Экран с процессом игры*********************************************** */
const timerTaskParent = document.querySelector("#timer-task"); // Поле с заданием и таймером
const timer = document.querySelector(".timer__progress"), // Таймер круговой
  progressValue = document.querySelector(".timer__value"); // Поле со временем
let progressStartValue = 10, // Начальное время
  progressEndValue = 0, // Конечное время
  circleDegree = 360; // Число градусов в круге

const board = document.querySelector("#board"); // Доска с игрой
const btnRestart = document.querySelector("#restart"); // Кнопка «Начать заново»
const recordText = document.querySelector("#pos"); // Поле с рекордом
const task = document.querySelector("#task"); // Отображение задания
let score = 0; // Переменная для учёта правильных ответов
let taskCount = 0; // Переменная для подсчёта количества заданий
const { width } = board.getBoundingClientRect(); // Получение реальных размеров доски
let countAnswer = 4; // Количество ответов
let circleSize = width / countAnswer - 10; // размер круга
const circleColor = ["red", "green", "MidnightBlue", "DarkOrange", "DarkRed", "Maroon", "OrangeRed", "DarkGreen",]; // Массив с цветами кружков
let record; // Личный рекорд
let a; // Первое число задания
let b; // Второе число задания
let sum; // Сумма чисел
let answerList = []; // Массив ответов;
let falseAnwserList = []; // Массив неверных ответов игрока
let numberOne, numberTwo, numberThree, numberFour; // Ответы на кружках

/* ***********************************Экран с неверными ответам*********************************************** */
let wrongCard; // Карточка с неверными ответами
let cover; // Перекрывает ненужные ярлыки с неправильными ответами
const boardFinish = document.querySelector("#boardFinish"); // Доска с карточками неверных заданий

/* ***********************************Экран со статистикой*********************************************** */
const btnStatic = document.querySelector("#btn-static"); //Кнопка «Статистика»
const btnBack = document.querySelector("#btnBack"); // Кнопка «Назад»
const btnClear = document.querySelector(".clear"); // Кнопка «Очистить память»
const screenStatic = document.querySelector("#screen-static"); // Доска cо статистикой
const tableEasy = document.querySelector("#table-easy"); // Таблица для лёгкого уровня
const tableMedium = document.querySelector("#table-medium"); // Таблица для среднего уровня
const tableHard = document.querySelector("#table-hard"); // Таблица для сложного уровня
const bestEasy = document.querySelector(".easy-best"); // Лучший рекорд для легкого уровня
const bestMedium = document.querySelector(".medium-best"); //Лучший рекорд для среднего уровня
const bestHard = document.querySelector(".hard-best"); // Лучший рекорд для сложного уровня

let statisticEasy = []; // Массив со статистикой «Лёгкий»
let dataEasy = []; // Массив с датой «Лёгкий»
let keyRecordEasy = `${userName}Лёгкий + list`; // Ключ для хранения массива с результатом
let keyDataEasy = `${userName}Лёгкий + data`; // Ключ для хранения массива с датой

let statisticMedium = []; // Массив со статистикой «Средний»
let dataMedium = []; // Массив со датой «Средний»
let keyRecordMedium = `${userName}Средний + list`; // Ключ для хранения массива с результатом
let keyDataMedium = `${userName}Средний + data`; // Ключ для хранения массива с датой

let statisticHard = []; // Массив со статистикой «Сложный»
let dataHard = []; // Массив со датой «Сложный»
let keyRecordHard = `${userName}Сложный + list`; // Ключ для хранения массива с результатом
let keyDataHard = `${userName}Сложный + data`; // Ключ для хранения массива с датой

/* ******************************************************************************************************************* */

const win = document.querySelector(".window"); // Оверлай


/* ****************************************** Вспомогательные методы ************************************************* */
// Считывание имени и установка ключей
function loadUserAndKey(user) {
  userName = user;
  btnAvatar.innerHTML = `Игрок: ${userName}`;
  keyRecordEasy = `${userName}Лёгкий + list`; // Ключ для хранения массива с результатом
  keyDataEasy = `${userName}Лёгкий + data`; // Ключ для хранения массива с датой

  keyRecordMedium = `${userName}Средний + list`; // Ключ для хранения массива с результатом
  keyDataMedium = `${userName}Средний + data`; // Ключ для хранения массива с датой

  keyRecordHard = `${userName}Сложный + list`; // Ключ для хранения массива с результатом
  keyDataHard = `${userName}Сложный + data`; // Ключ для хранения массива с датой

  // Установка класса для активной кнопки
  document.querySelectorAll('.modal__player').forEach(function (element) {
    if (element.innerHTML === userName) {
      element.classList.add("active-player");
    }
  });
  getStatisticByLevel(); // Подгружаем статистику
  createStatistic();
}

window.addEventListener('storage', function (evt) {
  if (evt.key = keyDataEasy) {
    this.alert("Произошло сохранеине");
  }

});

// Плавная прокрутка
const anchors = document.querySelectorAll('a[href*="#"]');
for (let anchor of anchors) {
  anchor.addEventListener("click", function (event) {
    event.preventDefault();
    const blockID = anchor.getAttribute('href');
    document.querySelector("" + blockID).scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  });
}

// Загрузка при старте страницы
window.addEventListener("load", function () {
  win.innerHTML = `Размер экрана: ${this.window.screen.width}`;
  if (userLoad() === true) {
    loadUserAndKey(playerList[this.localStorage.getItem("playerListPossition")]);
    form.classList.add("hide");
    btnStart.classList.remove("hide");
    btnAvatar.parentElement.classList.remove("hide");
  }

  if (window.history.length > 1) {
    btnBack.addEventListener('click', () => {
      history.back();
      btnStatic.classList.remove("hide");
    });
    btnBack.classList.remove("hide");
  }

});

// Защита от случайного обновления
function reloadDefender() {
  window.addEventListener('beforeunload', function (event) {
    // Отменяем поведение по умолчанию
    event.preventDefault();
    // Chrome требует наличия returnValue
    event.returnValue = 'Привет';
  });
}

// Кнопка «Очистить показатели»
btnClear.addEventListener("click", () => {
  localStorage.clear();
  form.classList.remove("hide");
  form.placeholder = formPlaceHolder;
  btnStart.classList.add("hide");
  location.href = "#firstScreen";
  location.reload();
});

// Кнопка «Игрок»
document.addEventListener("click", (event) => {
  if (event.target.parentNode.classList.contains("player") || event.target.parentNode.classList.contains("user__avatar")) {
    event.preventDefault();
    modal.classList.remove("hide");
    btnAvatar.parentElement.classList.add("active-player");
    overlow.classList.remove("hide");
  } else {
    modal.classList.add("hide");
    overlow.classList.add("hide");
    btnAvatar.parentElement.style.border = "2px solid white"
  }
})

// Метод нажатия на кнопку «Статистика»
btnStatic.addEventListener("click", (event) => {
  location.href = "#screen-static";
  btnStatic.classList.add("hide");
});

// Кнопка «Начать заново»
btnRestart.addEventListener("click", (event) => {
  event.preventDefault(); // Удаляем по-умолчанию переход по ссылке
  clearInterval(timerCircle);
  location.href = "#firstScreen";
  location.reload();
});

/* ****************************************** Регистрация в форме** ************************************************* */

let formPlaceHolder = form.placeholder; // сохраняем в переменную плейсхолдер

// Форма в фокусе
form.addEventListener("focus", function (e) {
  form.placeholder = "";
});

// Форма не в фокусе
form.addEventListener("blur", function (e) {
  // Проверка на одни пробелы
  if (!form.value.replace(/\s/g, "").length) {
    form.value = "";
    form.placeholder = formPlaceHolder;
  } else {
    if (userName != null) {
      form.value = userName;
    } else {
      form.placeholder = formPlaceHolder;
    }
  }
});

// Вносим текст в форму
form.addEventListener("input", function (event) {
  // Проверка на одни пробелы
  if (!form.value.replace(/\s/g, "").length) {
    btnStart.classList.add("hide");
    form.setCustomValidity('"' + form.value + '" is not a feeling');
    btnAvatar.parentElement.classList.add("hide");
  } else {
    btnStart.classList.remove("hide");
    userName = form.value;
    form.setCustomValidity("");

  }
});

// Сохранение имени пользователя, после изменения
form.addEventListener("change", function (event) {
  // Проверка на одни пробелы
  if (!form.value.replace(/\s/g, "").length) {
  } else {
    userName = form.value;
    btnAvatar.innerHTML = `Игрок: ${userName}`;
    playerList.push(userName);
    playerListPossition = playerList.length - 1;
    getPlayerListPossition(playerListPossition);
    playerConstructor(userName);
    localStorage.setItem("user", JSON.stringify(playerList)); // Сохраняем массив с результатом в память
    loadUserAndKey(userName);
  }
});

// Нажатие на «enter»
form.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    if (!form.value.replace(/\s/g, "").length) {
      form.setCustomValidity('"' + form.value + '" is not a feeling');
    } else {
      btnStart.click();
    }
  }
});

/* ****************************************** Выбор игроков ***************************************************** */

// Конструктор игроков
function playerConstructor(name, i) {
  let player = document.createElement("div"); // Создаем игрока
  player.setAttribute("data", `${i}`);
  playerParent.append(player); // Говорим о том, что игрок будет находиться в доске
  player.classList.add("modal__player"); // Устанавливаем класс
  player.classList.add("btn");// Устанавливаем класс
  player.innerHTML = `${name}`; // Устанавливаем имя игрока
}

// Загрузчик списка игроков
function userLoad() {
  if (JSON.parse(localStorage.getItem("user") != null)) {
    playerList = JSON.parse(localStorage.getItem("user")); // Загружаем массив с датой из памяти
    for (let i = 0; i < playerList.length; i++) {
      playerConstructor(playerList[i], i);
    }
    return true;
  }
  return false;
}


// Нажатие в окне выбора игроков
modal.addEventListener("click", (event) => {
  // Действия на кнопку «Новый игрок»
  if (event.target.classList.contains("modal__newPlayer")) {
    form.classList.remove("hide");
    btnStart.classList.add("hide");
  }
  // Действия на кнопку «Игрок»
  if (event.target.classList.contains("modal__player")) {
    document.querySelectorAll('.modal__player').forEach(function (element) {
      element.classList.remove("active-player");
    });

    event.target.classList.add("active-player");
    getPlayerListPossition(event.target.getAttribute("data"));
    userName = event.target.innerHTML;
    btnAvatar.innerHTML = `Игрок: ${userName} ↓`;
    loadUserAndKey(userName);
    location.reload();
  }
});

// Позиция выбранного игрока
function getPlayerListPossition(i) {
  playerListPossition = i;
  localStorage.setItem("playerListPossition", playerListPossition)
}

/* ****************************************** Начало игры ***************************************************** */
// Метод нажатия на кнопку «Старт»
btnStart.addEventListener("click", (event) => {
  btnLvelInfo.classList.remove("hide");
  btnStatic.classList.remove("hide");
  btnRestart.classList.remove("hide");
  btnAvatar.parentElement.classList.add("hide");
  levelChooseText.innerHTML = `${userName}, выбери уровень и время`;
  btnLvelInfo.innerHTML = `Уровень: «${levelSelected}»`;
  location.href = "#sreenTime";

});

let w;
let x;

// Метод выбор уровня
for (let i = 0; i < levelList.length; i++) {
  // w = levelList[i].getBoundingClientRect().width;
  // console.log(`Ширина элемента ${w}`);
  console.log(levelList[i].style.overflow);
  if (levelList[i].style.overflow === "visible") {
    alert("Видно");
  }

  levelList[i].addEventListener("click", function () {
    btnActiveLevel.innerHTML = "Выбрать";
    btnLevel[i].innerHTML = "Выбрано";
    btnActiveLevel = btnLevel[i];
    levelActive.classList.remove("active-card");
    this.classList.add("active-card");
    levelActive = this;
    levelSelected = levelList[i].getAttribute("data-level");
    btnLvelInfo.innerHTML = `Уровень: «${levelSelected}»`;
  });
};



// Метод выбора времени. В методе ниже применяется делигирование событий
timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("timer-IF") || (event.target.classList.contains("screen__time-btn"))) {
    progressStartValue = parseInt(event.target.parentNode.getAttribute("data-time")); // получение атрибутов
    circleDegree = parseInt(event.target.parentNode.getAttribute("data-time")); // Количество градусов для закрашивания
    progressValue.textContent = `${progressStartValue}`;
    timer.style.background = "green";
    startGame();
    btnStatic.classList.add("hide");
  }
});

// Круглый таймер

let timerCircle = setInterval(() => {
  --progressStartValue;
  progressValue.textContent = `${progressStartValue}`;
  timer.style.background = `conic-gradient(green ${progressStartValue * 360 / circleDegree}deg, white 0deg)`;

  if (progressStartValue == progressEndValue) {
    clearInterval(timerCircle);
    finishGame();
  }

}, 1000);


// Функция начала игры
function startGame() {
  getRecord(); // Загрузка рекорда
  setTimeout(timerCircle, 1000); // Запуск таймера
  taskGenerator(); // Запуск генератора заданий
  createRandomCircle(); // Запуск генератор кружков
}

/* ****************************************** Обработчики нажатий ***************************************************** */

// Метод отработки клика по кружку
board.addEventListener("click", (event) => {
  // Проверяем клик только по кружку
  if (event.target.classList.contains("circle")) {
    taskCount++; // Увеличиваем количество решённых заданий
    if (event.target.innerHTML == sum) {
      score++; // Считаем количество правильных ответов
      setRecord();
    } else {
      falseAnwserList.push(task.textContent + " ≠ " + event.target.innerHTML); // Массив неправильных ответов
    }
    taskGenerator(); // перезапускаем задание
    createRandomCircle(); // загружаем кружки
    event.target.parentNode.remove(); // удаляем старые кружки
  }

  // Нажатие на кнопку «Посмотреть ошибки»
  if (event.target.classList.contains("screen__btn-false")) {
    event.preventDefault(); // Удаляем по-умолчанию переход по ссылке
    location.href = "#screen-false";
    getWrongAnswer();
  }
});

// Метод обработки нажатия на карточку с неправильными ответами
boardFinish.addEventListener("click", (event) => {
  const { width, height } = board.getBoundingClientRect(); // Получение реальных размеров доски

  // Если нажата закрытая карточка
  if (event.target.classList.contains("screen__wrongAnwserTop")) {
    const x = wrongCard.getBoundingClientRect().width; // Получение реальных размеров карточки с неправильными ответами
    let v = width / 2 - x / 2; // переменная для размещения объекта по центру
    event.target.parentNode.style.position = "absolute";
    event.target.parentNode.style.top = `${v}px`;
    event.target.parentNode.style.left = `${v}px`;
    event.target.parentNode.style.transform = "rotateX(-180deg) scale(4)"; // трансформация элемента
    event.target.parentNode.style.zIndex = "30";
    cover.classList.add("cover");
  }

  if (event.target.classList.contains("screen__wrongAnwserBack")) {
    event.target.parentNode.style.position = "relative";
    event.target.parentNode.style.transform = "rotateX(0deg) scale(1)";
    event.target.parentNode.style.top = `${0}px`;
    event.target.parentNode.style.left = `${0}px`;
    cover.classList.remove("cover");
    event.target.parentNode.style.zIndex = "0";
  }
});

/* ****************************************** Генерация элементов ***************************************************** */

// Проверка на уникальность генерируемых чисел
function inArray(arr, num) {
  for (var i = 0; i < arr.length; i++) {
    if (num == arr[i]) return true;
  };

  return false;
}

function getRandomNumber(randLength, min, max) {
  let randArray = [],
    i = 0;
  // Проверерка, чтобы длина массива была не больше диапазона генерируемых чисел
  if (randLength > (max - min + 1)) {
    min = 0;
    max = 10;
  }
  while (i < randLength) {
    let rand = Math.round(Math.random() * (max - min) + min);
    if (!(inArray(randArray, rand)) && rand != sum) {
      i++;
      randArray.unshift(rand);
    }
  };
  return randArray;
}

/* Генератор заданий и ответов*/
function taskGenerator() {

  // Проверка на остаток от деления
  function mod() {
    b = getRandomNumber(1, 0, 100)[0];
    sum = getRandomNumber(1, 0, 10)[0];
    a = b * sum;
    task.innerHTML = `${a} / ${b}`;
  }


  // Уровень «Лёгкий»
  if (levelSelected === "Лёгкий") {
    let temp = getRandomNumber(1, 0, 1)[0];
    a = getRandomNumber(1, 0, 20)[0];
    b = getRandomNumber(1, 0, 20)[0];

    if (temp == 0) {
      task.innerHTML = `${a} + ${b}`;
      sum = a + b;
    } else if (temp == 1) {
      task.innerHTML = `${a} - ${b}`;
      sum = a - b;
    }

    // Уровень «Средний»
  } else if (levelSelected === "Средний") {
    let temp = getRandomNumber(1, 0, 1)[0];
    a = getRandomNumber(1, 0, 20)[0];
    b = getRandomNumber(1, 0, 20)[0];

    if (temp === 0) {
      task.innerHTML = `${a} * ${b}`;
      sum = a * b;
    } else if (temp === 1) {
      mod();
    }

    // Уровень «Сложный»
  } else if (levelSelected === "Сложный") {
    let temp = getRandomNumber(1, 0, 3)[0];
    a = getRandomNumber(1, 0, 100)[0];
    b = getRandomNumber(1, 0, 10)[0];

    if (temp == 0) {
      task.innerHTML = `${a} + ${b}`;
      sum = a + b;
    } else if (temp == 1) {
      task.innerHTML = `${a} - ${b}`;
      sum = a - b;
    } else if (temp == 2) {
      task.innerHTML = `${a} * ${b}`;
      sum = a * b;
    } else if (temp == 3) {
      mod();
    }
  }

  let min, max;
  // if (a-b < 0) {
  //   min = -(sum - 0.2 * sum);
  //   max = -(sum + 0.2 * sum);
  // } else {
  min = sum - 0.2 * sum;
  max = sum + 0.2 * sum;

  answerList = getRandomNumber(4, min, max);
}


/*Генератор кружков*/
function getCircle(parent, x, y) {
  let circle = document.createElement("div"); // Создаем элемент круг
  parent.append(circle); // Говорим о том, что кружок будет находиться в доске
  circle.classList.add("circle");
  circle.style.fontSize = `${circleSize * 0.5}px`;
  circle.style.width = `${circleSize}px`;
  circle.style.height = `${circleSize}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  return circle;
}

/* Функция создает рандомные кружки */
function createRandomCircle() {
  let circleParent = document.createElement("div"); // Создаем родителя для кругов
  circleParent.classList.add("circleParent"); // Добавляем класс для родителя
  board.append(circleParent); // Говорим о том, что родитель круга будет находиться в доске

  // Генерируем координаты
  const { width } = board.getBoundingClientRect(); // Получение реальных размеров доски
  let x1 = getRandomNumber(1, 0, width - circleSize)[0]; // координата по х
  let x2 = getRandomNumber(1, 0, width - circleSize)[0];
  let x3 = getRandomNumber(1, 0, width - circleSize)[0];
  let x4 = getRandomNumber(1, 0, width - circleSize)[0];

  let indexXY = (width - countAnswer * circleSize) / countAnswer / 2; // Максимальный расход вверх/вниз для "Y"

  let y1 = getRandomNumber(1, 0, indexXY)[0];
  let y2 = getRandomNumber(
    1,
    width / countAnswer - indexXY,
    width / countAnswer + indexXY
  )[0];
  let y3 = getRandomNumber(
    1,
    (width * 2) / countAnswer - indexXY,
    (width * 2) / countAnswer + indexXY
  )[0];
  let y4 = getRandomNumber(
    1,
    (width * 3) / countAnswer - indexXY,
    width - circleSize
  )[0];

  let colorRandom = getRandomNumber(4, 0, circleColor.length); // Масив случайного числа для выбора цвета

  // Размещение правильного ответа
  let trueAnswerPosition = getRandomNumber(1, 0, 3)[0]; // Случайного число для размещения верного ответа.
  if (trueAnswerPosition === 0) {
    answerList[0] = sum;
  } else if (trueAnswerPosition === 1) {
    answerList[1] = sum;
  } else if (trueAnswerPosition === 2) {
    answerList[2] = sum;
  } else if (trueAnswerPosition === 3) {
    answerList[3] = sum;
  }

  /*Круг №1 */
  let circleOne = getCircle(circleParent, x1, y1);
  circleOne.style.background = circleColor[colorRandom[0]];
  circleOne.innerHTML = answerList[0];

  /*Круг №2 */
  let circleTwo = getCircle(circleParent, x2, y2);
  circleTwo.style.background = circleColor[colorRandom[1]];
  circleTwo.innerHTML = answerList[1];

  /*Круг №3 */
  let circleThree = getCircle(circleParent, x3, y3);
  circleThree.style.background = circleColor[colorRandom[2]];
  circleThree.innerHTML = answerList[2];

  /*Круг №2 */
  let circleFour = getCircle(circleParent, x4, y4);
  circleFour.style.background = circleColor[colorRandom[3]];
  circleFour.innerHTML = answerList[3];
}

/*Функция окончания игры */

function finishGame() {
  let fals = []; // Массив с неправильными ответами
  timerTaskParent.remove(); // удаление родителя. Удаление времени
  task.parentNode.remove(); // удаление родителя. Удаление задания
  board.innerHTML = `<h1>Cчёт: <span class="primary">${score} из ${taskCount}</span> </h1>
    <div class="screen__btn-false btn">Посмотреть ошибки</div>`;
  for (let i = 0; i < falseAnwserList.length; i++) {
    fals[i] = `<p>Ошибка №${i + 1}: ${falseAnwserList[i]}</p>`;
  }
  recordText.innerHTML = fals.join("");
  setStatisticByLevel();
}


/* ****************************************** Окно с неправильными ответами ***************************************************** */
function getWrongAnswer() {
  cover = document.createElement("div"); // Создаем занавесь, чтобы скрыть элементы
  boardFinish.append(cover); // Говорим о том, что занавесь будет находиться в доске

  for (let i = 0; i < falseAnwserList.length; i++) {
    wrongCard = document.createElement("div"); // Создаем карточку с неверными ответами
    wrongCard.classList.add("screen__container"); // Добавляем класс для карточки
    boardFinish.append(wrongCard); // Говорим о том, что карточка лежит в доске

    let wrongAnwserTop = document.createElement("div"); // Создаем лицевую сторону карточки
    wrongAnwserTop.classList.add("screen__wrongAnwserTop"); // Добавляем класс для нее
    wrongCard.append(wrongAnwserTop); // Говорим о том, что лицевая сторона принадлежит карточке
    wrongAnwserTop.innerHTML = `${i + 1}`;

    let wrongAnwserBack = document.createElement("div"); // Создаем изнаночную сторону карточки
    wrongAnwserBack.classList.add("screen__wrongAnwserBack"); // Добавляем класс для карточки
    wrongCard.append(wrongAnwserBack); // // Говорим о том, что изнаночная сторона принадлежит карточке
    wrongAnwserBack.innerHTML = falseAnwserList[i];
  }
}

/* ****************************************** Получение рекорда ***************************************************** */

// Получение рекорда иp памяти
function getRecord() {
  let a;
  if (levelSelected === "Лёгкий") {
    a = Math.max.apply(null, statisticEasy);
  }
  if (levelSelected === "Средний") {
    //  a =  localStorage.getItem("record-medium");
    a = Math.max.apply(null, statisticMedium);
  }
  if (levelSelected === "Сложный") {
    a = Math.max.apply(null, statisticHard);
  }

  if (a > 0) {
    record = a;
  } else {
    record = 0;
  }
  recordText.classList.remove("hide");
  recordText.innerHTML = `Ваш рекорд: ${record}`;
  setRecord();
}

/* Проверка рекорда */
function setRecord() {
  if (score > record) {
    recordText.innerHTML = `Ваш рекорд: ${score}`;
  }
}

/* ****************************************** Статистика игры ***************************************************** */

// Конструктор сохранения статистики
function generateStatisticConstructor(list, data, keyRecord, keyData) {
  let today = new Date();   // создаем новый объект `Date`
  let now = today.toLocaleString();   // получаем дату и время
  let listCount = 10; // Количество строк в таблице

  // Если счёт больше нуля
  if (score != 0) {
    if (list.length < listCount) {
      list.push(score); // Сохраняем массив с результатом 
      data.push(now); // Сохраняем время игры в массив
    } else {
      list.splice(0, 1); // Удаляем первый элемент массива  
      data.splice(0, 1); // Удаляем первый элемент массива
      list.push(score); // Сохраняем массив с результатом 
      data.push(now); // Сохраняем время игры в массив
    }
    localStorage.setItem(keyRecord, JSON.stringify(list)); // Сохраняем массив с результатом в память
    localStorage.setItem(keyData, JSON.stringify(data)); // Сохраняем массив с датой в память
  }
}

// Сохранение статистики исходя из уровня
function setStatisticByLevel() {
  if (levelSelected === "Лёгкий") {
    generateStatisticConstructor(statisticEasy, dataEasy, keyRecordEasy, keyDataEasy);
  } else if (levelSelected === "Средний") {
    generateStatisticConstructor(statisticMedium, dataMedium, keyRecordMedium, keyDataMedium);
  } else if (levelSelected == "Сложный") {
    generateStatisticConstructor(statisticHard, dataHard, keyRecordHard, keyDataHard);
  }
}

// Загрузка только рекорда для следующего дня
function onlyGetRecord(list) {
  let bul = false;
  let now = new Date();   // создаем новый объект `Date`
  let today = now.getDate();   // получаем дату
  let yesterday = String(list[list.length - 1]).substring(0, 2);
  if (today > yesterday) {
    bul = true;
  }
  // console.log(`Сегодня ${today}, вчера: ${yesterday}`, bul);
  return bul;
}

function getSTByLevelConstructor(list, data, keyList, keyData, best) {
  data = JSON.parse(localStorage.getItem(keyData)); // Загружаем массив с датой из памяти
  list = JSON.parse(localStorage.getItem(keyList)); // Загружаем массив со счётом из памяти
  best.textContent = `Рекорд: ${Math.max.apply(null, list)}`; // Публикация рекорда
  if (onlyGetRecord(data)) {
    let tempRecord = Math.max.apply(null, list); // Наилучший результат из списка
    let tempPosition = list.indexOf(tempRecord); // Позиция наилучшего результата
    let tempData = data[tempPosition]; // Дата наилучшего результата
    list.splice(0, list.length); // Очищаем массив со счётом
    data.splice(0, list.length); // Очищаем массив с датой
    list.push(tempRecord);
    data.push(tempData);
    // localStorage.removeItem(keyList);
    // localStorage.removeItem(keyData);
  }
  return { x: list, y: data };
}

// Получение статистики исходя из уровня
function getStatisticByLevel() {

  if (localStorage.getItem(keyRecordEasy) != null) {
    let values = getSTByLevelConstructor(statisticEasy, dataEasy, keyRecordEasy, keyDataEasy, bestEasy);
    statisticEasy = values.x;
    dataEasy = values.y;
  }
  if (localStorage.getItem(keyRecordMedium) != null) {
    let values = getSTByLevelConstructor(statisticMedium, dataMedium, keyRecordMedium, keyDataMedium, bestMedium);
    statisticMedium = values.x;
    dataMedium = values.y;
  }
  if (localStorage.getItem(keyRecordHard) != null) {
    let values = getSTByLevelConstructor(statisticHard, dataHard, keyRecordHard, keyRecordHard, bestHard);
    statisticHard = values.x;
    dataHard = values.y;
  }
}

// Функция формирования статистики на странице «Статистика»
function createStatistic() {

  // Конструктор формирование статистики на странице
  let generateTableConstructor = (list, data, table) => {
    for (let i = 0; i < list.length; i++) {
      let row = document.createElement("div"); // Создаем строку со счетом
      row.classList.add("table__row") // Присваиваем ей класс оформления
      let firstTD = document.createElement("div"); // Ячейчка с порядковым номером
      let secondTD = document.createElement("div"); // Ячейка с датой
      let thirdTD = document.createElement("div"); // Ячейка со счётом
      table.append(row);
      row.append(firstTD);
      row.append(secondTD);
      row.append(thirdTD);
      firstTD.innerHTML = `${i + 1})`;
      secondTD.innerHTML = `${data[i]}`
      thirdTD.innerHTML = `${list[i]}`;

      // Проверка на максимальное значение массива
      let maxScore = Math.max.apply(null, list);
      if (list[i] === maxScore) {
        thirdTD.style.color = "red";
        thirdTD.innerHTML = `${list[i]}!`;
      }
    }
  }
  generateTableConstructor(statisticEasy, dataEasy, tableEasy);
  generateTableConstructor(statisticMedium, dataMedium, tableMedium);
  generateTableConstructor(statisticHard, dataHard, tableHard);
}



// слайдер 



/**
 * @class ItcSlider
 * @version 1.0.1
 * @author https://github.com/itchief
 * @copyright Alexander Maltsev 2020 - 2023
 * @license MIT (https://github.com/itchief/ui-components/blob/master/LICENSE)
 * @tutorial https://itchief.ru/javascript/slider
 */

class ItcSlider {
  static #EL_WRAPPER = 'wrapper';
  static #EL_ITEMS = 'items';
  static #EL_ITEM = 'item';
  static #EL_ITEM_ACTIVE = 'item-active';
  static #EL_INDICATOR = 'indicator';
  static #EL_INDICATOR_ACTIVE = 'indicator-active';
  static #BTN_PREV = 'btn-prev';
  static #BTN_NEXT = 'btn-next';
  static #BTN_HIDE = 'btn-hide';
  static #TRANSITION_NONE = 'transition-none';

  static #instances = [];

  #config;
  #state;

  /**
   * @param {HTMLElement} el
   * @param {Object} config
   * @param {String} prefix
   */
  constructor(el, config = {}, prefix = 'itc-slider-') {
    this.#state = {
      prefix, // префикс для классов
      el, // элемент который нужно активировать как ItcSlider
      elWrapper: el.querySelector(`.${prefix}${this.constructor.#EL_WRAPPER}`), // элемент с #CLASS_WRAPPER
      elItems: el.querySelector(`.${prefix}${this.constructor.#EL_ITEMS}`), // элемент, в котором находятся слайды
      elListItem: el.querySelectorAll(`.${prefix}${this.constructor.#EL_ITEM}`), // список элементов, являющиеся слайдами
      btnPrev: el.querySelector(`.${prefix}${this.constructor.#BTN_PREV}`), // кнопка, для перехода к предыдущему слайду
      btnNext: el.querySelector(`.${prefix}${this.constructor.#BTN_NEXT}`), // кнопка, для перехода к следующему слайду
      btnClassHide: prefix + this.constructor.#BTN_HIDE, // класс для скрытия кнопки
      exOrderMin: 0,
      exOrderMax: 0,
      exItemMin: null,
      exItemMax: null,
      exTranslateMin: 0,
      exTranslateMax: 0,
      direction: 'next', // направление смены слайдов
      intervalId: null, // id таймера
      isSwiping: false,
      swipeX: 0,
    };

    this.#config = {
      loop: true, autoplay: false, interval: 5000, refresh: true, swipe: true, ...config
    };

    this.#init();
    this.#attachEvents();
  }

  /**
   * Статический метод, который возвращает экземпляр ItcSlider, связанный с DOM-элементом
   * @param {HTMLElement} elSlider
   * @returns {?ItcSlider}
   */
  static getInstance(elSlider) {
    const found = this.#instances.find((el) => el.target === elSlider);
    if (found) {
      return found.instance;
    }
    return null;
  }

  /**
   * @param {String|HTMLElement} target
   * @param {Object} config
   * @param {String} prefix
   */
  static getOrCreateInstance(target, config = {}, prefix = 'itc-slider-') {
    const elSlider = typeof target === 'string' ? document.querySelector(target) : target;
    const result = this.getInstance(elSlider);
    if (result) {
      return result;
    }
    const slider = new this(elSlider, config, prefix);
    this.#instances.push({ target: elSlider, instance: slider });
    return slider;
  }

  // статический метод для активирования элементов как ItcSlider на основе data-атрибутов
  static createInstances() {
    document.querySelectorAll('[data-slider="itc-slider"]').forEach((el) => {
      const { dataset } = el;
      const params = {};
      Object.keys(dataset).forEach((key) => {
        if (key === 'slider') {
          return;
        }
        let value = dataset[key];
        value = value === 'true' ? true : value;
        value = value === 'false' ? false : value;
        value = Number.isNaN(Number(value)) ? Number(value) : value;
        params[key] = value;
      });
      this.getOrCreateInstance(el, params);
    });
  }

  slideNext() {
    this.#state.direction = 'next';
    this.#move();
  }

  slidePrev() {
    this.#state.direction = 'prev';
    this.#move();
  }

  slideTo(index) {
    this.#moveTo(index);
  }

  reset() {
    this.#reset();
  }

  get autoplay() {
    return {
      // Start autoplay
      start: () => {
        this.#config.autoplay = true;
        this.#autoplay();
      },
      // Stop autoplay
      stop: () => {
        this.#autoplay('stop');
        this.#config.autoplay = false;
      }
    };
  }

  dispose() {
    this.#detachEvents();
    const transitionNoneClass = this.#state.prefix + this.constructor.#TRANSITION_NONE;
    const activeClass = this.#state.prefix + this.constructor.#EL_ITEM_ACTIVE;
    this.#autoplay('stop');
    this.#state.elItems.classList.add(transitionNoneClass);
    this.#state.elItems.style.transform = '';
    this.#state.elListItem.forEach((el) => {
      el.style.transform = '';
      el.classList.remove(activeClass);
    });
    const selIndicators = `${this.#state.prefix}${this.constructor.#EL_INDICATOR_ACTIVE}`;
    document.querySelectorAll(`.${selIndicators}`).forEach((el) => {
      el.classList.remove(selIndicators);
    });
    this.#state.elItems.offsetHeight;
    this.#state.elItems.classList.remove(transitionNoneClass);
    const index = this.constructor.#instances.findIndex((el) => el.target === this.#state.el);
    this.constructor.#instances.splice(index, 1);
  }

  #onClick(e) {
    if (!(e.target.closest('.itc-slider-btn') || e.target.closest('.itc-slider-indicators'))) {
      return;
    }
    e.preventDefault();
    const classBtnPrev = this.#state.prefix + this.constructor.#BTN_PREV;
    const classBtnNext = this.#state.prefix + this.constructor.#BTN_NEXT;
    this.#autoplay('stop');
    if (e.target.closest(`.${classBtnPrev}`) || e.target.closest(`.${classBtnNext}`)) {
      this.#state.direction = e.target.closest(`.${classBtnPrev}`) ? 'prev' : 'next';
      this.#move();
    } else if (e.target.dataset.slideTo) {
      const index = parseInt(e.target.dataset.slideTo, 10);
      this.#moveTo(index);
    }
    this.#config.loop ? this.#autoplay() : null;
  }

  #onMouseEnter() {
    this.#autoplay('stop');
  }

  #onMouseLeave() {
    this.#autoplay();
  }

  #onResize() {
    window.requestAnimationFrame(this.#reset.bind(this));
  }

  #onSwipeStart(e) {
    this.#autoplay('stop');
    const event = e.type.search('touch') === 0 ? e.touches[0] : e;
    this.#state.swipeX = event.clientX;
    this.#state.isSwiping = true;
  }

  #onSwipeEnd(e) {
    if (!this.#state.isSwiping) {
      return;
    }
    const event = e.type.search('touch') === 0 ? e.changedTouches[0] : e;
    const diffPos = this.#state.swipeX - event.clientX;
    if (diffPos > 50) {
      this.#state.direction = 'next';
      this.#move();
    } else if (diffPos < -50) {
      this.#state.direction = 'prev';
      this.#move();
    }
    this.#state.isSwiping = false;
    if (this.#config.loop) {
      this.#autoplay();
    }
  }

  #onTransitionStart() {
    if (this.#state.isBalancing) {
      return;
    }
    this.#state.isBalancing = true;
    window.requestAnimationFrame(this.#balanceItems.bind(this));
  }

  #onTransitionEnd() {
    this.#state.isBalancing = false;
  }

  #onDragStart(e) {
    e.preventDefault();
  }

  #onVisibilityChange() {
    if (document.visibilityState === 'hidden') {
      this.#autoplay('stop');
    } else if (document.visibilityState === 'visible' && this.#config.loop) {
      this.#autoplay();
    }
  }

  #attachEvents() {
    this.#state.events = {
      click: [this.#state.el, this.#onClick.bind(this), true],
      mouseenter: [this.#state.el, this.#onMouseEnter.bind(this), true],
      mouseleave: [this.#state.el, this.#onMouseLeave.bind(this), true],
      resize: [window, this.#onResize.bind(this), this.#config.refresh],
      animating: [this.#state.elItems, this.#onTransitionStart.bind(this), this.#config.loop],
      transitionend: [this.#state.elItems, this.#onTransitionEnd.bind(this), this.#config.loop],
      touchstart: [this.#state.el, this.#onSwipeStart.bind(this), this.#config.swipe],
      mousedown: [this.#state.el, this.#onSwipeStart.bind(this), this.#config.swipe],
      touchend: [document, this.#onSwipeEnd.bind(this), this.#config.swipe],
      mouseup: [document, this.#onSwipeEnd.bind(this), this.#config.swipe],
      dragstart: [this.#state.el, this.#onDragStart.bind(this), true],
      visibilitychange: [document, this.#onVisibilityChange.bind(this), true]
    };
    Object.keys(this.#state.events).forEach((type) => {
      if (this.#state.events[type][2]) {
        const el = this.#state.events[type][0];
        const fn = this.#state.events[type][1];
        el.addEventListener(type, fn);
      }
    });
  }

  #detachEvents() {
    Object.keys(this.#state.events).forEach((type) => {
      if (this.#state.events[type][2]) {
        const el = this.#state.events[type][0];
        const fn = this.#state.events[type][1];
        el.removeEventListener(type, fn);
      }
    });
  }

  #autoplay(action) {
    if (!this.#config.autoplay) {
      return;
    }
    if (action === 'stop') {
      clearInterval(this.#state.intervalId);
      this.#state.intervalId = null;
      return;
    }
    if (this.#state.intervalId === null) {
      this.#state.intervalId = setInterval(() => {
        this.#state.direction = 'next';
        this.#move();
      }, this.#config.interval);
    }
  }

  #balanceItems() {
    if (!this.#state.isBalancing) {
      return;
    }
    const wrapperRect = this.#state.elWrapper.getBoundingClientRect();
    const targetWidth = wrapperRect.width / this.#state.countActiveItems / 2;
    const countItems = this.#state.elListItem.length;
    if (this.#state.direction === 'next') {
      const exItemRectRight = this.#state.exItemMin.getBoundingClientRect().right;
      if (exItemRectRight < wrapperRect.left - targetWidth) {
        const elFound = this.#state.els.find((item) => item.el === this.#state.exItemMin);
        elFound.order = this.#state.exOrderMin + countItems;
        const translate = this.#state.exTranslateMin + countItems * this.#state.width;
        elFound.translate = translate;
        this.#state.exItemMin.style.transform = `translate3D(${translate}px, 0px, 0.1px)`;
        this.#updateExProperties();
      }
    } else {
      const exItemRectLeft = this.#state.exItemMax.getBoundingClientRect().left;
      if (exItemRectLeft > wrapperRect.right + targetWidth) {
        const elFound = this.#state.els.find((item) => item.el === this.#state.exItemMax);
        elFound.order = this.#state.exOrderMax - countItems;
        const translate = this.#state.exTranslateMax - countItems * this.#state.width;
        elFound.translate = translate;
        this.#state.exItemMax.style.transform = `translate3D(${translate}px, 0px, 0.1px)`;
        this.#updateExProperties();
      }
    }
    window.requestAnimationFrame(this.#balanceItems.bind(this));
  }

  #updateClasses() {
    const activeClass = this.#state.prefix + this.constructor.#EL_ITEM_ACTIVE;
    this.#state.activeItems.forEach((item, index) => {
      if (item) {
        this.#state.elListItem[index].classList.add(activeClass);
        levelSelected = levelList[index].getAttribute("data-level");
        levelActive.classList.remove("active-card");
        btnLvelInfo.innerHTML = `Уровень: «${levelSelected}»`;


      } else {
        this.#state.elListItem[index].classList.remove(activeClass);
      }
      const elListIndicators = this.#state.el.querySelectorAll(`.${this.#state.prefix}${this.constructor.#EL_INDICATOR}`);
      if (elListIndicators.length && item) {
        elListIndicators[index].classList.add(`${this.#state.prefix}${this.constructor.#EL_INDICATOR_ACTIVE}`);
      } else if (elListIndicators.length && !item) {
        elListIndicators[index].classList.remove(`${this.#state.prefix}${this.constructor.#EL_INDICATOR_ACTIVE}`);
      }
    });
  }

  #move() {
    const widthItem = this.#state.direction === 'next' ? -this.#state.width : this.#state.width;
    const transform = this.#state.translate + widthItem;
    if (!this.#config.loop) {
      const limit = this.#state.width * (this.#state.elListItem.length - this.#state.countActiveItems);
      if (transform < -limit || transform > 0) {
        return;
      }
      if (this.#state.btnPrev) {
        this.#state.btnPrev.classList.remove(this.#state.btnClassHide);
        this.#state.btnNext.classList.remove(this.#state.btnClassHide);
      }
      if (this.#state.btnPrev && transform === -limit) {
        this.#state.btnNext.classList.add(this.#state.btnClassHide);
      } else if (this.#state.btnPrev && transform === 0) {
        this.#state.btnPrev.classList.add(this.#state.btnClassHide);
      }
    }
    if (this.#state.direction === 'next') {
      this.#state.activeItems = [...this.#state.activeItems.slice(-1), ...this.#state.activeItems.slice(0, -1)];
    } else {
      this.#state.activeItems = [...this.#state.activeItems.slice(1), ...this.#state.activeItems.slice(0, 1)];
    }
    this.#updateClasses();
    this.#state.translate = transform;
    this.#state.elItems.style.transform = `translate3D(${transform}px, 0px, 0.1px)`;
    this.#state.elItems.dispatchEvent(new Event('animating', {
      bubbles: true
    }));
  }

  #moveTo(index) {
    const delta = this.#state.activeItems.reduce((acc, current, currentIndex) => {
      const diff = current ? index - currentIndex : acc;
      return Math.abs(diff) < Math.abs(acc) ? diff : acc;
    }, this.#state.activeItems.length);
    if (delta !== 0) {
      this.#state.direction = delta > 0 ? 'next' : 'prev';
      for (let i = 0; i < Math.abs(delta); i++) {
        this.#move();
      }
    }
  }

  // приватный метод для выполнения первичной инициализации
  #init() {
    // состояние элементов
    this.#state.els = [];
    // текущее значение translate
    this.#state.translate = 0;
    // позиции активных элементов
    this.#state.activeItems = [];
    // состояние элементов
    this.#state.isBalancing = false;
    // получаем gap между слайдами
    const gap = parseFloat(getComputedStyle(this.#state.elItems).gap) || 0;
    // ширина одного слайда
    this.#state.width = this.#state.elListItem[0].getBoundingClientRect().width + gap;
    // ширина #EL_WRAPPER
    const widthWrapper = this.#state.elWrapper.getBoundingClientRect().width;
    // количество активных элементов
    this.#state.countActiveItems = Math.round(widthWrapper / this.#state.width);
    this.#state.elListItem.forEach((el, index) => {
      el.style.transform = '';
      this.#state.activeItems.push(index < this.#state.countActiveItems ? 1 : 0);
      this.#state.els.push({
        el, index, order: index, translate: 0
      });
    });
    if (this.#config.loop) {
      const lastIndex = this.#state.elListItem.length - 1;
      const translate = -(lastIndex + 1) * this.#state.width;
      this.#state.elListItem[lastIndex].style.transform = `translate3D(${translate}px, 0px, 0.1px)`;
      this.#state.els[lastIndex].order = -1;
      this.#state.els[lastIndex].translate = translate;
      this.#updateExProperties();
    } else if (this.#state.btnPrev) {
      this.#state.btnPrev.classList.add(this.#state.btnClassHide);
    }
    this.#updateClasses();
    this.#autoplay();
  }

  #reset() {
    const transitionNoneClass = this.#state.prefix + this.constructor.#TRANSITION_NONE;
    // получаем gap между слайдами
    const gap = parseFloat(getComputedStyle(this.#state.elItems).gap) || 0;
    // ширина одного слайда
    const widthItem = this.#state.elListItem[0].getBoundingClientRect().width + gap;
    const widthWrapper = this.#state.elWrapper.getBoundingClientRect().width;
    const countActiveEls = Math.round(widthWrapper / widthItem);
    if (widthItem === this.#state.width && countActiveEls === this.#state.countActiveItems) {
      return;
    }
    this.#autoplay('stop');
    this.#state.elItems.classList.add(transitionNoneClass);
    this.#state.elItems.style.transform = 'translate3D(0px, 0px, 0.1px)';
    this.#init();
    window.requestAnimationFrame(() => {
      this.#state.elItems.classList.remove(transitionNoneClass);
    });
  }

  #updateExProperties() {
    const els = this.#state.els.map((item) => item.el);
    const orders = this.#state.els.map((item) => item.order);
    this.#state.exOrderMin = Math.min(...orders);
    this.#state.exOrderMax = Math.max(...orders);
    const min = orders.indexOf(this.#state.exOrderMin);
    const max = orders.indexOf(this.#state.exOrderMax);
    this.#state.exItemMin = els[min];
    this.#state.exItemMax = els[max];
    this.#state.exTranslateMin = this.#state.els[min].translate;
    this.#state.exTranslateMax = this.#state.els[max].translate;
  }
}

ItcSlider.createInstances();

