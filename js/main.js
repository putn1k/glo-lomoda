const headerCityButton = document.querySelector('.header__city-button');

if (localStorage.getItem('myLocation')) {
    headerCityButton.textContent = localStorage.getItem('myLocation');
}

headerCityButton.textContent = localStorage.getItem('myLocation') || 'Ваш город?';

headerCityButton.addEventListener( 'click', () => {
    const city = prompt('Укажите Ваш город');
    headerCityButton.textContent = city;
    localStorage.setItem('myLocation', city);
});

const subheaderCart = document.querySelector('.subheader__cart');
const cartOverlay = document.querySelector('.cart-overlay');

const disableScroll = () => {
    const scrollWidth = window.innerWidth - document.body.offsetWidth;
    document.body.dbScrollY = window.scrollY;
    document.body.style.cssText = `
        position: fixed;
        top: ${-window.scrollY}px;
        left: 0;
        width: 100%;
        height: 100vh;
        overflow: hidden;
        padding-right: ${scrollWidth}px;
    `;
};

const enableScroll = () => {
    document.body.style.cssText = '';
    window.scroll({
        top: document.body.dbScrollY,
    });
};

const cartModalOpen = () => {
    cartOverlay.classList.add('cart-overlay-open');
    disableScroll();
};

const cartModalClose = () => {
    cartOverlay.classList.remove('cart-overlay-open');
    enableScroll();
};

subheaderCart.addEventListener( 'click', cartModalOpen);

cartOverlay.addEventListener( 'click', (event) => {
    const target = event.target;
    if (target.matches('.cart__btn-close') || target.matches('.cart-overlay')) {
        cartModalClose();
    }
});

window.addEventListener( 'keydown', (event) => {
    if (cartOverlay.matches('.cart-overlay-open') && (event.keyCode === 27)) {
        cartModalClose();
    }
});
