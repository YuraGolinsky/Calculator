const calculatorScreen = document.querySelector('.calculator-screen');
const keys = document.querySelector('.calculator-keys');
let currentInput = '';
let operator = '';
let previousInput = '';

keys.addEventListener('click', (event) => {
    const { target } = event;
    const value = target.textContent;

    if (target.classList.contains('btn')) {
        if (!isNaN(value) || value === '.') {
            // Обработка чисел и десятичной точки
            currentInput += value;
            calculatorScreen.value = currentInput;
        } else if (target.classList.contains('operator')) {
            // Обработка операторов
            operator = value;
            previousInput = currentInput;
            currentInput = '';
        } else if (value === '=') {
            // Обработка равенства
            currentInput = eval(previousInput + operator + currentInput);
            calculatorScreen.value = currentInput;
        }
    }
});

// Функция для сохранения результата в текстовый файл
document.getElementById('save-result').addEventListener('click', () => {
    const result = calculatorScreen.value;
    const blob = new Blob([`Result: ${result}`], { type: 'text/plain' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'calculator-result.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
