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
const FIELDS = {
    name: 'name',
    price: 'price',
    quantity: 'quantity',
    description: 'description',
}

const STRING_MODIFIERS = {
    contains: 'contains',
    starts: 'starts',
    ends: 'ends',
};
const NUMBER_MODIFIERS = {
    less :'<',
    equal: '=',
    greater: '>',
    lessOrEqual: '<=',
    greaterOrEqual: '>=',
};

const FIELD_SEPARATE = '&';
const MODIFIER_SEPARATE = '-';


function productSearch(filterString, products) {
    const filters = {};
    filterString.split(FIELD_SEPARATE).forEach((fieldFilter) => {
        const field = fieldFilter.split(MODIFIER_SEPARATE);
        if (field.includes(FIELDS.price) || field.includes(FIELDS.quantity)) {
            const isLongModifier = (field[1].includes(NUMBER_MODIFIERS.greaterOrEqual) || field[1].includes(NUMBER_MODIFIERS.lessOrEqual))
            const modifier = isLongModifier ? field[1].slice(0, 2) : field[1].slice(0,1);
            const value = isLongModifier ? field[1].slice(2) : field[1].slice(1);
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
        if (filters.name.modifier === STRING_MODIFIERS.contains) {
            result = result.filter((product) => product.name.includes(filters.name.value));
        } else if (filters.name.modifier === STRING_MODIFIERS.starts) {
            result = result.filter((product) => product.name.startsWith(filters.name.value));
        } else if (filters.name.modifier === STRING_MODIFIERS.ends) {
            result = result.filter((product) => product.name.endsWith(filters.name.value));
        }
    }

    if (filters.description) {
        if (filters.description.modifier === STRING_MODIFIERS.contains) {
            result = result.filter((product) => product.description.includes(filters.description.value));
        } else if (filters.description.modifier === STRING_MODIFIERS.starts) {
            result = result.filter((product) => product.description.startsWith(filters.description.value));
        } else if (filters.description.modifier === STRING_MODIFIERS.ends) {
            result = result.filter((product) => product.description.endsWith(filters.description.value));
        }
    }

    if (filters.price) {
        if (filters.price.modifier === NUMBER_MODIFIERS.less) {
            result = result.filter((product) => (product.price < filters.price.value));
        } else if (filters.price.modifier === NUMBER_MODIFIERS.greater) {
            result = result.filter((product) => (product.price > filters.price.value));
        } else if (filters.price.modifier === NUMBER_MODIFIERS.equal) {
            result = result.filter((product) => (product.price === filters.price.value));
        } else if (filters.price.modifier === NUMBER_MODIFIERS.lessOrEqual) {
            result = result.filter((product) => (product.price <= filters.price.value));
        } else if (filters.price.modifier === NUMBER_MODIFIERS.greaterOrEqual) {
            result = result.filter((product) => (product.price >= filters.price.value));
        }
    }

    if (filters.quantity) {
        if (filters.quantity.modifier === NUMBER_MODIFIERS.less) {
            result = result.filter((product) => (product.quantity < filters.quantity.value));
        } else if (filters.quantity.modifier === NUMBER_MODIFIERS.greater) {
            result = result.filter((product) => (product.quantity > filters.quantity.value));
        } else if (filters.quantity.modifier === NUMBER_MODIFIERS.equal) {
            result = result.filter((product) => (product.quantity === filters.quantity.value));
        } else if (filters.quantity.modifier === NUMBER_MODIFIERS.lessOrEqual) {
            result = result.filter((product) => (product.quantity <= filters.quantity.value));
        } else if (filters.quantity.modifier === NUMBER_MODIFIERS.greaterOrEqual) {
            result = result.filter((product) => (product.quantity >= filters.quantity.value));
        }
    }

    return result
}

// console.log('Test 1:');
// console.log(productSearch('name-ends-Pro&quantity-<=50&description-contains-Mac&price->=100000', products));
// console.log('Test 2:');
// console.log(productSearch('name-ends-Pro', products));
// console.log('Test 3:');
// console.log(productSearch('', products));
