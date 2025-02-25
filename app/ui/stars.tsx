import styles from "./stars.module.css";

export default function Stars(props: {rating: number}) {
    return (
        <>
            <i className={`${styles.star} mr-3`} style={{"--rating": props.rating} as React.CSSProperties}></i>
            <span>{props.rating}/5</span>
        </>
    );
}
