import React, { useState, useRef } from "react";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from "axios";
import { useDispatch } from "react-redux";
import { sentActions } from './Store/sent';



const Compose = () => {
    let sentByRegex = localStorage.getItem('email').replace(/[^a-zA-Z0-9]/g, "");

    const dispatch = useDispatch();
    const dataRef = useRef(" ");
    const subjectRef = useRef(" ");
    const toRef = useRef(" ");

    const [content, setContent] = useState('');

    const saveData = () => {

        let toRefRgx = "";
        toRefRgx = toRef.current.value.replace(/[^a-zA-Z0-9 ]/g, "");
        let bodySent = {
            data: dataRef.current.value,
            emailSentBy: localStorage.getItem('email'),
            to: toRef.current.value,
            subject: subjectRef.current.value,
        };
        console.log(bodySent);

        let bodyReceived = {
            data: dataRef.current.value,
            receivedFrom: localStorage.getItem("email"),
            myEmail: toRef.current.value,
            subject: subjectRef.current.value,
            read: false,
        };
        console.log(bodyReceived);


        axios
            .post(`https://mailboxproject-5ca97-default-rtdb.firebaseio.com/${sentByRegex}/sent.json`,
                { body: bodySent }
            )
            .then((res) => {
                const mail = {
                    ...bodySent,
                    key: res.data.name,
                    id: res.data.name,
                };
                dispatch(sentActions.addEmail(mail));
                console.log(res.data.name);
            });
        axios
            .post(
                `https://mailboxproject-5ca97-default-rtdb.firebaseio.com/${toRefRgx}/received.json`,
                { body: bodyReceived }
            )
            .then((res) => {
                console.log(res.data.name);
            });
    };




    return (
        <div className="container md-8  p-4" style={{ height: "500px" }}>
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
                <label className="col-sm-1 col-form-label text-start">Subject</label>
                <div className="col-sm-11">
                    <input
                        type="text"
                        className="form-control"
                        id="inputPassword"
                        ref={subjectRef}
                    />
                </div>
            </div>
            <div className="" style={{ height: " 330px", overflow: "auto" }}>
                <textarea
                    rows="10"
                    cols="135"
                    onChange={(e) => setContent(e.target.value)}
                    ref={dataRef}
                    value={content}
                />
            </div>
            <button onClick={saveData} className="btn btn-primary btn-lg ">
                Send
            </button>
        </div>
    );
};

export default Compose;