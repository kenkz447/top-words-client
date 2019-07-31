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

export const splitsentences = (contentText: string) => {
    if (!contentText) {
        return [];
    }

    const regex = /\b(\w\.\w\.|[A-Z][a-z]{1,2}\.)|([.?!])\s+(?=[A-Za-z])/g;
    const result = contentText.replace(regex, (m, g1, g2) => g1 ? g1 : g2 + '\r');

    return result.split('\r');
};