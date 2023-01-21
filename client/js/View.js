

export default class View {
    ambientShift = 40
    surroundShift = 20
    personShift = 10
    personScrollShift = 3
    surroundScrollShift = 6

    constructor(controller) {
        this.controller = controller
        this.intersectionCallback = this.intersectionCallback.bind(this)
        this.init()
    }


    init() {
        window.onload = () => {
            this.parallax = document.querySelector('.parallax')
            this.initparallaxContainer = document.querySelector('.parallax-container')
            this.ambient = document.querySelector('.images-parallax-ambient')
            this.surround = document.querySelector('.images-parallax-surround')
            this.person = document.querySelector('.images-parallax-person')
            this.contentSection = document.querySelector('.content')
            this.navigation = document.querySelector('nav')

            this.parallax.onmousemove = (e) => {
                this.controller.onMouseEvent(e, this.parallax)
            }

            this.navigation.onclick = (e) => {
                this.onNavClick(e)
                
            }

            if (window.DeviceOrientationEvent) {
                window.addEventListener('deviceorientation', (e) => {
                    this.controller.onGyroEvent(e)
                })
            }

            new IntersectionObserver(this.intersectionCallback, {
                threshold: this.controller.tresholdSet
            }).observe(this.contentSection)
        }
    }

    intersectionCallback(entries, observer) {
        const scrollTopProcent = window.scrollY / this.parallax.offsetHeight * 100
        this.scrollUpdateParallax(scrollTopProcent)
    }

    mouseUpdateParalax(x, y) {

        if (this.ambient) this.ambient.style.cssText = `transform: translate(${x / this.ambientShift}%,${y / this.ambientShift}%);`
        if (this.surround) this.surround.style.cssText = `transform: translate(${x / this.surroundShift}%,${y / this.surroundShift}%);`
        if (this.person) this.person.style.cssText = `transform: translate(${x / this.personShift}%,${y / this.personShift}%);`

    }

    scrollUpdateParallax(scrollTopProcent) {
        this.surround.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / this.surroundScrollShift}%);`
        this.person.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / this.personScrollShift}%);`
    }

    onNavClick(e){
        console.log('nav click');
        let target = e.target.closest('.nav-link')
        if(target){
            let links = target.parentNode.getElementsByClassName('nav-link')
            if(links) Array.from(links).forEach(link => link.classList.remove('active'))
            target.classList.add('active')
        }
        
    }
}