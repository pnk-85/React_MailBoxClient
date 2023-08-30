import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";

import { receivedActions } from "../Store/recieved";
import { sentActions } from "../Store/sent";

const useHttp = () => {
  const dispatch = useDispatch();

  const [error, setError] = useState(null);

  const getRequest = async (url, act) => {
    try {
      const response = await axios.get(url);

      if (response.data) {
        const firebaseIDs = Object.keys(response.data);
        // console.log("firebaseIDs", firebaseIDs);
        const newItems = [];
        Object.values(response.data).forEach((el) => {
          newItems.push({
            ...el.body,
            id: firebaseIDs[newItems.length],
            key: firebaseIDs[newItems.length],
          });
        });
        if (act === "received") {
          dispatch(receivedActions.getReceivedMail(newItems));
        } else {
          dispatch(sentActions.getSentMail(newItems));
        }
      }

      //   setData(response.data);
    } catch (error) {
      setError(error);
    }
  };

  const postRequest = async (url, payload, act) => {
    try {
      const response = await axios.post(url, { body: payload });

      if (act === "sent") {
        const mail = {
          ...payload,
          key: response.data.name,
          id: response.data.name,
        };
        dispatch(sentActions.addEmail(mail));
        alert("Email sent successfully");
      }
    } catch (error) {
      setError(error);
    }
  };

  const deleteRequest = async (url, payload, act) => {
    try {
      await axios.delete(url);

      if (act === "sent") {
        dispatch(sentActions.removeEmail(payload));
      } else {
        dispatch(receivedActions.removeEmail(payload));
      }
    } catch (error) {
      setError(error);
    }
  };

  const putRequest = async (url, payload) => {
    try {
      await axios.put(url, { body: payload });
      dispatch(receivedActions.readMail(payload));
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return { error, getRequest, postRequest, putRequest, deleteRequest };
};

export default useHttp;