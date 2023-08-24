const card_bottom = document.getElementById('card-bottom');
buttons = Array.from(card_bottom.children);
buttons.forEach(button => button.addEventListener('mouseover', evt => onButtonHover(evt)));

const detail_span = document.querySelector('#card-top div').querySelector(':last-child');
const name_span = document.getElementById('name');
const img = document.querySelector('#card-top img')

const initial_detail = 'email';

const URL = "https://randomuser.me/api"
let user_data;
fetch(URL)
  .then(response => response.json())
  .then(data => {
    user_data = data.results[0];
    console.log(user_data);
    name_span.textContent = `${getData('first name')} ${getData('last name')}`;
    name_span.before()
    img.src = getData('picture');
    detail_span.textContent = getData(initial_detail)
  });

function onButtonHover(evt) {
  const button = evt.target;
  detail_span.innerHTML =  getData(button.value);
}

function getData(value) {
  let json_keys = valueToJSONKeys(value);
  let data =  getNestedProperty(user_data, json_keys);
  if (value === 'email') {
    let emailSplit = data.split("@");
    data = `${emailSplit[0]}<wbr>@${emailSplit[1]}`
  }
  return data;
}

function valueToJSONKeys(value) {
  let result;
  switch (value) {
    case "username":
      result = ['login','username'];
      break;
    case "password":
      result = ['login','password'];
        break;
    case "email":
      result = ['email'];
      break;
    case "city":
      result = ['location','city'];
      break;
    case "country":
      result = ['location','country'];
      break;
    case "picture":
      result = ['picture','large']
      break;
    case "first name":
      result = ['name', 'first']
      break;
    case "last name":
      result = ['name', 'last']
      break;
    case "title":
      result = ['name', 'title']
      break;
  }
  return result;
}

function getNestedProperty(data, keys) {
  let currentLevel = data;
  for (const key of keys) {
    if (currentLevel.hasOwnProperty(key)) {
      currentLevel = currentLevel[key];
    } else {
      return null;
    }
  }
  return currentLevel;
}
