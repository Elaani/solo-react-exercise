import classes from "./CSS/Result.module.css";

function NamePartyResult(props) {
  return (
    <li className={classes.result}>
      <span>{props.name}</span>
      <span className={classes.party}>{trimType(props.party)}</span>
    </li>
  );
}

// trims all but the first letter of the party type
const trimType = (string) => {
  return string.charAt(0);
};

export default NamePartyResult;
