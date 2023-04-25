
/**
 * 
 * @param {File} files 
 * @param {(data: {name: string, url: string})=> void} onLoad
 * @param {(error: unknown)=> void} [orError]
 */
export const convertFileToBase64 = (file, onLoad, orError = (err) => console.error(err)) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onerror = orError;
    reader.onload = () => onLoad({ name: file.name, url: reader.result });
}

/**
 * 
 * @param {File[]} files 
 * @param {(data: Array<{name: string, url: string}>)=> void} cb
 */
export const convertFilesToBase64 = (files, cb) => {

    const convertFileAsync = async (file) => {
        return new Promise((res, rej) => convertFileToBase64(file, res, rej));
    }

    Promise.all(files.map(convertFileAsync))
        .then(cb)
        .catch(err => console.error(err));
}

/**
 * @param {string} acceptFileTypes
 * @param {(files: File[]) => void} onLoaded
 * @returns HTMLInputElement
 */
export const createImageLoader = (acceptFileTypes, onLoaded) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", acceptFileTypes);
    input.setAttribute("multiple", true);
    input.onchange = (event) => {
        const files = event.target.files ? Object.values(event.target.files) : [];
        onLoaded(files)
    }
    return input;
}
