"use client";

import { usePathname } from "next/navigation";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPrevious,
    CarouselNext,
} from "@/components/ui/carousel";
import Image from "next/image";

export default function CarouselSection() {
    const pathname = usePathname();

    // Chỉ hiển thị carousel và tiêu đề nếu ở trang chính ("/")
    if (pathname !== "/") {
        return null;
    }

    return (
        <>
            <section className="w-full py-4 px-0 overflow-x-hidden">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="col-span-1">
                        <Image
                            src="/anh1.png"
                            width={800}
                            height={600}
                            alt="Sale Banner 1"
                            className="w-full h-[600px] object-contain rounded-3xl border-4 border-gray-300 shadow-md ml-2"
                        />
                    </div>
                    <div className="col-span-2">
                        <Carousel className="w-full relative">
                            <CarouselContent>
                                <CarouselItem className="h-[600px]">
                                    <Image
                                        src="/anh2.png"
                                        width={800}
                                        height={600}
                                        alt="Sale Banner 1"
                                        className="w-full h-[600px] object-contain rounded-lg"
                                    />
                                </CarouselItem>
                                <CarouselItem>
                                    <Image
                                        src="/anh3.png"
                                        width={800}
                                        height={600}
                                        alt="Sale Banner 2"
                                        className="w-full h-[600px] object-contain rounded-lg"
                                    />
                                </CarouselItem>
                                <CarouselItem>
                                    <Image
                                        src="/anh4.png"
                                        width={800}
                                        height={600}
                                        alt="Sale Banner 3"
                                        className="w-full h-[600px] object-contain rounded-lg"
                                    />
                                </CarouselItem>
                            </CarouselContent>
                            <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-200 rounded-full shadow h-10 w-10 flex items-center justify-center" />
                            <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-200 rounded-full shadow h-10 w-10 flex items-center justify-center" />
                        </Carousel>
                    </div>
                </div>
            </section>
            <h2 className="text-3xl font-bold text-center mt-8 mb-4 text-gray-800">
                Products List
            </h2>
        </>
    );
}
