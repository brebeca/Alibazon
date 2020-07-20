function logout() {
    //  document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    url='/auth/logout';
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === XMLHttpRequest.DONE) {
            let jsonObj = JSON.parse(xmlhttp.response);
            if(xmlhttp.status !== 200){
                alert('LogOut failed ');
            }
            if(xmlhttp.status===200){
                window.location.replace("/");
            }
            console.log(jsonObj);
        }
    };
    xmlhttp.open("DELETE", url);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send(JSON.stringify({}));
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('data');
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
            if(xmlhttp.status===200){
                localStorage.setItem('name', jsonObj.name);
                localStorage.setItem('email', jsonObj.email);
                localStorage.setItem('data', jsonObj.registerData);
                //console.log(jsonObj);
                 window.location.replace("/");
            }
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
