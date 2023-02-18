function filterRangeInPlace(arr, a, b) {
   arr.map((item, index) => {
       if (item < a || item > b) {
           arr.splice(index, 1);
       }
   })
    console.log(arr);
}
filterRangeInPlace([5, 3, 8, 1], 1, 4);