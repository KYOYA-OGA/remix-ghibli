import { Form, useActionData, useTransition } from 'remix';
import { CommentEntry } from '~/routes/api/comments';

type CommentsListProps = {
  filmId: string;
  comments: CommentEntry[];
};

export default function CommentsList({ filmId, comments }: CommentsListProps) {
  const transition = useTransition();
  const actionData = useActionData();

  const inputStyle = (fieldName: string) =>
    `border border-slate-400 rounded py-2 px-3 inline-block w-full ${
      actionData?.errors[fieldName] ? ' border-red-500' : ''
    }`;
  return (
    <div>
      <h2 className="text-3xl">Community Comments</h2>
      <div className="flex flex-col space-y-4 my-3">
        {comments.map((comment) => {
          return (
            <div className="p-4 rounded border border-slate-400 text-gray-700">
              <p className="font-bold text-xl">{comment.name}</p>
              <p>{comment.message}</p>
            </div>
          );
        })}
        <div className="p-4 rounded border-slate-400">
          <Form method="post" action={`/films/${filmId}`}>
            <fieldset disabled={transition.state === 'submitting'}>
              <label htmlFor="name" className="my-2 inline-block">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className={inputStyle('name')}
              />
              {actionData?.errors.name && (
                <p className="text-red-500">{actionData.errors.name}</p>
              )}

              <label htmlFor="message" className="my-2 inline-block">
                Message:
              </label>
              <textarea
                name="message"
                id="message"
                className={inputStyle('message')}
              />
              {actionData?.errors.message && (
                <p className="text-red-500">{actionData.errors.message}</p>
              )}

              <button type="submit" className="my-2 btn-primary">
                {transition.state === 'submitting'
                  ? 'Adding...'
                  : 'Add comment'}
              </button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
}
