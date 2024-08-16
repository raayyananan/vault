import Image from "next/image";
import Sidenav from "./components/sidenav";
import Player from "./components/player";
import ShowcaseScroller from "./components/showcase-scroller";
import Chip from "./components/chip";
import { data } from "./data/data";

export default function Home() {
  return (
    <main className="h-screen w-screen flex p-0 gap-0">
      <div className="sidenav-container md:p-4 pr-0">
        <Sidenav />
      </div>
      <div className="flex-auto flex flex-col gap-4 relative overflow-x-scroll hide-scrollbar md:px-4 md:pt-4">
        <ShowcaseScroller />
        <div className="flex-auto">
          <div 
            className="overflow-x-scroll flex gap-3 pr-2 pl-1"
            style={{maskImage: 'linear-gradient(to right, transparent 0px, black 0px, black calc(100% - 18px), transparent 100%)'}}
            >
            <Chip 
              key={0} 
              icon={(<svg className="translate-y-[0.5px]" xmlns="http://www.w3.org/2000/svg" height="16px" viewBox="0 -960 960 960" width="16px" fill="rgb(var(--on-surface-variant))"><path d="M480-147q-14 0-28.5-5T426-168l-69-63q-106-97-191.5-192.5T80-634q0-94 63-157t157-63q53 0 100 22.5t80 61.5q33-39 80-61.5T660-854q94 0 157 63t63 157q0 115-85 211T602-230l-68 62q-11 11-25.5 16t-28.5 5Z"/></svg>)} 
              name={"Liked Songs"}
            ></Chip>

            {data.map((item, index) => (
              <Chip 
                key={index + 1} 
                // icon={(<img className="rounded-full h-5 w-5" src={item.thumbnail} alt={item.name} />)} 
                icon={(<div className="w-4 h-4 rounded-full bg-outline-variant"></div>)}
                name={item.name}
              ></Chip>
            ))}
          </div>
        </div>
        <Player />  
      </div>
    </main>
  );
}
