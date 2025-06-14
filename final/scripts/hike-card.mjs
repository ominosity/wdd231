export default function makeCard(hike) {
    /* Create the elements */
    const section = document.createElement('section');
    const heading = document.createElement('h2');
    const image = document.createElement('img');
    const description = document.createElement('p');
    const trailhead = document.createElement('h3');
    const map = document.createElement('a');
    const address = document.createElement('address');
    const link = document.createElement('a');

    /* Modal on image-click */
    const dialog = document.createElement('dialog');
    const dialogSection = document.createElement('section');
    const dialogHeading = document.createElement('h2');
    const dialogImage = document.createElement('img');
    const dialogDescription = document.createElement('p');
    const dialogTrailhead = document.createElement('h3');
    const dialogLatLon = document.createElement('p');
    const dialogMap = document.createElement('a');
    const dialogAddress = document.createElement('address');
    const dialogLink = document.createElement('a');
    const dialogClose = document.createElement('a');


    /* Set element attributes */
    heading.textContent = hike.name;
    image.setAttribute('src', hike.image_url);
    image.setAttribute('alt', hike.name);
    image.setAttribute('loading', 'lazy');
    image.setAttribute('title', 'Click for a larger card');
    image.classList.add('dialog-link');
    description.textContent = hike.description;
    trailhead.textContent = `${hike.name} Trailhead`;
    address.textContent = `🗺️ ${hike.address}`;
    map.setAttribute('href', `https://www.google.com/maps/search/?api=1&query=${hike.lat},${hike.lon}`);
    map.setAttribute('target', '_blank');
    link.setAttribute('href', hike.url);
    link.setAttribute('target', "_blank");
    link.textContent = `More Info About ${hike.name}`;

    /* Modal on image-click attributes and event handler */
    const dialogID = `dialog-${hike.name.toLowerCase().replace(/\s+/g, '-')}`;
    dialog.setAttribute('id', dialogID);
    dialogHeading.textContent = hike.name;
    dialogImage.setAttribute('src', hike.image_url);
    dialogImage.setAttribute('alt', hike.name);
    dialogImage.setAttribute('loading', 'lazy');
    dialogDescription.textContent = hike.description;
    dialogTrailhead.textContent = `${hike.name} Trailhead`;
    dialogAddress.textContent = `🗺️ ${hike.address}`;
    dialogMap.setAttribute('href', `https://www.google.com/maps/search/?api=1&query=${hike.lat},${hike.lon}`);
    dialogMap.setAttribute('target', '_blank');
    dialogLatLon.innerHTML = `<strong>Latitude: </strong>${hike.lat}<br><strong>Longitude: </strong>${hike.lon}`;
    dialogLink.setAttribute('href', hike.url);
    dialogLink.setAttribute('target', "_blank");
    dialogLink.textContent = `More Info About ${hike.name}`;
    dialogClose.textContent = 'X';
    dialogClose.classList.add('close-dialog');
    dialogClose.setAttribute('title', 'Close popup');

    image.addEventListener('click', () => dialog.showModal());
    dialogClose.addEventListener('click', () => dialog.close());

    /* Add elements to fragment */
    section.appendChild(heading);
    section.appendChild(image);
    section.appendChild(description);
    section.appendChild(trailhead);
    section.appendChild(map);
    map.appendChild(address);
    section.appendChild(link);

    /* Add elements to dialog */
    dialogSection.appendChild(dialogHeading);
    dialogSection.appendChild(dialogClose);
    dialogSection.appendChild(dialogImage);
    dialogSection.appendChild(dialogDescription);
    dialogSection.appendChild(dialogTrailhead);
    dialogSection.appendChild(dialogMap);
    dialogMap.appendChild(dialogAddress);
    dialogSection.appendChild(dialogLatLon);
    dialogSection.appendChild(dialogLink);
    dialog.appendChild(dialogSection);

    section.appendChild(dialog);

    return section;
}