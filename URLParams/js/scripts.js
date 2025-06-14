const getString = window.location.search;
// console.log(getString);

const myInfo = new URLSearchParams(getString);
// console.table(myInfo);

// console.log(myInfo.get('first'));
// console.log(myInfo.get('last'));
// console.log(myInfo.get('ordinance'));
// console.log(myInfo.get('date'));
// console.log(myInfo.get('location'));
// console.log(myInfo.get('phone'));
// console.log(myInfo.get('email'));

let phoneNumber = myInfo.get('phone');
if (phoneNumber.length === 10) {
    phoneNumber = phoneNumber.substring(0, 3) + '-'
        + phoneNumber.substring(3, 6) + '-'
        + phoneNumber.substring(6, 10);
}

myInfo.append('url', 'http://www.google.com');

document.querySelector('#results').innerHTML = `
    <p>Appointment for ${myInfo.get('first')} ${myInfo.get('last')}</p>
    <p>Proxy ${myInfo.get('ordinance')} on ${myInfo.get('date').toLocaleLowerCase()} in the ${myInfo.get('location')} temple</p>
    <p>Your Phone: ${phoneNumber}</p>
    <p>Your Email: ${myInfo.get('email')}</p>
    <p>Your URL: ${myInfo.get('url')}</p>
`

myInfo.delete('url');

const urlNode = document.createElement('p');
urlNode.textContent = `Your URL has been deleted: ${myInfo.get('url')}`;
document.querySelector('#results').append(urlNode);

const nonExistent = myInfo.has('address');
if (!nonExistent) 
{
    document.querySelector('#results').append(`{address} is not found in the URL query string`);
}