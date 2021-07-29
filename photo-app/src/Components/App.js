import PhotoViewer from './PhotoViewer';


function App() {
  const initial_photos_json = document.getElementById('initial_photos_json').value
  const initial_photos = JSON.parse(initial_photos_json)

  return (
    <>
      <PhotoViewer photos={initial_photos['photo_info']} totalPages= {initial_photos['total_pages']} />
    </>
  );
}

export default App;
