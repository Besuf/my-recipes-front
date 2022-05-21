import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import styles from "../../styles/Home.module.css";

const RecipeDetail = () => {
  const [recipe, setRecipe] = useState(null);

  const router = useRouter();

  useEffect(() => {
    async function getRecipes() {
      const resp = await fetch(
        `https://fast-meadow-80552.herokuapp.com/api/desserts/${router.query.id}?populate=*`
      );
      const res = await resp.json();
      const data = res.data;
      setRecipe(data);
    }
    if (router.query.id) getRecipes();
  }, [router.query.id]);

  return (
    <div>
      <Link href="/">
        <a>
          <button>back</button>
        </a>
      </Link>
      {recipe && (
        <div key={recipe.id} className={styles.card}>
          <h3>{recipe.attributes.name}</h3>

          <p>{recipe.attributes.description}</p>
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
