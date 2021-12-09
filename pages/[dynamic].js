import { useRouter } from 'next/router';
import Head from 'next/head';

const Dynamic = () => {
  let router = useRouter();
  let { dynamic } = router.query;
  return (
    <div>
      <Head>
        <title>{dynamic}</title>
      </Head>
      Hi there I am a dynamic route 🚀 and my name is {dynamic}{' '}
    </div>
  );
};

export default Dynamic;
