async function l(s) {
  const e = [
    `systems/${s}/templates/actor/pilot.hbs`,
    `systems/${s}/templates/actor/mech.hbs`
  ];
  return loadTemplates(e);
}
const o = {
  "sheet-header": "_sheet-header_sm5n9_2"
};
class r extends ActorSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["character", "sheet", "actor"]
    });
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/actor/pilot.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = o, e;
  }
}
const c = {
  "sheet-header": "_sheet-header_uh5qv_2"
};
class n extends ActorSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["character", "sheet", "actor"]
    });
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/actor/mech.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = c, e;
  }
}
const h = {
  "sheet-header": "_sheet-header_t1og4_2"
};
class m extends ItemSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/item/armor.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = h, console.log(e), e;
  }
}
const u = {
  "sheet-header": "_sheet-header_t1og4_2"
};
class p extends ItemSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/item/gear.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = u, console.log(e), e;
  }
}
const g = {
  "sheet-header": "_sheet-header_t1og4_2"
};
class i extends ItemSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/item/system.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = g, console.log(e), e;
  }
}
const y = {
  "sheet-header": "_sheet-header_1ye81_2"
};
class d extends ItemSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/item/trait.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = y, console.log(e), e;
  }
}
const S = {
  "sheet-header": "_sheet-header_t1og4_2"
};
class _ extends ItemSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/item/weapon.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = S, console.log(e), e;
  }
}
const a = "lancer-lite";
Hooks.once("ready", async () => {
  console.log("Init Hook"), game[a] = { PilotSheet: r }, Actors.unregisterSheet("core", ActorSheet), Actors.registerSheet(a, r, { label: "Pilot", types: ["pilot"], makeDefault: !0 }), Actors.registerSheet(a, n, { label: "Mech", types: ["mech"], makeDefault: !0 }), Items.unregisterSheet("core", ItemSheet), Items.registerSheet(a, m, { label: "Armor", types: ["armor"], makeDefault: !0 }), Items.registerSheet(a, p, { label: "Gear", types: ["gear"], makeDefault: !0 }), Items.registerSheet(a, i, { label: "System", types: ["system"], makeDefault: !0 }), Items.registerSheet(a, d, { label: "Trait", types: ["trait"], makeDefault: !0 }), Items.registerSheet(a, _, { label: "Weapon", types: ["weapon"], makeDefault: !0 }), await l(a);
});
