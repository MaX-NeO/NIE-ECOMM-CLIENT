import React, { useEffect, useRef, useState } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import { Pencil, Trash, Plus } from "lucide-react";

import { toast } from "sonner";
import { addProduct, allProducts, deleteProduct, editProduct, } from "../../api/api";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editForm, setEditForm] = useState(null);

  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const stockRef = useRef(null);
  const categoryRef = useRef(null);

  const fetchData = async () => {
    try {
      const response = await allProducts();
      if (response.status === 200) {
        setProducts(response.data);
      }
    } catch {
      console.error("Error fetching data!");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    const newproduct = {
      name: nameRef.current?.value || "",
      description: descriptionRef.current?.value || "",
      category: categoryRef.current?.value || "",
      price: Number(priceRef.current?.value) || 0,
      stock: Number(stockRef.current?.value) || 0,
    };

    try {
      const response = await addProduct(newproduct);
      if (response.status === 200) {
        toast.success("Product Added!");
        fetchData();
        setShowAdd(false);
      }
    } catch {
      toast.error("Error while adding product!");
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    if (!editForm) return;
    try {
      const response = await editProduct(editForm, editForm.id);
      if (response.status === 200) {
        toast.success("Product Updated!");
        fetchData();
        setShowEdit(false);
      }
    } catch {
      toast.error("Error while updating product!");
    }
  };

  const handleDelete = async () => {
    if (!selectedProduct) return;
    try {
      const response = await deleteProduct(selectedProduct.id);
      if (response.status === 200) {
        toast.success("Product Deleted!");
        fetchData();
        setShowDelete(false);
      }
    } catch {
      toast.error("Error while deleting product!");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <Spinner animation="border" />
      </div>
    );

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between mb-3">
        <h2 className="fw-bold">Products</h2>
        <Button variant="success" onClick={() => setShowAdd(true)}>
          <Plus className="me-2" /> Add Product
        </Button>
      </div>

      {products.length === 0 ? (
        <Alert variant="info">No Products Available!!</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Category</th>
              <th>Price ($)</th>
              <th>Stock</th>
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>{p.category}</td>
                <td>{p.price}</td>
                <td>{p.stock}</td>
                <td className="text-end">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setEditForm(p);
                      setShowEdit(true);
                    }}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => {
                      setSelectedProduct(p);
                      setShowDelete(true);
                    }}
                  >
                    <Trash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <Modal show={showAdd} onHide={() => setShowAdd(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleAdd}>
          <Modal.Body>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Name</Form.Label>
                <Form.Control ref={nameRef} placeholder="Product name" />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control ref={descriptionRef} placeholder="Description" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select ref={categoryRef}>
                <option value="">Select Category</option>
                <option value="ELECTRONICS">ELECTRONICS</option>
                <option value="FURNITURE">FURNITURE</option>
                <option value="HOME">HOME</option>
                <option value="FASHION">FASHION</option>
              </Form.Select>
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Price</Form.Label>
                <Form.Control ref={priceRef} type="number" />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Stock</Form.Label>
                <Form.Control ref={stockRef} type="number" />
              </Form.Group>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAdd(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="success">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={showEdit} onHide={() => setShowEdit(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        {editForm && (
          <Form onSubmit={handleEdit}>
            <Modal.Body>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  value={editForm.description}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  value={editForm.category}
                  onChange={(e) =>
                    setEditForm({ ...editForm, category: e.target.value })
                  }
                />
              </Form.Group>
              <Row className="mb-3">
                <Form.Group as={Col}>
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm({ ...editForm, price: Number(e.target.value) })
                    }
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label>Stock</Form.Label>
                  <Form.Control
                    type="number"
                    value={editForm.stock}
                    onChange={(e) =>
                      setEditForm({ ...editForm, stock: Number(e.target.value) })
                    }
                  />
                </Form.Group>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEdit(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="primary">
                Save
              </Button>
            </Modal.Footer>
          </Form>
        )}
      </Modal>

      <Modal show={showDelete} onHide={() => setShowDelete(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete{" "}
          <strong>{selectedProduct?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelete(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminProducts;
