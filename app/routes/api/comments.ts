export type CommentEntry = {
  name: string;
  message: string;
  filmId: string;
};

export async function getComments(filmId: string) {
  const response = await fetch(
    `http://localhost:3001/comments?filmId=${filmId}`
  );

  return response.json();
}

export async function addComment(comment: CommentEntry) {
  const response = await fetch('http://localhost:3001/comments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
  });

  return response.json();
}
