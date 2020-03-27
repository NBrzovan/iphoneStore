var url=window.location.href;
if(url.indexOf("index.html")!=-1){
    $.ajax({
        url:'data/products.json',
        method:'GET',
        dataType:'json',
        success:function(prod){
            ispisProizvoda(prod);
            ispisCbox(prod);
        }
    });
    ispisInfo();
    ispisForm();
    description();
    about();
    $("#ddlSort").change(sort);
}
if(url.indexOf("chart.html")!=-1){
    ispisKorpica();
    tKopica();
}
if(url.indexOf("author.html")!=-1){
    author();
}
window.onload=function(){
    $.ajax({
        url:'data/menu.json',
        method:'GET',
        dataType:'json',
        success:function(nav){
            ispisMenu(nav);
        }
    });
    ispisLogo();
    footer();
}
window.onscroll=function(){
    this.scrollHeader();
}
function ispisLogo(){
    var ispis="";
        ispis+=`<a href="index.html"><img src="img/logo.png" alt="logo"></a>`;
    document.getElementById("logo").innerHTML=ispis;
}

function ispisMenu(nav){
    var ispis="";
    ispis+=`<ul>`;
    nav.forEach(el => {
        ispis+=`<li><a href="${el.href}">${el.text}</a></li>`;
    });
    ispis+=`</ul>`;
    document.getElementById("menu").innerHTML=ispis;
}

function description(){
    document.querySelectorAll(".description")[0].innerHTML="<h1>About</h1>";
    document.querySelectorAll(".description")[1].innerHTML="<h1>Products</h1>";
    document.querySelectorAll(".description")[2].innerHTML="<h1>FindingUs</h1>";
    document.querySelectorAll(".description")[3].innerHTML="<h1>Contact</h1>";
}

function about(){
    var slika=document.getElementById("picAbout");
    var text=document.getElementById("textAbout");
    slika.innerHTML=`<img src="img/store.jpg"/ alt="store"/>`;
    text.innerHTML="<h2>We are committed to providing exceptional service to our customers. For purchases with fast and free delivery, shop here on apple.com or the Apple Store app.</h2>";
}

function ispisProizvoda(prod){
    var ispis="";
    prod.forEach(pro=>{
        ispis+=`
        <div class="iphone">
        <div class="iImg"><img src="img/${pro.img.src}" alt="${pro.img.alt}"></div>
        <div class="iText">
            <p>Model : <span>${pro.model}</span></p>
            <p>Color : <span>${pro.color}</span></p>
            <p>Price : <span>${pro.price}</span></p>
        </div>
        <div class="iBtn"><input type="button" value="Add" data-id="${pro.id}" class="btn" id="btn"/><i class="fa fa-shopping-cart"></i></div>
        </div>`;   
    });
    document.querySelector("#products").innerHTML=ispis;
    $(".btn").click(dodajUKorpu);
}

function footer(){
    document.querySelector("footer").innerHTML=`<p>Copyright © 2020 Nikola Brzovan | <a href="dokumentacija.pdf"> Documentation </a></p> `;
}

function ispisForm(){
    var ispis="";
    ispis=`
    <form action="#" method="GET" name="#" id="form">  
    <input type="text" placeholder="Name*" id="name" name="name"/><br/>
    <input type="email" placeholder="E-mail*" id="mail" name="mail"/><br/>
    <input type="text" placeholder="Phone*" id="phone" name="phone"/><br/>
    <textarea placeholder="Enter message hire..." name="messages" id="messages" rows="5"></textarea><br/>
    <input type="button" id="btnReg" value="Send"/>
    </form>`;
    document.getElementById("form").innerHTML=ispis;
}
function ispisInfo(){
    var ispis=`
    <div class="infFafa"><i class="fa fa-address-card-o"></i></a></div><p>iPhone Store</p><br/>
    <div class="infFafa"><a href="mailto:nikola.brzovan123@gmail.com"><i class="fa fa-envelope-open-o"></a></i></div><p>iphonestore@gmail.com</p><br/>
    <div class="infFafa"><a href="tel:+3816312312312"><i class="fa fa-phone"></i></a></div><p>+38163/123-123-12</p><br/>
    <div class="infFafa"><i class="fa fa-map-marker"></i></a></div><p>Knez Mihailova 50</p>
    `;
    document.getElementById("info").innerHTML=ispis;
}
function author(){
    var ispis=`
    <img src="img/author.png" alt="author"/><br/>
    <h1>Nikola Brzovan 92/18</h1>
    `;
    document.getElementById("auth").innerHTML=ispis;
}
$('#btnReg').click(function(){
    let ime = document.getElementById("name").value;
    let email = document.getElementById("mail").value;
    let telefon = document.getElementById("phone").value; 

    let greske=[];
    
    let regexIme = /^[A-Z]{1}[a-z]{2,30}$/;
    let regexEmail = /^\w[.\d\w]*\@[a-z]{2,10}(\.[a-z]{2,3})+$/;
    var regexTelefon =/^06[\d]\/[\d]{3}\-[\d]{2}-[\d]{2,3}$/;

    if(!regexIme.test(ime)){
        greske.push("Ime mora poceti velikim pocetnim slovom");
    }
    if(!regexEmail.test(email)){
        greske.push("Mail nije u ispravnom formatu");
    }
    if(!regexTelefon.test(telefon)){
        greske.push("Telefon nije u odgovarajucem formatu. Primer[06(cifra)/(cifra)(cifra)(cifra)-(cifra)(cifra)-(cifra)(cifra)]");
    }
    if(greske.length==0){
        greske.push("Sve je u redu");
    } else{
        var ispis="";
        for(let i=0;i<greske.length;i++){
            ispis+=greske[i]+`</br>`;
        }
        document.getElementById("greske").innerHTML=ispis;
    }
});

function sort(){
    var vrednost = $(this).val();
    $.ajax({
        url:'data/products.json',
        method:'GET',
        dataType:'json',
        success:function(prod){
            if(vrednost!=0){
                prod.sort(function(a,b){
                    if(vrednost==1){
                        return a.price - b.price;
                    }else if(vrednost==2){
                        return b.price - a.price;
                    }
                });
            }
            ispisProizvoda(prod);
        }
    });
}

function ispisCbox(prod){
    var niz=[];
    prod.forEach(p=>{
        if(!niz.includes(p.model)){
            niz.push(p.model)
        }
    });
    var ispis="";
    niz.forEach(n=>{
        ispis+=`<input type="checkbox"  name="cbox" value="${n}"> ${n}<br/>`;
    });
    $("#filter").html(ispis);
    $("input[name=cbox]").click(filtriranje);

    var nizFilter=[];
    
    function filtriranje(){
        var vrednost = $(this).val();
        if(!nizFilter.includes(vrednost)){ //proverava da li postoji vrednsot u nizu, ako ne postoji, pusuje ga
            nizFilter.push(vrednost);
        }else{
            nizFilter=nizFilter.filter(f=>{
                return f!=vrednost;
            });
        }
        console.log(nizFilter);
        $.ajax({
            url:'data/products.json',
            method:'GET',
            dataType:'json',
            success:function(prod){
                var products=prod.filter(p=>{
                    if(nizFilter.length){
                       for(let i=0;i<nizFilter.length;i++){
                            if(nizFilter[i]==p.model){
                                return true;
                            }
                       }
                    }
                    else{
                        return true;
                    }
                });
                console.log(products);
                ispisProizvoda(products);
                
            }
        });
    }
}
function ispisKorpica(){
    $.ajax({
        url:'data/products.json',
        method:'GET',
        dataType:'json',
        success:function(prod){
            var ispis="";
            let proizvodi= JSON.parse(localStorage.getItem("IzabranProizvod"));
                let kupljeniProizvodi=prod.filter(p=>{
                    for(let i=0; i<proizvodi.length; i++){
                        if(proizvodi[i].id==p.id){
                            p.kol=proizvodi[i].kol;
                            return true;
                        }
                    }
                });
                if(kupljeniProizvodi.length){
                    ispis+=`<div id="izabran">`
                    kupljeniProizvodi.forEach(p=>{
                        ispis+=`<p>${p.model} ${p.price} ${p.kol} ${p.price*p.kol}</p><button data-id="${p.id}">remove</button>`;
                    });
                    ispis+="</div>";
                    $("#korpica").html(ispis);
                    $("#korpica button").click(ukloniProizvod);
                }
        }
    });
    
}
function ukloniProizvod(){
    var vrednost=$(this).data("id");
    var products=JSON.parse(localStorage.getItem("IzabranProizvod"));
    products=products.filter(p=>p.id!=vrednost);
    localStorage.setItem("IzabranProizvod",JSON.stringify(products));
    ispisKorpica();
    location.reload();
}
function dodajUKorpu(){
    let val=$(this).data("id");
    let products=[];
    if(localStorage.getItem("IzabranProizvod")!=null){
       products=JSON.parse(localStorage.getItem("IzabranProizvod"));
       if(products.filter(p=>p.id==val).length){
            products.forEach(p=>{
                if(p.id==val){
                    p.kol++;
                }
            });
            localStorage.setItem("IzabranProizvod", JSON.stringify(products));
       }else{
        products.push({
                id:val,
                kol:1
            });
            localStorage.setItem("IzabranProizvod", JSON.stringify(products));
       }
    }
    else{
        products[0]={
            id:val,
            kol:1
        }
        localStorage.setItem("IzabranProizvod", JSON.stringify(products));
    }
    alert("Add to card");
}

var header = document.getElementsByTagName("header")[0];
function scrollHeader(){
    if(document.body.scrollTop>800 || document.documentElement.scrollTop>800){
        header.style.background="black";
    } 
    else {
        header.style.background="none";
    }
}

function tKopica(){
    var txt="<h2>MODEL | PRICE | QUANTITY | PRICE*QUANTITY</h2>"
    $("#textKorpica").html(txt);
}