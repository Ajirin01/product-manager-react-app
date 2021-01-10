import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '@/Utils';
import { productService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [products, setProducts] = useState(null);

    useEffect(() => {
        productService.getAll().then(x => {
            const res = x.Response.products;
            setProducts(res);
        });
    }, []);

    function deleteProduct(id, data) {
        setProducts(products.map(x => {
            if (x._id === id) { x.isDeleting = true; }
            return x;
        }));
        productService.delete(id, data).then((res) => {
            console.log(res.Response)
            setProducts(products => products.filter(x => x._id !== id));
        });
    }

    return (
        <div>
            <h1>Products</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Product</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Product Name</th>
                        <th style={{ width: '30%' }}>Product Price</th>
                        <th style={{ width: '30%' }}>Product Image URL</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map(product =>
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.image}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${product._id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>

                                <button onClick={() => deleteProduct(product._id,{'isAdmin': false})} className="btn btn-sm btn-danger btn-delete-product" disabled={product.isDeleting}>
                                    {product.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                                {getToken()}
                            </td>
                        </tr>
                    )}
                    {!products &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {products && !products.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Products To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };