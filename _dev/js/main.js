import 'velocity-animate/velocity.ui'

$(() => {
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
  })

  // Intro
  wrapWords($('.intro .lead'))
  Velocity({
    e: $('.intro .lead *'),
    p: {
      opacity: [1, 0],
      translateY: ['0px', '-20px'],
    },
    o: {
      easing: 'easeOutQuint',
      stagger: 500,
      duration: 1500,
      delay: 300,
      complete() {
        Velocity({
          e: document.querySelector('.intro'),
          p: {
            backgroundColor: ['#000', '#fff'],
            color: ['#ffffff', '#464646'],
          },
          o: {
            duration: 1500,
            easing: 'easeInOutQuint',
          }
        })
      }
    }
  })
})

function wrapWords($el, tmpl) {
  if ($el === null) return
  let str = $el.text()
  $el.html(str.replace(/\w+/g, tmpl || '<span>$&</span>'))
}

