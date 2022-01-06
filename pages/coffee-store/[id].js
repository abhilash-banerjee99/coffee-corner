import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import cls from 'classnames';

// import coffeeStoresData from '../../data/coffee-store.json';
<<<<<<< HEAD

import { fetchCoffeeStores } from '../../lib/coffee-store';
=======
import {fetchCoffeeStores} from '../../lib/coffee-stores'
>>>>>>> 066a07e8f3eb6846107fa627201e80c13d2d7bcd
import styles from '../../styles/coffee-store.module.css';

// Here we access the dynamic id at the server side using the params
export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  console.log('params', params);

  const coffeeStores = await fetchCoffeeStores();
<<<<<<< HEAD

  return {
    props: {
      coffeeStore: coffeeStores.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id; //Dynamic id
=======
  return {
    props: {
      coffeeStore: coffeeStores.find((coffeeStore) => {
        return coffeeStore.fsq_id.toString() === params.id; //Dynamic id
>>>>>>> 066a07e8f3eb6846107fa627201e80c13d2d7bcd
      }),
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
<<<<<<< HEAD
    return {
      params: {
        id: coffeeStore.id,
=======
    console.log(coffeeStore)
    return {
      params: {
        id: coffeeStore.fsq_id,
>>>>>>> 066a07e8f3eb6846107fa627201e80c13d2d7bcd
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
<<<<<<< HEAD
  // console.log('props', props.coffeeStore);
=======
  console.log('props', props.coffeeStore.id);
>>>>>>> 066a07e8f3eb6846107fa627201e80c13d2d7bcd

  if (router.isFallback) {
    return <div>Loading.....</div>;
  }

<<<<<<< HEAD
  const { address, name, imgUrl, neighborhood } = props.coffeeStore;
=======
  const { name, imgUrl, location } = props.coffeeStore;
>>>>>>> 066a07e8f3eb6846107fa627201e80c13d2d7bcd

  const handleUpvoteButton = () => {
    console.log('Hi');
  };

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>⬅ Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <div className={styles.storeImgWrapper}>
            <Image
<<<<<<< HEAD
              src={
                imgUrl ||
                'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
              }
=======
              src={imgUrl || 'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'}
>>>>>>> 066a07e8f3eb6846107fa627201e80c13d2d7bcd
              width={600}
              height={360}
              className={styles.storeImg}
              alt={name}
            />
          </div>
        </div>

        <div className={cls('glass', styles.col2)}>
<<<<<<< HEAD
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/places.svg"
              width="24"
              height="24"
              alt=""
            />
            <p className={styles.text}>{address}</p>
          </div>
          {neighborhood && (
            <div className={styles.iconWrapper}>
              <Image
                src="/static/icons/nearMe.svg"
                width="24"
                height="24"
                alt=""
              />
              <p className={styles.text}>{neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src="/static/icons/stars.svg"
              width="24"
              height="24"
              alt=""
            />
=======
        <div className={styles.iconWrapper}>
            <Image src="/static/icons/places.svg" width="24" height="24" alt=''/>
            <p className={styles.text}>{location.address}</p>
          </div>
          {location.neighborhood && (<div className={styles.iconWrapper}>
            <Image src="/static/icons/nearMe.svg" width="24" height="24" alt=''/>
            <p className={styles.text}>{location.neighborhood}</p>
          </div>)}
          <div className={styles.iconWrapper}>
            <Image src="/static/icons/stars.svg" width="24" height="24" alt=''/>
>>>>>>> 066a07e8f3eb6846107fa627201e80c13d2d7bcd
            <p className={styles.text}>1</p>
          </div>
          <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up Vote
          </button>
        </div>
      </div>
    </div>
  );
};

export default CoffeeStore;
