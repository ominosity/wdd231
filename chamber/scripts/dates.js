/* Copyright year */
const thisYear = new Date().getFullYear();
const yearElement = document.getElementById('year');
yearElement.innerHTML = thisYear;

/* Last modified date */
// const modifiedDate = new Date(document.lastModified);
const modifiedDate = document.lastModified;
const lastModifiedElement = document.getElementById('last-modified');
lastModifiedElement.textContent = modifiedDate;
