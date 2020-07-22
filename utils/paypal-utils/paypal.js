var paypal = require('paypal-rest-sdk');


paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'AV2izuiTToNq4ziEG-Gjf1d7f0oKeB7NoRfwcV_GyFq-MPnTcw0-PoB55hLTNGOqur7v5EwReeKBLZju',
    'client_secret': 'EFMYkXC8KvpGLd9bTxl6g0jv1LGBbtSHamL7KnXKtCgONPyIFkdx7iqs_Hl8Bi7D0NVybiha-JST_CiU'
});

module.exports.paypal=paypal;
