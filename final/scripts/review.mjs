import getHikes from "./data.mjs";
import makeCard from "./hike-card.mjs"

const data = await getHikes();

const selectElement = document.querySelector('#hike');
const hikeSummary = document.querySelector('#hike-summary');

function loadHikeList() {
    /* Create a document fragment */
    const fragment = document.createDocumentFragment();

    const placeholder = document.createElement('option');
    placeholder.textContent = 'Select an option';
    placeholder.setAttribute('disabled', '');
    placeholder.setAttribute('selected', '');
    placeholder.setAttribute('hidden', '');
    placeholder.setAttribute('required', '');
    placeholder.setAttribute('value', '');

    fragment.appendChild(placeholder);

    /* Check for previous hike reviews and prevent them from being re-reviewed */
    const previousReviews = JSON.parse(localStorage.getItem('hike-reviews'));

    let hikesToRemove = [];
    /* Iterate through stored reviews */
    if (previousReviews) {
        previousReviews.forEach(review => {
            /* Iterate through reviewable hikes for matches */
            data.forEach(hike => {
                if (hike.name == review.name) {
                    /* Track the names of the hikes that have been reviewed */
                    hikesToRemove.push(hike.name);
                }
            });
        });
    };

    /* Create a filtered array that excludes trails that have already been reviewed */
    const filteredHikes = data.filter(hike => !hikesToRemove.includes(hike.name));

    filteredHikes.forEach(hike => {
        /* Create an option element, populate it,  and add it to the fragment */
        const element = document.createElement('option');
        element.textContent = hike.name;
        element.setAttribute('value', hike.name);
        fragment.appendChild(element);
    });

    /* Clear the placeholder element */
    selectElement.innerHTML = '';

    /* Add the fragment to the select list */
    selectElement.appendChild(fragment);
}

loadHikeList();

selectElement.addEventListener('change', () => {
    /* Determine the selected hike based on the selected name */
    const selectedHike = data.find(item => item.name === selectElement.value);

    /* Use it to make a card that fills out the hike-summary div */
    hikeSummary.innerHTML = '';
    hikeSummary.appendChild(makeCard(selectedHike));
    // console.log(selectedHike);
});

