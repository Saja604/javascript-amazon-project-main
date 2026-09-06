// this creates new http message that we want to send to the backend
// message=request
// save request in a variable
const xhr =new XMLHttpRequest();
// we will get one response from the backend, it is called request-response cycle= 1 request, 1 response, we can see it in the netword tab of the browser.
// to see the response in our project
// but it takes time to get the response because of the asynchronous code
// so in order to wait for the response, we have to set up the event listener before we set up the request.
xhr.addEventListener('load', () => {
  console.log(xhr.response); 
});
// set it up to send to the backend, parameters are: type of http message (GET, POST, PUT, DELETE), where to send this HTTP message: to locate another computer on the internet we have to use URL(https://example.com)
// https: using http
// s: using secure version of  http
// example.com: domain name, like an address that points to a computer
xhr.open('GET', 'https://supersimplebackend.dev');
xhr.send();
// we can send different messages by using URL path, which comes after the url, the default is /
// if a URL path is not supported, the request will fail
// The list of supported URL paths is in the backend documentation, it is called Backend API(Application Programming Interface), 

// status code tells us if the request succeded or failed, if it starts with 4(our problem) or 5(backend's problem) (400, 404, 500) = failed
// if it starts with 2 (200, 201) = success

// Responses: the backend can respond with a text, JSON, html, image
// using thebrowser is the same as making a get request