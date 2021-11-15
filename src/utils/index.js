const mode = (object, value, k = 1000000) => {
    let freq = object.mode.map.has(value)
        ? object.mode.map.get(value)
        : 0;
    freq++;
    if(freq > object.mode.max) {
        object.mode.max = freq
        object.mode.value = value
    }
    object.mode.map.set(value, freq);
    if(object.mode.map.size === k) {
        object.mode.map.clear()
    }
    return {
        key: object.mode.max,
        value: object.mode.value
    }
};

let mean = (object, value) => {
    object.sum = object.sum + value
    return object.mean = object.sum / object.count
};

const lost = (object, id) => {
    object.lost = (object.id === 0)
        ? 0
        : (object.lost + id - (object.id + 1))
    object.id = id
    return object.lost
};

//https://habr.com/ru/post/228575/
const median = (object, value) => {
    let delta = object.sum / object.count / object.count ; // delta = average/count
    if(value < object.median) {
        object.median -= delta
    } else {
        object.median += delta
    }
    return object.median
};

//https://coderoad.ru/15638612/%D0%B2%D1%8B%D1%87%D0%B8%D1%81%D0%BB%D0%B5%D0%BD%D0%B8%D0%B5-%D1%81%D1%80%D0%B5%D0%B4%D0%BD%D0%B5%D0%B3%D0%BE-%D0%B8-%D1%81%D1%82%D0%B0%D0%BD%D0%B4%D0%B0%D1%80%D1%82%D0%BD%D0%BE%D0%B3%D0%BE-%D0%BE%D1%82%D0%BA%D0%BB%D0%BE%D0%BD%D0%B5%D0%BD%D0%B8%D1%8F-%D0%B4%D0%B0%D0%BD%D0%BD%D1%8B%D1%85-%D0%BA%D0%BE%D1%82%D0%BE%D1%80%D1%8B%D0%B5-%D0%BD%D0%B5-%D0%BF%D0%BE%D0%BC%D0%B5%D1%89%D0%B0%D1%8E%D1%82%D1%81%D1%8F-%D0%B2
//https://en.wikipedia.org/wiki/Algorithms_for_calculating_variance#Welford.27s_online_algorithm
const stdDev = (object, value) => {
    object.sum_x2 = object.sum_x2 + value**2
    object.mean_x2 = object.sum_x2 / object.count
    object.stdDev = Math.sqrt(object.mean_x2 - object.mean**2)
    return object.stdDev
};

export const math =  {
    mode: mode,
    mean: mean,
    lost: lost,
    median: median,
    stdDev: stdDev,
};