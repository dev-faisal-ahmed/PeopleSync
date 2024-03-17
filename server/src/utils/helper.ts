export function RequiredMsg(fieldName: string) {
  return `${fieldName} is required`;
}

export function FieldPicker(params: Record<string, string>, fields: string[]) {
  const searchParam = Object.keys(params).reduce(
    (accumulator: Record<string, string>, key: string) => {
      if (fields.includes(key)) accumulator[key] = params[key];
      return accumulator;
    },
    {},
  );
  return searchParam;
}
