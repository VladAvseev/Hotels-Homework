function groupById(array) {
    const obj = {};
    array.forEach((item) => {
        obj[item.id] = item;
    });
    return obj;
}

const users = [
    {id: 'john', name: "John Smith", age: 20},
    {id: 'ann', name: "Ann Smith", age: 24},
    {id: 'pete', name: "Pete Peterson", age: 31},
];

const usersById = groupById(users);
console.log(usersById)
