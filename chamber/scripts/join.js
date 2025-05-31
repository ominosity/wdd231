/* Assign elements to variables */
const npCardElement = document.querySelector('#np-card');
const bronzeCardElement = document.querySelector('#bronze-card');
const silverCardElement = document.querySelector('#silver-card');
const goldCardElement = document.querySelector('#gold-card');
const npDialog = document.querySelector('#np-dialog');
const bronzeDialog = document.querySelector('#bronze-dialog');
const silverDialog = document.querySelector('#silver-dialog');
const goldDialog = document.querySelector('#gold-dialog');

const timestampElement = document.querySelector('#timestamp');

/* Show the modal when the relevant element is interacted with */
npCardElement.addEventListener('click', () => npDialog.showModal());
bronzeCardElement.addEventListener('click', () => bronzeDialog.showModal());
silverCardElement.addEventListener('click', () => silverDialog.showModal());
goldCardElement.addEventListener('click', () => goldDialog.showModal());

timestampElement.setAttribute('value', new Date());