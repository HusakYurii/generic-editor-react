
/**
 * 
 * @param {File} file 
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
 * @param {boolean} isMultiple
 * @param {(files: File[]) => void} onLoaded
 * @returns HTMLInputElement
 */
const createLoader = (acceptFileTypes, isMultiple, onLoaded) => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", acceptFileTypes);
    input.setAttribute("multiple", isMultiple);
    input.onchange = (event) => {
        const files = event.target.files ? Object.values(event.target.files) : [];
        onLoaded(files)
    }
    return input;
}

/**
 * @param {string} acceptFileTypes
 * @param {(files: File[]) => void} onLoaded
 * @returns HTMLInputElement
 */
export const createImagesLoader = (onLoaded) => {
    return createLoader("image/png, image/jpeg, image/jpg", true, onLoaded);
}

/**
 * @param {string} acceptFileTypes
 * @param {(files: File) => void} onLoaded
 * @returns HTMLInputElement
 */
export const createJSONLoader = (onLoaded) => {
    return createLoader("application/json", false, (files) => {
        onLoaded(files[0])
    })
};

/**
 * @param {Array<{name: string, url: string}>}
 * @returns {Array<{name: string, file: File}>} 
 */
export const base64ToFile = (url, filename) => {
    // https://stackoverflow.com/questions/35940290/how-to-convert-base64-string-to-javascript-file-object-like-as-from-file-input-f
}

const exportFile = (content, fileName, contentType) => {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

export const exportJSONFile = (stringifiedContent, fileName) => {
    exportFile(stringifiedContent, fileName, "text/plain");
}

