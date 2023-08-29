import React from "react";


const ReadMail = (props) => {

    const closeReadingHandler = (props) => {
        props.setIsReadMail = false;
    }


    return (
        <div>
            <div className="container-fluid border">
                {console.log('props.item', props.item.data)}
                <div className="float-start">
                    <button className="btn btn-secondary float-start" onClick={closeReadingHandler}
                    > Back
                    </button>
                </div>
                <br/>
                <br/>
                <h6 className="text-start py-2">
                    From: <span>{props.item.receivedFrom}</span>
                </h6>
                <h6 className="text-satrt py-2">
                    Subject: <span>{props.item.subject}</span>
                </h6>
                <h6 className="text-satrt py-2">
                    Content: <span>{props.item.data}</span>
                </h6>
            </div>
        </div>
    );
};

export default ReadMail;