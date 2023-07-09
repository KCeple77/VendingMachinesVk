import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, polygon, LatLng, marker, Marker, Map, icon } from 'leaflet';
import { Observable } from 'rxjs';
import { VendingMachine } from 'src/domain/VendingMachine';
import { VendingMachinesService } from 'src/services/vending.machines.service';
import { IconOptions } from 'leaflet';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})
export class LocationsComponent implements OnInit {
  vendingMachines!: VendingMachine[];
  zoom: number = 8;
  center: LatLng = latLng(44.784585, 16.966989);
  mapMarkers: Marker[] = []; // Array to store the markers
  selectedMarker: Marker | null = null; // Store the selected marker
  map!: Map; // Leaflet Map instance

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '...',
      }),
    ],
    zoom: this.zoom,
    center: this.center,
  };

  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        { maxZoom: 18, attribution: '...' }
      ),
      'Open Cycle Map': tileLayer(
        'https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
        { maxZoom: 18, attribution: '...' }
      ),
    },
    overlays: {
      'Big Circle': circle([46.95, -122], { radius: 5000 }),
      'Big Square': polygon([
        [46.8, -121.55],
        [46.9, -121.55],
        [46.9, -121.7],
        [46.8, -121.7],
      ]),
    },
  };

  constructor(private vendingMachinesService: VendingMachinesService) {}

  ngOnInit() {
    this.vendingMachinesService.getVendingMachines().subscribe((data) => {
      console.log('Received Vending Machines data:');
      console.log(data);
      this.vendingMachines = data;
      this.addMarkersToMap();
    });
  }

  onMapReady(map: Map) {
    this.map = map;
  }

  addMarkersToMap() {
    // Remove existing markers
    this.mapMarkers.forEach((marker) => marker.remove());
    this.mapMarkers = [];

    // Add markers for each vending machine
    this.vendingMachines.forEach((machine) => {
      const markerOptions = {
        icon: icon({
          iconUrl: '../assets/icons/redmarker.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        }),
      };
      const newMarker = marker([machine.latitude, machine.longitude], markerOptions).addTo(this.map);
      this.mapMarkers.push(newMarker);

      newMarker.on('click', () => {
        this.showMachineData(machine);
      });
    });
  }

  showMachineData(machine: VendingMachine) {
    console.log('Machine:', machine);
    console.log('Latitude:', machine.latitude);
    console.log('Longitude:', machine.longitude);
  
    // Reset the previously selected marker color
    if (this.selectedMarker) {
      this.selectedMarker.setIcon(
        icon({
          iconUrl: '../assets/icons/redmarker.png',
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      );
    }
  
    this.center = latLng(machine.latitude, machine.longitude);
    this.zoom = 15;
  
    // Update the icon of the selected marker to blue
    const selectedIconOptions: IconOptions = {
      iconUrl: '../assets/icons/bluemarker3.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    };
  
    const selectedIcon = icon(selectedIconOptions);
  
    const selectedMarker = this.mapMarkers.find(marker => marker.getLatLng().equals(this.center));
    if (selectedMarker) {
      selectedMarker.setIcon(selectedIcon);
      this.selectedMarker = selectedMarker;
  
      // Fly to the new center with animation
      this.map.flyTo(this.center, this.zoom, {
        duration: 0.5, // Animation duration in seconds
        easeLinearity: 0.25, // Easing factor
      });
    }
  }
}

