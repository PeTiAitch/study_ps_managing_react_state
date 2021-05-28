import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Fetch } from "./services/useFetch";
import Spinner from "./Spinner";
import PageNotFound from "./PageNotFound";
import { useCart } from "./cartContext";

export default function DetailWrapper() {
  const { dispatch } = useCart();
  const { id } = useParams();

  return <Detail id={id} navigate={useNavigate()} dispatch={dispatch} />;
}

class Detail extends React.Component {
  state = {
    sku: "",
  };

  render() {
    const { id, navigate, dispatch } = this.props;

    return (
      <Fetch url={`products/${id}`}>
        {(product, loading, error) => {
          if (loading) return <Spinner />;
          if (!product) return <PageNotFound />;
          if (error) throw error;

          return (
            <div id="detail">
              <h1>{product.name}</h1>
              <p>{product.description}</p>
              <p id="price">${product.price}</p>

              <select
                id="size"
                value={this.state.sku}
                onChange={(e) => this.setState({ sku: e.target.value })}
              >
                <option value="">What size?</option>
                {product.skus.map(({ sku, size }) => (
                  <option key={sku} value={sku}>
                    {size}
                  </option>
                ))}
              </select>

              <p>
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    dispatch({
                      type: "add",
                      sku: this.state.sku,
                      id,
                    });
                    navigate("/cart");
                  }}
                  disabled={!this.state.sku}
                >
                  Add to cart
                </button>
              </p>
              <img src={`/images/${product.image}`} alt={product.category} />
            </div>
          );
        }}
      </Fetch>
    );
  }
}
