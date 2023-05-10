
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// import { toast } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import { Card, Col, Row } from 'antd';

const AddProductForm = () => {
  const initialValues = {
    name: '',
    price: '',
    discountPercentage: '',
    imageURL: '',
    unitsInStock: '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Required').min(4, 'Minimum 4 characters'),
    price: Yup.number().required('Required').positive('Can be positive'),
    discountPercentage: Yup.number().required('Required').min(0, 'Minimum 0').max(100, 'Maximum 100'),
    imageURL: Yup.string().required('Required'),
    unitsInStock: Yup.number().required('Required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const response = await fetch('http://localhost:3000/prpducts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...values, id: Date.now().toString() }),
    });
    if (response.ok) {
      resetForm();
      toast.success('Product added!');
    } else {
      toast.error('Error adding product');
    }
  };
  let [products,setProducts]=useState([]);
 
  useEffect(() => {
    fetch("http://localhost:3000/prpducts")
        .then(res => res.json())
        .then(data => {
          setProducts(data)
        })
}, [])
  return (
    <>
    <div style={{width:'40%', boxShadow:'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',margin:'0 auto', border:'1px solid' ,borderRadius:'10px', height:'300px',padding:'30px' }}>
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <div style={{marginTop:'10px'}}>
            <label htmlFor="name">Name:</label>
            <Field  style={{ marginBottom:'10px', width:'60%'}} type="text" id="name" name="name" />
            <ErrorMessage  name="name" />
          </div>
          <div style={{marginTop:'10px'}}> 
            <label htmlFor="price">Price:</label>
            <Field style={{ marginBottom:'10px', width:'60%'}} type="number" id="price" name="price" />
            <ErrorMessage   name="price" />
          </div>
          <div  style={{marginTop:'10px'}}>
            <label htmlFor="discountPercentage">Discount Percentage:</label>
            <Field style={{ marginBottom:'10px', width:'60%'}} type="number" id="discountPercentage" name="discountPercentage" />
            <ErrorMessage name="discountPercentage" />
          </div>
          <div style={{marginTop:'10px'}}>
            <label htmlFor="imageURL">Image URL:</label>
            <Field  style={{ marginBottom:'10px', width:'60%'}} type="text" id="imageURL" name="imageURL" />
            <ErrorMessage  name="imageURL" />
          </div>
          <div style={{marginTop:'10px'}}>
            <label htmlFor="unitsInStock">Units In Stock:</label>
            <Field style={{ marginBottom:'10px', width:'60%'}} type="number" id="unitsInStock" name="unitsInStock" />
            <ErrorMessage  name="unitsInStock" />
          </div>
          <button style={{display:'block',margin:'10px auto' , width:'30%',backgroundColor:'green', border:'none', padding:'10px', color:'white'}} type="submit" disabled={isSubmitting}>
            Add
          </button>
        </Form>
      )}
    </Formik>
    </div>
<section style={{margin:'100px auto', width:'90%' }}>

<Row gutter={[20,30] }style={{marginBottom:'30px'}} >

{products && products.map((product)=>{
  return(
    <>
    <Col  key={product.id}  span={24} className="gutter-row"  xs={24} sm={24} md={12} lg={6}>
      
      <Card  style={{backgroundColor:'#f0f2f5', fontSize:'15px',height:'400px', fontWeight:'bolder'}}      
       bordered={true} >
        <img style={{width:'200px', height:'200px'}} src={product.imageURL} alt="" />
      <p> {product.name}</p> 
       <p>{product.price}</p> 
     <p>{product.discountPercentage}</p>   
     <p>{product.salary}</p>   
       <p>{product.unitsInStock}</p> 
      </Card>
    </Col>
  </>
  )
  })}

</Row >
</section>
</>
  );
};

export default AddProductForm