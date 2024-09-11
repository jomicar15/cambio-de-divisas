
// Definición de la interfaz Monitor
export interface Monitor {
    change: number;
    color: number;
    image: string;
    last_update: string;
    percent: number;
    price: number;
    price_old: number;
    symbol: string;
    title: string;
  }
  
  export interface Monitors {
    amazon_gift_card: Monitor;
    bcv: Monitor;
    binance: Monitor;
    cripto_dolar: Monitor;
    dolar_today: Monitor;
    enparalelovzla: Monitor;
    paypal: Monitor;
    skrill: Monitor;
    uphold: Monitor;
  }
  
export interface dataTime {
    date:string;
    time:string
}

  // Definición de la interfaz para los datos recibidos
  export interface DataInterface {
    datetime:dataTime
    monitors:Monitors;
  }
  
  // Definición de la interfaz de error
  export interface Error {
    isError: boolean;
    message: string;
  }