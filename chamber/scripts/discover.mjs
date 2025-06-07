import { getPlaces } from "./data.mjs";
const data = await getPlaces();

/* Assign DOM elements to variables */
const placesElement = document.querySelector('#places');
const visitorMessageElement = document.querySelector('#visitor-message');

const cards = (data) => {
    /* Clear any previous data */
    placesElement.innerHTML = '';

    /* Create the document fragment */
    const fragment = document.createDocumentFragment();

    /* Iterate through the data source */
    data.forEach((place) => {

        /* Create the elements */
        const section = document.createElement('section');
        const nameElement = document.createElement('h2');
        const figure = document.createElement('figure');
        const picture = document.createElement('img');
        const description = document.createElement('p');
        const address = document.createElement('address');
        const link = document.createElement('a');

        /* Modify the element attributes */
        nameElement.textContent = place.name;
        picture.setAttribute('src', place.imageURL);
        picture.setAttribute('alt', place.name);
        picture.setAttribute('loading', 'lazy');
        picture.setAttribute('width', 300);
        picture.setAttribute('height', 200);
        description.textContent = place.description;
        address.textContent = place.address;
        link.setAttribute('href', place.moreInfo);
        link.setAttribute('target', '_blank');
        link.setAttribute('alt', `Learn more about ${place.name}`);
        link.textContent = `Learn more about ${place.name}`;

        /* Add the elements to the fragment */
        figure.appendChild(picture);
        section.appendChild(nameElement);
        section.appendChild(figure);
        section.appendChild(description);
        section.appendChild(address);
        section.appendChild(link);
        fragment.appendChild(section);
    });

    /* Add the fragment to the DOM */
    placesElement.appendChild(fragment);
}

cards(data);

const now = new Date();
const lastVisit = localStorage.getItem('last-visit');

if (!lastVisit) {
    visitorMessageElement.textContent = 'Welcome! Let us know if you have any questions.';
    localStorage.setItem('last-visit', now.getTime());
} else {
    const daysSince = Math.round((now - lastVisit) / (1000 * 60 * 60 * 24));

    if (daysSince < 1) {
        visitorMessageElement.textContent = 'Back so soon? Awesome!';
    } else if (daysSince == 1) {
        visitorMessageElement.textContent = `You last visited ${daysSince} day ago`;
    } else {
        visitorMessageElement.textContent = `You last visited ${daysSince} days ago`;
    }
    localStorage.setItem('last-visit', now.getTime());
}

