
class FirstStep {
    render () {
        const title = document.createElement('h1')
        title.innerText = 'Formularz kontaktowy'

        let stepTitle = document.createElement('h3')
        stepTitle.innerText = 'Krok 1'

        const button1 = document.createElement('button')
        button1.innerText = 'Jestem klientem'

        const button2 = document.createElement('button')
        button2.innerText = 'Jestem kandydatem'

        formularz.wrapperHTMLElement.innerHTML = ''
        formularz.wrapperHTMLElement.appendChild(title)
        formularz.wrapperHTMLElement.appendChild(stepTitle)
        formularz.wrapperHTMLElement.appendChild(button1)
        formularz.wrapperHTMLElement.appendChild(button2)

        button1.addEventListener('click', () => {
            formularz.activeStep = new SecondStep('klient')
            formularz.render()
        })

        button2.addEventListener('click', () => {
            formularz.activeStep = new SecondStep('kandydat')
            formularz.render()
        })
    }
}

class SecondStep {
    constructor (a) {
        this.type = a
    }
    render () {
        const title = document.createElement('h1')
        title.innerText = 'Formularz kontaktowy'

        let stepTitle = document.createElement('h3')
        stepTitle.innerText = 'Krok 2'

        const formWrapper = document.createElement('div')
        let input1, input2, input3

        if (this.type === 'klient') {
            console.log('klient')

            input1 = document.createElement('input')
            input1.placeholder = 'Nazwa firmy'
            formWrapper.appendChild(input1)

            input2 = document.createElement('textarea')
            input2.placeholder = 'Treść wiadomości'
            formWrapper.appendChild(input2)
        }
        else if (this.type === 'kandydat') {
            // console.log('kandydat')
            input1 = document.createElement('input')
            input1.placeholder = 'Imię i nazwisko'
            formWrapper.appendChild(input1)

            input2 = document.createElement('textarea')
            input2.placeholder = 'Treść wiadomości'
            formWrapper.appendChild(input2)

            fetch('http://pliki.rekiny.wroclaw.pl/rekrutacja/stanowiska.json')
                .then(response => response.json())
                .then(body => {
                    console.log(body)
                    input3 = document.createElement('select')
                    for (var i = 0; i < body.length; i++) {
                        const option = document.createElement('option')
                        option.value = body[i]
                        option.innerText = body[i]
                        input3.appendChild(option)
                    }
                    formWrapper.appendChild(input3)
                })
        }

        const errorWrapper = document.createElement('div')

        const button = document.createElement('button')
        button.innerText = 'Wyślij'

        const button2 = document.createElement('button')
        button2.innerText = 'Powrót'

        formularz.wrapperHTMLElement.innerHTML = ''
        formularz.wrapperHTMLElement.appendChild(title)
        formularz.wrapperHTMLElement.appendChild(stepTitle)
        formularz.wrapperHTMLElement.appendChild(formWrapper)
        formularz.wrapperHTMLElement.appendChild(errorWrapper)
        formularz.wrapperHTMLElement.appendChild(button)
        formularz.wrapperHTMLElement.appendChild(button2)

        button.addEventListener('click', () => {
            if (!input1.value || !input2.value) {
                errorWrapper.textContent = "Któreś z pól wymaganych nie zostało uzupełnione1"
                return
            }
            let body = {}

            if (this.type === 'klient') {
                body.companyName = input1.value
                body.content = input2.value
            }
            else if (this.type === 'kandydat') {
                body.name = input1.value
                body.content = input2.value
                body.stanowisko = input3.value
            }

            fetch('http://pliki.rekiny.wroclaw.pl/rekrutacja/api', {
                method: 'PUT',
                body
            })
            formularz.activeStep = new LastStep()
            formularz.render()
        })
        button2.addEventListener('click', () => {
            formularz.activeStep = new FirstStep()
            formularz.render()
        })
    }
}

class LastStep {
    render () {
        const title = document.createElement('h1')
        title.innerText = 'Formularz kontaktowy'

        let stepTitle = document.createElement('h3')
        stepTitle.innerText = 'Krok 3'

        let info = document.createElement('h3')
        info.innerText = 'Dziękujemy za wysłanie formularza kontaktowego'
    
        formularz.wrapperHTMLElement.innerHTML = ''
    formularz.wrapperHTMLElement.appendChild(title)
    formularz.wrapperHTMLElement.appendChild(stepTitle)
        formularz.wrapperHTMLElement.appendChild(info)
    }
}

export { FirstStep, SecondStep }