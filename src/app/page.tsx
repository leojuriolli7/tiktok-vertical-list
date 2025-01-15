import VerticalScrollList from "./components/VerticalScrollList";

export default function Home() {
  return (
    <VerticalScrollList>
      <div className="bg-red-500 h-full">
        <video
          className="h-full w-full object-cover"
          muted
          controls={false}
          playsInline
          autoPlay
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        />
      </div>
      <div className="bg-blue-500 h-full">
        <video
          className="h-full w-full object-cover"
          muted
          controls={false}
          playsInline
          autoPlay
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
        />
      </div>
      <div className="bg-green-500 h-full">
        <video
          className="h-full w-full object-cover"
          muted
          controls={false}
          playsInline
          autoPlay
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
        />
      </div>
    </VerticalScrollList>
  );
}
