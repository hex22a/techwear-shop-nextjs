import colors_style from "@/app/ui/colors.module.css";
import { Color, Size } from "@/app/lib/definitions";
import Quantity from "@/app/ui/quantity";

export type AddToCartFormProps = {
    colors: Color[],
    sizes: Size[],
}

export default function AddToCartForm(props: AddToCartFormProps) {
    const { colors, sizes } = props;

    return (
        <form>
            <fieldset>
                <legend className="mb-4">Select Colors</legend>
                <div className="flex flex-row justify-start items-center gap-3 md:gap-4">
                    {colors.map(color => (
                        <label key={color.id} htmlFor={`color-${color.hex_value}`}>
                            <input className="hidden peer" type="radio" name="color" id={`color-${color.hex_value}`}
                                   value={color.hex_value} aria-checked={true}/>
                            <div
                                className={`${colors_style.radio_mark_check} relative inline-block w-9 h-9 rounded-full`}
                                style={{backgroundColor: `#${color.hex_value}`}}
                                tabIndex={0}></div>
                        </label>
                    ))}
                </div>
            </fieldset>
            <hr className="my-6"/>
            <fieldset>
                <legend className="mb-4">Choose size</legend>
                <div
                    className="flex flex-row justify-between text-sm md:text-base md:justify-start gap-2 md:gap-3">
                    {sizes.map(size => (
                        <label key={size.id} htmlFor={`size-${size.value}`}>
                            <input className="hidden peer" type="radio" name="size" id={`size-${size.value}`}
                                   value={size.value} aria-checked={true}/>
                            <div
                                className="relative inline-block bg-gray-300 rounded-full opacity-60 peer-checked:bg-black peer-checked:text-white peer-checked:opacity-100 py-2.5 px-5 md:py-3 md:px-6"
                                tabIndex={0}>
                                {size.size}
                            </div>
                        </label>
                    ))}
                </div>
            </fieldset>
            <hr className="my-6"/>
            <div className="flex flex-row justify-between items-stretch text-sm md:text-base w-full gap-3 md:gap-5">
                <span className="bg-gray-200 rounded-full py-3 md:py-3.5 px-3 w-44">
                    <Quantity />
                </span>
                <button className="bg-black text-white rounded-full py-3 md:py-3.5 w-full" type="submit">Add to Cart</button>
            </div>
        </form>
    )
}
