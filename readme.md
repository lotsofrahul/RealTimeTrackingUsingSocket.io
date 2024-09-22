***Steps Followed***

Check if browser supports geolocation.

Set options for high accurancy, a 5-10 second timeout and no caching.

Use watchPosition to track the user location continously.

Emit the latitude and longitude via a socket with 'send-location'. Log any errors to the console.

Initialize a map centered at coordinates (0,0) with a zoom level of 15 using Leaflet. Add openStreatMap tiles to the map.

Create an empty object markers.

When receiving location via socket extract id, latitude and longitude, and center the map on the new coordinates.

If a marker for the id exists, update its position, otherwise create a new marker and add it to the map.

When an user disconnects, remove their marker from the map delete it from markers.

***About Leaflet***

Leaflet is an open-source JavaScript library for creating interactive maps. It is lightweight, easy to use, and works efficiently across various platforms, including desktop and mobile devices. Leaflet allows you to integrate dynamic maps into web applications, providing functionalities such as zooming, panning, and adding markers or layers to maps.