import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import mapboxgl from 'mapbox-gl';
import * as MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';

@Component({
  selector: 'app-contactanos',
  templateUrl: './contactanos.component.html',
  styleUrls: ['./contactanos.component.css']
})
export class ContactanosComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/mapbox/streets-v11';
  title = 'Ubicación de la casa solar';
  lat = 2.483340;
  lng = -76.561255;
  latUser = 0;
  lngUser = 0;
  locationUser = [this.latUser, this.lngUser];
  marker;
  constructor() { }

  ngOnInit() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
    this.map = new mapboxgl.Map({
        container: 'map',
        style: this.style,
        zoom: 15,
        center: [this.lng, this.lat]
    });
    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load',  () => {
      this.createMarker();

    });

    /*this.map.addControl(new MapboxDirections({
      accessToken: mapboxgl.accessToken
    }), 'top-left');*/



  }

  createMarker() {
    this.marker = new mapboxgl.Marker().setLngLat([this.lng, this.lat]).addTo(this.map);
    this.map.addLayer({
      id: 'points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [this.lng, this.lat]
              },
              properties: {
                title: 'Casa solar',
                icon: 'marker'
              }
            },
          ]
        }
      },
        layout: {
        'text-field': '{title}',
        'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
        'text-offset': [0, 0.6],
        'text-anchor': 'top'
        }
    });
    const positionActual = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true
      },
      trackUserLocation: true
    });
    this.getPosition();

  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {

      navigator.geolocation.getCurrentPosition(resp => {
          this.latUser = resp.coords.longitude;
          this.latUser = resp.coords.latitude;
          this.getRoute();
          resolve({lng: resp.coords.longitude, lat: resp.coords.latitude});
        },
        err => {
          reject(err);
        });
    });

  }


  getRoute() {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    const start = [this.lng, this.lat];
    const end = [this.lngUser, this.latUser];
    // tslint:disable-next-line: max-line-length
    const url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + start[0] + ',' + start[1] + ';' + end[0] + ',' + end[1] + '?steps=true&geometries=geojson&access_token=' + mapboxgl.accessToken;

    // make an XHR request https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest
    const req = new XMLHttpRequest();
    req.responseType = 'json';
    req.open('GET', url, true);
    req.onload = () => {
      const data = req.response.routes[0];
      const route = data.geometry.coordinates;
      const geojson = {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: route
        }
      };
      // if the route already exists on the map, reset it using setData
      if (this.map.getSource('route')) {
        // this.map.getSource('route').setData(geojson);
      } else { // otherwise, make a new request

      }
      // add turn instructions here at the end
    };
    req.send();
  }


}
