import { Component } from '@angular/core';
import { Product } from 'src/domain/Product';
import { VendingMachine } from 'src/domain/VendingMachine';
import { VendingMachinesService } from 'src/services/vending.machines.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-machines-list',
  templateUrl: './machines-list.component.html',
  styleUrls: ['./machines-list.component.css']
})
export class MachinesListComponent {

  vendingMachines!: Map<Number, VendingMachine>;
  vendingMachinesList!: VendingMachine[];
  products!: Product[];
  vendingMachine2Products: Map<Number, Array<Product>> = new Map<Number, Array<Product>>();

  constructor(private vendingMachinesService: VendingMachinesService) { }

  ngOnInit() {
    let vendingMachinesObservable = this.vendingMachinesService.getVendingMachinesDict();
    let productsObservable = this.vendingMachinesService.getProducts();

    forkJoin([vendingMachinesObservable, productsObservable]).subscribe(([vendingMachinesData, productsData]) => {
        // Process vending machines data
        console.log('Type of received data:', typeof vendingMachinesData);
        console.log('Fields of received data:', Object.keys(vendingMachinesData));

        this.vendingMachines = new Map<Number, VendingMachine>();
        Object.entries(vendingMachinesData).forEach(([key, value]) => {
            this.vendingMachines.set(Number(key), value);
        });

        console.log(this.vendingMachines);
        this.vendingMachinesList = Array.from(this.vendingMachines.values());
        console.log(this.vendingMachinesList);

        // Process products data
        console.log("Received Products data:");
        console.log(productsData);
        this.products = productsData;

        // Add products to machines here and prepare them for the list
        // Map products to each vending machine
        for (const currVendingMachineSN of this.vendingMachines.keys()) {
            this.vendingMachine2Products.set(currVendingMachineSN, new Array<Product>());
        }

        for (const currProd of this.products) {
            const parentVendingMachine = currProd.vendingMachineSerialNumber;
            const vendingMachineProds = this.vendingMachine2Products.get(parentVendingMachine);
            vendingMachineProds?.push(currProd);
        }

        console.log(this.vendingMachine2Products);
    });
  }

  hasVendingMachineGotAnyProducts(vendingMachine: VendingMachine): boolean {
    return this.hasVendingMachineSNGotAnyProducts(vendingMachine.serialNumber);
  }

  hasVendingMachineSNGotAnyProducts(serialNumber: number) {
    const prods = this.vendingMachine2Products.get(serialNumber);

    if(!prods) {
      return false;
    }

    return prods.length > 0;
  }

}
