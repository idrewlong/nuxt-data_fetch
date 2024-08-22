Notes:

useFetch - is the most straight forward way to handle data fetching in a component setup function

<script>
        const { data: count} = await useFetch('api/count')
</script>

<template>
        Page visits: {{ count }}
</template>

This composable accepts a URL as a parameter and then can be destructured to use inside a <template> or <script>

---

$fetch - is great to make network request based on user interaction

---

useAsyncData - combined with $fetch offers more fine grained control

The useAsyncData composable is responsible for wrapping async logic and returning the result once

<script>
useFetch(url) is nearly equivalent to useAsyncData( url, () => $fetch(url))
</script>

The useFetch composable is not appropriate for CMS or third party provide their own query layer. In this case use useAsyncDatato wrap your calls

---

Both useFetch and useAsyncData share a common set of options and patterns.

It is recommended to use $fetch when posting data to an event handler, when doing client-side only logic or combined with useAsyncData.
