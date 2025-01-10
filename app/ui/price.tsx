export default function Price(props: {discount?: { newPrice: string, percent: string }, price: string}) {
    return (
        <>
            {props.discount ?
                <>
                    <span className="mr-10 font-bold">{props.discount.newPrice}</span>
                    <span className="line-through mr-10">{props.price}</span>
                    <span className="bg-red-100 text-red-600 rounded-full px-3.5 py-1.5">{props.discount.percent}</span>
                </> :
                <span className="font-bold">{props.price}</span>
            }
        </>
    )
}
