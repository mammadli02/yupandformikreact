import { useFormik } from "formik";
import { BasicFormValidation } from "./schema";
import { v4 as uuidv4 } from 'uuid';
import "./form.css";

const BasicForm = () => {
  //form submit function
  const handleSubmit = async(values, actions) => {
    values.id = uuidv4();
    console.log(values);
    // await axios.post("random_url",values);
    actions.resetForm();
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      discountPercentage: "",
      imageURL: "",
      unitsInStock: "",
    },
    onSubmit: handleSubmit,
    validationSchema: BasicFormValidation,
  });

  return (
<div style={{width:'40%', boxShadow:'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;',margin:'0 auto', border:'1px solid' ,borderRadius:'10px', height:'350px',padding:'30px' }}>

    <form onSubmit={formik.handleSubmit} >
    <h1 style={{textAlign:'center'}}>Add Products</h1>
      <input    style={{display:'block', marginBottom:'10px', width:'90%'}}
        className={
          formik.errors.name && formik.touched.name ? "input-error" : ""
        }
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.name}
        name="name"
        placeholder="Enter Name"
        type="text"
      />
      {formik.errors.name && formik.touched.name && (
        <span style={{ color: "red" }}>{formik.errors.name}</span>
      )}
      <input style={{display:'block', marginBottom:'10px', width:'90%'}}
        className={formik.errors.price && formik.touched.price ? "input-error" : ""}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.price}
        name="price"
        placeholder="Enter Price"
        type="number"
      />
      {formik.errors.price && formik.touched.price && (
        <span style={{ color: "red" }}>{formik.errors.price}</span>
      )}
      <input   style={{display:'block', marginBottom:'10px',width:'90%'}}
        className={
          formik.errors.discountPercentage && formik.touched.discountPercentage ? "input-error" : ""
        }
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.discountPercentage}
        name="discountPercentage"
        placeholder="Enter DiscountPercentage"
        type="number"
      />
      {formik.errors.discountPercentage && formik.touched.discountPercentage && (
        <span style={{ color: "red" }}>{formik.errors.discountPercentage}</span>
      )}
      <input    style={{display:'block', marginBottom:'10px', width:'90%'}}
        className={
          formik.errors.imageURL && formik.touched.imageURL ? "input-error" : ""
        }
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.imageURL}
        name="imageURL"
        placeholder="Enter ImageURL"
        type="imageURL"
      />
     
      <input   style={{display:'block', marginBottom:'10px', width:'90%'}}
        className={
          formik.errors.unitsInStock && formik.touched.unitsInStock
            ? "input-error" : ""
        }
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        value={formik.values.unitsInStock}
        name="unitsInStock"
        placeholder="Enter unitsInStock"
        type="number"
      />
      {formik.errors.unitsInStock && formik.touched.unitsInStock && (
        <span style={{ color: "red" }}>{formik.errors.unitsInStock}</span>
      )}
    
     <button style={{display:'block',margin:'10px auto' , width:'30%',backgroundColor:'green', border:'none', padding:'10px', color:'white'}} disabled={formik.isSubmitting || Object.keys(formik.errors).length>0} type="submit">Submit Form</button>
    </form>
    </div>
  );
};

export default BasicForm;
