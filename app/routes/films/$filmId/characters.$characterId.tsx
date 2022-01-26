import { LoaderFunction, useCatch, useLoaderData } from 'remix';
import invariant from 'tiny-invariant';
import { FilmCharacter, getFilmCharacter } from '~/routes/api/films';

export let loader: LoaderFunction = async ({ params }) => {
  invariant(params.characterId, 'characterId is required');

  return getFilmCharacter(params.characterId);
};

export default function Character() {
  const characterDetails = useLoaderData<FilmCharacter>();
  return (
    <div>
      <h3 className="text-3xl">Character Details</h3>
      <div className="mt-2 p-4 rounded shadow-lg border ">
        <p className="text-gray-700 font-bold text-xl">
          {characterDetails.name}
        </p>
        <ul className="py-2">
          <li>Gender: {characterDetails.gender}</li>
          <li>Age: {characterDetails.age}</li>
          <li>Eye color: {characterDetails.eye_color}</li>
          <li>Hair Color: {characterDetails.hair_color}</li>
        </ul>
      </div>
    </div>
  );
}

// 想定されるエラーの場合
export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <div>
        <h3 className="text-3xl">Details</h3>
        <div className="mt-2 p-4 rounded shadow-lg border bg-orange-200 border-orange-600">
          <p className="text-gray-700 font-bold text-xl">{caught.statusText}</p>
          <p>
            {caught.status} {caught.statusText}
          </p>
        </div>
      </div>
    );
  }
}

// 想定されないエラーの場合
export function ErrorBoundary({ error }: any) {
  return (
    <div>
      <h3 className="text-3xl">Details</h3>
      <div className="mt-2 p-4 rounded shadow-lg border bg-rose-200 border-rose-600">
        <p className="text-gray-700 font-bold text-xl">
          Uh oh... Sorry something went wrong.
        </p>
        <p>{error?.message}</p>
      </div>
    </div>
  );
}
