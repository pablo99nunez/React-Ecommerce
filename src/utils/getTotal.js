function getTotal(cart, currency) {
  return cart?.reduce((acc, item) => {
    const { quantity, product } = item;
    const { prices } = product;
    const price = prices.find((p) => p.currency.symbol === currency.symbol);
    const total = price?.amount * quantity;
    return acc + total;
  }, 0);
}
export default getTotal;
