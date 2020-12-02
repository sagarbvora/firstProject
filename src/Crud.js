import React from 'react';
import "./CrudData.css";
import {Col,Row} from 'react-bootstrap';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const initialOrg = {
    Name: "",
    Abbrevlation: "",
    Contact_Email: "",
    Website: "",
    Nr_Employees: "",
    Revenue: "",
    Profit: "",
    AuthorAnonymous: false
};

const numOfEmployees = [
    {value: "", label: "Please Select..."},
    {value: "1-10", label: "1-10"},
    {value: "11-50", label: "11-50"},
    {value: "51-100", label: "51-100"},
    {value: "101-500", label: "101-500"},
    {value: "More than 500", label: "More than 500"},
];

class OrgForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            organization: initialOrg,
            list: [],
            errors: {},
            isEditable: null
        };
    };

    componentDidMount() {
        let webStore = JSON.parse(localStorage.getItem("list"));
        if (webStore !== null) {
            this.setState({list: webStore});
        }
    }
 
    onChange = (event) => {
        const {name, value} = event.target;
        // console.log(value);
        // this.handleSubmit();
        this.setState(prevState => ({
            organization: {
                ...prevState.organization,
                [name]: value
            }
        }));
    };

    validate = (name, value) => {
        const emailRegx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ig;
        const webRegex = /^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
        const numRegx = /^\d{1,6}(?:\.\d{0,2})?$/g;
        switch (name) {
            case 'Name':
                if (!value) return "Name is required";
                return null;
            case 'Abbrevlation':
                if (!value) return "Abbreviation is required";
                return null;
            case 'Contact_Email':
                if (!emailRegx.test(value)) return "Email is required";
                return null;
            case 'Website':
                if (!webRegex.test(value)) return "Website is required";
                return null;
            case 'Nr_Employees':
                if (!value) return "Number of employee is required";
                return null;
            case 'Revenue':
                if (!numRegx.test(value)) return "Revenue is required";
                return null;
            case 'Profit':
                if (!numRegx.test(value)) return "Profit is required";
                return null;
            case 'AuthorAnonymous':
                if (!(value)) return "Post is selected";
                return null;
            default:
                return null;
        }
    };

    handleSubmit = async () => {
        const {organization, list, isEditable} = this.state;
        let errors = {};
        Object.keys(organization).forEach((key) => {
            const error = this.validate(key, organization[key]);
            if (error && error.length) {
                errors[key] = error;
            }
        });
        if (Object.keys(errors).length) {
            return this.setState({errors});
        } else {
            if (isEditable !== null && isEditable !== -1) {
                list[isEditable] = organization;
                this.setState({
                    list,
                    organization: initialOrg,
                    isEditable: null
                });
                localStorage.setItem("list", JSON.stringify(list));
            } else {
                list.push(organization)
                this.setState({
                    list,
                    organization: initialOrg,
                    isEditable: null
                });
                localStorage.setItem("list", JSON.stringify(list));
            }

        }

    };
    EditData = (index) => {
        const {list} = this.state;
        const orgUpdate = {
            Name: list[index].Name,
            Abbrevlation: list[index].Abbrevlation,
            Contact_Email: list[index].Contact_Email,
            Website: list[index].Website,
            Nr_Employees: list[index].Nr_Employees,
            Revenue: list[index].Revenue,
            Profit: list[index].Profit,
            AuthorAnonymous: list[index].AuthorAnonymous
        };
        // console.log(index);
        this.setState({
            organization: orgUpdate,
            isEditable: index
        });
    }
    DeleteData = (index) => {
        const {list} = this.state;
        list.splice(index, 1);
        // list.filter((item)=>{ return item.id !== index});
        this.setState({
            list
        });
        localStorage.removeItem("list");
        localStorage.setItem("list", JSON.stringify(list));
    }

    render() {
        const {organization, errors, list} = this.state;
        return (

            <Col sm={12}>
                <div className="form-div">
                    <Row className="mt-3">
                        <Col md={2} className="text-center">Name</Col>
                        <Col md={8}>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Name"
                                value={organization.Name}
                                name="Name"
                                onChange={this.onChange}
                                maxLength={100}
                            />
                            <span className="text-danger">{errors.Name}</span>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col md={2} className="text-center">Abbrevlation</Col>
                        <Col md={8}>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Abbreviation"
                                value={organization.Abbrevlation}
                                name="Abbrevlation"
                                onChange={this.onChange}
                                maxLength={100}
                            />
                            <span className="text-danger">{errors.Abbrevlation}</span>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col md={2} className="text-center">Email</Col>
                        <Col md={8}>
                            <input
                                type="email"
                                className="form-control form-control-lg"
                                placeholder="Please Enter Your Email..."
                                value={organization.Contact_Email}
                                name="Contact_Email"
                                onChange={this.onChange}
                                maxLength={100}
                            />
                            <span className="text-danger">{errors.Contact_Email}</span>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col md={2} className="text-center">Website</Col>
                        <Col md={8}>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Website"
                                value={organization.Website}
                                name="Website"
                                onChange={this.onChange}
                                maxLength={100}
                            />
                            <span className="text-danger">{errors.Website}</span>
                        </Col>
                    </Row>
                    {/*no. Employees*/}
                    <Row className="mt-2">
                        <Col md={2} className="text-center">Nr Employees</Col>
                        <Col md={8}>
                            <select
                                className="form-control"
                                style={{width: '100%'}}
                                name="Nr_Employees"
                                placeholder="Please select..."
                                value={organization.Nr_Employees || ""}
                                onChange={this.onChange}
                            >
                                {numOfEmployees.map((noOfEmployee, index) => <option key={noOfEmployee.value}
                                                                                     disabled={index === 0}
                                                                                     value={noOfEmployee.value}>{noOfEmployee.label}</option>)}
                            </select>
                            <span className="text-danger">{errors.Nr_Employees}</span>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col md={2} className="text-center">Revenue</Col>
                        <Col md={8}>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Revenue"
                                value={organization.Revenue}
                                name="Revenue"
                                onChange={this.onChange}
                                maxLength={100}
                            />
                            <span className="text-danger">{errors.Revenue}</span>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col md={2} className="text-center">Profit</Col>
                        <Col md={8}>
                            <input
                                type="text"
                                className="form-control form-control-lg"
                                placeholder="Profit"
                                value={organization.Profit}
                                name="Profit"
                                onChange={this.onChange}
                                maxLength={100}
                            />
                            <span className="text-danger">{errors.Profit}</span>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col md={2}/>
                        <Col md={8}>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" onChange={this.onChange}
                                       name="AuthorAnonymous" value="Post anonymously"
                                       checked={organization.AuthorAnonymous === "Post anonymously"}/>
                                <label className="form-check-label" htmlFor="AuthorAnonymous1">Post anonymously</label>
                            </div>
                            <div className="form-check">
                                <input type="radio" className="form-check-input" onChange={this.onChange}
                                       name="AuthorAnonymous" value="Post as myself"
                                       checked={organization.AuthorAnonymous === "Post as myself"}/>
                                <label className="form-check-label" htmlFor="AuthorAnonymous2">Post as myself</label>
                            </div>
                            <span className="text-danger">{errors.AuthorAnonymous}</span>
                        </Col>
                    </Row>
                    <Row className="mt-2 text-right">
                        <Col md={11}>
                            <Button variant="contained" color="primary" component="span" onClick={this.handleSubmit}>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </div>
                <Row className="mt-5 text-center">
                    <Col md={12}>
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
                            {Array.isArray(list) && list.map((item, index) => {
                                return (
                                    <tr key={index} id={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.Name}</td>
                                        <td>{item.Abbrevlation}</td>
                                        <td>{item.Contact_Email}</td>
                                        <td>{item.Website}</td>
                                        <td>{item.Nr_Employees}</td>
                                        <td>{item.Revenue}</td>
                                        <td>{item.Profit}</td>
                                        <td>{item.AuthorAnonymous}</td>
                                        <td>
                                            <Button variant="outlined" color="primary" href="#outlined-buttons"
                                                    onClick={() => {
                                                        this.EditData(index)
                                                    }}>
                                                <EditIcon/>
                                            </Button>
                                            &nbsp;&nbsp;
                                            <Button variant="outlined" color="secondary" onClick={() => {
                                                this.DeleteData(index)
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
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default OrgForm;