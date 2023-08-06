// Sorting alghoritms
function quickSort(arr) {
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
        }
        else {
            right.push(arr[i]);
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
}
function mergeSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
    function merge(left, right) {
        let result = [];
        let leftIndex = 0;
        let rightIndex = 0;
        while (leftIndex < left.length && rightIndex < right.length) {
            if (left[leftIndex] < right[rightIndex]) {
                result.push(left[leftIndex]);
                leftIndex++;
            }
            else {
                result.push(right[rightIndex]);
                rightIndex++;
            }
        }
        return result.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
    }
}
function heapSort(arr) {
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
    function heapify(arr, n, i) {
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
function insertionSort(arr) {
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
function timSort(arr) {
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
    function insertionSortTim(arr, left, right) {
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
    function mergeTim(arr, left, mid, right) {
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
            }
            else {
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
    function calcMinRun(n) {
        let r = 0;
        while (n >= MIN_MERGE) {
            r |= n & 1;
            n >>= 1;
        }
        return n + r;
    }
}
function selectionSort(arr) {
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
function shellSort(arr) {
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
function bubbleSort(arr) {
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
function treeSort(arr) {
    class TreeNode {
        constructor(value) {
            this.value = value;
            this.left = null;
            this.right = null;
        }
    }
    class BinarySearchTree {
        constructor() {
            this.root = null;
        }
        insert(value) {
            const newNode = new TreeNode(value);
            if (!this.root) {
                this.root = newNode;
            }
            else {
                this.insertNode(this.root, newNode);
            }
        }
        insertNode(node, newNode) {
            if (newNode.value < node.value) {
                if (!node.left) {
                    node.left = newNode;
                }
                else {
                    this.insertNode(node.left, newNode);
                }
            }
            else {
                if (!node.right) {
                    node.right = newNode;
                }
                else {
                    this.insertNode(node.right, newNode);
                }
            }
        }
        inOrderTraversal(node, result = []) {
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
// Example usage
const unsortedArray = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3, 5];
const sortedArray = treeSort(unsortedArray);
console.log(sortedArray);
export {};
//# sourceMappingURL=index.js.map