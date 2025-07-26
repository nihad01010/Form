const next = document.getElementById('next1');
const Name = document.getElementById('name');
const email = document.getElementById('email');
const number = document.getElementById('number');
const form1 = document.querySelector('.form1');
const form2 = document.querySelector('.form2');
const step = document.querySelector('.step');
const plan1 = document.getElementById('plan1');
const plan2 = document.getElementById('plan2');
const plan3 = document.getElementById('plan3');
const slider = document.getElementById('slideCheck')
const priceText = document.getElementById('arcPrice');
const advPrice = document.getElementById('advPrice');
const plans = document.querySelectorAll('.plan1');
const backBtn2 = document.getElementById('backBtn2');
const nextBtn3 = document.getElementById('nextBtn3');
const form4 = document.querySelector('.form4');
const nextBtn = document.querySelectorAll('.nextBtn');
const endPage = document.querySelector('.thankPage');
const planBackBtn = document.getElementById('back');
const planNextBtn = document.getElementById('next2');
const form3 = document.querySelector('.form3');
const money = document.querySelectorAll('.price');
const resultPrice = document.getElementById('price');
const planName = document.getElementById('selectedPlanName')
const img = document.querySelector('.step-image')

let isYearly = false;
 document.addEventListener('DOMContentLoaded',()=>{
    nextPages()
 })
 document.addEventListener('DOMContentLoaded',() =>[
    backPages()
 ])
slider.addEventListener('click', () => {
  isYearly = !isYearly;
  plans.forEach(plan =>{
     if (isYearly) {
    priceText.textContent = "$90/yr";
    advPrice.textContent= "$120/yr";
    proPrice.textContent ="$150/yr";
    
   
   
    // Əvvəlcədən əlavə olunubsa, yenidən əlavə etmə
    if (!plan.querySelector(".free-note")) {
      const freeText = document.createElement('p');
      freeText.textContent = '2 Months Free';
      freeText.className = 'free-note';
      plan.appendChild(freeText);
      freeText.style.fontSize = "13px" 
    }
  } else {
    priceText.textContent = "$9/mo";
    advPrice.textContent = "$12/mo";
    proPrice.textContent = "$15/mo";

    // Əlavə olunmuş 'free-note' varsa, sil
    const note = plan.querySelector(".free-note");
    if (note) note.remove();
  }
  updatePrices();
  calculateTotal()
  })
  
  })
  let selectedPlanName = "";
  let selectedPlanPrice = "";
plans.forEach(plan =>{
    plan.addEventListener('click',() =>{
        plans.forEach(p => p.classList.remove('selected'))
        plan.classList.add('selected');

        selectedPlanName = plan.querySelector('h5').textContent;
        selectedPlanPrice = plan.querySelector('.price').textContent;

       calculateTotal();

    })
})
const nextPages = () =>{
   nextBtn.forEach(nextPage =>{
    nextPage.addEventListener('click',()=>{
        if(nextPage.id === 'next1'){
       if(number.value === "" || Name.value === ""|| email.value === ""){
        return alert('Fill in all the blanks.')
      }else{
       form1.style.display = "none";
       form2.style.display = "block";
       
      }   
    }else if(nextPage.id === 'next2'){
        form2.style.display = "none";
        form3.style.display = "block";
    }else if(nextPage.id === 'nextBtn3'){
        form3.style.display = "none";
        form4.style.display = "flex";
        if(isYearly){
        priceText.textContent = "$90/yr";
        advPrice.textContent= "$120/yr";
        proPrice.textContent ="$150/yr";
        }else{
         priceText.textContent = "$9/mo";
         advPrice.textContent = "$12/mo";
         proPrice.textContent = "$15/mo";
        }
         resultPrice.textContent = selectedPlanPrice;
        planName.textContent =  selectedPlanName;
        totalPrice.textContent = "";
        totalPrice.textContent = selectedPlanPrice;   
        calculateTotal()
    }else{
        form4.style.display = "none";
        endPage.style.display = "block";
        
    }
    })
   })
}
const backBtn = document.querySelectorAll('.backBtn')
const backPages = () =>{
   backBtn.forEach(backPage =>{
    backPage.addEventListener('click',() =>{
       if(backPage.id ==='back'){
        form2.style.display = "none";
        form1.style.display = "block";
    }else if(backPage.id === 'backBtn2'){
        form2.style.display = "block";
        form3.style.display = "none";
    }else{
        form4.style.display = "none";
        form3.style.display = "block";
    }
    })
   })
}


document.getElementById("slideCheck").addEventListener("change", (e) => {
    isYearly = e.target.checked;
    updatePrices();
    calculateTotal();
});

function updatePrices() {
    const arcade = document.getElementById("arcPrice");
    const advanced = document.getElementById("advPrice");
    const pro = document.getElementById("proPrice");
    const pickPrices = document.querySelectorAll(".pickPrice");

    if (isYearly) {
        arcade.textContent = "$90/yr";
        advanced.textContent = "$120/yr";
        pro.textContent = "$150/yr";
        pickPrices[0].textContent = "+$10/yr";
        pickPrices[1].textContent = "+$20/yr";
        pickPrices[2].textContent = "+$20/yr";
    } else {
        arcade.textContent = "$9/mo";
        advanced.textContent = "$12/mo";
        pro.textContent = "$15/mo";
        pickPrices[0].textContent = "+$1/mo";
        pickPrices[1].textContent = "+$2/mo";
        pickPrices[2].textContent = "+$2/mo";
    }
}

// Plan seçimi
document.querySelectorAll(".plan1").forEach(plan => {
    plan.addEventListener("click", () => {
        document.querySelectorAll(".plan1").forEach(p => p.classList.remove("active"));
        plan.classList.add("active");

        const priceElement = plan.querySelector(".price");
        selectedPlanPrice = priceElement.textContent;

        // Form4-ə yansıt
        const selectedPlanName = plan.querySelector("h5").textContent;
        document.getElementById("selectedPlanName").textContent = `${selectedPlanName} (${isYearly ? "Yearly" : "Monthly"})`;
        document.getElementById("price").textContent = selectedPlanPrice;

        calculateTotal();
    });
});

// Əlavə inputlar dəyişdikdə total hesablansın
document.querySelectorAll(".pickInput").forEach(cb => {
    cb.addEventListener("change", calculateTotal);
});

// Total qiymət hesablanması
function calculateTotal() {
    let total = getPlanPrice();

    const checkboxes = document.querySelectorAll('.pickInput');
    const prices = document.querySelectorAll('.pickPrice');

    checkboxes.forEach((cb, i) => {
        if (cb.checked) {
            const priceText = prices[i].textContent.match(/\d+/);
            if (priceText) {
                total += parseInt(priceText[0]);
            }
        }
    });

    const totalPrice = document.getElementById("totalPrice");
    totalPrice.textContent = `+$${total}${isYearly ? "/yr" : "/mo"}`;
}

function getPlanPrice() {
    const match = selectedPlanPrice.match(/\d+/);
    return match ? parseInt(match[0]) : 0;
}
