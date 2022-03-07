import classes from "./CSS/List.module.css";
import NamePartyResult from "./NamePartyResult";
import React, { useEffect, useState, useCallback } from "react";

const List = (props) => {
  let selectedState = props.enteredState;
  let selectedType = props.enteredType;

  const [information, setInformation] = useState();
  const [representatives, setRepresentatives] = useState([]);

  // fetches the json data from localhost using selected rep type and selected state
  useEffect(() => {
    fetch(`http://localhost:3000/${selectedType}/${selectedState}`)
      .then((response) => response.json())
      .then((responseData) => {
        const loadedData = [];
        for (const key in responseData) {
          loadedData.push({
            id: key,
            name: responseData[key].name,
            state: responseData[key].state,
            district: responseData[key].district,
            phone: responseData[key].phone,
            office: responseData[key].office,
            website: responseData[key].link,
            party: responseData[key].party,
          });
        }
        setRepresentatives(loadedData);
      });
  }, []);

  // renders representatives
  useEffect(() => {
    console.log("RENDERING REPRESENTATIVES", representatives);
  }, [representatives]);

  // splits first and last name, renders data for selected rep
  const handleClick = (props) => {
    let original = props.name;
    let split = original.split(" ");
    let firstName = split[0];
    let lastName = original.split(" ").slice(1);
    setInformation(
      <div className={classes.info}>
        <h2>Info</h2>
        <input disabled value={firstName}></input>
        <input disabled value={lastName}></input>
        <input disabled value={`District ${props.district}`}></input>
        <input disabled value={props.phone}></input>
        <input disabled value={props.office}></input>
      </div>
    );
  };

  return (
    <div className={classes.container}>
      <div className={classes.listrep}>
        <h2>
          List / <span className={classes.blueText}>Representatives</span>
        </h2>
        <li className={classes.header}>
          <span>Name</span>
          <span>Party</span>
        </li>
        {representatives.map((rep, index) => (
          <div
            key={index}
            onClick={() => handleClick(rep)}
            style={{ cursor: "pointer" }}
          >
            <NamePartyResult
              name={rep.name}
              party={rep.party}
              value={rep.name}
            />
          </div>
        ))}
      </div>
      <div className={classes.info}>{information}</div>
    </div>
  );
};

export default List;
