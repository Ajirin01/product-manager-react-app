import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { productService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Product Name is required'),
        price: Yup.string()
            .required('Price is required'),
        description: Yup.string()
            .required('Product description is required'),
        image: Yup.string()
            .required('Product image url is required'),
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createProduct(data)
            : updateProduct(id, data);
    }

    function createProduct(data) {
        return productService.create(data)
            .then(() => {
                alertService.success('Product added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateProduct(id, data) {
        return productService.update(id, data)
            .then(() => {
                alertService.success('Product updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    const [product, setProduct] = useState({});

    useEffect(() => {
        if (!isAddMode) {
            // get product and set form fields
            productService.getById(id).then(product => {
                const fields = ['name', 'price', 'description', 'image'];
                fields.forEach(field => setValue(field, product.Response.product[field]));
                setProduct(product.Response.product);
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Product' : 'Edit Product'}</h1>
            <div className="form-row">
                <div className="form-group col-12">
                    <label>Product Name</label>
                    <input name="name" type="text" ref={register} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
                <div className="form-group col-12">
                    <label>Product Price</label>
                    <input name="price" type="text" ref={register} className={`form-control ${errors.price ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.price?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-12">
                    <label>Product Description</label>
                    <input name="description" type="text" ref={register} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.description?.message}</div>
                </div>
                <div className="form-group col-12">
                    <label>Product Image URL</label>
                    <input name="image" type="text" ref={register} className={`form-control ${errors.image ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.image?.message}</div>
                </div>
            </div>
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export { AddEdit };