module.exports = class {
    constructor(columnData) {
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
                <div class='column-main'>
                    ${this.cardRender(colData.cards)}
                </div>
            </li>`, '');
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