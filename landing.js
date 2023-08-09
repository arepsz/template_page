//smooth animation when clicking the navbar elements
document.querySelectorAll('a[href^="#"]').forEach(elem => {
    elem.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

//after scrolling 200 pixels, the navbar gets the navbar-scrolled class + progress bar gets colored by the percentage of scroll
let nav = document.querySelector('nav')
let progress_bar = document.querySelector('.progress-bar')

window.addEventListener(
    'scroll',
    _.throttle(e => {
        nav.classList.toggle('navbar-scrolled', window.scrollY > 200)
        const full_height = document.documentElement.scrollHeight - document.documentElement.clientHeight
        progress_bar.style.width = (window.scrollY / full_height) * 100 + "%"
    },
    80)
)

//create the fade animations for the elements with data-scroll attribute

const animation_observer = new IntersectionObserver(
    entries => {
        for(const entry of entries){
            if(entry.isIntersecting){
                entry.target.classList.add(
                    'animate__animated',
                    'animate__' + entry.target.dataset.scrollAnimation
                )
            }
        }
    },
    { threshold: 1 }
)

document.querySelectorAll('[data-scroll]').forEach(element => animation_observer.observe(element))

let nav_links = document.querySelectorAll('.nav-link, .navbar-brand')
const nav_observer = new IntersectionObserver(checkForNavLink, {threshold: 0.8})

function checkForNavLink(entries){
    entries.forEach(entry => {
        if(entry.isIntersecting){
            nav_links.forEach(link => {
                console.log(entry.target.id)
                if(entry.target.id === link.href.split('#')[1]){
                    link.classList.add('active')
                }else{
                    link.classList.remove('active')
                }
            })
        }
    })
}

document.querySelectorAll('section[id]').forEach(e => nav_observer.observe(e))

function animateNumber(obj) {
    start_timer = 0, end_timer = 2019, timer_duration = 1000
    if(obj[0].isIntersecting){
        let startTimestamp = null;
        const step = timestamp => {
            if (!startTimestamp) {
                startTimestamp = timestamp;
            }
            const progress = Math.min((timestamp - startTimestamp) / timer_duration, 1);
            obj[0].target.innerHTML = Math.floor(progress * (end_timer - start_timer) + start_timer);
            console.log(start_timer)
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        }
        window.requestAnimationFrame(step);
    }
}
const number = document.querySelector('footer span');

const number_observer = new IntersectionObserver(animateNumber, { threshold: 0.7 })
number_observer.observe(number)
