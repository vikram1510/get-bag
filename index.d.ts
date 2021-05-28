type Options<D> = { data: D }

declare module 'object-to-csv' {
  class ObjectToCsv<D> {
    constructor(options: Options<D>);
    getCSV(): string;
  }

  export = ObjectToCsv
}
