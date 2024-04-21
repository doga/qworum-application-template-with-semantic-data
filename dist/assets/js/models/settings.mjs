import { 
  prefixes, Model, Language,
} from "../deps.mjs";

const {schema}  = prefixes;

class Settings extends Model {
  static type = new URL(`${schema}WebApplication`);

  static async readFrom(datasets, config) {
    try {
      const 
      {dataSets, count} = Model._normaliseReadArgs(datasets, config),
      res               = await Model.readFrom(dataSets, {types: [Settings.type], modelClass: Settings, count});

      return res[0];
    } catch (error) {
      throw error;
    }
  }

  /** @type {Set.<string>} **/
  #versions;

  /** @type {Set.<Language>} **/
  #languages;

  constructor(id, info) {
    super(id, {types: Settings.types, datasets: info?.datasets});
    this.#versions   = new Set();
    this.#languages = new Set();
  }

  get versions(){return this.#versions;}
  get languages(){return this.#languages;}

  async getVersions() {
    return await super._getStrings(`${schema}softwareVersion`);
  }

  async getVersion() {
    const versions = await this.getVersions();
    for (const version of versions) {
      return version;
    }
    throw new Error('version not found');
  }

  async getLanguages() {
    const 
    languages = await super._getStrings(`${schema}inLanguage`),
    res       = new Set();

    for (const lang of languages) {
      res.add(Language.fromCode(lang));
    }
    return res;
  }
}

export { Settings };
