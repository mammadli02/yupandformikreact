import * as yup from "yup";

const  Rules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const BasicFormValidation = yup.object().shape({
  name: yup
    .string()
    .min(4, "name must be at least 4 characters")
    .required("name is required"),
  price: yup
    .number()
    .positive("price cannot be negative number")
    .integer()
    .required("price is required"),
    discountPercentage : yup
    .number()
    .positive("price cannot be negative number")
    .integer()
    .min(0,"discountPercentage  cannot be negative number")
    .max(100,"discountPercentage  cannot be bigger than 100")
    .required("discountPercentage  is required"),
  imageURL : yup
    .string()
    .required("imageURL  is required"),
    unitsInStock : yup
    .number()
    .positive("unitsInStock cannot be negative number")
    .integer()
    .required("confirm unitsInStock  is required"),
});
