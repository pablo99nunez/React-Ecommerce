function getTotal(cart, currency) {
  return cart?.reduce((acc, item) => {
    const { quantity, product } = item;
    const { prices } = product;
    const price = prices.find((p) => p.currency.symbol === currency.symbol);
    const total = price?.amount * quantity;
    console.log("total", total);
    return acc + total;
  }, 0);
}
export default getTotal;
