const UserCard = ({ user, statusHandler }) => {
  const { _id, firstName, lastName, age, gender, bio, photoUrl, skills } = user;
  return (
    <div className="card bg-base-300 shadow-sm mx-5 mt-10 py-2  md:w-1/3">
      <figure className="w-full h-65 object-cover">
        <img className="h-full" src={photoUrl} alt={`${firstName} Photo`} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
        </h2>
        <p>
          {age && <span>{age}</span>} {gender && <span>{gender}</span>}
        </p>
        {bio && <p>{bio}</p>}
        {skills && <p>{skills}</p>}
        <div className="card-actions justify-center my-4">
          <div onClick={() => statusHandler("ignore", _id)} className="btn btn-soft btn-warning">Ignore</div>
          <div onClick={() => statusHandler("interested", _id)} className="btn btn-soft btn-secondary">Interested</div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
