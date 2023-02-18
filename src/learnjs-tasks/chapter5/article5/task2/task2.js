function filterRange(arr, a, b) {
    return arr.filter(item => (a <= item && item <= b));
}
console.log(filterRange([5, 3, 8, 1]));