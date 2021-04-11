import { Link } from 'react-router-dom';

const BackButton: React.FC = () => {
  return (
    <Link to="/home"><button className="btn-back">Back</button></Link>
  );
}

export default BackButton;