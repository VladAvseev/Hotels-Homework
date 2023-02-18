class Product {
    name;
    price;
    quantity;
    description;

    constructor(name, price, quantity, description) {
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
    }
}

const products = [
    new Product('iphone 5', 20000, 100, 'Описания для iphone 5'),
    new Product('iphone X', 30000, 42, 'Описания для iphone X'),
    new Product('iphone X Pro', 35000, 24, 'Описания для iphone X Pro'),
    new Product('MacBook 2016', 51000, 7, 'Описания для MacBook 2016'),
    new Product('MacBook Air', 120000, 12, 'Описания для MacBook Air'),
    new Product('Apple Watch Series 6', 32000, 264, 'Описания для Apple Watch Series 6'),
    new Product('AirPods', 10000, 999, 'Описания для AirPods'),
    new Product('iMac Pro', 192000, 50, 'Описания для iMac Pro'),
];

// name-contains-fd&price-=2&quantity->5&description-ends-abc
// возможны (contains, starts, ends для строковых и <, =, >, <=, >= для числовых)
const stringModifiers = {
    contains: 'contains',
    starts: 'starts',
    ends: 'ends',
};
const numberModifiers = {
    less :'<',
    equal: '=',
    greater: '>',
    lessOrEqual: '<=',
    greaterOrEqual: '>=',
};

function productSearch(filterString, products) {
    const filters = {};
    filterString.split('&').forEach((fieldFilter) => {
        const field = fieldFilter.split('-');
        if (field.includes('price') || field.includes('quantity')) {
            const modifier = (field[1].includes('>=') || field[1].includes('<=')) ? field[1].slice(0, 2) : field[1].slice(0,1);
            const value = (field[1].includes('>=') || field[1].includes('<=')) ? field[1].slice(2) : field[1].slice(1);
            filters[field[0]] = {
                modifier,
                value
            }
        } else {
            filters[field[0]] = {
                modifier: field[1],
                value: field[2]
            }
        }
    })

    let result = [...products];

    if (filters.name) {
        if (filters.name.modifier === stringModifiers.contains) {
            result = result.filter((product) => product.name.includes(filters.name.value));
        } else if (filters.name.modifier === stringModifiers.starts) {
            result = result.filter((product) => product.name.startsWith(filters.name.value));
        } else if (filters.name.modifier === stringModifiers.ends) {
            result = result.filter((product) => product.name.endsWith(filters.name.value));
        }
    }

    if (filters.description) {
        if (filters.description.modifier === stringModifiers.contains) {
            result = result.filter((product) => product.description.includes(filters.description.value));
        } else if (filters.description.modifier === stringModifiers.starts) {
            result = result.filter((product) => product.description.startsWith(filters.description.value));
        } else if (filters.description.modifier === stringModifiers.ends) {
            result = result.filter((product) => product.description.endsWith(filters.description.value));
        }
    }

    if (filters.price) {
        if (filters.price.modifier === numberModifiers.less) {
            result = result.filter((product) => (product.price < filters.price.value));
        } else if (filters.price.modifier === numberModifiers.greater) {
            result = result.filter((product) => (product.price > filters.price.value));
        } else if (filters.price.modifier === numberModifiers.equal) {
            result = result.filter((product) => (product.price === filters.price.value));
        } else if (filters.price.modifier === numberModifiers.lessOrEqual) {
            result = result.filter((product) => (product.price <= filters.price.value));
        } else if (filters.price.modifier === numberModifiers.greaterOrEqual) {
            result = result.filter((product) => (product.price >= filters.price.value));
        }
    }

    if (filters.quantity) {
        if (filters.quantity.modifier === numberModifiers.less) {
            result = result.filter((product) => (product.quantity < filters.quantity.value));
        } else if (filters.quantity.modifier === numberModifiers.greater) {
            result = result.filter((product) => (product.quantity > filters.quantity.value));
        } else if (filters.quantity.modifier === numberModifiers.equal) {
            result = result.filter((product) => (product.quantity === filters.quantity.value));
        } else if (filters.quantity.modifier === numberModifiers.lessOrEqual) {
            result = result.filter((product) => (product.quantity <= filters.quantity.value));
        } else if (filters.quantity.modifier === numberModifiers.greaterOrEqual) {
            result = result.filter((product) => (product.quantity >= filters.quantity.value));
        }
    }

    return result
}

// console.log('Test 1:');
// console.log(productSearch('name-ends-Pro&quantity-<50&description-contains-Mac&price->=120000', products));
// console.log('Test 2:');
// console.log(productSearch('name-ends-Pro', products));
// console.log('Test 3:');
// console.log(productSearch('', products));
