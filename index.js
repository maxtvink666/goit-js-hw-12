import{a as b,i as a,S as y}from"./assets/vendor-F1LeQrrD.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const u of n.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&r(u)}).observe(document,{childList:!0,subtree:!0});function i(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerPolicy&&(n.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?n.credentials="include":o.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(o){if(o.ep)return;o.ep=!0;const n=i(o);fetch(o.href,n)}})();const C="54674078-cc29e36c5df6708fa2caeef42";async function p(e,t,i){const r={key:C,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:i};try{return(await b({method:"get",url:"https://pixabay.com/api/",params:r})).data}catch(o){throw a.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"}),o}}const M=y.default||y;let m;function S(e){const t=document.querySelector(".gallery"),i=e.map(r=>`<li class="photo-card">
            <a href="${r.largeImageURL}">
                <img src="${r.webformatURL}" alt="${r.tags.split(",").slice(0,3).join(", ")}"/>
            </a>
            <div class="info">
            <div class="info-item">
                <p class="info-item">
                    <b>Likes</b>${r.likes}
                </p>
                </div>
                <div class="info-item">
                <p class="info-item">
                    <b>Views</b>${r.views}
                </p>
                </div>
                <div class="info-item">
                <p class="info-item">
                    <b>Comments</b>${r.comments}
                </p>
                </div>
                <div class="info-item">
                <p class="info-item">
                    <b>Downloads</b>${r.downloads}
                </p>
                </div>
            </div>
        </li>`).join("");t.insertAdjacentHTML("beforeend",i),m?m.refresh():m=new M(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,closeText:"×",navText:["←","→"]})}function h(){const e=document.querySelector(".gallery");e.innerHTML=""}function L(){document.querySelector(".loader").classList.remove("hidden")}function f(){document.querySelector(".loader").classList.add("hidden")}function x(){document.querySelector(".load-more").classList.remove("hidden")}function d(){document.querySelector(".load-more").classList.add("hidden")}function q(e,t){const i=document.querySelector(".img-total");return t+=e.hits.length,i.textContent=`Total images: ${t}/${e.totalHits}`,e.totalHits===t?(d(),a.info({title:"Info",position:"topRight",message:"Sorry, it is all images we have"})):x(),t}const v=document.querySelector(".form"),g=document.querySelector(".js-search-query"),P=document.querySelector(".load-more"),T=document.querySelector(".img-total");let s="",l=1,w=15,c=0;v.addEventListener("submit",B);P.addEventListener("click",I);async function B(e){if(e.preventDefault(),h(),L(),d(),s=e.currentTarget.searchText.value.trim(),c=0,l=1,v.reset(),s===""){a.warning({title:"warning",position:"topRight",message:"Please enter a search query!"}),T.textContent="",g.textContent="Search query :",h(),d(),f();return}g.textContent=`Search query : "${s}"`;try{const t=await p(s,l,w);t.hits.length===0?(a.info({title:"Info",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),d()):(S(t.hits),c=q(t,c))}catch(t){console.log(t),a.error({title:"Error",position:"topRight",message:"Sorry, something went wrong. Please try again!"})}finally{f(),l+=1}}async function I(){L();try{const e=await p(s,l,w);S(e.hits),c=q(e,c),l+=1;const t=document.querySelector(".gallery").firstElementChild;if(t){const{height:i}=t.getBoundingClientRect();window.scrollBy({top:i*2,behavior:"smooth"})}}catch{a.error({title:"Error",position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"})}finally{f()}}
//# sourceMappingURL=index.js.map
