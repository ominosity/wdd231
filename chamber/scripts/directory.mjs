import getMembers from './data.mjs';

/* Assign variable to page members */
const directoryMember = document.getElementById("directory");
const gridIcon = document.getElementById('grid-icon');
const listIcon = document.getElementById('list-icon');
const data = await getMembers();

function createMemberSections(format) {
    if (format === "cards") {
        cardTemplate(data);
    } else {
        listTemplate(data);
    }
}

/* Card Template */
const cardTemplate = (data) => {
    /* Clear any previous data */
    directoryMember.innerHTML = '';
    const fragment = document.createDocumentFragment();
    /* Iterate through the data source */
    data.forEach((member) => {
        /* Create the elements */
        const section = document.createElement('section');
        const level = document.createElement('div');
        const link = document.createElement('a');
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        const caption = document.createElement('figcaption');
        const address = document.createElement('p');
        const phone = document.createElement('p');
        const visibleLink = document.createElement('a');

        /* Set up the elements with the data */
        level.textContent = member.membership_level;
        level.setAttribute('class', `${member.membership_level.toLowerCase()} badge`);
        link.setAttribute('href', member.url);
        caption.textContent = member.name;
        image.setAttribute('src', member.logo_url);
        image.setAttribute('target', '_blank');
        image.setAttribute('alt', `Logo for ${member.name}`);
        address.textContent = member.address;
        phone.textContent = member.phone_number;
        visibleLink.setAttribute('href', member.url);
        visibleLink.setAttribute('target', '_blank');
        visibleLink.textContent = member.url;


        /* Add the elements to the fragment */
        figure.appendChild(image);
        figure.appendChild(caption);
        link.appendChild(figure);
        section.appendChild(level);
        section.appendChild(link);
        section.appendChild(address);
        section.appendChild(phone);
        section.appendChild(visibleLink);
        fragment.appendChild(section);
    });
    directoryMember.classList.add('cards');
    directoryMember.classList.remove('list');
    directoryMember.appendChild(fragment);
}

/* List Template */
const listTemplate = (data) => {
    /* Clear any previous data */
    directoryMember.innerHTML = '';
    const fragment = document.createDocumentFragment();
    /* Iterate through the data source */
    data.forEach((member) => {
        /* Create the elements */
        const section = document.createElement('section');
        const name = document.createElement('div');
        const address = document.createElement('div');
        const phone = document.createElement('div');
        const urlHolder = document.createElement('div');
        const link = document.createElement('a');

        /* Set up the elements with the data */
        name.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phone_number;
        link.setAttribute('href', member.url);
        link.setAttribute('target', '_blank');
        link.textContent = member.url;

        /* Add the elements to the fragment */
        section.appendChild(name);
        section.appendChild(address);
        section.appendChild(phone);
        urlHolder.appendChild(link);
        section.appendChild(urlHolder);
        fragment.appendChild(section);
    });
    directoryMember.classList.add('list');
    directoryMember.classList.remove('cards');
    directoryMember.appendChild(fragment);
}

/* Add event handlers to grid and list icons */
gridIcon.addEventListener('click', () => {
    createMemberSections('cards');
});

listIcon.addEventListener('click', () => {
    createMemberSections('list');
});

/* On initial load, use cards */
createMemberSections("cards");