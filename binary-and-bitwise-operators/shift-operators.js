// Write a function that takes in a decimal value and a value that 
// represents the number of bit positions to shift left with. 
// Return or print out the final base 10 value after the shift.
function shiftLeft(x, y) {
    return x << y;
};

shiftLeft(13, 3);


// How would you verify whether the above function is producing the correct value?
function shiftCheck(x, y) {
    return x * Math.pow(2, y);
};

shiftCheck(13, 3);


// Modify your existing shift function to also calculate a right-shifted value. 
// Compare the values which you get from your left-shift and right-shift functions.
function shiftRight(x, y) {
    return x >> y;
};

shiftRight(59911, 10);


// Modify your existing shift function to also calculate a zero-fill right-shifted value. 
// Compare the values which you get from your three different type of shift operator.
function shiftZFRight(x, y) {
    return x >>> y;
};

shiftZFRight(59911, 10);


// Write a function which doubles an integer.
function double(int) {
    return int << 1
};

double(16);


// Write a function which quadruples an integer.
function quadruple(int) {
    return int << 2
};

quadruple(123);


// Write a function which divides an integer by two, rounding down.
function divide(int) {
    return int >> 1
};

divide(1000);


// Write a function which calculates 2^n.
function twoToTheN(n) {
    return 1 << n;
};

twoToTheN(3);


// Write a function which calculates the Morton Number from two 8-bit integers. 
// In a Morton Number, the bits of two numbers are interleaved. So if your inputs were: 
// 15 (00001111) and 48 (00110000), your output would be 1450 (0000010110101010).
function calcMorton(x, y) {
    let morton = 0;
    for (let i = 0; i < 8; i++) {
        morton |= (y & 1 << i) << i | (x & 1 << i) << (i + 1);
    }
    return morton;
};

calcMorton(15, 48);
