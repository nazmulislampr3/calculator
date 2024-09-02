const rx = (pattern: string, flags: string | undefined = "") =>
  new RegExp(pattern, flags);

export default rx;
