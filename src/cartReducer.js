export default function cartReducer(cart, action) {
  switch (action.type) {
    case "empty": {
      return [];
    }
    default:
      return cart;
  }
}
