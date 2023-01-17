'use strict'

window.onload = () => {

    const parallax = document.querySelector('.parallax')
    if(parallax){
        const parallaxContainer = document.querySelector('.parallax-container')
        const clouds = document.querySelector('.images-parallax-clouds')
        const mountain = document.querySelector('.images-parallax-mountains')
        const human = document.querySelector('.images-parallax-human')
        const content = document.querySelector('.content')

        //ratio
        let forClouds = 40
        let forMountains = 20
        let forHuman = 10

        let animSpeed = 0.05

        let positionX = 0;
        let positionY = 0;
        let coordXProcent = 0;
        let coordYProcent = 0
        
        function setMouseParallaxStyle(){
            const distX = coordXProcent - positionX;
            const distY = coordYProcent - positionY;


            positionX = positionX + (distX * animSpeed)
            positionY = positionY + (distY * animSpeed)

 

            clouds.style.cssText = `transform: translate(${positionX / forClouds}%,${positionY / forClouds}%);`
            mountain.style.cssText = `transform: translate(${positionX / forMountains}%,${positionY / forMountains}%);`
            human.style.cssText = `transform: translate(${positionX / forHuman}%,${positionY / forHuman}%);`
            

            requestAnimationFrame(setMouseParallaxStyle)
        }
        setMouseParallaxStyle()



        parallax.onmousemove = (e) => {
            let coordX = e.pageX - parallax.offsetWidth / 2;
            let coordY = e.pageY - parallax.offsetHeight / 2;
 
             coordXProcent = coordX / parallax.offsetWidth * 100;
             coordYProcent = coordY / parallax.offsetHeight * 100;
         }


         let tresholdSet = []
         for(let i = 0; i<= 1.0; i+= 0.005){
            tresholdSet.push(i)
         }
         
         const callback = function(entries,observer){
            const scrollTopProcent = window.scrollY / parallax.offsetHeight * 100
            setParallaxItemsStyle(scrollTopProcent)
         }

         let observer = new IntersectionObserver(callback,{
            threshold: tresholdSet
         })

         observer.observe(content)


         function setParallaxItemsStyle(scrollTopProcent){
            mountain.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 6}%);`
            human.parentElement.style.cssText = `transform: translate(0%,-${scrollTopProcent / 3}%);`
         }
         

    }
}

