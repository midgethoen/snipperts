export function handleError(res, err) {
  return res.status(500).send(err);
}
