interface PartyCardProps {
  children: React.ReactNode;
  isOpen: boolean;
}

const PartyCard = ({ children, isOpen }: PartyCardProps) => {
  return (
    <div className="card bg-base-100 w-96 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">Card title!</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div className="card-actions justify-end">
          <button className="btn-primary btn">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default PartyCard;
