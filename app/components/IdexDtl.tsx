
// this component displays the rules and direction we need to follow to use the dapp


const List = ({ data}:any) => (
    <>
  <ul>
    <li key={1}>
      {data.map((item:string) => (
        <div key={item[0]}>{item}</div>
      ))}
    </li>
  </ul>
  </>
);
export default function IdexDtl({ header, body }:idexdltProp) {
  let array = body || [];

  return (
    <>
    <div className="block w-1/5 h-2/6 p-6  border border-gray-200 rounded-lg shadow hover:border-violet-700">
      <h5 className="mb-2  text-2xl font-bold tracking-tight text-white text-center">
        {header}
      </h5>
      <div className="text-base text-white flex justify-center items-center">
        <List data={body} />
      </div>
    </div>
    </>
  );
};

