/* Get member information from data source */
const url = "data/members.json";

export default async function getMembers() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.members;
    } catch (error) {
        console.error(error);
    }
}
