// app/javascript/packs/components/AxiosHeaders.jsx
import axios from 'axios';

const setAxiosHeaders = () => {
	const csrfToken = document.querySelector('[name=csrf-token]');
	if (!csrfToken) {
		return;
	}
	const csrfTokenContent = csrfToken.content;
	csrfTokenContent &&
		(axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfTokenContent);
};

export default setAxiosHeaders;

// On every page of our Rails application, there is a meta_tag with a csrf-token. This token needs to be passed into any request, which is what var csrfToken = document.querySelector('[name=csrf-token]'); does.

// Since our application requires us to pass a csrf-token into the header of any post request, we need to create a new component.

// First we search for the meta tag that contains the csrf-token and save it to csrfToken.
// If the page doesn't contain a csrf-token, we stop the function. Otherwise, we see if the the csrf-token has a content key, and use that value in our header.
