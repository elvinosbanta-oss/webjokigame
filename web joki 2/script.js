let selectedPackage = "";
let selectedPrice = 0;

/* AUTH */

function switchAuth(type){

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const tabs = document.querySelectorAll(".auth-tab");

tabs.forEach(tab => tab.classList.remove("active"));

if(type === "login"){

loginForm.style.display = "block";
registerForm.style.display = "none";

tabs[0].classList.add("active");

}else{

loginForm.style.display = "none";
registerForm.style.display = "block";

tabs[1].classList.add("active");

}

}

function registerUser(){

const username = document.getElementById("regUser").value;
const password = document.getElementById("regPass").value;
const wa = document.getElementById("regWa").value;

if(!username || !password || !wa){

alert("Lengkapi semua data");
return;

}

const data = {
username,
password,
wa
};

localStorage.setItem("ff_user", JSON.stringify(data));

alert("Berhasil daftar");

switchAuth("login");

}

function loginUser(){

const username = document.getElementById("loginUser").value;
const password = document.getElementById("loginPass").value;

const data = JSON.parse(localStorage.getItem("ff_user"));

if(!data){

alert("Akun belum ada");
return;

}

if(username === data.username && password === data.password){

localStorage.setItem("ff_login","true");

document.getElementById("authScreen").style.display = "none";

alert("Login berhasil");

}else{

alert("Password salah");

}

}

window.onload = () => {

const login = localStorage.getItem("ff_login");

if(login === "true"){

document.getElementById("authScreen").style.display = "none";

}

}

/* PACKAGE */

function selectPackage(name,price){

selectedPackage = name;
selectedPrice = price;

document.getElementById("summaryPackage").innerText = name;

document.getElementById("summaryPrice").innerText = 
"Rp" + Number(price).toLocaleString("id-ID");

}

/* ORDER */

function orderNow(){

const login = localStorage.getItem("ff_login");

if(login !== "true"){

alert("Login dulu");
return;

}

const id = document.getElementById("gameId").value;
const nick = document.getElementById("nick").value;
const wa = document.getElementById("wa").value;
const note = document.getElementById("note").value;

if(!selectedPackage){

alert("Pilih paket dulu");
return;

}

if(!id || !nick || !wa){

alert("Lengkapi data");
return;

}

let extra = "";

if(document.getElementById("fast").checked){

extra += "Fast Proses ";

}

if(document.getElementById("safe").checked){

extra += "Main Aman ";

}

const text = `🔥 ORDER JOKI FF 🔥

📦 Paket: ${selectedPackage}

💰 Harga: Rp${selectedPrice}

🆔 ID FF: ${id}

🎮 Nickname: ${nick}

📱 WhatsApp: ${wa}

⭐ Extra: ${extra}

📝 Catatan: ${note}`;

window.open(
`https://wa.me/6282322737669?text=${encodeURIComponent(text)}`,
'_blank'
);

}

/* LOGOUT */

function logoutUser(){

localStorage.removeItem("ff_login");

location.reload();

}