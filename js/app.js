const CONFIG = {
    // true — кнопка смены темы видна и тему можно менять; false — кнопки нет, сайт всегда светлый
    themeSwitcher: false
};

const THEME_KEY = 'travelguide-theme';

const THEME_ICONS = '<svg class="themeToggle__moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/></svg>' +
    '<svg class="themeToggle__sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

class Theme {
    static current() {
        if (!CONFIG.themeSwitcher) return 'light';
        try {
            return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
        } catch (e) {
            return 'light';
        }
    }

    static apply(theme) {
        if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
        else document.documentElement.removeAttribute('data-theme');
        Theme.updateButton();
    }

    static toggle() {
        const theme = Theme.current() === 'dark' ? 'light' : 'dark';
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (e) {}
        Theme.apply(theme);
    }

    static renderButton() {
        if (!CONFIG.themeSwitcher) return;
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'themeToggle';
        button.innerHTML = THEME_ICONS;
        button.addEventListener('click', Theme.toggle);
        document.body.prepend(button);
        Theme.updateButton();
    }

    static updateButton() {
        const button = document.querySelector('.themeToggle');
        if (!button) return;
        const dark = Theme.current() === 'dark';
        button.setAttribute('aria-pressed', String(dark));
        button.setAttribute('aria-label', Lang.t(dark ? 'themeLight' : 'themeDark'));
    }

    static init() {
        Theme.apply(Theme.current());
        window.addEventListener('pageshow', () => Theme.apply(Theme.current()));
        window.addEventListener('storage', (e) => {
            if (e.key === THEME_KEY) Theme.apply(Theme.current());
        });
    }
}

const Lang = {

    current() {
        return (document.documentElement.lang || 'ru').slice(0, 2).toLowerCase();
    },

    t(key) {
        if (typeof UI_TEXT === 'undefined') return '';
        return (UI_TEXT[this.current()] || UI_TEXT.ru)[key];
    }
};

function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (ch) => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[ch]);
}

function escapeAttr(str) {
    return String(str).replace(/"/g, '&quot;');
}

function htmlToText(html) {
    const el = document.createElement('div');
    el.innerHTML = html;
    return el.textContent.replace(/\s+/g, ' ').trim();
}

class Carousel {
    constructor(wrapperElement, trackElement, options = {}) {
        this.wrapper = wrapperElement;
        this.track = trackElement;
        this.options = {
            animationSpeed: 300,
            dragThreshold: 5,
            keyboardStep: 400,
            ...options
        };
        this.currentTranslate = 0;
        this.isDragging = false;
        this.startPos = 0;
        this.prevTranslate = 0;
        this.animationID = 0;
        this.hasMoved = false;
        this.startTime = 0;
        this.velocity = 0;
        this.lastPos = 0;
        this.lastTime = 0;
        this.init();
    }

    static initAll() {
        document.querySelectorAll('.carousel').forEach(carousel => {
            const wrapper = carousel.querySelector('.carousel__wrapper');
            const track = carousel.querySelector('.carousel__track');
            if (!wrapper || !track) return;
            ScrollHint.insertBefore(wrapper);
            new Carousel(wrapper, track);
        });
    }

    init() {
        this.track.style.overflow = 'visible';
        this.track.style.scrollSnapType = 'none';
        this.wrapper.style.overflow = 'hidden';
        this.setPosition();
        this.addEventListeners();
    }

    setPosition(animate = false) {
        this.track.classList.toggle('t-slds_animated', animate);
        this.track.style.transform = `translateX(${this.currentTranslate}px)`;
        if (animate) setTimeout(() => this.track.classList.remove('t-slds_animated'), this.options.animationSpeed);
    }

    getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    getBounds() {
        return {
            maxTranslate: 0,
            minTranslate: -(this.track.scrollWidth - this.wrapper.offsetWidth)
        };
    }

    dragStart(event) {
        if (event.type === 'mousedown' && event.button !== 0) return;
        this.isDragging = true;
        this.hasMoved = false;
        this.startPos = this.getPositionX(event);
        this.prevTranslate = this.currentTranslate;
        this.startTime = Date.now();
        this.lastPos = this.startPos;
        this.lastTime = this.startTime;
        this.velocity = 0;
        cancelAnimationFrame(this.animationID);
        this.track.classList.add('grabbing');
        this.track.style.cursor = 'grabbing';
    }

    drag(event) {
        if (!this.isDragging) return;
        const currentPosition = this.getPositionX(event);
        const currentTime = Date.now();
        const deltaX = Math.abs(currentPosition - this.startPos);
        const deltaTime = currentTime - this.lastTime;
        if (deltaTime > 0) {
            this.velocity = (currentPosition - this.lastPos) / deltaTime;
            this.lastPos = currentPosition;
            this.lastTime = currentTime;
        }
        if (deltaX > this.options.dragThreshold) {
            this.hasMoved = true;
            if (event.type === 'touchmove' && event.cancelable) event.preventDefault();
            let newTranslate = this.prevTranslate + currentPosition - this.startPos;
            const {
                maxTranslate,
                minTranslate
            } = this.getBounds();
            if (newTranslate > maxTranslate) newTranslate = maxTranslate + (newTranslate - maxTranslate) * 0.3;
            else if (newTranslate < minTranslate) newTranslate = minTranslate + (newTranslate - minTranslate) * 0.3;
            this.currentTranslate = newTranslate;
            this.setPosition(false);
        }
    }

    dragEnd() {
        if (!this.isDragging) return;
        const timeDiff = Date.now() - this.startTime;
        this.isDragging = false;
        this.track.classList.remove('grabbing');
        this.track.style.cursor = 'grab';
        if (timeDiff < 150 && !this.hasMoved) return;
        if (this.hasMoved && Math.abs(this.velocity) > 0.1) {
            const {
                maxTranslate,
                minTranslate
            } = this.getBounds();
            const targetTranslate = this.currentTranslate + this.velocity * 200;
            this.animateToPosition(Math.max(minTranslate, Math.min(maxTranslate, targetTranslate)));
        } else {
            this.snapToBounds();
        }
        if (this.hasMoved) setTimeout(() => {
            this.hasMoved = false;
        }, 50);
    }

    animateToPosition(targetTranslate) {
        const startTranslate = this.currentTranslate;
        const distance = targetTranslate - startTranslate;
        const startTime = performance.now();
        const duration = this.options.animationSpeed;
        const animate = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            this.currentTranslate = startTranslate + distance * easeProgress;
            this.setPosition(false);
            if (progress < 1) this.animationID = requestAnimationFrame(animate);
            else this.snapToBounds();
        };
        this.animationID = requestAnimationFrame(animate);
    }

    snapToBounds() {
        const {
            maxTranslate,
            minTranslate
        } = this.getBounds();
        if (this.currentTranslate > maxTranslate) {
            this.currentTranslate = maxTranslate;
            this.setPosition(true);
        } else if (this.currentTranslate < minTranslate) {
            this.currentTranslate = minTranslate;
            this.setPosition(true);
        }
    }

    preventClick(event) {
        if (this.hasMoved) {
            event.preventDefault();
            event.stopPropagation();
            event.stopImmediatePropagation();
        }
    }

    handleKeyboard(event) {
        let newTranslate;
        if (event.key === 'ArrowLeft') newTranslate = this.currentTranslate + this.options.keyboardStep;
        else if (event.key === 'ArrowRight') newTranslate = this.currentTranslate - this.options.keyboardStep;
        else return;
        event.preventDefault();
        const {
            maxTranslate,
            minTranslate
        } = this.getBounds();
        this.currentTranslate = Math.min(maxTranslate, Math.max(minTranslate, newTranslate));
        this.setPosition(true);
    }

    revealFocused(event) {
        const card = [...this.track.children].find(child => child.contains(event.target));
        if (!card) return;

        const left = card.offsetLeft - this.track.offsetLeft;
        const right = left + card.offsetWidth;
        const visibleLeft = -this.currentTranslate;
        const visibleRight = visibleLeft + this.track.clientWidth;
        if (left >= visibleLeft && right <= visibleRight) return;

        const {
            maxTranslate,
            minTranslate
        } = this.getBounds();
        const target = left < visibleLeft ? -left : this.track.clientWidth - right;
        this.currentTranslate = Math.min(maxTranslate, Math.max(minTranslate, target));
        this.setPosition(true);
    }

    handleResize() {
        const {
            minTranslate
        } = this.getBounds();
        if (this.currentTranslate < minTranslate) {
            this.currentTranslate = minTranslate;
            this.setPosition(false);
        }
    }

    addEventListeners() {
        this.track.addEventListener('mousedown', this.dragStart.bind(this));
        document.addEventListener('mousemove', this.drag.bind(this));
        document.addEventListener('mouseup', this.dragEnd.bind(this));
        this.track.addEventListener('touchstart', this.dragStart.bind(this), {
            passive: true
        });
        this.track.addEventListener('touchmove', this.drag.bind(this), {
            passive: false
        });
        this.track.addEventListener('touchend', this.dragEnd.bind(this));
        this.track.addEventListener('click', this.preventClick.bind(this), true);

        this.track.addEventListener('dragstart', (e) => e.preventDefault());
        this.track.setAttribute('tabindex', '0');
        this.track.addEventListener('keydown', this.handleKeyboard.bind(this));
        this.track.addEventListener('focusin', this.revealFocused.bind(this));
        this.wrapper.addEventListener('scroll', () => {
            if (this.wrapper.scrollLeft) this.wrapper.scrollLeft = 0;
        });
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.handleResize(), 150);
        });
        this.track.addEventListener('selectstart', (e) => {
            if (this.hasMoved) e.preventDefault();
        });
    }
}

class ScrollHint {
    static svg() {
        return `
        <svg viewBox="0 0 320 300" height="42" width="42">
            <rect class="scroll-hint-card" x="480" width="200" height="200" rx="5" fill="rgba(190,190,190,0.3)"></rect>
            <rect class="scroll-hint-card" y="0" width="200" height="200" rx="5" fill="rgba(190,190,190,0.3)"></rect>
            <rect class="scroll-hint-card" x="240" width="200" height="200" rx="5" fill="rgba(190,190,190,0.3)"></rect>
            <path class="scroll-hint-hand" d="M78.9579 285.7C78.9579 285.7 37.8579 212.5 20.5579 180.8C-2.44209 138.6 -6.2422 120.8 9.6579 112C19.5579 106.5 33.2579 108.8 41.6579 123.4L61.2579 154.6V32.3C61.2579 32.3 60.0579 0 83.0579 0C107.558 0 105.458 32.3 105.458 32.3V91.7C105.458 91.7 118.358 82.4 133.458 86.6C141.158 88.7 150.158 92.4 154.958 104.6C154.958 104.6 185.658 89.7 200.958 121.4C200.958 121.4 236.358 114.4 236.358 151.1C236.358 187.8 192.158 285.7 192.158 285.7H78.9579Z" fill="rgba(190,190,190,1)"></path>
        </svg>
    `;
    }

    static insertBefore(element) {
        ['carousel__scrollHint', 'carousel__scrollHint carousel__scrollHint--mobile'].forEach(className => {
            const hint = document.createElement('div');
            hint.className = className;
            hint.setAttribute('aria-hidden', 'true');
            hint.innerHTML = ScrollHint.svg();
            element.parentNode.insertBefore(hint, element);
        });
    }
}

class GuideCardRenderer {
    constructor(buttonText) {
        this.buttonText = buttonText;
    }

    render(track, items) {
        track.innerHTML = items.map(item => this.createCardHTML(item)).join('');
    }

    createCardHTML(item) {
        const title = escapeHtml(item.title);
        const label = escapeHtml(`${item.title} - ${this.buttonText.replace('→', '').trim()}`);
        return `
            <article class="guideCard" role="listitem">
                <a href="${escapeHtml(item.link)}" class="guideCard__link" aria-label="${label}">
                    <div class="guideCard__imageWrapper">
                        <img src="${escapeHtml(item.img)}" alt="${title}" class="guideCard__image" loading="lazy" width="360" height="480">
                    </div>
                    <div class="guideCard__content">
                        <div class="guideCard__contentInner">
                            <h3 class="guideCard__title">${title}</h3>
                            <div class="guideCard__buttonWrapper">
                                <span class="guideCard__button"><span class="guideCard__buttonText">${escapeHtml(this.buttonText)}</span></span>
                            </div>
                        </div>
                    </div>
                </a>
            </article>
        `;
    }
}

class AttractionCardRenderer {
    render(track, items) {
        track.innerHTML = items.map(item => {
            if (!item.modalContent) {
                console.warn(`Элемент ${item.id} не имеет модального контента`);
            }
            return this.createCardHTML(item);
        }).join('');
    }

    createCardHTML(item) {
        return `
            <article class="carousel__item">
                <div class="attractionCard">
                    <div class="attractionCard__link" data-modal="${escapeAttr(item.id)}" tabindex="0" role="button">
                        <div class="attractionCard__imageWrapper">
                            <img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.title)}" class="attractionCard__image" loading="lazy">
                        </div>
                        <div class="attractionCard__content">
                            <div class="attractionCard__contentInner">
                                <h3 class="attractionCard__title">${item.title}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </article>
        `;
    }
}

class ModalManager {
    constructor(data) {
        this.data = data;
        this.modal = document.getElementById('attractionModal');
        this.container = this.modal.querySelector('.modal__container');
        this.closeButton = this.modal.querySelector('.modal__close');
        this.modalContent = document.getElementById('modalContent');
        this.lastFocused = null;
        this.init();
    }

    init() {
        this.container.setAttribute('role', 'dialog');
        this.container.setAttribute('aria-modal', 'true');
        this.modalContent.setAttribute('tabindex', '-1');

        document.addEventListener('click', (e) => {
            const cardLink = e.target.closest('.attractionCard__link');

            if (cardLink && cardLink.dataset.modal) {
                this.openModal(cardLink.dataset.modal);
            }
        });

        this.closeButton.addEventListener('click', () => this.closeModal());

        document.addEventListener('keydown', (e) => {
            if (this.isOpen()) {
                if (e.key === 'Escape') this.closeModal();
                else if (e.key === 'Tab') this.keepFocusInside(e);
                return;
            }

            const cardLink = e.target.closest && e.target.closest('.attractionCard__link');
            if (cardLink && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                this.openModal(cardLink.dataset.modal);
            }
        });
    }

    isOpen() {
        return this.modal.classList.contains('active');
    }

    findItemById(id) {
        return Object.values(this.data).flat().find(item => item.id === id);
    }

    openModal(id) {
        const item = this.findItemById(id);
        if (!item) {
            console.error('Элемент не найден:', id);
            return;
        }

        this.lastFocused = document.activeElement;
        this.container.setAttribute('aria-label', htmlToText(item.title));
        this.modalContent.innerHTML = item.modalContent || `
            <div class="modalHeader">
                <h1 class="modalHeader__title">${item.title}</h1>
            </div>
        `;

        this.modal.classList.add('active');
        document.body.classList.add('modalOpen');
        this.modalContent.scrollTop = 0;
        this.modalContent.focus({
            preventScroll: true
        });
    }

    closeModal() {
        this.modal.classList.remove('active');
        document.body.classList.remove('modalOpen');
        if (this.lastFocused && this.lastFocused.focus) {
            this.lastFocused.focus({
                preventScroll: true
            });
        }
    }

    keepFocusInside(event) {
        const focusable = [this.closeButton, ...this.modalContent.querySelectorAll('a[href], button, [tabindex="0"]')];
        const index = focusable.indexOf(document.activeElement);
        const step = event.shiftKey ? -1 : 1;
        const next = index === -1 ? (event.shiftKey ? focusable.length - 1 : 0) : (index + step + focusable.length) % focusable.length;

        event.preventDefault();
        focusable[next].focus();
    }
}

class ImageFallback {
    static init() {
        document.addEventListener('error', (e) => {
            const img = e.target;
            if (img.tagName === 'IMG' && img.matches('.guideCard__image, .attractionCard__image')) {
                img.style.backgroundColor = '#cccccc';
                img.alt = Lang.t('imageUnavailable');
            }
        }, true);
    }
}

class PageTexts {

    static current() {
        const lang = Lang.current();
        const body = document.body;
        if (body.classList.contains('mainPage')) {
            return mainPageData[lang];
        }
        const city = cityPageData[body.dataset.city];
        if (!city) {
            console.error('Нет текстов города в js/city_data.js:', body.dataset.city);
            return null;
        }

        return {
            ...cityPageData.common[lang],
            banner: city.banner,
            ...city[lang]
        };
    }

    static apply(texts) {
        document.querySelectorAll('[data-text]').forEach(el => {
            const value = texts[el.dataset.text];
            if (value === undefined) {
                console.warn('Нет текста для ключа:', el.dataset.text);
                return;
            }

            if (el.tagName === 'TITLE') el.textContent = htmlToText(value);
            else el.innerHTML = value;
        });
        document.querySelectorAll('[data-bg]').forEach(el => {
            const value = texts[el.dataset.bg];
            if (value) el.style.backgroundImage = `url('${value}')`;
        });
    }
}

function renderCarousels(data, renderer) {
    document.querySelectorAll('.carousel__track[data-category]').forEach(track => {
        const items = data[track.dataset.category];
        if (items) renderer.render(track, items);
    });
}

class MainPage {
    constructor(texts) {
        renderCarousels(texts, new GuideCardRenderer(texts.buttonText));
        Carousel.initAll();
    }
}

class CityPage {
    constructor(data) {
        renderCarousels(data, new AttractionCardRenderer());
        Carousel.initAll();
        new ModalManager(data);
        CityPage.initAnchorScroll();
    }

    static initAnchorScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                if (href === '#') return;
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
}

class App {

    static applyTexts() {
        App.texts = PageTexts.current();
        if (App.texts) PageTexts.apply(App.texts);
    }

    static start() {
        if (!App.texts) return;
        ImageFallback.init();

        if (document.body.classList.contains('mainPage')) {
            new MainPage(App.texts);
        } else {
            if (!window.cityData) {
                console.error('Данные города не загружены (ожидается window.cityData)');
                return;
            }
            new CityPage(window.cityData);
        }
    }
}

Theme.init();
document.addEventListener('DOMContentLoaded', () => {
    App.applyTexts();
    Theme.renderButton();
    App.start();
});