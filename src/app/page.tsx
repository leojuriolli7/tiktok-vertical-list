import VerticalScrollList from "./components/VerticalScrollList";

export default function Home() {
  return (
    <VerticalScrollList>
      <div className="bg-red-500 h-full">Video 1</div>
      <div className="bg-blue-500 h-full">Video 2</div>
      <div className="bg-green-500 h-full">Video 3</div>
    </VerticalScrollList>
  );
}
