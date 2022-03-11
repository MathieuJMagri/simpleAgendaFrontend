import Button from "./Button";

const SectionHeader = ({ id, listOfWhat, onAdd }) => {
  return (
    <div id={id}>
      <h1>List of {listOfWhat}</h1>
      <Button color="green" text="Add" onClick={onAdd} />
    </div>
  );
};

export default SectionHeader;
