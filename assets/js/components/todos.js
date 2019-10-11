const TodoEvents = require('../todo_events');

module.exports = class extends TodoEvents {
    constructor(columnData) {
        super();
        this.columnData = columnData;
    }

    columnRender() {
        return this.columnData.reduce((acc, colData) => acc + /*html*/
            `<li class='column-wrapper' draggable='true' column-idx='${colData.column_idx}' column-id=${colData.column_id}>
                <div class='column-head'>
                    <div class='column-name'>${colData.column_name}</div>
                    <div class='column-head-btns'>
                        <div class='column-add-btn'>+</div>
                        <div class='column-menu-btn'>&hellip;</div>
                    </div>
                </div>
                ${this.newTodoRender(colData.column_id)}
                <div class='column-main'>
                    ${this.cardRender(colData.cards)}
                </div>
            </li>`, '');
    }

    newTodoRender(column_id) {
        return (/*html*/`
            <div class='new-todo-wrapper' style='display: none;'>
                <input class='col_id' type=hidden value='${column_id}'>
                <div class='input-area-wrapper'>
                    <input class='card-input-title' type='text' name='card-title' placeholder='Title'>
                    <textarea class='card-input-content' name='card-content'></textarea>
                </div>
                <div class='input-files-wrapper'>
                    <input type='file' name='new-todo-files' multiple>
                </div>
                <div class='new-todo-btns'>
                    <div class='add-btn'>Add</div>
                    <div class='cancel-btn'>Cancel</div>
                </div>
            </div>
        `);
    }

    cardRender(cardsData) {
        return cardsData.reduce((acc, card) => acc + /*html*/
            `<div class='card-wrapper' draggable="true" card-idx=${card.card_idx} card-id=${card.card_id}>
                <div class='card-icon'>📑</div>
                <div class='card-main-wrapper'>
                    <div class='card-title'>${card.card_title}</div>
                    <div class='card-who'>Added By <span class='card-who-name'>${card.created_by}</span></div>
                </div>
                <div class='card-menu-btn'>&hellip;</div>
            </div>`, '');
    }

    render() {
        let html = '';
        html += `<ul class='column-container'>`;
        html += this.columnRender();
        html += `</ul>`;
        return html;
    }
};