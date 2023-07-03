import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, polygon } from 'leaflet';
import { Observable } from 'rxjs';
import { MessageService, TreeNode } from 'primeng/api';
import { NodeService } from '../../services/nodeservice';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css'],
  providers: [MessageService]
})
export class LocationsComponent implements OnInit {

  machinesData: Observable<any> = new Observable();

  loading: boolean = false;

  files!: TreeNode[];

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

  constructor(private nodeService: NodeService, private messageService: MessageService) { }

    ngOnInit() {
        this.loading = true;
        setTimeout(() => {
            this.nodeService.getLazyFiles().then((files) => (this.files = files));
            this.loading = false;
        }, 1000);
    }

    nodeExpand(event: any) {
        if (event.node) {
            this.loading = true;
            setTimeout(() => {
                this.nodeService.getLazyFiles().then((nodes) => {
                    event.node.children = nodes;
                    this.messageService.add({ severity: 'info', summary: 'Children Loaded', detail: event.node.label });
                });
                this.loading = false;
            }, 200);
        }
    }

}
