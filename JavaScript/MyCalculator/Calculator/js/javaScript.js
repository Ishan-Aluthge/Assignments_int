let result = document.getElementById("output-screen");

let display=(num)=>{
    result.value+=num;
}
let  Result=()=>{
    try {
        result.value = eval(result.value);
    }catch (err){
        alert("Invalid")
    }
}
function Clear(){
    result.value="";
}
function del(){
    result.value =result.value.slice(0,-1)
}