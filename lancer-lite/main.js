var c = Object.defineProperty;
var d = (s, e, t) => e in s ? c(s, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[e] = t;
var i = (s, e, t) => (d(s, typeof e != "symbol" ? e + "" : e, t), t);
class u extends Actor {
}
class h extends Item {
}
const p = "_field_1enau_34", m = {
  "sheet-container": "_sheet-container_1enau_2",
  "row-reverse": "_row-reverse_1enau_8",
  "sheet-header": "_sheet-header_1enau_23",
  "section-title": "_section-title_1enau_29",
  "field-group": "_field-group_1enau_34",
  "pilot-bio": "_pilot-bio_1enau_34",
  field: p,
  "stat-table": "_stat-table_1enau_49",
  "pilot-portrait-frame": "_pilot-portrait-frame_1enau_59",
  "pad-right": "_pad-right_1enau_78",
  "header-group": "_header-group_1enau_82",
  "header-text": "_header-text_1enau_89",
  "header-options": "_header-options_1enau_94",
  "icon-button": "_icon-button_1enau_98"
};
class l extends ActorSheet {
  constructor(t, a) {
    super(t, a);
    i(this, "allowedItemTypes", [
      "armor",
      "core_bonus",
      "gear",
      "license",
      "talent",
      "trigger",
      "weapon"
    ]);
  }
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      classes: ["character", "sheet", "actor"],
      width: 675,
      height: 700
    });
  }
  getData() {
    const t = super.getData();
    return t.styles = m, t.armor = [], t.core_bonuses = [], t.gear = [], t.licenses = [], t.talents = [], t.triggers = [], t.weapons = [], this.actor.items.forEach((a) => {
      switch (a.type) {
        case "armor":
          t.armor.push(a);
          break;
        case "core_bonus":
          t.core_bonuses.push(a);
          break;
        case "gear":
          t.gear.push(a);
          break;
        case "license":
          t.licenses.push(a);
          break;
        case "talent":
          t.talents.push(a);
          break;
        case "trigger":
          t.triggers.push(a);
          break;
        case "weapon":
          t.weapons.push(a);
          break;
      }
    }), t;
  }
  activateListeners(t) {
    super.activateListeners(t), t.find(".item-edit").on("click", (a) => {
      var o;
      (o = this.actor.items.get($(a.currentTarget).data("itemId"), { strict: !0 }).sheet) == null || o.render(!0);
    }), t.find(".weapon-add").on("click", (a) => {
      CONFIG.Item.documentClass.create({ type: "weapon", name: "New Weapon" }, { parent: this.actor, renderSheet: !0 });
    });
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/actor/pilot.hbs";
  }
  async _onDropItem(t, a) {
    var o;
    if (!this.actor.isOwner)
      return !1;
    const n = await Item.bind(this).fromDropData(a);
    if (!n)
      return !1;
    if (!this.allowedItemTypes.includes(n.type)) {
      console.log("Preventing addition of new item: Invalid item type for this actor type! (" + this.actor.type + "/" + n.type + ")"), t.preventDefault();
      return;
    }
    return this.actor.uuid === ((o = n.parent) == null ? void 0 : o.uuid) ? this._onSortItem(t, n.toObject()) : super._onDropItem(t, a);
  }
}
const g = {
  "sheet-header": "_sheet-header_uh5qv_2"
};
class _ extends ActorSheet {
  constructor(t, a) {
    super(t, a);
    i(this, "allowedItemTypes", [
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
    return t.styles = g, t;
  }
}
const y = {
  "sheet-header": "_sheet-header_t1og4_2"
};
class b extends ItemSheet {
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
    return "systems/lancer-lite/templates/item/core_bonus.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = f, console.log(e), e;
  }
}
const v = {
  "sheet-header": "_sheet-header_t1og4_2"
};
class D extends ItemSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/item/gear.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = v, console.log(e), e;
  }
}
const I = {
  "sheet-header": "_sheet-header_t1og4_2"
};
class w extends ItemSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/item/license.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = I, console.log(e), e;
  }
}
const k = {
  "sheet-header": "_sheet-header_t1og4_2"
};
class T extends ItemSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/item/system.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = k, console.log(e), e;
  }
}
const x = {
  "sheet-header": "_sheet-header_t1og4_2"
};
class A extends ItemSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/item/talent.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = x, console.log(e), e;
  }
}
const O = {
  "sheet-header": "_sheet-header_1ye81_2"
};
class C extends ItemSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/item/trait.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = O, console.log(e), e;
  }
}
const L = {
  "sheet-header": "_sheet-header_t1og4_2"
};
class P extends ItemSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/item/trigger.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = L, console.log(e), e;
  }
}
const E = {
  "sheet-header": "_sheet-header_129by_2",
  "icon-button-container": "_icon-button-container_129by_2",
  "button-icon": "_button-icon_129by_8"
};
class G extends ItemSheet {
  constructor(e, t) {
    super(e, t);
  }
  /** @override */
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      width: 600,
      height: 600
    });
  }
  /** @override */
  get template() {
    return "systems/lancer-lite/templates/item/weapon.hbs";
  }
  getData() {
    const e = super.getData();
    return e.styles = E, console.log(e), e;
  }
  activateListeners(e) {
    super.activateListeners(e), e.find(".weapon-delete").on("click", (t) => {
      this.item.delete();
    });
  }
}
const N = `
<div class="item-card trigger-card" data-item-id="{{id}}">
	<div class="header">
		<div class="title-row">
			{{name}}
			<div class="header-buttons">
				<i class="fa-solid fa-pen-to-square item-edit" title="Edit Trigger" data-item-id="{{id}}"></i>
			</div>
		</div>
		<div class="tags">
			Trigger
		</div>
	</div>
	<div class="body">
		<div class="description">
			{{description}}
		</div>
	</div>
</div>
`;
const W = `
<div class="item-card weapon-card" data-item-id="{{id}}">
	<div class="header">
		<div class="title-row">
			{{name}}
			<div class="header-buttons">
				<i class="fa-solid fa-pen-to-square item-edit" title="Edit Weapon" data-item-id="{{id}}"></i>
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
`, j = {
  registerAll: function() {
    Handlebars.registerPartial("trigger-card", N), Handlebars.registerPartial("weapon-card", W);
  }
};
async function M(s) {
  const e = [
    `systems/${s}/templates/actor/pilot.hbs`,
    `systems/${s}/templates/actor/mech.hbs`
  ];
  return loadTemplates(e);
}
const r = "lancer-lite";
j.registerAll();
Hooks.once("init", async () => {
  game[r] = { PilotSheet: l }, CONFIG.Actor.documentClass = u, Actors.unregisterSheet("core", ActorSheet), Actors.registerSheet(r, l, { label: "Pilot", types: ["pilot"], makeDefault: !0 }), Actors.registerSheet(r, _, { label: "Mech", types: ["mech"], makeDefault: !0 }), CONFIG.Item.documentClass = h, Items.unregisterSheet("core", ItemSheet), Items.registerSheet(r, b, { label: "Armor", types: ["armor"], makeDefault: !0 }), Items.registerSheet(r, S, { label: "Core Bonus", types: ["core_bonus"], makeDefault: !0 }), Items.registerSheet(r, D, { label: "Gear", types: ["gear"], makeDefault: !0 }), Items.registerSheet(r, w, { label: "License", types: ["license"], makeDefault: !0 }), Items.registerSheet(r, T, { label: "System", types: ["system"], makeDefault: !0 }), Items.registerSheet(r, A, { label: "Talent", types: ["talent"], makeDefault: !0 }), Items.registerSheet(r, C, { label: "Trait", types: ["trait"], makeDefault: !0 }), Items.registerSheet(r, P, { label: "Trigger", types: ["trigger"], makeDefault: !0 }), Items.registerSheet(r, G, { label: "Weapon", types: ["weapon"], makeDefault: !0 }), await M(r);
});
