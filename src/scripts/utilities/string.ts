export const stripAccents = (function () {
    const inChrs = 'àáâãäçđèéêëìíîïñòóôõöùúûüýÿÀÁÂÃÄÇĐÈÉÊËÌÍÎÏÑÒÓÔÕÖÙÚÛÜÝ',
        outChrs = 'aaaaacdeeeeiiiinooooouuuuyyAAAAACDEEEEIIIINOOOOOUUUUY',
        charsRgx = new RegExp('[' + inChrs + ']', 'g'),
        transl = {},
        lookup = function (char: string) { return transl[char] || char; };

    for (let i = 0; i < inChrs.length; i++) {
        transl[inChrs[i]] = outChrs[i];
    }

    return (s: string) => s.replace(charsRgx, lookup);
})();

export const splitContentByNewline = (textContent: string) => {
    return textContent.split(/(?:\r\n|\r|\n)/g);
};