const initial=[
 {name:"Dashboard ผู้ป่วยนอก (OPD)",dept:"กลุ่มงานผู้ป่วยนอก",cat:"คลินิก",icon:"♙",url:"#"},
 {name:"Dashboard ผู้ป่วยใน (IPD)",dept:"กลุ่มงานผู้ป่วยใน",cat:"คลินิก",icon:"▣",url:"#"},
 {name:"Dashboard ห้องฉุกเฉิน",dept:"งานอุบัติเหตุและฉุกเฉิน",cat:"คลินิก",icon:"✚",url:"#"},
 {name:"Dashboard ห้องยา",dept:"กลุ่มงานเภสัชกรรม",cat:"สนับสนุน",icon:"⚕",url:"#"},
 {name:"Dashboard ห้องปฏิบัติการ",dept:"กลุ่มงานเทคนิคการแพทย์",cat:"สนับสนุน",icon:"⌬",url:"#"},
 {name:"Dashboard การเงิน",dept:"กลุ่มงานการเงิน",cat:"บริหาร",icon:"฿",url:"#"},
 {name:"Dashboard บุคลากร",dept:"งานทรัพยากรบุคคล",cat:"บริหาร",icon:"♟",url:"#"},
 {name:"Dashboard คุณภาพโรงพยาบาล",dept:"ศูนย์คุณภาพ",cat:"คุณภาพ",icon:"✓",url:"#"},
 {name:"Dashboard ความเสี่ยง",dept:"หน่วยบริหารความเสี่ยง",cat:"คุณภาพ",icon:"!",url:"#"},
 {name:"Dashboard ควบคุมการติดเชื้อ",dept:"งานป้องกันและควบคุมการติดเชื้อ",cat:"คุณภาพ",icon:"◎",url:"#"},
 {name:"Dashboard คลังพัสดุ",dept:"งานพัสดุ",cat:"สนับสนุน",icon:"▤",url:"#"},
 {name:"Dashboard ผู้บริหาร",dept:"กลุ่มงานบริหาร",cat:"บริหาร",icon:"◆",url:"#"}
];
let data=JSON.parse(localStorage.getItem("hospitalDashboards")||"null")||initial;
let fav=JSON.parse(localStorage.getItem("hospitalFav")||"[]");

function render(){
 const q=document.getElementById("search").value.toLowerCase();
 const c=document.getElementById("category").value;
 const filtered=data.filter(x=>(x.name+" "+x.dept).toLowerCase().includes(q)&&(c==="all"||x.cat===c));
 document.getElementById("total").textContent=data.length;
 document.getElementById("grid").innerHTML=filtered.map((x,i)=>card(x)).join("")||'<div class="empty">ไม่พบ Dashboard ที่ค้นหา</div>';
 document.getElementById("favGrid").innerHTML=fav.length?fav.map(n=>{let x=data.find(y=>y.name===n);return x?card(x):""}).join(""):'<div class="empty">กด ★ บนการ์ดเพื่อเพิ่มรายการโปรด</div>';
}
function card(x){let on=fav.includes(x.name);return `<article class="dash-card"><div class="card-top"><div class="dept-icon">${x.icon}</div><button class="star ${on?"on":""}" onclick="toggleFav('${esc(x.name)}')">★</button></div><h3>${esc(x.name)}</h3><div class="dept">${esc(x.dept)}</div><div class="tags"><span class="tag">${esc(x.cat)}</span><span class="tag">Dashboard</span></div><a class="open" href="${esc(x.url)}" target="_blank">เปิด Dashboard →</a></article>`}
function esc(s){return String(s).replaceAll("&","&amp;").replaceAll("'","&#39;").replaceAll('"',"&quot;").replaceAll("<","&lt;")}
function toggleFav(n){fav=fav.includes(n)?fav.filter(x=>x!==n):[...fav,n];localStorage.setItem("hospitalFav",JSON.stringify(fav));render()}
function showModal(){document.getElementById("modal").classList.add("show")}
function hideModal(){document.getElementById("modal").classList.remove("show")}
function addDashboard(){let n=document.getElementById("newName").value.trim(),d=document.getElementById("newDept").value.trim(),c=document.getElementById("newCat").value,u=document.getElementById("newUrl").value.trim()||"#";if(!n||!d)return alert("กรุณากรอกชื่อ Dashboard และหน่วยงาน");data.push({name:n,dept:d,cat:c,icon:"▦",url:u});localStorage.setItem("hospitalDashboards",JSON.stringify(data));hideModal();document.getElementById("newName").value="";document.getElementById("newDept").value="";document.getElementById("newUrl").value="";render()}
document.getElementById("search").addEventListener("input",render);document.getElementById("category").addEventListener("change",render);render();
