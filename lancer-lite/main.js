var c = Object.defineProperty;
var p = (s, e, t) => e in s ? c(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var n = (s, e, t) => (p(s, typeof e != "symbol" ? e + "" : e, t), t);
async function d(s) {
  const e = [
    `systems/${s}/templates/actor/pilot.hbs`,
    `systems/${s}/templates/actor/mech.hbs`
  ];
  return loadTemplates(e);
}
const m = "_field_1w2tg_19", h = {
  "sheet-container": "_sheet-container_1w2tg_2",
  "sheet-header": "_sheet-header_1w2tg_8",
  "section-title": "_section-title_1w2tg_14",
  "field-group": "_field-group_1w2tg_19",
  "pilot-bio": "_pilot-bio_1w2tg_19",
  field: m,
  "stat-table": "_stat-table_1w2tg_31",
  "pilot-portrait-frame": "_pilot-portrait-frame_1w2tg_41",
  "weapons-container": "_weapons-container_1w2tg_52",
  "weapon-card-container": "_weapon-card-container_1w2tg_52"
};
class l extends ActorSheet {
  constructor(t, a) {
    super(t, a);
    n(this, "allowedItemTypes", [
      "weapon",
      "armor",
      "gear"
      // trigger?
      // talent?
      // licenses?
      // core bonuses?
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
    return t.styles = h, t.weapons = [], t.gear = [], t.armor = [], t.traits = [], this.actor.items.forEach((a) => {
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
    super.activateListeners(t), t.find(".weapon-edit").on("click", (a) => {
      var i;
      (i = this.actor.items.get($(a.currentTarget).data("itemId"), { strict: !0 }).sheet) == null || i.render(!0);
    });
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/actor/pilot.hbs";
  }
  async _onDropItem(t, a) {
    var i;
    if (!this.actor.isOwner)
      return !1;
    const o = await Item.bind(this).fromDropData(a);
    if (!o)
      return !1;
    if (!this.allowedItemTypes.includes(o.type)) {
      console.log("Preventing addition of new item: Invalid item type for this actor type! (" + this.actor.type + "/" + o.type + ")"), t.preventDefault();
      return;
    }
    return this.actor.uuid === ((i = o.parent) == null ? void 0 : i.uuid) ? this._onSortItem(t, o.toObject()) : super._onDropItem(t, a);
  }
}
const u = {
  "sheet-header": "_sheet-header_uh5qv_2"
};
class g extends ActorSheet {
  constructor(t, a) {
    super(t, a);
    n(this, "allowedItemTypes", [
      "weapon",
      "trait",
      "system",
      "mount"
    ]);
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
    const t = super.getData();
    return t.styles = u, t;
  }
}
const _ = {
  "sheet-header": "_sheet-header_t1og4_2"
};
class y extends ItemSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/item/armor.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = _, console.log(e), e;
  }
}
const f = {
  "sheet-header": "_sheet-header_t1og4_2"
};
class w extends ItemSheet {
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
class S extends ItemSheet {
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
const D = {
  "sheet-header": "_sheet-header_1ye81_2"
};
class I extends ItemSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/item/trait.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = D, console.log(e), e;
  }
}
const v = {
  "sheet-header": "_sheet-header_t1og4_2"
};
class k extends ItemSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/item/weapon.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = v, console.log(e), e;
  }
}
const A = `
<div class="trigger-card" data-item-id={{id}}>
	{{name}}
</div>
`;
const O = `
<div class="weapon-card" data-item-id="{{id}}">
	<div class="header">
		<div class="title-row">
			{{name}}
			<div class="header-buttons">
				<i class="fa-solid fa-pen-to-square weapon-edit" title="Edit Weapon" data-item-id="{{id}}"></i>
				<i class="fa-solid fa-ban weapon-delete" title="Delete Weapon" data-item-id="{{id}}"></i>
			</div>
		</div>
		<div class="tags">
			{{tags}}
		</div>
		<div class="traits">
			{{#if range}}[{{range}}]{{/if}} {{#if damage}}[{{damage}} {{damage_type}}]{{/if}}
		</div>
	</div>
	<div class="body">
		<div class="description">
			{{description}}
		</div>
	</div>
</div>
`, r = "lancer-lite";
CONFIG.debug.hooks = !0;
Handlebars.registerPartial("trigger", A);
Handlebars.registerPartial("weapon", O);
Hooks.once("ready", async () => {
  console.log("Init Hook"), game[r] = { PilotSheet: l }, Actors.unregisterSheet("core", ActorSheet), Actors.registerSheet(r, l, { label: "Pilot", types: ["pilot"], makeDefault: !0 }), Actors.registerSheet(r, g, { label: "Mech", types: ["mech"], makeDefault: !0 }), Items.unregisterSheet("core", ItemSheet), Items.registerSheet(r, y, { label: "Armor", types: ["armor"], makeDefault: !0 }), Items.registerSheet(r, w, { label: "Gear", types: ["gear"], makeDefault: !0 }), Items.registerSheet(r, S, { label: "System", types: ["system"], makeDefault: !0 }), Items.registerSheet(r, I, { label: "Trait", types: ["trait"], makeDefault: !0 }), Items.registerSheet(r, k, { label: "Weapon", types: ["weapon"], makeDefault: !0 }), await d(r);
});
