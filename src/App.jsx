import LanguageSwitch from "./components/LanguageSwitch";
import ModeSwitch from "./components/ModeSwitch";
import LanguageProvider from "./providers/LanguageContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./utils/i18n.js";

function App() {
  return (
    <>
      <I18nextProvider i18n={i18n}>
        <LanguageProvider>
            <ModeSwitch />
            <LanguageSwitch />
        </LanguageProvider>
      </I18nextProvider>
    </>
  );
}

export default App;
