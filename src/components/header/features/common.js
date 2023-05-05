/**
 * @param {Array<[string, File]>} queue 
 * @param {{[id: string]: {name: string; url: string;}}} memo 
 * @param {(file: File, cb: (data: {name: string; url: string;}) => void) => void} strategy
 * @param {(data: {[id: string]: {name: string; url: string;}}) => void} onFinish 
 * @returns 
 */
export const convertResourcesRecursively = (queue, memo, strategy, onFinish) => {
    if (queue.length === 0) {
        onFinish(memo);
        return;
    }

    const [id, file] = queue.shift();

    strategy(file, (data) => {
        memo[id] = data;
        convertResourcesRecursively(queue, memo, strategy, onFinish);
    });
}