import React, {useEffect }from "react";
import CocktailList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";

export default function Home() {
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setSearchTerm] = React.useState("a");
  const [cocktails, setCocktails] = React.useState([]);


  // We set up the empty array and it means we only run this function when the componenent 
  // mounts, and not after each and every render
  useEffect(() => {
    setLoading(true);
    async function getDrinks() {
      try {
        const response = await fetch(
          `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
          );
          const data = await response.json();
          const { drinks } = data;
          if (drinks) {
            const newCocktails = drinks.map(item => {
              const { idDrink, strDrink, strDrinkThumb, strAlcoholic, strGlass }
              = item;
              return { 
                id: idDrink, 
                name: strDrink, 
                image: strDrinkThumb,
                info: strAlcoholic,
                glass: strGlass
              }
            });
            setCocktails(newCocktails)
          }
          else {
            setCocktails([]);
          }
        } catch (error) {     
          console.log(error);
        }
        // after the catch, done with loading (false). Once the loading is done 
      //   we are displaying the cocktails or that we can't find any that match
        setLoading(false);
      }
      getDrinks();
  }, [searchTerm])

  return (
    <main>
      <SearchForm setSearchTerm={setSearchTerm} />
      <CocktailList cocktails={cocktails} loading={loading} />
    </main>
  );
}
