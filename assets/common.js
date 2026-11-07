// Shared helpers for every page. `data-base` on <html> is the relative path to the site root.
window.Site = (() => {
  const base = document.documentElement.dataset.base || '.';

  const json = async (file) => {
    const res = await fetch(`${base}/data/${file}`, { cache: 'no-cache' });
    if (!res.ok) throw new Error(`${file} yüklenemedi (${res.status})`);
    return res.json();
  };

  const nf = (opts) => new Intl.NumberFormat('tr-TR', opts);
  const compact = (n) => nf({ notation: 'compact', maximumFractionDigits: 1 }).format(n);
  const number = (n) => nf().format(n);
  const pct = (n) => '%' + nf({ maximumFractionDigits: 1 }).format(n);
  const format = (value, type) => (type === 'pct' ? pct(value) : type === 'number' ? number(value) : compact(value));

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

  const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0].toLocaleUpperCase('tr-TR')).join('');

  // Renders the avatar photo; falls back to initials when assets/avatar.jpg is missing.
  const avatar = (el, site) => {
    const img = new Image();
    img.alt = site.name;
    img.onerror = () => { el.innerHTML = `<span aria-hidden="true">${esc(initials(site.name))}</span>`; };
    img.src = `${base}/${site.avatar}`;
    el.replaceChildren(img);
  };

  const svg = (d, extra = '') => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${d}</svg>`;
  const icons = {
    instagram: svg('<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6" fill="currentColor"/>'),
    youtube: svg('<rect x="2.5" y="5.5" width="19" height="13" rx="4"/><path d="M10 9.5v5l4.5-2.5z" fill="currentColor"/>'),
    tiktok: svg('<path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.5 2.6 2.4 4.3 5 4.5"/>'),
    mail: svg('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m4 7 8 6 8-6"/>'),
    pin: svg('<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>'),
    chart: svg('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
    spark: svg('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6"/>'),
    arrow: svg('<path d="M9 6l6 6-6 6"/>'),
    back: svg('<path d="M15 6l-6 6 6 6"/>'),
    search: svg('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>'),
    chev: svg('<path d="m6 9 6 6 6-6"/>'),
    link: svg('<path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/>'),
  };
  const platformChip = { instagram: 'ig', youtube: 'yt', tiktok: 'tt' };

  const sampleBanner = (text) => `<div class="sample-banner" role="note"><b>Örnek veri.</b> ${text}</div>`;

  return { base, json, compact, number, pct, format, esc, avatar, icons, platformChip, sampleBanner };
})();
