import View from "./View.js"
import Model from "./Model.js"

export default class Controller {

    gyroEventShiftRate = 1.5
    animSpeed = 0.05
    positionX = 0
    positionY = 0
    coordXProcent = 0
    coordYProcent = 0
    tresholdSet = []
    
    

    constructor(){
        for(let i = 0; i<= 1.0; i+= 0.005){
            this.tresholdSet.push(i)
         }

    
        this.onMouseEvent = this.onMouseEvent.bind(this)
        this.onGyroEvent = this.onGyroEvent.bind(this)
        this.runParalaxEffet = this.runParalaxEffet.bind(this)

        this.view = new View(this)
        this.model = new Model()
        this.runParalaxEffet()
    }

    runParalaxEffet(){
        const distX = this.coordXProcent - this.positionX;
        const distY = this.coordYProcent - this.positionY;


        this.positionX = this.positionX + (distX * this.animSpeed) 
        this.positionY = this.positionY + (distY * this.animSpeed)

        this.view.mouseUpdateParalax(this.positionX,this.positionY)

        requestAnimationFrame(this.runParalaxEffet)
    }

    onMouseEvent(e, parallax) {
        let coordX = e.pageX - parallax.offsetWidth / 2;
        let coordY = e.pageY - parallax.offsetHeight / 2;

         this.coordXProcent = coordX / parallax.offsetWidth * 100;
         this.coordYProcent = coordY / parallax.offsetHeight * 100;
    }

    onGyroEvent(e){
        this.coordXProcent = e.gamma * this.gyroEventShiftRate
        this.coordYProcent = e.beta * this.gyroEventShiftRate
    }
   

  

}