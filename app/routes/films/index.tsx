import {
  Form,
  Link,
  LinksFunction,
  LoaderFunction,
  MetaFunction,
  useLoaderData,
} from 'remix';
import { Film, getFilms } from '../api/films';

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get('title');

  return getFilms(title);
};

// export const links: LinksFunction = () => {
//   return [{ rel: 'stylesheet', href: 'styles' }];
// };

export const meta: MetaFunction = () => {
  return {
    title: 'Films | Studio Ghibli',
    description: 'List of films from Studio Ghibli',
  };
};

export default function FilmsIndex() {
  const films = useLoaderData<Film[]>();

  return (
    <div className="my-10 lg:my-16 container px-4 mx-auto font-sans">
      <h1 className="text-5xl font-bold text-center">Studio Ghibli Films</h1>
      <Form reloadDocument method="get" className="py-5">
        <label className="font-bold">
          Search:{' '}
          <input
            type="text"
            name="title"
            placeholder="Type a title..."
            className="py-2 px-3 focus:ring-indigo-500 focus:border-indigo-500  shadow-sm  rounded-md border border-gray-600"
          />
        </label>
        <button type="submit" className="ml-3 btn-primary">
          Search
        </button>
      </Form>
      <div className="lg:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-10">
        {films.map((film) => (
          <Link
            title={film.title}
            to={film.id}
            key={film.id}
            className="hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer transition-all"
            prefetch="intent"
          >
            <h2>{film.title}</h2>
            <img src={film.image} alt={film.title} />
          </Link>
        ))}
      </div>
    </div>
  );
}
