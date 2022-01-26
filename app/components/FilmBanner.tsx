import { Link } from 'remix';
import { Film } from '~/routes/api/films';

type FilmBannerProps = {
  film: Film;
};

export default function FilmBanner({ film }: FilmBannerProps) {
  return (
    <div>
      <div className="w-full h-96 overflow-hidden relative">
        <div className="w-full h-full flex flex-col absolute justify-between items-start">
          <Link to="/films" className="text-white p-5 text-2xl hover:underline">
            Go Back
          </Link>
          <div className="bg-slate-700/60 p-5">
            <h1 className="text-4xl lg:text-6xl font-bold text-white">
              {film.title}
            </h1>
          </div>
        </div>

        <img
          src={film.movie_banner}
          className="w-full h-auto -mt-24"
          alt={film.title}
        />
      </div>
    </div>
  );
}
