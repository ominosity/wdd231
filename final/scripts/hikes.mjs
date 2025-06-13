import getHikes from "./data.mjs";
const data = await getHikes();
console.log(data);

const hikeListing = document.querySelector('#hike-listing');

const loadCards = () => {
    /* Create a document fragment */
    const fragment = document.createDocumentFragment();

    /* Iterate through data source */
    data.forEach(hike => {
        /* Create the elements */
        const section = document.createElement('section');
        const heading = document.createElement('h2');
        const image = document.createElement('img');
        const description = document.createElement('p');
        const trailhead = document.createElement('h3');
        const map = document.createElement('a');
        const address = document.createElement('address');
        const link = document.createElement('a');

        /* Set element attributes */
        heading.textContent = hike.name;
        image.setAttribute('src', hike.image_url);
        image.setAttribute('alt', hike.name);
        image.setAttribute('loading', 'lazy');
        description.textContent = hike.description;
        trailhead.textContent = `${hike.name} Trailhead`;
        address.textContent = `🗺️ ${hike.address}`;
        map.setAttribute('href', `https://www.google.com/maps/search/?api=1&query=${hike.lat}, ${hike.lon}`);
        map.setAttribute('target', '_blank');
        link.setAttribute('href', hike.url);
        link.setAttribute('target', "_blank");
        link.textContent = `More Info About ${hike.name}`;

        /* Add elements to fragment */
        section.appendChild(heading);
        section.appendChild(image);
        section.appendChild(description);
        section.appendChild(trailhead);
        section.appendChild(map);
        map.appendChild(address);
        section.appendChild(link);

        fragment.appendChild(section);
    });

    /* Add the fragment to the document */
    hikeListing.innerHTML = '';
    hikeListing.appendChild(fragment);
}

loadCards();