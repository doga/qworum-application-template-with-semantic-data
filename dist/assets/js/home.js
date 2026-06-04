import { QworumScript as QS, Qworum, iri, IRI, rdfTermFactory as t } from './deps.mjs';
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

await showItems();

async function showItems() {
  // Read the inventory data.
  /** 
   * @type {(QS.SemanticData | null)} 
   * @see {@link https://qworum.net/docs/qworum-for-web-pages/latest/~/semanticdata | SemanticData}
   **/
  let inventory = await Qworum.getData(['@','inventory']);

  if(!inventory) {
    inventory = await readInventory();
    await Qworum.setData(['@','inventory'], inventory);
  }

  // Read the shop-specific product ids and their names.
  const
  /** 
   * A Dataset object containing product-name statements.
   * @see {@link https://rdf.js.org/dataset-spec/#dataset-interface}
   **/
  productNameStatements = inventory.value.filter(
    statement => iri`${statement.predicate.value}`.equals(iri`${schemaDotOrg}name`)
  ),

  // Show the products buttons.
  contentArea = document.getElementById('products');

  for (const productNameStatement of productNameStatements) {
    const 
    /** 
     * The shop-specific product ID.
     * @type {IRI} 
     * @see {@link https://qworum.net/docs/qworum-for-web-pages/latest/~/iri}
     **/
    productId = iri`${productNameStatement.subject.value}`,

    /** 
     * The product name.
     * @type {string} 
     **/
    productName = productNameStatement.object.value;

    // Show the product button.
    const
    li     = document.createElement('li'),
    button = document.createElement('button');

    button.className = 'product-title link-like';
    li.appendChild(button);
    contentArea.appendChild(li);

    button.innerText = productName;

    console.debug(Json(`${productId}`));

    // Configure the product button to call the product-viewing method on click/tap.
    button.addEventListener('click', async () => {
      await Qworum.eval(
        Script(
          Sequence(
            Call('@', '../view-product/', { name: 'product id', value: Json(`${productId}`) }),
            Goto()
          )
        )
      );
    });
  }

}
