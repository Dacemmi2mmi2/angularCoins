import { Component, Input, Output, EventEmitter } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { IbodyPriceApi } from '../../interfaces/app.interface';
import { of, map } from 'rxjs';
import * as D3 from "d3";

@Component({
    selector: 'app-graphs-coin',
    templateUrl: './graphs-coin.component.html',
    styleUrls: ['./graphs-coin.component.css']
})

class GraphsCoinComponent {
    zIndex = '-100';
    opacity = '0';
    transform = 'scale(.8)';

    @Input() dataPriceCoin: any;
    @Input() graphsListCoin: any;
    @Output() page: EventEmitter<string> = new EventEmitter();

    constructor(private http: HttpClient) { }

    hideGraphicPage(): void {
        console.log('hide gr')
        this.zIndex = '-100';
        this.opacity = '0';
        this.transform = 'scale(.8)';
        setTimeout((): void => this.page.emit('table'), 150);
    }

    showGraphicPage(): void {
        console.log('show gr')
        this.zIndex = '100';
        this.opacity = '1';
        this.transform = 'scale(1)';
    }

    getUrlApiGraphic(id: string, name: string): void {
        this.getApiForGraphic(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=30&interval=daily`, name);
    }

    getApiForGraphic(url: string, name: string): Promise<void> {
        return new Promise((resolve) => {

            this.http.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                observe: 'response'
            })
            .pipe(map((data): HttpResponse<object> => data))
            .subscribe({
                next: (data): void => {
                    this.renderGraphic(data.body as IbodyPriceApi, name);
                },
                complete: (): void => resolve()
            })
        });
    }

    renderGraphic({ prices }: IbodyPriceApi, name: string): void {
        prices.pop();
        const { clientWidth, clientHeight } = document.querySelector('.wrapper__graphs') as HTMLElement;
        const width = clientWidth * .9;
        const height = clientHeight * .9;
        const pricesCoin = prices.map((item: number[]) => item[1]) as number[];
        const datesCoin = prices.map((item: number[]) => new Date(item[0])) as Date[];
        const maxPrise: number = Math.max(...pricesCoin);
        const minPrise: number = Math.min(...pricesCoin);
        const firtDate = prices[0][0];
        const endDate = prices[prices.length - 1][0];
        const margin = { left: 60, bottom: 30 }

        D3.select('svg')
            .selectAll('*')
            .remove();

        const scaleX = D3.scaleTime()
            .domain([new Date(firtDate), new Date(endDate)])
            .range([0, width])

        const scaleY = D3.scaleLinear()
            .domain([maxPrise, minPrise])
            .range([0, height])
            .nice();

        const formatTime = D3.timeFormat("%d.%m");
        const axisLeft = D3.axisLeft(scaleY);
        const axisBottom = D3.axisBottom(scaleX)
            .tickValues(datesCoin)
            .tickFormat(d => formatTime(<Date>d));

        const area = D3.area(d => scaleX(d[0]), height + margin.bottom, d => scaleY(d[1]))
            .curve(D3.curveCatmullRom.alpha(0.5));

        const line = D3.line(d => scaleX(d[0]), d => scaleY(d[1]))
            .curve(D3.curveCatmullRom.alpha(0.5));

        const svg = D3.select('svg');
        svg.append("path")
            .datum(prices)
            .attr("fill", "#039")
            .attr("fill-opacity", .3)
            .attr("stroke", "none")
            .attr("d", area([...prices] as [number, number][]))
            .attr('transform', `translate(${margin.left}, 0)`);

        svg.append('path')
            .attr('stroke', 'black')
            .attr('stroke-width', '4')
            .attr('fill', 'none')
            .attr('d', line([...prices] as [number, number][]))
            .attr('transform', `translate(${margin.left}, 0)`);

        svg.selectAll('rect')
            .data(prices)
            .enter()
            .append('circle')
            .attr('cx', d => scaleX(d[0]))
            .attr('cy', d => scaleY(d[1]))
            .attr('r', 4)
            .attr('fill', 'white')
            .attr('stroke', 'black')
            .attr('transform', `translate(${margin.left}, 0)`);

        svg.append('g')
            .attr("transform", `translate(${margin.left}, ${clientHeight * .9 + 30})`)
            .call(axisBottom)
            .selectAll('text')
            .attr('transform', 'rotate(-45)')
            .attr('y', '8')
            .attr('x', '-11');

        svg.append('g')
            .attr('transform', `translate(${margin.left},30)`)
            .call(axisLeft);

        svg.append('text')
            .text(`${name}`)
            .style('font-size', '20px')
            .style('font-family', 'Montserrat Medium')
            .attr("x", 80)
            .attr("y", 40);
    }
}

export { GraphsCoinComponent }