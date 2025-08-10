
const ChallengeHeader = ({ title, description, startDate, endDate }) => {
  return (
    <section className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="mb-4 text-gray-700">{description}</p>
      <div className="text-sm text-gray-500">
        <span>Start Date: {startDate}</span> |{" "}
        <span>End Date: {endDate}</span>
      </div>
    </section>
  );
};

export default ChallengeHeader;
