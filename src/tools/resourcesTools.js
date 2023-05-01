
/**
 * Generic function to convert a File object
 * @param {File} file 
 * @param {"base64" | "text"} type 
 * @param {(data: {name: string, url: string})=> void} onLoad
 * @param {(error: unknown)=> void} [orError]
 */
const convertFileTo = (file, type, onLoad, orError = (err) => console.error(err)) => {
    const reader = new FileReader();
    reader.onerror = orError;
    reader.onload = () => onLoad({ name: file.name, url: reader.result });
    const method = type === "base64" ? "readAsDataURL" : "readAsText";
    reader[method](file);
}

/**
 * @param {File[]} files 
 * @param {(data: Array<{name: string, url: string}>)=> void} cb
 */
export const convertImageFilesToBase64 = (files, cb) => {

    const convertFile = (file) => {
        return new Promise((res, rej) => {
            convertFileTo(file, "base64", res, rej)
        });
    };

    Promise.all(files.map(convertFile))
        .then(cb)
        .catch(err => console.error(err));
}

/**
 * @param {File} file 
 * @param {(data: {name: string, url: string})=> void} onLoad
 */
export const convertImageFileToBase64 = (file, onLoad) => {
    convertFileTo(file, "base64", onLoad);
}


/**
 * @param {File[]} files 
 * @param {(data: Array<{name: string, url: string}>)=> void} cb
 */
export const convertJSONFilesToText = (files, cb) => {
    const convertFile = (file) => {
        return new Promise((res, rej) => {
            convertFileTo(file, "text", res, rej)
        });
    };

    Promise.all(files.map(convertFile))
        .then(cb)
        .catch(err => console.error(err));
}

/**
 * @param {File} file
 * @param {(data: {name: string, url: string})=> void} cb
 */
export const convertJSONFileToText = (file, cb) => {
    convertFileTo(file, "text", cb);
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
 * @param {(files: File[]) => void} onLoaded
 * @returns HTMLInputElement
 */
export const createJSONLoader = (onLoaded) => {
    return createLoader("application/json", true, onLoaded);
};

/**
 * 
 * @param {{name: string, url: string}} param0 
 * @param {{(file: File) => void}} onComplete 
 */
export const base64ImageToFile = ({ name, url }, onComplete) => {
    const mimeType = url.match(/:(.*?);/)[1];
    fetch(url)
        .then((response) => response.arrayBuffer())
        .then((buffer) => new File([buffer], name, { type: mimeType }))
        .then(onComplete);
};

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

