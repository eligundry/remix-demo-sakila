/// <reference types="@remix-run/dev" />
/// <reference types="@remix-run/node/globals" />

declare module 'sql-tagged-template-literal' {
  const sql: (s: TemplateStringsArray) => string
  export default sql
}
