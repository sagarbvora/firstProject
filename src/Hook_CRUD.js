import React, {useState} from "react";
import {Col, Row} from "react-bootstrap";
import Button from "@material-ui/core/Button";
import "./CrudData.css";
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
const initialData = {
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    address: "",
    country: "",
    isActive: "",
}
function Hook_CRUD() {
    const [userDetails,setUserDetails] = useState(initialData);
    const [list,setList] = useState([]);
    const [errors,setValidation] = useState({});

    const onChange = () => {

    }
    const handleSubmit = () => {
        console.log("Submit");
    }
    return (
        <>
            <Col md={12}>
                <div className="form-div">
                    <Row className="mt-3">
                        <Col md={2} className="text-center">First Name</Col>
                        <Col md={8}>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="First Name"
                                // value={name}
                                name="firstName"
                                onChange={onChange}
                                maxLength={100}
                            />
                            {/*<span className="text-danger">{errors.Name}</span>*/}
                        </Col>
                    </Row>
                    <Row className="mt-3">
                        <Col md={2} className="text-center">Last Name</Col>
                        <Col md={8}>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Last Name"
                                // value={organization.Name}
                                name="lastName"
                                onChange={onChange}
                                maxLength={100}
                            />
                            {/*<span className="text-danger">{errors.Name}</span>*/}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col md={2} className="text-center">Age</Col>
                        <Col md={8}>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Age"
                                // value={organization.Abbrevlation}
                                name="Age"
                                onChange={onChange}
                                maxLength={100}
                            />
                            {/*<span className="text-danger">{errors.Abbrevlation}</span>*/}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col md={2} className="text-center">Gender</Col>
                        <Col md={8}>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" onChange={onChange}
                                       name="gender" value="Male"/>
                                {/*checked={organization.AuthorAnonymous === "Post anonymously"}*/}
                                <label className="form-check-label" htmlFor="gender1">Male</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" onChange={onChange}
                                       name="gender" value="Female"/>
                                {/*checked={organization.AuthorAnonymous === "Post as myself"}*/}
                                <label className="form-check-label" htmlFor="gender2">Female</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" onChange={onChange}
                                       name="gender" value="Other"/>
                                {/*checked={organization.AuthorAnonymous === "Post as myself"}*/}
                                <label className="form-check-label" htmlFor="gender3">Other</label>
                            </div>
                            {/*<span className="text-danger">{errors.AuthorAnonymous}</span>*/}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col className="d-flex" md={2} className="text-center">Address</Col>
                        <Col md={8}>
                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            {/*<span className="text-danger">{errors.Description_Short}</span>*/}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col md={2} className="text-center">Country</Col>
                        <Col md={8}>
                            <select
                                className="form-control"
                                style={{width: '100%'}}
                                name="country"
                                placeholder="Please select..."
                                // value={organization.Nr_Employees || ""}
                                onChange={onChange}
                            >
                                {numOfCountries.map((numOfCountries, index) => <option key={numOfCountries.value}
                                                                                       disabled={index === 0}
                                                                                       value={numOfCountries.value}>{numOfCountries.label}</option>)}
                            </select>
                            {/*<span className="text-danger">{errors.Nr_Employees}</span>*/}
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col md={2}/>
                        <Col md={8}>
                            <input
                                type="checkbox"
                                // value={organization.Contact_Email}
                                name="isActive"
                                onChange={onChange}
                            />
                            <label className="form-check-label" htmlFor="active" className="ml-3 mt-2">is Active</label>
                            {/*<span className="text-danger">{errors.Contact_Email}</span>*/}
                        </Col>
                    </Row>
                    <Row className="mt-2 text-right">
                        <Col md={11}>
                            <Button variant="contained" color="primary" component="span" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </div>
                <Row className="mt-5 text-center">
                    <Col md={12}>
                        <Col md={3}><h2>List</h2></Col>
                        <table>
                            <thead>
                            <tr>
                                <td>Id</td>
                                <td>Name</td>
                                <td>Abbrevlation</td>
                                <td>Email</td>
                                <td>Website</td>
                                <td>Employees</td>
                                <td>Revenue</td>
                                <td>Profit</td>
                                <td>Post</td>
                                <td>Action</td>
                            </tr>
                            </thead>
                            <tbody>
                            {/*{Array.isArray(list) && list.map((item, index) => {*/}
                            {/*    return (*/}
                            {/*        <tr key={index} id={index}>*/}
                            {/*            <td>{index + 1}</td>*/}
                            {/*            <td>{item.Name}</td>*/}
                            {/*            <td>{item.Abbrevlation}</td>*/}
                            {/*            <td>{item.Contact_Email}</td>*/}
                            {/*            <td>{item.Website}</td>*/}
                            {/*            <td>{item.Nr_Employees}</td>*/}
                            {/*            <td>{item.Revenue}</td>*/}
                            {/*            <td>{item.Profit}</td>*/}
                            {/*            <td>{item.AuthorAnonymous}</td>*/}
                            {/*            <td>*/}
                            {/*                <Button variant="outlined" color="primary" href="#outlined-buttons"*/}
                            {/*                        onClick={() => {*/}
                            {/*                            this.EditData(index)*/}
                            {/*                        }}>*/}
                            {/*                    <EditIcon/>*/}
                            {/*                </Button>*/}
                            {/*                &nbsp;&nbsp;*/}
                            {/*                <Button variant="outlined" color="secondary" onClick={() => {*/}
                            {/*                    this.DeleteData(index)*/}
                            {/*                }}>*/}
                            {/*                    <DeleteIcon/>*/}
                            {/*                </Button>*/}
                            {/*            </td>*/}
                            {/*        </tr>*/}
                            {/*    )*/}
                            {/*})*/}
                            {/*}*/}
                            </tbody>
                        </table>
                    </Col>
                </Row>
            </Col>
        </>
    );
}

export default Hook_CRUD;