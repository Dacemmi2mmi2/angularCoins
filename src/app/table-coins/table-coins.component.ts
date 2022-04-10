import { Component, Input, Output, EventEmitter } from "@angular/core";
import { toCsv } from "src/services/exportCsv";

@Component({
    selector: 'app-table-coins',
    templateUrl: './table-coins.component.html',
    styleUrls: ['./table-coins.component.css']
})

class TableCoinsComponent {
    toOldDate = true;
    toLittlePrice = true;
    zIndex = '100';
    opacity = '1';
    transform = 'scale(1)'

    @Input() activeItems: any;
    @Input() getDataCoin: any;
    @Input() tableListCoin: any;
    @Output() page: EventEmitter<string> = new EventEmitter();

    changeVisibleItemTable = ({ target }: Event): void => {
        const itemList = target as HTMLElement;
        itemList.classList.toggle('active');
        if (!this.activeItems.includes(itemList.id)) {
            this.activeItems.push(itemList.id);
        } else {
            this.activeItems = this.activeItems.filter((item: string) => item !== itemList.id);
        }
    }

    // @ts-expect-error
    parsePrise = (prise: string): string => prise.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    presitionPercent = (percent: number): string => `${Number(percent).toPrecision(3)} %`;
    parseDate = (data: number): string => new Date(data).toDateString();

    activateItemList = (symbol: string): string => this.activeItems.includes(symbol) ? 'active' : '';
    visibilityItemTable = (symbol: string): string => this.activeItems.includes(symbol) ? 'flex' : 'none';
    exportToCsv = (): void => toCsv();

    hideTablePage(): void {
        console.log('hide tb')
        this.zIndex = '-100';
        this.opacity = '0';
        this.transform = 'scale(.8)';
        setTimeout((): void => this.page.emit('graphic'), 200);
    }

    showTablePage(): void {
        console.log('show tb')
        this.zIndex = '100';
        this.opacity = '1';
        this.transform = 'scale(1)';
    }

    sortByData(): void {
        if (this.toOldDate) {
            this.getDataCoin.sort((a: { atl_date: number }, b: { atl_date: number }) => {
                const curr: number = new Date(a.atl_date).getTime();
                const next: number = new Date(b.atl_date).getTime();
                return curr - next;
            });
        } else {
            this.getDataCoin.sort((a: { atl_date: number }, b: { atl_date: number }) => {
                const prew: number = new Date(a.atl_date).getTime();
                const curr: number = new Date(b.atl_date).getTime();
                return curr - prew;
            });
        }
        this.toOldDate = !this.toOldDate;
    }

    sortByPrice(): void {
        if (this.toLittlePrice) {
            this.getDataCoin.sort((a: { current_price: number }, b: { current_price: number }) => {
                return a.current_price - b.current_price;
            });
        } else {
            this.getDataCoin.sort((a: { current_price: number }, b: { current_price: number }) => {
                return b.current_price - a.current_price;
            });
        }
        this.toLittlePrice = !this.toLittlePrice;
    }
}

export { TableCoinsComponent }