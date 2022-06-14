import React, { useEffect, useState } from "react";
import Employee from "./Employee";
import { axios } from "axios";
import EmployeeApi from "./../apis/EmployeeApi";

// const EmployeeApi = (url = "https://localhost:44336/api/Employee") => {
//   return {
//     fetchAll: () => {
//       axios.get(url);
//     },

//     create: (newRecord) => {
//       axios.post(url, newRecord);
//     },

//     update: (id, updatedRecord) => {
//       axios.put(url + id, updatedRecord);
//     },

//     delete: (id) => {
//       axios.delete(url + id);
//     },
//   };
// };

const EmployeeList = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [recordForEdit, setRecordForEdit] = useState(null);

  function refreshEmployeeList() {
    EmployeeApi.getAll()
      .then((result) => {
        console.log(result.data);
        setEmployeeList(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    refreshEmployeeList();
  }, []);

  const addOrEdit = (formData, onSuccess) => {
    if (formData.get("employeeId") == "0") {
      EmployeeApi.create(formData)
        .then((res) => {
          onSuccess();
          refreshEmployeeList();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      EmployeeApi.update(formData.get("employeeId"), formData)
        .then((res) => {
          onSuccess();
          refreshEmployeeList();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const shoeRecordDetail = (data) => {
    setRecordForEdit(data);
  };

  const onDelete = (e, id) => {
    e.stopPropagation();
    if (window.confirm("Are you sure to delete this record?")) {
      EmployeeApi.remove(id)
        .then((res) => {
          refreshEmployeeList();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const imageCard = (data) => {
    return (
      <>
        <div
          className="card"
          onClick={() => {
            shoeRecordDetail(data);
          }}
        >
          <img
            src={data.imageSrc}
            width={100}
            height={100}
            alt={data.imageName}
            className="card-img-top rounded-circle"
          />
          <div className="card-body">
            <h5>{data.employeeName}</h5>
            <span>{data.occupation}</span> <br />
            <button
              className="btn btn-light delete-button"
              onClick={(e) => {
                onDelete(e, parseInt(data.employeeId));
              }}
            >
              <i className="fa fa-trash-alt"></i>
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com"
              />
              <label htmlFor="floatingInput">Employee Register</label>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <Employee addOrEdit={addOrEdit} recordForEdit={recordForEdit} />
        </div>
        <div className="col-md-8">
          <div>List of employee records</div>
          <table>
            <tbody>
              {
                // //tr > 3 td
                [...Array(Math.ceil(employeeList.length / 3))].map((e, i) => (
                  <tr key={i}>
                    <td>{imageCard(employeeList[3 * i])}</td>
                    <td>
                      {employeeList[3 * i + 1]
                        ? imageCard(employeeList[3 * i + 1])
                        : null}
                    </td>
                    <td>
                      {employeeList[3 * i + 2]
                        ? imageCard(employeeList[3 * i + 2])
                        : null}
                    </td>
                  </tr>
                ))

                // employeeList.map((employee) => (
                //   <tr>
                //     <td>
                //       <div className="card">
                //         <img
                //           src={employee.imageSrc}
                //           width={100}
                //           height={100}
                //           className="card-img-top rounded-circle"
                //         />
                //         <div className="card-body">
                //           <h5>{employee.employeeName}</h5>
                //           <span>{employee.occupation}</span>
                //         </div>
                //       </div>
                //     </td>
                //   </tr>
                // ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default EmployeeList;
