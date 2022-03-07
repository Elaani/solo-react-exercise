import { States } from "./JSON/states.js";
import classes from "./CSS/Selection.module.css";
import React, { useState } from "react";
import RepresentativesList from "./RepresentativesList";

function TypeStateSelection() {
  const [repList, setRepList] = useState();
  const [error, setError] = useState();
  const [userInput, handleTypeChange] = useState({
    type: "",
    state: "",
  });

  // retains original state value and replaces the type
  const typeChangeHandler = (event) => {
    handleTypeChange((prevState) => {
      return {
        ...prevState,
        type: event.target.value,
      };
    });
  };

  // retains original type value and replaces state
  const stateChangeHandler = (event) => {
    handleTypeChange((prevState) => {
      return {
        ...prevState,
        state: event.target.value,
      };
    });
  };

  // calls error handler if a dropdown isn't selected, renders list
  const submitHandler = (event) => {
    event.preventDefault();
    errorHandler();
    if (error) {
      setRepList(
        <RepresentativesList
          enteredState={userInput.state}
          enteredType={userInput.type}
          key={new Date().getTime()}
        />
      );
    }
  };

  // renders a message for each if needed: not having a selected rep type, not having a selected state
  const errorHandler = (event) => {
    setError(
      <div>
        {userInput.type === "" ? (
          <li className={classes.warning}>
            <span>Please select the type of Representative.</span>
          </li>
        ) : null}
        {userInput.state.length === 0 ? (
          <li className={classes.warning}>
            <span>Please select a state.</span>
          </li>
        ) : null}
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className={classes.container}>
          <div className={classes.titleContainer}>
            <h1 className={classes.title}>Who's My Representative?</h1>
          </div>
          <div className={classes.inputContainer}>
            <select
              className={classes.options}
              type="text"
              onChange={typeChangeHandler}
            >
              <option value={null}>Type</option>
              <option value={"fetchReps"}>House of Representatives</option>
              <option value={"fetchSens"}>Senate</option>
            </select>
            <select
              className={classes.options}
              type="text"
              onChange={stateChangeHandler}
            >
              <option value={null}>State</option>
              {States.map((state) => (
                <option value={state.abbreviation} key={state.abbreviation}>
                  {state.abbreviation}
                </option>
              ))}
            </select>
            <button type="submit" value="Submit">
              Submit
            </button>
          </div>
          {error}
        </div>
      </form>
      <div>{repList}</div>
    </div>
  );
}

export default TypeStateSelection;
