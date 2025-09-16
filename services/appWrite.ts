import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateSearchCount = async (searchQuery: string, movie: Movie) => {  
  try {
    // 1. Load stored data
    const storedDocs = await AsyncStorage.getItem("documents");
    let documents: any[] = storedDocs ? JSON.parse(storedDocs) : [];

    // 2. Only continue if searchQuery exists
    if (!searchQuery) return;

    // 3. Find the movie in stored documents
    const index = documents.findIndex((item) => item.movie_id === movie.id);

    if (index !== -1) {
      // 4a. If exists, increment count
      documents[index].count = (documents[index].count || 0) + 1;
    } else {
      // 4b. If not, add new movie entry
      documents.push({
        searchTerm: searchQuery,
        movie_id: movie.id,
        count: 1,
        title: movie.title,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      });
    }

    // 5. Save back to AsyncStorage
    await AsyncStorage.setItem("documents", JSON.stringify(documents));

    console.log("Updated documents:", documents); // 🔍 debug log
  } catch (e) {
    console.error("Error updating search count:", e);
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {    
  try {
    const movies = await  AsyncStorage.getItem("documents");    
    let trendingM:any[] = movies ? JSON.parse(movies) : [];    
    let trending: any = [];
    if (trendingM.length > 0) {
      trendingM = trendingM.sort((a: any, b: any) => b.count - a.count);
      for (let i = 0; i < trendingM.length; i++) {
        if (i < 4) {
          trending.push(trendingM[i]);
        }
      }
    }    
    console.log("trending", trending);
    return trending as unknown as TrendingMovie[];
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
