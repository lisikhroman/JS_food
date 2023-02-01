'use strict';

window.addEventListener('DOMContentLoaded', () => {

    //Tabs

    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent() {
        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        })
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

    //Timer

    const deadline = '2023-02-05';

    function getTimeRemaining(endtime) {
        const t = Date.parse(endtime) - Date.parse(new Date()),
            days = Math.floor(t / (1000 * 60 * 60 * 24)),
            hours = Math.floor((t / (1000 * 60 * 60) % 24)),
            minutes = Math.floor((t / 1000 / 60) % 60),
            seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    function setClock(selector, endtime) {
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    //Modal

    const modalTriggers = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');

    function openModal() {
        // modal.classList.add('show');
        // modal.classList.remove('hide');
        modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.toggle('show');
        document.body.style.overflow = '';
    }

    modalTriggers.forEach(btn => {
        btn.addEventListener('click', openModal)
    });

    modalCloseBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 5000);

    function showModalByScroll() {
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal();
            window.removeEventListener('scroll', showModalByScroll);
        }
    }

    window.addEventListener('scroll', showModalByScroll);

    //Function constructor
    // function User(name, id) {
    //     this.name = name;
    //     this.id = id;
    //     this.human = true;
    //     this.hello = function () {
    //         console.log(`Hello ${this.name}`)
    //     }
    // }
    //
    // const ivan = new User('Ivan', 28),
    //     alex = new User('Alex', 29)
    //
    // console.log(ivan);
    // console.log(alex);
    //
    // ivan.hello();
    //
    // User.prototype.exit = function (name) {
    //     console.log(`Пользователь ${this.name} вышел`)
    // }
    //
    // ivan.exit();


    //Контрекст вызова. This

    // function showThis(a, b) {
    //     console.log(this);
    //     function sum() {
    //         console.log(this);
    //         return a + b;
    //     }
    //
    //     console.log(sum());
    // }
    //
    // showThis(4, 5);
    //
    // const obj = {
    //     a: 20,
    //     b: 15,
    //     sum: function () {
    //         console.log(this)
    //         function shout() {
    //             console.log(this)
    //         }
    //         shout();
    //     }
    // }
    //
    // obj.sum();


    // function User(name, id) {
    //     this.name = name;
    //     this.id = id;
    //     this.human = true;
    //     this.hello = function () {
    //         console.log(`Hello ${this.name}`)
    //     }
    // }
    //
    // let ivan = new User('Ivan', 28)

    // function sayName(surname) {
    //     console.log(this);
    //     console.log(this.name + surname);
    // }
    //
    // const user = {
    //     name: 'John'
    // };
    //
    // sayName.call(user, 'Smith');
    // sayName.apply(user, ['Smith']);
    //
    // function count(num) {
    //     return this*num;
    // }
    //
    // const double = count.bind(2);
    // console.log(double(3))
    // console.log(double(13))

    // const btn = document.querySelector('button');
    //
    // btn.addEventListener('click', (e) => {
    //     e.target.style.backgroundColor = 'red'
    // })
    //
    // const obj = {
    //     num: 5,
    //     sayNumber: function () {
    //         const say = () => {
    //             console.log(this.num);
    //         }
    //
    //         say();
    //     }
    // }
    //
    // obj.sayNumber();
    //
    // const double = a => a * 2;
    //
    // console.log(double(4))

    //1) Обычная функция: this = window, но если стоит use strict, то undefined
    //2) Контекст у методов объекта - сам объект
    //3) this в конструкторах и классах - это новый экземпляр объекта
    //4) Ручная привязка this: call, apply, bind.



    //Class

    class Rectangle {
        constructor(height, weight) {
            this.height = height;
            this.weight = weight;
        }

        calcArea() {
            return this.height * this.weight;
        }
    }

    class ColoredRectangleWithText extends Rectangle {
        constructor(height, width, text, color) {
            super(height, width);
            this.text = text;
            this.color = color;
        }

        showMyProps() {
            console.log(`Текст: ${this.text}, цвет: ${this.color}`)
        }
    }

    const div = new ColoredRectangleWithText(25, 10, 'hello', 'red')
    div.showMyProps();
    console.log(div.calcArea())

    // const square = new Rectangle(2, 4);
    // console.log(square.calcArea())

    //Используем классы

    class MenuCard {
        constructor(src, alt, title, descr, price, parentSelector, ...classes) {
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const element = document.createElement('div');

            if (this.classes.length === 0) {
                this.element = 'menu__item';
                element.classList.add(this.element);
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }

            element.innerHTML = `
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                </div>
            `;
            this.parent.append(element);
        }
    }

    new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    'Меню "Фитнес"',
    'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. '
    + 'Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    8,
    '.menu .container',
    'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд.'
    + 'Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        9,
        '.menu .container',
        'menu__item'
    ).render();

    new MenuCard(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения,'
    + 'молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        10,
        '.menu .container',
        'menu__item'
    ).render();

    //Rest элемент

    // const log = function (a, b, ...rest) {
    //     console.log(a, b, rest);
    // }
    //
    // log('basic', 'rest', 'operator', 'usage')
    //
    // function calcOrDouble(number, basis = 5) {
    //     console.log(number * basis);
    // }


    //JSON

    const persone = {
        name: 'Alex',
        tel: '+76325487219',
        parents: {
            mom: 'Olga',
            dad: 'Mike'
        }
    }

    const clone = JSON.parse(JSON.stringify(persone))
    clone.parents.mom = 'Ann';

    console.log(persone)
    console.log(clone)



});