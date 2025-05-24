function randomlySplitArray(array) {
    let randomIndex = Math.floor(Math.random() * array.length);
    let selected = array[randomIndex];
    array.splice(randomIndex, 1);
    return { array, selected };
}

export { randomlySplitArray };