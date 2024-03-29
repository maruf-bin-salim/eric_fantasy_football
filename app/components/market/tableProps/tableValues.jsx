export default (props) => {
  const cellValue = props.value;

  // let number = (cellValue).toLocaleString('en-US', {
  //   valute: 'USD',

  // });
  const formatter = new Intl.NumberFormat("en-GB", {});

  if (props.value > 1) {
    return (
      <div className="flex flex-row justify-end h-full tabular-nums tracking-tight md:tracking-normal">
        {formatter.format(cellValue)}
      </div>
    );
  }

  if (props.value < 1) {
    return (
      <div className="flex justify-end items-center md:justify-end h-full tabular-nums tracking-tight md:tracking-normal	">
        {formatter.format(cellValue)}
      </div>
    );
  }
};

