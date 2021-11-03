/**
 * Use this function fo debugging 
 */
// @TODO replace it with a function that provides random UIDs
export const createGenerator = function (startFrom = 0) {
    let uid = startFrom;
    return function () {
        return (uid++);
    }
}