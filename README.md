# Effortless-Alghoritm

Javascript library for implementing various algorithms

## Installation

    npm install effortless-algorithm

## Usage

    import { timSort } from 'effortless-algorithm/dist/index.js' // To import any algorithm you have to use this statement

## This library contains:

- Sorting algorithms
- Search algorithms

## Sorting algorithms

- Tim Sort = `timSort(array: (string | number)[])`
- Selection Sort = `selectionSort(array: (string | number)[])`
- Shell Sort = `shellSort(array: (string | number)[])`
- Bubble Sort = `bubbleSort(array: (string | number)[])`
- Tree Sort = `treeSort(array: (string | number)[])`
- Cycle Sort = `cycleSort(array: (string | number)[])`
- Strand Sort = `strandSort(array: (string | number)[])`
- Cocktail Shaker Sort = `cocktailShakerSort(array: (string | number)[])`
- Comb Sort = `combSort(array: (string | number)[])`
- Gnome Sort = `gnomeSort(array: (string | number)[])`
- Odd Even Sort = `oddEvenSort(array: (string | number)[])`
- Bogo Sort = `bogoSort(array: (string | number)[])`

These algorithms take an unsorted array and returns a sorted array.

## Search algorithms

- Linear Search = `linearSearch(array: number[] | string[], target: number | string): number`
- Sentinel Linear Search = `sentinelLinearSearch(array: number[] | string[], target: number | string): number`
- Binary Search = `binarySearch(array: number[] | string[], target: number | string): number`
- Ternary Search = `ternarySearch(array: number[] | string[], target: number | string): number`
- Jump Search = `jumpSearch(array: number[] | string[], target: number | string): number`
- Interpolation Search = `interpolationSearch(array: number[], target: number): number`
- Exponential Search = `exponentialSearch(array: number[] | string[], target: number | string): number`

### Algorithms that require a sorted array

- Binary Search
- Ternary Search
- Interpolation Search
- Exponential Search

These algorithms take an array and return an index of the target

## Links

- [NPM](https://www.npmjs.com/package/algorithms)
- [Github](https://github.com/Adam-Simon1/Alghoritms)
