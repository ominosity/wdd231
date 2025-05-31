/* Assign variables to elements */
const summary = document.querySelector('#application-summary');

/* Get the returned parameters */
const joinResults = new URLSearchParams(window.location.search);

console.log(joinResults.toString());

/* Clear any existing summary */
summary.innerHTML = "";

/* Build results as a fragment and add them to the DOM */
/* Create pieces */
const fragment = new DocumentFragment();
const yourInfoHeader = document.createElement('h3');
const yourInfoList = document.createElement('ul');
const yourName = document.createElement('li');
const title = document.createElement('li');
const email = document.createElement('li');
const phone = document.createElement('li');
const orgInfoHeader = document.createElement('h3');
const orgList = document.createElement('ul');
const orgName = document.createElement('li');
const level = document.createElement('li');
const description = document.createElement('li');
const started = document.createElement('li');

/* Fill them with data */
yourInfoHeader.textContent = "Your information";
yourName.innerHTML = `<span class="bold">Your name: </span>${joinResults.get('fname')} ${joinResults.get('lname')}`;
title.innerHTML = `<span class="bold">Your title: </span>${joinResults.get('title')}`;
email.innerHTML = `<span class="bold">Your email: </span>${joinResults.get('email')}`;
phone.innerHTML = `<span class="bold">Your phone number: </span>${joinResults.get('phone')}`;
orgInfoHeader.textContent = 'Your organization\'s information';
orgName.innerHTML = `<span class="bold">Organization name: </span>${joinResults.get('organization')}`;
level.innerHTML = `<span class="bold">Membership level: </span>${joinResults.get('level')}`;
description.innerHTML = `<span class="bold">Organization description: </span>${joinResults.get('description')}`
started.innerHTML = `<span class="bold">Form started at: </span>${joinResults.get('timestamp')}`


/* Add them to the Fragment, then the DOM */
fragment.appendChild(yourInfoHeader);

yourInfoList.appendChild(yourName);
yourInfoList.appendChild(title);
yourInfoList.appendChild(email);
yourInfoList.appendChild(phone);
fragment.appendChild(yourInfoList);

fragment.appendChild(orgInfoHeader);

orgList.appendChild(orgName);
orgList.appendChild(level)
orgList.appendChild(description);
orgList.appendChild(started);
fragment.appendChild(orgList);
summary.appendChild(fragment);