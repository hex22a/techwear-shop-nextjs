export function transformProductsData(data: Record<string, unknown>): Record<string, unknown> {
  const products: Record<string, unknown>[] = [];

  Object.keys(data).forEach((key) => {
    const match = key.match(/^products\[(\d+)\]\[(.+)\]$/);
    if (match) {
      const index = parseInt(match[1], 10);
      const field = match[2];

      if (!products[index]) {
        products[index] = {};
      }
      products[index][field] = data[key];

      delete data[key];
    }
  });

  if (products.length) {
    data.products = products;
  }
  return data;
}
