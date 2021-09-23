module.exports = {
  extends: ["airbnb", "airbnb-typescript"],
  plugins: ["@typescript-eslint", "prettier"],
  overrides: [
    {
      files: ['*.ts', '*.tsx', '*.js'], // Your TypeScript files extension
      parserOptions: {
        project: ['./tsconfig.json'], // Specify it only for TypeScript files
      },
    }
  ],
  ignorePatterns: ["/*.*"],
  root: true
}