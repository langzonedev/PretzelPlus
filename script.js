const header=document.querySelector('.site-header');
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.site-nav');
if(header) window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>10),{passive:true});
if(toggle&&nav){
 const setOpen=(open,restore=false)=>{nav.classList.toggle('open',open);nav.inert=!open;toggle.setAttribute('aria-expanded',String(open));toggle.querySelector('.sr-only').textContent=open?'Close navigation':'Open navigation';if(restore)toggle.focus();};
 setOpen(false);document.documentElement.classList.add('js-nav');
 toggle.addEventListener('click',()=>setOpen(!nav.classList.contains('open')));
 document.addEventListener('pointerdown',e=>{if(nav.classList.contains('open')&&!nav.contains(e.target)&&!toggle.contains(e.target))setOpen(false,nav.contains(document.activeElement));});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open'))setOpen(false,true);});
 nav.addEventListener('focusout',e=>{if(e.relatedTarget&&!nav.contains(e.relatedTarget)&&e.relatedTarget!==toggle)setOpen(false);});
 window.addEventListener('pageshow',()=>setOpen(false));
}
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const form=document.getElementById('demo-form');if(form)form.addEventListener('submit',e=>e.preventDefault());
const categories=[...document.querySelectorAll('.menu-list-card')];
if(categories.length){const compact=matchMedia('(max-width:620px)');const layout=()=>categories.forEach((item,i)=>item.open=!compact.matches||i===0);layout();compact.addEventListener('change',layout);}
