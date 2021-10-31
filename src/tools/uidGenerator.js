/**
 * startFrom can be used when data has been restored and we
 * want to continue creating uid based on the last uid
 */
export const createGenerator = function (startFrom = 0) {
    let uid = startFrom;
    return function () {
        return (uid++);
    }
}