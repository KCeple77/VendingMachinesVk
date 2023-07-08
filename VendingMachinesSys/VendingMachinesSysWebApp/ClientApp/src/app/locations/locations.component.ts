import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, polygon, LatLng } from 'leaflet';
import { Observable } from 'rxjs';
import { VendingMachine } from 'src/domain/VendingMachine';
import { VendingMachinesService } from 'src/services/vending.machines.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
})
export class LocationsComponent implements OnInit {
  vendingMachines!: VendingMachine[];
  zoom: number = 8;
  center: LatLng = latLng(45.784585, 15.966989);

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
    });
  }

  showMachineData(machine: VendingMachine) {
    console.log('Machine:', machine);
    console.log('Latitude:', machine.latitude);
    console.log('Longitude:', machine.longitude);
    this.center = latLng(machine.latitude, machine.longitude);
    this.zoom = 16;
  }
}
