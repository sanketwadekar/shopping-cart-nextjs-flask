import NavBar from './NavBar'

function App(props) {
  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
}

export default App;
