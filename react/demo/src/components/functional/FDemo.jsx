const FDemo = function({ title = 'default titles', num, className, style, data = [] }) {  
  return (
    <div className={`orinigial ${className}`} style={style}>
      <h1>{title}</h1>
      <p>nun is {num}</p>
      <ul>
        {data.map((item) => {
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


export default FDemo;