import { Component, ViewChild } from '@angular/core';

import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as TrackingActions from './tracking.actions';
import { State } from './tracking.reducer';
import { interval } from 'rxjs';
import { HttpClient, HttpHeaders } from "@angular/common/http";

const _SECONDS: number = 90;

@Component({
  selector: 'my-Tracking',
  templateUrl: './Tracking.component.html'
})
export class TrackingComponent {
  statusPause: boolean = false;
  statusPlay: boolean = true;
  progressbarValue: number = 100;
  lineasSelector:any[] = [];
  lineasBusSelector:any[] = [];
  curSec: number = 0;
  data: Observable<any>;
  timer$: any = interval(1000);
  @ViewChild('gmap25') gmapElement: any;
  map: google.maps.Map;
  iconBase = 'https://maps.google.com/mapfiles/kml/shapes/';
  markers: any[] = [];
  centrar: boolean;
  lines: any[] = [];
  markerTypes = [
    {
      text: "Parking", value: "info-i_maps.png"
    }
  ];
  selectedMarkerType: string = "info-i_maps.png";
  constructor(
    private store: Store<State>,
    private http: HttpClient,
  ) {
    this.data = this.store.pipe(
      select((state: State) => state.TrackingModule.Tracking)
    )
    this.data.subscribe(response => {
      this.cargarDatos(response.data);
    });
    const sub = this.timer$.subscribe((sec) => {
      if (this.statusPlay) {
        this.progressbarValue = (sec % _SECONDS) * 100 / _SECONDS;
        this.curSec = (sec % _SECONDS);
        if (this.progressbarValue == 0) {
          this.refrescarDatos();
        }
      }

    });

  }

  refrescarDatos = () => {
    this.store.dispatch(new TrackingActions.RequestUpdates());

  }

  moverBuses = () => {
    this.store.dispatch(new TrackingActions.RefreshMap());
  }
  public ngOnInit() {
    let latitude = 40.415511;
    let longitude = -3.7074009;
    var mapProp = {
      center: new google.maps.LatLng(latitude, longitude),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.getOpciones();
  }

  addMarker = (location: any, label: string, color: string) => {

    var marker = new google.maps.Marker({
      position: location,
      map: this.map,
      label: { text: label, color: color }
    });
    this.markers.push(marker);
  }
  // Sets the map on all markers in the array.
  setMapOnAll = (map) => {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  clearMarkers = () => {
    this.setMapOnAll(null);
  }

  // Shows any markers currently in the array.
  showMarkers = () => {
    this.setMapOnAll(this.map);
  }

  // Deletes all markers in the array by removing references to them.
  deleteMarkers = () => {
    this.clearMarkers();
    this.markers = [];
  }
  clearLines = () => {
    for (let linea of this.lines) {
      linea.setMap(null);
    }
    this.lines = [];
  }
  cargarDatos = (nuevosDatos: any[]) => {

    if (nuevosDatos.length > 0) {
      this.clearLines();
      for (let entry of nuevosDatos) {
        /* for (let marca of this.markers) {
 
           if (marca.label.text == entry.codBus && marca.position.lat() != entry.geometry.coordinates[1]) {
             let destino = new google.maps.LatLng(entry.geometry.coordinates[1], entry.geometry.coordinates[0]);
             let origen = new google.maps.LatLng(marca.position.lat(), marca.position.lng());
             this.crearFlecha(origen, destino, marca.label.text);
           }
 
         }
       */
        this.crearPath(entry);
      }

    }
    this.clearMarkers();
    if (nuevosDatos.length > 0) {
      let bounds = new google.maps.LatLngBounds();
      for (let entry of nuevosDatos) {
        if (entry.codLinea == 25) {
          let location = new google.maps.LatLng(entry.geometry.coordinates[1], entry.geometry.coordinates[0]);
          bounds.extend(location);
          if (entry.sentido == 1) {
            this.addMarker(location, entry.codBus, "blue");
          } else {
            this.addMarker(location, entry.codBus, "yellow");
          }

        }
      }

      this.map.fitBounds(bounds);


    }
  }
  lineSymbol: any = {
    path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
  };

  // Create the polyline and add the symbol via the 'icons' property.

  crearFlecha = (origen: any, destino: any, bus: any) => {

    let encontrado = false;
    for (let linea of this.lines) {
      if (linea.bus == bus) {
        encontrado = true;
        var path = linea.linea.getPath();
        // add new point
        path.push(destino);
        // update the polyline with the updated path
        linea.linea.setPath(path);
      }
    }
    if (!encontrado) {
      let line: any = new google.maps.Polyline({
        path: [origen, destino],
        map: this.map,
        icons: [{
          icon: this.lineSymbol,
          offset: '100%'
        }],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      this.lines.push({ bus: bus, linea: line });
    }

  }

  getOpciones = () => {
    this.http.post("https://datosabiertos.malaga.eu/recursos/transporte/EMT/EMTlineasUbicaciones/lineasyubicaciones.geojson", {})
      .subscribe(
        (val: any) => {
          console.log("POST call successful value returned in body", val);
          let aux: string[] = [];
          for (let bus of val) {
            aux.push(bus.codLinea);
          }
          this.lineasSelector = aux.filter((el, i, a) => i === a.indexOf(el));
          
          for(let linea of this.lineasSelector){
            let auxBusLinea:any[] = [];
            for (let bus of val) {
              if(linea == bus.codLinea){
                auxBusLinea.push(bus.codBus);
              }
            }
            this.lineasBusSelector.push({
              name: linea,
              values: auxBusLinea 
            })
          }
        },
        response => {
          console.log("POST call in error", response);
        },
        () => {
          console.log("The POST observable is now completed.");
        });

  }
  crearPath = (entry: any) => {

    let encontrado = false;
    let pathGeo = [];
    for (let geometry of entry.path) {
      pathGeo.push(new google.maps.LatLng(geometry.coordinates[1], geometry.coordinates[0]))
    }
    if (pathGeo.length > 1) {
      let line: any = new google.maps.Polyline({
        path: pathGeo,
        map: this.map,
        icons: [{
          icon: this.lineSymbol,
          offset: '100%'
        }],
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      this.lines.push(line);
    }

  }

}
