const Todos = require('./components/todos');

const $ = (selector, base = document) => base.querySelector(selector);
const $$ = (selector, base = document) => base.querySelectorAll(selector);

(async () => {
    let columns, cards;
    await fetch('/api/columns?project_id=1').then(res => res.json())
    .then(res => columns = [...res]);
    await fetch('/api/cards?project_id=1').then(res => res.json())
    .then(res => cards = [...res]);
    const datas = columns.map(col => 
        (col.cards = cards.filter(card => 
            card.column_id === col.column_id), col));
    const todos = new Todos(datas)
    $('#main').innerHTML = todos.render();
    todos.notify();
})();