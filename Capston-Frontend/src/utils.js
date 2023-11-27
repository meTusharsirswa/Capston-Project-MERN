export function formatIndianCurrency(price) {
  if (price == null) {
    return '0';
  }

  const formattedPrice = price.toLocaleString("en-IN", {
    style: "currency",
    currency: "INR",
  });

  return formattedPrice.replace(/\.00$/, '');
}
