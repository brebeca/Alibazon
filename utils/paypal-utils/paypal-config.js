module.exports = {
    getJsonPayment: (orderItems, total) => {
        return {
            "intent": "sale",
            "payer": {
                "payment_method": "paypal"
            },
            "redirect_urls": {
                "return_url": "http://localhost:8000/cart/success",
                "cancel_url": "http://localhost:8000/cart/cancel"
            },
            "transactions": [{
                "item_list": {
                    "items": orderItems
                },
                "amount": {
                    "currency": "USD",
                    "total": total
                },
                "description": "This is the payment description."
            }]
        }
    },
}