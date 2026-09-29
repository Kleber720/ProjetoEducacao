import { ThemeProvider } from "@figma/astraui";
import LoginScreen from "@/components/LoginScreen";

export default function App() {
  return (
    <ThemeProvider>
      <LoginScreen />
    </ThemeProvider>
  );
}
