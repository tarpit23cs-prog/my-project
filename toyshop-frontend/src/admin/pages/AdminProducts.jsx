import { useEffect, useState } from "react";
import {
  getAllProducts,
  addProduct,
  deleteProduct,
  updateProduct
} from "../services/adminService";
import { useNavigate } from "react-router-dom";

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
    stock: ""
  });
  const [editId, setEditId] = useState(null);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await getAllProducts();
    if (res.success) setProducts(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const payload = {
      name: form.name,
      description: form.description,
      image: form.image,
      price: Number(form.price),
      stock: Number(form.stock)
    };

    if (editId) {
      await updateProduct(editId, payload);
      setEditId(null);
    } else {
      await addProduct(payload);
    }

    setForm({
      name: "",
      description: "",
      image: "",
      price: "",
      stock: ""
    });

    loadProducts();
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setForm(product);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    await deleteProduct(id);
    loadProducts();
  };

  return (
    <div className="container mt-5 pt-5">
      <h2 className="mb-4">Admin – Products</h2>

      {/* FORM */}
      <div className="card mb-4">
        <div className="card-body">
          <div className="row g-3">
            <div className="col-md-4">
              <input className="form-control" name="name" placeholder="Name" value={form.name} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="price" placeholder="Price" value={form.price} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <input className="form-control" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <input className="form-control" name="image" placeholder="Image URL" value={form.image} onChange={handleChange} />
            </div>
            <div className="col-md-6">
              <input className="form-control" name="description" placeholder="Description" value={form.description} onChange={handleChange} />
            </div>
            <div className="col-12">
              <button className={`btn ${editId ? "btn-warning" : "btn-primary"}`} onClick={handleSubmit}>
                {editId ? "Update Product" : "Add Product"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCT LIST */}
      <div className="row">
        {products.map((p) => (
          <div className="col-md-4 mb-3" key={p._id}>
            <div className="card h-100">
              {p.image && (
                <img src={p.image} className="card-img-top" style={{ height: 180, objectFit: "contain" }} />
              )}
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>
                <p className="fw-bold">₹{p.price}</p>
                <p>Stock: {p.stock}</p>
              </div>
              <div className="card-footer d-flex justify-content-between">
                <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(p)}>Edit</button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;
