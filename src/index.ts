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


