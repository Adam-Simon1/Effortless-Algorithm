declare module "effortless-algorithm" {
  //* Sorting algorithms
  export function quickSort(arr: (string | number)[]): (number | string)[];

  export function mergeSort(arr: (string | number)[]): (string | number)[];

  export function heapSort(arr: (string | number)[]): (string | number)[];

  export function insertionSort(arr: (string | number)[]): (string | number)[];

  export function timSort(arr: (string | number)[]): (string | number)[];

  export function selectionSort(arr: (string | number)[]): (string | number)[];

  export function shellSort(arr: (string | number)[]): (string | number)[];

  export function bubbleSort(arr: (string | number)[]): (string | number)[];

  export function treeSort(arr: (string | number)[]): (string | number)[];

  export function cycleSort(arr: (string | number)[]): (string | number)[];

  export function strandSort(arr: (string | number)[]): (string | number)[];
  export function cocktailShakerSort(
    arr: (string | number)[]
  ): (string | number)[];

  export function combSort(arr: (string | number)[]): (string | number)[];

  export function gnomeSort(arr: (string | number)[]): (string | number)[];

  export function oddEvenSort(arr: (string | number)[]): (string | number)[];

  export function bogoSort(arr: (string | number)[]): (string | number)[];

  //* Search algorithms
  export function linearSearch(
    arr: number[] | string[],
    target: number | string
  ): number;

  export function sentinelLinearSearch(
    arr: number[] | string[],
    target: number | string
  ): number;

  export function binarySearch(
    arr: number[] | string[],
    target: number | string
  ): number;

  export function ternarySearch(
    arr: number[] | string[],
    target: number | string
  ): number;

  export function jumpSearch(
    arr: number[] | string[],
    target: number | string
  ): number;

  export function interpolationSearch(arr: number[], target: number): number;

  export function exponentialSearch(
    arr: number[] | string[],
    target: number | string
  ): number;
}
