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
    
    let leftHeight = treeHeight(tree.left);
    let rightHeight = treeHeight(tree.right);

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
function checkBST(node, min = null, max = null) {
    if (max !== null && node.data > max) {
      return false;
    }
  
    if (min !== null && node.data < min) {
      return false;
    }
  
    if (node.left && !checkBST(node.left, min, node.data)) {
      return false;
    }
  
    if (node.right && !checkBST(node.right, node.data, max)) {
      return false;
    }
  
    return true;
};

checkBST(tree);

//Write an algorithm to find the third largest node in a binary search tree
