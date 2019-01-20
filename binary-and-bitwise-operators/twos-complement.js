// Implement a function that takes in an integer and prints out its two's 
// complement value by following the algorithm described above. 
// Hint: to invert the bits of a number you can use the "~" operator. 
// For example ~25 will invert the bits of the integer 25.

function twosComp(int) {
    // Flip the bits & add 1
    return ~int + 1;
};

twosComp(14);