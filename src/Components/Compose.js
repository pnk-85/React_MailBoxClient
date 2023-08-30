import React, { useState, useRef } from "react";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import useHttp from "./Requests/useHttp";



const Compose = (props) => {
    const {postRequest} = useHttp();
    let sentByRegex = localStorage.getItem('email').replace(/[^a-zA-Z0-9]/g, "");

    
    const dataRef = useRef(" ");
    const subjectRef = useRef(" ");
    const toRef = useRef(" ");

    const [content, setContent] = useState('');

    const saveData = () => {

        let toRefRgx = "";
        toRefRgx = toRef.current.value.replace(/[^a-zA-Z0-9 ]/g, "");

        const quill = dataRef.current.getEditor();
        const plainText = quill.getText();


        let bodySent = {
            data: plainText,
            emailSentBy: localStorage.getItem('email'),
            to: toRef.current.value,
            subject: subjectRef.current.value,
        };
        

        let bodyReceived = {
            data: dataRef.current.value,
            receivedFrom: localStorage.getItem("email"),
            myEmail: toRef.current.value,
            subject: subjectRef.current.value,
            read: false,
        };
        console.log(bodyReceived);

        const senturl = `https://mailboxproject-5ca97-default-rtdb.firebaseio.com/${sentByRegex}/sent.json`;
        const receivedurl = `https://mailboxproject-5ca97-default-rtdb.firebaseio.com/${toRefRgx}/received.json`;

        postRequest(senturl, bodySent, "sent");
        postRequest(receivedurl, bodyReceived);

        setContent('');
        subjectRef.current.value = '';
        toRef.current.value = '';


    };




    return (
        <div className="container md-8  p-4">
            <div className="mb-3 row">
                <label className="col-sm-1 col-form-label text-start">To</label>
                <div className="col-sm-11">
                    <input
                        type="email"
                        className="form-control"
                        id="inputPassword"
                        ref={toRef}
                    />
                </div>
            </div>
            <div className="mb-3 row">
                <label className="col-sm-1 col-form-label text-start">
                    Subject{props.name}
                    </label>
                <div className="col-sm-11">
                    <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        ref={subjectRef}
                    />
                </div>
            </div>
            <div className="">
                <ReactQuill
                    onChange={setContent}
                    ref={dataRef}
                    value={content}
                    style={{
                        height:'200px'
                    }}
                />
            </div>
            <button onClick={saveData} className="btn btn-primary btn-lg mt-5 ">
                Send Email
            </button>
        </div>
    );
};

export default Compose;