(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))d(c);new MutationObserver(c=>{for(const s of c)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&d(l)}).observe(document,{childList:!0,subtree:!0});function i(c){const s={};return c.integrity&&(s.integrity=c.integrity),c.referrerPolicy&&(s.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?s.credentials="include":c.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function d(c){if(c.ep)return;c.ep=!0;const s=i(c);fetch(c.href,s)}})();const t=document.querySelectorAll(".roundsCount"),C=document.querySelector("#playerWins"),m=document.querySelector("#playerMove"),f=document.querySelector("#computerMove"),b=document.querySelector("#computerWins"),k=document.querySelectorAll(".move__btn"),h=document.querySelector("#letsPlay");let o=0,u=0,n=0,a=0;function p(){const e=Math.floor(Math.random()*9)+1;let r="";switch(!0){case(e>0&&e<=3):r="rockChoice";break;case(e>3&&e<=6):r="paperChoice";break;case(e>6&&e<=9):r="scissorsChoice";break}return r}function g(e,r){switch(!0){case e===r:console.log("draw game!");break;case(e==="rockChoice"&&r==="paperChoice"):case(e==="paperChoice"&&r==="scissorsChoice"):case(e==="scissorsChoice"&&r==="rockChoice"):a++;break;case(e==="rockChoice"&&r==="scissorsChoice"):case(e==="paperChoice"&&r==="rockChoice"):case(e==="scissorsChoice"&&r==="paperChoice"):n++;break}C.textContent=`${n}`,b.textContent=`${a}`,y(r,"computer"),y(e,"player"),u===o&&(n>a?h.innerHTML=`
      <div class="finally__img"><img src="./src/images/you-win.png"></div>
    `:a>n&&(h.innerHTML=`
      <div class="finally__img"><img src="./src/images/game-over-2.png"></div>
      <div class="finally__img"><img src="./src/images/game-over.png"></div>
    `))}function y(e,r){const i=document.createElement("img");i.classList.add("move__img"),i.src=`./src/images/${e}.png`,r==="player"?(m.innerHTML="",m.appendChild(i)):r==="computer"&&(f.innerHTML="",f.appendChild(i))}k.forEach(e=>{e.addEventListener("click",()=>{o===0?(o=5,u++,g(e.id,p())):(u++,g(e.id,p()))})});t.forEach(e=>{e.addEventListener("click",()=>{switch(!0){case t[0].checked:o=Number(t[0].value);break;case t[1].checked:o=Number(t[1].value);break;case t[2].checked:o=Number(t[2].value);break;case t[3].checked:o=Number(t[3].value);break}})});
