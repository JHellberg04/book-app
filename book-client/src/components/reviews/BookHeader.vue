<script setup lang="ts">

const props = defineProps<{
  image: string
  genres: Array<string>
}>()

</script>

<template>
  <div class="book-header">
    <button @click="$router.back()" class="back-button">⬅ Back</button>
    <p class="genre">{{ genres?.join(', ') || 'Genre not available' }}</p>
    <img :src="image" alt="Book Cover" class="book-cover" />
  </div>
</template>

<style scoped lang="scss">
.book-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  position: relative;
}

.back-button {
  position: absolute;
  left: 20px;  /* Placera knappen längst till vänster */
  background: transparent;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #000;
}

.genre {
  position: absolute;
  right: 20px;
  font-size: 18px;
  color: #000000;
  padding: 5px;
  border-radius: 4px;
}


.book-cover {
  margin-top: 40px;
  width: auto;
  max-width: 100%;
  height: auto;
  max-height: 600px;
  border-radius: 8px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  z-index: 1;
}

// Media queries för olika skärmstorlekar
@media (max-width: 480px) {  // För mobil
  .book-header {
    align-items: center; /* Centrera bilden på mobilen */
    justify-content: center; /* Justera om nödvändigt */
  }

  .book-cover {
    width: 90%; /* Bilden blir 90% av sin förälders bredd */
    max-height: 400px;
  }
}

@media (max-width: 768px) {  // För tablet
  .book-header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .book-cover {
    width: 85%; /* Bilden blir 85% på tablet */
    max-height: 500px;

  }
}

@media (min-width: 1024px) {  // För laptop
  .book-header {
    display: grid;
    grid-template-columns: repeat(4, 1fr);

  }

  .book-cover {
    grid-column: 1 / span 2;

  }
}
@media (max-width: 1200px) {  // För desktop
  .book-header {
    display: grid;
    grid-template-columns: repeat(4, 1fr);



  }

  .book-cover {
    grid-column: 1 / span 2;
  }

}


</style>
