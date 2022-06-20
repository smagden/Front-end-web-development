import axios from "axios";
import Link from "next/link";
const Index = ({ cocktails }) => {
  return (
    <main>
      <h1>SSG masterpage (oplijsting van cocktails (getStaticProps))</h1>
      {cocktails && (
        <section className="cocktailgrid">
          {cocktails.map(({ strDrink, idDrink, strDrinkThumb }) => (
            <Link key={idDrink} href={`isr/cocktail/${idDrink}`}>
              <article>
                <a>
                  <img src={strDrinkThumb} alt={strDrink} />
                  <p>{strDrink}</p>
                </a>
              </article>
            </Link>
          ))}
        </section>
      )}
    </main>
  );
};

export const getStaticProps = async () => {
  const {
    data: { drinks: cocktails },
  } = await axios(
    "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic"
  );
  return {
    props: {
      cocktails,
    },
    revalidate: 60, //seconden
  };
};

export default Index;
