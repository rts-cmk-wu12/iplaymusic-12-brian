import Heading from "@/components/typography/heading";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedCard({ album }) {
	return (
		<Link href={`/album/${album.id}`}>
			<article className={`relative h-[425px] rounded-2xl drop-shadow-md`}>
				<Image unoptimized src={album.images[0].url} width={album.images[0].width} height={album.images[0].height} alt="" className="absolute inset-x-0 top-0 rounded-2xl h-full w-auto object-cover" />
				<div className={`w-[325px] h-[425px] bg-gradient-to-br from-gray-500 to-black absolute inset-x-0 top-0 rounded-2xl opacity-50`}></div>
				<div className="absolute inset-x-0 bottom-8 px-4">
					<Heading level={3}>{album.name}</Heading>
					<p className="text-white capitalize">{album.album_type}</p>
				</div>
			</article>
		</Link>
	);
}