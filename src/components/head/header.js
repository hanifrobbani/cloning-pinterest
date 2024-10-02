import Head from 'next/head';

const Header = (props) =>{
    return(
        <div>
      <Head>
        <title>{props.title}</title>
        <meta name="description" content={props.meta_description} />
      </Head>
    </div>
    )
}

export default Header;