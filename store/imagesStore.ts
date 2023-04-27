import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const imagesStore = (set: any, get: any) => ({
  images: [],
  isLoading: true,
  searchQuery: "",
  setSearchQuery: (query: any) => set(() => ({ searchQuery: query })),
  fetchImages: async () => {
    if (get().searchQuery) {
      await axios
        .get(`https://api.unsplash.com/search/photos`, {
          params: {
            client_id: "WZvQi8paj4VtNEANcHjXbhyf6rviQZbtSRQV59kJoUk",
            query: get().searchQuery,
            per_page: 30,
          },
        })
        .then((response) => {
          set({ images: response.data.results, isLoading: false });
          //   set({ images: response.data.results, isLoading: false });
        })
        .catch((error) => {
          console.log(error);
          set({ isLoading: false });
        });
    } else {
      // Generate a random number between 1 and 1000
      const randomPage = Math.floor(Math.random() * 1000) + 1;
      await axios
        .get(`https://api.unsplash.com/photos?page=${randomPage}`, {
          params: {
            client_id: "WZvQi8paj4VtNEANcHjXbhyf6rviQZbtSRQV59kJoUk",
            per_page: 30,
          },
        })
        .then((response) => {
          set({ images: response.data, isLoading: false });
        })
        .catch((error) => {
          console.log(error);
          set({ isLoading: false });
        });
    }

    // set({ images: response.data });
  },
});

const useImagesStore = create(
  persist(imagesStore, {
    name: "images",
  })
);

export default useImagesStore;
