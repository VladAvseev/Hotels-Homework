function copySorted(arr) {
    return [...arr].sort();
}

const arr = ["HTML", "JavaScript", "CSS"];
const sortedArr = copySorted(arr);

console.log(sortedArr);
console.log(arr);