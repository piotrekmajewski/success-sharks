import { FirstStep } from './Steps'
class Formularz {
    activeStep
    wrapperHTMLElement 

    constructor () {
        this.wrapperHTMLElement = document.getElementsByTagName('body')[0]
    }

    render () {
       this.activeStep.render() 
    }
}


window.formularz = new Formularz()
formularz.activeStep = new FirstStep()
formularz.render()