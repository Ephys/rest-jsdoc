
export default class Parameter {

  constructor({ kind, type }) {
    this.kind = kind;
    this.type = type;
  }
}

Parameter.KIND = {
  PATH: 0,
  QUERY: 1
};
