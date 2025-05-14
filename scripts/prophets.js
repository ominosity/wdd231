const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
const cards = document.querySelector('#cards');

async function getProphetData() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        // console.table(data);
        displayProphets(data.prophets);
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
        const card = document.createElement('section');
        const fullName = document.createElement('h2');
        const portrait = document.createElement('img');
        const dob = document.createElement('p');
        const birthplace = document.createElement('p');
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${fullName.textContent}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '350');
        portrait.setAttribute('height', '447');
        dob.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;
        card.appendChild(fullName);
        card.appendChild(dob);
        card.appendChild(birthplace);
        card.appendChild(portrait);
        cards.appendChild(card);
    });
}

getProphetData();

