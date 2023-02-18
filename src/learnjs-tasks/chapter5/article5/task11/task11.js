function getAverageAge(users) {
    return users.reduce((prev, user) => prev + user.age, 0) / users.length;
}

const vasya = { name: "Вася", age: 25 };
const petya = { name: "Петя", age: 30 };
const masha = { name: "Маша", age: 29 };

const arr = [ vasya, petya, masha ];

console.log(getAverageAge(arr));