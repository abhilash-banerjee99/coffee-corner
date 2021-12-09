import { useRouter } from 'next/router';
import Link from 'next/link';
const CoffeeStore = () => {
  let router = useRouter();
  let { id } = router.query;

  return (
    <div>
      Coffee Store Page 🏬 {id}
      <Link href="/">
        <a>Back to home</a>
      </Link>
    </div>
  );
};

export default CoffeeStore;
