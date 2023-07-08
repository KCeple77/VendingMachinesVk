export class VendingMachine {
  serialNumber: number;
  locations: string;
  latitude: number;
  longitude: number;

  constructor(serialNumber: number, locations: string, latitude: number, longitude: number) {
    this.serialNumber = serialNumber;
    this.locations = locations;
    this.latitude = latitude;
    this.longitude = longitude;
  }
}
