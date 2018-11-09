const parser = new DOMParser();

const linksSection = document.querySelector('.links');
const errorMessage = document.querySelector('.error-message');
const newLinkForm = document.querySelector('.new-link-form');
const newLinkUrl = document.querySelector('.new-link-url');
const newLinkSubmit = document.querySelector('.new-link-submit');
const clearStorageButton = document.querySelector('.clear-storage');

clearStorageButton.addEventListener('click', () => {
  localStorage.clear();
  linksSection.innerHTML = '';
});

newLinkUrl.addEventListener('keyup', () => {
  newLinkSubmit.disabled = !newLinkUrl.validity.valid;
});

/*
newLinkForm.addEventListener('submit', event => {
  event.preventDefault();

  const url = newLinkUrl.value;

  fetch(url)
    .then(response => response.text())
    .then(parseResponse)
    .then(findTitle)
    .then(title => storeLink(title, url))
    .then(clearForm)
    .then(renderLinks)
    .catch(error => handleError(error,url));
});
*/

// format according to ES7
newLinkForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const url = newLinkUrl.value;

  try {
    let response = await fetch(url);
    validateResponse(response);
    storeLink(findTitle(parseResponse(await response.text())), url);

    clearForm();
    renderLinks();
  } catch (err) {
    handleError(err, url);
  }
});

const clearForm = () => {
  newLinkUrl.value = null;
};

const convertToElement = (link) => {
  return `
<div class="link">
  <h3>${link.title}</h3>
  <p>
    <a href="${link.url}">${link.url}</a>
  </p>
</div>
`;
};

const findTitle = (nodes) => nodes.querySelector('title').innerText;

const getLinks = () => {
  return Object.keys(localStorage)
    .map(key => JSON.parse(localStorage.getItem(key)));
};

const handleError = (err, url) => {
  errorMessage.innerHTML = `
There was an issue adding "${url}": ${err.message}
`.trim();

  setTimeout(() => {
    errorMessage.innerText = null
  }, 5000);
}

const parseResponse = (text) => {
  return parser.parseFromString(text, 'text/html');
};

const renderLinks = () => {
  linksSection.innerHTML = getLinks().map(convertToElement).join('');
};

const storeLink = (title, url) => {
  localStorage.setItem(url, JSON.stringify({
    title: title,
    url: url
  }));
};

const validateResponse = (response) => {
  if (response.ok) {
    return response;
  }

  throw new Error(`Status code of ${response.status} ${response.statusText}`);
}