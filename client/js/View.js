

export default class View {

    ambientShift = 40
    surroundShift = 20
    personShift = 10
    personScrollShift = 3
    surroundScrollShift = 6
    gyroEventShiftRate = 1.5
    animSpeed = 0.05
    positionX = 0
    positionY = 0
    coordXProcent = 0
    coordYProcent = 0
    tresholdSet = []

    constructor(controller) {
        this.controller = controller
        this.intersectionCallback = this.intersectionCallback.bind(this)
        this.runParalaxEffet = this.runParalaxEffet.bind(this)
        this.onGyroEvent = this.onGyroEvent.bind(this)


        for(let i = 0; i<= 1.0; i+= 0.005){
            this.tresholdSet.push(i)
         }

    }


    init() {
            this.parallax = document.querySelector('.parallax')
            this.initparallaxContainer = document.querySelector('.parallax-container')
            this.ambient = document.querySelector('.images-parallax-ambient')
            this.surround = document.querySelector('.images-parallax-surround')
            this.person = document.querySelector('.images-parallax-person')
            this.contentSection = document.querySelector('.content')
            this.navigation = document.querySelector('nav')
            this.navbarToggle = document.querySelector('.navbar-toggler')
            this.navLinks = document.querySelectorAll('.nav-link')
            this.navMenu = document.getElementById('collapse-menu')
            



            this.parallax.onmousemove = (e) => {
                this.onMouseEvent(e)
            }

            this.navigation.onclick = (e) => {
                this.onNavClick(e)
                
            }

            if (window.DeviceOrientationEvent) {
                window.addEventListener('deviceorientation', (e) => {
                    this.onGyroEvent(e)
                })
            }


            new IntersectionObserver(this.intersectionCallback, {
                threshold: this.tresholdSet
            }).observe(this.contentSection)

            this.navLinks.forEach((l) => {
                     l.addEventListener('click', () => { 
                        if(document.body.clientWidth <= 575){
                            new bootstrap.Collapse(this.navMenu)
                        }
                                   
                    })
            })

            this.runParalaxEffet()
    }


    runParalaxEffet(){
        const distX = this.coordXProcent - this.positionX;
        const distY = this.coordYProcent - this.positionY;


        this.positionX = this.positionX + (distX * this.animSpeed) 
        this.positionY = this.positionY + (distY * this.animSpeed)

        this.mouseUpdateParalax(this.positionX,this.positionY)

        requestAnimationFrame(this.runParalaxEffet)
    }

    onMouseEvent(e) {
        let coordX = e.pageX - this.parallax.offsetWidth / 2;
        let coordY = e.pageY - this.parallax.offsetHeight / 2;

         this.coordXProcent = coordX / this.parallax.offsetWidth * 100;
         this.coordYProcent = coordY / this.parallax.offsetHeight * 100;
    }

    onGyroEvent(e){
        this.coordXProcent = e.gamma * this.gyroEventShiftRate
        this.coordYProcent = e.beta * this.gyroEventShiftRate
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
        let target = e.target.closest('.nav-link')
        if(target){
            let links = target.parentNode.getElementsByClassName('nav-link')
            if(links) Array.from(links).forEach(link => link.classList.remove('active'))
            target.classList.add('active')
        }
        
    }
}