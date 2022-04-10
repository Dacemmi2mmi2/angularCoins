import { HttpClient, HttpResponse } from "@angular/common/http";
import { Component, Injectable } from "@angular/core";
import { Observable, map } from "rxjs"
import { GraphsCoinComponent } from "src/app/graphsCoin/graphs-coin.component";

// @Component({
//     providers: [GraphsCoinComponent]
// })

@Injectable()
class HttpServiceComponent {
    constructor(
        private http: HttpClient,
        // private graphsComponent: GraphsCoinComponent
    ) { }

    getDataApi(url: string): Observable<HttpResponse<object>> {
        return this.http.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            observe: 'response'
        })
        .pipe(
            map((data): HttpResponse<object> => data)
        )
    }

    getApiForGraphic(url: string, name: string): Observable<HttpResponse<object>> {
        return this.http.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            observe: 'response'
        }).
        pipe(
            map((data): HttpResponse<object> => data)            
        );
            // subscribe((response: HttpResponse<object>): void => {
            //     if (response.ok) {
            //         const { body } = response as HttpResponse<object> ;
            //         this.renderGraphic((body as IbodyPriceApi), name);
            //         resolve();
            //     }
            // });
        // });
    }
}

export { HttpServiceComponent }