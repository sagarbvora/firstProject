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
    const [isEditable,setEditableIndex] = useState(null);
    const [showResults, setShowResults] = React.useState(true)

    const onChange = (event) => {
        const {name, value,checked} = event.target;
        if (name === "isActive"){
            setUserDetails({...userDetails,[name]:checked});
        }else {
            setUserDetails({...userDetails, [name]: value});
        }
    }
    //toggle button
    const onClick = () =>{
        setShowResults(!showResults);
        setUserDetails({});
    }

    const handleSubmit = (event) => {
        if (isEditable !== null){
            list[isEditable] = userDetails;
        }else{
            setList([...list, userDetails]);
        }
        setUserDetails({});
        setShowResults(!showResults)
    }
    const EditData = (index) => {
        setShowResults(!showResults);
        setUserDetails(list[index]);
        setEditableIndex(index);
    }
    const DeleteData = (index) => {
        setList(list.filter((value,i) =>{
            return i !== index;
        }));
    }
    return (
    <>
        <div className="container">
            <button className="btn-primary" type="button" onClick={onClick}>Add New</button>
            <div className="row">
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr className="table-striped">
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {Array.isArray(list) && list.map((item, index) => {
                            return (
                                <tr key={index} id={index}>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.age}</td>
                                    <td>
                                        <Button variant="outlined" color="primary" href="#outlined-buttons"
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
            { showResults && <div className="row>">

                <div className="col-md-6">
                    <h2>Registration Form</h2> <br/>
                    First name: <br/>
                    <input className="form-control" name="firstName" type="text"  value={userDetails.firstName || ""}
                           placeholder="Enter Your First Name" onChange={onChange}/><br/>
                    Last name: <br/>
                    <input className="form-control" name="lastName" type="text" value={userDetails.lastName || ""}
                           placeholder="Enter Your Last Name" onChange={onChange}/><br/>
                    Age :<br/>
                    <input className="form-control" type="text" name="age" value={userDetails.age || ""}
                           placeholder="Enter Your Age" onChange={onChange}/><br/>
                    Gender : <br/>
                    <input type="radio" name="gender" value="Male" checked={userDetails.gender === "Male"}
                           onChange={onChange}/>Male
                    <input type="radio" name="gender" value="Female" checked={userDetails.gender === "Female"}
                           onChange={onChange}/>Female
                    <input type="radio" name="gender" value="Others" checked={userDetails.gender === "Others"}
                           onChange={onChange}/>Others<br/><br/>
                    Address : <br/>
                    <textarea className="form-control" cols="25" rows="4" name="address"
                              value={userDetails.address || ""} placeholder="Enter Your Address" onChange={onChange}>
                </textarea>
                    Country : <br/>
                    <select className="form-control" name="country" id="country" value={userDetails.country || ""}
                            required onChange={onChange}>
                        {numOfCountries.map((numOfCountry, index) => <option key={numOfCountry.value}
                                                                             disabled={index === 0}
                                                                             value={numOfCountry.value}>{numOfCountry.label}</option>)}
                    </select><br/>
                    <input type="checkbox" name="isActive" value="I Agree the Terms & Conditions" checked={userDetails.isActive} onChange={onChange}/>&nbsp;
                    <label>I Agree the Terms & Conditions</label><br/>
                    <Button variant="contained" color="primary" component="span" onClick={handleSubmit}>Submit</Button>
                </div>
            </div> }
        </div>
    </>
)
}

export default Hook_CRUD;