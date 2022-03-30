
class Calculator{
    constructor(previousOp,currentOp){
        this.previousOp = previousOp
        this.currentOp = currentOp
        this.clear()
    }

    clear(){
        this.currentOperand = ""
        this.previousOperand = ""
        this.operate = undefined
    }

    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }

    appendNum(number){
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    operation(operate){
        if (this.currentOperand == '') return
        if (this.previousOperand !== ''){
            this.compute()
        }
        this.operate = operate
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute(){
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(current)) return
        switch (this.operate){
            case '+' :
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return    
        }

        this.currentOperand = computation
        this.operate = undefined
        this.previousOperand =''
    }

    getDisplayNumber(num){
        return num
    }

    updateDisplay(){
        this.currentOp.innerText = this.getDisplayNumber(this.currentOperand)
        if(this.operate != null){
            this.previousOp.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operate}`
        }

    }

}

const numberBtns = document.querySelectorAll('[data-number')
const operandBtns = document.querySelectorAll('[data-operation]')
const equalsBtn = document.querySelector('[data-equals]')
const deletBtn = document.querySelector('[data-delete]')
const previousOp = document.querySelector('[data-previous-operand]')
const currentOp = document.querySelector('[data-current-operand]')
const allClearBtn = document.querySelector('[data-all-clear]')



const cal = new Calculator(previousOp,currentOp)

numberBtns.forEach(button => {
    button.addEventListener('click',() =>{
        cal.appendNum(button.innerText)
        cal.updateDisplay()
    })
})

operandBtns.forEach(button => {
    button.addEventListener('click',() =>{
        cal.operation(button.innerText)
        cal.updateDisplay()
    })
})

equalsBtn.addEventListener("click" , button => {
    cal.compute()
    cal.updateDisplay()
})

allClearBtn.addEventListener('click',button =>{
    cal.clear()
    cal.updateDisplay()
})

deletBtn.addEventListener('click',button =>{
    cal.delete()
    cal.updateDisplay()
})
