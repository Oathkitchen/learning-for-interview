export function FDemo(props) {
  console.log(`FDemo props is Frozen: ${Object.isFrozen(props)}`);
  
  return (
    <div className={`orinigial ${props.className}`} style={props.style}>
      <h1>{props.title}</h1>
      <p>nun is {props.num}</p>
      <ul>
        {props.data.map((item) => {
          return (
            <li key={item}>
              <p>item is {item}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
