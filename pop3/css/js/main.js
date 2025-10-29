// Données fictives — remplace par les tiennes
const data = Array.from({length:37}).map((_,i)=>({
  id: i+1,
  name: `Prénom Nom ${i+1}`,
  date: new Date(Date.now() - i*86400000).toLocaleDateString('fr-FR'),
  city: "Chamonix-Mont-Blanc",
  text: "Annonce fictive — détails sur la cérémonie et condoléances.",
}));

const perPage = 6;
let page = 1;
const listEl = document.getElementById('list');
const pageInfo = document.getElementById('page-info');

function render(){
  listEl.innerHTML = '';
  const start = (page-1)*perPage;
  const pageItems = data.slice(start, start+perPage);
  pageItems.forEach(item=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <h3>${item.name}</h3>
      <div class="meta">${item.date} — ${item.city}</div>
      <p>${item.text}</p>
      <div class="actions">
        <button class="btn">Voir</button>
        <button class="btn primary">Contact</button>
      </div>
    `;
    listEl.appendChild(card);
  });
  pageInfo.textContent = `Page ${page} / ${Math.ceil(data.length / perPage)}`;
}

document.getElementById('prev').addEventListener('click', ()=>{
  if(page>1){ page--; render(); }
});
document.getElementById('next').addEventListener('click', ()=>{
  if(page < Math.ceil(data.length/perPage)){ page++; render(); }
});

document.getElementById('search').addEventListener('input', (e)=>{
  const q = e.target.value.trim().toLowerCase();
  const filtered = data.filter(d => (d.name + ' ' + d.text + ' ' + d.city).toLowerCase().includes(q));
  // afficher résultats filtrés temporairement
  listEl.innerHTML = '';
  filtered.slice(0, perPage).forEach(item=>{
    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `<h3>${item.name}</h3><div class="meta">${item.date} — ${item.city}</div><p>${item.text}</p>`;
    listEl.appendChild(card);
  });
  pageInfo.textContent = `Résultats : ${filtered.length}`;
});

render();
