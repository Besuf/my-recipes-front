import Link from "next/link";
import React from "react";
import styles from "../../styles/Home.module.css";

export async function getStaticPaths() {
  const resp = await fetch(
    `https://fast-meadow-80552.herokuapp.com/api/desserts?populate=*`
  );
  const res = await resp.json();

  return {
    paths: res.data.map((recipe) => ({
      params: { id: recipe.id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const resp = await fetch(
    `https://fast-meadow-80552.herokuapp.com/api/desserts/${params.id}?populate=*`
  );
  const res = await resp.json();

  return {
    props: {
      recipe: res.data,
    },
    revalidate: 20,
  };
}

const RecipeDetail = (props) => {
  const { recipe } = props;

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
