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
        modal = document.querySelector('.modal');

    function openModal() {
        modal.classList.add('show');
        modal.classList.remove('hide');
        // modal.classList.toggle('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    function closeModal() {
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }

    modalTriggers.forEach(btn => {
        btn.addEventListener('click', openModal)
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal || event.target.getAttribute('data-close') === '') {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.code === "Escape" && modal.classList.contains('show')) {
            closeModal();
        }
    });

    const modalTimerId = setTimeout(openModal, 50000);

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

    // const getResource = async (url) => {
    //     const res = await fetch(url);
    //
    //     if (!res.ok) {
    //         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    //     }
    //
    //     return await res.json();
    // };

    // getResource('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
    //         })
    //     });

    //Axios

    axios.get('http://localhost:3000/menu')
        .then(data => {
            data.data.forEach(({img, altimg, title, descr, price}) => {
                new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
            })
        });

    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Меню "Фитнес"',
    //     'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. '
    //     + 'Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
    //     8,
    //     '.menu .container',
    //     'menu__item'
    // ).render();
    //
    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Меню “Премиум”',
    //     'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд.'
    //     + 'Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
    //     9,
    //     '.menu .container',
    //     'menu__item'
    // ).render();
    //
    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     'Меню "Постное"',
    //     'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения,'
    //     + 'молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
    //     10,
    //     '.menu .container',
    //     'menu__item'
    // ).render();

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

    //Forms

    const forms = document.querySelectorAll('form');

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    const postData = async (url, data) => {
        const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });

        return await res.json();
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            // form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            // const request = new XMLHttpRequest();
            // request.open('POST', 'server.php');


            //FormData
            // // request.setRequestHeader('Content-type', 'multipart/form-data'); //Когда используем связку XMLHttpRequest + FormData, то заголовок устанавливать не надо, он устанавливается автоматически!
            // const formData = new FormData(form);

            //JSON
            // request.setRequestHeader('Content-type', 'multipart/form-data');
            const formData = new FormData(form);

            const object = {};
            formData.forEach(function (value, key) {
                object[key] = value;
            });

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            postData('http://localhost:3000/requests', json)
                .then(data => data.text())
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });

            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal();

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>×</div>
                <div class="modal__title">${message}</div>
            </div>
            `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal();
        }, 4000)
    }
});

//Promise

// console.log('Запрос данных....');
//
// const req = new Promise(function (resolve, reject) {
//     setTimeout(() => {
//         console.log("Подготовка данных...");
//
//         const product = {
//             name: 'TV',
//             price: 20000
//         };
//
//         resolve(product);
//     }, 2000);
// });
//
// req.then((product) => {
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             product.status = 'order';
//             resolve(product);
//         }, 2000);
//     });
// }).then(data => {
//     data.modify = true;
//     return data;
// }).then((data) => {
//     console.log(data)
// }).catch(() => {
//     console.error('Произошла ошибка')
// }).finally(() => {
//     console.log('Finaly')
// });


//Promise: all race
// const test = time => {
//     return new Promise(resolve => {
//         setTimeout(() => resolve(), time)
//     });
// };

// test(1000).then(() => console.log('1000 ms'));
// test(2000).then(() => console.log('2000 ms'));

// Promise.all([test(1000), test(2000)]).then(() => {
//     console.log('All')
// });

// Promise.race([test(1000), test(2000)]).then(() => {
//     console.log('All')
// });


//Fetch API
// fetch('https://jsonplaceholder.typicode.com/posts', {
//     method: "POST",
//     body: JSON.stringify({name: 'Alex'}),
//     headers: {
//         'Content-type': 'application/json'
//     }
// })
//     .then(response => response.json())
//     .then(json => console.log(json));

// Filter
//     //1
//     const names = ['Ivan', 'Ann', 'Ksenia', 'Voldemar'];
//
//     const shortNames = names.filter(function (names) {
//         return names.length < 5;
//     });
//
//     console.log(shortNames)

// map
//
// let answers = ['IvAn', 'AnnA', 'Hello'];
//
// answers = answers.map(item => item.toLowerCase());
// console.log(answers);

//  every & some

// const some = [4, 'qwq', 'sfrefrf'];
// // console.log(some.some(item => typeof(item) === 'number'));
//
// console.log(some.every(item => typeof(item) === 'number'));

// reduce

// const arr = [4, 5, 1, 2, 6];
//
// const res = arr.reduce((sum, curent) => sum + curent );
// console.log(res)

// const obj = {
//     ivan: 'persone',
//     ann: 'persone',
//     dog: 'animal',
//     cat: 'animal'
// }
//
// const newArr = Object.entries(obj)
//     .filter(item => item[1] === 'persone')
//     .map(item => item[0]);
//
// console.log(newArr);

// fetch('http://localhost:3000/menu')
// .then(data => data.json())
// .then(res => console.log(res));