export default function create_user(user_json) {
    return {
        "username": user_json.login.username,
        "password": user_json.login.password,
        "email": user_json.email,
        "city": user_json.location.city,
        "country": user_json.location.country,
        "picture": user_json.picture.large,
        "firstname": user_json.name.first,
        "lastname": user_json.name.last,
        "title": user_json.name.title
    }
}
  