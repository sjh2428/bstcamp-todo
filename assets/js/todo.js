const $ = (selector, base = document) => base.querySelector(selector);
const $$ = (selector, base = document) => base.querySelectorAll(selector);

const getCoordinatesBetweenColumns = () => {
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

const findIndexToInsertColumns = (coordinates, mousePos) => {
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
};

const columnWrapperDragStartHandler = (e) => {
    e.stopPropagation();
    e.target.style.opacity = 0.5;
}

const getMouseXposInMain = () => $('#main').scrollLeft + window.event.clientX;
const getMouseYPosInColumn = (columnMainElement) => columnMainElement.scrollTop + window.event.clientY;

const columnWrapperDragEndHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
	e.target.style.opacity = 1;
	if (e.target.className !== 'column-wrapper') return;
	const mainDOM = $('#main');
	const coordinates = getCoordinatesBetweenColumns();
	const mousePos = getMouseXposInMain();
	const idxToInsert = findIndexToInsertColumns(coordinates, mousePos);
	if (idxToInsert === -1) return;
    if (idxToInsert === 0) {
        mainDOM.firstChild.prepend(e.target);
        updateColumnAndCardIdx();
    }
	else if (idxToInsert === coordinates.length - 1) {
        mainDOM.firstChild.appendChild(e.target);
        updateColumnAndCardIdx();
    }
	else {
        mainDOM.firstChild.insertBefore(e.target, $(`.column-wrapper[column-idx='${idxToInsert}']`));
        updateColumnAndCardIdx();
    }
}

const updateColumnAndCardIdx = () => {
    Object.entries($('.column-container').children)
        .map(([column_idx, element]) => (element.setAttribute('column-idx', column_idx), element));
    document.querySelectorAll('.column-main').forEach(col_main => 
        Object.entries(col_main.children).map(([card_idx, card_wrapper]) => 
            (card_wrapper.setAttribute('card-idx', card_idx), card_wrapper)));
    // DB update
}

$$('.column-wrapper').forEach(wrapper => {
    wrapper.addEventListener('dragstart', (e) => columnWrapperDragStartHandler(e));
    wrapper.addEventListener('dragover', (e) => e.preventDefault());
    wrapper.addEventListener('dragend', (e) => columnWrapperDragEndHandler(e));
});

const cardWrapperDragStartHandler = (e) => {
    e.stopPropagation();
    e.target.style.opacity = 0.5;
}

const getCardWrapper = (element) => {
    if (element === document.body) return false;
    if (element.className === 'card-wrapper') return element;
    if (element.className === 'column-main') return element;
    return getCardWrapper(element.parentElement);
}

const cardWrapperDragEndHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.target.style.opacity = 1;
    const cardWrapperOnMouse = getCardWrapper(e.target);
    const { clientX, clientY } = window.event;
    const cardWrapperAtMouse = getCardWrapper(document.elementFromPoint(clientX, clientY));
    if (!cardWrapperAtMouse || !cardWrapperOnMouse) return;
    const { offsetTop, offsetHeight } = cardWrapperAtMouse;
    const [ topPos, botPos ] = [ offsetTop, offsetTop + offsetHeight ];
    const mouseYpos = getMouseYPosInColumn(cardWrapperAtMouse.parentElement);

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
    
    updateColumnAndCardIdx();
}

$$('.card-wrapper').forEach(wrapper => {
    wrapper.addEventListener('dragstart', (e) => cardWrapperDragStartHandler(e));
    wrapper.addEventListener('dragover', (e) => e.preventDefault());
    wrapper.addEventListener('dragend', (e) => cardWrapperDragEndHandler(e));
});



(async () => {
    let columns, cards;
    await fetch('/api/columns?project_id=1').then(res => res.json())
    .then(res => columns = [...res]);
    await fetch('/api/cards?project_id=1').then(res => res.json())
    .then(res => cards = [...res]);
    const datas = columns.map(col => 
        (col.cards = cards.filter(card => 
            card.column_id === col.column_id), col));
    
    const Todos = require('./components/todos');
    const todos = new Todos(datas);
    $('#main').innerHTML = todos.render();
    $$('.column-wrapper').forEach(wrapper => {
        wrapper.addEventListener('dragstart', (e) => columnWrapperDragStartHandler(e));
        wrapper.addEventListener('dragover', (e) => e.preventDefault());
        wrapper.addEventListener('dragend', (e) => columnWrapperDragEndHandler(e));
    });
    $$('.card-wrapper').forEach(wrapper => {
        wrapper.addEventListener('dragstart', (e) => cardWrapperDragStartHandler(e));
        wrapper.addEventListener('dragover', (e) => e.preventDefault());
        wrapper.addEventListener('dragend', (e) => cardWrapperDragEndHandler(e));
    });
})();