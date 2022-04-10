export interface IbodyPriceApi {
    market_caps: Array<Array<number>>,
    prices: Array<Array<number>>,
    total_volumes: Array<Array<number>>
}

export interface IbodyGlodalApi {
    id: string,
    name: string
}

export interface IdataResposeGlobalApi {
    body: any
    ok: boolean,
    status: number,
    statusText: string
    type: number
    url: string
}