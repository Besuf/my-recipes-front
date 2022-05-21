import Head from "next/head";
import React, { useState, useEffect } from "react";
import styles from "../styles/Home.module.css";

import Link from "next/link";
export default function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    async function getRecipes() {
      const resp = await fetch(
        "https://fast-meadow-80552.herokuapp.com/api/desserts?populate=*"
      );
      const res = await resp.json();
      const data = res.data;
      setRecipes(data);
    }
    getRecipes();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Recipes list</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h2>Recipes List</h2>
        <ul className={styles.grid}>
          {recipes.map((recipe) => (
            <li key={recipe.id} className={styles.card}>
              <Link href={`/recipes/${recipe.id}`}>
                <a>
                  <h3>{recipe.attributes.name}</h3>
                </a>
              </Link>

              <p>{recipe.attributes.description}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
