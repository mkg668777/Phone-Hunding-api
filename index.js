const searchInput = document.querySelector("input");
const searchBtn = document.querySelector("#searchBtn");
// const phnInfo = document.querySelector(".phnInfo");
const footerDiv = document.querySelector(".footer");

const phnImgDiv = document.querySelector(".phnImgDiv");
const phnDetailsDiv = document.querySelector(".phnDetailsDiv");


const API = "https://openapi.programming-hero.com/api/phones?search="  ;
const DETAILS_API = "https://openapi.programming-hero.com/api/phone/";

searchBtn.addEventListener("click", searchPhone);

 async function searchPhone(){
     const search = searchInput.value.trim();

   if(search === ""){
    alert("Please Enter a Phone Name");
    return;
   }

   const API_URL = API + encodeURIComponent(search) ;
   
    fetchPhoneAPI(API_URL);
}

async function fetchPhoneAPI(API_URL){
try{
    const response = await fetch(API_URL);
    const data = await response.json();
    // console.log(data.data);

     displayPhone(data.data);
   }
   catch(error){
    console.error("Error calling API:" , error);
   }
  
}

 function displayPhone(phone){
    phnImgDiv.innerHTML = "";

    const fragment = document.createDocumentFragment();
   
    phone.forEach((obj) =>{
       const parent = document.createElement("div");
       const phnImage = document.createElement("img");
       const phoneName = document.createElement("h2");
       const phnDetails = document.createElement("p");
       const showDetails = document.createElement("button");

       parent.classList.add("parent");
       phnImage.classList.add("image");
       phoneName.classList.add("phoneName");
       phnDetails.classList.add("phnDetails");
       showDetails.classList.add("showDetails");

       phnDetails.innerText ="There are many variations of passages of available but the majority have suffered ";
       showDetails.innerText = "Show Details";
       phnImage.src = obj.image;
       phoneName.innerText = obj.phone_name;
       showDetails.setAttribute("data-slug" , obj.slug);

       showDetails.addEventListener("click", ()=>{
        fetchPhoneDetails(obj.slug);
       });

       parent.append(phnImage , phoneName , phnDetails , showDetails);
       fragment.append(parent);
       
});
    
     phnImgDiv.append(fragment);


     }


 

 async function fetchPhoneDetails(slug){
    const Details_URL = DETAILS_API + slug;

    try{
        const response = await fetch(Details_URL);
        const result = await response.json();

        console.log(result.data);
        showPhnDetails(result.data);
    }catch(error){
        alert("Phone details not available.");
        // console.log(error);
    }

 }


 function showPhnDetails(phone){
    phnDetailsDiv.innerHTML = "";
 
//  phone.forEach((obj) =>{
  const detailsContainer = document.createElement("div");
  const closeBtn = document.createElement("closeBtn");
 
  
  detailsContainer.classList.add("detailsContainer");
  closeBtn.classList.add("closeBtn");

  closeBtn.innerText = "Close";
  
  closeBtn.addEventListener("click", ()=>{
    detailsContainer.remove();
  });
 

  detailsContainer.innerHTML = `
  <img src= ${phone.image} alt=${phone.name}>
   <h2>${phone.name}</h2>
   <p>Brand: ${phone.brand}</p>
   <p>storage: ${phone.mainFeatures.storage}</p>
   <p>displaysize: ${phone.mainFeatures.displaySize}</p>
   <p>chipSet: ${phone.mainFeatures.chipSet}</p>
   <p>memory: ${phone.mainFeatures.memory}</p>
   <p> ${phone.releaseDate}</p>` ;


   detailsContainer.append(closeBtn);

    phnDetailsDiv.appendChild(detailsContainer);


 }