import { QworumScript as QS, Qworum, iri, IRI } from './deps.mjs';
import rdfPrefixes from "../js/modules/rdf-prefixes.mjs";
import { readInventory } from "../js/modules/inventory.mjs";

const
{ rdf, schemaDotOrg } = rdfPrefixes,

// Data values
Json         = QS.Json.build,
SemanticData = QS.SemanticData.build,
// Instructions
Data     = QS.Data.build,
Return   = QS.Return.build,
Sequence = QS.Sequence.build,
Goto     = QS.Goto.build,
Call     = QS.Call.build,
Fault    = QS.Fault.build,
Try      = QS.Try.build,
// Script
Script = QS.Script.build;

await showItem();

async function showItem() {
  const
  /**
   * The inventory.
   * @type {QS.SemanticData}
   */
  inventory = await Qworum.getData(['@','inventory']),

  /**
   * The ID of the product to show.
   * @type {IRI}
   */
  productId = iri`${(await Qworum.getData('product id')).value}`,

  /** 
   * A Dataset object containing this product's statements.
   * @see {@link https://rdf.js.org/dataset-spec/#dataset-interface}
   **/
  productStatements = inventory.value.filter(
    statement => iri`${productId}`.equals(iri`${statement.subject.value}`)
  ),

  /** 
   * A Dataset object containing this product's name statement.
   * @see {@link https://rdf.js.org/dataset-spec/#dataset-interface}
   **/
  productNameStatements = productStatements.filter(
    statement => iri`${statement.predicate.value}`.equals(iri`${schemaDotOrg}name`)
  ),

  /** 
   * A Dataset object containing this product's description statement.
   * @see {@link https://rdf.js.org/dataset-spec/#dataset-interface}
   **/
  productDescriptionStatements = productStatements.filter(
    statement => iri`${statement.predicate.value}`.equals(iri`${schemaDotOrg}description`)
  ),

  /** 
   * A Dataset object containing this product's offers statements.
   * The offer identifier is the object in the statements.
   * @see {@link https://rdf.js.org/dataset-spec/#dataset-interface}
   **/
  productOffersStatements = productStatements.filter(
    statement => iri`${statement.predicate.value}`.equals(iri`${schemaDotOrg}offers`)
  ),

  // UI
  ui = {
    closeButton: document.getElementById('close'),
    title      : document.getElementById('product-title'),
    price      : document.getElementById('product-price'),
    details    : document.getElementById('product-details')
  };

  // Show the name.
  for (const nameStatement of productNameStatements) {
    ui.title.innerText = nameStatement.object.value; 
  }
  
  // Show the offer.
  for (const offersStatement of productOffersStatements) {
    const 
    offerId                 = offersStatement.object,
    offerDetailsStatements  = productStatements.filter(s => offerId.equals(s.subject)),
    priceStatements         = inventory.value.filter(s => (
      s.subject.equals(offerId) &&
      iri`${s.predicate.value}`.equals(iri`${schemaDotOrg}price`)
    )),
    priceCurrencyStatements = inventory.value.filter(s => (
      s.subject.equals(offerId) &&
      iri`${s.predicate.value}`.equals(iri`${schemaDotOrg}priceCurrency`)
    ));

    let price, priceCurrency;
    for (const priceStatement of priceStatements) {
      price = priceStatement.object.value;
    }
    for (const priceCurrencyStatement of priceCurrencyStatements) {
      priceCurrency = priceCurrencyStatement.object.value;
    }
    ui.price.innerText = `${price} ${priceCurrency}`; 
  }
  
  // Show the description.
  for (const descriptionStatement of productDescriptionStatements) {
    ui.details.innerText = descriptionStatement.object.value; 
  }

  // Configure navigation.
  ui.closeButton.addEventListener('click', event => {
    Qworum.eval(
      Script(
        Return(Json(null))
      )
    );
  });

}
