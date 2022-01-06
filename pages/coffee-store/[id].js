import Head from 'next/head';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import cls from 'classnames';

// import coffeeStoresData from '../../data/coffee-store.json';
import { fetchCoffeeStores } from '../../lib/coffee-stores';
import styles from '../../styles/coffee-store.module.css';

// Here we access the dynamic id at the server side using the params
export async function getStaticProps(staticProps) {
  const params = staticProps.params;
  console.log('params', params);

  const coffeeStores = await fetchCoffeeStores();
  return {
    props: {
      coffeeStore: coffeeStores.find((coffeeStore) => {
        return coffeeStore.id.toString() === params.id; //Dynamic id
      }),
    },
  };
}

export async function getStaticPaths() {
  const coffeeStores = await fetchCoffeeStores();
  const paths = coffeeStores.map((coffeeStore) => {
    console.log(coffeeStore);
    return {
      params: {
        id: coffeeStore.id,
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
  // console.log('props', props.coffeeStore);

  if (router.isFallback) {
    return <div>Loading.....</div>;
  }

  const { name, address, imgUrl, neighborhood } = props.coffeeStore;

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
              src={
                imgUrl ||
                'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
              }
              width={600}
              height={360}
              className={styles.storeImg}
              alt={name}
            />
          </div>
        </div>

        <div className={cls('glass', styles.col2)}>
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
