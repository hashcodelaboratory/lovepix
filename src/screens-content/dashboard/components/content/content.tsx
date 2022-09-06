import Card from "./components/home/card";
import styles from '../../dashboard.module.scss'
import {messages} from "../../../../messages/messages";
import Table from "./components/home/table";
import {useContext} from "react";
import DashboardContext from "../../context/dashboard-context";

const Content = () => {
    const { state } = useContext(DashboardContext);
    const { uploadedImages } = state;

    return (
        <div className={styles.contentContainer}>
            <div className={styles.cardRow}>
                <Card
                    header={{
                        title: messages.orders,
                        count: 258
                    }}
                    footer={{
                        value: '+ 55 %',
                        text: messages.thanLastWeek
                    }}
                />
                <Card
                    header={{
                        title: messages.products,
                        count: 12456
                    }}
                    footer={{
                        value: '+ 15 %',
                        text: messages.thanLastWeek
                    }}
                />
                <Card
                    header={{
                        title: messages.uploadedImages,
                        count: uploadedImages.length
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