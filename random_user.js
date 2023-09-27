const URL = "https://randomuser.me/api"

export default async function get_random_user() {
    let res = await fetch(URL);
    let data = await res.json();
    let user_data = data.results[0];
    return user_data;
}