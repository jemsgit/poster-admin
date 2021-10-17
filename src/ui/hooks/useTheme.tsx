import { useStore } from './useStore';
import { setAppTheme } from '../../services/storeAdapter';

export default function useTheme() {
  const theme = useStore((state) => state.app.theme);
  return {
    theme,
    setAppTheme,
  };
}
