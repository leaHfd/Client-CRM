const asyncFilter = async (arr, predicate) => Promise.all(arr.map(predicate))
    .then((results) => arr.filter((_v, index) => results[index]));


const isNumeric = (num) => {
    return !isNaN(num)
}

function deepCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function getDateFormat(date) {
    if (!date) {
        return '';
    }
    let dateToFormat = date;
    if (!date.getUTCDate) {
        dateToFormat = new Date(date);
    }
    var day = dateToFormat.getUTCDate();
    var month = dateToFormat.getUTCMonth() + 1
    if (day < 10) {
        day = '0' + day;
    }

    if (month < 10) {
        month = `0${month}`;
    }
    return `${day}/${month}/${dateToFormat.getUTCFullYear()}`;
}

export { asyncFilter, isNumeric, deepCopy, getDateFormat };