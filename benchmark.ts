import { performance } from 'perf_hooks';

export function benchmark(fn: Function, iterations: number = 1) {
    const start = performance.now();
    for (let i = 0; i < iterations; i++) {
        fn();
    }
    const end = performance.now();
    console.log(`Took ${end - start} ms to run ${fn.name} ${iterations} times.`);
}
