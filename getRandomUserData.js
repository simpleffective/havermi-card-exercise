const URL = "https://randomuser.me/api"

export default async function getRandomUserData() {
    let res = await fetch(URL);

    if (!res.ok)
        throw new Error(`HTTP error! Status: ${res.status}`);

    let data = await res.json();
    let user_data = data.results[0];
    return user_data;    
}