const header=document.querySelector('.site-header');
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.site-nav');
if(header) window.addEventListener('scroll',()=>header.classList.toggle('scrolled',window.scrollY>10),{passive:true});
if(toggle&&nav){const setOpen=open=>{nav.classList.toggle('open',open);toggle.setAttribute('aria-expanded',String(open));toggle.querySelector('.sr-only').textContent=open?'Close menu':'Open menu';};toggle.addEventListener('click',()=>setOpen(!nav.classList.contains('open')));nav.addEventListener('click',e=>{if(e.target.closest('a'))setOpen(false);});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){setOpen(false);toggle.focus();}});document.documentElement.classList.add('js-nav');}
const year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
const form=document.getElementById('demo-form');if(form)form.addEventListener('submit',e=>e.preventDefault());
