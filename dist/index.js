//* Sorting algorithms
export function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr[pivotIndex];
    arr.splice(pivotIndex, 1);
    const left = [];
    const right = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
            left.push(arr[i]);
        }
        else {
            right.push(arr[i]);
        }
    }
    return [...quickSort(left), pivot, ...quickSort(right)];
}
export function mergeSort(arr) {
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
export function heapSort(arr) {
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
    return arr;
}
export function insertionSort(arr) {
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
    return arr;
}
export function timSort(arr) {
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
    return arr;
}
export function selectionSort(arr) {
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
    return arr;
}
export function shellSort(arr) {
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
    return arr;
}
export function bubbleSort(arr) {
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
    return arr;
}
export function treeSort(arr) {
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
export function cycleSort(arr) {
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
export function strandSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    const sublist = [arr[0]];
    arr.splice(0, 1);
    let i = 0;
    while (i < arr.length) {
        if (arr[i] > sublist[sublist.length - 1]) {
            sublist.push(arr[i]);
            arr.splice(i, 1);
        }
        else {
            i++;
        }
    }
    function merge(arr1, arr2) {
        const merged = [];
        let i = 0;
        let j = 0;
        while (i < arr1.length && j < arr2.length) {
            if (arr1[i] < arr2[j]) {
                merged.push(arr1[i]);
                i++;
            }
            else {
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
export function cocktailShakerSort(arr) {
    let swapped;
    do {
        swapped = false;
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
        if (!swapped) {
            break;
        }
        swapped = false;
        for (let i = arr.length - 2; i >= 0; i--) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
            }
        }
    } while (swapped);
    return arr;
}
export function combSort(arr) {
    const shrinkFactor = 1.3;
    let gap = arr.length;
    let swapped;
    do {
        gap = Math.floor(gap / shrinkFactor);
        if (gap < 1) {
            gap = 1;
        }
        swapped = false;
        for (let i = 0; i + gap < arr.length; i++) {
            if (arr[i] > arr[i + gap]) {
                [arr[i], arr[i + gap]] = [arr[i + gap], arr[i]];
                swapped = true;
            }
        }
    } while (gap > 1 || swapped);
    return arr;
}
export function gnomeSort(arr) {
    let index = 0;
    while (index < arr.length) {
        if (index === 0 || arr[index] >= arr[index - 1]) {
            index++;
        }
        else {
            [arr[index], arr[index - 1]] = [arr[index - 1], arr[index]];
            index--;
        }
    }
    return arr;
}
export function oddEvenSort(arr) {
    let sorted = false;
    while (!sorted) {
        sorted = true;
        for (let i = 1; i < arr.length - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                sorted = false;
            }
        }
        for (let i = 0; i < arr.length - 1; i += 2) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                sorted = false;
            }
        }
    }
    return arr;
}
export function bogoSort(arr) {
    while (!isSorted(arr)) {
        shuffleArray(arr);
    }
    function isSorted(arr) {
        for (let i = 1; i < arr.length; i++) {
            if (arr[i - 1] > arr[i]) {
                return false;
            }
        }
        return true;
    }
    function shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    return arr;
}
//* Search algorithms
export function linearSearch(arr, target) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === target) {
            return i;
        }
    }
    return -1;
}
export function sentinelLinearSearch(arr, target) {
    const lastElement = arr[arr.length - 1];
    arr[arr.length - 1] = target;
    let i = 0;
    while (arr[i] !== target) {
        i++;
    }
    arr[arr.length - 1] = lastElement;
    if (i < arr.length - 1 || arr[arr.length - 1] === target) {
        return i;
    }
    return -1;
}
export function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) {
            return mid;
        }
        else if (arr[mid] < target) {
            left = mid + 1;
        }
        else {
            right = mid - 1;
        }
    }
    return -1;
}
export function ternarySearch(arr, target) {
    function ternarySearchRecursive(arr, left, right, target) {
        if (left > right) {
            return -1;
        }
        const mid1 = left + Math.floor((right - left) / 3);
        const mid2 = right - Math.floor((right - left) / 3);
        if (arr[mid1] === target) {
            return mid1;
        }
        else if (arr[mid2] === target) {
            return mid2;
        }
        if (target < arr[mid1]) {
            return ternarySearchRecursive(arr, left, mid1 - 1, target);
        }
        else if (target > arr[mid2]) {
            return ternarySearchRecursive(arr, mid2 + 1, right, target);
        }
        else {
            return ternarySearchRecursive(arr, mid1 + 1, mid2 - 1, target);
        }
    }
    return ternarySearchRecursive(arr, 0, arr.length - 1, target);
}
export function jumpSearch(arr, target) {
    const n = arr.length;
    let blockSize = Math.floor(Math.sqrt(n));
    let prev = 0;
    while (arr[Math.min(blockSize, n) - 1] < target) {
        prev = blockSize;
        blockSize += Math.floor(Math.sqrt(n));
        if (prev >= n) {
            return -1;
        }
    }
    while (arr[prev] < target) {
        prev++;
        if (prev === Math.min(blockSize, n)) {
            return -1;
        }
    }
    if (arr[prev] === target) {
        return prev;
    }
    return -1;
}
export function interpolationSearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right && target >= arr[left] && target <= arr[right]) {
        if (left === right) {
            if (arr[left] === target) {
                return left;
            }
            return -1;
        }
        const pos = left +
            Math.floor(((target - arr[left]) * (right - left)) / (arr[right] - arr[left]));
        if (arr[pos] === target) {
            return pos;
        }
        if (arr[pos] < target) {
            left = pos + 1;
        }
        else {
            right = pos - 1;
        }
    }
    return -1;
}
export function exponentialSearch(arr, target) {
    const n = arr.length;
    if (arr[0] === target) {
        return 0;
    }
    let i = 1;
    while (i < n && arr[i] <= target) {
        i *= 2;
    }
    function binarySearch(arr, left, right, target) {
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (arr[mid] === target) {
                return mid;
            }
            if (arr[mid] < target) {
                left = mid + 1;
            }
            else {
                right = mid - 1;
            }
        }
        return -1;
    }
    return binarySearch(arr, Math.floor(i / 2), Math.min(i, n - 1), target);
}
//# sourceMappingURL=index.js.map