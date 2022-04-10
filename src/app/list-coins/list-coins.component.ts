// import { Component, Input } from '@angular/core';

// @Component({
//     selector: 'app-list-conis',
//     templateUrl: './list-coins.component.html',
//     styleUrls: ['./list-coins.component.css']
// })

// class ListCoinsComponent {
//     @Input() dataApp: any;

//     hideListCoins = (): string => this.dataApp.positionTopList = '-120%';
//     activateItemList = (symbol: string): string => this.dataApp.activeItems.includes(symbol) ? 'active' : '';

//     changeVisibleItemTable = ({ target }: Event): void => {
//         const itemList = target as HTMLElement;
//         itemList.classList.toggle('active');
//         if (!this.dataApp.activeItems.includes(itemList.id)) {
//             this.dataApp.activeItems.push(itemList.id);
//         } else {
//             this.dataApp.activeItems = this.dataApp.activeItems.filter((item: string) => item !== itemList.id);
//         }
//     }
// }

// export { ListCoinsComponent }