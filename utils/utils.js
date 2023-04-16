/**
 * It gets textContent property of an element.
 * @param element represents element for which we want to get text.
 * @returns {Promise<*>} text of an element.
 */
const getText = async (element) => {
    return await (await element.getProperty('textContent')).jsonValue();
};

module.exports = {
    getText
}