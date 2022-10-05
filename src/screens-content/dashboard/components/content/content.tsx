import Card from "./components/home/card";
import styles from '../../dashboard.module.scss'
import {messages} from "../../../../messages/messages";
import Table from "./components/home/table";
import {useContext} from "react";
import DashboardContext from "../../context/dashboard-context";

type Props = {
    isFetching: boolean;
}

const Content = ({ isFetching }: Props) => {
    const { state: { uploadedImages } } = useContext(DashboardContext);

    return (
        <div className={styles.contentContainer}>
            <div className={styles.cardRow}>
                <Card
                    header={{
                        title: messages.orders,
                        count: String(258)
                    }}
                    footer={{
                        value: '+ 55 %',
                        text: messages.thanLastWeek
                    }}
                />
                <Card
                    header={{
                        title: messages.products,
                        count: String(12456)
                    }}
                    footer={{
                        value: '+ 15 %',
                        text: messages.thanLastWeek
                    }}
                />
                <Card
                    header={{
                        title: messages.uploadedImages,
                        count: isFetching ? "-" : uploadedImages.length.toString()
                    }}
                    footer={{
                        value: '+ 15 %',
                        text: messages.thanLastWeek
                    }}
                />
            </div>
            <Table/>
        </div>
    )
}

export default Content