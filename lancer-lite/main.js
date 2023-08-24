var i = Object.defineProperty;
var p = (s, e, t) => e in s ? i(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var n = (s, e, t) => (p(s, typeof e != "symbol" ? e + "" : e, t), t);
async function h(s) {
  const e = [
    `systems/${s}/templates/actor/pilot.hbs`,
    `systems/${s}/templates/actor/mech.hbs`
  ];
  return loadTemplates(e);
}
const m = "_field_1dpt1_14", u = {
  "sheet-container": "_sheet-container_1dpt1_2",
  "sheet-header": "_sheet-header_1dpt1_8",
  "field-group": "_field-group_1dpt1_14",
  "pilot-bio": "_pilot-bio_1dpt1_14",
  field: m,
  "pilot-portrait-frame": "_pilot-portrait-frame_1dpt1_25"
};
class c extends ActorSheet {
  constructor(t, a) {
    super(t, a);
    n(this, "allowedItemTypes", [
      "weapon",
      "armor",
      "gear",
      "trait"
    ]);
  }
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["character", "sheet", "actor"]
    });
  }
  getData() {
    const t = super.getData();
    return t.styles = u, t.weapons = [], t.gear = [], t.armor = [], t.traits = [], this.actor.items.forEach((a) => {
      switch (a.type) {
        case "weapon":
          t.weapons.push(a);
          break;
        case "gear":
          t.gear.push(a);
          break;
        case "trait":
          t.traits.push(a);
          break;
        case "armor":
          t.armor.push(a);
          break;
      }
    }), t;
  }
  activateListeners(t) {
    super.activateListeners(t);
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/actor/pilot.hbs";
  }
  async _onDropItem(t, a) {
    var l;
    if (!this.actor.isOwner)
      return !1;
    const o = await Item.bind(this).fromDropData(a);
    if (!o)
      return !1;
    if (!this.allowedItemTypes.includes(o.type)) {
      console.log("Preventing addition of new item: Invalid item type for this actor type! (" + this.actor.type + "/" + o.type + ")"), t.preventDefault();
      return;
    }
    return this.actor.uuid === ((l = o.parent) == null ? void 0 : l.uuid) ? this._onSortItem(t, o.toObject()) : super._onDropItem(t, a);
  }
}
const d = {
  "sheet-header": "_sheet-header_uh5qv_2"
};
class g extends ActorSheet {
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
    return e.styles = d, e;
  }
}
const y = {
  "sheet-header": "_sheet-header_t1og4_2"
};
class _ extends ItemSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/item/armor.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = y, console.log(e), e;
  }
}
const f = {
  "sheet-header": "_sheet-header_t1og4_2"
};
class S extends ItemSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/item/gear.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = f, console.log(e), e;
  }
}
const b = {
  "sheet-header": "_sheet-header_t1og4_2"
};
class D extends ItemSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/item/system.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = b, console.log(e), e;
  }
}
const I = {
  "sheet-header": "_sheet-header_1ye81_2"
};
class w extends ItemSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/item/trait.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = I, console.log(e), e;
  }
}
const k = {
  "sheet-header": "_sheet-header_t1og4_2"
};
class A extends ItemSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/item/weapon.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = k, console.log(e), e;
  }
}
const O = `
<div class="trigger-card" data-item-id={{id}}>
	{{name}}
</div>
`, v = `
<div class="weapon-card" data-item-id="{{id}}">
{{name}}
</div>
`, r = "lancer-lite";
CONFIG.debug.hooks = !0;
Handlebars.registerPartial("trigger", O);
Handlebars.registerPartial("weapon", v);
Hooks.once("ready", async () => {
  console.log("Init Hook"), game[r] = { PilotSheet: c }, Actors.unregisterSheet("core", ActorSheet), Actors.registerSheet(r, c, { label: "Pilot", types: ["pilot"], makeDefault: !0 }), Actors.registerSheet(r, g, { label: "Mech", types: ["mech"], makeDefault: !0 }), Items.unregisterSheet("core", ItemSheet), Items.registerSheet(r, _, { label: "Armor", types: ["armor"], makeDefault: !0 }), Items.registerSheet(r, S, { label: "Gear", types: ["gear"], makeDefault: !0 }), Items.registerSheet(r, D, { label: "System", types: ["system"], makeDefault: !0 }), Items.registerSheet(r, w, { label: "Trait", types: ["trait"], makeDefault: !0 }), Items.registerSheet(r, A, { label: "Weapon", types: ["weapon"], makeDefault: !0 }), await h(r);
});
