/*
 * Configurazione comune dei sondaggi dal vivo: la usano le slide
 * (assets/slides/sondaggio.js) e la pagina di voto degli studenti (vota/).
 *
 * La chiave è quella "publishable" di Supabase: è pubblica per progetto.
 * Le regole del database permettono solo di aggiungere un voto e di leggere
 * i totali (vedi la nota in vota/index.html). La chiave segreta e la password
 * del database non vanno mai in questo repository.
 */
window.PSI_SONDAGGI = {
  api: 'https://kmfpuqswhgslmhvekphl.supabase.co',
  key: 'sb_publishable_thNJG8ZyPLtdkCOxmc2NWA_LRSimqps',
  // Il QR punta sempre al sito pubblicato, anche quando le slide girano in locale.
  vota: 'https://qwertyjacob.github.io/PSI-VA-2627/vota/'
};
