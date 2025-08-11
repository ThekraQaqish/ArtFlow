
const ChallengeHeader = ({ title, description, startDate, endDate }) => {
  const formatDate = (dateStr) => {
  if (!dateStr) return "";
  const options = { year: "numeric", month: "long", day: "numeric" };
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, options);
};

  return (
    <section className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-2" style={{fontSize:'50px'}}>{title}</h1>
      <p className="mb-4 text-gray-700" style={{fontSize:'30px'}}>{description}</p>
      <div className="text-sm text-gray-500">
        <div>
          <strong>Start Date:</strong> <span style={{color:'#14c33cff'}}>{formatDate(startDate)}</span>
        </div>
        <div>
          <strong>End Date:</strong><span style={{color:'#fa0707ff'}}> {formatDate(endDate)}</span>
        </div>
      </div>
    </section>
  );
};

export default ChallengeHeader;
