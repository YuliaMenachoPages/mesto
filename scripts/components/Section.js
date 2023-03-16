// Создайте класс Section, который отвечает за отрисовку элементов на странице. Этот класс:
//     1)Первым параметром конструктора принимает объект с двумя свойствами: items и renderer.
//     Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса.
//     Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
//    2) Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
//    3) Содержит публичный метод, который отвечает за отрисовку всех элементов. Отрисовка каждого отдельного элемента должна осуществляться функцией renderer.
//    4) Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
//   5) У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.


export default class Section {
    constructor({ items, renderer }, containerSelector) {
       this._container = document.querySelector(containerSelector);
       this._renderedItems = items;
       this._renderer = renderer;
    }

    renderItems() {
    this._renderedItems.forEach((item) => {
    this._renderer(item);
});
}

    addItem(element) {
        this._container.prepend(element);
    }

}

/*

    export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItem(element) {
    this._container.append(element);
  }

  clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this.clear();

    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}

 */