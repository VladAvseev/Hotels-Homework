class Rabbit extends Object {
    constructor(name) {
        super();
        this.name = name;
    }
}

const rabbit = new Rabbit("Кроль");
console.log(rabbit.hasOwnProperty('name'));