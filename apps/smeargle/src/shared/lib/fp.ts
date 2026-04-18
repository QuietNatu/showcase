import { Either as _Either } from 'effect';

export type Either<T, E> = _Either.Either<T, E>;

export const Either = {
  left: _Either.left,
  right: _Either.right,
  isLeft: _Either.isLeft,
  isRight: _Either.isRight,
  mapLeft: _Either.mapLeft,
  map: _Either.map,
  mapBoth: _Either.mapBoth,
  all: _Either.all,
};

export { pipe } from 'effect';
