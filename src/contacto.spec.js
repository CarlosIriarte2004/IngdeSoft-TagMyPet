const { sanitizePhone, buildTelHref, computeContactState } = require("./src/contacto.js");

test("sanitizePhone elimina caracteres no numéricos exceptuando +", () => {
  expect(sanitizePhone(" (+591) 709-99-999 ")).toBe("+59170999999");
});

test("buildTelHref arma tel: correctamente", () => {
  expect(buildTelHref("+59170999999")).toBe("tel:+59170999999");
  expect(buildTelHref("")).toBe("");
});

describe("computeContactState", () => {
  test("si no permite contacto → disabled y mensaje", () => {
    const owner = { type:"person", allowContact:false };
    const s = computeContactState(owner);
    expect(s.canShow).toBe(false);
    expect(s.mode).toBe("disabled");
  });

  test("persona con teléfono → call con tel:", () => {
    const owner = { type:"person", allowContact:true, phone:"+59170999999" };
    const s = computeContactState(owner);
    expect(s.canShow).toBe(true);
    expect(s.mode).toBe("call");
    expect(s.contactHref).toMatch(/^tel:/);
  });

  test("refugio verificado y sin teléfono → request + badge", () => {
    const owner = { type:"shelter", verified:true, allowContact:true };
    const s = computeContactState(owner);
    expect(s.isShelterVerified).toBe(true);
    expect(s.mode).toBe("request");
  });
});