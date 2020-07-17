function logout() {
    document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    window.location.href = "/";
}

function login(){
    let email= document.getElementById("Email").value;
    let password= document.getElementById("Password").value;
    url='/auth/login';
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === XMLHttpRequest.DONE) {
            let jsonObj = JSON.parse(xmlhttp.response);
            if(xmlhttp.status === 400){
                alert('Login failed : '+ jsonObj['message']);
            }
            else
                alert('Login failed : internal problem . ');
        }
    };
    xmlhttp.open("POST", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({ "email": email,password: password}));
}

function signUp(){
    let email= document.getElementById("Email").value;
    let name= document.getElementById("Name").value;
    let password= document.getElementById("Password").value;
    let passwordMatch= document.getElementById("PasswordMatching").value;
    if(password!==passwordMatch)
        alert("Passwords do not match");
    else {
        url = '/auth/signUp';
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === XMLHttpRequest.DONE) {
                let jsonObj = JSON.parse(xmlhttp.response);
                console.log(jsonObj);
                if (xmlhttp.status === 200) {
                    //document.cookie = "token=" + jsonObj['token'] + "; path=/";
                    console.log(jsonObj);
                    //console.log(document.cookie);
                    window.location.replace("/auth/login");
                } else if (xmlhttp.status === 400) {
                    alert('Login failed : ' + jsonObj['message']);
                } else
                    alert('Login failed : internal problem . ');
            }
        };
        xmlhttp.open("POST", url);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.send(JSON.stringify({
            email: email,
            password: password,
            name: name,
        }));
    }
}

function deleteFromCart( productID, variationID){
    let product = document.getElementById(productID);
    let price=parseFloat(document.getElementById('totalPrice').innerText);
    price=price - parseFloat(document.getElementById('price'+variationID).innerText);
    document.getElementById('totalPrice').innerHTML=price.toString();

    product.remove();

    url='/cart/delete';
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
