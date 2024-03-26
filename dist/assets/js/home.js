import { config } from "./modules/config.mjs"; // Site configuration
import { products } from "./modules/product-inventory.mjs"; // Articles on sale
import { Product, Qworum } from './imports.mjs'; // The Qworum library.

const
  // Qworum Data value types
  Json = Qworum.Json,
  SemanticData = Qworum.SemanticData,
  // Qworum instructions
  Data = Qworum.Data,
  Return = Qworum.Return,
  Sequence = Qworum.Sequence,
  Goto = Qworum.Goto,
  Call = Qworum.Call,
  Fault = Qworum.Fault,
  Try = Qworum.Try,
  // Qworum script
  Script = Qworum.Script;

showItems();
// await test();

function showItems() {
  // console.debug(`[home] showing ${products.length} products`);
  const contentArea = document.getElementById('products');
  for (const product of products) {
    // console.debug(`[home] showing item ${itemId}`);
    const
      productRdfNamedNodeValue = new URL(`/products/${product.id}`, config.url).toString(),
      productInfo = new Product(productRdfNamedNodeValue),
      semanticData = SemanticData(),
      li = document.createElement('li'),
      button = document.createElement('button');

    productInfo.writeTo(semanticData);

    button.className = 'product-title';
    button.innerText = product.title;
    li.appendChild(button);
    contentArea.appendChild(li);

    button.addEventListener('click', async () => {
      await Qworum.eval(
        Script(
          Sequence(
            Call('@', '../view-product/', { name: 'Product info', value: semanticData }),
            Goto()
          )
        )
      );
    });
  }
}

async function test() {
  try {
    let
    id       = new URL('/products/xyz', config.url).toString(),
    product  = new Product(id),
    sd       = SemanticData(),
    sdName   = 'sd',
    json     = Json({a:1}),
    jsonName = 'json';

    product.writeTo(sd);
    console.debug(`sd: ${sd}`);

    await Qworum.setData(jsonName, json);
    json = await Qworum.getData(jsonName);
    console.debug(`
      json is Json: ${json instanceof Qworum.message.Json}
    `);

    await Qworum.setData(sdName, sd);
    sd = await Qworum.getData(sdName);
    console.debug(`
      sd is SemanticData: ${sd instanceof Qworum.message.SemanticData}
    `);
  } catch (error) {
    console.error(`${error}`);
  }

}

