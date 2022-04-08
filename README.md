# Rijksmuseum collection · Progressive Web Apps · 21/22

## Concept
This project is for Progressive Web Apps part of the CMD Minor Web Design & Development. This project is a single page server-side app. You can view and search your favorite art from Rijksmuseum.

## Live demo

[Demo](https://rijksmuseum-collection.herokuapp.com/)

## 👩‍🏫 Installation

Clone repo

```
$ clone git clone https://github.com/AllyssaA/progressive-web-apps-2122.git
```

Install dependencies
```
$ npm install
```

### Dependencies
I've used a couple of dependencies to create and run this project:

* [ExpressJS](https://expressjs.com/)
* [ejs](https://www.npmjs.com/package/ejs)
* [Node-fetch](https://www.npmjs.com/package/node-fetch)
* [Dotenv](https://www.npmjs.com/package/dotenv)
* [Compression](https://www.npmjs.com/package/compression)


## API
For this project I used the [Rijksmuseum API](https://data.rijksmuseum.nl/object-metadata/api/)
To render the default page to see a collection I used the follow params 

|  key  |      q     |  ps |
|----------|:-------------:|------:|
| apiKey |  searchterm | 20 |

## Service worker

![](https://github.com/AllyssaA/progressive-web-apps-2122/blob/main/static/images/serviceworker.JPG)

This project features a service worker, a service worker act as proxy servers that sit between web applications, the browser, and the network (when available). They are intended, among other things, to enable the creation of effective offline experiences, intercept network requests and take appropriate action based on whether the network is available, and update assets residing on the server. They will also allow access to push notifications and background sync APIs.

When you first land on the page the service worker will be installed and a cache v1 will be created. With this installation, the styling and offline page will be stored in this cache. The service worker will first check the cache if a URL has been previously stored, if the page has not been stored in the cache, it will retrieve from the network and the service worker will store the visited page into the cache html-cache. If the user is offline, all the pages that have been visited previously, will be able to render onto the page, if the user is offline and visit a page that has not been stored in the cache, the offline page will be rendered.


## Optimizations

### Compressions

### Devtools


## ⚖ License

[MIT](https://github.com/AllyssaA/progressive-web-apps-2122/blob/main/LICENSE)

## ✔ Backlog
- [ ] Detailpage - render different data from api
- [ ] Detailpage - Back to home
- [ ] Detailpage - add styling
- [x] Setup hosting/demo
- [x] Install service worker
- [x] Cache visited pages
- [x] Cache offline page
- [x] Cache style.css
- [x] Offline fallback page by using service worker
- [ ] Style offline page
- [ ] Readme
- [ ] Optimization - Compression
- [ ] Optimization - Devtools
- [ ] Optimization - do something with large images


## Source

* [Service worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
* [Caching strategies overview](https://developer.chrome.com/docs/workbox/caching-strategies-overview/)





<!-- Here are some hints for your project! -->

<!-- Start out with a title and a description -->

<!-- Add a nice image here at the end of the week, showing off your shiny frontend 📸 -->

<!-- Add a link to your live demo in Github Pages 🌐-->

<!-- replace the code in the /docs folder with your own, so you can showcase your work with GitHub Pages 🌍 -->

<!-- Maybe a table of contents here? 📚 -->

<!-- ☝️ replace this description with a description of your own work -->

<!-- How about a section that describes how to install this project? 🤓 -->

<!-- ...but how does one use this project? What are its features 🤔 -->

<!-- ...you should implement an explanation of client- server rendering choices 🍽 -->

<!-- ...and an activity diagram including the Service Worker 📈 -->

<!-- This would be a good place for a list of enhancements to optimize the critical render path implemented your app  -->

<!-- Maybe a checklist of done stuff and stuff still on your wishlist? ✅ -->

<!-- We all stand on the shoulders of giants, please link all the sources you used in to create this project. -->

<!-- How about a license here? When in doubt use GNU GPL v3. 📜  -->
