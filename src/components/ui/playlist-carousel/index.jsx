"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { useState } from "react";
import Image from "next/image";

export default function PlaylistCarousel({ playlists }) {
	const [activeIndex, setActiveIndex] = useState(0);
	return (
		<Swiper
			slidesPerView={3}
			centeredSlides={true}
			className="w-full"
			onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
			loop={true}
		>
			{playlists.map((playlist, index) => (<SwiperSlide key={playlist.id}>
				<div
					className={`transition-transform duration-300 flex items-center justify-center border rounded h-[70px] w-[70px]
              ${index === activeIndex ? "scale-125" : "scale-100"}`}
				>
					<Image src={playlist.images[0].url} width="100" height="100" alt="" />
					<span>{playlist.name}</span>
				</div>
			</SwiperSlide>)
			)}
		</Swiper>
	);
}