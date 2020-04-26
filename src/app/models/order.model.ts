export interface Order{
    orderid: string
    userid: string;
    products:{
        productname: String,
        price: Number,
        quantity: Number
    }

}