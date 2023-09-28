import getRandomUserData from './getRandomUserData.js' 
import createUser from './userModel.js';

(async function init() {
  
  let user;
  try {
    user = await getUser();
  } catch (err) {
    console.error('Error:', err.message)
    return;
  }

  // Setup event listeners
  const card_bottom = document.getElementById('card-bottom');
  card_bottom.onmouseover = (evt) => onHover(evt, userView);

  // Render data
  let userView = formatUser(user);
  updateCard(userView)

})();

async function getUser() {
  // Fetch data and map it to the model
  let data = await getRandomUserData();
  let user = createUser(data);
  return user;
}

function updateCard(userView) {
  const name_span = document.getElementById('name');
  const img = document.querySelector('#card-top img')

  name_span.textContent = userView.name;
  img.src = userView.picture;
  
  updateDetail(userView, 'location') // initial detail to show
}

function updateDetail(userView, field) {
  const detail_span = document.querySelector('#card-top div').querySelector(':last-child');
  detail_span.innerHTML = userView[field];
}

function formatUser(user) {
  let emailSplit = user.email.split("@");
  let changes = {
    "name": `${user.title} ${user.firstname} ${user.lastname}`,
    "email": `${emailSplit[0]}<wbr>@${emailSplit[1]}`,  // split long email addresses
    "location": `${user.city}, ${user.country}`
  }
  return Object.assign(user, changes);
}
  
function onHover(evt, user) {
  if (evt.target.tagName !== 'BUTTON')
    return
  let field = evt.target.value;
  updateDetail(user, field);
}
