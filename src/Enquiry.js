// import {useState} from "react";
// import emailjs from "@emailjs/browser";
// import { useNavigate } from "react-router-dom";

// function Enquiry(){
// 	const[name,setName]=useState("");
// 	const[college,setCollege]=useState("");
// 	const[phone,setPhone]=useState("");
// 	const[query,setQuery]=useState("");
// 	const[ans,setAns]=useState("");
// 	const navigate = useNavigate();

// 	const hName=(event)=>{setName(event.target.value);}
// 	const hCollege=(event)=>{setCollege(event.target.value);}
// 	const hPhone=(event)=>{setPhone(event.target.value);}
// 	const hQuery=(event)=>{setQuery(event.target.value);}
	
// 	const save=(event)=>{
// 		event.preventDefault();
// 		let data={"from_name":name,"from_college":college,
// 		"from_phone":phone,"message":query};
// 		emailjs.send("service_xmdz3bo","template_fqu44qj",data,"fE8gs5RAOY6-sop67")
// 		.then(res=>setAns("WILL COMMUNICATE IN 2 HRS"))
// 		.catch(err=>{console.log(err)});
		 
// 	}
	
// 	return(
// 	<>
// 	<center>
// 	<form onSubmit={save}>
// 	<input type="text" placeholder="Enter your name" onChange={hName}/>
// <br/><br/>
// 	<input type="text" placeholder="Enter your college name" 
// 	onChange={hCollege}/>
// 	<br/><br/>
// 	<input type="number" placeholder="Enter your phone number" onChange={hPhone}/>
// 	<br/><br/>
// 	<textarea placeholder="Enter your query" rows={5} cols={30} onChange={hQuery}/>
// 	<br/><br/>
// 	<input type="Submit"/>
// 	</form>
// 	<h1>{ans}</h1>
//                 {/* <form onSubmit={BMI}>
//         <input type="submit" value="BMI"/>
//                 </form> */}

// 	</center>
// 	</>
// 	);
// }
// export default Enquiry;
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

function Enquiry() {
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [phone, setPhone] = useState("");
  const [query, setQuery] = useState("");
  const [ans, setAns] = useState("");
  const [errorMessages, setErrorMessages] = useState({
    name: "",
    college: "",
    phone: "",
    query: "",
  });

  const navigate = useNavigate();

  const hName = (event) => {
    setName(event.target.value);
    setErrorMessages({ ...errorMessages, name: "" });
  };

  const hCollege = (event) => {
    setCollege(event.target.value);
    setErrorMessages({ ...errorMessages, college: "" });
  };

  const hPhone = (event) => {
    setPhone(event.target.value);
    setErrorMessages({ ...errorMessages, phone: "" });
  };

  const hQuery = (event) => {
    setQuery(event.target.value);
    setErrorMessages({ ...errorMessages, query: "" });
  };

  const save = (event) => {
    event.preventDefault();

    // Validate input fields
    let valid = true;
    const newErrorMessages = { ...errorMessages };

    if (!name.trim()) {
      newErrorMessages.name = "Name is required.";
      valid = false;
    }

    if (!college.trim()) {
      newErrorMessages.college = "College name is required.";
      valid = false;
    }

    if (!phone.trim()) {
      newErrorMessages.phone = "Phone number is required.";
      valid = false;
    }

    if (!query.trim()) {
      newErrorMessages.query = "Query is required.";
      valid = false;
    }

    setErrorMessages(newErrorMessages);

    if (valid) {
      // If all fields are filled, proceed with sending email
      let data = {
        "from_name": name,
        "from_college": college,
        "from_phone": phone,
        "message": query,
      };

      emailjs
        .send("service_xmdz3bo", "template_fqu44qj", data, "fE8gs5RAOY6-sop67")
        .then((res) => setAns("WILL COMMUNICATE IN 2 HRS"))
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      <div className="enquiry-container">
        <center>
          <form onSubmit={save}>
            <div className="form-group-enquiry">
              <label htmlFor="name" className="input-label-enquiry">
                Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="name"
                className="form-input"
                placeholder="Enter your name"
                onChange={hName}
                value={name}
                required
              />
              {errorMessages.name && (
                <p style={{ color: "red" }}>{errorMessages.name}</p>
              )}
            </div>
            <div className="form-group-enquiry">
              <label htmlFor="college" className="input-label-enquiry">
                College Name <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="college"
                className="form-input"
                placeholder="Enter your college name"
                onChange={hCollege}
                value={college}
                required
              />
              {errorMessages.college && (
                <p style={{ color: "red" }}>{errorMessages.college}</p>
              )}
            </div>
            <div className="form-group-enquiry">
              <label htmlFor="phone" className="input-label-enquiry">
                Phone Number <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                id="phone"
                className="form-input"
                placeholder="Enter your phone number"
                onChange={hPhone}
                value={phone}
                required
              />
              {errorMessages.phone && (
                <p style={{ color: "red" }}>{errorMessages.phone}</p>
              )}
            </div>
            <div className="form-group-enquiry">
              <label htmlFor="query" className="input-label-enquiry">
                Query <span style={{ color: "red" }}>*</span>
              </label>
              <textarea
                id="query"
                className="form-input"
                placeholder="Enter your query"
                rows={5}
                cols={30}
                onChange={hQuery}
                value={query}
                required
              />
              {errorMessages.query && (
                <p style={{ color: "red" }}>{errorMessages.query}</p>
              )}
            </div>
            <input type="submit" value="Submit" />
          </form>
          <h1>{ans}</h1>
        </center>
      </div>
    </>
  );
}

export default Enquiry;
