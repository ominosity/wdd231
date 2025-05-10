// Copyright year for the current year, for use in the footer
const yearElement = document.getElementById("year");
let thisYear = new Date().getFullYear();
yearElement.innerHTML = thisYear;

// Add the last modified date to the footer
const lastModifiedElement = document.getElementById("last-modified");
let lastModifiedDate = document.lastModified;
lastModifiedElement.innerHTML = lastModifiedDate