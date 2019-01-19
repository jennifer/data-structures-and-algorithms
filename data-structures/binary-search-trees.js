// BIG O RESULTS
// Average case is O(log(n)) -- width and height grow logarithmically
// Best case is O(1) if you need the root


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
        if (this.key == key) {
            if (this.left && this.right) {
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                successor.remove(successor.key);
            }
            else if (this.left) {
                this._replaceWith(this.left);
            }
            else if (this.right) {
                this._replaceWith(this.right);
            }
            else {
                this._replaceWith(null);
            }
        }
        else if (key < this.key && this.left) {
            this.left.remove(key);
        }
        else if (key > this.key && this.right) {
            this.right.remove(key);
        }
        else {
            throw new Error('Key Error');
        }
    }
}