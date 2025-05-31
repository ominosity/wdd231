/* Assign elements to variables */
const npCardElement = document.querySelector('#np-card');
const bronzeCardElement = document.querySelector('#bronze-card');
const silverCardElement = document.querySelector('#silver-card');
const goldCardElement = document.querySelector('#gold-card');

const npDialog = document.querySelector('#np-dialog');
const bronzeDialog = document.querySelector('#bronze-dialog');
const silverDialog = document.querySelector('#silver-dialog');
const goldDialog = document.querySelector('#gold-dialog');

const npDialogClose = document.querySelector('#np-dialog div.close');
const bronzeDialogClose = document.querySelector('#bronze-dialog div.close');
const silverDialogClose = document.querySelector('#silver-dialog div.close');
const goldDialogClose = document.querySelector('#gold-dialog div.close');

const timestampElement = document.querySelector('#timestamp');

/* Show the modal when the relevant element is interacted with */
npCardElement.addEventListener('click', () => npDialog.showModal());
bronzeCardElement.addEventListener('click', () => bronzeDialog.showModal());
silverCardElement.addEventListener('click', () => silverDialog.showModal());
goldCardElement.addEventListener('click', () => goldDialog.showModal());

/* Close the modal when the relevant x-element is clicked */
npDialogClose.addEventListener('click', () => npDialog.close());
bronzeDialogClose.addEventListener('click', () => bronzeDialog.close());
silverDialogClose.addEventListener('click', () => silverDialog.close());
goldDialogClose.addEventListener('click', () => goldDialog.close());

/* Add the current timestamp to the hidden input (for display on thank you page) */
timestampElement.setAttribute('value', new Date());