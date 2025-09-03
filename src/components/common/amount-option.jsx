import { Button } from "framework7-react";

const AmountOption = ({ value, onClick }) => (
  <div
    className="pointer icon40 w-auto hover-active btn-outline-primary rounded-3 d-flex-center text16 text-md22 m-0 p-2"
    onClick={() => onClick(value)}
  >
    <span className="text-primary-sub2 text14">MYR {value}</span>
  </div>
);

export default AmountOption;
