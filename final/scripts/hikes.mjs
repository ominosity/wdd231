import getHikes from "./data.mjs";
import makeCard from "./hike-card.mjs";

const data = await getHikes();

const hikeListing = document.querySelector('#hike-listing');

const loadCards = () => {
    /* Create a document fragment */
    const fragment = document.createDocumentFragment();

    /* Iterate through data source */
    data.forEach(hike => {
        const card = makeCard(hike);

        fragment.appendChild(card);
    });

    /* Add the fragment to the document */
    hikeListing.innerHTML = '';
    hikeListing.appendChild(fragment);
}

loadCards();