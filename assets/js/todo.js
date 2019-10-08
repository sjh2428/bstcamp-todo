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

const columnWrapperDragStartHandler = (target) => target.style.opacity = 0.5;

const columnWrapperDragEndHandler = (target) => {
	target.style.opacity = 1;
	if (target.className !== 'column-wrapper') return;
	const mainDOM = $('#main');
	const coordinates = getCoordinatesBetweenColumns();
	const mousePos = mainDOM.scrollLeft + window.event.clientX;
	const idxToInsert = findIndexToInsertColumns(coordinates, mousePos);
	if (idxToInsert === -1) return;
	if (idxToInsert === 0) mainDOM.firstChild.prepend(target);
	else if (idxToInsert === coordinates.length - 1) mainDOM.firstChild.appendChild(target);
	else mainDOM.firstChild.insertBefore(target, $(`.column-wrapper[data-idx='${idxToInsert}']`));
}

$$('.column-wrapper').forEach(wrapper => {
    wrapper.addEventListener('dragstart', (e) => columnWrapperDragStartHandler(e.target));
    wrapper.addEventListener('dragend', (e) => columnWrapperDragEndHandler(e.target));
});