const $ = (selector, base = document) => base.querySelector(selector);
const $$ = (selector, base = document) => base.querySelectorAll(selector);

$$('.column-wrapper').forEach(wrapper => {
    wrapper.addEventListener('dragstart', (e) => {
        e.target.style.opacity = 0.5;
    });
    wrapper.addEventListener('dragend', (e) => {
        e.target.style.opacity = 1;
    });
})