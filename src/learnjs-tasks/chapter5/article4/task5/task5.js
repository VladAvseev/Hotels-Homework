function getMaxSubSum(arr) {
    let maxSum = 0;
    let tempSum = 0;
    for (let item of arr) {
        item <= 0 ? tempSum = 0 : tempSum += item;
        maxSum = Math.max(maxSum, tempSum);
    }
    return maxSum;
}

console.log(getMaxSubSum([-2, 12, 4, 4, 0, -2, -5, 12]))