import styles from '../../dashboard.module.scss'
import Link from "next/link";
import * as PagesUrls from "../../../../constants/pages/urls";

const SidebarFooter = () => (
    <div className={styles.sidebarFooter}>
        <Link href={PagesUrls.HOME}>
            <button className={styles.sidebarFooterButton}>
                Link to Home
            </button>
        </Link>
    </div>
)

export default SidebarFooter