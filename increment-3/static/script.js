var x = 5
var y = 7
var z = x + y
console.log(z)
var A = "Hello"
var B = "world!"
var C = A + B
console.log(C)

function sumnPrint(x1, x2){
    return x1 + x2
}
console.log(sumnPrint(x,y))
console.log(sumnPrint(A, B))

if(C.length > z){
    console.log(C)
    if(C.length < z){
        console.log(z)
    }
}else{
    console.log("good job!");
}

// L1 = ["Watermelon","Pineapple","Pear","Banana"];
// L2 = ["Apple","Banana","Kiwi","Orange"];

// function findTheBanana(L1, L2){
//     for (let i = 0; i < L1.length; i++){
//         if(L1[i] == "Banana") alert("found1");
//     }
// }
// findTheBanana(L1, L2);

// L1.forEach((f, ind) => {
//     if(f == "Banana") alert("found fe");
// })

var date = new Date();
var hour = date.getHours();
function greeting(x){
    if (x < 12){
        document.getElementById("greeting").innerHTML = "Good morning";
    }else if(x < 18){
        document.getElementById("greeting").innerHTML = "Good afternoon";
    }else if(x < 20){
        document.getElementById("greeting").innerHTML = "Good evening";
    }else{
        document.getElementById("greeting").innerHTML = "Good night";
    }
}

if (window.location.pathname.includes("index.html")){
    greeting(hour);
}


function addYear(){
    document.getElementById("copyYear").innerHTML = new Date().getFullYear() + "MonoMuse. All right reserved.";
}
addYear();