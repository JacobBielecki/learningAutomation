const getText = async (element) => {
    return await (await element.getProperty('textContent')).jsonValue();
};

module.exports = {
    getText
}