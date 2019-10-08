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

const columnWrapperDragStartHandler = (e) => e.target.style.opacity = 0.5;

const columnWrapperDragEndHandler = (e) => {
    e.target.style.opacity = 1;
    const mainDOM = $('#main');
    const mousePos = mainDOM.scrollLeft + window.event.clientX;
    const idxToInsert = findIndexToInsertColumns(getCoordinatesBetweenColumns(), mousePos);
}

$$('.column-wrapper').forEach(wrapper => {
    wrapper.addEventListener('dragstart', (e) => columnWrapperDragStartHandler(e));
    wrapper.addEventListener('dragend', (e) => columnWrapperDragEndHandler(e));
});