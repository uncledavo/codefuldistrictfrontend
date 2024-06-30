import { Editor } from './components/Editor.tsx';
import './App.css';
import { Preview } from './components/Preview.tsx';
import { Tabs } from './components/Tabs.tsx';

const dummyFrame = {
  imageAspectRatio: '1:1',
  imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSy5eCIpQvch8j0-vUi5DD8j0lxwQa8df1C2g&s',
  title: 'Cool Frame',
  input: { text: 'Enter something...' },
  buttons: [
    { type: 'link', title: 'Link Button', target: 'https://coolestframes.com' },
    { type: 'mint', title: 'Mint Button' },
    { type: 'post', title: 'Post Button' },
    { type: 'post_redirect', title: 'Post Redirect Button' },
    { type: 'tx', title: 'Transaction Button' },
  ],
}

const dummyData = {
  context: { status: 'initial', previousState: {}, verified: true },
  frame: { state: '{}' },
  type: 'tx',
  response: { 
      data: { method: 'eth_sendTransaction', params: { to: '0x0', value: '0' } },
      success: true, 
      status: 200, 
      statusText: 'OK', 
      error: 'None', 
      location: 'https://example.com' 
  },
  url: 'https://example.com',
  method: 'GET',
  timestamp: Date.now(),
  metrics: { speed: 100, htmlSize: 1000, imageSize: 500 },
  body: { fid: '123', inputText: 'Hello', buttonIndex: 1 }
}
  

function App() {
  return (
    <>
      <div className="flex min-h-full flex-col bg-black bg-opacity-10">
        <header className="shrink-0 bg-gray-900">
          <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <img
              className="h-8 w-auto"
              src="frametown_logo.svg" 
              alt="framebuild"
            />
            <div className="flex items-center gap-x-8">
              <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-300">
                <span className="sr-only">View documentation</span>
                Docs
              </button>
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your profile</span>
                <img
                  className="h-8 w-8 rounded-full bg-gray-800"
                  src="https://www.laughingplace.com/w/wp-content/uploads/2023/02/kermit-the-frog-takes-over-latest-post-on-disney-live-entertainment-instagram-account.jpg"
                  alt=""
                />
              </a>
            </div>
          </div>
        </header>


        <div className="mx-auto flex w-full max-w-7xl items-start gap-x-8 px-4 py-10 sm:px-6 lg:px-8 ">
        <main className="flex-1 top-8 w-96 xl:block border-gray-200 border-spacing-8 bg-black bg-opacity-10"><Editor /></main>
        <div className="sticky top-8 flex flex-col items-start">
          <button className="mb-4 p-2 self-end bg-blue-500 text-white rounded">Save</button>
          <aside className="sticky top-8 w-44 shrink-0 lg:block border-white-400 border-spacing-8"><Preview frame={dummyFrame} url="https://example.com"/></aside>
          <Tabs data={dummyData} frame={dummyFrame} />
        </div>
      </div>
    </div>
    </>
  );
}
export default App;