// Write a function that takes in an integer value and prints out its complement value.
function isOdd(int) {
    const bit = int.toString(2);
    return bit[bit.length-1] & 1;
};

isOdd(101);

// Write a function that takes in two integer values and prints out the resultant value 
// when you AND the two input values and then also when you OR the two input values.
function andOr(a, b) {
    return "And = " + (a & b) + ", Or = " + (a | b);
};

andOr(2, 2);

// Extend the previous function further by adding logic for the XOR operation when two integer values are input. 
// Add a third parameter which denotes which type of operation to execute. 
// Print out the resultant value for the associated operation type.
function andOr(a, b, op) {
    if (op === "&") {
        return "And = " + (a & b)
    }
    else if (op === "|") {
        return "Or = " + (a | b)
    }
    else if (op === "^") {
        return "Xor = " + (a ^ b)
    } 
};

andOr(1, 0, "^");

// Write a function which sets the third bit of a number.


// Write a function which toggles the third bit of a number.


// Write a function which clears (sets to zero) the third bit of a number.


// Write a function which tells you whether the third bit of a number is set.
