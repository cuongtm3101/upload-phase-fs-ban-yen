import { useEffect, useLayoutEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { formatCurrency } from "../../helpers";
import Modal from "../../shared/admin/Modal";
import Swal from "sweetalert2";
const ProductDetail = () => {
  const [product, setProduct] = useState({});
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [sale, setSale] = useState("");
  const [stock, setStock] = useState("");
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");

  // Đếm số lần load
  const [count, setCount] = useState(0);

  const [isEdit, setIsEdit] = useState(false);
  const { id } = useParams();

  //
  let BASE_API = "http://localhost:3000/api/v1";

  const fetchProduct = async () => {
    try {
      let res = await fetch(BASE_API + `/products/${id}`);
      let data = await res.json();
      console.log(data);
      //
      setProduct({ ...data });
      setProductId(data.product_id);
      setName(data.name);
      setPrice(data.price);
      setSale(data.sale);
      setStock(data.number);
      setCategory(data.category_id);
      //
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      let res = await fetch(BASE_API + `/categories`);
      let data = await res.json();
      setCategories(() => [...data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let update = {
        id: productId,
        name,
        price,
        sale,
        stock,
        category_id: category,
      };
      let res = await fetch(BASE_API + "/products/" + productId, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(update),
      });
      let data = await res.json();
      Swal.fire(data.status, data.message, "success").then(() => {
        setCount(0);
        setIsEdit(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchCategories();
  }, []);

  useEffect(() => {
    if (count > 0) {
      setIsEdit(true);
    }
  }, [name, price, sale, stock, category]);

  return (
    <>
      <div className="col py-3">
        <h3>Product Detail</h3>
        <hr />
        <div className="container mb-3">
          <div className="row">
            <h5>Product Overview</h5>
          </div>
          <div className="row"></div>
        </div>
        <div style={{ overflowX: "auto" }}>
          <form className="container" onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-4">
                <div className="mb-3">
                  <label htmlFor="productId" className="form-label">
                    Product Id
                  </label>
                  <input
                    disabled
                    type="text"
                    className="form-control"
                    id="productId"
                    value={productId}
                    onChange={(e) => {
                      setProductId(e.target.value);
                      setCount((prev) => (prev = prev + 1));
                    }}
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3">
                  <label htmlFor="productName" className="form-label">
                    Product Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setCount((prev) => (prev = prev + 1));
                    }}
                    type="text"
                    className="form-control"
                    id="productName"
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3">
                  <label htmlFor="price" className="form-label">
                    Price
                  </label>
                  <input
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      setCount((prev) => (prev = prev + 1));
                    }}
                    type="text"
                    className="form-control"
                    id="price"
                  />
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-4">
                <div className="mb-3">
                  <label htmlFor="stock" className="form-label">
                    Stock
                  </label>
                  <input
                    value={stock}
                    onChange={(e) => {
                      setStock(e.target.value);
                      setCount((prev) => (prev = prev + 1));
                    }}
                    type="text"
                    className="form-control"
                    id="stock"
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3">
                  <label htmlFor="sale" className="form-label">
                    Sale
                  </label>
                  <input
                    value={sale}
                    onChange={(e) => {
                      setSale(e.target.value);
                      setCount((prev) => (prev = prev + 1));
                    }}
                    type="text"
                    className="form-control"
                    id="sale"
                  />
                </div>
              </div>
              <div className="col-4">
                <div className="mb-3">
                  <label htmlFor="category" className="form-label">
                    Categogy
                  </label>
                  <select
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setCount((prev) => (prev = prev + 1));
                    }}
                    class="form-select"
                    aria-label="Default select example"
                    style={{
                      padding: "0.375rem 2.25rem 0.375rem 0.75rem !important",
                    }}
                  >
                    <option value="">Filter By Category</option>
                    {categories.length > 0 &&
                      categories.map((e, i) => (
                        <option
                          selected={category === e.category_id}
                          key={i}
                          value={e.category_id}
                        >
                          {e.description}
                        </option>
                      ))}
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-4">
                  <div className="mb-3">
                    <label className="form-label">Images</label>
                    {product.sources ? (
                      <div
                        className="admin-image-container"
                        style={{
                          backgroundImage: `url(${product.sources[0]})`,
                        }}
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal"
                      >
                        +{product.sources.length - 1}
                      </div>
                    ) : (
                      <div
                        style={{
                          backgroundColor: "rgb(159, 159, 159)",
                          fontSize: "50px",
                        }}
                        className="admin-image-container"
                      >
                        No Images
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {!isEdit ? (
              <button disabled type="submit" className="btn btn-primary me-3">
                Save
              </button>
            ) : (
              <button type="submit" className="btn btn-primary me-3">
                Save
              </button>
            )}

            <Link className="btn btn-danger" to="/admin/products">
              Cancel
            </Link>
          </form>
        </div>
      </div>
      <Modal />
    </>
  );
};

export default ProductDetail;
