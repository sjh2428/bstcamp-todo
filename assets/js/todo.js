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

console.log(getCoordinatesBetweenColumns());


$$('.column-wrapper').forEach(wrapper => {
    wrapper.addEventListener('dragstart', (e) => {
        e.target.style.opacity = 0.5;
    });
    wrapper.addEventListener('dragend', (e) => {
        e.target.style.opacity = 1;
    });
});



// document.querySelectorAll('.column-wrapper')[1].querySelector('.card-wrapper').addEventListener('dragover', (e) => {
// 	e.preventDefault();
// 	console.log(document.querySelector('#main').scrollLeft + window.event.clientX);
	
// })