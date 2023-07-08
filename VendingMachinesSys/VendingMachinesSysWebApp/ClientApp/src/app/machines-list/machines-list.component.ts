import { Component } from '@angular/core';
import { VendingMachine } from 'src/domain/VendingMachine';
import { VendingMachinesService } from 'src/services/vending.machines.service';

@Component({
  selector: 'app-machines-list',
  templateUrl: './machines-list.component.html',
  styleUrls: ['./machines-list.component.css']
})
export class MachinesListComponent {

  vendingMachines!: VendingMachine[];

  constructor(private vendingMachinesService: VendingMachinesService) { }

    ngOnInit() {
      // Receive data
      this.vendingMachinesService.getVendingMachines().subscribe(data => {
        console.log("Received Vending Machines data:");
        console.log(data);
        this.vendingMachines = data;
      });


      // Add products to machines here and prepare them for the list

    }

}
