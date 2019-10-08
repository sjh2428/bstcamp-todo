const $ = (selector, base = document) => base.querySelector(selector);
const $$ = (selector, base = document) => base.querySelectorAll(selector);

const getCoordinatesBetweenColumns = () => {
    const res = [];
    const columnWrappers = $$('.column-wrapper');
    const mainDOM = document.querySelector('#main');
    columnWrappers.forEach((wrapper, idx) => {
        const { offsetLeft, offsetWidth } = wrapper;
        switch (idx) {
            case 0:
                res.push({ left: 0, right: offsetLeft });
                break;
            case columnWrappers.length - 1:
                res.push({ left: offsetLeft + offsetWidth, right: mainDOM.scrollWidth });
                break;
            default:
                res.push({ left: offsetLeft - res[0].right, right: offsetLeft });
        }
    });
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

$$('.column-wrapper').forEach(wrapper => {
    wrapper.addEventListener('dragstart', (e) => {
        e.target.style.opacity = 0.5;
    });
    wrapper.addEventListener('dragend', (e) => {
        e.target.style.opacity = 1;
        const mousePos = document.querySelector('#main').scrollLeft + window.event.clientX;
        findIndexToInsertColumns(getCoordinatesBetweenColumns(), mousePos);
    });
});