webpackJsonp([0],{

/***/ 89:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function($, Velocity) {

$(function () {
    // Logo
    Velocity({
        e: $('.logo'),
        p: {
            opacity: [1, 0],
            translateX: ['0px', '20px']
        },
        o: {
            delay: 100,
            duration: 2000,
            easing: 'easeOutExpo'
        }
    });

    // Intro
    Velocity({
        e: $('.intro .lead'),
        p: {
            opacity: [1, 0],
            translateY: ['0px', '-20px']
        },
        o: {
            easing: 'easeOutQuint',
            stagger: 500,
            duration: 1500,
            delay: 300,
            complete: function complete() {
                Velocity({
                    e: document.querySelector('.intro'),
                    p: {
                        backgroundColor: ['#000', '#fff'],
                        color: ['#ffffff', '#464646']
                    },
                    o: {
                        duration: 1500,
                        easing: 'easeInOutQuint'
                    }
                });
            }
        }
    });
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(21), __webpack_require__(38)))

/***/ })

},[89]);