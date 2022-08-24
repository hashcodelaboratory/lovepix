import Card from "./components/home/card";
import styles from '../../dashboard.module.scss'
import {messages} from "../../../../messages/messages";

const Content = () => (
    <div className={styles.contentContainer}>
        <Card
            header={{
                title: messages.orders,
                count: 258
            }}
            footer={{
                value: '+ 55 %',
                text: 'than last week'
            }}
        />
        <Card
            header={{
                title: messages.products,
                count: 12456
            }}
            footer={{
                value: '+ 15 %',
                text: 'than last week'
            }}
        />
    </div>
)

export default Content