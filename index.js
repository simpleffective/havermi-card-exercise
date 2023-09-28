import get_random_user from './random_user.js' 
import create_user from './user_model.js';

(async function init() {

  // Fetch data and map it to the model
  let data;
  try {
     data = await get_random_user();
  } catch (err) {
    console.error('Error:', err.message)
    return;
  }
  let user = create_user(data);
  let userView = formatUser(user);

  // Setup event listeners
  const card_bottom = document.getElementById('card-bottom');
  card_bottom.onmouseover = (evt) => onHover(evt, userView);

  // Render data
  updateCard(userView)

})();

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
