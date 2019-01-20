// BUBBLE SORT
// BIG O RESULTS - average O(n^2) polynomial (bad), best case O(n) if already sorted

// Makes the swap
function swap(array, i, j) {
    const tmp = array[i];
    array[i] = array[j];
    array[j] = tmp;
};
// If an item is greater than the following item, swap them
function bubbleSort(array) {
    let swaps = 0;
    for (let i=0; i<array.length - 1; i++) {
        if (array[i] > array[i + 1]) {
            swap(array, i, i + 1);
            swaps++;
        }
    }
    // Continue to call the function until there are no more swaps
    if (swaps > 0) {
        return bubbleSort(array);
    }
    // Return the sorted array
    return array;
};


// MERGE SORT
// BIG O RESULTS - O(nlog(n))

function mergeSort(array) {
    if (array.length <= 1) {
        return array;
    }
    // Split the array in half
    const middle = Math.floor(array.length / 2);
    let left = array.slice(0, middle);
    let right = array.slice(middle, array.length);
    // Call mergeSort recursively to sort each half
    left = mergeSort(left);
    right = mergeSort(right);
    // Call merge to merge the two sorted halves
    return merge(left, right, array);
};

function merge(left, right, array) {
    let leftIndex = 0;
    let rightIndex = 0;
    let outputIndex = 0;
    while (leftIndex < left.length && rightIndex < right.length) {
        if (left[leftIndex] < right[rightIndex]) {
            array[outputIndex++] = left[leftIndex++];
        }
        else {
            array[outputIndex++] = right[rightIndex++];
        }
    }

    for (let i=leftIndex; i<left.length; i++) {
        array[outputIndex++] = left[i];
    }

    for (let i=rightIndex; i<right.length; i++) {
        array[outputIndex++] = right[i];
    }
    return array;
};


// QUICKSORT
// BIG O RESULTS - O(nlog(n)), worst case 0(n^2)

function quickSort(array, start=0, end=array.length) {
    start = start;
    end = end;
    if (start >= end) {
        return array;
    }
    const middle = partition(array, start, end);
    array = quickSort(array, start, middle);
    array = quickSort(array, middle + 1, end);
    return array;
};

function partition(array, start, end) {
    const pivot = array[end - 1];
    let j = start;
    for (let i=start; i<end - 1; i++) {
        if (array[i] <= pivot) {
            swap(array, i, j);
            j++;
        }
    }
    swap(array, end-1, j);
    return j;
};


// ALGORITHM PRACTICE

//Write an algorithm to shuffle an array into a random order in-place (i.e. without creating a new array).
// Use the Fisher-Yates (aka Knuth) Shuffle

function shuffleArr(arr) {
    let currentIndex = arr.length;
    let tempValue;
    let randIndex;
    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
        // Pick a remaining element at random...
        randIndex = Math.floor(Math.random() * currentIndex);
        // (Decrement the index each time)
        currentIndex -= 1;
        // And swap it with the current element.
        tempValue = arr[currentIndex];
        arr[currentIndex] = arr[randIndex];
        arr[randIndex] = tempValue;
    }
    return arr;
  };
  
 shuffleArr([2, 11, 37, 42]);