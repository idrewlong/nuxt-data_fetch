<script setup>
// const { data: products } = useFetch("https://fakestoreapi.com/products");

// await blocks navigation to the page until the API has resolved

//--------------

// const { pending, data: products } = useFetch(
//   "https://fakestoreapi.com/products",
//   {
//     lazy: false,
//   }
// );

// useFetch has additional options
// if you do add additional options, you need to handle the loading. destructure a second value in the composable

//--------------

// Instead of the above function, remove the lazy loading and use the second composable called useLazyFetch which does the same thing

// const { pending, data: products } = useLazyFetch(
//   "https://fakestoreapi.com/products"
// );

//--------------

// There maybe instances where you want to fetch that data on the client side by passing server as an object

// this is good to hold off data that is not needed on the first render, such as anything that maybe important to your SEO

// const { pending, data: products } = useFetch(
//   "https://fakestoreapi.com/products",
//   {
//     lazy: false,
//     server: false,
//   }
// );

//--------------

// If we wanted to we can limit the properties that get returned we can use transform which accepts a callback function

// const { pending, data: products } = useFetch(
//   "https://fakestoreapi.com/products",
//   {
//     lazy: false,
//     transform: (products) => {
//       return products.map((product) => ({
//         id: product.id,
//         title: product.title,
//         image: product.image,
//       }));
//     },
//   }
// );

//--------------

// If we wanted to get a single product, we could use another property
// pick which is an array that returns a payload

// const { pending, data: products } = useFetch(
//   "https://fakestoreapi.com/products/1",
//   {
//     lazy: false,
//     pick: ["id", "image", "title"],
//   }
// );

//--------------

// There maybe a point where you want the data to refresh without the page refreshing

// const {
//   pending,
//   data: products,
//   refresh,
// } = useFetch("https://fakestoreapi.com/products", {
//   lazy: false,
//   server: false,
// });

//--------------
// asyncDataFetch

// lets say we want to grab two different data sets

const {
  pending,
  data: productInfo,
  refresh,
  error,
} = useLazyAsyncData("productInfo", async () => {
  const [products, categories] = await Promise.all([
    $fetch("https://fakestoreapi.com/products"),
    $fetch("https://fakestoreapi.com/products/categories"),
  ]);
  return {
    products,
    categories,
  };
});
</script>

<template>
  <!-- <div class="flex min-h-screen justify-center items-center" v-if="pending">
    <p class="text-white">Loading...</p>
  </div>
  <div v-else class="grid grid-cols-5 gap-4 py-4">
    <div
      v-for="product in products"
      class="flex flex-col shadow-md bg-white p-6 rounded-md hover:scale-105 duration-300 transition-transform"
    >
      <img class="w-[75px] h-auto self-center" :src="product.image" alt="" />
      <h2 class="text-black mt-auto text-sm">{{ product.title }}</h2>
    </div>
  </div> -->

  <div class="flex min-h-screen justify-center items-center" v-if="pending">
    <p class="text-white">Loading...</p>
  </div>
  <div
    v-else-if="error"
    class="flex flex-col min-h-screen justify-center items-center text-white"
  >
    <p>Error Code {{ error.statusCode }}</p>
    <p>Error Message: {{ error.message }}</p>
  </div>
  <div v-else>
    <button
      @click="refresh"
      class="text-white bg-slate-500 px-4 py-2 rounded-sm"
    >
      Refresh Data
    </button>
    <div class="grid grid-cols-5 gap-4 py-4">
      <div
        v-for="product in productInfo.products"
        class="flex flex-col shadow-md bg-white p-6 rounded-md hover:scale-105 duration-300 transition-transform"
      >
        <img class="w-[75px] h-auto self-center" :src="product.image" alt="" />
        <h2 class="text-black mt-auto text-sm">{{ product.title }}</h2>
      </div>
    </div>
  </div>
</template>
