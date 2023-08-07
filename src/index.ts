// Sorting alghoritms
function quickSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  const pivotIndex = Math.floor(arr.length / 2);
  const pivot = arr[pivotIndex];

  arr.splice(pivotIndex, 1);

  const left = [];
  const right = [];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

function mergeSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  const middle = Math.floor(arr.length / 2);
  const left = arr.slice(0, middle);
  const right = arr.slice(middle);

  return merge(mergeSort(left), mergeSort(right));

  function merge(left: number[], right: number[]): number[] {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;

    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
    }

    return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
  }
}

function heapSort(arr: number[]) {
  const n = arr.length;

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  for (let i = n - 1; i > 0; i--) {
    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;

    heapify(arr, i, 0);
  }

  function heapify(arr: number[], n: number, i: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      const temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;

      heapify(arr, n, largest);
    }
  }
}

function insertionSort(arr: number[]) {
  const n = arr.length;

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = key;
  }
}

function timSort(arr: number[]) {
  const MIN_MERGE = 32;
  const n = arr.length;

  for (let i = 0; i < n; i += MIN_MERGE) {
    insertionSortTim(arr, i, Math.min(i + MIN_MERGE - 1, n - 1));
  }

  let size = MIN_MERGE;
  while (size < n) {
    for (let start = 0; start < n; start += size * 2) {
      const mid = start + size - 1;
      const end = Math.min(start + size * 2 - 1, n - 1);
      mergeTim(arr, start, mid, end);
    }
    size *= 2;
  }

  function insertionSortTim(arr: number[], left: number, right: number) {
    for (let i = left + 1; i <= right; i++) {
      const key = arr[i];
      let j = i - 1;
      while (j >= left && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
  }

  function mergeTim(arr: number[], left: number, mid: number, right: number) {
    const leftSize = mid - left + 1;
    const rightSize = right - mid;

    const leftArray = new Array(leftSize);
    const rightArray = new Array(rightSize);

    for (let i = 0; i < leftSize; i++) {
      leftArray[i] = arr[left + i];
    }
    for (let j = 0; j < rightSize; j++) {
      rightArray[j] = arr[mid + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = left;
    while (i < leftSize && j < rightSize) {
      if (leftArray[i] <= rightArray[j]) {
        arr[k] = leftArray[i];
        i++;
      } else {
        arr[k] = rightArray[j];
        j++;
      }
      k++;
    }

    while (i < leftSize) {
      arr[k] = leftArray[i];
      i++;
      k++;
    }

    while (j < rightSize) {
      arr[k] = rightArray[j];
      j++;
      k++;
    }
  }

  function calcMinRun(n: number): number {
    let r = 0;
    while (n >= MIN_MERGE) {
      r |= n & 1;
      n >>= 1;
    }
    return n + r;
  }
}

function selectionSort(arr: number[]) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }

    if (minIndex !== i) {
      const temp = arr[i];
      arr[i] = arr[minIndex];
      arr[minIndex] = temp;
    }
  }
}

function shellSort(arr: number[]) {
  const n = arr.length;
  let gap = Math.floor(n / 2);

  while (gap > 0) {
    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;

      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }

      arr[j] = temp;
    }

    gap = Math.floor(gap / 2);
  }
}

function bubbleSort(arr: number[]) {
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap arr[j] and arr[j+1]
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapped = true;
      }
    }

    // If no two elements were swapped by inner loop, the array is already sorted
    if (!swapped) {
      break;
    }
  }
}

function treeSort(arr: number[]): number[] {
  class TreeNode {
    value: number;
    left: TreeNode | null;
    right: TreeNode | null;

    constructor(value: number) {
      this.value = value;
      this.left = null;
      this.right = null;
    }
  }

  class BinarySearchTree {
    root: TreeNode | null;

    constructor() {
      this.root = null;
    }

    insert(value: number) {
      const newNode = new TreeNode(value);
      if (!this.root) {
        this.root = newNode;
      } else {
        this.insertNode(this.root, newNode);
      }
    }

    insertNode(node: TreeNode, newNode: TreeNode) {
      if (newNode.value < node.value) {
        if (!node.left) {
          node.left = newNode;
        } else {
          this.insertNode(node.left, newNode);
        }
      } else {
        if (!node.right) {
          node.right = newNode;
        } else {
          this.insertNode(node.right, newNode);
        }
      }
    }

    inOrderTraversal(node: TreeNode | null, result: number[] = []): number[] {
      if (node) {
        this.inOrderTraversal(node.left, result);
        result.push(node.value);
        this.inOrderTraversal(node.right, result);
      }
      return result;
    }
  }

  const tree = new BinarySearchTree();
  for (const value of arr) {
    tree.insert(value);
  }
  return tree.inOrderTraversal(tree.root);
}

function cycleSort(arr: number[]): number[] {
  const n = arr.length;

  for (let cycleStart = 0; cycleStart < n - 1; cycleStart++) {
    let item = arr[cycleStart];
    let pos = cycleStart;

    for (let i = cycleStart + 1; i < n; i++) {
      if (arr[i] < item) {
        pos++;
      }
    }

    if (pos === cycleStart) {
      continue;
    }

    while (item === arr[pos]) {
      pos++;
    }

    if (pos !== cycleStart) {
      const temp = arr[pos];
      arr[pos] = item;
      item = temp;
    }

    while (pos !== cycleStart) {
      pos = cycleStart;

      for (let i = cycleStart + 1; i < n; i++) {
        if (arr[i] < item) {
          pos++;
        }
      }

      while (item === arr[pos]) {
        pos++;
      }

      if (item !== arr[pos]) {
        const temp = arr[pos];
        arr[pos] = item;
        item = temp;
      }
    }
  }

  return arr;
}

function strandSort(arr: number[]): number[] {
  if (arr.length <= 1) {
    return arr;
  }

  const sublist: number[] = [arr[0]];
  arr.splice(0, 1);

  let i = 0;
  while (i < arr.length) {
    if (arr[i] > sublist[sublist.length - 1]) {
      sublist.push(arr[i]);
      arr.splice(i, 1);
    } else {
      i++;
    }
  }

  function merge(arr1: number[], arr2: number[]): number[] {
    const merged: number[] = [];
    let i = 0;
    let j = 0;

    while (i < arr1.length && j < arr2.length) {
      if (arr1[i] < arr2[j]) {
        merged.push(arr1[i]);
        i++;
      } else {
        merged.push(arr2[j]);
        j++;
      }
    }

    while (i < arr1.length) {
      merged.push(arr1[i]);
      i++;
    }

    while (j < arr2.length) {
      merged.push(arr2[j]);
      j++;
    }

    return merged;
  }

  return merge(strandSort(arr), sublist);
}

// Example usage
const unsortedArray = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
const sortedArray = strandSort(unsortedArray);
console.log(sortedArray);
