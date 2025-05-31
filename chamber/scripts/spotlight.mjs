import getMembers from './data.mjs';
import { randomlySplitArray } from './utilities.mjs';

/* Assign variable to page members */
const spotlightElement = document.getElementById("company-spotlights");

/* Get member data and filter out only silver and gold members*/
const data = await getMembers();
const filteredData = data.filter((member) => member.membership_level == "Gold" || member.membership_level == "Silver");

/* Create template and apply to 3 random silver/gold members */
const cardTemplate = (data) => {
    /* Clear any previous data */
    spotlightElement.innerHTML = '';
    const fragment = document.createDocumentFragment();

    /* Randomly iterate through the filtered data source and pull three records */
    const selectedThree = [];
    for (let i = 0; i < 3; i++) {
        let splitData = randomlySplitArray(data);
        selectedThree.push(splitData.selected);
        data = splitData.array;    
    }

    selectedThree.forEach((member) => {

        /* Create the elements */
        const card = document.createElement('div');
        const badge = document.createElement('div');
        const name = document.createElement('h3');
        const contactBox = document.createElement('div');
        const image = document.createElement('img');
        const contactInfo = document.createElement('div');
        const phone = document.createElement('p');
        const url = document.createElement('p');
        
        
        /* Set up the elements with the data */
        card.setAttribute('id', 'member-card');
        badge.setAttribute('class', `${member.membership_level.toLowerCase()} badge`);
        badge.textContent = member.membership_level;
        name.textContent = member.name;
        contactBox.setAttribute('class', 'contact-box');
        image.setAttribute('src', member.logo_url);
        image.setAttribute('alt', `${member.name} logo`);
        contactInfo.setAttribute('class', 'contact-info');

        phone.innerHTML = `<span class="bold">Phone:</span> ${member.phone_number}`;
        url.innerHTML = `<span class="bold">URL:</span> <a href="${member.url}" target="_blank">${member.url}</a>`;
     
        /* Add the elements to the fragment */
        card.appendChild(badge);
        card.appendChild(name);
        card.appendChild(contactBox);
        contactBox.appendChild(image);
        contactInfo.appendChild(phone);
        contactInfo.appendChild(url);
        contactBox.appendChild(contactInfo);
        fragment.appendChild(card);
    });
    spotlightElement.appendChild(fragment);
};

/* Load the template */
cardTemplate(filteredData);
