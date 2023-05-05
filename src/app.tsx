import "styles/app.scss";
import { Header } from "src/components/header";
import { MainPage } from "./pages/main.page";

export function App() {
  return <div className="app">
    <Header/>
    <MainPage/>
  </div>
}