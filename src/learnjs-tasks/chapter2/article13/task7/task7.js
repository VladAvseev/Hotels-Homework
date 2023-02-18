const num = +prompt("Введите число", 0);

function sieveOfEratosthenes(num) {
    const array = [];
    const limit = Math.sqrt(num);
    const result = [];
    // заполняю массив true
    for (let i = 2; i < num; i++) {
        array.push(true);
    }

    // Удаляю кратные 2, 3, 5...
    for (let i = 2; i <= limit; i++) {
        if (array[i]) {
            for (let j = i * i; j < num; j += i) {
                array[j] = false;
            }
        }
    }

    // Все значения массива со значением true являются простыми числами
    for (let i = 2; i < num; i++) {
        if(array[i]) {
            result.push(i);
        }
    }

    return result;
}

alert(sieveOfEratosthenes(num));

