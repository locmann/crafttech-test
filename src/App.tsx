import Menu from 'components/Menu/Menu.tsx';
import Canvas from 'components/Canvas/Canvas.tsx';
import AppContextProvider from 'components/AppContextProvider/AppContextProvider.tsx';

function App() {
  return (
    <main>
      <AppContextProvider>
        <Menu />
        <Canvas />
      </AppContextProvider>
    </main>
  );
}

export default App;
