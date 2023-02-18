function pow(x, n) {
    let result = x;
    for (let i = 1; i < n; i++) {
        result *= x;
    }
    return result;
}

const x = prompt("x?", '');
const n = prompt("n?", '');

if (n < 1) {
    alert(`введенная степень не поддерживается`);
} else {
    alert(pow(x, n));
}