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

await showItem();

async function showItem() {
  // console.debug(`showing item `);
  const
    params = {
      productInfo: await Qworum.getData('Product info'), // SemanticData, contains only product ID
    };

  // console.log(`Product info is semantic data: ${params.productInfo.getTag && params.productInfo.getTag() === 'semantic'}\nProduct info: ${params.productInfo}`);

  const
  productOsm = Product.readFrom(params.productInfo)[0],
  product    = products.find(p => {
    const id = new URL(`/products/${p.id}`, config.url).toString();
    // console.debug(`id: ${id}\nproductOsm.ids: ${productOsm.idsArray}\n`);
    // console.debug(`p: ${p?.productId}, productOsm: {{found: ${!!productOsm}}, productId: ${productOsm?.productId}}`);
    return productOsm.ids.has(`${id}`);
  }),

  // UI
  closeButton = document.getElementById('close'),
    title = document.getElementById('product-title'),
    details = document.getElementById('product-details');

  // console.debug(`Product info: ${itemId} `);

  title.innerText = product.title;
  details.innerText = product.description;

  closeButton.addEventListener('click', (event) => {
    // console.debug('close button clicked');
    // event.preventDefault();
    Qworum.eval(
      Script(
        Return(params.productInfo)
      )
    );
  });

}
