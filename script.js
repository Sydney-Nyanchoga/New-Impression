'use strict';
// PERSONALIZE HERE. Empty names make the note work beautifully without placeholders.
const config = {
  herName: '',
  myName: '',
  animationSpeed: 1, // 0.7 = faster, 1.4 = slower
  finalQuestion: 'Will you let me take you out?',
  apology: ["I’m sorry for the way I came across.", "And I don’t want that to be the version of me you remember."],
  yesResponse: ['Let’s goooo!!🥳🤩.', 'Have an amazing day today😘.', 'And I’m really hoping to see you soon.'],
  noResponse: ['But thank you for hearing me out.', 'I still mean the apology.😘']
};
const scenes = [
 {label:'A small beginning',title:'Heyy Munzuu😃…',lines:["So I was working yesterday and you came across my mind again..","And I figured texting it wasn’t enough, So I made you this😚"],mark:'dot'},
 {title:'Wait.<br>This needs a <em>soundtrack.</em>',lines:['Tap the music button up there.','I even brought background music. Very prepared of me😝Right?.'],musicPrompt:true,actions:[['Okay, carry on','next']]},
 {label:'01 / A little self-awareness',title:'So we met.<br>Okay rather, I met <em>you.</em>',lines:['And unfortunately…','You got a really bad first impression of me at the end😔.','My bad for real.'],aside:true},
 {label:'02 / In retrospect',title:'Not my<br><em>finest moment.</em>',lines:["I know I didn’t exactly make the best first impression.","And honestly… I did think about it and...","Because you’re someone I actually wanted to impress."],after:'And I definitely didn’t help myself that day.😭'},
 {label:'03 / A second chapter',title:'But then…<br>We met <em>again</em> last Friday🍾',lines:["And I’m really glad we did.",'And I promised that I would make it up to you…',"but before we get into that."],mood:'warm'},
 {label:'04 / What I came here to say',title:'I’m <em>sorry.💜</em>',lines:config.apology,mood:'quiet',mark:'—'},
 {label:'05 / The honest part',title:'So far, I’ve liked talking<br>to <em>you.</em>',lines:["I’m not saying this just because I want to fix things.",'You’re like so fun to hangout with😝.',"And I’m genuinely interested in getting to know you.😊 I'd want to talk to you alittle more"],mood:'warm'},
 {label:'06 / A small confession',title:'Maybe more<br>than <em>a little.🙂</em>',lines:["I’d be lying if I said I wasn’t a little attracted to you.",'Okay. Maybe more than a little also.',"But that’s a conversation for another day."],aside:true},
 {label:'07 / A fresh start',title:'Can I make<br>it up to <em>you?</em>',lines:['Properly this time.👉👈'],actions:[['Let me try again →','next']],mood:'warm'},
 {label:'08 / One last thing',title:config.finalQuestion,lines:['I owe you more than an apology.','I owe you a better first impression.'],actions:[['Yes','yes'],['Obviously','yes'],['No, thank you','no']],mood:'warm',question:true}
];
const sceneEl=document.getElementById('scene'), nextButton=document.getElementById('continue');
const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let current=0, token=0, timers=[], transitioning=false, revealed=false, reflection=false, ending=false;
function schedule(fn,ms){const id=setTimeout(fn,ms*config.animationSpeed);timers.push(id);return id;}
function cancelTimers(){timers.forEach(clearTimeout);timers=[];token++;}
function fadeIn(el){el.classList.add('visible');} function fadeOut(el){el.classList.remove('visible');}
function showText(el){fadeIn(el);} function hideText(el){fadeOut(el);} function typeText(el){showText(el);}
function element(tag,cls,text){const el=document.createElement(tag);el.className=cls;if(text)el.textContent=text;return el;}
function revealAll(){cancelTimers();sceneEl.querySelectorAll('.reveal').forEach(showText);revealed=true;updateHint();}
function updateHint(){updateNavigation();nextButton.disabled=ending||Boolean(scenes[current]?.actions);nextButton.innerHTML=(!revealed?'Tap to reveal':current===0?'Tap anywhere to continue':'Tap to continue')+' <span>↓</span>';}
function renderScene(){
 document.getElementById('celebration').replaceChildren();const s=scenes[current];ending=false;reflection=false;revealed=false;sceneEl.classList.remove('closing');sceneEl.replaceChildren();document.body.dataset.mood=s.mood||'';document.body.dataset.scene=String(current);document.body.dataset.palette=['plum','blue','rose','lavender','peach','plum','blue','rose','peach','pink'][current];document.body.classList.toggle('music-prompt',Boolean(s.musicPrompt));
 if(s.mark==='dot')sceneEl.append(element('span','dot'));else sceneEl.append(element('div','mark',s.mark||'✧'));

 const title=element('h1','reveal');if(s.question)title.textContent=s.title;else title.innerHTML=s.title;
 if(!s.question)sceneEl.append(title);
 s.lines.forEach((line,i)=>sceneEl.append(element('p','line reveal'+(s.aside&&i===1?' aside':''),line)));
 if(s.question)sceneEl.append(title);
 if(s.musicPrompt){sceneEl.append(element('div','music-cue reveal','↗'));}
 if(s.actions){const actions=element('div','actions reveal');s.actions.forEach(([text,action],i)=>{const b=element('button','choice '+(action==='no'?'decline':i===0?'primary':''),text);b.addEventListener('click',e=>{e.stopPropagation();if(transitioning)return;action==='next'?nextScene():respond(action);});if(action==='no')addPlayfulDodge(b);actions.append(b);});sceneEl.append(actions);}
 const items=[...sceneEl.querySelectorAll('.reveal')];items.forEach((el,i)=>schedule(()=>showText(el),reduced?0:(current===0?1700:150)+i*650));
 schedule(()=>{revealed=true;updateHint();},reduced?0:(current===0?1700:150)+items.length*650);
 document.getElementById('progress').replaceChildren(...Array.from({length:scenes.length+1},(_,i)=>{const p=element('i',i===current?'current':i<current?'done':'');p.setAttribute('aria-hidden','true');return p;}));
 document.getElementById('progress').setAttribute('aria-label',`Scene ${current+1} of ${scenes.length+1}`);updateHint();
}
function transitionScene(fn,direction='forward'){document.body.dataset.direction=direction;if(transitioning)return;transitioning=true;cancelTimers();sceneEl.classList.add('leaving');schedule(()=>{fn();sceneEl.classList.remove('leaving');schedule(()=>{transitioning=false;},reduced?120:450);},reduced?120:500);}
function nextScene(){if(ending||transitioning)return;transitionScene(()=>{current=Math.min(current+1,scenes.length-1);renderScene();});}
function advance(){if(transitioning||ending)return;if(!revealed){revealAll();return;}if(scenes[current].actions)return;if(scenes[current].after&&!reflection){transitionScene(()=>{reflection=true;sceneEl.replaceChildren(element('h1','',scenes[current].after));});return;}nextScene();}
function respond(answer){transitionScene(()=>{ending=true;updateNavigation();document.body.dataset.mood=answer==='yes'?'yes':'quiet';sceneEl.replaceChildren();sceneEl.append(element('div','heart',answer==='yes'?'♡':'—'));const copy=element('div','ending-copy');copy.append(element('h1','',answer==='yes'?'I was hoping you’d say that.':'Fair enough.'));(answer==='yes'?config.yesResponse:config.noResponse).forEach(x=>copy.append(element('p','line',x)));if(answer==='yes')copy.append(element('p','note','Tell me what you think :)'));sceneEl.append(copy);nextButton.disabled=true;document.querySelectorAll('#progress i').forEach((x,i)=>x.className=i===scenes.length?'current':'done');document.getElementById('progress').setAttribute('aria-label',`Scene ${scenes.length+1} of ${scenes.length+1}`);const replay=element('button','choice','Replay');replay.addEventListener('click',e=>{e.stopPropagation();restart();});copy.append(replay);if(answer==='yes')celebrate();});}
function restart(){if(transitioning)return;transitionScene(()=>{current=0;renderScene();});}
nextButton.addEventListener('click',advance);document.getElementById('restart').addEventListener('click',restart);
let touchOrigin=null;
const storySurface=document.getElementById('story');
storySurface.addEventListener('pointerdown',e=>{if(!e.target.closest('button'))touchOrigin={x:e.clientX,y:e.clientY,id:e.pointerId};});
storySurface.addEventListener('pointercancel',()=>{touchOrigin=null;});
storySurface.addEventListener('pointerup',e=>{
 if(e.target.closest('button'))return;
 const start=touchOrigin;touchOrigin=null;
 if(start&&start.id===e.pointerId){const dx=e.clientX-start.x,dy=e.clientY-start.y;
  if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.4){dx>0?previousScene():advance();return;}
  if(Math.abs(dy)>35)return;
 }
 advance();
});
document.addEventListener('keydown',e=>{if(e.key==='ArrowLeft'&&!e.target.closest('button')){e.preventDefault();if(!e.repeat)previousScene();return;}if((e.key===' '||e.key==='Enter'||e.key==='ArrowRight')&&!e.target.closest('button')){e.preventDefault();if(!e.repeat)advance();}});
if(config.herName)document.getElementById('dedication').textContent=`A LITTLE NOTE FOR ${config.herName.toUpperCase()}`;
document.getElementById('signature').textContent='For Munzuu ❤️💜';
document.documentElement.style.setProperty('--duration',`${650*config.animationSpeed}ms`);
for(let i=0;i<14;i++){const p=element('i','particle');p.style.cssText=`--x:${(i*37+11)%100}%;--y:${(i*23+7)%100}%;--t:${5+i%5}s;--delay:-${i*.7}s`;document.getElementById('particles').append(p);}renderScene();

// User-provided soundtrack. Playback requires a tap.
const soundtrack=new Audio('assets/white-ferrari.mp3');
soundtrack.loop=true;soundtrack.volume=.5;soundtrack.preload='none';
let musicOn=false,musicBusy=false;
const musicButton=document.getElementById('music');
async function toggleMusic(){
 if(musicBusy)return;musicBusy=true;
 try{
  if(musicOn){soundtrack.pause();musicOn=false;}
  else{await soundtrack.play();musicOn=true;}
  musicButton.textContent=musicOn?'♫ Music on':'♫ Music off';musicButton.setAttribute('aria-pressed',String(musicOn));
  document.body.classList.toggle('music-playing',musicOn);
 }catch{musicButton.textContent='♫ Tap to retry';}
 finally{musicBusy=false;}
}
musicButton.addEventListener('click',toggleMusic);
document.addEventListener('visibilitychange',()=>{if(document.hidden){soundtrack.pause();musicOn=false;musicButton.textContent='♫ Music off';musicButton.setAttribute('aria-pressed','false');document.body.classList.remove('music-playing');}});
function addPlayfulDodge(button){
 let side=1;
 function dodge(e){
  e.preventDefault();e.stopPropagation();
  if(transitioning||!revealed)return;
  side*=-1;
  button.style.transform=`translateX(${side*55}px)`;
 }
 button.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')dodge(e);});
 button.addEventListener('pointerdown',dodge);
 button.addEventListener('click',e=>{
  // Keyboard / assistive activation remains available. Pointer attempts never submit.
  if(e.detail!==0){e.preventDefault();e.stopImmediatePropagation();dodge(e);}
 },true);
}
function celebrate(){
 const layer=document.getElementById('celebration');layer.replaceChildren();
 const colors=['#ff4085','#f9b51b','#8851ed','#23bdb2','#ff7659','#ffffff'];
 for(let i=0;i<(reduced?24:86);i++){
  const piece=element('i','confetti');piece.style.cssText=`--left:${(i*43)%100}%;--delay:${(i%13)*.065}s;--fall:${3+(i%7)*.28}s;--spin:${180+(i%5)*120}deg;--sway:${(i%2?1:-1)*(20+i%60)}px;background:${colors[i%colors.length]};border-radius:${i%3===0?'50%':'2px'}`;layer.append(piece);
 }
 if(!reduced)schedule(()=>layer.replaceChildren(),6500);
}

function updateNavigation(){
 document.getElementById('previous').disabled=current===0&&!ending;
 document.getElementById('forward').disabled=ending||Boolean(scenes[current]?.actions);
}
function previousScene(){
 if(transitioning||(!ending&&current===0))return;
 transitionScene(()=>{if(!ending)current--;renderScene();},'back');
}
document.getElementById('previous').addEventListener('click',previousScene);
document.getElementById('forward').addEventListener('click',advance);
