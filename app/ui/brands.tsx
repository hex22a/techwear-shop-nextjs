import Image from "next/image";

export default function Brands() {
    return (
        <div className="bg-black">
            <div className="flex flex-row flex-wrap justify-around items-center min-h-32 max-w-96 md:max-w-[78rem] my-0 mx-auto">
                <div className="relative min-h-10 min-w-24 md:min-w-36 my-4 md:my-0">
                    <Image
                        className="object-contain"
                        src="/krakatau.svg"
                        alt="krakatau logo"
                        fill
                    />
                </div>
                <div className="relative min-h-10  min-w-24 md:min-w-36 my-4 md:my-0">
                    <Image
                        className="object-contain"
                        src="/arcteryx.svg"
                        alt="arcteryx logo"
                        fill
                    />
                </div>
                <div className="relative min-h-10  min-w-24 md:min-w-36 my-4 md:my-0">
                    <Image
                        className="object-contain"
                        src="/acronym.svg"
                        alt="acronym logo"
                        fill
                    />
                </div>
                <div className="relative min-h-10  min-w-24 md:min-w-36 my-4 md:my-0">
                    <Image
                        className="object-contain"
                        src="/cp-company.svg"
                        alt="cp company logo"
                        fill
                    />
                </div>
                <div className="relative min-h-10 min-w-24 md:min-w-36 my-4 md:my-0">
                    <Image
                        className="object-contain"
                        src="/the-north-face.svg"
                        alt="north face logo"
                        fill
                    />
                </div>
            </div>
        </div>
    );
}
