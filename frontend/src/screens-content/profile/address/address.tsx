import styles from '../profile.module.scss'
import RoomIcon from '@mui/icons-material/Room'
import CloseIcon from '@mui/icons-material/Close'
import { FormInputs } from '../../../common/types/form'

type FormDetail = {
  form: FormInputs
}

type AddressProps = {
  data: FormDetail[]
}

const Address = ({ data }: AddressProps) => {
  return (
    <>
      <div className={styles.addressRow}>
        {data.map(({ form }) => (
          <div key={form.firstName} className={styles.addressCard}>
            <div className={styles.addressRow}>
              <RoomIcon
                sx={{
                  borderRadius: '50%',
                  backgroundColor: '#E81A40',
                  padding: 1,
                  color: 'white',
                  marginRight: 2,
                  height: 40,
                  width: 40,
                }}
              />
              <div>
                <p>
                  <b>
                    {form.firstName} {form.lastName}
                  </b>
                </p>
                <p>{form.address}</p>
                <p>
                  {form.postalCode} {form.city}
                </p>
                <p>{form.phone}</p>
              </div>
            </div>
            <CloseIcon
              sx={{ color: 'gray', marginLeft: 2, cursor: 'pointer' }}
            />
          </div>
        ))}
      </div>
    </>
  )
}

export default Address
