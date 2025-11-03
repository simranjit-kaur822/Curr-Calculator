
const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
  
const dropdowns = document.querySelectorAll(".myselect");
const btn = document.querySelector(".mybtn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
let newMsg = document.querySelector(".msg");

for(let select of dropdowns){
  for(currcodes in countryList){
    let newOption = document.createElement("option");
    newOption.textContent = currcodes;
    newOption.value = currcodes;
    if(select.name === "from" && currcodes === "USD"){
      newOption.selected = "selected";
    }else if(select.name === "to" && currcodes === "INR"){
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt)=>{
    updateflag(evt.target);
  })
}

const updateflag = (element) =>{
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countrycode}/flat/64.png`
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
}

const updateExchange = async() =>{
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if(amtVal == ""|| amtVal <= 0){
    amtVal = 1;
    amount.value = "1";
  }
  
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
  
  let finalAmount = amtVal * rate;

  newMsg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
}

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchange();
});

window.addEventListener("load", ()=>{
  updateExchange();
})