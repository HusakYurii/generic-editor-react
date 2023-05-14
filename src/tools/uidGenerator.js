
const UIDStore = {};

const getRndInteger = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Each time a project imports other project we need to record used ids to avoid clashes 
 * @param {number[]} ids 
 */
export const recordUsedUIDs = (ids) => {
    ids.forEach((id) => UIDStore[id] = true);
}

export const cleanUpUsedUIDsMap = () => {
    for (const key in UIDStore) {
        delete UIDStore[key];
    }
}

export const getUID = function () {
    let id = getRndInteger(10000, 99990);

    while (UIDStore[id]) {
        id = getRndInteger(10000, 99990);
    }
    UIDStore[id] = true;

    return id;
}