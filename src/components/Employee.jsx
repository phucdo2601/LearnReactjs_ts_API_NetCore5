import React, { useEffect, useState } from "react";

const defaultImageSrc =
  "https://media.istockphoto.com/vectors/brunette-young-man-profile-avatar-beautiful-guy-face-male-cartoon-vector-id1253024021?s=612x612";

const initialFiledValues = {
  employeeId: 0,
  employeeName: "",
  occupation: "",
  imageName: "",
  imageSrc: defaultImageSrc,
  imageFile: null,
};

const Employee = (props) => {
  const { addOrEdit, recordForEdit } = props;

  const [values, setValues] = useState(initialFiledValues);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (recordForEdit != null) {
      setValues(recordForEdit);
    }
  }, [recordForEdit]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const showPreview = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };

      reader.readAsDataURL(imageFile);
    } else {
      setValues({
        ...values,
        imageFile: null,
        imageSrc: defaultImageSrc,
      });
    }
  };

  const validate = () => {
    let temp = {};
    temp.employeeName = values.employeeName === "" ? false : true;
    temp.imageSrc = values.imageSrc === defaultImageSrc ? false : true;

    setErrors(temp);
    return Object.values(temp).every((x) => x === true);
  };

  const resetForm = () => {
    setValues(initialFiledValues);
    document.getElementById("image-uploader").value = null;
    setErrors({});
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const formData = new FormData();
      formData.append("employeeId", values.employeeId);
      formData.append("employeeName", values.employeeName);
      formData.append("occupation", values.occupation);
      formData.append("imageName", values.imageName);
      formData.append("imageFile", values.imageFile);
      addOrEdit(formData, resetForm);
    }
  };

  const applyErrorClass = (field) =>
    field in errors && errors[field] === false ? "invalid-field" : "";

  return (
    <>
      <div className="container text-center">
        <p className="lead">An Employee</p>
      </div>

      <form autoComplete="off" noValidate onSubmit={handleFormSubmit}>
        <div className="card">
          <img
            src={values.imageSrc}
            alt={values.imageName}
            className="card-img-top"
          />
          <div className="card-body">
            <div className="form-group">
              <input
                className={"form-control-file " + applyErrorClass("imageSrc")}
                type="file"
                onChange={showPreview}
                id="image-uploader"
              />
            </div>

            <div className="form-group">
              <input
                className={"form-control " + applyErrorClass("employeeName")}
                placeholder="Emmploye Name"
                name="employeeName"
                type="text"
                value={values.employeeName}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <input
                className="form-control"
                placeholder="Occupation"
                name="occupation"
                type="text"
                value={values.occupation}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Employee;