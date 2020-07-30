
function deleteFrom(type, productID, variationID){
    let product = document.getElementById(productID);
    if(type==='cart'){
        let price=parseFloat(document.getElementById('totalPrice').innerText);
        price=price - parseFloat(document.getElementById('price'+variationID).innerText);
        document.getElementById('totalPrice').innerHTML=price.toString();
    }
    product.remove();

    url='/'+type+'/delete';
    let xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === XMLHttpRequest.DONE) {
            console.log(JSON.parse(xmlhttp.response));
        }
    };
    xmlhttp.open("DELETE", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    xmlhttp.send(JSON.stringify({ productID:productID, variantID:variationID}));
}

var fromCurrency = 'USD';
var currency=0;
function getCurrencyRate() {
    url='http://data.fixer.io/api/latest?access_key=01bdc1d1df01cdf0b7f7aa17be57cc43&symbols=USD&format=1';
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === XMLHttpRequest.DONE) {
            if (xmlhttp.status === 200) {
                let jsonObj = JSON.parse(xmlhttp.response);
                currency =parseFloat(jsonObj['rates']['USD']);
            }
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
getCurrencyRate();
function convertCurrency(  toCurrency) {
    if (toCurrency !== fromCurrency) {
        let amount = parseInt(document.getElementsByClassName('price')[0].innerText);
        if(fromCurrency==='EURO') {
            document.getElementsByClassName('price')[0].innerHTML = Math.round(amount * currency);
            document.getElementById('simbol').innerHTML = '$';
        }
        else {
            document.getElementsByClassName('price')[0].innerHTML = Math.round(amount / currency);
            document.getElementById('simbol').innerHTML = '\u20AC';
        }
        fromCurrency=toCurrency;
    }
}

var page=1;
function loadMoreProducts() {
    page++;
    url=window.location.pathname+'/more/'+page;
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === XMLHttpRequest.DONE) {
            let jsonObj = JSON.parse(xmlhttp.response);
            if(xmlhttp.status === 400){
                document.getElementById("moreProducts").disabled = true;
                document.getElementById("moreProducts").innerText = 'No more results';
            }
            if(xmlhttp.status===200){
                let aux=productsInfo.concat(jsonObj);
                productsInfo=jsonObj;
                if(activeFilter.length===0)
                    displayMore(jsonObj);
                else
                    filterProducts(activeFilter[0],activeFilter[1],activeFilter[2],'more');
               productsInfo=aux;
            }
        }
    };
    xmlhttp.open("GET", url);
    xmlhttp.send();
}

function displayMore(products) {

    document.getElementById("pC").innerHTML+= `<div class="container" id="pC${page}"></div>`
    products.forEach(function (item, index) {
        let id="pC"+page+(index-1);
        if(index%2===0){
            document.getElementById("pC"+page).innerHTML+= `<div class="row" id="pC${page}${index}"></div>`
            id="pC"+page+index;
        }
        document.getElementById(id).innerHTML+= `
            <div class="col-sm">
            <h4>${item.name}</h4>
            <div class="container">
                <div class="row">
                    <div class="col-sm">
                        <img src="/images/${item.img_path}" class="img-fluid" alt="Responsive image">
                    </div>
                    <div class="col-sm">
                        <div class="container">
                            <div class="row">
                                <p>${item.short_description}</p>
                            </div>
                            <div class="row">
                                <div class="container">
                                    <div class="row">
                                        <div class="col-sm">
                                            Price : $ ${item.price}
                                        </div>
                                        <div class="col-sm">
                                            <a class="btn btn-primary text-white" href="/subcategory/${item.primary_category_id }/${item.id}" role="button" >More details</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>`

    });
    if((products.length-1)%2===0){
        document.getElementById("pC"+page).innerHTML+=`</div>`
    }
}

function writeModal() {
    document.getElementById("userNameProfile").innerHTML=localStorage.getItem('name');
    document.getElementById("userEmailProfile").innerHTML=localStorage.getItem('email');
   let mydate = new Date(Date.parse(localStorage.getItem('data')));
    document.getElementById("userDataProfile").innerHTML=mydate.toDateString();


    url='/cart/info/';
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === XMLHttpRequest.DONE) {
            let jsonObj = JSON.parse(xmlhttp.response);
            if(xmlhttp.status===200){
                document.getElementById("cartNumber").innerHTML=jsonObj['cart'];
                document.getElementById("wishlistNumber").innerHTML=jsonObj['wishlist'];
                if(jsonObj['email_Confirmed']!==true)
                    document.getElementById("emailConfirm").innerHTML=`Your email is not confirmed.
                                                                       Please check your email and <a href="auth/signup/codeverify">confirm the code</a>`;
                else
                    document.getElementById("emailConfirm").innerHTML=`Your email is confirmed.`;
            }
        }
    };
    xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({
        email: localStorage.getItem('email'),
    }));
}
