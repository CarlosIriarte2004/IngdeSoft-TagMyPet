// UMD: usable en navegador y en tests (Node)
(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.TagMyPetContacto = factory();
  }
})(typeof self !== "undefined" ? self : this, function () {

  function sanitizePhone(p) {
    return String(p || "").replace(/[^\d+]/g, "");
  }

  function buildTelHref(phone) {
    const s = sanitizePhone(phone);
    return s ? `tel:${s}` : "";
  }

  /**
   * owner = {
   *   type: "person" | "shelter",
   *   name: string,
   *   location: string,
   *   phone?: string,
   *   allowContact: boolean,
   *   verified?: boolean
   * }
   */
  function computeContactState(owner) {
    const o = owner || {};
    const isShelter = o.type === "shelter";
    const isShelterVerified = !!(isShelter && o.verified);

    // Si no permite mostrar datos → deshabilitado
    if (!o.allowContact) {
      return { canShow:false, mode:"disabled", contactHref:"", isShelterVerified };
    }

    // Shelters usan solicitud si no hay teléfono
    if (isShelter && !o.phone) {
      return { canShow:true, mode:"request", contactHref:"", isShelterVerified };
    }

    // Si hay teléfono → llamada
    const tel = buildTelHref(o.phone);
    if (tel) {
      return { canShow:true, mode:"call", contactHref:tel, isShelterVerified };
    }

    // Último recurso: solicitud
    return { canShow:true, mode:"request", contactHref:"", isShelterVerified };
  }

  return { sanitizePhone, buildTelHref, computeContactState };
});