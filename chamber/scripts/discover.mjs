import { getPlaces } from "./data.mjs";
const data = await getPlaces();

/* Assign DOM elements to variables */
const placesElement = document.querySelector('#places');

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
        const button = document.createElement('button');

        /* Modify the element attributes */
        nameElement.textContent = place.name;
        picture.setAttribute('src', place.imageURL);
        picture.setAttribute('alt', place.name);
        description.textContent = place.description;
        address.textContent = place.address;
        link.setAttribute('href', place.moreInfo);
        link.setAttribute('target', '_blank');
        button.textContent = 'More Info';

        /* Add the elements to the fragment */
        figure.appendChild(picture);
        link.appendChild(button);
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