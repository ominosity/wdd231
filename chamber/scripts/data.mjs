/* Get member information from data source */
const membersUrl = "data/members.json";

export default async function getMembers() {
    try {
        const response = await fetch(membersUrl);
        const data = await response.json();
        return data.members;
    } catch (error) {
        console.error(error);
    }
}

/* Get places information from data source for Discovery page */
const placesUrl = "data/places.json"
async function getPlaces() {
    try {
        const response = await fetch(placesUrl);
        const data = await response.json();
        return data.itemsOfInterest;
    } catch (error) {
        console.error(error);
    }
}

export { getPlaces };
