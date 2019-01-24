// HASH MAP IMPLEMENTATION

// The _slots array will hold all of the data
class HashMap {
    constructor(initialCapacity=8) {
      this.length = 0;
      this._slots = [];
      this._capacity = initialCapacity;
    }
    // Uses djb2 algorithm to hash a string and output a number
    static _hashString(string) {
      let hash = 5381;
      for (let i=0; i<string.length; i++) {
        hash = (hash << 5) + hash + string.charCodeAt(i);
        hash = hash & hash;
      }
      return hash >>> 0;
    }
    
    // Implementation with Separate Chaining
    /*
    set(key,value){
        console.log(this._slots[key]);
        if(!this._slots[key]){
        this._slots[key] = [{key, value}];
        }
        this._slots[key].push({key, value});
    }
    */
    
    // Implementation with Open Addressing
    set(key, value) {
      // Check the capacity and resize if necessary
      // Ensures that the array will never fill up
      const loadRatio = (this.length + 1) / this._capacity;
      if (loadRatio > HashMap.MAX_LOAD_RATIO) {
        this._resize(this._capacity * HashMap.SIZE_RATIO);
      }
      // 
      const index = this._findSlot(key);
      this._slots[index] = {
        key,
        value
      };
      this.length++;
    }
    // Finds the slot by index, checks that it has an item
    remove(key) {
      const index = this._findSlot(key);
      const slot = this._slots[index];
      if (slot === undefined) {
          throw new Error('Key error');
      }
      // Marks the slot as deleted, reduces the active length and increments the deleted length
      slot.deleted = true;
      this.length--;
      this._deleted++;
    }
  
    // Finds the correct slot given the hashed key
    _findSlot(key) {
      // Calculate the hash of the string
      const hash = HashMap._hashString(key);
      // Fit the object within the current capacity
      const start = hash % this._capacity;
      // Finds the matching key, or an empty slot if the matching slot is full
      for (let i=start; i<start + this._capacity; i++) {
        const index = i % this._capacity;
        const slot = this._slots[index];
        // Avoids slots containing a deleted item
        if (slot === undefined || (slot.key == key && !slot.deleted)) {
            return index;
        }
      }
    }
  
    // Creates a new hash map with a larger capacity
    _resize(size) {
      const oldSlots = this._slots;
      this._capacity = size;
      // Reset map and deleted lengths. They will get rebuilt as you add the items back
      this.length = 0;
      this._deleted = 0;
      this._slots = [];
      // For each non-empty, non-deleted slot from the old map, place the items in the new map. 
      for (const slot of oldSlots) {
        if (slot !== undefined && !slot.deleted) {
          this.set(slot.key, slot.value);
        }
      }
    }
  }
  
  HashMap.MAX_LOAD_RATIO = 0.9;
  HashMap.SIZE_RATIO = 3;


// ALGORITHM PRACTICE

// Write an algorithm to check whether any permutation of a string is a palindrome. 
// Doesn't work
function palindrome(str) {
    let hashMap = new HashMap();
    for (let i = 0; i < str.length; i++) {
        let key = HashMap._hashString(str[i]);
        let count = 1;
        key in hashMap ? hashMap.set(key, count += 1) : hashMap.set(key, count);
        // Always returns false:
        // console.log(key in hashMap);
    };
    // Confirms that the keys are in the array properly, but values are not incrementing:
    console.log(hashMap);
    // Check if any values are odd
  };
  
  palindrome("racecar")


// Write an algorithm to group a list of words into anagrams. 
// For example, if the input was ['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race'], 
// the output should be: [['east', 'teas', 'eats'], ['cars', 'arcs'], ['acre', 'race']].


// Write a hash map implementation which uses separate chaining.
// See implementation in line above