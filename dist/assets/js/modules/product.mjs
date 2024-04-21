import { 
  IRI, UniformResourceName,
  prefixes, LangString,
  Model, 
  dataFactory as df,
} from "../deps.mjs";

const 
{schema}     = prefixes,
pName        = `${schema}name`,
pDescription = `${schema}description`,
pProductId   = `${schema}productId`;


class Product extends Model {
  static types = [`${schema}Product`].map(t => new URL(t));

 static async readFrom(datasets, config) {
    try {
      const 
      {dataSets, count} = Model._normaliseReadArgs(datasets, config),
      res               = await Model.readFrom(dataSets, {types: Product.types, modelClass: Product, count});

      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // In-object data
  /** 
   * @type {Set.<string>} 
   **/
  #names;

  /** 
   * @type {Set.<string>} 
   **/
  #productIds;

  /** 
   * @type {Set.<LangString>} 
   **/
  #descriptions;

  /** 
   * @type {Set.<{price: string, priceCurrency: string}>} 
   **/
  #offers;

  constructor(id, info) {
    super(id, {types: Product.types, datasets: info?.datasets});
    this.#names        = new Set();
    this.#productIds   = new Set();
    this.#descriptions = new Set();
    this.#offers       = new Set();
  }

  get names(){return this.#names;}
  get productIds(){return this.#productIds;}
  get descriptions(){return this.#descriptions;}
  get offers(){return this.#offers;}

  async getNames() {
    return super._getStrings(pName);
  }

  async getDescriptions() {
    return super._getLangStrings(pDescription);
  }

  async getOffers() {
    try {
      const 
      offers        = df.namedNode(`${schema}offers`),
      price         = df.namedNode(`${schema}price`),
      priceCurrency = df.namedNode(`${schema}priceCurrency`),
      s             = df.namedNode(this.id),
      res           = new Set();

      for (const dataset of this.datasets) {
        for (const qOffers of dataset.match(s, offers, null)) {
          const anOffer = qOffers.object;
          let aPrice, aPriceCurrency;

          for (const qPrice of dataset.match(anOffer, price, null)) {
            aPrice = qPrice.object; break;
          }

          for (const qPriceCurrency of dataset.match(anOffer, priceCurrency, null)) {
            aPriceCurrency = qPriceCurrency.object; break;
          }

          if(!(aPrice && aPriceCurrency))continue;
          res.add({price: aPrice.value, priceCurrency: aPriceCurrency.value});
        }
      }
      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }


  async writeTo(dataset, graph){ 
    try {
      await super.writeTo(dataset, graph);

      if (!graph) {
        graph = df.defaultGraph();
      } else {
        if(!IRI.isIRI(graph)) throw new TypeError(`Not a graph`);
        graph = df.namedNode(graph.toString());
      }

      const 
      id    = df.namedNode(`${this.id}`),
      pName = df.namedNode(`${schema}name`);

      // name
      for (const name of this.names) {
        const q = quad(
          id, pName, 
          typeof name === 'string' ?
            df.literal(name) :
            df.literal(name.str, name.lang)
        );
        dataset.add(q);
      }

      // TODO write the other properties

      return Promise.resolve(true);
    } catch (error) {
      return Promise.reject(error);
    }
  }

}
