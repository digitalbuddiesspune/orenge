export function toId(doc: { toObject?: () => Record<string, unknown>; _id: { toString(): string } }) {
  const obj =
    typeof doc.toObject === 'function'
      ? doc.toObject()
      : { ...(doc as unknown as Record<string, unknown>) };

  const { _id, __v, ...rest } = obj as Record<string, unknown> & {
    _id: { toString(): string };
    __v?: number;
  };

  return {
    ...rest,
    id: _id.toString(),
  };
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}
