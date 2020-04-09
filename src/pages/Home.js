import React, {useEffect }from "react";
import CocktailsList from "../components/CocktailList";
import SearchForm from "../components/SearchForm";

export default function Home() {
  const [loading, setLoading] = React.useState(false);
  const [searchTerm, setsearchTerm] = React.useState('a');
  const [cocktails, setCocktails] = React.useState([]);


  // We set up the empty array and it means we only run this function when the componenent 
  // mounts, and not after each and every render

  useEffect(() => {
    fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
      )
    .then(response => response.json())
    .then(data => setCocktails(data.drinks));
  }, [searchTerm])

  return (
    <main>
      <SearchForm setsearchTerm={setsearchTerm} />
      <CocktailsList loading={loading} cocktails={cocktails} />
    </main>
  );
}
