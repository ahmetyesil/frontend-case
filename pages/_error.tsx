export type ErrorProps = {
  statusCode: number;
  title?: string;
  withDarkMode?: boolean;
};
const Error = ({ statusCode }: ErrorProps) => {
  return (
    <div className="text-center  py-20 text-rose-600 font-bold ">
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
      <img src="./img/CallsNotFound.png" className="mx-auto mt-10" alt="" />
    </div>
  );
};

Error.getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
