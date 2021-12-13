import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';

import coffeeStoresData from '../../data/coffee-store.json';

import styles from '../../styles/coffee-store.module.css';

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
  const paths = coffeeStoresData.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.id.toString(),
      },
    };
  });

  return {
    paths,
    fallback: true,
  };
}

const CoffeeStore = (props) => {
  let router = useRouter();
  console.log('props', props.coffeeStore);

  if (router.isFallback) {
    return <div>Loading.....</div>;
  }

  const { address, name, neighborhood } = props.coffeeStore;

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.col1}>
        <Link href="/">
          <a>🏘️Back to home</a>
        </Link>
        <p>{name}</p>
      </div>
      <div className={styles.col2}>
        <p>{address}</p>
        <p>{neighborhood}</p>
      </div>
    </div>
  );
};

export default CoffeeStore;
