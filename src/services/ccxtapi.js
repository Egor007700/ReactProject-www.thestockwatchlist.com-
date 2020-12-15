var ccxt = require ('ccxt');

export class CCXT{

    static myInstance = null;
// 0: binance 1 : poloniex, 2 : bitfinex, 3: bithumb, 4: hitbtc
    _userID = "";
    binaceCxt = null;
    poloniexCxt = null;
    bitfinexCxt = null;
    bithumbCxt = null;
    hitbtcCxt = null;
    apiKey = "";
    apiSecret = "";
    static getInstance() {
        if (CCXT.myInstance == null) {
            CCXT.myInstance = new CCXT();
        }

        return this.myInstance;
    }
    processOrder(type, symbol, orderType,side, amount, price, apiKey, apiSecret)
    {
        let exchange = null;
        if (type == 0)
        {
            if (this.binaceCxt == null)
            {
                this.binaceCxt  = new ccxt.binance ({ 
                    verbose: true,                      
                    enableRateLimit: true,                      
                    apiKey: apiKey,
                    secret: apiSecret,
                    timeout: 20000,
                    // proxy: 'https://cors-anywhere.herokuapp.com/',                    
                    proxy: 'http://3.112.36.176:8000/',
                    options: {
                       fetchTradesMethod: 'publicGetTrades',
                    }
                  });
            }
            // this.binance  = new ccxt.binance ({ 
            //     verbose: true,                      
            //     // enableRateLimit: true,                      
            //     apiKey: apiKey,
            //     secret: apiSecret,
            //     timeout: 20000,
            //     // proxy: 'https://cors-anywhere.herokuapp.com/',                    
            //     // proxy: 'http://localhost:8888/',
            //     options: {
            //        fetchTradesMethod: 'publicGetTrades',
            //     }
            // });
            exchange = this.binaceCxt;
        }
        else if (type == 1)
        {
            if (this.poloniexCxt == null)
            {
                this.poloniexCxt = new ccxt.poloniex({
                    verbose: true,                      
                    // enableRateLimit: true,                      
                    apiKey: apiKey,
                    secret: apiSecret,
                    timeout: 20000,
                    // proxy: 'https://cors-anywhere.herokuapp.com/',                    
                    proxy: 'http://3.112.36.176:8000/',
                })
            }
            exchange = this.poloniexCxt;
        }
        else if (type == 2)
        {
            if (this.bitfinexCxt == null)
            {
                this.bitfinexCxt = new ccxt.bitfinex({
                    verbose: true,                      
                    // enableRateLimit: true,                      
                    apiKey: apiKey,
                    secret: apiSecret,
                    timeout: 20000,
                    // proxy: 'https://cors-anywhere.herokuapp.com/',                    
                    proxy: 'http://3.112.36.176:8000/',
                })
            }
            exchange = this.bitfinexCxt;
        }
        else if (type == 3 )
        {
            if (this.bithumbCxt == null)
            {
                this.bithumbCxt = new ccxt.bithumb({
                    verbose: true,                      
                    // enableRateLimit: true,                      
                    apiKey: apiKey,
                    secret: apiSecret,
                    timeout: 20000,
                    // proxy: 'https://cors-anywhere.herokuapp.com/',                    
                    proxy: 'http://3.112.36.176:8000/',
                })
            }
            exchange = this.bithumbCxt;
        }
        else if (type == 4)
        {
            if (this.hitbtcCxt == null)
            {
                this.hitbtcCxt = new ccxt.hitbtc({
                    verbose: true,                      
                    // enableRateLimit: true,                      
                    apiKey: apiKey,
                    secret: apiSecret,
                    timeout: 20000,
                    // proxy: 'https://cors-anywhere.herokuapp.com/',                    
                    proxy: 'http://3.112.36.176:8000/',
                })
            }
            exchange = this.hitbtcCxt;
        }
        if (exchange != null)
        {
            return exchange.createOrder(symbol, orderType, side, amount, price);            
        }
    }
    getSelectedMarket(type, apiKey, apiSecret)
    {
        this.apiKey = apiKey;
        this.apiSecret = apiSecret;


        if (type == 0)
        {
            if (this.binaceCxt == null)
            {
                this.binaceCxt  = new ccxt.binance ({ 
                    verbose: true,                      
                    // enableRateLimit: true,                      
                    apiKey: apiKey,
                    secret: apiSecret,
                    timeout: 20000,
                    // proxy: 'https://cors-anywhere.herokuapp.com/',                    
                    proxy: 'http://3.112.36.176:8000/',
                    //proxy: 'http://localhost:8888/',
                    options: {
                       fetchTradesMethod: 'publicGetTrades',
                    }
                  });
            }
            return this.binaceCxt;
            
        }

        else if (type == 1)
        {
            if (this.poloniexCxt == null)
            {
                this.poloniexCxt = new ccxt.poloniex({
                    verbose: true,                      
                    // enableRateLimit: true,                      
                    apiKey: apiKey,
                    secret: apiSecret,
                    timeout: 20000,
                    // proxy: 'https://cors-anywhere.herokuapp.com/',                    
                    proxy: 'http://3.112.36.176:8000/',
                })
            }
            return this.poloniexCxt;
        }
        else if (type == 2)
        {
            if (this.bitfinexCxt == null)
            {
                this.bitfinexCxt = new ccxt.bitfinex({
                    verbose: true,                      
                    // enableRateLimit: true,                      
                    apiKey: apiKey,
                    secret: apiSecret,
                    timeout: 20000,
                    // proxy: 'https://cors-anywhere.herokuapp.com/',                    
                    proxy: 'http://3.112.36.176:8000/',
                })
            }
            return this.bitfinexCxt;
        }
        else if (type == 3 )
        {
            if (this.bithumbCxt == null)
            {
                this.bithumbCxt = new ccxt.bithumb({
                    verbose: true,                      
                    // enableRateLimit: true,                      
                    apiKey: apiKey,
                    secret: apiSecret,
                    timeout: 20000,
                    // proxy: 'https://cors-anywhere.herokuapp.com/',                    
                    proxy: 'http://3.112.36.176:8000/',
                })
            }
            return this.bithumbCxt;
        }
        else if (type == 4)
        {
            if (this.hitbtcCxt == null)
            {
                this.hitbtcCxt = new ccxt.hitbtc({
                    verbose: true,                      
                    // enableRateLimit: true,                      
                    apiKey: apiKey,
                    secret: apiSecret,
                    timeout: 20000,
                    // proxy: 'https://cors-anywhere.herokuapp.com/',                    
                    proxy: 'http://3.112.36.176:8000/',
                })
            }
            return this.hitbtcCxt;
        }

    }

}

export default CCXT