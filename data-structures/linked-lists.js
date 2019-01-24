class LinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
    }
    insert(index, value) {
        const newNode = {
            value
        };
        if (index == 0) {
            newNode.next = this.head;
            this.head = newNode;
        }
        else {
            const node = this._find(index - 1);
            newNode.next = node.next;
            node.next = newNode;
        }
        this.length++;
    }
    _find(index) {
        let node = this.head;
        for (let i=0; i<index; i++) {
            node = node.next;
        }
        return node;
    }
    get(index) {
        return this._find(index).value;
    }
    remove(index) {
        if (index == 0) {
            this.head = this.head.next;
        }
        else {
            const node = this._find(index - 1);
            node.next = node.next.next;
        }
        this.length--;
    }
  }
  
// WITH COMMENTS

// ES2015 Class method, initiate the list
class LinkedList {
    constructor() {
        this.length = 0;
        this.head = null;
    }
    // Before doing anything, check that the index is valid:
    insert(index, value) {
        if (index < 0 || index > this.length) {
            throw new Error('Index error');
        }
        // To insert a value, create a new node:
        const newNode = {
            value
        };
        // When inserting the first value (index == 0), set it as the head:
        if (index == 0) {
            newNode.next = this.head;
            this.head = newNode;
        }
        // To insert in the middle of the list, _find the node you want to insert after (index - 1):
        else {
            const node = this._find(index - 1);
            // Change the pointers to and from, after inserting the new node:
            newNode.next = node.next;
            node.next = newNode;
        }
        // Adjust length for the new node:
        this.length++;
    }
    // Method for _find:
    _find(index) {
        let node = this.head;
        for (let i=0; i<index; i++) {
            node = node.next;
        }
        return node;
    }
    // To retrieve a node, traverse the list using _find and return result:
    get(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        return this._find(index).value;
    }
    // Removing nodes is the opposite of inserting:
    remove(index) {
        if (index < 0 || index >= this.length) {
            throw new Error('Index error');
        }
        // If removing the head, set the next node to be the head:
        if (index == 0) {
            this.head = this.head.next;
        }
        // Find the node before the one to remove (index - 1):
        else {
            const node = this._find(index - 1);
        // Update the pointer to skip over the removed node:
        node.next = node.next.next;
        }
        // Adjust the length to one less node:
        this.length--;
    }
}


// ALGORITHM PRACTICE
  
  // Make a new list:
  let linkedList = new LinkedList();
  // Add data:
  linkedList.insert(0, "A");
  linkedList.insert(1, "B");
  linkedList.insert(2, "C");
  linkedList.insert(3, "D");
  linkedList.insert(4, "E");
  linkedList.insert(5, "F");
  
  // Show length, head, and partial list:
  // console.log(linkedList);
  
  // Show full list:
  // console.log(JSON.stringify(linkedList));
  
  // Show full list with easier to read format:
   console.log(JSON.stringify(linkedList, null, 2));
  
  // Write an algorithm to find the middle element of a linked list without using the .length property
  function findMiddle () {
    let slow = linkedList.head;
    let fast = linkedList.head;
    while (fast.next !== null && fast.next.next !== null) {
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow;
  }
  // findMiddle(linkedList);
  
  // Write an algorithm to find the third element from the end of a linked list without using the .length property
  function findThirdFromEnd(){
    let node = linkedList.head;
    while (node.next.next.next !== null) {
      node = node.next;
    }
    return node;
  }
  //findThirdFromEnd(linkedList);
  
  // Write an algorithm to reverse a linked list
  function reverse(linkedList){
        let node = linkedList.head;
        let tail = linkedList.length - 1;
        linkedList.head = tail;
        tail = node;
        let next;
        let prev = null;
        while(node.next !== null){
          next = node.next;
          node.next = prev;
          prev = node;
          node = next;
        }
        return linkedList;
      }
  reverse(linkedList);
  
  // Write an algorithm to find whether a linked list has a cycle (i.e. whether a node in the list has its next value pointing to an earlier node in the list)
  // Floyd's cycle-finding algorithm, also known as tortoise and hare algorithm
  function hasCycle() {
      let slow = linkedList.head;
      let fast = linkedList.head;
  
      while(fast != null && fast.next != null) {
          slow = slow.next; 
          fast = fast.next.next;
          // if fast caught up to slow, there is a loop
          if(slow == fast)  
              return true;
      }
      // fast reached null, so the list terminates
      return false;  
  }
  //hasCycle(linkedList);