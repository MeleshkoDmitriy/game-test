import { Spin } from "antd"
import styles from "./Spinner.module.scss"
import { FC } from "react"

interface ISpinnerProps {
    size: "small" | "large"
}

export const Spinner:FC<ISpinnerProps> = ({ size }) => {
    return (
        <div className={styles.wrapper}>
            <Spin size={size} />
        </div>
    )
}