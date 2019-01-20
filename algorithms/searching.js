// LINEAR SEARCH

// Looks at each element of an array one-by-one
// BIG O RESULTS - average O(n), best case O(1) if the one you need is index[0]

// Pass in the array and the value you're looking for
function indexOf(array, value) {
    // Loop through each value; if you find the target value, return its index
    for (let i=0; i<array.length; i++) {
        if (array[i] == value) {
            return i;
        }
    }
    // If the value is not found
    return -1;
};

// ------------------------------------
// BINARY SEARCH

// Divides the sorted array in half each time
// BIG O RESULTS - average O(log(N)), best case O(1) if the one you need is the center value

// Function will be run recursively, passing in new start and end values with each cut
function binarySearch(array, value, start, end) {
    // First interation, the range is the entire array
    let start = start === undefined ? 0 : start;
    let end = end === undefined ? array.length : end;
    // If start is assigned a greater index than end, the array has run out and the value is not found
    if (start > end) {
        return -1;
    }
    // Find the center index of the array
    const index = Math.floor((start + end) / 2);
    // Get the item at that center index
    const item = array[index];

    console.log(start, end);
    // Is the center item the target value?
    // Recursively run binarySearch until this is true, or the array runs out
    if (item == value) {
        return index;
    }
    // Is the center item less than the target value?
    // If so, run the function on the array to the right of the center item
    else if (item < value) {
        return binarySearch(array, value, index + 1, end);
    }
    // Is the center item greater than the tagert value?
    // If so, run the function on the array to the left of the center item
    else if (item > value) {
        return binarySearch(array, value, start, index - 1);
    }
};


// ------------------------------------
// DEPTH-FIRST SEARCH (DFS)
// Looks at each value down each branch of the binary tree

// BREATDH-FIRST SEARCH (BFS)
// Looks at each value across each row of the binary tree

// BIG O RESULTS - average O(n), best case O(1) if the target is the first one you check

// Build the tree
class BinarySearchTree {
    constructor(key=null, value=null, parent=null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
    insert(key, value) {
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }
        else if (key < this.key) {
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            else {
                this.left.insert(key, value);
            }
        }
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }
    // DFS FUNCTION
    dfs(values=[]) {
        // If there's a left branch, call dfs with it and add its value to the array
        if (this.left) {
            values = this.left.dfs(values);
        }
        values.push(this.value);
        // If there's a right branch, call dfs with it and add its value to the array
        if (this.right) {
            values = this.right.dfs(values);
        }
        // Return all the values
        return values;
    }
    // BFS FUNCTION
    bfs(values=[]) {
        // Add the first node to the queue
        const queue = [this];
        // Take out the first node and add its children to the queue
        while (queue.length) {
            const node = queue.shift();
            values.push(node.value);
            // Add left node to the queue
            if (node.left) {
                queue.push(node.left);
            }
            // Add right node to the queue
            if (node.right) {
                queue.push(node.right);
            }
        }
        return values;
    }
}

// ALGORITHM PRACTICE

// The share price for a company over a week's trading is as follows:
// [128, 97, 121, 123, 98, 97, 105]. If you had to buy shares in the company
// on one day, and sell the shares on one of the following days, write an
// algorithm to work out what the maximum profit you could make would be.

function maxProfit(prices) {
    if (!prices.length) return 0;
    let buy = prices[0];
    let sell = prices[0];
    let profit = 0;
    // Sell price should be higher than buy price
    // Set buy as index[0], sell as index[1]
    // If sell is less than buy, set buy as the new sell price
    // If the profit of those new buy/sell prices are higher than the current profit, record the new profit
    // Return profit when the array runs out
    for (let i = 1; i < prices.length; i++) {
        sell = prices[i];
        if (sell < buy) {
            buy = sell
        };
        if (sell - buy > profit) {
            profit = sell - buy
        };
    }
    return profit;
};

maxProfit([128, 97, 121, 123, 98, 97, 105])