import getHikes from "./data.mjs";
import makeCard from "./hike-card.mjs"

const data = await getHikes();
const reviewSummary = {};

/* Get the URL params */
const params = new URLSearchParams(window.location.search);

/* Get DOM elements to work with */
const hikeName = document.querySelector('#hike-name');
const thisHikeCard = document.querySelector('#this-hike');
const thisReview = document.querySelector('#this-review');
const allReviews = document.querySelector('#all-reviews');

/* Create a fragment to fill out 'this-review' */
const fragment = document.createDocumentFragment();
const reviewHeader = document.createElement('h2');
reviewHeader.textContent = 'This review';
fragment.appendChild(reviewHeader);
const hikeNameHeader = document.createElement('h3');
const reviewList = document.createElement('ul');

/* Hike name, header, and card creation */
if (params.has('hike')) {
    const hike = params.get('hike');
    hikeName.textContent = hike;
    hikeNameHeader.textContent = hike;
    fragment.appendChild(hikeNameHeader);

    reviewSummary.name = hike;
    /* Show the card section for the reviewed hike */
    thisHikeCard.innerHTML = ''; // Clear the placeholder first
    const hikeData = data.find(item => item.name === hike);
    thisHikeCard.appendChild(makeCard(hikeData));
}

/* Turn URL params into a summary */
if (params.has('difficulty')) {
    const difficulty = params.get('difficulty');
    addReviewItemToList('Difficulty', difficulty);
    reviewSummary.difficulty = difficulty;
}

if (params.has('scenery')) {
    const scenery = params.get('scenery');
    addReviewItemToList('Scenery', scenery);
    reviewSummary.scenery = scenery;
}

if (params.has('repeat')) {
    const repeat = params.get('repeat');
    addReviewItemToList('Would (will) you go again', repeat);
    reviewSummary.repeat = repeat;
}

if (params.has('description')) {
    const description = params.get('description');
    if (description != "") {
        addReviewItemToList('Description', description);
        reviewSummary.description = description;
    }
}

function addReviewItemToList(heading, value) {
    const itemElement = document.createElement('li');
    itemElement.innerHTML = `<strong>${heading}: </strong>${value}`;
    reviewList.appendChild(itemElement);
}

/* Clear the review summary and repopulate it */
thisReview.innerHTML = '';
fragment.appendChild(reviewList);
thisReview.appendChild(fragment);

/* Work with local storage to keep track of this user's reviews */
/* Get existing reviews or create an empty array if no reviews exist */
let hikes = JSON.parse(localStorage.getItem('hike-reviews')) || [];

/* Create the elements showing previous reviews */
const reviewFragment = document.createDocumentFragment();
hikes.forEach(hike => {
    /* Create the DOM elements */
    const section = document.createElement('section');
    const header = document.createElement('h2');
    const hikeName = document.createElement('h3');
    const listElement = document.createElement('ul');

    /* Fill the DOM elements */
    section.classList.add('review');
    header.textContent = `Previous Review - ${hike.name}`;
    hikeName.textContent = hike.name;
    
    /* Add DOM elements to each other and the fragment */
    section.appendChild(header);
    section.appendChild(hikeName);
    section.appendChild(listElement);

    /* Add the optional review items */
    if (hike.difficulty) {
        const difficulty = document.createElement('li');
        difficulty.innerHTML = `<strong>Difficulty: </strong>${hike.difficulty}`;
        listElement.appendChild(difficulty);
    }
    if (hike.scenery) {
        const scenery = document.createElement('li');
        scenery.innerHTML = `<strong>Scenery: </strong>${hike.scenery}`;
        listElement.appendChild(scenery);
    }
    if (hike.repeat) {
        const repeat = document.createElement('li');
        repeat.innerHTML = `<strong>Would (will) you go again: </strong>${hike.repeat}`;
        listElement.appendChild(repeat);
    }
    if (hike.description) {
        const description = document.createElement('li');
        description.innerHTML = `<strong>Description: </strong>${hike.description}`;
        listElement.appendChild(description);
    }

    reviewFragment.appendChild(section);

    /* Create the card associated with this review */
    const hikeData = data.find(item => item.name === hike.name);
    reviewFragment.appendChild(makeCard(hikeData));
});

/* Add the fragment to the DOM */
allReviews.appendChild(reviewFragment);

/* Add this review to the existing reviews. Make sure it hasn't already been added (in case of page refreshes) */
let hasBeenReviewed = false;

hikes.forEach(hike => {
    if (hike.name == reviewSummary.name) {
        hasBeenReviewed = true;
        return;
    }
});

if (!hasBeenReviewed) {
    hikes.push(reviewSummary);
}

/* Store the new list that has old reviews and the new one */
localStorage.setItem('hike-reviews', JSON.stringify(hikes));

