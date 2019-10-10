const $ = (selector, base = document) => base.querySelector(selector);
const $$ = (selector, base = document) => base.querySelectorAll(selector);
const Observer = require('./observer');

module.exports = class extends Observer {
    constructor() {
        super();
        this.subscribe(() => this.initColumns());
        this.subscribe(() => this.initCards());
        this.subscribe(() => this.initColBtns());
    }

    getCoordinatesBetweenColumns() {
        const res = [];
        const mainDOM = $('#main');
        const columnWrappers = $$('.column-wrapper');
        const { scrollWidth } = mainDOM;
        columnWrappers.forEach((wrapper, idx) => {
            const { offsetLeft } = wrapper;
            if (idx === 0) res.push({ left: 0, right: offsetLeft });
            else res.push({ left: offsetLeft - res[0].right, right: offsetLeft });
        });
        res.push({ left: scrollWidth - res[0].right, right: scrollWidth });
        return res;
    }

    findIndexToInsertColumns(coordinates, mousePos) {
        let first = 0;
        let mid = 0;
        let last = coordinates.length - 1;
        while (first <= last) {
            mid = Math.floor((first + last) / 2);
            if (coordinates[mid].left <= mousePos && mousePos <= coordinates[mid].right) {
                return mid;
            } else if (coordinates[mid].left > mousePos) {
                last = mid - 1;
            } else {
                first = mid + 1;
            }
        }
        return -1;
    }

    columnWrapperDragStartHandler(e) {
        e.stopPropagation();
        e.target.style.opacity = 0.5;
    }

    getMouseXposInMain() {
        return $('#main').scrollLeft + window.event.clientX;
    }

    getMouseYPosInColumn(columnMainElement){
        return columnMainElement.scrollTop + window.event.clientY;
    }

    columnWrapperDragEndHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        e.target.style.opacity = 1;
        if (e.target.className !== 'column-wrapper') return;
        const mainDOM = $('#main');
        const coordinates = this.getCoordinatesBetweenColumns();
        const mousePos = this.getMouseXposInMain();
        const idxToInsert = this.findIndexToInsertColumns(coordinates, mousePos);
        if (idxToInsert === -1) return;
        if (idxToInsert === 0) {
            mainDOM.firstChild.prepend(e.target);
            this.updateColumnAndCardIdx();
        }
        else if (idxToInsert === coordinates.length - 1) {
            mainDOM.firstChild.appendChild(e.target);
            this.updateColumnAndCardIdx();
        }
        else {
            mainDOM.firstChild.insertBefore(e.target, $(`.column-wrapper[column-idx='${idxToInsert}']`));
            this.updateColumnAndCardIdx();
        }
    }

    updateColumnAndCardIdx() {
        Object.entries($('.column-container').children)
            .map(([column_idx, element]) => (element.setAttribute('column-idx', column_idx), element));
        $$('.column-main').forEach(col_main => 
            Object.entries(col_main.children).map(([card_idx, card_wrapper]) => 
                (card_wrapper.setAttribute('card-idx', card_idx), card_wrapper)));
        // DB update
    }

    cardWrapperDragStartHandler(e) {
        e.stopPropagation();
        e.target.style.opacity = 0.5;
    }

    getCardWrapper(element) {
        if (element === document.body) return false;
        if (element.className === 'card-wrapper') return element;
        if (element.className === 'column-main') return element;
        return this.getCardWrapper(element.parentElement);
    }

    cardWrapperDragEndHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        e.target.style.opacity = 1;
        const cardWrapperOnMouse = this.getCardWrapper(e.target);
        const { clientX, clientY } = window.event;
        const cardWrapperAtMouse = this.getCardWrapper(document.elementFromPoint(clientX, clientY));
        if (!cardWrapperAtMouse || !cardWrapperOnMouse) return;
        const { offsetTop, offsetHeight } = cardWrapperAtMouse;
        const [ topPos, botPos ] = [ offsetTop, offsetTop + offsetHeight ];
        const mouseYpos = this.getMouseYPosInColumn(cardWrapperAtMouse.parentElement);
    
        if (cardWrapperAtMouse.className === 'card-wrapper') {
            if (mouseYpos < (topPos + botPos) / 2) {
                cardWrapperAtMouse.insertAdjacentElement('beforebegin', cardWrapperOnMouse);
            } else {
                cardWrapperAtMouse.insertAdjacentElement('afterend', cardWrapperOnMouse);
            }
        } else if (cardWrapperAtMouse.className === 'column-main') {
            cardWrapperAtMouse.appendChild(cardWrapperOnMouse);
            cardWrapperAtMouse.scrollTop += cardWrapperOnMouse.offsetHeight;
        }
        
        this.updateColumnAndCardIdx();
    }

    cardAddBtnHandler(e) {
        
    }

    initColumns() {
        $$('.column-wrapper').forEach(wrapper => {
            wrapper.addEventListener('dragstart', (e) => this.columnWrapperDragStartHandler(e));
            wrapper.addEventListener('dragover', (e) => e.preventDefault());
            wrapper.addEventListener('dragend', (e) => this.columnWrapperDragEndHandler(e));
        });
    }

    initCards() {
        $$('.card-wrapper').forEach(wrapper => {
            wrapper.addEventListener('dragstart', (e) => this.cardWrapperDragStartHandler(e));
            wrapper.addEventListener('dragover', (e) => e.preventDefault());
            wrapper.addEventListener('dragend', (e) => this.cardWrapperDragEndHandler(e));
        });
    }

    initColBtns() {
        $$('.column-add-btn').forEach(addBtn => {
            addBtn.addEventListener('click', (e) => this.cardAddBtnHandler(e));
        });
    }
}