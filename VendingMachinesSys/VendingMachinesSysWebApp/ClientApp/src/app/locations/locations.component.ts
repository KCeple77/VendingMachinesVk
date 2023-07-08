import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, polygon } from 'leaflet';
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

  options = {
    layers: [
      tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  };

  layersControl = {
    baseLayers: {
      'Open Street Map': tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
      'Open Cycle Map': tileLayer('https://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    },
    overlays: {
      'Big Circle': circle([ 46.95, -122 ], { radius: 5000 }),
      'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
    }
  }

  constructor(private vendingMachinesService: VendingMachinesService) { }

    ngOnInit() {
      this.vendingMachinesService.getVendingMachines().subscribe(data => {
        console.log("Received Vending Machines data:");
        console.log(data);
        this.vendingMachines = data;
      });
    }
}
