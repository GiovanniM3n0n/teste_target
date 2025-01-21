const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function isFibonacci(num) {
    if (num < 0) return false;

    let a = 0;
    let b = 1;

    while (a <= num) {
        if (a === num) {
            return true;
        }
        const next = a + b;
        a = b;
        b = next;
    }

    return false;
}

rl.question("Digite um número para verificar se pertence à sequência de Fibonacci: ", (input) => {
    const number = parseInt(input, 10);

    if (isNaN(number)) {
        console.log("Por favor, insira um número válido.");
    } else if (isFibonacci(number)) {
        console.log(`${number} pertence à sequência de Fibonacci.`);
    } else {
        console.log(`${number} não pertence à sequência de Fibonacci.`);
    }

    rl.close();
});
