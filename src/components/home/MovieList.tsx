import { requests } from './../../utils/requests';
import MovieRow from './MovieRow';

const MovieList: React.FC = () => {
  return (
    <>
      <section className="row-list">
        <MovieRow title='Netflix Originals' fetchUrl={requests.fetchOriginals} bigPoster={true} />
        <MovieRow title='Action' fetchUrl={requests.fetchAction} bigPoster={false} />
        <MovieRow title='Comedy' fetchUrl={requests.fetchComedy} bigPoster={false} />
        <MovieRow title='Family' fetchUrl={requests.fetchFamily} bigPoster={false} />
      </section>
    </>
  );
}

export default MovieList;