
export default class TypedefMap extends Map {

  set(key, value) {
    if (this.has(key)) {
      throw new Error(`Duplicate type definition for "${key}".`);
    }

    return super.set(key, value);
  }

  get(key) {
    if (!this.has(key)) {
      throw new Error(`Missing type declaration for "${key}"`);
    }

    return super.get(key);
  }
}
