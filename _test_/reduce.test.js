function sum(list) {
    // return Array.prototype.reduce.apply(
    //     list,
    //     (sum, cur) => {
    //         return (sum += cur);
    //     },
    //     0
    // );
    // const list2 = [3, 4, 8];
    return list.reduce((sum, cur) => (sum += cur), 0);
}

console.log(sum([3, 4, 8]));
