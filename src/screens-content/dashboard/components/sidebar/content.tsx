import styles from '../../dashboard.module.scss'
import {SIDEBAR_MENU_LIST} from "./utils/menu";
import {useTranslation} from "next-i18next";

const SidebarContent = () => {

    const { t } = useTranslation();

    return(
        <div className={styles.sidebarContent}>
            {
                SIDEBAR_MENU_LIST.map(({title}) => (
                    <p key={title} className={styles.sidebarContentTitle}>{String(t(title))}</p>
                ))
            }
        </div>
    )
}

export default SidebarContent