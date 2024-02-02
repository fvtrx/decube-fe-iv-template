import { Inter } from "next/font/google";
import Head from "next/head";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });
const cn = (...classes: string[]) => classes.filter(Boolean).join(" ");

interface ICardProps {
  title: string;
  subTitle: string;
  imgSrc: string;
  openDetails: () => void;
}

interface IMovieListItem {
  title: string;
  overview: string;
  backdrop_path: string;
}

export default function Home() {
  const [movieLists, setMovieLists] = useState([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxNWZmMTlkNmU2NTQ5YzRlNTA0Y2NkZjhmZTI0MTc2YiIsInN1YiI6IjY0YjkwNzRhNmFhOGUwMDE1MDRiZWUyZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.25tU4t19o9Ce8e-TOszBNV5chtj_7gDflwDTlSCLFlo",
    },
  };

  async function apiResponse() {
    try {
      const res = await fetch(
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        options
      );
      const json = await res.json();
      return setMovieLists(json.results);
    } catch (err) {
      return console.error("error:" + err);
    }
  }

  useEffect(() => {
    apiResponse();
  }, [movieLists]);

  const Card = ({ imgSrc, title, subTitle, openDetails }: ICardProps) => {
    return (
      <div className="max-w-sm rounded overflow-hidden shadow-lg border border-gray-300">
        <img className="w-full" src={imgSrc} />
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{title}</div>
          <p className="text-gray-500 text-base">{subTitle}</p>
        </div>
        <div className="mx-auto py-4 justify-center place-items-center text-center">
          <button
            className="border px-4 py-4 rounded hover:bg-white hover:text-black"
            onClick={openDetails}
          >
            More details
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Simple Movie App</title>
      </Head>

      <main
        className={cn(
          "min-h-screen flex flex-col items-center justify-center p-24 gap-4",
          inter.className
        )}
      >
        <div className="max-w-screen-4xl mx-auto">
          <div id="movie-main-title" className="text-4xl font-semibold">
            Simple Movie App
          </div>

          <div id="movie-subtitle" className="text-2xl text-gray-300 my-2">
            A simple app to display movies list and it's details
          </div>

          <div className="py-12 grid grid-cols-3 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mx-auto justify-center place-items-center px-12">
            {movieLists && movieLists.length > 0 ? (
              movieLists.slice(0, 6).map((item: IMovieListItem) => {
                return (
                  <Card
                    title={item?.title}
                    subTitle={item.overview}
                    imgSrc={`${process.env.NEXT_PUBLIC_API_IMAGE_PATH}${item.backdrop_path}`}
                    openDetails={() => console.log("test")}
                  />
                );
              })
            ) : (
              <div>No record found</div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
