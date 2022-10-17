import useLoggedUser from "custom-hooks/use-logged-user";
import Image from "next/image";

const AccountDetail = () => {
  const { user } = useLoggedUser();

  return (
    user && (
      <>
        <div>{user?.displayName}</div>
        <div>{user?.email}</div>
        <Image
          src={user?.photoURL || ""}
          alt='user-image'
          width={50}
          height={50}
          layout='responsive'
        />
      </>
    )
  );
};

export default AccountDetail;
