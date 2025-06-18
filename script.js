// --- IMPORTACIONES DE FIREBASE ---
import { initializeApp, setLogLevel } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getFirestore, doc, setDoc, onSnapshot, collection } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";

// Activa logging detallado si lo deseas
setLogLevel('debug');

// --- CONFIGURACIÓN DE FIREBASE ---
const firebaseConfig = {
  apiKey: "AIzaSyB0djqHeWvNLjWiBkNKMVz_SKbN2ulGcxY",
  authDomain: "checklist2025b1.firebaseapp.com",
  projectId: "checklist2025b1",
  storageBucket: "checklist2025b1.firebasestorage.app",
  messagingSenderId: "331478836194",
  appId: "1:331478836194:web:aee9b62b753da0ba940fbb",
  measurementId: "G-T6S0GQ4P4Z"
};

// --- INICIALIZACIÓN DE FIREBASE ---
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// --- ESTRUCTURA DEL PROGRAMA Y CHECKLIST ---
const programa = [
  { sesion: "Viernes Mañana", participantes: [
      { rol: "Presidente", nombre: "David Castro", hora: "9:30" },
      { rol: "Oración", nombre: "Francisco José Sánchez" },
      { rol: "Discursante", nombre: "Julián Lasheras ¿Qué es la adoración pura?", hora: "9:40", numero: 1 },
      { rol: "Video", nombre: "PRODUCCIÓN AUDIOVISUAL: Las buenas noticias según Jesús (Episodio 1).", hora: "10:10", numero: 2 },
      { rol: "Discursante", nombre: "Domingo Tarrasón", hora: "10:50", numero: 3 },
      { rol: "Discursante", nombre: "Pedro Medina", hora: "11:11", numero: 4 },
      { rol: "Discursante", nombre: "Daniel Velasco", hora: "11:28", numero: 5 },
      { rol: "Discursante", nombre: "Álex Botella", hora: "11:45", numero: 6 }
    ]
  },
  { sesion: "Viernes Tarde", participantes: [
      { rol: "Presidente", nombre: "Eduardo Ayala" },
      { rol: "Discursante", nombre: "Miguel Solé", hora: "13:50", numero: 7 },
      { rol: "Discursante", nombre: "David Aleixandri", hora: "14:06", numero: 8 },
      { rol: "Discursante", nombre: "David Maldonado", hora: "14:22", numero: 9 },
      { rol: "Discursante", nombre: "Juan Martín Prior", hora: "14:36", numero: 10 },
      { rol: "Discursante", nombre: "Elliot Miguel", hora: "15:00", numero: 11 },
      { rol: "Discursante", nombre: "José Bonet", hora: "15:12", numero: 12 },
      { rol: "Discursante", nombre: "Santiago Cardona", hora: "15:21", numero: 13 },
      { rol: "Discursante", nombre: "Israel Malla", hora: "15:30", numero: 14 },
      { rol: "Discursante", nombre: "Bárbaro Yuliexi Tejera Rios", hora: "15:39", numero: 15 },
      { rol: "Discursante", nombre: "Rafael Corral", hora: "15:48", numero: 16 },
      { rol: "Discursante", nombre: "Michel Gottardo", hora: "15:58", numero: 17 },
      { rol: "Discursante", nombre: "Andres Mayor (Betel)", hora: "16:10", numero: 18 },
      { rol: "Oración Final", nombre: "Pedro Mora" }
    ]
  },
  { sesion: "Sábado Mañana", participantes: [
      { rol: "Presidente", nombre: "Abel Reguant" },
      { rol: "Oración", nombre: "Ricardo Cordovilla" },
      { rol: "Video", nombre: "PRODUCCIÓN AUDIOVISUAL:¿Qué buscan?", hora: "9:40", numero: 19 },
      { rol: "Video", nombre: "PRODUCCIÓN AUDIOVISUAL:Las buenas noticias según Jesús (Episodio 2).", hora: "9:50", numero: 20 },
      { rol: "Discursante", nombre: "Gabriel Quintana", hora: "10:30", numero: 21 },
      { rol: "Discursante", nombre: "Manuel Casino", hora: "10:40", numero: 22 },
      { rol: "Discursante", nombre: "Esteban Martín", hora: "10:49", numero: 23 },
      { rol: "Discursante", nombre: "Kevin Adiel Cobo (BTL)", hora: "10:59", numero: 24 },
      { rol: "Discursante", nombre: "Rubén Verdés", hora: "11:09", numero: 25 },
      { rol: "Discursante", nombre: "David Mercader", hora: "11:17", numero: 26 },
      { rol: "Discursante", nombre: "Daniel Sellares", hora: "11:25", numero: 27 },
      { rol: "Discursante", nombre: "Natán Becerril", hora: "11:34", numero: 28 }
    ]
  },
  { sesion: "Sábado Tarde", participantes: [
      { rol: "Presidente", nombre: "Climent Ambrós" },
      { rol: "Discursante", nombre: "Jonatán Vicente", hora: "13:50", numero: 29 },
      { rol: "Discursante", nombre: "Santiago Sáez", hora: "14:00", numero: 30 },
      { rol: "Discursante", nombre: "Ricardo Anguita", hora: "14:09", numero: 31 },
      { rol: "Discursante", nombre: "Josué Rabaneda", hora: "14:20", numero: 32 },
      { rol: "Discursante", nombre: "Edgar Teruel (BTL)", hora: "14:45", numero: 33 },
      { rol: "Discursante", nombre: "Álvaro Paniagua", hora: "14:56", numero: 34 },
      { rol: "Discursante", nombre: "Adolfo Forniels", hora: "15:06", numero: 35 },
      { rol: "Discursante", nombre: "Alfonso Guerrero", hora: "15:30", numero: 36 },
      { rol: "Discursante", nombre: "Andres Mayor (Betel)", hora: "16:00", numero: 37 },
      { rol: "Oración Final", nombre: "Jairo José Galán" }
    ]
  },
  { sesion: "Domingo Mañana", participantes: [
      { rol: "Presidente", nombre: "Juan Alcaraz" },
      { rol: "Oración", nombre: "José Diego" },
      { rol: "Discursante", nombre: "Isaac Díaz", hora: "9:40", numero: 38 },
      { rol: "Discursante", nombre: "Benjamín Ferrer", hora: "9:55", numero: 39 },
      { rol: "Discursante", nombre: "Francisco Javier Vila", hora: "10:07", numero: 40 },
      { rol: "Discursante", nombre: "Joseph Salazar", hora: "10:21", numero: 41 },
      { rol: "Discursante", nombre: "Fernando Teruel", hora: "10:35", numero: 42 },
      { rol: "Video", nombre: "PRODUCCIÓN AUDIOVISUAL: Los campos están Blacos, listos para la cosecha", hora: "10:49", numero: 43 },
      { rol: "Discursante", nombre: "José Manuel Lara", hora: "11:15", numero: 44 },
      { rol: "Discursante", nombre: "Nino Llopis", hora: "11:45", numero: 45 }
    ]
  },
  { sesion: "Domingo Tarde", participantes: [
      { rol: "Presidente", nombre: "Julian Lasheras" },
      { rol: "Discursante", nombre: "PRODUCCIÓN AUDIOVISUAL", hora: "13:50", numero: 46 },
      { rol: "Discursante", nombre: "Julian Lasheras", hora: "14:45", numero: 47 },
      { rol: "Discursante", nombre: "Andres Mayor (Betel)", hora: "14:54", numero: 48 },
      { rol: "Oración Final", nombre: "Andres Mayor (Betel)" }
    ]
  }
];

const itemsChecklist = [
  { id: 'recogida', texto: 'Recogida en presidencia', tipo: 'checkbox', icon: 'fa-solid fa-handshake', indicator: true },
  { id: 'orientacion', texto: 'Orientación inicial', tipo: 'checkbox', icon: 'fa-solid fa-compass', indicator: true },
  { id: 'maquillaje', texto: 'Maquillaje', tipo: 'radio', opciones: ['Sí','No','N/A'], icon: 'fa-solid fa-palette', indicator: true },
  { id: 'detras_plataforma', texto: 'Listo tras bastidores (20 min)', tipo: 'checkbox', icon: 'fa-solid fa-clock', indicator: true },
  { id: 'repaso_maquillaje', texto: 'Repaso final de maquillaje', tipo: 'checkbox', icon: 'fa-solid fa-brush', indicator: false },
  { id: 'recordatorios', texto: 'Recordatorios finales', tipo: 'checkbox', icon: 'fa-solid fa-bullhorn', indicator: false },
  { id: 'discursado', texto: 'Participación completada', tipo: 'checkbox', icon: 'fa-solid fa-microphone-slash', indicator: true }
];

// --- ELEMENTOS DEL DOM ---
const loginScreen    = document.getElementById('login-screen');
const loginForm      = document.getElementById('login-form');
const emailInput     = document.getElementById('email-input');
const passwordInput  = document.getElementById('password-input');
const loginError     = document.getElementById('login-error');
const appContainer   = document.getElementById('app-container');
const logoutButton   = document.getElementById('logout-button');
const navContainer   = document.getElementById('day-nav');
const programContainer = document.getElementById('program-container');
const summaryPanel   = document.getElementById('summary-panel');

// --- FUNCIONES DE RENDERIZADO ---
function crearAcordeon(participante, idUnico) {
  const accordionItem = document.createElement('div');
  accordionItem.className = 'participant-accordion';
  accordionItem.dataset.id = idUnico;
  accordionItem.dataset.rol = participante.rol;
  accordionItem.dataset.nombre = participante.nombre;

  const header = document.createElement('button');
  header.className = 'accordion-header';

  const esProd = participante.nombre.includes('PRODUCCIÓN AUDIOVISUAL');
  const esBetel = participante.nombre.includes('(Betel)') || participante.nombre.includes('(BTL)');
  const esOra = participante.rol.includes('Oración');
  const ocOra = ['maquillaje','repaso_maquillaje','orientacion','recordatorios'];
  const ocBet = ['orientacion','recordatorios'];
  let indicatorsHTML = '';
  let showChevron = !esProd;
  if (!esProd) {
    indicatorsHTML = itemsChecklist.filter(it => it.indicator && !(esOra&&ocOra.includes(it.id)) && !(esBetel&&ocBet.includes(it.id)))
      .map(it => `<span class="indicator" data-indicator-for="${it.id}"></span>`).join('');
  }
  header.innerHTML = `
    <div class="participant-info">
      <div class="participant-name">${participante.nombre}</div>
      <div class="participant-role">${participante.rol}</div>
    </div>
    <div class="participant-details">
      <div class="status-indicators">${indicatorsHTML}</div>
      ${participante.hora?`<span class="details-time">${participante.hora}</span>`:''}
      ${participante.numero?`<span class="details-number">#${participante.numero}</span>`:''}
      ${showChevron?'<i class="fas fa-chevron-down accordion-icon"></i>':''}
    </div>`;
  const content = document.createElement('div'); content.className = 'accordion-content';
  if (!esProd) {
    const ck = document.createElement('div'); ck.className='checklist-container';
    itemsChecklist.forEach(item=>{
      if ((esOra&&ocOra.includes(item.id))||(esBetel&&ocBet.includes(item.id))) return;
      const div = document.createElement('div'); div.className='checklist-item'; div.dataset.containerFor=item.id;
      div.innerHTML = `<i class="icon ${item.icon}"></i><label for="check-${idUnico}-${item.id}">${item.texto}</label>`;
      if(item.tipo==='checkbox'){
        const inp=document.createElement('input'); inp.type='checkbox'; inp.dataset.itemId=item.id; inp.id=`check-${idUnico}-${item.id}`;
        div.appendChild(inp);
      } else {
        const grp=document.createElement('div'); grp.className='makeup-options';
        item.opciones.forEach(opt=>{
          const r=document.createElement('input'); r.type='radio'; r.name=`radio-${idUnico}-${item.id}`; r.value=opt; r.dataset.itemId=item.id;
          r.id=`radio-${idUnico}-${item.id}-${opt}`; const l=document.createElement('label'); l.setAttribute('for',r.id); l.textContent=opt;
          r.addEventListener('mousedown',()=>r.dataset.wasChecked=r.checked);
          r.addEventListener('click',()=>{if(r.dataset.wasChecked==='true'){r.checked=false;r.dataset.wasChecked='false';r.dispatchEvent(new Event('change',{bubbles:true}));}else r.dataset.wasChecked='true';});
          grp.append(r,l);
        });
        div.appendChild(grp);
      }
      ck.appendChild(div);
    });
    content.appendChild(ck);
  }
  accordionItem.append(header,content);
  return accordionItem;
}
function generarProgramaHTML(){programContainer.innerHTML='';['Viernes','Sábado','Domingo'].forEach(d=>{const c=document.createElement('div');c.id=`content-${d}`;c.className='day-content hidden';programa.filter(s=>s.sesion.startsWith(d)).forEach(s=>{const b=document.createElement('div');b.className='session-block';b.innerHTML=`<h2>${s.sesion}</h2>`;s.participantes.forEach(p=>b.appendChild(crearAcordeon(p,`${s.sesion.replace(/\s+/g,'-')}-${p.nombre.replace(/\s+/g,'-')}-${p.rol.replace(/\s+/g,'-')}`)));c.appendChild(b);});programContainer.appendChild(c);} );document.getElementById('content-Viernes').classList.remove('hidden');}
function actualizarEstadoUI(acc){if(!acc)return;const nom=acc.dataset.nombre; if(nom.includes('PRODUCCIÓN AUDIOVISUAL')){acc.classList.add('is-audiovisual');acc.style.setProperty('--progress-percent','0%');acc.classList.remove('is-complete');return;}const rol=acc.dataset.rol;const esOra=rol.includes('Oración');const esBetel=nom.includes('(Betel)')||nom.includes('(BTL)');const ocOra=['maquillaje','repaso_maquillaje','orientacion','recordatorios'];const ocBet=['orientacion','recordatorios'];const mR=acc.querySelector('input[data-item-id="maquillaje"]:checked');const na=mR&&mR.value==='N/A';const rpC=acc.querySelector('[data-container-for="repaso_maquillaje"]');if(rpC){const i=rpC.querySelector('input');if(i){i.disabled=na;if(na&&i.checked){i.checked=false;i.dispatchEvent(new Event('change',{bubbles:true}));}}}const total=itemsChecklist.filter(it=>!(esOra&&ocOra.includes(it.id))&&!(esBetel&&ocBet.includes(it.id))&&!(na&&it.id==='repaso_maquillaje')).length;let comp=0;const seen={};acc.querySelectorAll('input[data-item-id]').forEach(i=>{if(i.disabled||seen[i.dataset.itemId])return; if((i.type==='checkbox'&&i.checked)||(i.type==='radio'&&acc.querySelector(`input[name="${i.name}"]:checked`)))comp++;seen[i.dataset.itemId]=true;});const pct=total?comp/total*100:0;acc.style.setProperty('--progress-percent',`${pct}%`);acc.classList.toggle('is-complete',pct>=100);acc.querySelectorAll('.indicator').forEach(ind=>{ind.className='indicator';ind.classList.add(`indicator-for-${ind.dataset.indicatorFor}`);const i=acc.querySelector(`input[data-item-id="${ind.dataset.indicatorFor}"]`);if(i&&i.type==='checkbox'&&i.checked)ind.classList.add(ind.dataset.indicatorFor);else if(i&&i.type==='radio'){const c=acc.querySelector(`input[name="${i.name}"]:checked`);if(c)ind.classList.add(`maquillaje-${c.value.toLowerCase().replace('/','')}`);} });}
function updateSummary(){const b=navContainer.querySelector('.active');if(!b)return;const d=b.dataset.day;const c=document.getElementById(`content-${d}`);const t=c.querySelectorAll('.participant-accordion:not(.is-audiovisual)').length;const co=c.querySelectorAll('.participant-accordion.is-complete').length;const mq=c.querySelectorAll('input[data-item-id="maquillaje"][value="Sí"]:checked').length;summaryPanel.innerHTML=`<div class="summary-item"><div class="count">${t}</div><div class="label">Participantes</div></div><div class="summary-item"><div class="count">${co}</div><div class="label">Completos</div></div><div class="summary-item"><div class="count">${mq}</div><div class="label">Maquillaje</div></div>`;document.title=`(${co}/${t}) Checklist ${d}`;}
function updateAllUI(){document.querySelectorAll('.participant-accordion').forEach(acc=>actualizarEstadoUI(acc));updateSummary();}
async function saveStateToFirebase(id,item,val){try{await setDoc(doc(db,'tareas',id),{[item]:val},{merge:true});}catch(e){console.error(e);alert('No se pudo guardar en Firebase');}}
function syncStateFromFirebase(){programa.forEach(s=>s.participantes.forEach(p=>{const id=`${s.sesion.replace(/\s+/g,'-')}-${p.nombre.replace(/\s+/g,'-')}-${p.rol.replace(/\s+/g,'-')}`;if(p.nombre.includes('PRODUCCIÓN AUDIOVISUAL'))return;onSnapshot(doc(db,'tareas',id),d=>{const acc=document.querySelector(`.participant-accordion[data-id="${id}"]`);if(!acc)return; if(d.exists()){Object.entries(d.data()).forEach(([k,v])=>{const cb=acc.querySelector(`input[data-item-id="${k}"][type="checkbox"]`);if(cb)cb.checked=v;else acc.querySelectorAll(`input[data-item-id="${k}"]`).forEach(r=>{r.checked=(r.value===v);r.dataset.wasChecked=r.checked;});});}actualizarEstadoUI(acc);updateSummary();});}));}
function setupEventListeners(){programContainer.addEventListener('click',e=>{const h=e.target.closest('.accordion-header');if(!h)return;const a=h.closest('.participant-accordion');if(a.classList.contains('is-audiovisual'))return;h.classList.toggle('active');h.nextElementSibling.classList.toggle('active');});programContainer.addEventListener('change',e=>{const i=e.target.closest('input[data-item-id]');if(!i)return;const a=i.closest('.participant-accordion');const v=i.type==='checkbox'?i.checked:(a.querySelector(`input[name="${i.name}"]:checked`)?.value||null);saveStateToFirebase(a.dataset.id,i.dataset.itemId,v);});navContainer.addEventListener('click',e=>{const btn=e.target.closest('.nav-button');if(!btn||btn.classList.contains('active'))return;navContainer.querySelector('.active').classList.remove('active');btn.classList.add('active');document.querySelectorAll('.day-content').forEach(d=>d.classList.add('hidden'));document.getElementById(`content-${btn.dataset.day}`).classList.remove('hidden');updateSummary();});logoutButton.addEventListener('click',async()=>await signOut(auth));}
function showLogin(){loginScreen.classList.remove('hidden');appContainer.classList.add('hidden');loginError.classList.add('hidden');}
function startApp(){loginScreen.classList.add('hidden');appContainer.classList.remove('hidden');generarProgramaHTML();setupEventListeners();syncStateFromFirebase();updateAllUI();}
onAuthStateChanged(auth,u=>u?startApp():showLogin());
loginForm.addEventListener('submit',async e=>{e.preventDefault();try{await signInWithEmailAndPassword(auth,emailInput.value,passwordInput.value);}catch(err){console.error(err);const msgs={'auth/invalid-email':'Email inválido.','auth/user-disabled':'Cuenta deshabilitada.','auth/user-not-found':'Usuario no encontrado.','auth/wrong-password':'Contraseña incorrecta.','auth/too-many-requests':'Demasiados intentos.'};loginError.textContent=msgs[err.code]||'Error al iniciar sesión.';loginError.classList.remove('hidden');}});
