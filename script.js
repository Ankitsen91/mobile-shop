/*
 * MobileCare Hub demo.
 * IMPORTANT: Replace WHATSAPP_NUMBER with your business WhatsApp number,
 * including country code, digits only (India example format: 91XXXXXXXXXX).
 */
const WHATSAPP_NUMBER = "91XXXXXXXXXX"; // Replace before launch.
const $ = (selector) => document.querySelector(selector);
const productGrid = $("#productGrid");
const sampleProducts = [
 {id:"p1",title:"Pre-owned Android Smartphone",category:"Used Phones",price:6499,condition:"Used",emoji:"📱",visual:"phone-bg",description:"Example listing for a pre-owned Android phone. Confirm model, storage, battery health, IMEI status and physical condition with the seller.",featured:1},
 {id:"p2",title:"Wireless Bluetooth Earbuds",category:"Audio",price:899,condition:"New",emoji:"🎧",visual:"audio-bg",description:"Compact wireless earbuds for everyday calls and music. Check supported features, warranty and return terms before purchase.",featured:2},
 {id:"p3",title:"USB-C Fast Charging Cable",category:"Accessories",price:249,condition:"New",emoji:"🔌",visual:"accessory-bg",description:"USB-C cable example listing. Confirm cable length, charging speed and compatibility with your charger and phone model.",featured:3},
 {id:"p4",title:"Mobile Charging Port Part",category:"Hardware Parts",price:350,condition:"New",emoji:"⚙️",visual:"parts-bg",description:"Example replacement charging-port component. Match the exact phone model and part number with a qualified technician before ordering.",featured:4},
 {id:"p5",title:"Refurbished 4G Smartphone",category:"Used Phones",price:4299,condition:"Refurbished",emoji:"📲",visual:"phone-bg",description:"Example refurbished device listing. Ask about battery health, repairs performed, warranty, included accessories and return policy.",featured:5},
 {id:"p6",title:"Over-ear Wired Headphones",category:"Audio",price:699,condition:"New",emoji:"🎧",visual:"audio-bg",description:"Everyday wired headphones with an example price. Check connector type, microphone support and compatibility with your device.",featured:6},
 {id:"p7",title:"Phone Back Cover & Screen Guard",category:"Accessories",price:299,condition:"New",emoji:"🛡️",visual:"accessory-bg",description:"Protective accessory bundle example. Select the exact brand and model to ensure the fit is correct.",featured:7},
 {id:"p8",title:"Smartphone Battery Replacement Part",category:"Hardware Parts",price:799,condition:"New",emoji:"🔋",visual:"parts-bg",description:"Example replacement battery listing. Confirm model compatibility, part quality and installation requirements with a repair professional.",featured:8}
];
let products = [...sampleProducts];

function esc(value=""){return String(value).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));}
function rupees(value){return new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(Number(value)||0);}
function toast(message){const t=$("#toast");t.textContent=message;t.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove("show"),3000);}
function getFiltered(){
 const q=$("#search").value.trim().toLowerCase(),cat=$("#category").value,cond=$("#condition").value,sort=$("#sort").value;
 let list=products.filter(p=>{
  const text=[p.title,p.category,p.condition,p.description].join(" ").toLowerCase();
  return (!q||text.includes(q))&&(cat==="all"||p.category===cat)&&(cond==="all"||p.condition===cond);
 });
 if(sort==="low")list.sort((a,b)=>a.price-b.price);
 else if(sort==="high")list.sort((a,b)=>b.price-a.price);
 else list.sort((a,b)=>a.featured-b.featured);
 return list;
}
function render(){
 const list=getFiltered();
 productGrid.innerHTML=list.map(p=>`<article class="product-card">
  <div class="product-visual ${esc(p.visual)}"><span class="condition-badge">${esc(p.condition)}</span><span class="product-emoji" aria-hidden="true">${esc(p.emoji)}</span></div>
  <div class="product-body"><span class="product-category">${esc(p.category)}</span><h3>${esc(p.title)}</h3><p class="product-desc">${esc(p.description)}</p>
  <div class="product-foot"><span class="price">${rupees(p.price)}</span><small>Example price</small></div>
  <button class="btn btn-primary interest-btn" data-interest="${esc(p.id)}">I'm Interested ↗</button></div></article>`).join("");
 $("#empty").classList.toggle("hidden",list.length>0);
 productGrid.classList.toggle("hidden",list.length===0);
}
function openInterest(item, message=""){
 $("#interestItem").value=item;
 $("#interestTitle").textContent=item==="General enquiry"?"Contact MobileCare":`Enquire: ${item}`;
 $("#interestMessage").value=message;
 $("#interestDialog").showModal();
}
function openListing(){$("#listingDialog").showModal();}
function continueWhatsApp(text){
 if(WHATSAPP_NUMBER==="91XXXXXXXXXX"||!/^\d{10,15}$/.test(WHATSAPP_NUMBER)){
  toast("Demo mode: set your WhatsApp number in script.js before using enquiries.");
  const blob=new Blob([text],{type:"text/plain"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a");a.href=url;a.download="mobilecare-enquiry.txt";a.click();URL.revokeObjectURL(url);
  return;
 }
 window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`,"_blank","noopener,noreferrer");
}
$("#searchForm").addEventListener("submit",e=>{e.preventDefault();render();$("#market").scrollIntoView({behavior:"smooth"});});
["search","category","condition","sort"].forEach(id=>$("#"+id).addEventListener(id==="search"?"input":"change",render));
productGrid.addEventListener("click",e=>{const b=e.target.closest("[data-interest]");if(!b)return;const p=products.find(x=>x.id===b.dataset.interest);if(p)openInterest(p.title,`Hello, I'm interested in "${p.title}" (${p.category}). Is it available? Please share the exact model/specifications, final price, condition, warranty/return terms, and pickup or delivery details.`);});
$("#clear").addEventListener("click",()=>{$("#search").value="";$("#category").value="all";$("#condition").value="all";$("#sort").value="featured";render();});
document.querySelectorAll("[data-jump-category]").forEach(a=>a.addEventListener("click",()=>{const wanted=a.dataset.jumpCategory;$("#category").value=wanted;render();}));
document.querySelectorAll("[data-repair]").forEach(b=>b.addEventListener("click",()=>openInterest("Repair: "+b.dataset.repair,`Hello, I need help with a mobile repair. Issue: ${b.dataset.repair}. My phone brand/model is: ____. Please share the estimated cost, repair time, part quality and warranty details.`)));
$("#repairEnquire").addEventListener("click",()=>openInterest("Mobile repair enquiry","Hello, I need a mobile repair. Phone brand/model: ____. Issue: ____. Please share estimated cost and turnaround time."));
$("#headerEnquire").addEventListener("click",()=>openInterest("General enquiry","Hello, I have a question about MobileCare Hub."));
$("#contactOpen").addEventListener("click",()=>openInterest("General enquiry","Hello, I am looking for help with a phone, repair or accessory."));
$("#sellOpen").addEventListener("click",openListing);$("#sellOpen2").addEventListener("click",openListing);
document.querySelectorAll("[data-close]").forEach(b=>b.addEventListener("click",()=>$("#"+b.dataset.close).close()));
$("#interestForm").addEventListener("submit",e=>{
 e.preventDefault();const f=new FormData(e.currentTarget);
 const name=String(f.get("name")||"").trim(),phone=String(f.get("phone")||"").trim(),item=String(f.get("item")||"General enquiry"),message=String(f.get("message")||"").trim();
 const text=`MobileCare Hub enquiry\nName: ${name}\nContact: ${phone||"Not provided"}\nItem/service: ${item}\nMessage: ${message}`;
 $("#interestDialog").close();continueWhatsApp(text);
});
$("#listingForm").addEventListener("submit",e=>{
 e.preventDefault();const f=new FormData(e.currentTarget);
 const text=`MobileCare Hub — New item listing enquiry\nItem: ${String(f.get("title"))}\nCategory: ${String(f.get("category"))}\nExpected price: ₹${String(f.get("price"))}\nCondition: ${String(f.get("condition"))}\nDetails: ${String(f.get("details"))}`;
 $("#listingDialog").close();continueWhatsApp(text);
});
$("#menuToggle").addEventListener("click",()=>{const nav=$("#nav"),open=nav.classList.toggle("open");$("#menuToggle").setAttribute("aria-expanded",String(open));});
$("#nav").addEventListener("click",e=>{if(e.target.closest("a")){$("#nav").classList.remove("open");$("#menuToggle").setAttribute("aria-expanded","false");}});
$("#year").textContent=new Date().getFullYear();
render();
