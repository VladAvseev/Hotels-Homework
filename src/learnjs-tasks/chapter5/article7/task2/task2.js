function aclean(arr) {
    const obj = {};
    arr.forEach((item) => {
        const sorted = item
            .toLowerCase()
            .split("")
            .sort()
            .join("");
        obj[sorted] = item;
    })
    return Object.values(obj);
}

const arr = ["nap", "teachers", "cheaters", "PAN", "ear", "era", "hectares"];

console.log(aclean(arr));