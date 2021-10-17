export default function buildClassName(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(' ');
}
