import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonFunctionsService {
// collection of functions which can be used for various situations
  constructor() { }

  public checkIfUndefinedOrNull(object: any): boolean{
    return (!(typeof object === "undefined" && object === null));
  }

  public getPrice(price: number): string{
    let priceStr = ""+price
    if(price % 1 == 0){
      priceStr = price + ".-"
    }
    return priceStr;
  }

  public searchInsideOfArray(items: any[], searchText: string) {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();

    return items.filter(it => {
      return it.toLocaleLowerCase().includes(searchText);
    });
  }
}
