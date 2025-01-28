export default function Price(props: {discount?: { newPrice: number, percent: number }, price: number}) {
    return (
        <>
            {props.discount ?
                <>
                    <span className="font-bold mr-1 md:mr-3">${props.discount.newPrice}</span>
                    <span className="line-through mr-1 md:mr-3">${props.price}</span>
                    <span className="bg-red-100 text-red-600 rounded-full px-3.5 py-1.5">{props.discount.percent}%</span>
                </> :
                <span className="font-bold">${props.price}</span>
            }
        </>
    )
}
