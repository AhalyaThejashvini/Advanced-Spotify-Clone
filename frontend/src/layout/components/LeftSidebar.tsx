import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/useMusicStore";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, MessageCircle } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";

const LeftSidebar = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore();

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  console.log({ albums });

  return (
    <div className="h-full flex flex-col gap-2">
      { /* navigation menu */ }
      <div className="p-4 bg-zinc-900 rounded-lg">
        <div className="space-y-2">
          <Link to={ "/" } 
            className={cn(buttonVariants(
              { 
                variant: "ghost",
                className: "w-full justify-start text-white hover bg-zinc-800"
              }
            ))}>
            <HomeIcon className="size-5 mr-2" />
            <span className="hidden md:inline">Home</span>
          </Link>

          <SignedIn>
          <Link to={ "/chat" } 
            className={cn(buttonVariants(
              { 
                variant: "ghost",
                className: "w-full justify-start text-white hover bg-zinc-800"
              }
            ))}>
            <MessageCircle className="size-5 mr-2" />
            <span className="hidden md:inline">Messages</span>
          </Link>          
          </SignedIn>
        </div>
      </div>

      { /* library section */ }
      <div className="flex-1 rounded-lg bg-zinc-900 p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <Library className="size-5 mr-2" />
            <span className="hidden md:inline">Playlists</span>
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-300px)]">
          <div className="space-y-2">
            { isLoading ? (
              <PlaylistSkeleton />
            ) : (
              albums.map((album) => (
                <Link to={ `/album/${album._id}`}
                key={album._id}
                className="flex items-center p-2 text-sm rounded-md hover:bg-zinc-800 gap-3 group cursor-pointer">
                  <img src={album.imageUrl} alt="playlist image" className="w-12 h-12 rounded-md flex-shrink-0 object-cover"/>
                  <div className="flex-1 min-w-0 hidden md:block">
                    <p className="font-medium truncate">{album.title}</p>
                    <p className="text-zinc-400 text-sm truncate">Album • {album.artist}</p>
                  </div>
                </Link>
              ))
            )}            
          </div>         
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;