import FeaturedCard from "@/components/ui/featured-card";
import { cookies } from "next/headers";

const albums = [
  {
    id: 1,
    name: "The Greatest Showman",
    image: "https://placehold.co/325x425"
  }, {
    id: 2,
    name: "Back In Black",
    image: "https://placehold.co/325x425"
  }
];

export default async function Featured() {
  const cookieStore = await cookies();

  const access_token = cookieStore.get("ipm_access_token");

  const response = await fetch("https://api.spotify.com/v1/browse/new-releases", {
    headers: {
      "Authorization": `Bearer ${access_token.value}`
    }
  });

  const data = await response.json();
  console.log("data", data);

  return (
    <div className="flex flex-col gap-4 pb-18 pt-24">
      {data.albums.items.map(album => <FeaturedCard key={album.id} album={album} />)}
    </div>
  );
}
