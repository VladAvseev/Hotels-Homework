const fruits = ["Яблоки", "Груша", "Апельсин"];

// добавляем новое значение в "копию"
const shoppingCart = fruits;
shoppingCart.push("Банан");

// что в fruits?
console.log(fruits.length); // 4