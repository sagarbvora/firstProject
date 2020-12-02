import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const numOfCountries = [
    {value: "", label: "Please Select..."},
    {value: "India", label: "India"},
    {value: "America", label: "America"},
    {value: "Nepal", label: "Nepal"},
    {value: "Africa", label: "Africa"},
    {value: "Pakistan", label: "Pakistan"},
];

function Hook_CRUD() {
    const [userDetails, setUserDetails] = useState({});
    const [list, setList] = useState([]);
    const [isEditable, setEditableIndex] = useState(null);
    const [showForm, setShowForm] = React.useState(true);
    const [errors, setValidation] = React.useState({});


    const validate = (name, value) => {
        const numRegx = /^\d{1,6}(?:\.\d{0,2})?$/g;
        switch (name) {
            case 'firstName':
                if (!value) return "First Name is required";
                return null;
            case 'lastName':
                if (!value) return "Last Name is required";
                return null;
            case 'age':
                if (!numRegx.test(value)) return "Age is required";
                return null;
            case 'gender':
                if (!value) return "Gender is required";
                return null;
            case 'address':
                if (!value) return "Address is required";
                return null;
            case 'country':
                if (!value) return "Country is required";
                return null;
            default:
                return null;
        }
    };

    const onChange = (event) => {
        const {name, value, checked} = event.target;
        if (name === "isActive") {
            setUserDetails({...userDetails, [name]: checked});
        } else {
            setUserDetails({...userDetails, [name]: value});
        }
    }
    //toggle button
    const onAddForm = () => {
        setShowForm(!showForm);
    }

    const handleSubmit = () => {
        let errorsObj = {}
        const newUserDetails = {
            firstName: userDetails.firstName,
            lastName: userDetails.lastName,
            age: userDetails.age,
            gender: userDetails.gender,
            address: userDetails.address,
            country: userDetails.country,
        }
        Object.keys(newUserDetails).forEach((key) => {
            const error = validate(key, newUserDetails[key]);
            if (error && error.length) {
                errorsObj[key] = error;
            }
        });
        if (Object.keys(errorsObj).length > 0) {
            return setValidation(errorsObj);
        } else {
            if (isEditable !== null && isEditable !== -1) {
                list[isEditable] = userDetails;
            } else {
                setList([...list, userDetails]);
            }
            setUserDetails({});
            setEditableIndex(null);
            setShowForm(!showForm);
            setValidation({});
        }
    }
    const EditData = (index) => {
        setShowForm(!showForm);
        setUserDetails(list[index]);
        setEditableIndex(index);
    }
    const DeleteData = (index) => {
        setList(list.filter((value, i) => {
            return i !== index;
        }));
    }
    return (
        <>
            <div className="container">
                <button className="btn-primary" type="button" onClick={onAddForm}>Add New</button>
                <div className="row">
                    <div className="table-responsive">
                        <table className="table">
                            <thead className="text-center">
                            <tr className="table-striped">
                                <th>First name</th>
                                <th>Last name</th>
                                <th>Age</th>
                                <th>Action</th>
                            </tr>
                            </thead>
                            <tbody className="text-center">
                            {Array.isArray(list) && list.map((item, index) => {
                                return (
                                    <tr key={index} id={index}>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.age}</td>
                                        <td>
                                            <Button variant="outlined" color="primary"
                                                    onClick={() => {
                                                        EditData(index)
                                                    }}>
                                                <EditIcon/>
                                            </Button>
                                            &nbsp;&nbsp;
                                            <Button variant="outlined" color="secondary" onClick={() => {
                                                DeleteData(index)
                                            }}>
                                                <DeleteIcon/>
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })
                            }
                            </tbody>
                        </table>
                        <br/>
                    </div>
                </div>
                {showForm && <div className="row">

                    <div className="col-md-6">
                        <h2>Registration Form</h2> <br/>
                        <div className="first">
                            First name: <br/>
                            <input
                                className="form-control"
                                name="firstName" type="text"
                                value={userDetails.firstName || ""}
                                placeholder="Enter Your First Name"
                                onChange={onChange}/><br/>
                            <span className="text-danger">{errors.firstName || ""}</span>
                        </div>
                        <div className="second">
                            Last name: <br/>
                            <input
                                className="form-control"
                                name="lastName" type="text"
                                value={userDetails.lastName || ""}
                                placeholder="Enter Your Last Name"
                                onChange={onChange}/><br/>
                            <span className="text-danger">{errors.lastName || ""}</span>
                        </div>
                        <div className="third">
                            Age :<br/>
                            <input
                                className="form-control"
                                type="text" name="age"
                                value={userDetails.age || ""}
                                placeholder="Enter Your Age"
                                onChange={onChange}/><br/>
                            <span className="text-danger">{errors.age || ""}</span>
                        </div>
                        <div className="fourth">
                            Gender : <br/>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                checked={userDetails.gender === "Male"}
                                onChange={onChange} defaultChecked/>Male
                            &nbsp;&nbsp;
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                checked={userDetails.gender === "Female"}
                                onChange={onChange}/>Female &nbsp;&nbsp;
                            <input
                                type="radio"
                                name="gender"
                                value="Others"
                                checked={userDetails.gender === "Others"}
                                onChange={onChange}/>Others<br/><br/>
                            <span className="text-danger">{errors.gender || ""}</span>
                        </div>
                        <div className="fifth">
                            Address : <br/>
                            <textarea
                                className="form-control"
                                cols="25"
                                rows="4"
                                name="address"
                                value={userDetails.address || ""}
                                placeholder="Enter Your Address"
                                onChange={onChange}>
                         </textarea>
                            <span className="text-danger">{errors.address || ""}</span>
                        </div>
                        <div className="sixth">
                            Country : <br/>
                            <select
                                className="form-control"
                                name="country"
                                value={userDetails.country || ""}
                                required onChange={onChange}>

                                {numOfCountries.map((numOfCountry, index) => <option key={numOfCountry.value}
                                                                                     disabled={index === 0}
                                                                                     value={numOfCountry.value}>{numOfCountry.label}</option>)}
                            </select><br/>
                            <span className="text-danger">{errors.country || ""}</span>
                        </div>
                        <div className="seventh">
                            <input
                                type="checkbox"
                                name="isActive"
                                value="I Agree the Terms & Conditions"
                                checked={userDetails.isActive}
                                onChange={onChange}/>&nbsp;
                            <label>I Agree the Terms & Conditions</label><br/>
                        </div>

                        <Button variant="contained" color="primary" component="span"
                                onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>}
            </div>
        </>
    )
}

export default Hook_CRUD;