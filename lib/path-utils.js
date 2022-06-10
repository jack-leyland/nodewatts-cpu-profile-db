import fs from 'fs';

export const directoryExists = (path) => {
    return fs.existsSync(path);
}

export const validExtension = (path) => {
    const splitPath = path.split(".")
    return splitPath[splitPath.length-1] !== ".cpuprofile";
}

