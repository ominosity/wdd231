/* All pages get dates in the footer */
const copyrightElement = document.querySelector('.copyright-date');
const modifiedDateElement = document.querySelector('.modified-date');

copyrightElement.textContent = getCurrentYear();
modifiedDateElement.textContent = modifiedDate();

function getCurrentYear() {
    const today = new Date();
    return today.getFullYear();
}

function modifiedDate() {
    const mDate = new Date(document.lastModified);
    return `${mDate.toLocaleDateString()} ${mDate.toLocaleTimeString()}`;
}

