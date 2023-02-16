import "./index.css";

const Content = (props) => {
  // console.log("del", props.del);
  return (
    <div className="Content">
      <div className="context">
        <label>
          <input type="checkbox"></input>
          <span className="text">{props.context}</span>
        </label>
      </div>
      <span className="min">{props.min}</span>
      <span className="btn" onClick={() => props.show(props.id)}>
        +
      </span>
    </div>
  );
};

export default Content;
