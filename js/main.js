const toggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.nav-links');
if (toggle && nav) toggle.addEventListener('click', () => nav.classList.toggle('open'));

// Campaign search and category filtering
const campaignSearch = document.querySelector('[data-campaign-search]');
const campaignCards = [...document.querySelectorAll('[data-campaign-card]')];
const chips = [...document.querySelectorAll('[data-filter]')];
function filterCampaigns(){
  const active = document.querySelector('[data-filter].active')?.dataset.filter || 'all';
  const q = (campaignSearch?.value || '').toLowerCase().trim();
  campaignCards.forEach(card => {
    const category = card.dataset.category;
    const text = card.textContent.toLowerCase();
    const show = (active === 'all' || active === category) && (!q || text.includes(q));
    card.classList.toggle('hidden', !show);
  });
}
chips.forEach(chip => chip.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('active'));
  chip.classList.add('active');
  filterCampaigns();
}));
if(campaignSearch) campaignSearch.addEventListener('input', filterCampaigns);

// Donation amount selector
const amountButtons = [...document.querySelectorAll('[data-amount]')];
const customAmount = document.querySelector('[data-custom-amount]');
amountButtons.forEach(btn => btn.addEventListener('click', () => {
  amountButtons.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if(customAmount) customAmount.value = btn.dataset.amount;
}));

// Simple fundraiser form progress preview
const fundraiserForm = document.querySelector('#fundraiserForm');
if(fundraiserForm){
  fundraiserForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = fundraiserForm.querySelector('[name="name"]').value || 'Your campaign';
    const goal = fundraiserForm.querySelector('[name="goal"]').value || '0';
    alert(`Fundraiser preview created for ${name}. Goal: R${goal}. This static demo can be wired to a backend later.`);
  });
}
