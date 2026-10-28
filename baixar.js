// A última versão publicada do Sonus: o mesmo update.json que o app lê para se atualizar (Updater.kt).
// Publicar uma versão nova lá já troca o botão de baixar do site, sem mexer aqui.
window.SonusBaixar = (() => {
  const MANIFESTO = "https://raw.githubusercontent.com/cronistc/sonus/updates/update.json";
  const NOMES = { 1: "Sunshine" };                      // igual ao SounosVersao do app (native.js)
  const android = /Android/i.test(navigator.userAgent);
  function nome(v) {                                    // 0.1.1.1 → "Sunshine Beta 1.1"
    const p = String(v || "").split(".").map(Number);
    return NOMES[p[1]] ? `<b>${NOMES[p[1]]}</b> ${p[0] === 0 ? "Beta " : ""}${p[2] || 0}.${p[3] || 0}` : String(v || "");
  }
  let pedido = null;
  function ultima() {
    return pedido ||= fetch(MANIFESTO, { cache: "no-store" }).then(r => r.ok ? r.json() : null).then(j => {
      if (!j?.apk?.startsWith("https://")) return null;
      const mb = j.size ? `${(j.size / 1048576).toFixed(1).replace(".", ",")} MB` : "";
      const data = j.date ? new Date(j.date + "T12:00:00").toLocaleDateString("pt-BR", { day: "numeric", month: "short", year: "numeric" }) : "";
      return { apk: j.apk, arquivo: j.apk.split("/").pop(), tamanho: mb, data, nomeHtml: nome(j.versionName), notas: Array.isArray(j.notes) ? j.notes : [] };
    }).catch(() => null);
  }
  return { ultima, android };
})();
