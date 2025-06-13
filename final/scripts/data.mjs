/* Asynchronous data pull a JSON object */
const url = "./data/hikes.json";

export default async function getHikes() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch(error) {
        console.error(error);
    }
}   