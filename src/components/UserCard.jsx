const UserCard = ({ user }) => {
  console.log(user)
  const { firstName, lastName, age, gender, bio, photoUrl, skills } = user;
  return (
    <div className="card bg-base-300 shadow-sm mx-5 mt-10">
      <figure className="mt-4">
        <img src={photoUrl} alt={`${firstName} Photo`} />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {firstName} {lastName}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>
          {age && <span>{age}</span>} {gender && <span>{gender}</span>}
        </p>
        {bio && <p>{bio}</p>}
        {skills && <p>{skills}</p>}
        <div className="card-actions justify-center my-4">
          <div className="btn btn-soft btn-warning">Ignore</div>
          <div className="btn btn-soft btn-secondary">Interested</div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
