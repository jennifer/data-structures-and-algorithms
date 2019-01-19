// BIG O RESULTS
// Average case is O(log(n)) -- width and height grow logarithmically
// Best case is O(1) if you need the root, worst is O(n) if you need the lowest branch


// Initialize an empty BST 
class BinarySearchTree {
    constructor(key=null, value=null, parent=null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }

    // INSERTION
    insert(key, value) {
        // Insert the first node on an empty tree
        // Insert the node in an empty position after working through the loops
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }
        // If a child exists and is greater than the node key, check the left
        // If the left is empty, drop the new node there
        // If the left is full, run insert method again from that node
        else if (key < this.key) {
            if (this.left == null) {
                this.left = new BinarySearchTree(key, value, this);
            }
            else {
                this.left.insert(key, value);
            }
        }
        // If a child exists and is less than the node key, check the right
        // If the right is empty, drop the new node there
        // If the right is full, run insert method again from that node
        else {
            if (this.right == null) {
                this.right = new BinarySearchTree(key, value, this);
            }
            else {
                this.right.insert(key, value);
            }
        }
    }

    // RETRIEVAL
    get(key) {
        // Check if the node you're on is the one you need
        if (this.key == key) {
            return this.value;
        }
        // If your key is less that the one you're on, run the get method again from the left node
        else if (key < this.key && this.left) {
            return this.left.get(key);
        }
        // If your key is greater than the one you're on, run the get method again from the right node
        else if (key > this.key && this.right) {
            return this.right.get(key);
        }
        else {
            throw new Error('Key Error');
        }
    }

    // REMOVAL
    remove(key) {
        // If this is the key you're trying to remove, 
        if (this.key == key) {
            // If there is both a left and right child, 
            // the right child with the lowest key replaces the removed node
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            // If there is only one child node, it replaces the removed node
            else if (this.left) {
                this._replaceWith(this.left);
            }
            else if (this.right) {
                this._replaceWith(this.right);
            }
            // If there is no child node, just remove the node
            else {
                this._replaceWith(null);
            }
        }
        // If your key is less that the one you're on, run the get method again from the left node
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        // If your key is greater than the one you're on, run the get method again from the right node
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }
    // REPLACING A REMOVED NODE
    _replaceWith(node) {
        // If the replacement node had a parent, update the parent references
        if (this.parent) {
            // Update reference FROM parent
            if (this == this.parent.left) {
                this.parent.left = node;
            }
            else if (this == this.parent.right) {
                this.parent.right = node;
            }
            // Update reference TO parent
            if (node) {
                node.parent = this.parent;
            }
        }
         
        else {
            // If the removed node was the root, copy over all refs from the replacement
            if (node) {
                this.key = node.key;
                this.value = node.value;
                this.left = node.left;
                this.right = node.right;
            }
            // If the removed node was the only node, empty the tree
            else {
                this.key = null;
                this.value = null;
                this.left = null;
                this.right = null;
            }
        }
    }
    // FINDING THE REPLACEMENT NODE
    // Keep looking left until you get to the end of the branch
    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }
}


// ALGORITHM PRACTICE

let tree = new BinarySearchTree();
tree.insert(10)
tree.insert(5)
tree.insert(13)
tree.insert(11)
tree.insert(2)
tree.insert(16)
tree.insert(7)

// Write an algorithm to find the height of a binary search tree
// Height here counts the branches, not the root
function treeHeight(tree){
    if(!tree) return -1;
    // Find the left side height
    let leftHeight = treeHeight(tree.left);
    // Find the right side height
    let rightHeight = treeHeight(tree.right);
    // Compare left and right and keep the largest
    // Add 1 to offset the initial -1
    return Math.max(leftHeight, rightHeight) + 1;

    // With if instead of Math method:
    /*
    if (leftHeight > rightHeight) {
        return leftHeight + 1;
    } else {
        return rightHeight + 1;
    }
    */
};

treeHeight(tree);

// Write an algorithm to check whether an arbitrary binary tree is a binary search tree, 
// assuming the tree does not contain duplicates

// Function is called multiple times (recursion) and new min and max will be passed in
function checkBST(tree, min = null, max = null) {
    // Values on the left side of the tree should always be less than the max
    // If any value is greater than the max, BST is false
    if (max !== null && tree.data > max) {
        return false;
    }
    // Values on the right side of the tree should always be greater than the min
    // If any value is less than the min, BST is false
    if (min !== null && tree.data < min) {
        return false;
    }
    // The if statement is looking for a left node that also (&&) returns false (!)
    // If there is no left node, leave the if and check for another branch
    // Run the function on the left-side branch, passing that node's value as the max
    // If running checkBST on the left returns true, leave the loop and check for another branch
    // If it returns false, BST is false
    if (tree.left && !checkBST(tree.left, min, tree.data)) {
        return false;
    }
    // The if statement is looking for a right node that also (&&) returns false (!)
    // If there is no right node, leave the if and check for another branch
    // Run the function on the right-side branch, passing that node's value as the min
    // If running checkBST on the right returns true, leave the loop and check for another branch
    // If it returns false, BST is false
    if (tree.right && !checkBST(tree.right, tree.data, max)) {
        return false;
    }
    // Continue until there are no more branches to check (tree.left and tree.right are null)
    // All checks have passed and BST is true
    return true;
  };
  
  checkBST(tree);

//Write an algorithm to find the third largest node in a binary search tree
