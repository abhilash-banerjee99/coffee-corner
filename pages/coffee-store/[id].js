import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

import coffeeStoresData from '../../data/coffee-store.json';

// Here we access the dynamic id at the server side using the params
export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  console.log('params', params);

  return {
    props: {
      coffeeStore: coffeeStoresData.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id; //Dynamic id
      }),
    },
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { id: '0' } },
      { params: { id: '1' } },
      { params: { id: '300' } },
    ],
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  let router = useRouter();
  let { id } = router.query;
  console.log('props', props.coffeeStore);

  const { address, name, neighborhood } = props.coffeeStore;

  if (router.isFallback) {
    return <div>Loading.....</div>;
  }

  return (
    <div>
      <Head>
        <title>{name}</title>
      </Head>
      Coffee Store Page 🏬 {id}
      <Link href="/">
        <a>Back to home</a>
      </Link>
      <p>{address}</p>
      <p>{name}</p>
      <p>{neighborhood}</p>
    </div>
  );
};

export default CoffeeStore;
