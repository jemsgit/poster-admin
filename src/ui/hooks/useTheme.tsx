import { useStore } from './useStore';
import { setTheme } from '../../application/set-theme';

export default function useTheme() {
  const theme = useStore((state) => state.app.theme);
  return {
    theme,
    setAppTheme: setTheme,
  };
}
