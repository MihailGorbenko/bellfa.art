import View from "./View.js"
import Model from "./Model.js"

export default class Controller {
    constructor(){

        this.view = new View(this)
        this.model = new Model()

        document.addEventListener('DOMContentLoaded', () => {
            this.view.init()
        })

        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (e) => {
                view.onGyroEvent(e)
            })
        }
        
        
    }

}